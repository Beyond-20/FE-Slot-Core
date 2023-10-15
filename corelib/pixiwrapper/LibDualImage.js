import {CoreLib} from "../core/CoreLib";
import { LibContainer } from './LibContainer'

export class LibDualImage extends LibContainer {
    constructor(name, configData) {
        super();
        this.configData = {};
        for (var p in configData) {
            this.configData[p] = configData[p];
        }
        if (CoreLib.Model.DeviceConfig.isDesktop) {
            this.bg = CoreLib.UIUtil.getSprite(name);
            this.addChild(this.bg);
            if (configData.coverAlpha && configData.coverAlpha > 0) {
                let rect = CoreLib.UIUtil.getRectangle(this.bg.width, this.bg.height, 0x000000);
                this.bg.addChild(rect);
                rect.alpha = configData.coverAlpha;
            }
            if (configData.scale) {
                if (configData.scale.x) {
                    this.bg.scale.x = configData.scale.x;
                }
                if (configData.scale.y) {
                    this.bg.scale.y = configData.scale.y;
                }
            }
            if (configData.anchor) {
                if (configData.anchor.x) {
                    this.bg.anchor.x = configData.anchor.x;
                }
                if (configData.anchor.y) {
                    this.bg.anchor.y = configData.anchor.y;
                }
            }
        } else {
            this.bgP = CoreLib.UIUtil.getSprite(name + "_P");
            this.addChild(this.bgP);
            let rect1 = CoreLib.UIUtil.getRectangle(this.bgP.width, this.bgP.height, 0x000000);
            this.bgP.addChild(rect1);
            rect1.alpha = configData.coverAlpha;
            this.bgL = CoreLib.UIUtil.getSprite(name);
            this.addChild(this.bgL);
            let rect2 = CoreLib.UIUtil.getRectangle(this.bgL.width, this.bgL.height, 0x000000);
            this.bgL.addChild(rect2);
            rect2.alpha = configData.coverAlpha;
            if (configData.scale) {
                if (configData.scale.x) {
                    this.bgL.scale.x = configData.scale.x;
                }
                if (configData.scale.y) {
                    this.bgL.scale.y = configData.scale.y;
                }
            }
            if (configData.anchor) {
                if (configData.anchor.x) {
                    this.bgL.anchor.x = configData.anchor.x;
                }
                if (configData.anchor.y) {
                    this.bgL.anchor.y = configData.anchor.y;
                }
            }
        }



    }
    play() {

    }
    gotoAndPlay (fr) {

    }
    playAnimation () {

    }
    stopAnimation () {

    }
    onResizeStartEvent () {
        if (!CoreLib.Model.DeviceConfig.isDesktop) {
            if (CoreLib.Model.DeviceConfig.orientation == 1) {
                this.bgP.visible = false;
                this.bgL.visible = true;
            } else {
                this.bgP.visible = true;
                this.bgL.visible = false;
            }
        }
        super.onResizeStartEvent();
    }


}
