import {LibContainer} from "../../pixiwrapper/LibContainer";
import {CoreLib} from "../../core/CoreLib";
import {slotModel} from "../../models/SlotModel";

export class AutoplayComp extends LibContainer {
    constructor(config) {
        super(config);

        this.bg = this.elementsList["bg"];
        this.titlebg = this.elementsList["titlebg"];
        this.bottombg = this.elementsList["bottombg"];
        this.titleText = this.elementsList["titleText"];
        this.numberOfSpinsText = this.elementsList["numberOfSpinsText"];
        this.stopSpinText = this.elementsList["stopSpinText"];

        this.totalBetComp = this.elementsList["totalBetComp"];
        this.balanceComp = this.elementsList["balanceComp"];




        this.valuesArray = [5,10,25,50,100,"∞"];
        let len = this.valuesArray.length;
        this.btnContainer = CoreLib.UIUtil.getContainer();
        this.addChild(this.btnContainer);
        this.buttonsArray = [];
        let index = 0;
        let xindex = 0;
        for (let k = 0; k < len; k++) {
            let btn = CoreLib.UIUtil.getElement(this.configData.btnConfig);
            this.btnContainer.addChild(btn);
            btn.changeText(this.valuesArray[k]);
            btn.x = xindex++ * (btn.width + 60);
            btn.y = index * (btn.height + 25);
            this.buttonsArray.push(btn);
            btn.setEnabled(true);
            btn.addInteraction(this.onBtnSelected.bind(this, btn, this.valuesArray[k]));
        }
        this.btnContainer.addChild(this.numberOfSpinsText);

        this.onBonusWin = this.elementsList["onBonusWin"];
        this.onAnyWin = this.elementsList["onAnyWin"];
        this.singleWinExceeds = this.elementsList["singleWinExceeds"];
        this.singleWinSlider = this.elementsList["singleWinSlider"];
        this.balanceIncreaseBy = this.elementsList["balanceIncreaseBy"];
        this.balanceIncreaseSlider = this.elementsList["balanceIncreaseSlider"];
        this.balanceDecreaseBy = this.elementsList["balanceDecreaseBy"];
        this.balanceDecreaseSlider = this.elementsList["balanceDecreaseSlider"];

        this.oContainer = CoreLib.UIUtil.getContainer();
        this.addChild(this.oContainer);
        this.oContainer.name = this.oContainer;
        this.oRect = CoreLib.UIUtil.getRectangle(910,800, 0xff0000);
        this.oRect.alpha = 0;
        this.oContainer.addChild(this.oRect, this.onAnyWin, this.onBonusWin, this.singleWinExceeds, this.singleWinSlider, this.balanceIncreaseBy, this.balanceIncreaseSlider, this.balanceDecreaseBy, this.balanceDecreaseSlider, this.stopSpinText);
        this.okBtn = this.elementsList["okBtn"];
        this.cancelBtn = this.elementsList["cancelBtn"];
        this.okBtn.setEnabled(true);
        this.cancelBtn.setEnabled(true);
        this.okBtn.addInteraction(this.onOkClicked.bind(this));
        this.cancelBtn.addInteraction(this.onCancelClicked.bind(this));

        this.singleWinExceeds.on("TOGGLE_OPTION_CHANGED", this.onSingleWinToggleChange.bind(this));
        this.balanceIncreaseBy.on("TOGGLE_OPTION_CHANGED", this.onBalanceIncreaseToggleChange.bind(this));
        this.balanceDecreaseBy.on("TOGGLE_OPTION_CHANGED", this.onBalanceDecreaseToggleChange.bind(this));

        this.visible = false;

        this.totalBetComp.updateBalance(slotModel.getTotalBet());
        this.balanceComp.updateBalance(slotModel.getBalance());

        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SHOW_AUTOSPIN_DIALOGUE, this.showAutospin.bind(this));
        this.onBtnSelected(this.buttonsArray[1], this.valuesArray[1]);

    }
    onBtnSelected (btn, val) {
        this.selectedVal = val;
        let state = btn.getToggleState();
        let len = this.buttonsArray.length;
        for (let k = 0; k < len; k++) {
            this.buttonsArray[k].setToggleState(false);
        }
        btn.setToggleState(state ? false : true);

    }
    onBalanceDecreaseToggleChange (flag) {
        if (flag) {
            this.balanceDecreaseSlider.enable();
        } else {
            this.balanceDecreaseSlider.disable();
        }
    }
    onBalanceIncreaseToggleChange (flag) {
        if (flag) {
            this.balanceIncreaseSlider.enable();
        } else {
            this.balanceIncreaseSlider.disable();
        }
    }
    onSingleWinToggleChange (flag) {
        if (flag) {
            this.singleWinSlider.enable();
        } else {
            this.singleWinSlider.disable();
        }

    }
    onOkClicked () {
        let obj = {};
        obj.selectedSpins = this.selectedVal == "∞" ? -1 : this.selectedVal;
        obj.onAnyWin = this.onAnyWin.getState();
        obj.onBonusWin = this.onBonusWin.getState();
        obj.onSingleWinExceeds = this.singleWinSlider.getSelectedValue();
        obj.balanceIncreaseBy = this.balanceIncreaseSlider.getSelectedValue();
        obj.balanceDecreaseBy = this.balanceDecreaseSlider.getSelectedValue();
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.AUTOSPIN_SELECTED, obj);
        this.onCancelClicked();

    }
    onCancelClicked () {
        this.showAutospin(false);
    }

    showAutospin (flag) {

        if (flag) {
            this.totalBetComp.updateBalance(slotModel.getTotalBet());
            this.balanceComp.updateBalance(slotModel.getBalance());
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_SLOTMACHINE_AND_PANEL, false);
            this.visible = true;
        } else {
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_SLOTMACHINE_AND_PANEL, true);
            this.visible = false;
        }
    }

    resizeViewComponents(layoutData = null) {

        this.bg.width = CoreLib.UIUtil.getGameWidth();
        this.bg.height = CoreLib.UIUtil.getGameHeight();
        this.titlebg.width = this.bg.width;

        this.bottombg.width = this.bg.width;
        if (CoreLib.Model.DeviceConfig.isLandscape) {
            this.bottombg.height = this.bg.height * 0.16;
            this.titlebg.height = this.bg.height * 0.16;
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
        sc = 1;
        if (CoreLib.Model.DeviceConfig.isDevice) {
            if (CoreLib.Model.DeviceConfig.isLandscape) {
                sc = (this.bottombg.height * 0.8) / this.balanceComp.height;
            } else {
                sc = (this.bottombg.height * 0.66) / this.balanceComp.height;
            }
        }


        this.balanceComp.scale.set(sc);
        this.totalBetComp.scale.set(sc);


        CoreLib.UIUtil.setPosition(this.balanceComp, this.bg.width / 2 + (this.bg.width / 2 - this.balanceComp.width) / 2 + this.balanceComp.width / 2, this.bottombg.y + (this.bottombg.height - this.balanceComp.height) / 2);
        CoreLib.UIUtil.setPosition(this.totalBetComp, (this.bg.width / 2 - this.totalBetComp.width) / 2 + this.totalBetComp.width / 2, this.bottombg.y + (this.bottombg.height - this.totalBetComp.height) / 2);



        let gap = CoreLib.UIUtil.getGameHeight() * 0.02;


        if (CoreLib.Model.DeviceConfig.isDesktop) {
            CoreLib.UIUtil.setPositionX(this.numberOfSpinsText, (this.buttonsArray[this.buttonsArray.length - 1].x + this.buttonsArray[this.buttonsArray.length - 1].width - this.numberOfSpinsText.width) / 2 + this.numberOfSpinsText.width / 2);
            CoreLib.UIUtil.setPositionY(this.numberOfSpinsText, 0);

            let ystart = this.numberOfSpinsText.height * 1.6;
            let len = this.buttonsArray.length;
            let index = 0;
            let xindex = 0;
            let btn;
            for (let k = 0; k < len; k++) {
                btn = this.buttonsArray[k];
                btn.x = xindex++ * (btn.width + 60);
                btn.y = ystart + index * (btn.height + 25);
            }

        } else {
            let len = this.buttonsArray.length;
            let btn;
            let index = 0;
            let xindex = 0;
            let ystart = this.numberOfSpinsText.height * 1.6;
            if (CoreLib.Model.DeviceConfig.isPortrait) {
                for (let k = 0; k < len; k++) {
                    btn = this.buttonsArray[k];
                    btn.x = xindex++ * (btn.width + 60);
                    btn.y = ystart + index * (btn.height + 25);
                    if (k == 2) {
                        xindex = 0;
                        index++;
                    }
                }
            } else {
                for (let k = 0; k < len; k++) {
                    btn = this.buttonsArray[k];
                    btn.x = xindex++ * (btn.width + 60);
                    btn.y = ystart + index * (btn.height + 25);
                }
            }
            CoreLib.UIUtil.setPositionX(this.numberOfSpinsText, (this.buttonsArray[this.buttonsArray.length - 1].x + this.buttonsArray[this.buttonsArray.length - 1].width - this.numberOfSpinsText.width) / 2 + this.numberOfSpinsText.width / 2);
            CoreLib.UIUtil.setPositionY(this.numberOfSpinsText, 0);

            this.btnContainer.scale.set(1);
            if (CoreLib.Model.DeviceConfig.isPortrait) {
                let sc = (CoreLib.UIUtil.getGameWidth() * 0.5) / this.btnContainer.width;
                this.btnContainer.scale.set(sc);
            } else {
                let sc = (CoreLib.UIUtil.getGameHeight() * 0.18) / this.btnContainer.height;
                this.btnContainer.scale.set(sc);
            }

        }

        CoreLib.UIUtil.setPositionX(this.btnContainer, (this.bg.width - this.btnContainer.width) / 2);
        CoreLib.UIUtil.setPositionY(this.btnContainer, (this.titlebg.y + this.titlebg.height + gap))



        if (CoreLib.Model.DeviceConfig.isDesktop) {

            CoreLib.UIUtil.setPosition(this.stopSpinText, (this.singleWinSlider.x + this.singleWinSlider.width) / 2, 0);

            CoreLib.UIUtil.setPositionX(this.onBonusWin, this.onAnyWin.x + this.onAnyWin.width * 1.4);
            CoreLib.UIUtil.setPositionY(this.onBonusWin, this.stopSpinText.y + this.stopSpinText.height + gap);
            CoreLib.UIUtil.setPositionY(this.singleWinExceeds, this.stopSpinText.y + this.stopSpinText.height + gap);
            CoreLib.UIUtil.setPositionY(this.onAnyWin, this.stopSpinText.y + this.stopSpinText.height + gap);
            CoreLib.UIUtil.setPositionX(this.singleWinExceeds, this.onBonusWin.x + this.onBonusWin.width * 1.4);
            CoreLib.UIUtil.setPositionX(this.singleWinSlider, this.singleWinExceeds.x + 66);
            CoreLib.UIUtil.setPositionY(this.singleWinSlider, this.singleWinExceeds.y + this.singleWinExceeds.height * 0.6);

            CoreLib.UIUtil.setPositionX(this.balanceIncreaseBy, 0);
            CoreLib.UIUtil.setPositionY(this.balanceIncreaseBy, this.singleWinSlider.y + this.singleWinSlider.height + gap * 2);
            CoreLib.UIUtil.setPositionX(this.balanceIncreaseSlider, this.balanceIncreaseBy.x + 66);
            CoreLib.UIUtil.setPositionY(this.balanceIncreaseSlider, this.balanceIncreaseBy.y + this.balanceIncreaseBy.height * 0.6);

            CoreLib.UIUtil.setPositionX(this.balanceDecreaseBy, this.singleWinExceeds.x);
            CoreLib.UIUtil.setPositionY(this.balanceDecreaseBy, this.balanceIncreaseBy.y);
            CoreLib.UIUtil.setPositionX(this.balanceDecreaseSlider, this.balanceDecreaseBy.x + 66);
            CoreLib.UIUtil.setPositionY(this.balanceDecreaseSlider, this.balanceDecreaseBy.y + this.balanceDecreaseBy.height * 0.6);

            CoreLib.UIUtil.setPositionX(this.oContainer, (this.bg.width - this.oContainer.width) / 2);
            CoreLib.UIUtil.setPositionY(this.oContainer, this.btnContainer.y + this.btnContainer.height + gap * 2);
        } else {
            if (CoreLib.Model.DeviceConfig.isPortrait) {


                // this.singleWinSlider.resize(this.singleWinSlider.configData.mSliderLength);
                // this.balanceIncreaseSlider.resize(this.balanceIncreaseSlider.configData.mSliderLength);
                // this.balanceDecreaseSlider.resize(this.balanceDecreaseSlider.configData.mSliderLength);

                gap = this.singleWinSlider.height * 1.32;

                CoreLib.UIUtil.setPositionY(this.onBonusWin, this.stopSpinText.height * 2);
                CoreLib.UIUtil.setPositionY(this.onAnyWin, this.stopSpinText.height * 2);

                CoreLib.UIUtil.setPositionX(this.onBonusWin, this.onAnyWin.x + this.onAnyWin.width * 1.4);
                CoreLib.UIUtil.setPositionX(this.singleWinExceeds, 0);
                CoreLib.UIUtil.setPositionY(this.singleWinExceeds, this.onBonusWin.y + this.onBonusWin.height + gap * 0.6);
                CoreLib.UIUtil.setPositionX(this.singleWinSlider, this.singleWinExceeds.x + 90);
                CoreLib.UIUtil.setPositionY(this.singleWinSlider, this.singleWinExceeds.y + this.singleWinExceeds.height * 0.1);


                CoreLib.UIUtil.setPositionY(this.stopSpinText, 0);

                CoreLib.UIUtil.setPositionX(this.balanceIncreaseBy, 0);
                CoreLib.UIUtil.setPositionY(this.balanceIncreaseBy, this.singleWinExceeds.y + this.singleWinExceeds.height + gap);
                CoreLib.UIUtil.setPositionX(this.balanceIncreaseSlider, this.balanceIncreaseBy.x + 90);
                CoreLib.UIUtil.setPositionY(this.balanceIncreaseSlider, this.balanceIncreaseBy.y + this.balanceIncreaseBy.height * 0.1);

                CoreLib.UIUtil.setPositionX(this.balanceDecreaseBy, this.singleWinExceeds.x);
                CoreLib.UIUtil.setPositionY(this.balanceDecreaseBy, this.balanceIncreaseBy.y + this.balanceIncreaseBy.height + gap);
                CoreLib.UIUtil.setPositionX(this.balanceDecreaseSlider, this.balanceDecreaseBy.x + 90);
                CoreLib.UIUtil.setPositionY(this.balanceDecreaseSlider, this.balanceDecreaseBy.y + this.balanceDecreaseBy.height * 0.1);

                CoreLib.UIUtil.setPositionX(this.stopSpinText, (this.singleWinSlider.x + this.singleWinSlider.width) / 2);


                this.oContainer.scale.set(1);
                let sc = (CoreLib.UIUtil.getGameHeight() * 0.4) / this.oRect.height;
                let hsc = (CoreLib.UIUtil.getGameWidth() * 0.8) / this.oRect.width;
                this.oContainer.scale.set(Math.min(sc, hsc));
                CoreLib.UIUtil.setPositionX(this.oContainer, (this.bg.width - this.oContainer.width) / 2);
                CoreLib.UIUtil.setPositionY(this.oContainer, this.btnContainer.y + this.btnContainer.height + gap * 0.2);
            } else {
                gap = CoreLib.UIUtil.getGameHeight() * 0.02;
                CoreLib.UIUtil.setPositionY(this.stopSpinText, 0);

                // this.singleWinSlider.resize(this.singleWinSlider.configData.mSliderLength);
                // this.balanceIncreaseSlider.resize(this.balanceIncreaseSlider.configData.mSliderLength);
                // this.balanceDecreaseSlider.resize(this.balanceDecreaseSlider.configData.mSliderLength);

                CoreLib.UIUtil.setPositionY(this.onBonusWin, this.stopSpinText.height * 2);
                CoreLib.UIUtil.setPositionY(this.onAnyWin, this.stopSpinText.height * 2);

                CoreLib.UIUtil.setPositionX(this.onBonusWin, this.onAnyWin.x + this.onAnyWin.width * 1.4);
                CoreLib.UIUtil.setPositionX(this.singleWinExceeds, this.onBonusWin.x + this.onBonusWin.width * 1.4);
                CoreLib.UIUtil.setPositionY(this.singleWinExceeds, this.onBonusWin.y);
                CoreLib.UIUtil.setPositionX(this.singleWinSlider, this.singleWinExceeds.x + 90);
                CoreLib.UIUtil.setPositionY(this.singleWinSlider, this.singleWinExceeds.y + this.singleWinExceeds.height * 0.1);

                CoreLib.UIUtil.setPositionX(this.balanceIncreaseBy, 0);
                CoreLib.UIUtil.setPositionY(this.balanceIncreaseBy, this.singleWinSlider.y + this.singleWinSlider.height + gap * 2);
                CoreLib.UIUtil.setPositionX(this.balanceIncreaseSlider, this.balanceIncreaseBy.x + 90);
                CoreLib.UIUtil.setPositionY(this.balanceIncreaseSlider, this.balanceIncreaseBy.y + this.balanceIncreaseBy.height * 0.1);

                CoreLib.UIUtil.setPositionX(this.balanceDecreaseBy, this.singleWinExceeds.x);
                CoreLib.UIUtil.setPositionY(this.balanceDecreaseBy, this.balanceIncreaseBy.y);
                CoreLib.UIUtil.setPositionX(this.balanceDecreaseSlider, this.balanceDecreaseBy.x + 90);
                CoreLib.UIUtil.setPositionY(this.balanceDecreaseSlider, this.balanceDecreaseBy.y + this.balanceDecreaseBy.height * 0.1);

                CoreLib.UIUtil.setPositionX(this.stopSpinText, (this.singleWinSlider.x + this.singleWinSlider.width) / 2);

                this.oContainer.scale.set(1);
                let sc = (CoreLib.UIUtil.getGameHeight() * 0.56) / this.oRect.height;
                let hsc = (CoreLib.UIUtil.getGameWidth() * 0.9) / this.oRect.width;
                this.oContainer.scale.set(Math.min(sc, hsc));


                CoreLib.UIUtil.setPositionX(this.oContainer, (this.bg.width - this.oContainer.width) / 2);
                CoreLib.UIUtil.setPositionY(this.oContainer, this.btnContainer.y + this.btnContainer.height + gap);

            }
        }

        this.okBtn.scale.set(1);
        this.cancelBtn.scale.set(1);
        if (CoreLib.Model.DeviceConfig.isDesktop) {
            sc = (CoreLib.UIUtil.getGameHeight() * 0.08) / this.okBtn.height;
        } else {
            if (CoreLib.Model.DeviceConfig.isLandscape) {
                sc = (CoreLib.UIUtil.getGameHeight() * 0.12) / this.okBtn.width;
            } else {
                sc = (CoreLib.UIUtil.getGameWidth() * 0.14) / this.okBtn.width;
            }
        }

        this.okBtn.scale.set(sc);
        this.cancelBtn.scale.set(sc);

        CoreLib.UIUtil.setPosition(this.cancelBtn, this.bg.width / 2 - this.cancelBtn.width * 1.5, this.bottombg.y - this.cancelBtn.height * 1.2);
        CoreLib.UIUtil.setPosition(this.okBtn, this.bg.width / 2 + this.okBtn.width * 0.5, this.cancelBtn.y);


    }


}
