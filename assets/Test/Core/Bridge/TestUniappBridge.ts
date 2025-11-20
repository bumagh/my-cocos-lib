import { _decorator, Component, Label, Node } from 'cc';
import { UniappBridge } from 'db://assets/MyLib/Scripts/Core/Bridge/UniappBridge';
const { ccclass, property } = _decorator;

@ccclass( 'TestUniappBridge' )
export class TestUniappBridge extends Component
{

    @property( { type: Label } )
    public msgLabel: Label | null = null;
    private uniappBridge: UniappBridge;
    start ()
    {
        this.uniappBridge = UniappBridge.getInstance();
        this.uniappBridge.OnMessage( 'MsgFromUniapp', ( data: any ) =>
        {
            this.msgLabel.string = data as string;
        } );

    }

    update ( deltaTime: number )
    {

    }
}


