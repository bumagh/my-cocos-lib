import { _decorator, Color, Component, Material, Node, Sprite, tween } from 'cc';
import { MenuContainer } from './menu/MenuContainer';
const { ccclass, property } = _decorator;

@ccclass('TransitionTest')
export class TransitionTest extends Component {
    @property({type:Material})
    mats:Material[]=[];
    @property(Sprite)
    sp:Sprite
    @property(MenuContainer)
    menu:MenuContainer
    start() {
        this.mats.forEach((m,i)=>{
            const name = m.name;
            this.menu.addMenuItem(name,()=>{
                this.changeMat(i);
            })
        })
    }

    changeMat(index){
        let start = {num:255};
        let end = {num:0};
        const sp = this.sp;
        const color = new Color(255,255,255);
        sp.color = color;
        const mat = this.mats[index];
        sp.material = mat;
        tween(start).delay(0.0016).to(2.5,end, {
            onUpdate(target:any, ratio: number) {
                color.r = target.num;
                sp.color = color;
            },
        }).start();
    }

   
}

