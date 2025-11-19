import { _decorator, Component, Node } from 'cc';
import { TextTip } from '../../Libraries/UI/Tip/TextTip';
import { UIManager } from '../../Libraries/Manager/UIManager';
import { PublicIP } from '../../Libraries/Utility/Net/PublicIP';
const { ccclass, property } = _decorator;

@ccclass('TestTextTip')
export class TestTextTip extends Component {
    async start() {
        UIManager.instance.showTips("测试显示");
        const publicIP = await PublicIP.getPublicIP();
        console.log('公网IP:', publicIP);
    }

    update(deltaTime: number) {

    }
}


