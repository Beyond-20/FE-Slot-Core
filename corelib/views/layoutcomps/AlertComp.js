import {LibView} from "../../pixiwrapper/LibView";
import {CoreLib} from "../../core/CoreLib";
import { PopupComp } from '../comps/PopupComp'
import { LibContainer } from '../../pixiwrapper/LibContainer'

export class AlertComp extends LibContainer
{
    constructor(config, layoutconfig) {
        super(config, layoutconfig);

        this.popupbg = this.elementsList["popupbg"];
        this.titlebg = this.elementsList["titlebg"];
        this.titleText = this.elementsList["titleText"];
        this.messageText = this.elementsList["messageText"];
        this.cancelBtn = this.elementsList["cancelBtn"];
        this.okBtn = this.elementsList["okBtn"];
        this.resizeViewComponents();

        this.okBtn.addInteraction(this.onOkClicked.bind(this));
        this.cancelBtn.addInteraction(this.onCancelClicked.bind(this));
        this.okBtn.setEnabled(true);
        this.cancelBtn.setEnabled(true);

        CoreLib.UIUtil.setModalState(this.popupbg, true);

        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SHOW_ALERT_POPUP, this.showAlertPopup.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.HIDE_ALERT_POPUP, this.hideAlertPopup.bind(this));
        this.visible = false;

        this.okBtn.visible = false;
        this.cancelBtn.visible = false;


    }
    onOkClicked () {
        this.okCallback();
    }
    onCancelClicked () {
        this.cancelCallback();
    }



    showAlertPopup (obj) {
        // return;
        this.titleText.text = obj.title;
        this.messageText.text = obj.message;
        this.okCallback = obj.okCallback;
        this.cancelCallback = obj.cancelCallback;
        this.visible = true;
        this.isSmall = obj.isPopup;
        this.okVisible = false;
        if (obj.callbankFunc) {
            this.okBtn.visible = true;
            this.okVisible = true;
            this.okCallback = obj.callbankFunc;
            this.okBtn.x = (this.popupbg.width - this.okBtn.width) / 2;
        }
        this.resizeViewComponents();
    }
    hideAlertPopup () {
        this.visible = false;
    }

    resizeViewComponents (layoutData = null) {
        super.resizeViewComponents(layoutData);
        if (this.isSmall) {
            if (CoreLib.Model.DeviceConfig.isDesktop) {
                this.popupbg.width = CoreLib.UIUtil.getGameWidth() * 0.5;
                this.popupbg.height = CoreLib.UIUtil.getGameHeight() * 0.5;

            } else {
                if (CoreLib.Model.DeviceConfig.isLandscape) {
                    this.popupbg.width = CoreLib.UIUtil.getGameWidth() * 0.75;
                    this.popupbg.height = CoreLib.UIUtil.getGameHeight() * 0.75;
                } else {
                    this.popupbg.width = CoreLib.UIUtil.getGameWidth();
                    this.popupbg.height = CoreLib.UIUtil.getGameHeight() * 0.32;
                }

            }
            this.titlebg.width = this.popupbg.width;

            if (CoreLib.Model.DeviceConfig.isLandscape) {
                this.titlebg.height = this.popupbg.height * 0.12;
            } else {
                this.titlebg.height = this.popupbg.height * 0.08;
            }
            this.titleText.scale.set(1);
            let sc = (this.titlebg.height * 0.6) / this.titleText.height;
            if (sc < 1) {
                this.titleText.scale.set(sc);
            }
            CoreLib.UIUtil.setPositionX(this.titleText, this.titlebg.width / 2);
            CoreLib.UIUtil.setPositionY(this.titleText, this.titlebg.y + this.titlebg.height / 2);

            this.messageText.scale.set(this.titleText.scale.x);
            CoreLib.UIUtil.setPositionX(this.messageText, this.titlebg.width / 2);
            CoreLib.UIUtil.setPositionY(this.messageText, this.popupbg.height / 2);

            let total = this.okBtn.width + this.cancelBtn.width * 2;
            let start = (this.popupbg.width - total) / 2;
            CoreLib.UIUtil.setPosition(this.cancelBtn, start, this.popupbg.height - this.cancelBtn.height * 1.5);
            CoreLib.UIUtil.setPosition(this.okBtn, (this.popupbg.width - this.okBtn.width) / 2, this.cancelBtn.y);
            this.okBtn.visible = true;

        } else {
            this.popupbg.width = CoreLib.UIUtil.getGameWidth();
            this.popupbg.height = CoreLib.UIUtil.getGameHeight();
            this.titlebg.width = this.popupbg.width;

            if (CoreLib.Model.DeviceConfig.isLandscape) {
                this.titlebg.height = this.popupbg.height * 0.12;
            } else {
                this.titlebg.height = this.popupbg.height * 0.08;
            }
            this.titleText.scale.set(1);
            let sc = (this.titlebg.height * 0.6) / this.titleText.height;
            if (sc < 1) {
                this.titleText.scale.set(sc);
            }
            CoreLib.UIUtil.setPositionX(this.titleText, this.titlebg.width / 2);
            CoreLib.UIUtil.setPositionY(this.titleText, this.titlebg.y + this.titlebg.height / 2);

            this.messageText.scale.set(this.titleText.scale.x);
            CoreLib.UIUtil.setPositionX(this.messageText, this.titlebg.width / 2);
            CoreLib.UIUtil.setPositionY(this.messageText, this.popupbg.height / 2);

            let total = this.okBtn.width + this.cancelBtn.width * 2;
            let start = (this.popupbg.width - total) / 2;
            CoreLib.UIUtil.setPosition(this.cancelBtn, start, this.popupbg.height - this.cancelBtn.height * 1.5);
            CoreLib.UIUtil.setPosition(this.okBtn, start + this.okBtn.width * 2, this.cancelBtn.y);

        }
        if (this.okVisible) {
            this.okBtn.x = (this.popupbg.width - this.okBtn.width) / 2;
        }

        this.emit("RESIZE_ALERT");

    }

}
