import { LibView } from "../../pixiwrapper/LibView";
import { CoreLib } from "../../core/CoreLib";
import { slotModel } from "../../models/SlotModel";
import { soundFactory } from '../../sound/SoundFactory'
import { View } from "../../views/GameView";

export class NoPortraitView extends LibView {
    constructor(config, layoutconfig) {
        super(config, layoutconfig);
        this.visible = false;
        this.modalRect = this.elementsList["modalRect"];
        this.anim = this.elementsList["anim"];
        this.anim.onComplete = this.onAnimComplete.bind(this);
        CoreLib.EventHandler.addEventListener("CHECK_NO_PORTRAIT_MOCAL", this.resizeViewComponents.bind(this));
    }
    onAnimComplete() {
        setTimeout(this.replayAnim.bind(this), 2000);
    }

    replayAnim() {
        this.resizeViewComponents();
    }

    resizeViewComponents() {
        super.resizeViewComponents();
        if (CoreLib.Model.DeviceConfig.isDevice) {
            if (CoreLib.Model.DeviceConfig.isPortrait) {
                if (CoreLib.Model.GameConfig.noPortraitMode) {
                    this.visible = true;
                    if (this.anim) {
                        this.anim.playAnimation(false);
                        this.anim.x = CoreLib.UIUtil.getGameWidth() / 2;
                        this.anim.y = CoreLib.UIUtil.getGameHeight() / 2;
                    }
                }
            } else {
                this.visible = false;
                if (this.anim) {
                    this.anim.stopAnimation();
                }
            }
        }
    }


}
