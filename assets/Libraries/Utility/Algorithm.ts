import { math } from "cc";
import { List } from "./List";
import { Validator } from "./Validator";
import { Debug } from "./Debug";

export class Algorithm
{
    /**
     * 随机获取Map的一个元素的值
     */
    public static GetRandomValue<TKey, TValue>(map: Map<TKey, TValue>): TValue
    {
        var keys = Array.from(map.keys());
        var randomIndex = Math.floor(Math.random() * keys.length);
        var randomKey = keys[randomIndex];
        return map.get(randomKey);
    }

    /**
     * 随机获取泛型列表的一个元素
     */
    public static RandomItemFormList<T>(list: List<T>): T
    {
        var randomIndex = Math.floor(Math.random() * list.Count);
        return list.ItemAt(randomIndex);
    }

    /**
     * 随机获取泛型数组的一个元素
     */
    public static RandomItemFormArray<T>(array: T[]): T
    {
        var randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }

    /**
     * 将大数字转换为“W”的形式
     */
    public static FormatBigNumber(num: number): string
    {
        if (num == undefined)
            num = 0;
        if (num > 1000)
        {
            num = num / 10000;
            var formattedNum = "";
            if (num > 1)
            {
                const numStr = num.toString();
                const dotIndex = numStr.indexOf(".");
                formattedNum = numStr.substring(0, dotIndex) + "W";
            }
            else
            {
                formattedNum = num.toString().slice(0, 3) + "W";
            }
            return formattedNum;
        }
        else
        {
            return num.toString();
        }
    }

    /**
     * 移除字符串里的冒号和大括号，并根据分割符拆分成数组
     */
    public static RemoveColonAndBracesToArray(source: string, separator: string = ","): string[]
    {
        if (Validator.IsStringIllegal(source, "source")) return [];
        return source.replace(/[:{}"]/g, "").split(separator);
    }

    /**
     * 将字符串的每个字符拆开，并插入换行符
     */
    public static ConvertToNewlines(str: string): string
    {
        let result = '';
        for (let i = 0; i < str.length; i++)
        {
            result += str[i];
            if (i < str.length - 1)
            {
                result += '\n';
            }
        }
        return result;
    }

    /**
     * 随机获取数组里的元素
     */
    public static GetRandomElements<T>(array: T[], count: number): T[]
    {
        if (count > array.length)
        {
            throw new Error('Count cannot be greater than the array length.');
        }

        const result = [];
        const usedIndices = new Set();
        var seed = new Date().getMilliseconds();
        while (result.length < count)
        {
            seed++;
            const randomIndex = Math.floor(math.pseudoRandomRange(seed, 0, 1) * array.length);
            // 检查该索引是否已经被使用过  
            if (!usedIndices.has(randomIndex))
            {
                usedIndices.add(randomIndex);
                result.push(array[randomIndex]);
            }
        }
        return result;
    }

    public static PickRandom<T>(array: T[], count: number): T[] {
        const result = [];
        const pool = array.slice(0);

        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * pool.length);
            result.push(pool[randomIndex]);
            pool.splice(randomIndex, 1);
        }

        return result;
    }
}