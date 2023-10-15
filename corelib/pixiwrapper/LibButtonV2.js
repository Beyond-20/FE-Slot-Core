import {CoreLib} from "../core/CoreLib";
import {LibAnimatedSprite} from "./LibAnimatedSprite";
import {soundFactory} from "../sound/SoundFactory";

export class LibButtonV2 extends PIXI.Container {
    constructor(options) {
        super();
        this.configData = options;
        this.createView();
    }

    getConfigData () {
        return this.configData;
    }

    createView () {

        let arr = [];
        if (this.configData.images) {
            let len = this.configData.images.length;
            if (len >= 4) {
                this.dynamicInactiveState = false;
            } else {
                this.dynamicInactiveState = true;
            }
            for (let k = 0; k < len; k++) {
                if (this.configData.images[k] == "") {
                    arr.push(CoreLib.UIUtil.getTexture(this.configData.images[0]));
                } else {
                    arr.push(CoreLib.UIUtil.getTexture(this.configData.images[k]));
                }
            }

            this.btn = new LibAnimatedSprite(arr);
        }

        this.addChild(this.btn);

        if (this.configData.icon) {
            let iconlen = this.configData.icon.length;
            this.iconsArray = [];
            if (iconlen > 0) {
                for (let i = 0; i < iconlen; i++) {
                    var icon = CoreLib.UIUtil.getSprite(this.configData.icon[i]);
                    icon.anchor.set(0.5,0.5);
                    CoreLib.UIUtil.alignToObject(icon, "center", this.btn, icon.width / 2, icon.height / 2);
                    CoreLib.UIUtil.alignToObject(icon, "middle", this.btn, icon.width / 2, icon.height / 2);
                    this.addChild(icon);
                    icon.interactive = false;
                    icon.buttonMode = false;
                    this.iconsArray.push(icon);
                }
            }
        }
        if (this.configData.textConfig) {
            this.tText = CoreLib.UIUtil.getTextField(this.configData.textConfig);
            this.addChild(this.tText);
            CoreLib.UIUtil.alignToObject(this.tText, "center", this.btn, CoreLib.Util.getDefaultValue(this.tText.configData.hPadding, 0));
            CoreLib.UIUtil.alignToObject(this.tText, "middle", this.btn, 0, CoreLib.Util.getDefaultValue(this.tText.configData.vPadding, 0));
        }

        this.initListeners();
    }
    changeTextColor (col) {
        CoreLib.UIUtil.updateTextColor(this.tText, CoreLib.UIUtil.getThemeColor(col));
    }
    changeButtonTint (col) {
        this.btn.tint = CoreLib.UIUtil.getThemeColor(col);
    }
    changeButtonAlpha (alpha) {
        this.btn.alpha = alpha;
    }
    changeText (str) {
        if (this.tText) {
            this.tText.text = str;
            CoreLib.UIUtil.alignToObject(this.tText, "center", this.btn, CoreLib.Util.getDefaultValue(this.tText.configData.hPadding, 0));
            CoreLib.UIUtil.alignToObject(this.tText, "middle", this.btn, 0, CoreLib.Util.getDefaultValue(this.tText.configData.vPadding, 0));
        }
    }
    initListeners() {
        this.btn.mousedown = this.onButtonDown.bind(this);
        this.btn.mouseover = this.onButtonOver.bind(this);
        this.btn.mouseout = this.onButtonOut.bind(this);

        this.btn.touchstart = this.onButtonDown.bind(this);
        this.btn.touchend = this.btn.touchendoutside = this.onButtonOut.bind(this);
        this.btn.touchend = this.onButtonClick.bind(this);
        this.btn.mouseup = this.onButtonClick.bind(this);
    }

    onButtonClick () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.PLAY_GENERIC_BUTTON_SOUND);
        this.btn.gotoAndStop(0);
        if (this.callback) {
            this.callback(this.params);
        }
    }
    onButtonDown () {
        this.btn.gotoAndStop(2);
        if (this.downCallback) {
            this.downCallback(this.downParams);
        }
    }
    onButtonOver () {
        this.btn.gotoAndStop(1);
    }
    onButtonOut () {
        this.btn.gotoAndStop(0);
        this.showUpState();
    }
    addInteraction (callback, params) {
        this.callback = callback;
        this.params = params;
    }
    addDownInteraction (callback, params) {
        this.downCallback = callback;
        this.downParams = params;
    }
    enable () {
        this.setEnabled(true);
    }
    disable () {
        this.setEnabled(false);
    }
    getEnabled () {
        return this.interactive;
    }
    setEnabled (enable, useAlpha = true) {
        this.interactive = enable;
        this.btn.interactive = enable;
        this.btn.buttonMode = enable;
        if (enable) {
            this.btn.gotoAndStop(0);
            this.btn.alpha = 1;
            if (this.iconsArray) {
                this.setIconTint(0xffffff)
            }
            this.showUpState();
        } else {
            this.btn.gotoAndStop(0);
            if (useAlpha) {
                this.btn.alpha = 0.5;
            }

            if (this.iconsArray) {
                this.setIconTint(0xcccccc)
            }
            this.showInactiveState();
        }
    }
    showUpState () {

    }
    showInactiveState() {

    }
    setScale (scale) {
        this.btn.scale.set(scale);
    }
    setAnchor (xVal, yVal) {
        this.btn.anchor.set(xVal, yVal);
    }
    getConfigData () {
        return this.configData;
    }
    setTint (col) {
        this.btn.tint = col;
    }
    setIconTint (col) {
        if (this.iconsArray) {
            let len = this.iconsArray.length;
            if (len > 0) {
                for (let k = 0; k < len; k++) {
                    this.iconsArray[k].tint = col;
                }
            }
        }
    }

    destroyView () {
        this.destroy();
    }
    onResizeStartEvent () {
    }
    onResizeEndEvent() {
    }
}
