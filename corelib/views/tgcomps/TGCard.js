import { LibContainer } from '../../pixiwrapper/LibContainer'
import {CoreLib} from '../../core/CoreLib'

export class TGCard extends LibContainer {
    constructor(config) {
        super(config);

        this.backcard = CoreLib.UIUtil.getSprite("cardback");
        this.backcard.anchor.set(0.5,0.5);
        this.addChild(this.backcard);

        this.frontCard = CoreLib.UIUtil.getSprite("cardback");
        this.addChild(this.frontCard);
        this.frontCard.scale.x = 0;
        this.frontCard.anchor.set(0.5,0.5);
        this.cardOpened = false;
    }

    showCard (val) {
        this.cardOpened = true;
        this.frontCard.visible = true;
        this.frontCard.texture = CoreLib.UIUtil.getTexture(val);
        CoreLib.AnimationManager.animateTween(this.backcard, 0.2, {scaleX : 0, ease : Linear.easeNone, onComplete : this.onBack1Done.bind(this)});
    }

    onBack1Done () {
        CoreLib.EventHandler.dispatchEvent("PLAY_CARD_FLIP_SOUND");
        this.backcard.visible = false;
        CoreLib.AnimationManager.animateTween(this.frontCard, 0.2, {scaleX : 1, ease : Linear.easeOut, onComplete : this.cardShownComplete.bind(this)});
    }
    cardShownComplete () {
        this.emit("CARD_SHOWN_COMPLETE")
    }

    closeCard () {
        if (this.cardOpened) {
            CoreLib.AnimationManager.animateTween(this.frontCard, 0.16, {scaleX : 0, ease : Linear.easeNone, onComplete : this.onFrontCardDone.bind(this)});
        }
        this.cardOpened = false;
    }
    onFrontCardDone () {
        CoreLib.AnimationManager.animateTween(this.backcard, 0.16, {scaleX : 1, ease : Linear.easeNone, onComplete : this.onBackCardDone.bind(this)});
    }
    onBackCardDone () {
        this.frontCard.visible = false;
        this.frontCard.scaleX = 1;
        this.backcard.visible = true;
        this.backcard.scale.x = 1;
        this.frontCard.scale.x = 0;
    }

}
