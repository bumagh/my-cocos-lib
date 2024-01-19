import { _decorator, Component, Node } from 'cc';
import { Algorithm } from '../../../Libraries/Utility/Algorithm';
import { Debug } from '../../../Libraries/Utility/Debug';
const { ccclass, property } = _decorator;

@ccclass('Test')
export class Test extends Component
{
    start()
    {
        this.TestGetRandomValue();
    }

    update(deltaTime: number)
    {

    }
    private TestGetRandomValue()
    {
        var mapKeyValue: Map<string, number> = new Map<string, number>([["name1", 1], ["name2", 2], ["name3", 3], ["name4", 4]]);
        var randKeyValue = Algorithm.GetRandomValue(mapKeyValue);
        Debug.Log(randKeyValue[0] + ":" + randKeyValue[1]);
    }
}


