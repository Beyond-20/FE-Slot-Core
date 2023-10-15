import {CoreLib} from "../../core/CoreLib";
import {LibContainer} from "../../pixiwrapper/LibContainer";

export class WinAmountComp extends LibContainer {
    constructor(config) {
        super(config);
        this.winText = this.elementsList["winText"];
        this.lastScore = 0;

    }

    showText (win) {
        this.winText.text = win;
    }

    showWin (win, showAnim = true, prevScore = 0) {
        this.startScore = {score :prevScore};
        this.lastScore = win;
        this.totalWin = win;
        this.duration = CoreLib.Util.getAnimationDuration(win);
        if (showAnim) {
            this.scoreTween = CoreLib.AnimationManager.animateTween(this.startScore, this.duration, {delay : 0.5, score: this.totalWin,  ease:Linear.easeNone,  onUpdate :this.showValue.bind(this), onComplete : this.onScoreDone.bind(this)});
        } else {
            this.onScoreDone();
        }

    }
    showValue () {
        if (this.startScore.score <= this.totalWin) {
            this.winText.text = CoreLib.WrapperService.formatCurrency(this.startScore.score);
            this.emit("WinAmountUpdate", this.startScore.score);
        }
    }
    onScoreDone () {
        this.winText.text = CoreLib.WrapperService.formatCurrency(this.totalWin);
        this.emit("WinAmountFinalValueShown");
        setTimeout(this.notifyEnd.bind(this), 1000);
    }
    notifyEnd () {
        this.emit("WinAmountCountUpDone");
    }
    clearWin () {
        CoreLib.AnimationManager.killTweensOf(this.startScore);
        this.winText.text = "";
        this.lastScore = 0;
    }



}
