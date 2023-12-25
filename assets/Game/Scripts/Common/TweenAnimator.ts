import { Color, Sprite, Tween, TweenEasing, Vec3, tween, Node, Quat } from "cc";
import { Validator } from "../../../Libraries/Utility/Validator";
import { EventManager } from "../../../Libraries/Utility/EventManager";

export class TweenAnimator
{
    /**
     * 播放呼吸灯效果
     * @param sprite 
     * @param startColor 第一阶段的颜色
     * @param endColor 第二阶段的颜色
     * @returns 
     */
    public static PlayBreatheEffect(sprite: Sprite, duration: number, startColor: any, endColor: any): Tween<Color>
    {
        if (Validator.IsObjectIllegal(sprite, "sprite")) return null;
        if (Validator.IsObjectIllegal(startColor, "startColor")) return null;
        if (Validator.IsObjectIllegal(endColor, "endColor")) return null;
        var spriteColor = new Color(sprite.color);
        var t1 = tween(spriteColor)
            .to(duration, startColor, { onUpdate: (target: Color) => sprite.color = target });
        var t2 = tween(spriteColor)
            .to(duration, endColor, { onUpdate: (target: Color) => sprite.color = target });
        var glowTween = tween(spriteColor)
            .sequence(t1, t2)
            .repeatForever()
            .start();
        return glowTween;
    }

    /**
     * 播放对话框弹入的动画（出现）
     */
    public static PlayPopInEffect(
        target: Node,
        duration: number,
        scale: Vec3,
        callback: string = null): Tween<Node>
    {
        return TweenAnimator.PlayScaleChangeEffect(target, duration, scale, "backOut", callback);
    }

    /**
     * 播放对话框弹出的动画（消失）
     */
    public static PlayPopOutEffect(
        target: Node,
        duration: number,
        scale: Vec3,
        callback: string = null): Tween<Node>
    {
        return TweenAnimator.PlayScaleChangeEffect(target, duration, scale, "backOut", callback);
    }

    /**
     * 播放改变大小的动画
     */
    public static PlayScaleChangeEffect(
        target: Node,
        duration: number,
        scale: Vec3,
        easing: TweenEasing = "linear",
        callback: string = null): Tween<Node>
    {
        return tween(target)
            .to(duration, { scale: scale }, { easing: easing })
            .call(() =>
            {
                if (Validator.IsStringEmpty(callback)) return;
                EventManager.Emit(callback);
            })
            .start();
    }

    /**
     * 抛物线移动
     * @param targetNode 进行抛物线运动的节点
     * @param middlePos 抛物线最高点的世界坐标
     * @param destPos 抛物线终点的世界坐标
     * @param duration 抛物线运动的时间
     */
    public static ParabolaMoving(targetNode: Node, duration: number, middlePos: Vec3, destPos: Vec3): Tween<Vec3>
    {
        var startPos = targetNode.worldPosition;
        return tween(startPos)
            .to(duration, destPos, {
                onUpdate: (target: Vec3, ratio: number) =>
                {
                    targetNode.worldPosition = this.Bezier(ratio, startPos, middlePos, destPos);
                }
            }).start();
    }

    /**
     * 计算贝塞尔曲线坐标函数
     */
    private static Bezier(t: number, start: Vec3, middle: Vec3, dest: Vec3): Vec3
    {
        let x = (1 - t) * (1 - t) * start.x + 2 * t * (1 - t) * middle.x + t * t * dest.x;
        let y = (1 - t) * (1 - t) * start.y + 2 * t * (1 - t) * middle.y + t * t * dest.y;
        return new Vec3(x, y, 0);
    }

    /**
     * 播放旋转的动画
     */
    public static PlayRotateEffect(targetNode: Node, duration: number, angle: number, easing: TweenEasing): Tween<Node>
    {
        return tween(targetNode)
            .to(duration, { angle: angle }, { easing: easing })
            .start();
    }

    /**
     * 播放淡入/淡出的动画
     */
    public static PlayFadeEffect(sprite: Sprite, duration: number, alpha: number = 0): Tween<Color>
    {
        if (Validator.IsObjectIllegal(sprite, "sprite")) return null;
        var spriteColor = new Color(sprite.color);
        return tween(spriteColor)
            .to(duration, { r: 255, g: 255, b: 255, a: alpha },
                { onUpdate: (target: Color) => sprite.color = target })
            .start();
    }

    /**
     * 播放位移动画
     */
    public static PlayPositionChangedEffect(
        target: Node,
        duration: number,
        position: Vec3,
        easing: TweenEasing = "linear",
        callback: string = null): Tween<Node>
    {
        return tween(target)
            .to(duration, { position: position }, { easing: easing })
            .call(() =>
            {
                if (Validator.IsStringEmpty(callback)) return;
                EventManager.Emit(callback);
            })
            .start();
    }
}