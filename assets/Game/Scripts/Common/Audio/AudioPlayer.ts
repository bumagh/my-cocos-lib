import { _decorator, AudioSource, CCString, Component, Node } from 'cc';
const { ccclass, property, requireComponent } = _decorator;

@ccclass('AudioPlayer')
@requireComponent(AudioSource)
export class AudioPlayer extends Component
{
    @property(CCString)
    public key: string;

    public audioSource: AudioSource;

    protected onLoad(): void
    {
        this.audioSource = this.getComponent(AudioSource);
    }
}