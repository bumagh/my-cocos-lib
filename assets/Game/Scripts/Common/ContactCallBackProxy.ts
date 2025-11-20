import { _decorator, CCObject, CCString, Collider2D, Component, Contact2DType, EventTouch, Input, IPhysics2DContact, Node, PhysicsSystem2D } from 'cc';
import { EventManager } from '../../../MyLib/Utility/EventManager';
import { Debug } from '../../../MyLib/Utility/Debug';
const { ccclass, property } = _decorator;
@ccclass('ContactCallBackProxy')
export class ContactCallBackProxy extends Component {
    @property(CCString)
    public eventName: string;
    @property(CCString)
    public contact2DType: string;
    onLoad() {
        
        // 注册单个碰撞体的回调函数
        let collider = this.getComponent(Collider2D);
        // Debug.Log(collider);

        if (collider) {
            collider.on(this.contact2DType, this.onContact, this);
        }
        // // 注册全局碰撞回调函数
        // if (PhysicsSystem2D.instance) {
        //     PhysicsSystem2D.instance.on(this.contact2DType, this.onContact, this);
        // }
    }
    onContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次
        // Debug.Log("contact");
        EventManager.Emit(this.eventName, this.node, otherCollider);

    }
   
}

