import {LibContainer} from "../../pixiwrapper/LibContainer";
import {CoreLib} from "../../core/CoreLib";
import { LibView } from '../../pixiwrapper/LibView'
import { soundFactory } from '../../sound/SoundFactory'

export class DesktopSettingsComp extends LibView {
    constructor(config) {
        super(config);

        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SHOW_SLOTPANEL, this.showPanel.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SHOW_DESKTOP_SETTINGS, this.showSettingsPanel.bind(this));
        this.visible = false;
        this.bg = this.elementsList["bg"];
        this.historyBtn = this.elementsList["historyBtn"];
        this.ambientSetting = this.elementsList["ambientSetting"];
        this.fxSetting = this.elementsList["fxSetting"];
        this.introSetting = this.elementsList["introSetting"];
        this.ambientSetting.on("TOGGLE_OPTION_CHANGED", this.onAmbientChanged.bind(this));
        this.fxSetting.on("TOGGLE_OPTION_CHANGED", this.onFXChanged.bind(this));
        if (this.introSetting) {
            this.introSetting.on("TOGGLE_OPTION_CHANGED", this.onIntroChanged.bind(this));
        } else {
            this.bg.height = 390;
        }

        this.historyBtn.adjustWidth(this.bg.width * 0.93);
        this.historyBtn.on("LongButtonClicked", this.onHistoryClicked.bind(this));

        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.LOCALDATA_STATE_CHANGE, this.setAllStates.bind(this));


        this.setAllStates();

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

    showSettingsPanel (flag) {
        this.visible = flag;
    }

    showPanel (flag) {
        this.renderable = flag;
    }

}
