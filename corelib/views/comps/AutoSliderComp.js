import {SliderComp} from "./SliderComp";
import { CoreLib } from '../../core/CoreLib'

export class AutoSliderComp extends SliderComp {
    constructor(config) {
        super(config);
        if (CoreLib.Model.DeviceConfig.isDesktop) {
            this.createView(this.configData.sliderWidth, this.configData.sliderLength, this.configData.totalValue, this.configData.title, this.parent);
        } else {
            this.createView(this.configData.mSliderWidth, this.configData.mSliderLength, this.configData.totalValue, this.configData.title, this.parent);
        }



    }

}
