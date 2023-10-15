import { LibContainer } from '../../pixiwrapper/LibContainer'
import { TGChip } from './TGChip'
import {CoreLib} from '../../core/CoreLib'

export class MChipPanelComp extends LibContainer {
    constructor(config) {
        super(config);

        this.guideRect = this.elementsList["guideRect"];
        if (this.guideRect) {
            this.guideRect.alpha = 0;
        }
        this.chipContainer = CoreLib.UIUtil.getContainer();
        this.addChild(this.chipContainer);
        this.chipContainer.scale.set(1);
        let chipslen = CoreLib.Model.GameConfig.chipsArray.length;
        CoreLib.Model.GameConfig.chipsNumberArray = {};
        this.chipbg = this.elementsList["chipbg"];
        if (CoreLib.Model.DeviceConfig.isDesktop) {
            this.chipbg.destroy();
            this.chipbg = null;
        }
        let imgno = 1;
        let xgap = 0;
        this.chipsArray = [];
        this.chipsXArray = [];
        for (let k = 0; k < chipslen; k++) {
            let chip = new TGChip({id : k, imageNo : imgno, chipValue : CoreLib.Model.GameConfig.chipsArray[k], textColor :  CoreLib.Model.GameConfig.textColArray[imgno - 1]});
            //CoreLib.Model.GameConfig.chipsNumberArray[CoreLib.Model.GameConfig.chipsArray[k]] = CoreLib.Model.GameConfig.chipsImageArray[k];
            imgno++;
            if (imgno > 6) {
                imgno = 1;
            }
            this.chipContainer.addChild(chip);
            if (CoreLib.Model.DeviceConfig.isDevice) {
                chip.x = chip.width / 2 + k * (chip.width * 0.9 + xgap);
            } else {
                chip.x = chip.width / 2 + k * (chip.width + xgap);
            }
            this.chipsXArray.push(chip.x);
            chip.y = chip.height / 2;
            this.chipsArray.push(chip);
            chip.setSelected(k == CoreLib.Model.GameConfig.selectedChip ? true : false);
            chip.on("OnChipSelected", this.onChipSelected.bind(this));
        }
        this.selectedChip = CoreLib.Model.GameConfig.selectedChip;
        CoreLib.Model.GameConfig.selectedChipValue = CoreLib.Model.GameConfig.chipsArray[CoreLib.Model.GameConfig.selectedChip];
        this.chipContainer.y = (this.guideRect.height - this.chipContainer.height) / 2;
        this.chipContainer.x = 0;
        this.setCompEnabled(false);

        this.isClosed = false;

        if (this.chipbg) {
            this.chipbg.anchor.set(0.5,0.5);
            this.chipbg.x = this.guideRect.width / 2;
            this.chipbg.y = this.guideRect.height / 2 + 3;
        }
        this.onChipSelected(1);
    }

    setCompEnabled (flag) {
        let len = this.chipsArray.length;
        for (let k = 0; k < len; k++) {
            this.chipsArray[k].setEnabled(flag);
        }
        this.chipContainer.visible = flag;
        if (this.chipbg) {
            this.chipbg.visible = flag;
        }

    }
    openChipPanel () {
        this.isClosed = false;
        let len = this.chipsArray.length;
        for (let k = 0; k < len; k++) {
            CoreLib.AnimationManager.animateTween(this.chipsArray[k], 0.2, {x : this.chipsXArray[k], ease : Power2.easeOut})
        }
        if (this.chipbg) {
            CoreLib.AnimationManager.animateTween(this.chipbg, 0.2, {alpha : 0});
        }
    }
    closePanel () {
        this.isClosed = true;
        let len = this.chipsArray.length;
        for (let k = 0; k < len; k++) {
            CoreLib.AnimationManager.animateTween(this.chipsArray[k], 0.2, {x : this.guideRect.width / 2, ease : Power2.easeOut})
        }
        CoreLib.AnimationManager.animateTween(this.chipbg, 0.4, {alpha : 1});
    }
    onChipSelected (data) {
        this.selectChip(data);
        if (CoreLib.Model.DeviceConfig.isDevice) {
            if (this.isClosed) {
                this.openChipPanel();
            } else {
                this.closePanel();
            }
        }

    }
    selectChip(data) {
        this.chipsArray[CoreLib.Model.GameConfig.selectedChip].setSelected(false);
        CoreLib.Model.GameConfig.selectedChip = data;
        CoreLib.Model.GameConfig.selectedChipValue = CoreLib.Model.GameConfig.chipsArray[CoreLib.Model.GameConfig.selectedChip];
        this.chipsArray[CoreLib.Model.GameConfig.selectedChip].setSelected(true);
        this.chipContainer.addChild(this.chipsArray[CoreLib.Model.GameConfig.selectedChip]);
        CoreLib.EventHandler.dispatchEvent("CHIP_SELECTED");

    }

    resizeViewComponents () {
        this.chipHeight = this.chipsArray[CoreLib.Model.GameConfig.selectedChip].height;
        this.chipWidth = this.chipsArray[CoreLib.Model.GameConfig.selectedChip].width;
        if (CoreLib.Model.DeviceConfig.isDesktop) {
            this.guideRect.width = 660;
            this.guideRect.height = 110;
            this.chipContainer.y = (this.guideRect.height - this.chipContainer.height) / 2;
        }
    }

}
