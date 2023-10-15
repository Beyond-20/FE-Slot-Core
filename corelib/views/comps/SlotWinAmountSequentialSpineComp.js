import { SlotWinAmountSpineComp } from "./SlotWinAmountSpineComp";
import { CoreLib } from "../../core/CoreLib";
import { slotModel } from "../../models/SlotModel";

export class SlotWinAmountSequentialSpineComp extends SlotWinAmountSpineComp {
    updateForCoinCash() {
        if (this.totalWin > 0) {
            this.winText.text = CoreLib.WrapperService.formatWinCurrency(this.totalWin);
        }
        if (this.bigwinbg.visible == false) {
            this.winText.text = "";
        }
    }

    showWin(val, level = 0, callback = null) {
        CoreLib.Model.GameConfig.bigWinMultipliersSequence = [];
        CoreLib.Model.GameConfig.bigWinMultipliersSequence.push(0);
        let index = Math.round((val * 0.80) / level);
        for (let k = 1; k < level; k++) {
            CoreLib.Model.GameConfig.bigWinMultipliersSequence.push(k * index);
        }
        this.winLevel = level;
        this.callback = callback;
        let delay = 2000;
        const obj = this.configData.textData.bigWin;
        this.bigAnim.scale.x = this.bigAnim.scale.y = CoreLib.Util.getDefaultValue(this.bigAnim.configData.scale, 1);
        this.bigAnim.visible = false;
        if (this.bigAnim.configData.start != undefined) {
            this.bigAnim.playAnimation(this.bigAnim.configData.start, false);
        } else {
            this.bigAnim.playAnimation(this.bigAnim.configData.defaultState, this.bigAnim.configData.loop != undefined ? this.bigAnim.configData.loop : true);
        }
        delay = 3000;
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

        this.lastLevel = 0;
        this.totalWin = val;
        this.duration = CoreLib.Util.getAnimationDuration(val) * 2;
        if (CoreLib.Model.GameConfig.dontCountUp) {
            this.winText.text = CoreLib.WrapperService.formatWinCurrency(val);
            setTimeout(this.onScoreDone.bind(this), this.duration);
        } else {
            this.startScore = { score: 0 };
            this.scoreTween = CoreLib.AnimationManager.animateTween(this.startScore, this.duration, { score: this.totalWin, ease: Linear.easeNone, onUpdate: this.showValue.bind(this), onComplete: this.onScoreDone.bind(this) });
            setTimeout(this.sendCountUpEarlyNotification.bind(this), this.duration * 900)
        }
        if (!this.configData.dontDoVibration) {
            CoreLib.Util.vibrateForBigWins();
        }
        this.lastAnimMovie = this.bigAnim;

        //this.winText.text = CoreLib.WrapperService.formatWinCurrency(val);
    }
    showValue() {
        const level = slotModel.getCurrentWinLevel(this.startScore.score);
        CoreLib.EventHandler.dispatchEvent("BIG_WIN_LEVEL_NOTIFICATION", level);
        if (level > this.lastLevel) {
            this.bigAnim.visible = true;
            let obj;
            //this.cleanUpAllBigWins();
            if (level == 1) {
                obj = this.configData.textData.bigWin;
                this.bigAnim.scale.x = this.bigAnim.scale.y = CoreLib.Util.getDefaultValue(this.bigAnim.configData.scale, 1);
                this.bigAnim.visible = true;
                // this.bigAnim.alpha = 0;
                // CoreLib.AnimationManager.animateTween(this.bigAnim, 0.5, { alpha: 1, ease: Linear.easeOut });
                if (this.bigAnim.configData.start != undefined) {
                    this.bigAnim.playAnimation(this.bigAnim.configData.start, false);
                } else {
                    this.bigAnim.playAnimation(this.bigAnim.configData.defaultState, this.bigAnim.configData.loop != undefined ? this.bigAnim.configData.loop : true);
                }
                CoreLib.EventHandler.dispatchEvent("PLAY_BIGWIN_SPECIAL_SOUND");
            } else
                if (level == 2) {
                    this.bigAnim.playAnimation(this.bigAnim.configData.end, false);
                    obj = this.configData.textData.megaWin;
                    this.megaAnim.scale.x = this.megaAnim.scale.y = CoreLib.Util.getDefaultValue(this.megaAnim.configData.scale, 1);
                    this.megaAnim.visible = true;
                    this.megaAnim.playAnimation(this.megaAnim.configData.start, this.megaAnim.configData.loop != undefined ? this.megaAnim.configData.loop : true, 0, 600);
                    CoreLib.EventHandler.dispatchEvent("PLAY_MEGAWIN_SPECIAL_SOUND");
                } else if (level == 3) {
                    this.megaAnim.playAnimation(this.megaAnim.configData.end, false);
                    obj = this.configData.textData.giganticWin;
                    this.giganticAnim.scale.x = this.giganticAnim.scale.y = CoreLib.Util.getDefaultValue(this.giganticAnim.configData.scale, 1);
                    this.giganticAnim.visible = true;
                    this.giganticAnim.playAnimation(this.giganticAnim.configData.start, this.giganticAnim.configData.loop != undefined ? this.giganticAnim.configData.loop : true, 0, 600);
                    CoreLib.EventHandler.dispatchEvent("PLAY_GIGANTICWIN_SPECIAL_SOUND");
                } else if (level == 4) {
                    this.giganticAnim.playAnimation(this.giganticAnim.configData.end, false);
                    obj = this.configData.textData.colossalWin;
                    this.colossalWinAnim.scale.x = this.colossalWinAnim.scale.y = CoreLib.Util.getDefaultValue(this.colossalWinAnim.configData.scale, 1);
                    this.colossalWinAnim.visible = true;
                    this.colossalWinAnim.playAnimation(this.colossalWinAnim.configData.start, this.colossalWinAnim.configData.loop != undefined ? this.colossalWinAnim.configData.loop : true, 0, 600);
                    CoreLib.EventHandler.dispatchEvent("PLAY_COLOSSALWIN_SPECIAL_SOUND");
                } else if (level == 5) {
                    this.colossalWinAnim.playAnimation(this.colossalWinAnim.configData.end);
                    obj = this.configData.textData.unbelievableWin;
                    this.unbelievableWinAnim.scale.x = this.unbelievableWinAnim.scale.y = CoreLib.Util.getDefaultValue(this.unbelievableWinAnim.configData.scale, 1);
                    this.unbelievableWinAnim.visible = true;
                    this.unbelievableWinAnim.playAnimation(this.unbelievableWinAnim.configData.start, this.unbelievableWinAnim.configData.loop != undefined ? this.unbelievableWinAnim.configData.loop : true, 0, 600);
                    CoreLib.EventHandler.dispatchEvent("PLAY_UNBELIEVABLEWIN_SPECIAL_SOUND");
                }
        }

        this.winText.text = CoreLib.WrapperService.formatWinCurrency(this.startScore.score);
        this.winValue = this.startScore.score;
        this.lastLevel = level;
    }

    onSpineAnimComplete(data) {
        if (data.name.indexOf("start") > -1) {
            if (this.lastLevel == 1) {
                this.bigAnim.scale.x = this.bigAnim.scale.y = CoreLib.Util.getDefaultValue(this.bigAnim.configData.scale, 1);
                if (this.bigAnim.configData.idleState) {
                    this.bigAnim.playAnimation(this.bigAnim.configData.idleState, true);
                }
            } else if (this.lastLevel == 2) {
                this.megaAnim.scale.x = this.megaAnim.scale.y = CoreLib.Util.getDefaultValue(this.megaAnim.configData.scale, 1);
                if (this.megaAnim.configData.idleState) {
                    this.megaAnim.playAnimation(this.megaAnim.configData.idleState, true);
                }
            } else if (this.lastLevel == 3) {
                this.giganticAnim.scale.x = this.giganticAnim.scale.y = CoreLib.Util.getDefaultValue(this.giganticAnim.configData.scale, 1);
                if (this.giganticAnim.configData.idleState) {
                    this.giganticAnim.playAnimation(this.giganticAnim.configData.idleState, true);
                }
            } else if (this.lastLevel == 4) {
                this.colossalWinAnim.scale.x = this.colossalWinAnim.scale.y = CoreLib.Util.getDefaultValue(this.colossalWinAnim.configData.scale, 1);
                if (this.colossalWinAnim.configData.idleState) {
                    this.colossalWinAnim.playAnimation(this.colossalWinAnim.configData.idleState, true);
                }
            } else if (this.lastLevel == 5) {
                this.unbelievableWinAnim.scale.x = this.unbelievableWinAnim.scale.y = CoreLib.Util.getDefaultValue(this.unbelievableWinAnim.configData.scale, 1);
                if (this.unbelievableWinAnim.configData.idleState) {
                    this.unbelievableWinAnim.playAnimation(this.unbelievableWinAnim.configData.idleState, true);
                }
            }
        }


    }

}