import {LibContainer} from "./LibContainer";
import {LibView} from "./LibView";
import {CoreLib} from "../core/CoreLib";

export class LibSpriteDS extends LibContainer {
    constructor(name, configData) {
        super();
        this.configData = {};
        for (var p in configData) {
            this.configData[p] = configData[p];
        }
        if (CoreLib.Model.DeviceConfig.isDesktop) {
            this.bg = CoreLib.UIUtil.getSprite(this.configData.image);
            this.addChild(this.bg);
        } else {
            this.bgP = CoreLib.UIUtil.getSprite(this.configData.imagePT);
            this.addChild(this.bgP);
            this.bgL = CoreLib.UIUtil.getSprite(this.configData.imageLS);
            this.addChild(this.bgL);

        }
    }


    resizeViewComponents () {
        if (!CoreLib.Model.DeviceConfig.isDesktop) {
            if (CoreLib.Model.DeviceConfig.orientation == 1) {
                this.bgP.visible = false;
                this.bgL.visible = true;
            } else {
                this.bgP.visible = true;
                this.bgL.visible = false;
            }
        }
        super.resizeViewComponents();
    }


}
