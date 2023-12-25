import { view } from 'cc';
import 'minigame-api-typings';

export class WXTools
{
    /**
     * 获取菜单按钮（右上角胶囊按钮）的布局位置信息。坐标信息以屏幕左上角为原点。
     */
    public static GetWXTopOffset(): number
    {
        let systemInfo = wx.getSystemInfoSync();
        let windowHeight = systemInfo.windowHeight;
        let gameSize = view.getVisibleSize();
        let gameHeight = gameSize.height;
        let ratio = gameHeight / windowHeight;
        let rect = wx.getMenuButtonBoundingClientRect();
        rect.width *= ratio;
        rect.height *= ratio;
        rect.left *= ratio;
        rect.top *= ratio;
        rect.bottom = gameSize.height - rect.bottom * ratio;
        rect.right = gameSize.width - rect.right * ratio;
        return rect.top;
    }
}