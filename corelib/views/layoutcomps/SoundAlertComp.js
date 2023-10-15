import {LibView} from "../../pixiwrapper/LibView";
import {CoreLib} from "../../core/CoreLib";
import { PopupComp } from '../comps/PopupComp'
import { LibContainer } from '../../pixiwrapper/LibContainer'

export class SoundAlertComp extends LibContainer
{
    constructor(config, layoutconfig) {
        super(config, layoutconfig);

        this.popupbg = this.elementsList["popupbg"];
        this.titlebg = this.elementsList["titlebg"];
        this.messageText = this.elementsList["messageText"];
        this.cancelBtn = this.elementsList["cancelBtn"];
        this.okBtn = this.elementsList["okBtn"];
        this.resizeViewComponents();

        this.okBtn.addInteraction(this.onOkClicked.bind(this));
        this.cancelBtn.addInteraction(this.onCancelClicked.bind(this));
        this.okBtn.setEnabled(true);
        this.cancelBtn.setEnabled(true);

        CoreLib.UIUtil.setModalState(this.popupbg, true);




    }
    onOkClicked () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.IOS_SOUND_YES_CLICKED);

    }
    onCancelClicked () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.IOS_SOUND_NO_CLICKED);
    }

    destroyComp () {
        super.destroyComp();
        this.isDestroyed = true;
    }

    hideAlertPopup () {
        this.visible = false;
    }

    resizeViewComponents (layoutData = null) {
        if (this.isDestroyed) {
            return;
        }
        super.resizeViewComponents(layoutData);

        this.popupbg.width = CoreLib.UIUtil.getGameWidth() * 0.8;
        this.popupbg.height = CoreLib.UIUtil.getGameHeight() * 0.25;

        CoreLib.UIUtil.setPosition(this.messageText, this.popupbg.width / 2, this.popupbg.height * 0.4);

        let sc;
        this.okBtn.scale.set(1);
        this.cancelBtn.scale.set(1);
        if (CoreLib.Model.DeviceConfig.isLandscape) {
            sc = (CoreLib.UIUtil.getGameHeight() * 0.12) / this.okBtn.width;
        } else {
            sc = (CoreLib.UIUtil.getGameWidth() * 0.14) / this.okBtn.width;
        }

        this.okBtn.scale.set(sc);
        this.cancelBtn.scale.set(sc);

        CoreLib.UIUtil.setPosition(this.cancelBtn, this.popupbg.width / 2 - this.cancelBtn.width * 1.5, this.popupbg.height - this.cancelBtn.height * 1.2);
        CoreLib.UIUtil.setPosition(this.okBtn, this.popupbg.width / 2 + this.okBtn.width * 0.5, this.cancelBtn.y);

        this.x = (CoreLib.UIUtil.getGameWidth() - this.width) / 2;
        this.y = (CoreLib.UIUtil.getGameHeight() - this.height) / 2;
    }

}
