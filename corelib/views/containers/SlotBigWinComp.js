import {LibContainer} from "../../pixiwrapper/LibContainer";
import {CoreLib} from "../../core/CoreLib";
import { slotModel } from '../../models/SlotModel'

export class SlotBigWinComp extends LibContainer {
    constructor(config) {
        super(config);
        this.modalRect = this.elementsList["modalRect"];
        this.alphaValue = this.modalRect.alpha;
        this.coinFallAnimation = this.elementsList["coinFallAnimation"];
        this.visible = false;
        this.winAmountComp = this.elementsList["winAmountComp"];
        this.winAmountComp.on("SCORE_COUNT_UP_DONE", this.onCountUpDone.bind(this));

        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SHOW_SLOT_BIG_WIN, this.showBigWin.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.CLEAR_SLOT_BIG_WIN, this.clearBigWin.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SLOT_MACHINE_POSITIONED, this.positionNow.bind(this));

        //setTimeout(this.showBigWin.bind(this, 5), 2000);
    }

    onCountUpDone () {
        if (this.coinFallAnimation) {
            this.coinFallAnimation.stopCoinFall();
        }
    }

    clearBigWin () {
        this.winAmountComp.clearWin();
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.RESTART_CUSTOM_WIN_ANIMATION);
        CoreLib.AnimationManager.animateTween(this.modalRect, 0.25, {alpha : 0, onComplete : this.onFadedOut.bind(this)});
        if (this.coinFallAnimation) {
            this.coinFallAnimation.stopCoinFall();
        }

    }
    onFadedOut () {
        this.visible = false;
    }

    showBigWin (level) {
        this.modalRect.alpha = 0;
        CoreLib.AnimationManager.animateTween(this.modalRect, 0.25, {alpha : this.alphaValue})
        let win = slotModel.getTotalWin();
        this.winAmountComp.showWin(win, level);
        this.resizeViewComponents();
        this.visible = true;
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.FADEOUT_BG_MUSIC);
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.STOP_CUSTOM_WIN_ANIMATION);
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.PLAY_ALL_WIN_SOUND_BIGWIN);
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.PLAY_CROWD_CHEERING_BIGWIN);
        setTimeout(this.stopCrowdCheeringBigWin.bind(this), 2500);
        if (this.coinFallAnimation) {
            this.coinFallAnimation.showCoinFallAnim();
        }
    }

    stopCrowdCheeringBigWin () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.STOP_CROWD_CHEERING_BIGWIN);
    }

    resizeViewComponents (layoutData = null) {
        super.resizeViewComponents(layoutData);
        this.modalRect.width = CoreLib.UIUtil.getGameWidth();
        this.modalRect.height = CoreLib.UIUtil.getGameHeight();

        this.winAmountComp.scale.set(1);
        let sc;
        let slotview = CoreLib.View.getSlotGameView().getSlotMachinComp();
        sc = (slotview.reelFrame.width * slotview.scale.x) / this.winAmountComp.getWidth();
        this.winAmountComp.scale.set(sc);

        //CoreLib.UIUtil.setPositionX(this.winAmountComp, (this.modalRect.width - this.winAmountComp.getWidth()) / 2);
        CoreLib.UIUtil.setPositionX(this.winAmountComp, slotview.x + slotview.reelFrame.x * slotview.scale.x + (slotview.reelFrame.width * slotview.scale.x - this.winAmountComp.getWidth()) / 2);
        CoreLib.UIUtil.setPositionY(this.winAmountComp, slotview.y + slotview.reelFrame.y * slotview.scale.y + (slotview.reelFrame.height * slotview.scale.y - this.winAmountComp.getHeight()) / 2 + CoreLib.Util.getDefaultValue(this.winAmountComp.configData.yPadding, 0));


    }
    positionNow () {
        this.resizeViewComponents();
    }

    onResizeEndEvent () {
        super.onResizeEndEvent();
        this.modalRect.width = CoreLib.UIUtil.getGameWidth();
        this.modalRect.height = CoreLib.UIUtil.getGameHeight();

    }


}
