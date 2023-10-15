import {CoreLib} from "../../core/CoreLib";
import {LibContainer} from "../../pixiwrapper/LibContainer";

export class AnimatedToggleOption extends LibContainer {
    constructor(config) {
        super(config);
        this.onbg = this.elementsList["onbg"];
        this.offbg = this.elementsList["offbg"];

        this.offbtn = this.elementsList["offbtn"];
        this.onbtn = this.elementsList["onbtn"];


        const xPadding = 16;
        CoreLib.UIUtil.setPositionX(this.onbg, 0);
        CoreLib.UIUtil.setPositionX(this.offbg, 0);
        CoreLib.UIUtil.setPositionX(this.offbtn, 0);
        CoreLib.UIUtil.setPositionX(this.onbtn, this.onbg.width - this.onbtn.width);


        CoreLib.UIUtil.addInteraction(this.onbg, this.onBGClicked.bind(this));
        CoreLib.UIUtil.setClickable(this.onbg, true);
        CoreLib.UIUtil.addInteraction(this.offbg, this.onBGClicked.bind(this));
        CoreLib.UIUtil.setClickable(this.offbg, true);
        this.state = this.configData.state == undefined ? false : this.configData.state;
        this.setState(this.state, true);
    }
    setStaticState (state) {
        this.state = state;
        this.onbg.visible = this.state;
        this.offbg.visible = this.state ? false : true;
        if (state) {
            this.offbtn.visible = false;
            this.onbtn.visible = true;
            this.onbtn.x = 0;
            this.onbtn.x = this.onbg.width - this.onbtn.width;
        } else {
            this.offbtn.visible = true;
            this.onbtn.visible = false;
            this.offbtn.x = this.onbg.width - this.offbtn.width;
            this.offbtn.x = 0;
        }
    }
    setState (state, isForced = false) {
        if (this.state == state && !isForced) {
            return;
        }

        this.state = state;
        this.onbg.visible = this.state;
        this.offbg.visible = this.state ? false : true;
        if (state) {
            this.offbtn.visible = false;
            this.onbtn.visible = true;
            this.onbtn.x = 0;
            CoreLib.AnimationManager.animateTween(this.onbtn, 0.15, {x : this.onbg.width - this.onbtn.width, ease : Power2.easeOut});
        } else {
            this.offbtn.visible = true;
            this.onbtn.visible = false;
            this.offbtn.x = this.onbg.width - this.offbtn.width;
            CoreLib.AnimationManager.animateTween(this.offbtn, 0.15, {x : 0, ease : Power2.easeOut});
        }
        this.emit("TOGGLE_OPTION_CHANGED", this.state);

    }
    getState () {
        return this.state;
    }

    onBGClicked(data) {
        this.setState(this.state ? false : true);

    }


}
