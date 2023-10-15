import {LibView} from "../../pixiwrapper/LibView";
import {CoreLib} from "../../core/CoreLib";


export class PreloaderView extends LibView
{
    constructor(config) {
        super(config)
        this.isDestroyed = false;
        this.preloaderComp = this.elementsList["preloaderComp"];
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.FADEOUT_PRELOADER, this.removePreloader.bind(this));
    }

    removePreloader () {
        CoreLib.AnimationManager.animateTween(this.preloaderComp, 0.5, {alpha : 0, onComplete : this.onPreloaderFadedOut.bind(this)});
    }

    onPreloaderFadedOut () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.REMOVE_PRELOADER);
    }

    destroyComp () {
        this.preloaderComp.destroyComp();
    }
}