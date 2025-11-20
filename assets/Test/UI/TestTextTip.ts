import { _decorator, Component, Node } from 'cc';
import { TextTip } from '../../MyLib/Scripts/GamePlay/UI/Tip/TextTip';
import { PublicIP } from '../../MyLib/Scripts/Common/Utility/Net/PublicIP';
import { UIManager } from '../../MyLib/Scripts/Core/Manager/UIManager';
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


