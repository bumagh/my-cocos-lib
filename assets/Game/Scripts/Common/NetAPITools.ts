
import { Debug } from "../../../Libraries/Utility/Debug";
import { EventManager } from "../../../Libraries/Utility/EventManager";
import { Validator } from "../../../Libraries/Utility/Validator";
import { NoticeType } from "./Enums";
import { NetEndGameQueryData, NetStartDownQueryData, NetStopDownQueryData, NetUpTeamIntegralQueryData, NetUpTeamIntegralRespData } from "./NetAPITypes";
import { Tools } from "./Tools";

export class NetAPITools {
    public static NetStartDown(subgameId: string, time: number, callBackEventName: string = null) {
        var netStartDownQueryData: NetStartDownQueryData = {
            clientid: Tools.GetClientId(),
            roomid: Tools.GetArcadeId(),
            gameid: subgameId,
            time: time
        }
        EventManager.Emit("RequestAPI", "/v1/startdown", netStartDownQueryData, (res: any) => {
            callBackEventName != null && EventManager.Emit(callBackEventName, res);
        });

    }

    public static NetStopDown(subgameId: string, timerid: number, callBackEventName: string = null) {
        var netStopDownQueryData: NetStopDownQueryData = {
            clientid: Tools.GetClientId(),
            roomid: Tools.GetArcadeId(),
            gameid: subgameId,
            timerid: timerid
        }
        EventManager.Emit("RequestAPI", "/v1/stopdown", netStopDownQueryData, (res: any) => {
            callBackEventName != null && EventManager.Emit(callBackEventName, res);

        });
    }
    public static NetEndGame(subgameId: string, callBackEventName: string = null) {
        var data: NetEndGameQueryData = {
            clientid: Tools.GetClientId(),
            roomid: Tools.GetArcadeId(),
            gameid: subgameId,
        };
        EventManager.Emit("RequestAPI", "/v1/endgame", data, (res: any) => {
            callBackEventName != null && EventManager.Emit(callBackEventName, res);
        });
    }

    public static SendNotice(gameId: string, eventName: string, eventArgs: any, type: NoticeType = NoticeType.All): void {
        if (Validator.IsStringIllegal(gameId, "gameId")) return;
        if (Validator.IsStringIllegal(eventName, "eventName")) return;
        if (Validator.IsObjectIllegal(eventArgs, "eventArgs")) return;
        var data = {
            clientid: Tools.GetClientId(),
            roomid: Tools.GetArcadeId(),
            gameid: gameId,
            type: type,
            data: {
                eventName: eventName,
                eventArgs: eventArgs
            }
        };
        EventManager.Emit("RequestAPI", "/v1/sendnotice", data);
    }
    public static NetUpTeamIntegral(subgameId: string, score: number, teamId: number, callBackEventName: string = null) {
        var query: NetUpTeamIntegralQueryData = {
            clientid: Tools.GetClientId(),
            roomid: Tools.GetArcadeId(),
            gameid: subgameId,
            integral: score,
            teamid: teamId
        }
        EventManager.Emit("RequestAPI", "/v1/upteamintegral", query, (res: NetUpTeamIntegralRespData) => {
            callBackEventName != null && EventManager.Emit(callBackEventName, res);
        });

    }

}