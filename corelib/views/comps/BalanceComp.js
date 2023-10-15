import {LibContainer} from "../../pixiwrapper/LibContainer";
import {CoreLib} from "../../core/CoreLib";
import {UIUtil} from "../../pixiwrapper/UIUtilService";
import {slotModel} from "../../models/SlotModel";

export class BalanceComp extends LibContainer {
    constructor(config) {
        super(config);
        this.titleText = this.elementsList["titleText"];
        this.valueText = this.elementsList["valueText"];

        if (this.elementsList["clickBG"] != undefined && CoreLib.Model.GameConfig.coinCashModeAvailable) {
            this.clickBG = this.elementsList["clickBG"];
            UIUtil.setClickable(this.clickBG, true);
            UIUtil.addInteraction(this.clickBG, slotModel.changeCoinCashMode.bind(this));

        }
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.COIN_CASH_MODE_CHANGED, this.updateBalanceCoinCash.bind(this));
    }
    updateBalanceCoinCash() {
        this.valueText.text = CoreLib.WrapperService.formatCurrency(this.balance);
        if (CoreLib.Model.GameConfig.coinCashMode === 0) {
            this.titleText.text = CoreLib.Util.getContent("coinsText");
        } else {
            this.titleText.text = CoreLib.Util.getContent("balanceCaps");
        }
    }
    updateBalance (balance) {
        this.valueText.text = CoreLib.WrapperService.formatCurrency(balance);
        if (CoreLib.Model.GameConfig.coinCashMode === 0) {
            this.titleText.text = CoreLib.Util.getContent("coinsText");
        } else {
            this.titleText.text = CoreLib.Util.getContent("balanceCaps");
        }
        this.balance = balance;
    }


}
