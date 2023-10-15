import {LibView} from "../../pixiwrapper/LibView";
import { CoreLib } from '../../core/CoreLib'

export class SlotGameBonusComp extends LibView
{
    constructor(config, layoutconfig) {
        super(config, layoutconfig);

        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.TRIGGER_FEATURE, this.onFeatureTrigger.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.INITIATE_BONUS_ROUND, this.initiateBonusGame.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SHOW_SELECT_BONUS, this.triggerSelectFeature.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.HIDE_BONUS_ROUND, this.hideBonusGame.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.HANDLE_FEATURE_RESPONSE_IN_GAME, this.handleFeatureResponse.bind(this));
        this.visible = false;
        this.isActive = false;
        CoreLib.Model.GameConfig.isBonusVisible = false;



    }

    triggerSelectFeature () {

    }

    handleFeatureResponse () {

    }

    hideBonusGame () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_MAINGAME_BG);
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_SLOTMACHINE_AND_PANEL, true);
        this.visible = false;
        this.isActive = false;
        CoreLib.Model.GameConfig.isBonusVisible = true;
    }

    onFeatureTrigger () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_BONUSGAME_BG);
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_SLOTMACHINE, false);
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_SLOTPANEL, false);
        this.initiateBonusGame();
    }
    initiateBonusGame () {
        CoreLib.Model.GameConfig.isBonusVisible = true;
    }

    sendFeatureRequest (selection) {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SELECT_BONUS_OPTION_SELECTED, selection);
    }

    getWidth () {
        if (this.guideRect) {
            return this.guideRect.width * this.scale.x;
        } else {
            return this.width;
        }

    }
    getHeight() {
        if (this.guideRect) {
            return this.guideRect.height * this.scale.y;
        } else {
            return this.height;
        }

    }


}
