import { _decorator, Component, Node } from 'cc';
import { Algorithm } from '../../../MyLib/Scripts/Common/Utility/Algorithm';
import { Debug } from '../../../MyLib/Scripts/Common/Utility/Debug';
import { List } from '../../../MyLib/Scripts/Common/Utility/List';
const { ccclass, property } = _decorator;

@ccclass('Test')
export class Test extends Component
{
    start()
    {
        this.TestConvertToNewlines();
    }

    update(deltaTime: number)
    {

    }
    private TestRandomItemFromMap()
    {
        var mapKeyValue: Map<string, number> = new Map<string, number>([["name1", 1], ["name2", 2], ["name3", 3], ["name4", 4]]);
        var randKeyValue = Algorithm.RandomItemFromMap(mapKeyValue);
        Debug.Log(randKeyValue[0] + ":" + randKeyValue[1], "TestGetRandomValue");
    }

    private TestRandomItemFormList()
    {
        var list: List<number> = new List<number>();
        list.items = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        var randItem = Algorithm.RandomItemFormList(list);
        Debug.Log(randItem, "TestRandomItemFormList");
    }

    private TestFormatBigNumber(num: number)
    {
        var bigNum = Algorithm.FormatBigNumber(num);
        Debug.Log(bigNum);
    }

    private TestRemoveColonAndBracesToArray()
    {
        var strArr = Algorithm.RemoveColonAndBracesToArray("{http://},{http://}");
        strArr.forEach(str =>
        {
            Debug.Log(str);
        });
    }
    private TestConvertToNewlines()
    {
        var res = Algorithm.ConvertToNewlines("你好cocos");
        Debug.Log(res);
    }
}


