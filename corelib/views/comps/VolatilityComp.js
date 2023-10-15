import {CoreLib} from "../../core/CoreLib";
import {LibContainer} from "../../pixiwrapper/LibContainer";

export class VolatilityComp extends LibContainer {
    constructor(config) {
        super(config);

        this.bg = CoreLib.UIUtil.getSprite("splash_volatilitybg");
        this.addChild(this.bg);

        let tconfig = {name : "titleText", type : "Text", content : "volatilityText", style : this.configData.textStyle, fontSize : this.configData.fontSize, mFontSize : this.configData.mFontSize, fontColor : this.configData.fontColor, anchor : {x : 0, y : 0}};
        this.titleTxt = CoreLib.UIUtil.getElement(tconfig);
        this.addChild(this.titleTxt);
        CoreLib.UIUtil.setPosition(this.titleTxt, 20, (this.bg.height - this.titleTxt.height)/ 2);
        const total = 5;
        const value = this.configData.value;
        let startx = this.titleTxt.x + this.titleTxt.width + 10;
        let xgap = 12;
        let posY = 10;
        for (let k = 1; k <= total; k++) {
            let element;
            if (k <= value) {
                element = CoreLib.UIUtil.getSprite("splash_volatilityOn");
            } else {
                element = CoreLib.UIUtil.getSprite("splash_volatilityOff");
            }
            this.addChild(element);
            element.x = this.bg.x + this.bg.width - xgap - (total - k + 1) * (element.width + xgap);
            element.y = (this.bg.height - element.height) / 2;
        }

    }


}
