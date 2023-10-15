import {LibView} from "../../pixiwrapper/LibView";
import {CoreLib} from "../../core/CoreLib";

export class SlotSplashComp extends LibView
{
    constructor(config, layoutconfig) {
        super(config, layoutconfig);
        this.pagesComp = this.elementsList["pagesComp"];
        this.logoContainer = this.elementsList["logoContainer"];
        this.elementsContainer = this.elementsList["elementsContainer"];

        this.splashlogo = this.logoContainer.elementsList["splashlogo"];
        if (this.splashlogo) {
            CoreLib.UIUtil.setPosition(this.splashlogo, this.logoContainer.guideRect.width / 2 + CoreLib.Util.getDefaultValue(this.splashlogo.configData.xPadding, 0), this.logoContainer.guideRect.height / 2 + CoreLib.Util.getDefaultValue(this.splashlogo.configData.yPadding, 0));
        }


        this.eGuideRect = this.elementsContainer.elementsList["guideRect"];
        this.playBtn = this.elementsContainer.elementsList["playBtn"];
        this.volatilityComp = this.elementsContainer.elementsList["volatilityComp"];
        this.dontShowComp = this.elementsContainer.elementsList["dontShowComp"];
        this.isHidden = false;

        this.playBtn.setAnchor(0.5,0.5);

        this.playBtn.setEnabled(true);
        this.playBtn.addInteraction(this.onPlayClicked.bind(this));
        CoreLib.UIUtil.setPosition(this.dontShowComp, (this.eGuideRect.width - this.dontShowComp.width) / 2, this.eGuideRect.height - this.dontShowComp.height * 1.1);
        CoreLib.UIUtil.setPosition(this.volatilityComp, (this.eGuideRect.width - this.volatilityComp.width) / 2, this.dontShowComp.y - this.volatilityComp.height * 1.1);
        CoreLib.UIUtil.setPosition(this.playBtn, (this.eGuideRect.width / 2), this.volatilityComp.y - this.playBtn.height * 0.75);

        CoreLib.AnimationManager.animateTween(this.playBtn, 0.5, {scaleX : 0.85, scaleY : 0.85, repeat : -1, yoyo : true});



        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_SLOTMACHINE, false);
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_SLOTPANEL, false);




        if (!CoreLib.Model.GameConfig.splashState) {
            setTimeout(this.skipIntro.bind(this), 0);
        }

        if (this.configData.showFreeSpinBG) {
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_FREEGAME_BG, false);
        }

    }
    skipIntro () {
        this.visible = false;
        this.isHidden = true;
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.GAME_START_CLICKED_SKIPPED);
    }
    onPlayClicked () {
        this.hidePaytable();
        CoreLib.EventHandler.dispatchEvent("PLAY_INTRO_CLICK_SOUND")
    }
    showPaytable () {
        this.visible = true;
    }
    hidePaytable () {
        this.visible = false;
        if (!this.isHidden) {
            this.isHidden = true;
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.GAME_START_CLICKED);
        }
    }

    resizeViewComponents () {
        super.resizeViewComponents();
        if (CoreLib.Model.DeviceConfig.isDesktop) {
            CoreLib.UIUtil.scaleObjectWithRef(this.pagesComp, null, this.pagesComp.configData.maxWidth, this.pagesComp.configData.maxHeight);
            CoreLib.UIUtil.setPosition(this.pagesComp, (CoreLib.UIUtil.getGameWidth() * this.pagesComp.configData.maxWidth - this.pagesComp.width) / 2, (CoreLib.UIUtil.getGameHeight() - this.pagesComp.getHeight()) / 2);

            let otherwidth = CoreLib.UIUtil.getGameWidth() - this.pagesComp.guideRect.width * this.pagesComp.scale.x;

            this.logoContainer.scale.set(1);
            this.elementsContainer.scale.set(1);
            let wsc = (otherwidth * 0.8) / this.logoContainer.getWidth();
            let hsc = (this.pagesComp.height) / (this.logoContainer.getHeight() + this.elementsContainer.height);
            let sc = Math.min(wsc, hsc);
            this.logoContainer.scale.set(Math.min(sc, 1));

            wsc = (otherwidth * 0.8) / this.elementsContainer.getWidth();
            hsc = (this.pagesComp.height) / (this.elementsContainer.getHeight() + this.elementsContainer.height);
            sc = Math.min(wsc, hsc);
            this.elementsContainer.scale.set(Math.min(sc, 1));

            if (this.splashlogo) {
                CoreLib.UIUtil.setPosition(this.logoContainer, this.pagesComp.x + this.pagesComp.guideRect.width * this.pagesComp.scale.x + (otherwidth - this.logoContainer.getWidth()) / 2, this.pagesComp.y + CoreLib.Util.getDefaultValue(this.splashlogo.configData.yPadding, 0));
            } else {
                CoreLib.UIUtil.setPosition(this.logoContainer, this.pagesComp.x + this.pagesComp.guideRect.width * this.pagesComp.scale.x + (otherwidth - this.logoContainer.getWidth()) / 2, this.pagesComp.y);
            }
            //CoreLib.UIUtil.setPosition(this.elementsContainer, this.pagesComp.x + this.pagesComp.guideRect.width * this.pagesComp.scale.x + (otherwidth - this.elementsContainer.width) / 2, this.pagesComp.y + this.pagesComp.height - this.elementsContainer.height);
            CoreLib.UIUtil.setPosition(this.elementsContainer, this.logoContainer.x + (this.logoContainer.getWidth() - this.elementsContainer.getWidth()) / 2, this.pagesComp.y + this.pagesComp.height - this.elementsContainer.height);

        } else {
            CoreLib.UIUtil.adjustWidthHeightForMobile(this.logoContainer.guideRect);
            CoreLib.UIUtil.adjustWidthHeightForMobile(this.elementsContainer.guideRect);

            if (this.splashlogo) {
                CoreLib.UIUtil.setPosition(this.splashlogo, this.logoContainer.guideRect.width / 2, this.logoContainer.guideRect.height / 2);
            }

            CoreLib.UIUtil.setPosition(this.dontShowComp, (this.eGuideRect.width - this.dontShowComp.width) / 2, this.eGuideRect.height - this.dontShowComp.height * 1.1);
            CoreLib.UIUtil.setPosition(this.volatilityComp, (this.eGuideRect.width - this.volatilityComp.width) / 2, this.dontShowComp.y - this.volatilityComp.height * 1.1);
            CoreLib.UIUtil.setPosition(this.playBtn, (this.eGuideRect.width / 2), this.volatilityComp.y - this.playBtn.height * 0.75);
            this.pagesComp.scale.set(1);
            if (CoreLib.Model.DeviceConfig.isLandscape) {
                CoreLib.UIUtil.scaleObjectWithRef(this.pagesComp, null, this.pagesComp.configData.maxWidth, this.pagesComp.configData.maxHeight);
                CoreLib.UIUtil.setPosition(this.pagesComp, (CoreLib.UIUtil.getGameWidth() * this.pagesComp.configData.maxWidth - this.pagesComp.getWidth()) / 2, (CoreLib.UIUtil.getGameHeight() - this.pagesComp.getHeight()) / 2);

                let otherwidth = CoreLib.UIUtil.getGameWidth() - this.pagesComp.guideRect.width * this.pagesComp.scale.x;

                this.logoContainer.scale.set(1);
                this.elementsContainer.scale.set(1);

                let wsc = (otherwidth) / this.logoContainer.getWidth();
                let hsc = ((CoreLib.UIUtil.getGameHeight()) * 0.4) / this.logoContainer.getHeight();
                let sc = Math.min(wsc, hsc);
                this.logoContainer.scale.set(sc);
                wsc = (otherwidth) / this.elementsContainer.width;
                hsc = ((CoreLib.UIUtil.getGameHeight())  * 0.55) / this.elementsContainer.getHeight();
                sc = Math.min(wsc, hsc);
                this.elementsContainer.scale.set(sc);

                CoreLib.UIUtil.setPosition(this.logoContainer, this.pagesComp.x + this.pagesComp.getWidth() + (otherwidth - this.logoContainer.getWidth()) / 2, (CoreLib.UIUtil.getGameHeight() * 0.4 - this.logoContainer.getHeight()) / 2);
                CoreLib.UIUtil.setPosition(this.elementsContainer, this.pagesComp.x + this.pagesComp.getWidth() + (otherwidth - this.elementsContainer.getWidth()) / 2, (CoreLib.UIUtil.getGameHeight() * 0.4) + (CoreLib.UIUtil.getGameHeight() * 0.6 - this.elementsContainer.getHeight()) / 2);
            } else {

                CoreLib.UIUtil.scaleObjectWithRef(this.pagesComp, null, 1, 1, true);
                CoreLib.UIUtil.setPosition(this.pagesComp, (CoreLib.UIUtil.getGameWidth() - this.pagesComp.getWidth()) / 2, (CoreLib.UIUtil.getGameHeight() - this.pagesComp.getHeight()) * 0.4);

                let otherwidth = CoreLib.UIUtil.getGameWidth();

                this.logoContainer.scale.set(1);
                this.elementsContainer.scale.set(1);
                let wsc = (otherwidth) / this.logoContainer.getWidth();
                let hsc = ((CoreLib.UIUtil.getGameHeight() - this.pagesComp.getHeight()) * 0.35) / this.logoContainer.getHeight();
                let sc = Math.min(wsc, hsc);
                this.logoContainer.scale.set(sc);
                wsc = (otherwidth) / this.elementsContainer.getWidth();
                hsc = ((CoreLib.UIUtil.getGameHeight() - this.pagesComp.getHeight())  * 0.45) / this.elementsContainer.getHeight();
                sc = Math.min(wsc, hsc);
                this.elementsContainer.scale.set(sc);
                CoreLib.UIUtil.setPosition(this.logoContainer, (otherwidth - this.logoContainer.getWidth()) / 2, this.pagesComp.y - this.logoContainer.getHeight() + CoreLib.Util.getDefaultValue(this.logoContainer.configData.pYPadding, 0));
                CoreLib.UIUtil.setPosition(this.elementsContainer, (otherwidth - this.elementsContainer.getWidth()) / 2, this.pagesComp.y + this.pagesComp.getHeight() * 1.05);
            }
        }
    }



}
