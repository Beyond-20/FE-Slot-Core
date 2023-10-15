import {LibContainer} from "../../pixiwrapper/LibContainer";
import {CoreLib} from "../../core/CoreLib";
import {slotModel} from "../../models/SlotModel";
import { soundFactory } from '../../sound/SoundFactory'

export class MobileSettingsComp extends LibContainer {
    constructor(config) {
        super(config);

        this.bg = this.elementsList["bg"];
        CoreLib.UIUtil.setModalState(this.bg, true);
        this.titlebg = this.elementsList["titlebg"];
        this.titlebg2 = this.elementsList["titlebg2"];
        this.titleText = this.elementsList["titleText"];
        this.titleText2 = this.elementsList["titleText2"];

        this.okBtn = this.elementsList["okBtn"];
        this.cancelBtn = this.elementsList["cancelBtn"];
        this.okBtn.setEnabled(true);
        this.cancelBtn.setEnabled(true);
        this.okBtn.addInteraction(this.onOkClicked.bind(this));
        this.cancelBtn.addInteraction(this.onCancelClicked.bind(this));

        this.ambientSetting = this.elementsList["ambientSetting"];
        this.fxSetting = this.elementsList["fxSetting"];
        this.introSetting = this.elementsList["introSetting"];
        this.eContainer = CoreLib.UIUtil.getContainer();
        this.addChild(this.eContainer);
        if (this.introSetting) {
            this.eContainer.addChild(this.ambientSetting, this.fxSetting, this.introSetting);
        } else {
            this.eContainer.addChild(this.ambientSetting, this.fxSetting);
        }
        this.homeBtn = this.elementsList["homeBtn"];
        this.historyBtn = this.elementsList["historyBtn"];

        this.homeBtn.on("LongButtonClicked", this.onHomeClicked.bind(this));
        this.historyBtn.on("LongButtonClicked", this.onHistoryClicked.bind(this));

        this.visible = false;

        this.ambientSetting.on("TOGGLE_OPTION_CHANGED", this.onAmbientChanged.bind(this));
        this.fxSetting.on("TOGGLE_OPTION_CHANGED", this.onFXChanged.bind(this));
        if (this.introSetting) {
            this.introSetting.on("TOGGLE_OPTION_CHANGED", this.onIntroChanged.bind(this));
        }

        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.LOCALDATA_STATE_CHANGE, this.setAllStates.bind(this));

        //setTimeout(this.showSettingsPanel.bind(this, true), 2000);


        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SHOW_MOBILE_SETTINGS_DIALOGUE, this.showSettingsPanel.bind(this));
        // CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SET_INITIAL_VALUES, this.setInitialValues.bind(this));
        // CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.UPDATE_BET_VALUE, this.updateBet.bind(this));
        this.setAllStates();
        this.resizeViewComponents();

    }
    onHomeClicked () {

    }
    onHistoryClicked () {
        CoreLib.WrapperService.navigateToHistory();
    }

    setAllStates () {
        soundFactory.setAmbientState(CoreLib.Model.GameConfig.ambientSoundState);
        soundFactory.setFXState(CoreLib.Model.GameConfig.fxSoundState);
        this.fxSetting.setStaticState(CoreLib.Model.GameConfig.fxSoundState);
        this.ambientSetting.setStaticState(CoreLib.Model.GameConfig.ambientSoundState);
        if (this.introSetting) {
            this.introSetting.setStaticState(CoreLib.Model.GameConfig.splashState);
        }

    }
    onIntroChanged () {
        CoreLib.Model.GameConfig.splashState = !CoreLib.Model.GameConfig.splashState;
        CoreLib.WrapperService.setSplashState(CoreLib.Model.GameConfig.splashState);
    }
    onAmbientChanged (flag) {
        CoreLib.WrapperService.setAmbientState(!soundFactory.getAmbientState());

    }
    onFXChanged (flag) {
        CoreLib.WrapperService.setFXState(!soundFactory.getSFXState());
    }
    onOkClicked () {
        this.onCancelClicked();

    }
    onCancelClicked () {
        this.showSettingsPanel(false);
    }

    showSettingsPanel (flag) {
        if (flag) {
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_SLOTMACHINE_AND_PANEL, false);
            this.visible = true;
        } else {
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_SLOTMACHINE_AND_PANEL, true);
            this.visible = false;
        }
    }

    resizeViewComponents(layoutData = null) {
        super.resizeViewComponents(layoutData);
        this.bg.width = CoreLib.UIUtil.getGameWidth();
        this.bg.height = CoreLib.UIUtil.getGameHeight();
        this.titlebg.width = this.bg.width;
        this.titlebg2.width = this.bg.width;


        this.titleText.scale.set(1);
        let sc = (this.titlebg.height * 0.6) / this.titleText.height;
        if (sc < 1) {
            this.titleText.scale.set(sc);
            this.titleText2.scale.set(sc);
        }
        if (CoreLib.Model.DeviceConfig.isPortrait) {
            CoreLib.UIUtil.setPosition(this.titlebg, 0,0)
            CoreLib.UIUtil.setPosition(this.titleText, this.titlebg.width / 2, this.titlebg.y + this.titlebg.height / 2);
            CoreLib.UIUtil.setPosition(this.titlebg2, 0, CoreLib.UIUtil.getGameHeight() * 0.22);
            CoreLib.UIUtil.setPosition(this.titleText2, this.titlebg2.width / 2, this.titlebg2.y + this.titlebg2.height / 2);
            this.homeBtn.adjustWidth(CoreLib.UIUtil.getGameWidth() * 0.6);
            this.historyBtn.adjustWidth(CoreLib.UIUtil.getGameWidth() * 0.6);
            this.homeBtn.scale.set(1);
            let ssc = (CoreLib.UIUtil.getGameWidth() * 0.8) / this.homeBtn.width;
            this.homeBtn.scale.set(ssc);
            this.historyBtn.scale.set(ssc);
            CoreLib.UIUtil.setPosition(this.homeBtn, (CoreLib.UIUtil.getGameWidth() - this.homeBtn.width) / 2, this.titlebg.y + this.titlebg.height + (this.titlebg2.y - this.titlebg.height - this.homeBtn.height) * 0.25);
            CoreLib.UIUtil.setPosition(this.historyBtn, (CoreLib.UIUtil.getGameWidth() - this.historyBtn.width) / 2, this.titlebg.y + this.titlebg.height + (this.titlebg2.y - this.titlebg.height - this.historyBtn.height) * 0.75);

            let gap = this.ambientSetting.height * 0.4;
            CoreLib.UIUtil.setPosition(this.ambientSetting, 0, 0);
            CoreLib.UIUtil.setPosition(this.fxSetting, 0, this.ambientSetting.y + this.ambientSetting.height + gap);
            if (this.introSetting) {
                CoreLib.UIUtil.setPosition(this.introSetting, 0, this.fxSetting.y + this.fxSetting.height + gap);
            }
            if (this.eContainer.height > CoreLib.UIUtil.getGameHeight() * 0.64 || this.eContainer.width > CoreLib.UIUtil.getGameWidth() * 0.9) {
                this.eContainer.scale.set(1);
                let sc = (CoreLib.UIUtil.getGameHeight() * 0.64) / this.eContainer.height;
                let hsc = (CoreLib.UIUtil.getGameWidth() * 0.9) / this.eContainer.width;
                this.eContainer.scale.set(Math.min(sc, hsc));
            }
            CoreLib.UIUtil.setPositionX(this.eContainer, (CoreLib.UIUtil.getGameWidth() - this.eContainer.width) / 2);
            CoreLib.UIUtil.setPositionY(this.eContainer, this.titlebg2.y + this.titlebg2.height * 1.5);

        } else {
            CoreLib.UIUtil.setPosition(this.titlebg, 0,0)
            CoreLib.UIUtil.setPosition(this.titleText, this.titlebg.width / 2, this.titlebg.y + this.titlebg.height / 2);
            CoreLib.UIUtil.setPosition(this.titlebg2, 0, CoreLib.UIUtil.getGameHeight() * 0.22);
            CoreLib.UIUtil.setPosition(this.titleText2, this.titlebg2.width / 2, this.titlebg2.y + this.titlebg2.height / 2);

            this.homeBtn.adjustWidth(CoreLib.UIUtil.getGameWidth() * 0.3)
            this.historyBtn.adjustWidth(CoreLib.UIUtil.getGameWidth() * 0.3)
            CoreLib.UIUtil.setPosition(this.homeBtn, (CoreLib.UIUtil.getGameWidth() * 0.5 - this.homeBtn.width) / 2, this.titlebg.y + this.titlebg.height + (this.titlebg2.y - this.titlebg.height - this.homeBtn.height) * 0.5);
            CoreLib.UIUtil.setPosition(this.historyBtn, CoreLib.UIUtil.getGameWidth() * 0.5 + (CoreLib.UIUtil.getGameWidth() * 0.5 - this.historyBtn.width) / 2, this.titlebg.y + this.titlebg.height + (this.titlebg2.y - this.titlebg.height - this.historyBtn.height) * 0.5);

            let gap = this.ambientSetting.height * 0.4;
            CoreLib.UIUtil.setPosition(this.ambientSetting, 0, 0);
            CoreLib.UIUtil.setPosition(this.fxSetting, this.ambientSetting.x, this.ambientSetting.y + this.ambientSetting.height + gap);
            if (this.introSetting) {
                CoreLib.UIUtil.setPosition(this.introSetting, this.fxSetting.x + this.fxSetting.width * 1.25, this.ambientSetting.y + ((this.fxSetting.y - this.ambientSetting.y) + this.fxSetting.height - this.introSetting.height) / 2);
            }
            if (this.eContainer.height > CoreLib.UIUtil.getGameHeight() * 0.6 || this.eContainer.width > CoreLib.UIUtil.getGameWidth() * 0.8) {
                this.eContainer.scale.set(1);
                let sc = (CoreLib.UIUtil.getGameHeight() * 0.6) / this.eContainer.height;
                let hsc = (CoreLib.UIUtil.getGameWidth() * 0.8) / this.eContainer.width;
                this.eContainer.scale.set(Math.min(sc, hsc));
            }
            CoreLib.UIUtil.setPositionX(this.eContainer, (CoreLib.UIUtil.getGameWidth() - this.eContainer.width) / 2);
            CoreLib.UIUtil.setPositionY(this.eContainer, this.titlebg2.y + this.titlebg2.height * 1.5);
        }



        this.okBtn.scale.set(1);
        this.cancelBtn.scale.set(1);
        if (CoreLib.Model.DeviceConfig.isLandscape) {
            sc = (CoreLib.UIUtil.getGameHeight() * 0.12) / this.okBtn.width;
        } else {
            sc = (CoreLib.UIUtil.getGameWidth() * 0.14) / this.okBtn.width;
        }
        this.okBtn.scale.set(sc);
        this.cancelBtn.scale.set(sc);

        CoreLib.UIUtil.setPosition(this.cancelBtn, this.bg.width / 2 - this.cancelBtn.width * 1.5, CoreLib.UIUtil.getGameHeight() - this.cancelBtn.height * 1.5);
        CoreLib.UIUtil.setPosition(this.okBtn, this.bg.width / 2 + this.okBtn.width * 0.5, this.cancelBtn.y);


    }


}
