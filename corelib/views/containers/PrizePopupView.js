import {LibView} from "../../pixiwrapper/LibView";
import {CoreLib} from "../../core/CoreLib";
import {slotModel} from "../../models/SlotModel";
import { soundFactory } from '../../sound/SoundFactory'
import {View} from "../../views/GameView";

export class PrizePopupView extends LibView
{
    constructor(config, layoutconfig) {
        super(config, layoutconfig);
        this.guideRect = this.elementsList["guideRect"];
        this.prizePopupComp = this.elementsList["prizePopupComp"];
        this.prizePopupComp.on("CloseClicked", this.closeView.bind(this));
        this.prizePopupComp.visible = false;
        this.prizePopupComp.y = -this.prizePopupComp.height * 1.5;
        this.hide();
        CoreLib.EventHandler.addEventListener("SHOW_PRIZE_POPUP", this.showPrizePopup.bind(this));

    }

    closeView () {
        this.hide();
    }

    showPrizePopup () {
        View.addToTop(this);
        this.visible = true;
        this.prizePopupComp.visible = true;
        this.prizePopupComp.y = -this.prizePopupComp.height * 1.5;
        CoreLib.EventHandler.dispatchEvent("TOURNAMENT_PRIZE_POPUP");
        CoreLib.AnimationManager.animateTween(this.prizePopupComp, 0.5, {y : (this.guideRect.height - this.prizePopupComp.popupbg.height * this.prizePopupComp.scale.y) / 2, ease : Linear.easeIn, onComplete : this.onAnimationComplete.bind(this)});
    }

    onAnimationComplete () {
        this.prizePopupComp.showAnimation();
    }

    resizeViewComponents () {
        super.resizeViewComponents();
        this.guideRect.width = CoreLib.UIUtil.getGameWidth();
        this.guideRect.height = CoreLib.UIUtil.getGameHeight();
        if (CoreLib.Model.DeviceConfig.isDesktop) {
            this.prizePopupComp.scale.set(0.8);
        }

        CoreLib.UIUtil.setPosition(this.prizePopupComp, (this.guideRect.width - this.prizePopupComp.popupbg.width * this.prizePopupComp.scale.x) / 2, (this.guideRect.height - this.prizePopupComp.popupbg.height * this.prizePopupComp.scale.y) / 2);
    }

}
