import {SliderComp} from "./SliderComp";
import { CoreLib } from '../../core/CoreLib'
import { LibContainer } from '../../pixiwrapper/LibContainer'

export class SettingsElement extends LibContainer {
    constructor(config) {
        super(config);
        this.toggleOption = this.elementsList["toggleOption"];
        this.toggleOption.on("TOGGLE_OPTION_CHANGED", this.onToggleChanged.bind(this));

        this.titleText = this.elementsList["titleText"];
        this.descText = this.elementsList["descText"];
        CoreLib.UIUtil.updateWordWrapWidth(this.descText, this.titleText.width);


    }

    onToggleChanged (state) {
        this.emit("TOGGLE_OPTION_CHANGED", state);
    }
    setStaticState (flag) {
        this.toggleOption.setStaticState(flag);
    }

}
