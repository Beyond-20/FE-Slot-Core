import {LibView} from "../../pixiwrapper/LibView";
import {CoreLib} from "../../core/CoreLib";
import {slotModel} from "../../models/SlotModel";
import { soundFactory } from '../../sound/SoundFactory'
import {View} from "../GameView";
import {UIUtil} from "../../pixiwrapper/UIUtilService";

export class FiveOfAKindComp extends LibView
{
    constructor(config, layoutconfig) {
        super(config, layoutconfig);
        this.fiveoak = this.elementsList["fiveoak"];
        this.fiveoak.stopAnimation();
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SHOW_50AK_WIN, this.showWin.bind(this));
        this.visible = false;
    }

    showWin(obj) {
        if (this.symbol) {
            this.symbol.destroy();
            this.removeChild(this.symbol);
            this.symbol = null;
        }
        this.fiveoak.playAnimation(this.fiveoak.configData.defaultState, true);
        this.visible = true;
        let anim = CoreLib.Model.GameConfig.symbolsData[obj.symbol];
        anim.type = "AnimatedSprite";
        this.symbol = CoreLib.UIUtil.getElement(anim);
        this.addChild(this.symbol);
        this.symbol.gotoAndPlay(0);
        this.symbol.scale.set(this.configData.symbolScale);
        this.symbol.x = this.configData.symbolX;
        this.symbol.y = this.configData.symbolY;

        setTimeout(this.clearAnims.bind(this), 2500);
    }

    clearAnims() {
        this.symbol.destroy();
        this.removeChild(this.symbol);
        this.symbol = null;
        this.visible = false;
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.FIVEOAK_WIN_COMPLETED);
    }

    resizeViewComponents() {
        super.resizeViewComponents();

    }


}
