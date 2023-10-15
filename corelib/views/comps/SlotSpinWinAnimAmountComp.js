import { LibContainer } from "../../pixiwrapper/LibContainer";
import { CoreLib } from "../../core/CoreLib";
import { slotModel } from '../../models/SlotModel'
import { SlotSpinWinAmountComp } from "./SlotSpinWinAmountComp"
import { SlotEvents } from "../../events/SlotEvents";

export class SlotSpinWinAnimAmountComp extends SlotSpinWinAmountComp {
    constructor(config) {
        super(config);
        this.winText = this.elementsList["winText"];
        this.lastScore = 0;

        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.COIN_CASH_MODE_CHANGED, this.updateForCoinCash.bind(this));
        // this.showWin(100);
    }

    updateForCoinCash() {
        if (this.totalWin > 0) {
            this.winText.text = CoreLib.WrapperService.formatWinCurrency(this.totalWin);
        } 
        if( this.lastScore == 0 ){
            this.winText.text = "";
        }
    }

    showText(win) {
        this.winText.text = win;
    }

    showWin(val, level = 0, callback = null) {
        this.startScore = { score: this.lastScore };
        let delay = 2000;
        this.lastScore = val;
        this.totalWin = val;
        this.duration = CoreLib.Util.getAnimationDuration(val) * CoreLib.Util.getDefaultValue(this.configData.durationFactor, 1);
        this.scoreTween = CoreLib.AnimationManager.animateTween(this.startScore, this.duration, { delay: 0.25, score: this.totalWin, ease: Linear.easeNone, onUpdate: this.showValue.bind(this), onComplete: this.onScoreDone.bind(this) }, true);
    }
    //this.winText.text = CoreLib.WrapperService.formatWinCurrency(val);
    //this.timerId = setTimeout(this.sendDoneNotification.bind(this, callback), delay);
    showValue() {
        if (this.startScore.score <= this.totalWin) {
            this.winText.text = CoreLib.WrapperService.formatCurrency(this.startScore.score);
            this.emit("WinAmountUpdate", this.startScore.score);
        }
    }
    onScoreDone() {
        this.winText.text = CoreLib.WrapperService.formatCurrency(this.totalWin);
        this.emit("WinAmountFinalValueShown");
        CoreLib.EventHandler.dispatchEvent(SlotEvents.NORMAL_WIN_COUNTUP_DONE);
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(this.notifyEnd.bind(this), 1000);
    }
    notifyEnd() {
        clearTimeout(this.timeoutId);
        this.sendDoneNotification();
        this.emit("WinAmountCountUpDone");
    }
    clearWin() {
        CoreLib.AnimationManager.killTweensOf(this.startScore);
        this.winText.text = "";
        this.lastScore = 0;
        clearTimeout(this.timeoutId);
    }

}