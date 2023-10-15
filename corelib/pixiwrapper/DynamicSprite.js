import {LibContainer} from "./LibContainer";
import {LibView} from "./LibView";
import {CoreLib} from "../core/CoreLib";

export class DynamicSprite extends LibView {
    constructor(configData) {
        super();
        this.configData = {};
        for (var p in configData) {
            this.configData[p] = configData[p];
        }
        if (configData.image) {
            this.showImage(configData.image);
        }

    }

    showImage (image) {
        this.sp = PIXI.Sprite.from(CoreLib.Model.GameConfig.dynamicImagesPath + image);
        this.sp.texture.baseTexture.complete = this.onImageLoaded.bind(this);
        this.addChild(this.sp);
        this.intervalid = setInterval(this.checkHeight.bind(this), 200);

    }
    checkHeight () {
        if (this.sp.height > 0) {
            clearInterval(this.intervalid);
            this.emit("IMAGE_LOADED");
        }
    }
    onImageLoaded () {
    }

    updateImage (image) {
        this.sp.texture = PIXI.Texture.from(CoreLib.Model.GameConfig.dynamicImagesPath + image);
    }
    


}
