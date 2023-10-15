import {LibContainer} from "../../pixiwrapper/LibContainer";
import {CoreLib} from "../../core/CoreLib";
import {UIUtil} from "../../pixiwrapper/UIUtilService";
import {slotModel} from "../../models/SlotModel";

export class StakeComp extends LibContainer {
    constructor(config) {
        super(config);

        this.titleText = this.elementsList["titleText"];
        this.valueText = this.elementsList["valueText"];
        this.plusBtn = this.elementsList["plusBtn"];
        this.minusBtn = this.elementsList["minusBtn"];


        this.plusBtn.addInteraction(this.onPlusClicked.bind(this));
        this.minusBtn.addInteraction(this.onMinusClicked.bind(this));

        if (this.elementsList["clickBG"] != undefined && CoreLib.Model.GameConfig.coinCashModeAvailable) {
            this.clickBG = this.elementsList["clickBG"];
            UIUtil.setClickable(this.clickBG, true);
            UIUtil.addInteraction(this.clickBG, slotModel.changeCoinCashMode.bind(this));

        }
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.COIN_CASH_MODE_CHANGED, this.updateStakeCoinCash.bind(this));

    }
    showMobilePortrait () {
        this.removeChild(this.plusBtn);
        this.removeChild(this.minusBtn);
        this.titleText.x = 0;
        this.valueText.x = 0;
        if (CoreLib.Model.DeviceConfig.isDesktop) {
            this.valueText.y = 40;
        } else {
            this.valueText.y = this.titleText.height * 1.25;
        }


    }
    showMobileLandscape () {
        this.removeChild(this.plusBtn);
        this.removeChild(this.minusBtn);
        this.titleText.x = 0;
        this.valueText.x = 0;
        if (CoreLib.Model.DeviceConfig.isDesktop) {
            this.valueText.y = 40;
        } else {
            this.valueText.y = this.titleText.height * 1.1;
        }


    }
    onPlusClicked () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.STAKE_CHANGE, 1);
    }
    onMinusClicked () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.STAKE_CHANGE, -1);
    }
    setBetsArray (arr) {
        this.betsArray = arr;
    }
    disable () {
        this.plusBtn.setEnabled(false);
        this.minusBtn.setEnabled(false);
    }
    enable () {
        this.plusBtn.setEnabled(true);
        this.minusBtn.setEnabled(true);
    }

    updateBet (totalbet, betPosition) {
        this.totalBet = totalbet;
        this.valueText.text = CoreLib.WrapperService.formatCurrency(totalbet);
        this.currentPosition = betPosition;
        this.validateButtons();
    }
    updateStakeCoinCash () {
        this.valueText.text = CoreLib.WrapperService.formatCurrency(this.totalBet);
    }
    validateButtons () {
        if (this.currentPosition == 0) {
            this.minusBtn.setEnabled(false);
        } else {
            this.minusBtn.setEnabled(true);
        }
        if (this.currentPosition == this.betsArray.length - 1) {
            this.plusBtn.setEnabled(false);
        } else {
            this.plusBtn.setEnabled(true);
        }
    }

}
