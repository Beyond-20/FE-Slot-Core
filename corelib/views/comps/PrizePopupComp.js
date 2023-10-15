import {SliderComp} from "./SliderComp";
import { CoreLib } from '../../core/CoreLib'
import { LibContainer } from '../../pixiwrapper/LibContainer'

export class PrizePopupComp extends LibContainer {
    constructor(config) {
        super(config);
        this.popupbg = this.elementsList["popupbg"];
        this.giftBox = this.elementsList["giftBox"];
        this.closeBtn = this.elementsList["closeBtn"];
        this.continueBtn = this.elementsList["continueBtn"];
        this.congratText = this.elementsList["congratText"];
        this.youhavewonText = this.elementsList["youhavewonText"];
        this.prizeValueText = this.elementsList["prizeValueText"];
        this.positionElements();

        this.continueBtn.setEnabled(true);
        this.closeBtn.setEnabled(true);
        this.continueBtn.addInteraction(this.closeClicked.bind(this));
        this.closeBtn.addInteraction(this.closeClicked.bind(this));

    }

    closeClicked () {
        this.emit("CloseClicked");
    }

    showAnimation() {
        this.giftBox.playAnimation(false);
    }

    positionElements () {
        CoreLib.UIUtil.setPositionX(this.giftBox, this.popupbg.width/ 2 + 10);
        CoreLib.UIUtil.setPosition(this.continueBtn, (this.popupbg.width - this.continueBtn.width) / 2, this.popupbg.height - this.continueBtn.height * 1.5);
        CoreLib.UIUtil.setPositionX(this.congratText, this.popupbg.width / 2);
        CoreLib.UIUtil.setPositionX(this.youhavewonText, this.popupbg.width / 2);
        CoreLib.UIUtil.setPositionX(this.prizeValueText, this.popupbg.width / 2);

    }

}
