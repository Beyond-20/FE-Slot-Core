import { LibContainer } from "../../pixiwrapper/LibContainer";
import { CoreLib } from "../../core/CoreLib";
import { slotModel } from '../../models/SlotModel'
import { SlotSpinWinAmountComp } from "./SlotSpinWinAmountComp"
import { SlotEvents } from "../../events/SlotEvents";

export class SlotSpinWinAnimAmountNoDispatchComp extends SlotSpinWinAmountComp {
    constructor(config) {
        super(config);
        this.winText = this.elementsList["winText"];
        this.lastScore = 0;
        // this.showWin(100);
    }

    showText(win) {

    }

    showWin(val, level = 0, callback = null) {

    }
    showValue() {

    }
    onScoreDone() {

    }
    notifyEnd() {

    }
    clearWin() {

    }

}