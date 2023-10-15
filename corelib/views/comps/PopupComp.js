import {SliderComp} from "./SliderComp";
import { CoreLib } from '../../core/CoreLib'
import { LibContainer } from '../../pixiwrapper/LibContainer'

export class PopupComp extends LibContainer {
    constructor(config) {
        super(config);
        this.popupbg = this.elementsList["popupbg"];
        this.popupbg2 = this.elementsList["popupbg2"];
        this.titleText = this.elementsList["titleText"];
        this.message1 = this.elementsList["message1"];
        this.message2 = this.elementsList["message2"];
        this.message3 = this.elementsList["message3"];
        this.okBtn = this.elementsList["okBtn"];

        this.okBtn.addInteraction(this.onOKClicked.bind(this));

    }

    updatePopup (obj) {
        if (this.popupbg2) {
            if (obj.bgType == 2) {
                this.popupbg.visible = false;
                this.popupbg2.visible = true;
                //CoreLib.UIUtil.updateTextSize(this.message2, this.message2.configData.fontSize2);
            } else {
                this.popupbg.visible = true;
                this.popupbg2.visible = false;
            }
        } else {

        }
        this.message1.scale.set(1);
        this.message2.scale.set(1);
        if(this.message3) {
            this.message3.scale.set(1);
        }
        if (obj.textScale != undefined) {
            this.message1.scale.set(obj.textScale);
            this.message2.scale.set(obj.textScale);
            if(this.message3) {
                this.message3.scale.set(obj.textScale);
            }
        }
        this.titleText.text = obj.title;
        this.message1.text = obj.message1;
        this.message2.text = obj.message2;
        if(this.message3) {
            this.message3.text = obj.message3;
        }
        if(obj.message2yPos) {
            this.message2.y = obj.message2yPos;
        }
        this.okBtn.setEnabled(true);
        this.callback = obj.callbankFunc;
    }

    reset () {
        this.titleText.text = "";
        this.message1.text = "";
        this.message2.text = "";
        if(this.message3) {
            this.message3.text = "";
        }
    }

    onOKClicked () {
        this.okBtn.setEnabled(false);
        if (this.callback != undefined) {
            this.callback();
            this.callback = undefined;
        }

    }

}
