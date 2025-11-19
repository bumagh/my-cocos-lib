// import 'minigame-api-typings';
import { EventManager } from '../../Libraries/Utility/EventManager';
import { Debug } from '../../Libraries/Utility/Debug';
import { sys } from 'cc';
import { Validator } from '../../Libraries/Utility/Validator';
import { Tools } from './Common/Tools';

export class NetworkAPIManager 
{
    constructor()
    {
        NetworkAPIManager.self = this;
    }

    private static self: NetworkAPIManager;
    private httpUrl: string = "https://gameapi.wujinongpi.cn";
    private defaultAvatarUrl: string = "https://tbboss.wujinongpi.cn/images/defaulttx.png";
    private code: string;
    private token: string;
    private debugTag: string = "NetworkAPIManager";
    private userInfoButton: WechatMinigame.UserInfoButton;

    public enableTestAccount: boolean = false;

    OnEnable(): void
    {
        this.OnWXLifeTime();

        EventManager.On("OnGameArcadeControllerLoad", this.OnGameArcadeControllerLoad, this);
        EventManager.On("OnSubgameControllerStart", this.OnSubgameControllerStart, this);
        EventManager.On("RequestBinduserAPI", this.RequestBinduserAPI, this);
        EventManager.On("SendMessageAPI", this.SendMessageAPI, this);
        EventManager.On("RequestHeartbeatAPI", this.RequestHeartbeatAPI, this);
        EventManager.On("RequestGameHallAPI", this.RequestGameHallAPI, this);
        EventManager.On("RequestAPI", this.RequestAPI, this);
    }

    OnDisable(): void
    {
        EventManager.Off("OnGameArcadeControllerLoad", this.OnGameArcadeControllerLoad, this);
        EventManager.Off("OnSubgameControllerStart", this.OnSubgameControllerStart, this);
        EventManager.Off("RequestBinduserAPI", this.RequestBinduserAPI, this);
        EventManager.Off("SendMessageAPI", this.SendMessageAPI, this);
        EventManager.Off("RequestHeartbeatAPI", this.RequestHeartbeatAPI, this);
        EventManager.Off("RequestGameHallAPI", this.RequestGameHallAPI, this);
        EventManager.Off("RequestAPI", this.RequestAPI, this);
    }

    private OnGameArcadeControllerLoad(): void
    {
        this.StartLogin();
    }

    /**
     * 小游戏控制器start
     */
    private OnSubgameControllerStart(subgameId: string): void
    {
        if (Validator.IsStringIllegal(subgameId, "subgameId")) return;
        var data = {
            clientid: sys.localStorage.getItem("ClientId"),
            roomid: sys.localStorage.getItem("ArcadeId"),
            gameid: subgameId
        };
        this.RequestAPI("/v1/entergame", data);
    }

    private StartLogin(): void
    {
        wx.login({
            success(res)
            {
                if (res.code)
                {
                    Debug.Log("登录成功", NetworkAPIManager.self.debugTag);
                    NetworkAPIManager.self.code = res.code;

                    var userGender = sys.localStorage.getItem("UserGender");
                    if (userGender != "1" && userGender != "2")
                        NetworkAPIManager.self.RequirePrivacyAuthorize();
                    else
                        NetworkAPIManager.self.RequestLoginAPI();
                }
                else
                {
                    Debug.Log('登录失败' + res.errMsg, NetworkAPIManager.self.debugTag);
                }
            }
        });
    }

    private RequirePrivacyAuthorize(): void
    {
        // 调用wx.requirePrivacyAuthorize拉起自定义隐私弹窗
        // 若用户已同意且隐私政策无变更则直接跳过用户确认阶段进入success回调，
        // 否则需要拉起隐私弹窗，请求用户确认（通过调用wx.onNeedPrivacyAuthorization注册的回调函数来拉起自定义的隐私弹窗），
        // 用户同意后才进入success回调

        wx.requirePrivacyAuthorize({
            success: res =>
            {
                // 进入success回调说明用户已同意隐私政策
                Debug.Log("用户已同意隐私政策", NetworkAPIManager.self.debugTag);
                NetworkAPIManager.self.Authorize();
            },
            fail: () =>
            {
                // 进入fail回调说明用户拒绝隐私政策
                // 游戏需要放弃处理用户个人信息，同时不要阻断游戏主流程
                Debug.Log("用户拒绝隐私政策", NetworkAPIManager.self.debugTag);
                NetworkAPIManager.self.RequirePrivacyAuthorize();
            },
            complete: () =>
            {
            }
        })
    }

    private Authorize(): void
    {
        // 通过 wx.getSetting 查询用户是否已授权头像昵称信息
        wx.getSetting({
            success(res)
            {
                const hasSetting = res.authSetting['scope.userInfo'];
                if (hasSetting)
                {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                        success: function (res)
                        {
                            Debug.Log("获取用户信息成功", NetworkAPIManager.self.debugTag);
                            EventManager.Emit("ShowSetUserInfoPanel", true);
                            NetworkAPIManager.self.SaveUserInfo(res);
                            NetworkAPIManager.self.CreateUserInfoButton(null);
                        }
                    })
                }
                else
                {
                    Debug.Log("用户未授权头像昵称信息", NetworkAPIManager.self.debugTag);
                    EventManager.Emit("ShowSetUserInfoPanel", true);
                    // 否则，先通过 wx.createUserInfoButton 接口发起授权
                    NetworkAPIManager.self.CreateUserInfoButton((res) =>
                    {
                        NetworkAPIManager.self.userInfoButton.hide();
                        NetworkAPIManager.self.SaveUserInfo(res);
                    });
                }
            }
        })
    }

    private SaveUserInfo(res: WechatMinigame.OnTapListenerResult): void
    {
        var avatarUrl: string;
        var replace: boolean;
        if ((NetworkAPIManager.self.enableTestAccount && res.userInfo.nickName.includes("测试号")) ||
            Validator.IsStringEmpty(res.userInfo.avatarUrl))
        {
            avatarUrl = NetworkAPIManager.self.defaultAvatarUrl;
            replace = false;
        }
        else
        {
            avatarUrl = res.userInfo.avatarUrl;
            replace = true;
        }
        EventManager.Emit("SetAvatarUrl", avatarUrl, replace);
        EventManager.Emit("SetUserNickname", res.userInfo.nickName);
        sys.localStorage.setItem("UserAvatarUrl", avatarUrl);
        sys.localStorage.setItem("UserNickname", res.userInfo.nickName);
    }

    private CreateUserInfoButton(onTap: (res: WechatMinigame.OnTapListenerResult) => void): void
    {
        var info = wx.getSystemInfoSync();
        var width = 200;
        var height = 40;
        var left = info.screenWidth / 2 - width / 2;
        var top = info.screenHeight - height - 40;
        this.userInfoButton = wx.createUserInfoButton({
            type: 'text',
            text: '登录',
            style: {
                left: left,
                top: top,
                width: width,
                height: height,
                lineHeight: 40,
                backgroundColor: '#5F9EA0',
                color: '#ffffff',
                textAlign: 'center',
                fontSize: 16,
                borderRadius: 16,
                borderColor: '',
                borderWidth: 0
            }
        })
        this.userInfoButton.onTap((res) =>
        {
            // 用户同意授权后回调，通过回调可获取用户头像昵称信息
            Debug.Log("获取用户信息成功", NetworkAPIManager.self.debugTag);
            if (!Validator.IsObjectEmpty(onTap))
                onTap(res);
            EventManager.Emit("OnUserInfoButtonTapped");
            NetworkAPIManager.self.RequestLoginAPI();
        });
    }

    private RequestLoginAPI(): void
    {
        // 发起网络请求
        wx.request({
            url: `${NetworkAPIManager.self.httpUrl}/v1/login`,
            data: {
                code: NetworkAPIManager.self.code
            },
            success(result)
            {
                Debug.Log("Login API 请求成功", NetworkAPIManager.self.debugTag);
                Debug.Log(result.data, NetworkAPIManager.self.debugTag);
                if (result.data["error"] != 0) return;
                NetworkAPIManager.self.token = result.data["result"]["token"];
                NetworkAPIManager.self.RequestSetUserInfo();
            }
        });
    }

    private RequestSetUserInfo(): void
    {
        wx.request({
            url: `${NetworkAPIManager.self.httpUrl}/v1/upuser`,
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                // token
                'authoriz': NetworkAPIManager.self.token,
                // uuid
                'nonce': NetworkAPIManager.self.GenerateUUID(),
            },
            method: "POST",
            data: {
                wxavatarurl: sys.localStorage.getItem("UserAvatarUrl"),
                wxnickname: sys.localStorage.getItem("UserNickname"),
                wxgender: sys.localStorage.getItem("UserGender"),
            },
            success(result)
            {
                Debug.Log("SetUserInfo API 请求成功", NetworkAPIManager.self.debugTag);
                Debug.Log(result.data, NetworkAPIManager.self.debugTag);
                if (result.data["error"] != 0) return;
                EventManager.Emit("InitWebSocket");
            },
        });
    }

    private RequestBinduserAPI(): void
    {
        wx.request({
            url: `${NetworkAPIManager.self.httpUrl}/v1/binduser`,
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                // token
                'authoriz': NetworkAPIManager.self.token,
                // uuid
                'nonce': NetworkAPIManager.self.GenerateUUID(),
            },
            method: "GET",
            data: {
                clientid: sys.localStorage.getItem("ClientId"),
                roomid: sys.localStorage.getItem("ArcadeId"),
            },
            success(result)
            {
                Debug.Log("Binduser API 请求成功", NetworkAPIManager.self.debugTag);
                Debug.Log(result.data, NetworkAPIManager.self.debugTag);
                if (result.data["error"] != 0) return;
                var data = result.data["result"];
                sys.localStorage.setItem("ClientPlayerId", data["requestuid"]);
                sys.localStorage.setItem("ArcadeName", data["room"]["name"]);
                sys.localStorage.setItem("IsCharge", data["room"]["ischarge"] as boolean);
                EventManager.Emit("SetArcadeName");
                EventManager.Emit("OnBindUserSuccess");
                NetworkAPIManager.self.RequestGameHallAPI();
            },
        });
    }

    /**
     * 废弃
     */
    private SendMessageAPI(data: string, onSuccess: Function = null): void
    {
        wx.request({
            url: `${NetworkAPIManager.self.httpUrl}/v1/gameotice`,
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                // token
                'authoriz': NetworkAPIManager.self.token,
                // uuid
                'nonce': NetworkAPIManager.self.GenerateUUID(),
            },
            method: "GET",
            data: {
                clientid: sys.localStorage.getItem("ClientId"),
                roomid: sys.localStorage.getItem("ArcadeId"),
                type: 1,
                data: data,
            },
            success(result)
            {
                if (onSuccess != null) onSuccess();
            },
        });
    }

    private RequestGameHallAPI(): void
    {
        wx.request({
            url: `${NetworkAPIManager.self.httpUrl}/v1/gameall`,
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                // token
                'authoriz': NetworkAPIManager.self.token,
                // uuid
                'nonce': NetworkAPIManager.self.GenerateUUID(),
            },
            data: {
                roomid: sys.localStorage.getItem("ArcadeId")
            },
            success(result)
            {
                Debug.Log("GameHall API 请求成功", NetworkAPIManager.self.debugTag);
                Debug.Log(result.data, NetworkAPIManager.self.debugTag);
                if (result.data["error"] != 0) return;
                var data = result.data["result"];
                EventManager.Emit("ArcadeLoadGameList", data["gamelist"], data["gametype"]);
                EventManager.Emit("UpdateSubgameViews");
            },
        });
    }

    private RequestHeartbeatAPI(): void
    {
        wx.request({
            url: `${NetworkAPIManager.self.httpUrl}/heartbeat.php`,
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                // token
                'authoriz': NetworkAPIManager.self.token,
                // uuid
                'nonce': NetworkAPIManager.self.GenerateUUID(),
            },
            method: "GET",
            data: {
                clientid: sys.localStorage.getItem("ClientId"),
                roomid: sys.localStorage.getItem("ArcadeId"),
            },
            success(result)
            {
                // Debug.Log("Heartbeat API 请求成功", NetworkAPIManager.self.debugTag);
                // Debug.Log(result, NetworkAPIManager.self.debugTag);
            },
        });
    }

    private OnWXLifeTime(): void
    {
        wx.onHide(res => EventManager.Emit("WXOnHide"));
        wx.onShow(res => EventManager.Emit("WXOnShow"));
    }

    private GenerateUUID(): string
    {
        var guid = "";
        for (var i = 1; i <= 32; i++)
        {
            var n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
            if (i == 8 || i == 12 || i == 16 || i == 20) guid += "-";
        }
        return guid;
    }

    private RequestAPI(url: string, data: any = null, onSuccess: (response: any) => void = null, method: any = "GET"): void
    {
        var requestObject = {
            url: `${NetworkAPIManager.self.httpUrl}${url}`,
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'authoriz': NetworkAPIManager.self.token,           // token
                'nonce': NetworkAPIManager.self.GenerateUUID(),     // uuid
            },
            method: method,
            success(result)
            {
                Debug.Log(`${url} 请求成功`, NetworkAPIManager.self.debugTag);
                Debug.Log(result.data, NetworkAPIManager.self.debugTag);
                if (result.data["error"] != 0) return;
                if (onSuccess == null) return;
                onSuccess(result.data["result"]);
            },
        };
        if (data != null)
            requestObject["data"] = data;
        wx.request(requestObject);
    }
}