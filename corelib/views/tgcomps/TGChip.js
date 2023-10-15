import { LibContainer } from '../../pixiwrapper/LibContainer'
import {CoreLib} from '../../core/CoreLib'

export class TGChip extends LibContainer {
    constructor(config) {
        super(config);

        this.chip = CoreLib.UIUtil.getSprite("chip" + config.imageNo);
        this.addChild(this.chip);
        this.chip.anchor.set(0.5,0.5);

        let chiptext = {name : "titleText", type : "Text", content : "", style : "ChipValueText"};
        this.numberText = CoreLib.UIUtil.getElement(chiptext);
        this.numberText.anchor.set(0.5,0.5);
        this.numberText.x = 0;
        this.numberText.y = -2;
        this.numberText.text = CoreLib.Util.getDecimalOrNumberValue(config.chipValue);
        this.addChild(this.numberText);

        CoreLib.UIUtil.addInteraction(this.chip, this.onChipClicked.bind(this));
    }
    setOrientation (flag) {
        this.rotation = CoreLib.Util.getRadians(flag ? 0 : 90);
    }
    onChipClicked () {
        this.emit("OnChipSelected", this.configData.id)
    }

    setEnabled (flag) {
        CoreLib.UIUtil.setClickable(this.chip, flag);
    }

    setSelected (flag) {
        if (flag) {
            const glow = new PIXI.filters.GlowFilter(8, 4, 0, 0xfbff90, 1)
            this.chip.filters = [glow];
        } else {
            this.chip.filters = null;
            // var colCoreLib = new PIXI.filters.ColorMatrixFilter();
            // colCoreLib.brightness(0.8, true);
            // this.chip.filters = [colCoreLib];
        }

        let scale = flag ? 0.9 : 0.8;
        CoreLib.AnimationManager.animateTween(this.chip, 0.25, {scaleX : scale, scaleY : scale});
        //CoreLib.AnimationManager.animateTween(this.numberText, 0.25, {scaleX : scale, scaleY : scale});
    }
    showHover (flag) {
        let scale = flag ? 1.1 : 1;
        CoreLib.AnimationManager.animateTween(this.chip, 0.25, {scaleX : scale, scaleY : scale});
    }
    setEnabled (flag) {
        CoreLib.UIUtil.setClickable(this.chip, flag);
    }

    onBGRollOver () {
        this.emit("OnNumberHover", this);
    }
    onBGRollOut () {
        this.emit("OnNumberOut", this);
    }

    destroyComp () {
        this.chip.destroy();
        //this.numberText.destroy();
    }



}
