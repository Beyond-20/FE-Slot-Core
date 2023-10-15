import { LibContainer } from "../../pixiwrapper/LibContainer";
import { CoreLib } from "../../core/CoreLib";
import { slotModel } from '../../models/SlotModel'

export class SlotSpinWinAmountComp extends LibContainer {
    constructor(config) {
        super(config);
        this.winText = this.elementsList["winText"];

        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.COIN_CASH_MODE_CHANGED, this.updateForCoinCash.bind(this));
        //this.showWin(100)
    }

    updateForCoinCash() {
        if (this.winValue > 0) {
            this.winText.text = CoreLib.WrapperService.formatWinCurrency(this.winValue);
        }
    }

    showWin(val, level = 0, callback = null) {
        let obj;
        this.winValue = val;
        let delay = 2000;
        this.addChild(this.winText)
        this.winText.text = CoreLib.WrapperService.formatWinCurrency(val);
        this.timerId = setTimeout(this.sendDoneNotification.bind(this, callback), delay);
    }
    
    sendDoneNotification(callback) {
        if (callback) {
            callback();
        } else {
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.EXIT_SPINWIN_AMOUNT);
        }
    }

    clearWin() {
        this.winText.cacheAsBitmap = false;
        this.winText.text = "";
        this.winValue = 0;
        clearTimeout(this.timerId);
    }

}
