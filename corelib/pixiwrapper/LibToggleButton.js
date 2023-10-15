import {CoreLib} from "../core/CoreLib";
import {LibButton} from "./LibButton";

export class LibToggleButton extends LibButton {
    constructor(configData) {
        super(configData);
        this.selected = false;
    }

    setToggleState (flag) {
        this.selected = flag;
        this.onButtonOut();
        if (this.configData.activeTextColor != undefined) {
            CoreLib.UIUtil.updateTextColor(this.tText, flag ? CoreLib.UIUtil.getThemeColor(this.configData.activeTextColor) : CoreLib.UIUtil.getThemeColor(this.configData.inactiveTextColor));
        }
    }
    getToggleState () {
        return this.selected;
    }

    setButtonColor () {
        if (this.btn.currentFrame <= 2) {
            if (this.configData.buttonbgTint != undefined) {
                this.btn.tint = CoreLib.UIUtil.getThemeColor(this.configData.buttonbgTint);
            }
        } else {
            if (this.configData.toggleButtonTint != undefined) {
                this.btn.tint = CoreLib.UIUtil.getThemeColor(this.configData.toggleButtonTint);
            }
        }


    }
    onButtonClick () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.AppEvents.GENERIC_BUTTON_CLICK);
        if (this.callback) {
            this.callback(this.params);
            if (this.selected) {
                this.btn.gotoAndStop(3);
            } else {
                this.btn.gotoAndStop(0);

            }

        }
        this.setButtonColor();
    }
    onButtonDown () {
        if (this.selected) {
            this.btn.gotoAndStop(5);
        } else {
            this.btn.gotoAndStop(2);
        }

        if (this.downCallback) {
            this.downCallback(this.downParams);
        }
        this.setButtonColor();
    }
    onButtonOver () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.GENERIC_BUTTON_OVER)
        if (this.selected) {
            this.btn.gotoAndStop(4)
        } else {
            this.btn.gotoAndStop(1)
        }
        this.setButtonColor();

    }
    onButtonOut () {
        if (this.selected) {
            this.btn.gotoAndStop(3);
        } else {
            this.btn.gotoAndStop(0);
        }
        this.setButtonColor();
    }
    setEnabled (enable) {
        this.btn.interactive = enable;
        this.btn.buttonMode = enable;
        if (this.dynamicInactiveState) {
            if (enable) {
                this.alpha = 1;
                this.btn.filters = undefined;
            } else {
                // var colCoreLib = new PIXI.filters.ColorCoreLibFilter();
                // colCoreLib.greyscale(.2, .5);
                // this.btn.filters = [colCoreLib]
                this.alpha = 0.7;
            }
        } else {
            if (enable) {
                if (this.selected) {
                    this.btn.gotoAndStop(3);
                } else {
                    this.btn.gotoAndStop(0);
                }
            } else {
                // to do
            }
        }
        this.setButtonColor();
    }

}
