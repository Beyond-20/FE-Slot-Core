import {SliderComp} from "./SliderComp";
import { CoreLib } from '../../core/CoreLib'
import { LibContainer } from '../../pixiwrapper/LibContainer'

export class PTPageIndicator extends LibContainer {
    constructor(config) {
        super(config);
        this.bg = CoreLib.UIUtil.getSprite(this.configData.image);
        this.addChild(this.bg);

        let obj = {type : "Text", style : this.configData.textStyle};
        let pages = this.configData.pages;
        this.elementsArray = [];
        for (let k = 0; k < pages; k++) {
            let indi = CoreLib.UIUtil.getTextField(obj);
            indi.text = (k + 1);
            this.addChild(indi);
            indi.x = this.configData.ptx + (k * this.configData.gap);
            indi.y = this.configData.pty;
            this.elementsArray.push(indi);
        }

        this.showSelected(0)
    }

    showSelected(index) {
        let len = this.elementsArray.length;
        for (let k = 0; k < len; k++) {
            if (k == index) {
                CoreLib.UIUtil.updateTextStyle(this.elementsArray[k], this.configData.selectedtextStyle);
            } else {
                CoreLib.UIUtil.updateTextStyle(this.elementsArray[k], this.configData.textStyle);
            }
        }
    }

}
;