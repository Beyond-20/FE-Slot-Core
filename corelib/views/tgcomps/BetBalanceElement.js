import {LibContainer} from "../../pixiwrapper/LibContainer";
import {CoreLib} from "../../core/CoreLib";

export class BetBalanceElement extends LibContainer {
    constructor(config) {
        super(config);
        this.titleText = this.elementsList["titleText"];
        this.valueText = this.elementsList["valueText"];
        this.positionElements();
    }

    positionElements () {
        this.valueText.anchor.set(0,0);
        this.titleText.anchor.set(0,0);
        this.titleText.text = CoreLib.Util.getContent(this.titleText.configData.content) + " : ";
        CoreLib.UIUtil.setPositionX(this.valueText, this.titleText.x + this.titleText.width * 1.02)
    }

    updateValue (val) {
        this.valueText.text = CoreLib.WrapperService.formatCurrency(val);
        this.positionElements();
    }


}
