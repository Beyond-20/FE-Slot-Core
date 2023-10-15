import {LibContainer} from "../../pixiwrapper/LibContainer";
import {CoreLib} from "../../core/CoreLib";
import {slotModel} from "../../models/SlotModel";

export class MobileBetComp extends LibContainer {
    constructor(config) {
        super(config);

        this.bg = this.elementsList["bg"];
        this.titlebg = this.elementsList["titlebg"];
        this.bottombg = this.elementsList["bottombg"];
        this.titleText = this.elementsList["titleText"];
        this.totalBetText = this.elementsList["totalBetText"];
        this.betValueText = this.elementsList["betValueText"];

        this.totalBetComp = this.elementsList["totalBetComp"];
        this.balanceComp = this.elementsList["balanceComp"];
        this.upBtn = this.elementsList["upBtn"];
        this.downBtn = this.elementsList["downBtn"];


        this.upBtn.setEnabled(true);
        this.downBtn.setEnabled(true);
        this.upBtn.addInteraction(this.onUpClicked.bind(this));
        this.downBtn.addInteraction(this.onDownClicked.bind(this));


        this.okBtn = this.elementsList["okBtn"];
        this.cancelBtn = this.elementsList["cancelBtn"];
        this.okBtn.setEnabled(true);
        this.cancelBtn.setEnabled(true);
        this.okBtn.addInteraction(this.onOkClicked.bind(this));
        this.cancelBtn.addInteraction(this.onCancelClicked.bind(this));

        //this.visible = false;

        this.eContainer = CoreLib.UIUtil.getContainer();
        this.addChild(this.eContainer);
        this.eContainer.addChild(this.totalBetText, this.betValueText, this.upBtn, this.downBtn);

        CoreLib.UIUtil.setPositionX(this.downBtn, 0);
        CoreLib.UIUtil.setPositionX(this.upBtn, 500);
        CoreLib.UIUtil.setPosition(this.totalBetText, (this.upBtn.x + this.upBtn.width) / 2, 0);
        CoreLib.UIUtil.setPositionY(this.downBtn, this.totalBetText.height * 1.4);
        CoreLib.UIUtil.setPositionY(this.upBtn, this.downBtn.y);
        CoreLib.UIUtil.setPosition(this.betValueText, this.totalBetText.x, this.upBtn.y + (this.upBtn.height - this.totalBetText.height) / 2 - 8);
        this.betValueText.text = CoreLib.WrapperService.formatCurrency(slotModel.getTotalBet());

        this.totalBetComp.updateBalance(slotModel.getTotalBet());
        this.balanceComp.updateBalance(slotModel.getBalance());

        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SHOW_BET_SELECTION_DIALOGUE, this.showBetPanel.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SET_INITIAL_VALUES, this.setInitialValues.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.UPDATE_BET_VALUE, this.updateBet.bind(this));

        this.visible = false;

        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.COIN_CASH_MODE_CHANGED, this.updateBet.bind(this));
    }

    updateBet () {
        this.totalBetComp.updateBalance(slotModel.getTotalBet());
        this.betValueText.text = CoreLib.WrapperService.formatCurrency(slotModel.getTotalBet());
        this.currentPosition = slotModel.getBetPosition();
        this.validateButtons();
    }
    validateButtons () {
        if (this.currentPosition == 0) {
            this.downBtn.setEnabled(false);
        } else {
            this.downBtn.setEnabled(true);
        }
        if (this.currentPosition == this.betsArray.length - 1) {
            this.upBtn.setEnabled(false);
        } else {
            this.upBtn.setEnabled(true);
        }
    }

    setInitialValues () {
        this.betsArray = slotModel.getBetLevels();
    }

    onUpClicked () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.STAKE_CHANGE, 1);
    }
    onDownClicked () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.STAKE_CHANGE, -1);
    }

    onOkClicked () {
        this.onCancelClicked();

    }
    onCancelClicked () {
        this.showBetPanel(false);
    }

    showBetPanel (flag) {
        if (flag) {
            this.totalBetComp.updateBalance(slotModel.getTotalBet());
            this.balanceComp.updateBalance(slotModel.getBalance());
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_SLOTMACHINE, false);
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_SLOTPANEL, false);
            this.visible = true;

        } else {
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_SLOTMACHINE, true);
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_SLOTPANEL, true);
            this.visible = false;
        }
    }

    resizeViewComponents(layoutData = null) {
        super.resizeViewComponents(layoutData);
        this.bg.width = CoreLib.UIUtil.getGameWidth();
        this.bg.height = CoreLib.UIUtil.getGameHeight();
        this.titlebg.width = this.bg.width;

        this.bottombg.width = this.bg.width;
        if (CoreLib.Model.DeviceConfig.isLandscape) {
            this.bottombg.height = this.bg.height * 0.12;
            this.titlebg.height = this.bg.height * 0.12;
        } else {
            this.bottombg.height = this.bg.height * 0.08;
            this.titlebg.height = this.bg.height * 0.08;
        }
        this.titleText.scale.set(1);
        let sc = (this.titlebg.height * 0.4) / this.titleText.height;
        if (sc < 1) {
            this.titleText.scale.set(sc);
        }


        CoreLib.UIUtil.setPositionY(this.bottombg, this.bg.height - this.bottombg.height);
        CoreLib.UIUtil.setPositionX(this.titleText, this.titlebg.width / 2);
        CoreLib.UIUtil.setPositionY(this.titleText, this.titlebg.y + this.titlebg.height / 2);

        this.balanceComp.scale.set(1);
        this.totalBetComp.scale.set(1);
        if (CoreLib.Model.DeviceConfig.isLandscape) {
            sc = (this.bottombg.height * 0.8) / this.balanceComp.height;
        } else {
            sc = (this.bottombg.height * 0.66) / this.balanceComp.height;
        }

        this.balanceComp.scale.set(sc);
        this.totalBetComp.scale.set(sc);


        CoreLib.UIUtil.setPosition(this.balanceComp, this.bg.width / 2 + (this.bg.width / 2 - this.balanceComp.width) / 2 + this.balanceComp.width / 2, this.bottombg.y + (this.bottombg.height - this.balanceComp.height) / 2);
        CoreLib.UIUtil.setPosition(this.totalBetComp, (this.bg.width / 2 - this.totalBetComp.width) / 2 + this.totalBetComp.width / 2, this.bottombg.y + (this.bottombg.height - this.totalBetComp.height) / 2);

        let gap = CoreLib.UIUtil.getGameHeight() * 0.02;
        this.eContainer.scale.set(1);
        if (CoreLib.Model.DeviceConfig.isLandscape) {
            sc = (CoreLib.UIUtil.getGameWidth() * 0.32) / this.eContainer.width;
        } else {
            sc = (CoreLib.UIUtil.getGameWidth() * 0.6) / this.eContainer.width;
        }

        this.eContainer.scale.set(sc);

        CoreLib.UIUtil.setPositionX(this.eContainer, (this.bg.width - this.eContainer.width) / 2);
        CoreLib.UIUtil.setPositionY(this.eContainer, (this.bg.height - this.eContainer.height) / 2 - this.eContainer.height * 0.25);

        this.okBtn.scale.set(1);
        this.cancelBtn.scale.set(1);
        if (CoreLib.Model.DeviceConfig.isLandscape) {
            sc = (CoreLib.UIUtil.getGameHeight() * 0.12) / this.okBtn.width;
        } else {
            sc = (CoreLib.UIUtil.getGameWidth() * 0.14) / this.okBtn.width;
        }
        this.okBtn.scale.set(sc);
        this.cancelBtn.scale.set(sc);

        CoreLib.UIUtil.setPosition(this.cancelBtn, this.bg.width / 2 - this.cancelBtn.width * 1.5, this.bottombg.y - this.cancelBtn.height * 1.5);
        CoreLib.UIUtil.setPosition(this.okBtn, this.bg.width / 2 + this.okBtn.width * 0.5, this.cancelBtn.y);


    }


}
