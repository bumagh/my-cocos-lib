import { _decorator, AudioSource, Component, Node } from 'cc';
import { Debug } from '../../../../MyLib/Utility/Debug';
import { AudioPlayer } from './AudioPlayer';
import { Validator } from '../../../../MyLib/Utility/Validator';
const { ccclass, property } = _decorator;

@ccclass('AudioController')
export abstract class AudioController extends Component
{
    protected audioPlayers = new Map<string, AudioPlayer>();

    protected start(): void
    {
        var tempArray = this.getComponentsInChildren(AudioPlayer);
        for (let i = 0; i < tempArray.length; i++)
        {
            const temp = tempArray[i];
            this.audioPlayers.set(temp.key, temp);
        }
    }

    protected Play(key: string): void
    {
        this.GetAudioSource(key)?.play();
    }

    protected Stop(key: string): void
    {
        this.GetAudioSource(key)?.stop();
    }

    protected StopAll(): void
    {
        for (const pair of this.audioPlayers)
            pair[1].audioSource.stop();
    }

    protected GetAudioSource(key: string): AudioSource
    {
        if (Validator.IsStringIllegal(key, "key")) return null;
        if (!this.audioPlayers.has(key))
        {
            Debug.Warn(`未找到key为${key}的AudioPlayer`);
            return null;
        }
        return this.audioPlayers.get(key).audioSource;
    }
}