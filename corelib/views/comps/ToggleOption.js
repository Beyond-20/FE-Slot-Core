import {CoreLib} from "../../core/CoreLib";
import {LibContainer} from "../../pixiwrapper/LibContainer";

export class ToggleOption extends LibContainer {
    constructor(config) {
        super(config);
        this.onbg = this.elementsList["onbg"];
        this.offbg = this.elementsList["offbg"];
        this.titleText = this.elementsList["titleText"];


        const xPadding = 16;
        CoreLib.UIUtil.setPositionX(this.onbg, 0);
        CoreLib.UIUtil.setPositionX(this.offbg, 0);
        CoreLib.UIUtil.setPositionX(this.titleText, this.onbg.x + this.onbg.width + xPadding);
        CoreLib.UIUtil.setPositionY(this.titleText, (this.onbg.height - this.titleText.height) / 2);


        CoreLib.UIUtil.addInteraction(this.onbg, this.onBGClicked.bind(this));
        CoreLib.UIUtil.setClickable(this.onbg, true);
        CoreLib.UIUtil.addInteraction(this.offbg, this.onBGClicked.bind(this));
        CoreLib.UIUtil.setClickable(this.offbg, true);
        this.setState(this.configData.state);
    }

    setState (state) {
        if (this.state == state) {
            return;
        }
        this.state = state;
        this.onbg.visible = this.state;
        this.offbg.visible = this.state ? false : true;

    }
    getState () {
        return this.state;
    }

    onBGClicked(data) {
        this.setState(this.state ? false : true);
        this.emit("TOGGLE_OPTION_CHANGED", this.state);
    }


}
