import {SliderComp} from "./SliderComp";
import { CoreLib } from '../../core/CoreLib'
import { LibContainer } from '../../pixiwrapper/LibContainer'

export class SlotPaylinesComp extends LibContainer {
    constructor(config) {
        super(config);
        this.hidePayline();
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SHOW_PAYLINE, this.showPayline.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.HIDE_PAYLINE, this.hidePayline.bind(this));
    }

    showPayline(index) {
        if (index > 0) {
            this.elementsList["payline" + index].visible = true;
        }

    }
    hidePayline () {
        for (let p in this.elementsList) {
            this.elementsList[p].visible = false;
        }
    }

}
