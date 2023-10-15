import {LibContainer} from "../../pixiwrapper/LibContainer";
import {CoreLib} from "../../core/CoreLib";
import { slotModel } from '../../models/SlotModel'

export class BCTBetBalanceComp extends LibContainer {
    constructor(config) {
        super(config);
        this.guideRect = this.elementsList["guideRect"];
        this.guideRectM = this.elementsList["guideRectM"];
        this.panelbg = this.elementsList["panelbg"];
        this.balanceComp = this.elementsList["balanceComp"];
        this.stakeComp = this.elementsList["stakeComp"];

        this.balanceComp.updateValue(slotModel.getBalance());
        this.stakeComp.updateValue(0);
        CoreLib.EventHandler.addEventListener("UPDATE_BCT_BET", this.updateBet.bind(this));




        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.UPDATE_BALANCE, this.updateBalance.bind(this));
        CoreLib.EventHandler.addEventListener("UPDATE_BCT_BALANCE", this.updateBalance.bind(this));

    }




    updateBet (bet) {
        this.stakeComp.updateValue(bet);
        this.resizeViewComponents();
    }
    updateBalance () {
        this.balanceComp.updateValue(slotModel.getBalance());
    }


    resizeViewComponents (layoutData = null) {
        super.resizeViewComponents(layoutData);


        if (CoreLib.Model.DeviceConfig.isDesktop) {
            this.guideRect.visible = true;
            this.guideRectM.visible = false;
            this.guideRect.height = 120;
            this.guideRect.alpha = 1;
            if (this.panelbg) {
                this.panelbg.visible = false;
            }

            CoreLib.UIUtil.setPosition(this.balanceComp, 20, (this.guideRect.height - this.balanceComp.height) / 2);
            CoreLib.UIUtil.setPosition(this.stakeComp, this.guideRect.width - this.stakeComp.width - 20, this.balanceComp.y);

        } else {

            if (CoreLib.Model.DeviceConfig.isLandscape) {
                this.guideRectM.visible = false;
                this.guideRect.visible = true;

                this.guideRect.height = 150;
                this.guideRect.width = CoreLib.UIUtil.getGameWidth();
                this.guideRect.width = 2560;

                CoreLib.UIUtil.setPosition(this.balanceComp, this.guideRect.width * 0.10, (this.guideRect.height - this.balanceComp.height) / 2);
                CoreLib.UIUtil.setPosition(this.stakeComp, this.guideRect.width - this.stakeComp.width - this.guideRect.width * 0.10, this.balanceComp.y);
                if (this.panelbg) {
                    this.panelbg.width = this.guideRect.width;
                    this.panelbg.height = this.guideRect.height;
                }

            } else {
                this.guideRect.width = 1440;
                this.guideRectM.visible = true;
                this.guideRect.visible = false;
                this.guideRectM.height = 170;
                this.guideRectM.width = 1440;
                this.guideRectM.alpha = 1;
                CoreLib.UIUtil.setPosition(this.balanceComp, this.guideRect.width * 0.02, (this.guideRectM.height - this.balanceComp.height) / 2);
                CoreLib.UIUtil.setPosition(this.stakeComp, this.guideRectM.width - this.stakeComp.width - this.guideRect.width * 0.02, this.balanceComp.y);
                if (this.panelbg) {
                    this.panelbg.width = this.guideRect.width;
                    this.panelbg.height = this.guideRectM.height;
                }

            }


        }
    }

}
