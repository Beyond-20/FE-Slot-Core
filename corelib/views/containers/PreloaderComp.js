import {LibContainer} from "../../pixiwrapper/LibContainer";
import {CoreLib} from "../../core/CoreLib";

export class PreloaderComp extends LibContainer {
    constructor(config) {
        super(config);

        this.bg = this.elementsList["bg"];
        this.loaderbg = this.elementsList["loaderbg"];
        this.brandlogo = this.elementsList["brandlogo"];
        this.brandlogoTop = this.elementsList["brandlogoTop"]
        this.loadermask = this.elementsList["loadermask"];
        this.percText = this.elementsList["percText"];

        this.loaderContainer = CoreLib.UIUtil.getContainer();
        this.addChild(this.loaderContainer);
        this.loaderContainer.addChild(this.brandlogo, this.brandlogoTop, this.loadermask);

        this.loadermask.scale.x = 0;
        this.brandlogoTop.mask = this.loadermask;


        this.isDestroyed = false;

        this.percText.visible = false;
        this.updateLoadingProgress(0);
        CoreLib.EventHandler.addEventListener(CoreLib.AppEvents.ASSET_LOADING_PROGRESS, this.updateLoadingProgress.bind(this));



    }

    updateLoadingProgress (loaded) {
        //CoreLib.AnimationManager.animateTween(this.loadermask, 2, {scaleX : (loaded / 100)});
        this.loadermask.scale.x = loaded / 100;
    }

    destroyComp() {
        CoreLib.AnimationManager.killTweensOf(this.loadermask);
        super.destroyComp();
        this.isDestroyed = true;

    }

    resizeViewComponents(layoutData = null) {
        if (this.isDestroyed) {
            return;
        }
        super.resizeViewComponents(layoutData);
        this.bg.width = CoreLib.UIUtil.getGameWidth();
        this.bg.height = CoreLib.UIUtil.getGameHeight();

        CoreLib.UIUtil.alignToScreen(this.loaderContainer, "center");
        CoreLib.UIUtil.alignToScreen(this.loaderContainer, "middle");

        CoreLib.UIUtil.setPositionX(this.percText, this.bg.width / 2);
        CoreLib.UIUtil.setPositionY(this.percText, this.loaderContainer.y - this.percText.height * 0.2);




    }



}
