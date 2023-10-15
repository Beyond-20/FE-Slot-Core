import {LibContainer} from "../../pixiwrapper/LibContainer";
import {CoreLib} from "../../core/CoreLib";

export class PaytableItem extends LibContainer {
    constructor(config) {
        super(config);

        let obj = this.configData;
        obj.type = "Text";
        if (this.configData.content != undefined || this.configData.contentText != undefined) {
            this.descText = CoreLib.UIUtil.getElement(obj);
            this.addChild(this.descText);
        }

        if (this.configData.payouts != undefined) {
            obj.wordWrap = true;
            obj.wordWrapWidth = this.symb.width * 20;
            this.payoutsText = CoreLib.UIUtil.getElement(obj);
            this.payoutsText.text = "";
            let len = this.configData.payouts.length;
            for (let k = 0; k < len; k++) {
                if (k == len - 1) {
                    this.payoutsText.text += this.configData.payouts[k];
                } else {
                    this.payoutsText.text += this.configData.payouts[k] + "\n";
                }
            }
            this.addChild(this.payoutsText);
        }
        this.reposition();

    }

    reposition () {
        if (this.descText) {
            CoreLib.UIUtil.updateWordWrapWidth(this.descText, (CoreLib.Util.getDefaultValue(this.configData.descWidth, 300)));
        }
    }


}
