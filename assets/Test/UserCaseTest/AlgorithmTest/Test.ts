import { _decorator, Component, Node } from 'cc';
import { Algorithm } from '../../../Libraries/Utility/Algorithm';
import { Debug } from '../../../Libraries/Utility/Debug';
const { ccclass, property } = _decorator;

@ccclass('Test')
export class Test extends Component {
    start() {
        const nums = [0,1,2,3,4,5,6,7,8];
        var res = Algorithm.PickRandom(nums, 10);
        Debug.Log(res);
    }

    update(deltaTime: number) {
        
    }
}


