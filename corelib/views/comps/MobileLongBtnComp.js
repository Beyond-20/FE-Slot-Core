import {SliderComp} from "./SliderComp";
import { CoreLib } from '../../core/CoreLib'

export class MobileLongBtnComp extends SliderComp {
    constructor(config) {
        super(config);
        this.bg = this.elementsList["bg"];
        this.titleText = this.elementsList["titleText"];
        this.icon = this.elementsList["icon"];

        if (this.titleText.height > this.icon.height) {
            CoreLib.UIUtil.setPositionY(this.icon, (this.titleText.height - this.icon.height) / 2);
        } else {
            CoreLib.UIUtil.setPositionY(this.titleText, (this.icon.height - this.titleText.height) / 2);
        }
        CoreLib.UIUtil.setClickable(this.bg, true);
        CoreLib.UIUtil.addInteraction(this.bg, this.onBtnClicked.bind(this));
        this.bg.alpha = 0;

    }
    onBtnClicked () {
        this.emit("LongButtonClicked");
    }

    adjustWidth (wid) {
        this.bg.width = wid;
        CoreLib.UIUtil.setPositionX(this.icon, wid  - this.icon.width);
    }

}
