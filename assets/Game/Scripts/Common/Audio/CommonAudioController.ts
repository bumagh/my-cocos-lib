import { _decorator, director } from "cc";
import { EventManager } from "../../../../MyLib/Scripts/Common/Utility/EventManager";
import { AudioController } from "./AudioController";
import { Validator } from "../../../../MyLib/Scripts/Common/Utility/Validator";
import { ReadyButton } from "../ReadyButton";

const { ccclass, property } = _decorator;

/**
 * 通用音效的控制器
 */
@ccclass('CommonAudioController')
export class CommonAudioController extends AudioController
{
    protected onLoad(): void
    {
        EventManager.On("AudioUITouched", this.AudioUITouched, this);
        EventManager.On("AudioUIClosed", this.AudioUIClosed, this);
        EventManager.On("OnReadyButtonTouched", this.OnReadyButtonTouched, this);
        EventManager.On("ShowGameSettingDlg", this.ShowGameSettingDlg, this);
        EventManager.On("CloseGameSettingDlg", this.CloseGameSettingDlg, this);
        EventManager.On("OnReturnButtonTouched", this.OnReturnButtonTouched, this);
        EventManager.On("OnSettingsConfirmed", this.OnSettingsConfirmed, this);
        EventManager.On("OnSettingsReset", this.OnSettingsReset, this);
        EventManager.On("OnTipConfirmed", this.OnTipConfirmed, this);
        EventManager.On("OnRankListDlgShowed", this.OnRankListDlgShowed, this);
        EventManager.On("OnBackToArcade", this.OnBackToArcade, this);
        EventManager.On("OnBackToSubgame", this.OnBackToSubgame, this);
    }

    protected onDestroy(): void
    {
        EventManager.Off("AudioUITouched", this.AudioUITouched, this);
        EventManager.Off("AudioUIClosed", this.AudioUIClosed, this);
        EventManager.Off("OnReadyButtonTouched", this.OnReadyButtonTouched, this);
        EventManager.Off("ShowGameSettingDlg", this.ShowGameSettingDlg, this);
        EventManager.Off("CloseGameSettingDlg", this.CloseGameSettingDlg, this);
        EventManager.Off("OnReturnButtonTouched", this.OnReturnButtonTouched, this);
        EventManager.Off("OnSettingsConfirmed", this.OnSettingsConfirmed, this);
        EventManager.Off("OnSettingsReset", this.OnSettingsReset, this);
        EventManager.Off("OnTipConfirmed", this.OnTipConfirmed, this);
        EventManager.Off("OnRankListDlgShowed", this.OnRankListDlgShowed, this);
        EventManager.Off("OnBackToArcade", this.OnBackToArcade, this);
        EventManager.Off("OnBackToSubgame", this.OnBackToSubgame, this);
    }

    private AudioUITouched()
    {
        this.Play("UITouch");
    }

    private AudioUIClosed()
    {
        this.Play("UIClose");
    }

    private OnReadyButtonTouched(readyButton: ReadyButton): void
    {
        switch (director.getScene().name)
        {
            case "DragonPhoenixDuel":
                break;
            default:
                this.Play("Button");
                break;
        }
    }

    private ShowGameSettingDlg(): void
    {
        this.Play("Button");
    }

    private CloseGameSettingDlg(): void
    {
        this.Play("UIClose");
    }

    private OnReturnButtonTouched(): void
    {
        this.Play("Button");
    }

    private OnSettingsConfirmed(): void
    {
        this.Play("Button");
    }

    private OnSettingsReset(): void
    {
        this.Play("Button");
    }

    private OnTipConfirmed(): void
    {
        this.Play("Button");
    }

    private OnRankListDlgShowed(): void
    {
        this.Play("OnRankListDlgShowed");
    }

    private OnBackToArcade(): void
    {
        this.Play("Button");
    }

    private OnBackToSubgame(): void
    {
        this.Play("Button");
    }
}