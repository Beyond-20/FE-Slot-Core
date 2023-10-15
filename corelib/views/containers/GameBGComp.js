import {LibView} from "../../pixiwrapper/LibView";
import {CoreLib} from "../../core/CoreLib";

export class GameBGComp extends LibView
{
    constructor(config, layoutconfig) {
        super(config, layoutconfig);
        this.maingamebg = this.elementsList["maingamebg"];
        this.freespinbg = this.elementsList["freespinbg"];
        this.splashBG = this.elementsList["splashbg"];
        if (this.freespinbg) {
            this.freespinbg.visible = false;
        }
        this.currentBG = "main";
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SHOW_MAINGAME_BG, this.showMaingameBG.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SHOW_FREEGAME_BG, this.showFreegameBG.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SHOW_BONUSGAME_BG, this.showBonusgameBG.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SHOW_SPLASH_BG, this.showSplashBG.bind(this));
    }

    showMaingameBG (fadein = true) {

        this.addChild(this.maingamebg);
        this.maingamebg.visible = true;
        if (this.currentBG != "main") {
            if (fadein) {
                this.maingamebg.alpha = 0;
                CoreLib.AnimationManager.animateTween(this.maingamebg, 1, { alpha: 1 });
            }
        }
        this.currentBG = "main";
    }
    showFreegameBG (fadein = true) {
        this.addChild(this.freespinbg);
        this.freespinbg.visible = true;
        if (this.currentBG != "freespin") {
            if (fadein) {
                this.freespinbg.alpha = 0;
                CoreLib.AnimationManager.animateTween(this.freespinbg, 1, { alpha: 1 });
            }
        }
        this.currentBG = "freespin";
    }
    showBonusgameBG (fadein = true) {
        // this.addChild(this.bonusgamebg);
        // if (fadein) {
        //     this.bonusgamebg.visible = true;
        //     this.bonusgamebg.alpha = 0;
        //     CoreLib.AnimationManager.animateTween(this.bonusgamebg, 1, {alpha : 1});
        // }
    }
    showSplashBG (fadein = true) {
        if (this.splashBG) {
            this.addChild(this.splashBG);
            this.splashBG.visible = true;
            this.currentBG = "splash";
        }
    }
    resizeViewComponents() {
        super.resizeViewComponents();
    }


}
