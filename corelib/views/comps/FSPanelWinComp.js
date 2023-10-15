import {LibContainer} from "../../pixiwrapper/LibContainer";
import {CoreLib} from "../../core/CoreLib";
import { slotModel } from '../../models/SlotModel'
import { Linear } from '../../../games/funhouse/jslibs/1.00/gsap/gsap.min'
import {UIUtil} from "../../pixiwrapper/UIUtilService";

export class FSPanelWinComp extends LibContainer {
    constructor(config) {
        super(config);
        this.winBG = this.elementsList["winBG"];
        this.valueText = this.elementsList["valueText"];
        this.totalWinText = this.elementsList["totalWinText"];
        CoreLib.UIUtil.setPositionX(this.valueText, this.winBG.width / 2);
        CoreLib.UIUtil.setPositionY(this.valueText, -this.valueText.height * 0.8);
        this.isScoreCountingUp = false;
        CoreLib.UIUtil.setPositionX(this.totalWinText, this.winBG.width / 2);
        CoreLib.UIUtil.alignToObject(this.totalWinText, "middle", this.winBG);

        if (this.elementsList["winBG"] != undefined && CoreLib.Model.GameConfig.coinCashModeAvailable) {
            this.winBG = this.elementsList["winBG"];
            UIUtil.setClickable(this.winBG, true);
            UIUtil.addInteraction(this.winBG, slotModel.changeCoinCashMode.bind(this));
        }
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.COIN_CASH_MODE_CHANGED, this.updateForCoinCash.bind(this));


    }
    updateForCoinCash() {
        this.updateWin(this.winValue);
        if (this.isScoreCountingUp) {

        } else {
            this.updateTotalWin(this.totalWin, false);
        }

    }
    updateWin (win) {
        this.winValue = win;
        if (win == 0) {
            if (slotModel.getFSMultiplier() && slotModel.getFSMultiplier() > 1) {
                this.valueText.text = CoreLib.Util.getContent("mutliplierText") + " : " + slotModel.getFSMultiplier() + "x";
            } else {
                this.valueText.text = CoreLib.WrapperService.formatCurrency(win);
            }

        } else {
            if (slotModel.getFSMultiplier() && slotModel.getFSMultiplier() > 1) {
                let multi = slotModel.getFSMultiplier();
                let str = CoreLib.WrapperService.formatCurrency(win / multi) + " x " + multi + " = " + CoreLib.WrapperService.formatCurrency(win);
                this.valueText.text = str;
            } else {
                if (CoreLib.Model.GameConfig.allofakindInFS) {
                    this.valueText.text = CoreLib.WrapperService.formatCurrency(win);
                } else {
                    this.valueText.text = CoreLib.WrapperService.formatCurrency(win);
                }

            }


        }

    }
    updateTotalWin (win, toAnimate = true) {
        this.totalWin = win;
        this.duration = 2;
        this.startScore = {score :this.lastScore};
        this.totalWin = win;
        this.lastScore = this.totalWin;
        if (toAnimate) {
            this.isScoreCountingUp = true;
            this.scoreTween = CoreLib.AnimationManager.animateTween(this.startScore, this.duration, {score:this.totalWin,  ease:Linear.easeNone,  onUpdate :this.showValue.bind(this), onComplete : this.onScoreDone.bind(this)});
        } else {
            this.totalWinText.text = CoreLib.WrapperService.formatCurrency(this.totalWin);
        }
    }
    showValue () {
        this.totalWinText.text = CoreLib.WrapperService.formatCurrency(this.startScore.score);
    }
    onScoreDone () {
        this.isScoreCountingUp = false;
    }

    updateBGToPortrait (flag) {
        this.winBG.texture = CoreLib.UIUtil.getTexture(this.winBG.configData.portraitimage);
        CoreLib.UIUtil.setPositionX(this.valueText, this.winBG.width / 2);
        CoreLib.UIUtil.setPositionY(this.valueText, -this.valueText.height);
        CoreLib.UIUtil.setPositionX(this.totalWinText, this.winBG.width / 2);
        CoreLib.UIUtil.alignToObject(this.totalWinText, "middle", this.winBG);
    }
    updateBGToLandscape () {
        this.winBG.texture = CoreLib.UIUtil.getTexture(this.winBG.configData.landscapeimage);
        CoreLib.UIUtil.setPositionX(this.valueText, this.winBG.width / 2);
        CoreLib.UIUtil.setPositionY(this.valueText, 0);
        CoreLib.UIUtil.setPositionX(this.totalWinText, this.winBG.width / 2);
        CoreLib.UIUtil.alignToObject(this.totalWinText, "bottom", this.winBG);
    }

    updateToNormal() {
        this.winBG.texture = CoreLib.UIUtil.getTexture(this.winBG.configData.image);
        CoreLib.UIUtil.setPositionX(this.valueText, this.winBG.width / 2);
        CoreLib.UIUtil.setPositionY(this.valueText, -this.valueText.height * 0.8);
        CoreLib.UIUtil.setPositionX(this.totalWinText, this.winBG.width / 2);
        CoreLib.UIUtil.alignToObject(this.totalWinText, "middle", this.winBG);
    }

}
