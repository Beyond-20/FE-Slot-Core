import {LibContainer} from "../../pixiwrapper/LibContainer";
import {CoreLib} from "../../core/CoreLib";
import { slotModel } from '../../models/SlotModel'

export class SlotWinAmountComp extends LibContainer {
    constructor(config) {
        super(config);
        this.guideRect = this.elementsList["guideRect"];
        this.guideRect.renderable = false;
        this.winText = this.elementsList["winText"];
        this.bigAnim = this.elementsList["bigAnim"];
        this.megaAnim = this.elementsList["megaAnim"];
        this.giganticAnim = this.elementsList["giganticAnim"];
        this.colossalWinAnim = this.elementsList["colossalWinAnim"];
        this.unbelievableWinAnim = this.elementsList["unbelievableWinAnim"];
        if (this.megaAnim) {
            this.megaAnim.visible = false;
            CoreLib.UIUtil.setPosition(this.megaAnim, this.guideRect.width * 0.5, this.guideRect.height * CoreLib.Util.getDefaultValue(this.megaAnim.configData.yPaddingPerc, 0.25));
        }
        if (this.giganticAnim) {
            this.giganticAnim.visible = false;
            CoreLib.UIUtil.setPosition(this.giganticAnim, this.guideRect.width * 0.5, this.guideRect.height * CoreLib.Util.getDefaultValue(this.giganticAnim.configData.yPaddingPerc, 0.25));
        }
        if (this.colossalWinAnim) {
            this.colossalWinAnim.visible = false;
            CoreLib.UIUtil.setPosition(this.colossalWinAnim, this.guideRect.width * 0.5, this.guideRect.height * CoreLib.Util.getDefaultValue(this.colossalWinAnim.configData.yPaddingPerc, 0.25));
        }
        if (this.unbelievableWinAnim) {
            this.unbelievableWinAnim.visible = false;
            CoreLib.UIUtil.setPosition(this.unbelievableWinAnim, this.guideRect.width * 0.5, this.guideRect.height * CoreLib.Util.getDefaultValue(this.unbelievableWinAnim.configData.yPaddingPerc, 0.25));
        }
        if(this.bigAnim) {
            this.bigAnim.visible = false;
            CoreLib.UIUtil.setPosition(this.bigAnim, this.guideRect.width * 0.5, this.guideRect.height * CoreLib.Util.getDefaultValue(this.bigAnim.configData.yPaddingPerc, 0.25));
        }
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.COIN_CASH_MODE_CHANGED, this.updateForCoinCash.bind(this));

        //this.showWin(122, 5);
    }
    updateForCoinCash() {
        if (CoreLib.Model.GameConfig.dontCountUp) {
            this.winText.text = CoreLib.WrapperService.formatWinCurrency(this.finalWinAmount);
        }
    }

    showWin (val, level = 0, callback = null) {
        let obj;
        this.winLevel = level;
        this.callback = callback;
        this.finalWinAmount = val;
        let delay = 2000;
        if (level == 1) {
            obj = this.configData.textData.bigWin;
            this.bigAnim.visible = true;
            this.bigAnim.addChild(this.winText);
            this.bigAnim.gotoAndPlay(0);
            CoreLib.AnimationManager.animateTween(this.bigAnim, 1, {scaleX: obj.scaleX, scaleY: obj.scaleY, repeat: -1, yoyo: true});
            delay = 3000;
        } else if (level == 2) {
            obj = this.configData.textData.megaWin;
            this.megaAnim.visible = true;
            this.megaAnim.addChild(this.winText);
            this.megaAnim.gotoAndPlay(0);
            CoreLib.AnimationManager.animateTween(this.megaAnim, 1, {scaleX : obj.scaleX, scaleY : obj.scaleY, repeat : -1, yoyo : true});
            delay = 4000;
        } else if (level == 3) {
            obj = this.configData.textData.giganticWin;
            this.giganticAnim.visible = true;
            this.giganticAnim.addChild(this.winText);
            this.giganticAnim.gotoAndPlay(0);
            CoreLib.AnimationManager.animateTween(this.giganticAnim, 1, {scaleX : obj.scaleX, scaleY : obj.scaleY, repeat : -1, yoyo : true});
            delay = 5000;
        } else if (level == 4) {
            obj = this.configData.textData.colossalWin;
            this.colossalWinAnim.visible = true;
            this.colossalWinAnim.addChild(this.winText);
            this.colossalWinAnim.gotoAndPlay(0);
            CoreLib.AnimationManager.animateTween(this.colossalWinAnim, 1, {scaleX : obj.scaleX, scaleY : obj.scaleY, repeat : -1, yoyo : true});
            delay = 6000;
        } else if (level == 5) {
            obj = this.configData.textData.unbelievableWin;
            this.unbelievableWinAnim.visible = true;
            this.unbelievableWinAnim.addChild(this.winText);
            this.unbelievableWinAnim.gotoAndPlay(0);
            CoreLib.AnimationManager.animateTween(this.unbelievableWinAnim, 1, {scaleX : obj.scaleX, scaleY : obj.scaleY, repeat : -1, yoyo : true});
            delay = 7000;
        } else {
            obj = this.configData.textData.win;
            this.addChild(this.winText)
        }

        if (obj.fontSize != undefined) {
            CoreLib.UIUtil.updateBitmapTextSize(this.winText, obj.fontSize);
        }

        if (obj.x != undefined) {
            CoreLib.UIUtil.setPositionX(this.winText, obj.x);
        }
        if (obj.y != undefined) {
            CoreLib.UIUtil.setPositionY(this.winText, obj.y);
        }
        this.totalWin = val;
        this.duration = CoreLib.Util.getAnimationDuration(val);
        if (CoreLib.Model.GameConfig.dontCountUp) {
            this.winText.text = CoreLib.WrapperService.formatWinCurrency(val);
            setTimeout(this.onScoreDone.bind(this), this.duration);
        } else {
            this.startScore = {score :0};
            this.scoreTween = CoreLib.AnimationManager.animateTween(this.startScore, this.duration, {score:this.totalWin,  ease:Linear.easeNone,  onUpdate :this.showValue.bind(this), onComplete : this.onScoreDone.bind(this)});
        }
        if (!this.configData.dontDoVibration) {
            CoreLib.Util.vibrateForBigWins();
        }


    }
    showValue () {
        this.winText.text = CoreLib.WrapperService.formatWinCurrency(this.startScore.score);
    }
    onScoreDone () {
        this.winText.text = CoreLib.WrapperService.formatWinCurrency(this.totalWin);
        setTimeout(this.sendDoneNotification.bind(this, this.callback), 3000);
    }

    sendDoneNotification (callback) {
        if (callback) {
            callback();
        } else {
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.EXIT_SPINWIN_AMOUNT);
        }
        if (!this.configData.dontDoVibration) {
            CoreLib.Util.stopVibration();
        }

    }

    clearWin () {
        this.winText.cacheAsBitmap = false;
        this.winText.text = "";
        if (this.winLevel > 0) {
            this.cleanUpAllBigWins();
        }
        CoreLib.EventHandler.dispatchEvent("STOP_BIG_WIN_COUNTUP");
    }
    cleanUpAllBigWins () {
        this.bigAnim.visible = false;
        this.bigAnim.gotoAndStop(0);
        CoreLib.AnimationManager.killTweensOf(this.bigAnim);
        if (this.megaAnim) {
            this.megaAnim.visible = false;
            this.megaAnim.gotoAndStop(0);
            CoreLib.AnimationManager.killTweensOf(this.megaAnim);
        }
        if (this.giganticAnim) {
            this.giganticAnim.visible = false;
            this.giganticAnim.gotoAndStop(0);
            CoreLib.AnimationManager.killTweensOf(this.giganticAnim);
        }
        if (this.colossalWinAnim) {
            this.colossalWinAnim.visible = false;
            this.colossalWinAnim.gotoAndStop(0);
            CoreLib.AnimationManager.killTweensOf(this.colossalWinAnim);
        }
        if (this.unbelievableWinAnim) {
            this.unbelievableWinAnim.visible = false;
            this.unbelievableWinAnim.gotoAndStop(0);
            CoreLib.AnimationManager.killTweensOf(this.unbelievableWinAnim);
        }

    }

}
