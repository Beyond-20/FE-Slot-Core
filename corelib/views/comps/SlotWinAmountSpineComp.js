import {LibContainer} from "../../pixiwrapper/LibContainer";
import {CoreLib} from "../../core/CoreLib";
import { slotModel } from '../../models/SlotModel'

export class SlotWinAmountSpineComp extends LibContainer {
    constructor(config) {
        super(config);
        this.guideRect = this.elementsList["guideRect"];
        this.guideRect.renderable = false;
        this.bigwinbg = this.elementsList["bigwinbg"];
        this.customWinBG = this.elementsList["customWinBG"];
        this.winbg = this.elementsList["winbg"];
        this.winText = this.elementsList["winText"];
        this.bigAnim = this.elementsList["bigAnim"];
        this.megaAnim = this.elementsList["megaAnim"];
        this.giganticAnim = this.elementsList["giganticAnim"];
        this.colossalWinAnim = this.elementsList["colossalWinAnim"];
        this.unbelievableWinAnim = this.elementsList["unbelievableWinAnim"];
        this.fiveoak = this.elementsList["fiveoak"];
        this.fiveoakEffect = this.elementsList["fiveoakEffect"];

        if(this.bigAnim) {
            this.bigAnim.visible = false;
            CoreLib.UIUtil.setPosition(this.bigAnim, this.guideRect.width * 0.5, this.guideRect.height * CoreLib.Util.getDefaultValue(this.bigAnim.configData.yPaddingPerc, 0.25));
            this.bigAnim.addEventListener("complete", this.onSpineAnimComplete.bind(this));
        }
        if (this.megaAnim) {
            this.megaAnim.visible = false;
            CoreLib.UIUtil.setPosition(this.megaAnim, this.guideRect.width * 0.5, this.guideRect.height * CoreLib.Util.getDefaultValue(this.megaAnim.configData.yPaddingPerc, 0.25));
            this.megaAnim.addEventListener("complete", this.onSpineAnimComplete.bind(this));
        }
        if (this.giganticAnim) {
            this.giganticAnim.visible = false;
            CoreLib.UIUtil.setPosition(this.giganticAnim, this.guideRect.width * 0.5, this.guideRect.height * CoreLib.Util.getDefaultValue(this.giganticAnim.configData.yPaddingPerc, 0.25));
            this.giganticAnim.addEventListener("complete", this.onSpineAnimComplete.bind(this));
        }
        if (this.colossalWinAnim) {
            this.colossalWinAnim.visible = false;
            CoreLib.UIUtil.setPosition(this.colossalWinAnim, this.guideRect.width * 0.5, this.guideRect.height * CoreLib.Util.getDefaultValue(this.colossalWinAnim.configData.yPaddingPerc, 0.25));
            this.colossalWinAnim.addEventListener("complete", this.onSpineAnimComplete.bind(this));
        }
        if (this.unbelievableWinAnim) {
            this.unbelievableWinAnim.visible = false;
            CoreLib.UIUtil.setPosition(this.unbelievableWinAnim, this.guideRect.width * 0.5, this.guideRect.height * CoreLib.Util.getDefaultValue(this.unbelievableWinAnim.configData.yPaddingPerc, 0.25));
            this.unbelievableWinAnim.addEventListener("complete", this.onSpineAnimComplete.bind(this));
        }

        if(this.fiveoak) {
            //this.fiveoak.visible = false;
            CoreLib.UIUtil.setPosition(this.fiveoak, this.guideRect.width * 0.5, this.guideRect.height * CoreLib.Util.getDefaultValue(this.fiveoak.configData.yPaddingPerc, 0.25));
        }
        if(this.fiveoakEffect) {
            //this.fiveoak.visible = false;
            CoreLib.UIUtil.setPosition(this.fiveoakEffect, this.guideRect.width * 0.5, this.guideRect.height * CoreLib.Util.getDefaultValue(this.fiveoakEffect.configData.yPaddingPerc, 0.25));
        }


        if (this.bigwinbg) {
            this.bigwinbg.anchor.set(0.5,0);
            CoreLib.UIUtil.setPositionX(this.bigwinbg, this.guideRect.width * 0.5 + CoreLib.Util.getDefaultValue(this.bigwinbg.configData.xPadding, 0));
        }
        if (this.customWinBG) {
            CoreLib.UIUtil.setPositionX(this.customWinBG, this.guideRect.width * 0.5 + CoreLib.Util.getDefaultValue(this.customWinBG.configData.xPadding, 0));
        }
        if (this.winbg) {
            this.winbg.stopAnimation();
            this.winbg.visible = false;
        }

        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.COIN_CASH_MODE_CHANGED, this.updateForCoinCash.bind(this));
        //this.showWin(200, 0)
    }

    updateForCoinCash() {
        if ( this.finalWinAmount > 0 ) {
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
            this.bigAnim.scale.x = this.bigAnim.scale.y = CoreLib.Util.getDefaultValue(this.bigAnim.configData.scale, 1);
            this.bigAnim.visible = true;
            if (this.bigAnim.configData.start != undefined) {
                this.bigAnim.playAnimation(this.bigAnim.configData.start, false);
            } else {
                this.bigAnim.playAnimation(this.bigAnim.configData.defaultState, this.bigAnim.configData.loop != undefined ? this.bigAnim.configData.loop : true);
            }

            delay = 3000;
        } else if (level == 2) {
            obj = this.configData.textData.megaWin;
            this.megaAnim.scale.x = this.megaAnim.scale.y = CoreLib.Util.getDefaultValue(this.megaAnim.configData.scale, 1);
            this.megaAnim.visible = true;
            this.megaAnim.playAnimation(this.megaAnim.configData.defaultState, this.megaAnim.configData.loop != undefined ? this.megaAnim.configData.loop : true);
            delay = 4000;
        } else if (level == 3) {
            obj = this.configData.textData.giganticWin;
            this.giganticAnim.scale.x = this.giganticAnim.scale.y = CoreLib.Util.getDefaultValue(this.giganticAnim.configData.scale, 1);
            this.giganticAnim.visible = true;
            this.giganticAnim.playAnimation(this.giganticAnim.configData.defaultState, this.giganticAnim.configData.loop != undefined ? this.giganticAnim.configData.loop : true);
            delay = 5000;
        } else if (level == 4) {
            obj = this.configData.textData.colossalWin;
            this.colossalWinAnim.scale.x = this.colossalWinAnim.scale.y = CoreLib.Util.getDefaultValue(this.colossalWinAnim.configData.scale, 1);
            this.colossalWinAnim.visible = true;
            this.colossalWinAnim.playAnimation(this.colossalWinAnim.configData.defaultState, this.colossalWinAnim.configData.loop != undefined ? this.colossalWinAnim.configData.loop : true);
            delay = 6000;
        } else if (level == 5) {
            obj = this.configData.textData.unbelievableWin;
            this.unbelievableWinAnim.scale.x = this.unbelievableWinAnim.scale.y = CoreLib.Util.getDefaultValue(this.unbelievableWinAnim.configData.scale, 1);
            this.unbelievableWinAnim.visible = true;
            this.unbelievableWinAnim.playAnimation(this.unbelievableWinAnim.configData.defaultState, this.unbelievableWinAnim.configData.loop != undefined ? this.unbelievableWinAnim.configData.loop : true);
            delay = 7000;
        } else if (level == 6) {
            obj = this.configData.textData.fiveoak;
            this.fiveoakEffect.scale.x = this.fiveoakEffect.scale.y = CoreLib.Util.getDefaultValue(this.fiveoakEffect.configData.scale, 1);
            this.fiveoakEffect.visible = true;
            this.fiveoakEffect.playAnimation(this.fiveoakEffect.configData.defaultState, this.fiveoakEffect.configData.loop != undefined ? this.fiveoakEffect.configData.loop : true);

            this.fiveoak.scale.x = this.fiveoak.scale.y = CoreLib.Util.getDefaultValue(this.fiveoak.configData.scale, 1);
            this.fiveoak.visible = true;
            this.fiveoak.playAnimation(this.fiveoak.configData.defaultState, this.fiveoak.configData.loop != undefined ? this.fiveoak.configData.loop : true);

            delay = 4000;
        } else {
            if (this.winbg) {
                this.winbg.visible = true;
                this.winbg.playAnimation(this.winbg.configData.defaultState);
            }
            obj = this.configData.textData.win;
            this.addChild(this.winText)
        }
        if (this.bigwinbg) {
            this.bigwinbg.visible = true;
        }
        if (this.customWinBG) {
            this.customWinBG.visible = true;
            this.customWinBG.playAnimation();
        }
        if (obj.x != undefined) {
            CoreLib.UIUtil.setPositionY(this.winText, obj.x);
        }
        if (obj.y != undefined) {
            CoreLib.UIUtil.setPositionY(this.winText, obj.y);
        }
        if (this.winText.configData.dynamicFont) {
            CoreLib.UIUtil.updateTextSize(this.winText, obj.fontSize);
        } else {
            CoreLib.UIUtil.updateBitmapTextSize(this.winText, obj.fontSize);
        }


        this.totalWin = val;
        this.duration = CoreLib.Util.getAnimationDuration(val);
        if (CoreLib.Model.GameConfig.dontCountUp) {
            this.winText.text = CoreLib.WrapperService.formatWinCurrency(val);
            setTimeout(this.onScoreDone.bind(this), this.duration);
        } else {
            this.startScore = {score :0};
            this.scoreTween = CoreLib.AnimationManager.animateTween(this.startScore, this.duration, {score:this.totalWin,  ease:Linear.easeNone,  onUpdate :this.showValue.bind(this), onComplete : this.onScoreDone.bind(this)});
            setTimeout(this.sendCountUpEarlyNotification.bind(this), this.duration * 900)
        }
        if (!this.configData.dontDoVibration) {
            CoreLib.Util.vibrateForBigWins();
        }

        //this.winText.text = CoreLib.WrapperService.formatWinCurrency(val);
    }

    onSpineAnimComplete (data) {
        if (data.name == "idle") {
            return;
        }
        if (this.configData.loopAfterEnd) {
            if (this.winLevel == 1) {
                this.bigAnim.scale.x = this.bigAnim.scale.y = CoreLib.Util.getDefaultValue(this.bigAnim.configData.scale, 1);
                CoreLib.AnimationManager.animateTween(this.bigAnim, 0.5, {repeat : -1, yoyo : true, scaleX : this.bigAnim.scale.x * 1.1, scaleY : this.bigAnim.scale.x * 1.1})
            } else if (this.winLevel == 2) {
                this.megaAnim.scale.x = this.megaAnim.scale.y = CoreLib.Util.getDefaultValue(this.megaAnim.configData.scale, 1);
                CoreLib.AnimationManager.animateTween(this.megaAnim, 0.5, {repeat : -1, yoyo : true, scaleX : this.megaAnim.scale.x * 1.1, scaleY : this.megaAnim.scale.x * 1.1})
            } else if (this.winLevel == 3) {
                this.giganticAnim.scale.x = this.giganticAnim.scale.y = CoreLib.Util.getDefaultValue(this.giganticAnim.configData.scale, 1);
                CoreLib.AnimationManager.animateTween(this.giganticAnim, 0.5, {repeat : -1, yoyo : true, scaleX : this.giganticAnim.scale.x * 1.1, scaleY : this.giganticAnim.scale.x * 1.1})
            } else if (this.winLevel == 4) {
                this.colossalWinAnim.scale.x = this.colossalWinAnim.scale.y = CoreLib.Util.getDefaultValue(this.colossalWinAnim.configData.scale, 1);
                CoreLib.AnimationManager.animateTween(this.colossalWinAnim, 0.5, {repeat : -1, yoyo : true, scaleX : this.colossalWinAnim.scale.x * 1.1, scaleY : this.colossalWinAnim.scale.x * 1.1})
            } else if (this.winLevel == 5) {
                this.unbelievableWinAnim.scale.x = this.unbelievableWinAnim.scale.y = CoreLib.Util.getDefaultValue(this.unbelievableWinAnim.configData.scale, 1);
                CoreLib.AnimationManager.animateTween(this.unbelievableWinAnim, 0.5, {repeat : -1, yoyo : true, scaleX : this.unbelievableWinAnim.scale.x * 1.1, scaleY : this.unbelievableWinAnim.scale.x * 1.1})
            }
        } else {
            if (this.winLevel == 1) {
                this.bigAnim.scale.x = this.bigAnim.scale.y = CoreLib.Util.getDefaultValue(this.bigAnim.configData.scale, 1);
                if (this.bigAnim.configData.idleState) {
                    this.bigAnim.playAnimation(this.bigAnim.configData.idleState, true);
                }
            } else if (this.winLevel == 2) {
                this.megaAnim.scale.x = this.megaAnim.scale.y = CoreLib.Util.getDefaultValue(this.megaAnim.configData.scale, 1);
                if (this.megaAnim.configData.idleState) {
                    this.megaAnim.playAnimation(this.megaAnim.configData.idleState, true);
                }
            } else if (this.winLevel == 3) {
                this.giganticAnim.scale.x = this.giganticAnim.scale.y = CoreLib.Util.getDefaultValue(this.giganticAnim.configData.scale, 1);
                if (this.giganticAnim.configData.idleState) {
                    this.giganticAnim.playAnimation(this.giganticAnim.configData.idleState, true);
                }
            } else if (this.winLevel == 4) {
                this.colossalWinAnim.scale.x = this.colossalWinAnim.scale.y = CoreLib.Util.getDefaultValue(this.colossalWinAnim.configData.scale, 1);
                if (this.colossalWinAnim.configData.idleState) {
                    this.colossalWinAnim.playAnimation(this.colossalWinAnim.configData.idleState, true);
                }
            } else if (this.winLevel == 5) {
                this.unbelievableWinAnim.scale.x = this.unbelievableWinAnim.scale.y = CoreLib.Util.getDefaultValue(this.unbelievableWinAnim.configData.scale, 1);
                if (this.unbelievableWinAnim.configData.idleState) {
                    this.unbelievableWinAnim.playAnimation(this.unbelievableWinAnim.configData.idleState, true);
                }
            }
        }
    }


    showValue () {
        this.winText.text = CoreLib.WrapperService.formatWinCurrency(this.startScore.score);

    }
    sendCountUpEarlyNotification () {
        this.emit("SCORE_COUNT_UP_DONE");
    }
    onScoreDone () {
        CoreLib.EventHandler.dispatchEvent("PLAY_BIG_WIN_COUNTUP_END_SOUND");
        this.winText.text = CoreLib.WrapperService.formatWinCurrency(this.totalWin);
        CoreLib.AnimationManager.animateTween(this.winText, 0.5, {delay : 0.5, scaleX : CoreLib.Util.getDefaultValue(this.winText.configData.zoomScale, 1.32), scaleY : CoreLib.Util.getDefaultValue(this.winText.configData.zoomScale, 1.32), repeat : 5, yoyo : true, onComplete : this.winZoomInOutComplete.bind(this)});
    }
    winZoomInOutComplete () {
        this.winText.scale.x = this.winText.scale.y = 1;
        this.timerId = setTimeout(this.sendDoneNotification.bind(this, this.callback), 1000);
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
        clearTimeout(this.timerId);
        this.winText.cacheAsBitmap = false;
        this.winText.text = "";
        if (this.winLevel > 0) {
            this.cleanUpAllBigWins();
        }
        if (this.winbg) {
            this.winbg.stopAnimation();
            this.winbg.visible = false;
        }
        if (this.bigwinbg) {
            this.bigwinbg.visible = false;
        }
        if (this.customWinBG) {
            this.customWinBG.stopAnimation();
            this.customWinBG.visible = false;
        }
        CoreLib.EventHandler.dispatchEvent("STOP_BIG_WIN_COUNTUP");
    }
    cleanUpAllBigWins () {
        clearTimeout(this.timerId);
        if (this.winbg) {
            this.winbg.stopAnimation();
            this.winbg.visible = false;
        }
        if (this.bigAnim) {
            this.bigAnim.visible = false;
            this.bigAnim.stopAnimation(0);
            this.bigAnim.scale.x = this.bigAnim.scale.y = CoreLib.Util.getDefaultValue(this.bigAnim.configData.scale, 1);
            CoreLib.AnimationManager.killTweensOf(this.bigAnim);
        }
        if (this.megaAnim) {
            this.megaAnim.visible = false;
            this.megaAnim.stopAnimation();
            this.megaAnim.scale.x = this.megaAnim.scale.y = CoreLib.Util.getDefaultValue(this.megaAnim.configData.scale, 1);
            CoreLib.AnimationManager.killTweensOf(this.megaAnim);
        }
        if (this.giganticAnim) {
            this.giganticAnim.visible = false;
            this.giganticAnim.stopAnimation();
            this.giganticAnim.scale.x = this.giganticAnim.scale.y = CoreLib.Util.getDefaultValue(this.giganticAnim.configData.scale, 1);
            CoreLib.AnimationManager.killTweensOf(this.giganticAnim);
        }
        if (this.colossalWinAnim) {
            this.colossalWinAnim.visible = false;
            this.colossalWinAnim.stopAnimation();
            this.colossalWinAnim.scale.x = this.colossalWinAnim.scale.y = CoreLib.Util.getDefaultValue(this.colossalWinAnim.configData.scale, 1);
            CoreLib.AnimationManager.killTweensOf(this.colossalWinAnim);
        }
        if (this.unbelievableWinAnim) {
            this.unbelievableWinAnim.visible = false;
            this.unbelievableWinAnim.stopAnimation();
            this.unbelievableWinAnim.scale.x = this.unbelievableWinAnim.scale.y = CoreLib.Util.getDefaultValue(this.unbelievableWinAnim.configData.scale, 1);
            CoreLib.AnimationManager.killTweensOf(this.unbelievableWinAnim);
        }

    }

}
