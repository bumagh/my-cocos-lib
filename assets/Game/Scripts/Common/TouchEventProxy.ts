import { _decorator, CCString, Component, EventTouch } from 'cc';
import { EventManager } from '../../../MyLib/Scripts/Common/Utility/EventManager';
const { ccclass, property } = _decorator;

@ccclass('TouchEventProxy')
export class TouchEventProxy extends Component
{
    @property(CCString)
    public eventName: string;

    @property(CCString)
    public touchType: string;

    protected onEnable(): void
    {
        this.node.on(this.touchType, this.OnTouchEvent, this);
    }

    protected onDisable(): void
    {
        this.node.off(this.touchType, this.OnTouchEvent, this);
    }

    private OnTouchEvent(event: EventTouch): void
    {
        EventManager.Emit(this.eventName, this.node, event);
    }
}