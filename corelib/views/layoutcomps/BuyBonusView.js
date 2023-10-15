import {LibView} from "../../pixiwrapper/LibView";
import {CoreLib} from "../../core/CoreLib";
import { PopupComp } from '../comps/PopupComp'
import { LibContainer } from '../../pixiwrapper/LibContainer'

export class BuyBonusView extends LibContainer
{
    constructor(config, layoutconfig) {
        super(config, layoutconfig);

        this.bg = this.elementsList["bg"];
        this.popup = this.elementsList["popup"];
        this.visible = false;

        CoreLib.UIUtil.setModalState(this.bg, true);

        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SHOW_BUYBONUS_POPUP, this.showMessagePopup.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.HIDE_BUYBONUS_POPUP, this.hideMessagePopup.bind(this));

    }

    showMessagePopup (obj) {
        this.popup.updatePopup(obj);
        this.visible = true;
        this.bg.alpha = 0;
        this.popup.alpha = 0;
        if (obj.showBG == false) {

        } else {
            CoreLib.AnimationManager.animateTween(this.bg, 0.5, {alpha : 0.9});
        }

        CoreLib.AnimationManager.animateTween(this.popup, 1, {alpha : 1});
    }

    hideMessagePopup () {
        this.popup.reset();
        this.visible = false;
    }

    onResizeEndEvent () {
        super.onResizeEndEvent();
        this.bg.width = CoreLib.UIUtil.getGameWidth();
        this.bg.height = CoreLib.UIUtil.getGameHeight();

        let slotview = CoreLib.View.getSlotGameView().getSlotMachinComp();
        this.popup.scale.set(1);
        let obj = CoreLib.UIUtil.getDeviceSpecificUIObj(this.configData.layoutData)
        CoreLib.UIUtil.scaleObjectWithRef(this.popup, this.bg, obj.widthPerc, obj.heightPerc);
        CoreLib.UIUtil.setPositionX(this.popup,  slotview.x + slotview.reelFrame.x * slotview.scale.x + (slotview.reelFrame.width * slotview.scale.x - this.popup.getWidth()) / 2 + CoreLib.Util.getDefaultValue(obj.hPadding, 0));
        CoreLib.UIUtil.setPositionY(this.popup,  slotview.y + slotview.reelFrame.y * slotview.scale.y + (slotview.reelFrame.height * slotview.scale.y - this.popup.getHeight()) / 2 + CoreLib.Util.getDefaultValue(obj.vPadding, 0));

    }

}
