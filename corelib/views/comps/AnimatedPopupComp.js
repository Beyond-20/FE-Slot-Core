import {SliderComp} from "./SliderComp";
import { CoreLib } from '../../core/CoreLib'
import { LibContainer } from '../../pixiwrapper/LibContainer'

export class AnimatedPopupComp extends LibContainer {
    constructor(config) {
        super(config);
        this.guideRect = this.elementsList["guideRect"];
        this.popupbg = this.elementsList["popupbg"];
        this.elements = this.elementsList["elements"];
        this.titleText = this.elements.elementsList["titleText"];
        this.message1 = this.elements.elementsList["message1"];
        this.message2 = this.elements.elementsList["message2"];
        this.okBtn = this.elements.elementsList["okBtn"];
        this.elements.visible = false;
        this.okBtn.addInteraction(this.onOKClicked.bind(this));
        this.cancelBtn = this.elements.elementsList["cancelBtn"];
        if (this.cancelBtn) {
            this.cancelBtn.addInteraction(this.onCancelClicked.bind(this));
        }
        this.popupbg.on("POPUP_OPENED", this.onPopupBGOpened.bind(this));
        this.popupbg.on("POPUP_CLOSED", this.onPopupBGClosed.bind(this));

        CoreLib.UIUtil.updateWordWrapWidth(this.message1, this.popupbg.width * CoreLib.Util.getDefaultValue(this.configData.wordWrapPerc, 0.50));
        CoreLib.UIUtil.updateWordWrapWidth(this.message2, this.popupbg.width * CoreLib.Util.getDefaultValue(this.configData.wordWrapPerc, 0.50));



    }

    updatePopup (obj) {
        this.resultObj = obj;
        this.elements.visible = false;
        this.popupbg.playAnimation("open");
    }
    onPopupBGOpened () {
        this.showElements(this.resultObj);
    }
    showElements (obj) {
        this.message1.scale.set(1);
        this.message2.scale.set(1);
        if (obj.textScale != undefined) {
            this.message1.scale.set(obj.textScale);
            this.message2.scale.set(obj.textScale);
        }
        this.callback = obj.callbankFunc;
        this.cancelCallback = obj.cancelCallbackFunc;
        this.titleText.text = obj.title;
        this.message1.text = obj.message1;
        this.message2.text = obj.message2;
        this.message2.y = this.message1.y + this.message1.height * 1.5;
        this.okBtn.setEnabled(true);
        if (obj.cancelCallbackFunc != undefined) {
            this.cancelBtn.setEnabled(true);
            this.okBtn.x = this.okBtn.configData.x2;
            this.cancelBtn.visible = true;
        } else {
            if (this.cancelBtn) {
                this.cancelBtn.visible = false;
            }
            this.okBtn.x = this.okBtn.configData.x;
        }

        this.elements.visible = true;
    }
    reset () {
        this.titleText.text = "";
        this.message1.text = "";
        this.message2.text = "";
    }

    onOKClicked () {
        this.answerType = "ok";
        this.okBtn.setEnabled(false);
        if (this.cancelBtn) {
            this.cancelBtn.setEnabled(false);
        }
        this.elements.visible = false;
        this.popupbg.playAnimation("close");
    }
    onCancelClicked () {
        this.okBtn.setEnabled(false);
        this.cancelBtn.setEnabled(false);
        if (this.cancelBtn) {
            this.cancelBtn.setEnabled(false);
        }
        this.answerType = "cancel";
        this.elements.visible = false;
        this.popupbg.playAnimation("close");
    }
    onPopupBGClosed () {
        if (this.answerType == "ok") {
            if (this.callback != undefined) {
                this.callback();
                this.callback = undefined;
            }
        } else if (this.answerType == "cancel") {
            if (this.cancelCallback != undefined) {
                this.cancelCallback();
                this.cancelCallback = undefined;
            }
        }

    }

}
