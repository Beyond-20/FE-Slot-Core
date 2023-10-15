import {LibContainer} from "../../pixiwrapper/LibContainer";
import {CoreLib} from "../../core/CoreLib";
import {UIUtil} from "../../pixiwrapper/UIUtilService";
import {slotModel} from "../../models/SlotModel";

export class PanelWinComp extends LibContainer {
    constructor(config) {
        super(config);
        this.winBG = this.elementsList["winBG"];
        this.valueText = this.elementsList["valueText"];
        this.lineWinText = this.elementsList["lineWinText"];
        CoreLib.UIUtil.setPositionX(this.valueText, this.winBG.width / 2);
        CoreLib.UIUtil.alignToObject(this.valueText, "middle", this.winBG);
        CoreLib.UIUtil.setPositionX(this.lineWinText, this.winBG.width / 2);
        CoreLib.UIUtil.setPositionY(this.lineWinText, -40);

        if (this.elementsList["winBG"] != undefined && CoreLib.Model.GameConfig.coinCashModeAvailable) {
            this.winBG = this.elementsList["winBG"];
            UIUtil.setClickable(this.winBG, true);
            UIUtil.addInteraction(this.winBG, slotModel.changeCoinCashMode.bind(this));
        }
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.COIN_CASH_MODE_CHANGED, this.updateForCoinCash.bind(this));

    }
    updateForCoinCash() {
        this.valueText.text = CoreLib.WrapperService.formatCurrency(this.winValue);
        this.updateLineWin(this.wildWin, this.wildWinCount, this.symbolsLength, this.lineWinObj);
    }
    updateWin (win) {
        this.winValue = win;
        this.valueText.text = CoreLib.WrapperService.formatCurrency(win);
    }

    updateLineWin (wildWin, wildWinCount, symbolsLength = 0, obj) {
        this.lineWinObj = obj;
        this.wildWin = wildWin;
        this.wildWinCount = wildWinCount;
        this.symbolsLength = symbolsLength;
        if (obj) {
            let str;
            let arr = [];
            if(wildWin && wildWinCount < symbolsLength){
                str = CoreLib.Util.getContent("lineWinMultiplierText");
                let winAmt = obj.winAmount/2;
                arr.push(obj.lineNumber, CoreLib.WrapperService.formatCurrency(winAmt), CoreLib.WrapperService.formatCurrency(obj.winAmount));
            } else {
                str = CoreLib.Util.getContent("lineWinText");
                arr.push(obj.lineNumber, CoreLib.WrapperService.formatCurrency(obj.winAmount));
            }
            if (obj.winningPosition.length == 5) {
                let extraStr = "";
                if (obj.winningPosition[0] == "4" || obj.winningPosition[0] == "9" || obj.winningPosition[0] == "14") {
                    extraStr = CoreLib.Util.getContent("rightText");
                } else {
                    extraStr = CoreLib.Util.getContent("leftText");
                }
                str += extraStr;
            }
            let result = CoreLib.Util.parseMessage(str, arr);
            this.lineWinText.text = result;
        } else {
            this.lineWinText.text = "";
        }

    }

    updateLineForCoinCash () {

    }

    updateBGToPortrait (flag) {
        this.winBG.texture = CoreLib.UIUtil.getTexture(this.winBG.configData.portraitimage);
        CoreLib.UIUtil.setPositionX(this.valueText, this.winBG.width / 2);
        CoreLib.UIUtil.alignToObject(this.valueText, "middle", this.winBG);
        CoreLib.UIUtil.setPositionX(this.lineWinText, this.winBG.width / 2);
        CoreLib.UIUtil.setPositionY(this.lineWinText, -this.lineWinText.height * 1.2);

    }
    updateBGToLandscape () {
        this.winBG.texture = CoreLib.UIUtil.getTexture(this.winBG.configData.landscapeimage);
        CoreLib.UIUtil.setPositionX(this.valueText, this.winBG.width / 2);
        CoreLib.UIUtil.alignToObject(this.valueText, "middle", this.winBG);
        CoreLib.UIUtil.setPositionX(this.lineWinText, this.winBG.width / 2);
        CoreLib.UIUtil.setPositionY(this.lineWinText, 0);
    }

    updateToNormal() {
        this.winBG.texture = CoreLib.UIUtil.getTexture(this.winBG.configData.image);
        CoreLib.UIUtil.setPositionX(this.valueText, this.winBG.width / 2);
        CoreLib.UIUtil.alignToObject(this.valueText, "middle", this.winBG);
        CoreLib.UIUtil.setPositionX(this.lineWinText, this.winBG.width / 2);
        CoreLib.UIUtil.setPositionY(this.lineWinText, -40);
    }

}
