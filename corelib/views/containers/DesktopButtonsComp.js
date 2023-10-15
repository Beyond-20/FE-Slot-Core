import {LibView} from "../../pixiwrapper/LibView";
import {CoreLib} from "../../core/CoreLib";
import {slotModel} from "../../models/SlotModel";
import { soundFactory } from '../../sound/SoundFactory'

export class DesktopButtonsComp extends LibView
{
    constructor(config, layoutconfig) {
        super(config, layoutconfig);
        this.fullScreenBtn = this.elementsList["fullScreenBtn"];
        this.closeBtn = this.elementsList["closeBtn"];
        this.exitBtn = this.elementsList["exitBtn"];
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.PANEL_RESIZED, this.resizeButtons.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SHOW_SLOTPANEL, this.showPanel.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SHOW_SLOTMACHINE_AND_PANEL, this.showPanel.bind(this));

        this.fullScreenBtn.addInteraction(this.onFullScreenClicked.bind(this));
        this.closeBtn.addInteraction(this.onCloseClicked.bind(this));
        this.exitBtn.addInteraction(this.onExitClicked.bind(this));
        this.fullScreenBtn.setEnabled(true);
        this.exitBtn.setEnabled(true);
        this.closeBtn.setEnabled(true);


        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.ACTIVATE_GAME, this.activateButtons.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.DISABLE_ALL_BUTTONS, this.disableButtons.bind(this));
        if (CoreLib.Model.DeviceConfig.isDevice) {
            this.visible = false;
        }
    }
    activateButtons () {
        this.exitBtn.setEnabled(true);
        this.closeBtn.setEnabled(true);
    }
    disableButtons () {
        this.exitBtn.setEnabled(false);
        this.closeBtn.setEnabled(false);
    }
    onFullScreenClicked () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.DO_FULLSCREEN);
    }
    onCloseClicked () {
        window.close();
    }
    onExitClicked () {

    }
    showPanel (flag) {
        if (CoreLib.Model.DeviceConfig.isDesktop) {
            this.visible = flag;
        }

    }

    resizeButtons (scale) {
        this.fullScreenBtn.scale.set(scale);
        this.exitBtn.scale.set(scale);
        this.closeBtn.scale.set(scale);

        CoreLib.UIUtil.setPosition(this.closeBtn, CoreLib.UIUtil.getGameWidth() - this.closeBtn.width * 1.5);
        CoreLib.UIUtil.setPosition(this.fullScreenBtn, this.closeBtn.x - this.fullScreenBtn.width * 1.25);
        CoreLib.UIUtil.setPosition(this.exitBtn, this.fullScreenBtn.x - this.exitBtn.width * 1.25);
    }

}
