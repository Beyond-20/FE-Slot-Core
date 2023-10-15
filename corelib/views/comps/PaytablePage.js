import {LibContainer} from "../../pixiwrapper/LibContainer";
import {CoreLib} from "../../core/CoreLib";

export class PaytablePage extends LibContainer {
    constructor(config) {
        super(config);
        this.screen1 = this.elementsList["screen1"];
        this.winUptoText = this.elementsList["winUptoText"];
        if (this.winUptoText) {
            this.winUptoText.anchor.set(0.5,0);
            CoreLib.UIUtil.updateWordWrapWidth(this.winUptoText, this.screen1.width);
            let arr = [this.winUptoText.configData.value];
            let str = CoreLib.Util.parseMessage(CoreLib.Util.getContent(this.winUptoText.configData.content), arr);
            this.winUptoText.text = str;
            CoreLib.UIUtil.setPositionX(this.winUptoText, this.screen1.x + this.screen1.width / 2);
        }

    }


}
