import { ImageAsset, Sprite, SpriteFrame, Texture2D, assetManager } from "cc";
import { IEntity } from "../../../Framework/PartyTemplate/IEntity";
import { Validator } from "../../../Libraries/Utility/Validator";
import { EventManager } from "../../../Libraries/Utility/EventManager";
import { Debug } from "../../../Libraries/Utility/Debug";

/**
 * 远程图片管理器
 */
export class RemoteImageManager implements IEntity
{
    constructor()
    {
        RemoteImageManager.self = this;
    }

    private static self: RemoteImageManager;
    private tags: string[] = [];
    private spriteFrames = new Map<string, SpriteFrame>();

    private debugTag: string = "RemoteImageManager";

    OnEnable(): void
    {
        EventManager.On("SetRemoteSpriteFrame", this.SetRemoteSpriteFrame, this);
        EventManager.On("RemoveRemoteSpriteFrame", this.RemoveRemoteSpriteFrame, this);
    }

    OnDisable(): void
    {
        EventManager.Off("SetRemoteSpriteFrame", this.SetRemoteSpriteFrame, this);
        EventManager.Off("RemoveRemoteSpriteFrame", this.RemoveRemoteSpriteFrame, this);
    }

    public SetTags(...tags: string[]): void
    {
        this.tags = tags;
    }

    /**
    * 用远程图片设置Sprite
    */
    private SetRemoteSpriteFrame(tag: string, id: string, sprite: Sprite, avatarUrl: string): void
    {
        if (Validator.IsStringIllegal(tag, "tag")) return;
        if (Validator.IsStringIllegal(id, "id")) return;
        if (Validator.IsObjectIllegal(sprite, "sprite")) return;
        if (Validator.IsStringIllegal(avatarUrl, "avatarUrl")) return;
        if (this.IsTagIllegal(tag)) return;

        var key = this.GetKey(tag, id);
        if (this.spriteFrames.has(key))
            sprite.spriteFrame = this.spriteFrames.get(key);
        else
            assetManager.loadRemote<ImageAsset>(avatarUrl, { ext: '.jpg' }, function (err, imageAsset)
            {
                if (err) return;
                const spriteFrame = new SpriteFrame();
                const texture = new Texture2D();
                texture.image = imageAsset;
                spriteFrame.texture = texture;
                sprite.spriteFrame = spriteFrame;
                RemoteImageManager.self.spriteFrames.set(key, spriteFrame);
                Debug.Log(`远程加载并设置了Sprite，key为${key}`, RemoteImageManager.self.debugTag);
            });
    }

    /**
     * 移除avatarSpriteFrames里对应的图片，此时内存里仍有这张图片
     */
    private RemoveRemoteSpriteFrame(tag: string, id: string): void
    {
        if (Validator.IsStringIllegal(tag, "tag")) return;
        if (Validator.IsStringIllegal(id, "id")) return;
        if (this.IsTagIllegal(tag)) return;
        var key = this.GetKey(tag, id);
        if (!this.spriteFrames.has(key))
        {
            Debug.Warn(`key：${key}对应的远程加载的图片不存在`);
            return;
        }
        this.spriteFrames.delete(key);
        Debug.Log(`移除了远程加载的图片，key为${key}`, this.debugTag);
    }

    private IsTagIllegal(tag: string): boolean
    {
        if (this.tags.indexOf(tag) == -1)
        {
            Debug.Error(`没有找到tag：${tag}`);
            return true;
        }
        return false;
    }

    private GetKey(tag: string, id: string): string
    {
        return `${tag}_${id}`;
    }

    public LogSpriteFrames(): void
    {
        this.spriteFrames.forEach((value, key, map) =>
        {
            Debug.Log(`key = ${key}, value = ${value}`);
        });
    }
}