import {LibView} from "../../pixiwrapper/LibView";
import {CoreLib} from "../../core/CoreLib";

export class SlotGameView extends LibView
{
    constructor(config) {
        super(config);
        this.bgComp = this.elementsList["bgComp"];
        this.slotMachineComp = this.elementsList["slotMachineComp"];
        this.slotPanelComp = this.elementsList["slotPanelComp"];
        this.desktopSettings = this.elementsList["desktopSettings"];
        this.splashComp = this.elementsList["splashComp"];
        this.slotPaylinesView = this.elementsList["slotPaylinesView"];
        this.tournamentIcon = this.elementsList["tournamentIcon"];
        CoreLib.View.setGameView(this);

    }
    getSlotMachinComp () {
        return this.slotMachineComp;
    }

    onResizeEndEvent() {
        super.onResizeEndEvent();
        if (CoreLib.Model.GameConfig.dontCheckSlotMachine) {
            return;
        }
        if (this.slotMachineComp) {
            if (CoreLib.Model.DeviceConfig.isDesktop) {
                let obj = CoreLib.UIUtil.getDeviceSpecificUIObj(this.slotMachineComp.configData.layoutData);
                this.slotMachineComp.scale.set(1);
                let ht = this.slotPanelComp.height;
                let availHt = CoreLib.UIUtil.getGameHeight() - ht;
                let availWid = CoreLib.UIUtil.getGameWidth() * CoreLib.Util.getDefaultValue(obj.widthPerc, 1);
                let sc = (availWid) / this.slotMachineComp.getWidth();
                let hsc = availHt / this.slotMachineComp.getHeight();
                this.slotMachineComp.scale.set(Math.min(sc, hsc));
                if (this.slotPaylinesView) {
                    this.slotPaylinesView.scale.set(this.slotMachineComp.scale.x);
                }
                CoreLib.UIUtil.setPositionX(this.slotMachineComp, (CoreLib.UIUtil.getGameWidth() - this.slotMachineComp.getWidth()) / 2);
                CoreLib.UIUtil.setPositionY(this.slotMachineComp, (availHt - this.slotMachineComp.getHeight()) / 2);
                if (this.desktopSettings) {
                    CoreLib.UIUtil.setPositionY(this.desktopSettings, this.slotPanelComp.panelBG.y - this.desktopSettings.height - 4);
                }

            } else {
                if (CoreLib.Model.DeviceConfig.isPortrait) {
                    let obj = CoreLib.UIUtil.getDeviceSpecificUIObj(this.slotMachineComp.configData.layoutData);
                    //this.slotMachineComp.scale.set(1);
                    let ht = this.slotPanelComp.ptPanelBG.height * this.slotPanelComp.scale.y * 1.16; // for spin btn height
                    let availHt = CoreLib.UIUtil.getGameHeight() - ht;
                    let availWid = CoreLib.UIUtil.getGameWidth() * CoreLib.Util.getDefaultValue(obj.widthPerc, 1);
                    let sc = (availWid) / this.slotMachineComp.getWidth();
                    let hsc = availHt / this.slotMachineComp.getHeight();
                    this.slotMachineComp.scale.set(Math.min(sc, hsc));
                    CoreLib.UIUtil.setPositionX(this.slotMachineComp, (CoreLib.UIUtil.getGameWidth() - this.slotMachineComp.getWidth()) / 2);
                    CoreLib.UIUtil.setPositionY(this.slotMachineComp, (availHt - this.slotMachineComp.getHeight()) / 2);
                } else {
                    let obj = CoreLib.UIUtil.getDeviceSpecificUIObj(this.slotMachineComp.configData.layoutData);
                    this.slotMachineComp.scale.set(1);
                    let ht = this.slotPanelComp.lsbuttonsBG.height * this.slotPanelComp.scale.y;
                    let availHt = CoreLib.UIUtil.getGameHeight() - ht;
                    let availWid = CoreLib.UIUtil.getGameWidth(); //this.slotPanelComp.spinBtn.x;
                    let sc = (availWid * CoreLib.Util.getDefaultValue(obj.widthPerc, 1)) / this.slotMachineComp.getWidth();
                    let hsc = (availHt * CoreLib.Util.getDefaultValue(obj.heightPerc, 1)) / this.slotMachineComp.getHeight();
                    this.slotMachineComp.scale.set(Math.min(sc, hsc));
                    CoreLib.UIUtil.setPositionX(this.slotMachineComp, (availWid - this.slotMachineComp.getWidth()) / 2 + CoreLib.Util.getDefaultValue(obj.hPaddingPerc * CoreLib.UIUtil.getGameWidth(), 0));
                    CoreLib.UIUtil.setPositionY(this.slotMachineComp, (availHt - this.slotMachineComp.getHeight()) / 2+ CoreLib.Util.getDefaultValue(obj.vPaddingPerc * CoreLib.UIUtil.getGameHeight(), 0));
                }
            }
            CoreLib.Model.GameConfig.slotMachineScale = this.slotMachineComp.scale.x;
            CoreLib.Model.GameConfig.reelWidth = this.slotMachineComp.getWidth();
            CoreLib.Model.GameConfig.reelHeight = this.slotMachineComp.getHeight();
        }
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SLOT_MACHINE_POSITIONED);
        if (CoreLib.Model.DeviceConfig.isDesktop) {
            this.tournamentIcon.x = 32;
            this.tournamentIcon.y = 50;


        } else {
            this.tournamentIcon.x = 80;
            this.tournamentIcon.y = 100;
        }

    }


}
