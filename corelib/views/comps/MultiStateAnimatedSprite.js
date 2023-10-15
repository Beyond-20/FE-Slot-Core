import {SliderComp} from "./SliderComp";
import { CoreLib } from '../../core/CoreLib'
import { LibContainer } from '../../pixiwrapper/LibContainer'

export class MultiStateAnimatedSprite extends LibContainer {
    constructor(config) {
        super(config);
        this.openAnim = this.elementsList["openAnim"];
        this.idleAnim = this.elementsList["idleAnim"];
        this.closeAnim = this.elementsList["closeAnim"];
        this.openAnim.loop = false;
        this.idleAnim.loop = true;
        this.closeAnim.loop = false;
        this.openAnim.onComplete = this.onPopupOpened.bind(this);
        this.closeAnim.onComplete = this.onPopupClosed.bind(this);
        this.openAnim.stopAnimation();
        this.idleAnim.stopAnimation();
        this.closeAnim.stopAnimation();

    }

    playAnimation (type) {
        if (type == "open") {
            this.closeAnim.stopAnimation();
            this.closeAnim.visible = false;
            this.idleAnim.stopAnimation();
            this.idleAnim.visible = false;
            this.isOpening = true;
            this.openAnim.playAnimation(false);
            this.openAnim.visible = true;
        } else if (type == "close") {
            this.idleAnim.visible = false;
            this.idleAnim.stopAnimation();
            this.openAnim.visible = false;
            this.openAnim.stopAnimation();
            this.closeAnim.playAnimation(false);
            this.closeAnim.visible = true;
            this.isOpening = false;
        }
    }
    onPopupOpened () {
        if (this.isOpening) {
            this.emit("POPUP_OPENED")
            this.openAnim.stopAnimation();
            this.openAnim.visible = false;
            this.idleAnim.playAnimation();
            this.idleAnim.visible = true;
        }

    }
    onPopupClosed () {
        this.closeAnim.stopAnimation();
        this.closeAnim.visible = false;
        this.emit("POPUP_CLOSED");
    }


}
