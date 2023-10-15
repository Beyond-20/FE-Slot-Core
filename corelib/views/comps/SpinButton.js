import {LibContainer} from "../../pixiwrapper/LibContainer";
import {CoreLib} from "../../core/CoreLib";
import {LibButton} from "../../pixiwrapper/LibButton";

export class SpinButton extends LibButton {
    constructor(config) {
        super(config);

    }

    showUpState () {
        //CoreLib.AnimationManager.animateTween(this.iconsArray[0], 0.5, {rotation : CoreLib.Util.getRadians(360), repeat : -1, ease : Power1.easeNone});
    }



}
