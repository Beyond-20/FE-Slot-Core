import {SliderComp} from "./SliderComp";
import { CoreLib } from '../../core/CoreLib'
import { LibContainer } from '../../pixiwrapper/LibContainer'
import { Linear } from '../../../games/funhouse/jslibs/1.00/gsap/gsap.min'
import { slotModel } from '../../models/SlotModel'
import { LibView } from '../../pixiwrapper/LibView'

export class TournamentIcon extends LibView {
    constructor(config) {
        super(config);
        this.guideRect = this.elementsList["guideRect"];
        this.iconBG = this.elementsList["iconBG"];
        this.backLight = this.elementsList["backLight"];
        this.giftBox1 = this.elementsList["giftBox1"];
        this.giftBox2 = this.elementsList["giftBox2"];
        this.giftBox3 = this.elementsList["giftBox3"];
        this.prizeText = this.elementsList["prizeText"];
        this.leftText = this.elementsList["leftText"];
        this.daysText = this.elementsList["daysText"];
        this.rankUpText = this.elementsList["rankUpText"];
        this.rankValueText = this.elementsList["rankValueText"];
        this.coin = this.elementsList["coin"];
        this.arrow = this.elementsList["arrow"];

        this.iconBG.x = this.guideRect.width / 2;
        this.iconBG.y = this.guideRect.height / 2;

        CoreLib.UIUtil.addInteraction(this.guideRect, this.onTournamentClicked.bind(this));
        CoreLib.UIUtil.addHoverInteraction(this.guideRect, this.onTournamentHover.bind(this));
        CoreLib.UIUtil.addOutInteraction(this.guideRect, this.onTournamentOut.bind(this));
        CoreLib.UIUtil.setClickable(this.guideRect, true);




        this.giftBox1.x = this.guideRect.width / 2;
        this.giftBox2.x = this.guideRect.width / 2;
        this.giftBox3.x = this.guideRect.width / 2;

        this.giftBox1.visible = false;
        this.giftBox3.visible = false;

        this.prizeText.x = this.guideRect.width / 2;
        this.leftText.x = this.guideRect.width / 2;
        this.daysText.x = this.guideRect.width / 2;
        this.coin.x = this.guideRect.width / 2;
        this.arrow.x = this.guideRect.width / 2;
        this.rankUpText.x = this.guideRect.width / 2;
        this.rankValueText.x = this.guideRect.width / 2;

        this.showIconFlag = false;
        this.dataReceivedFlag = false;

        this.backLight.visible = false;
        this.rankUpText.visible = false;
        this.rankValueText.visible = false;
        this.coin.visible = false;
        this.arrow.visible = false;
        this.resizePrizeText();
        this.visible = false;
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.PANEL_RESIZED, this.resizeButtons.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.VALIDATE_TOURNEY_ICON, this.showTournamentIcon.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.TOURNAMENT_PRIZE_UPDATE, this.updateTournamentIcon.bind(this));
        this.giftBox1.onComplete = this.onRandomAnimCompleteHover.bind(this);
        this.giftBox2.onComplete = this.onRandomAnimComplete.bind(this);
        this.giftBox3.onComplete = this.onRandomAnimCompleteClicked.bind(this);
        this.startRandomAnim();

    }
    updateTournamentIcon (obj) {
        this.prizeText.text = obj.top_prize;
        const current = new Date();
        const end = new Date(obj.end_date);
        const diff = end - current;
        const days = Math.ceil(diff / (24*60*60*1000));
        let arr = [days];
        this.daysText.text = CoreLib.Util.parseMessage(CoreLib.Util.getContent("daysText"), arr);
        this.dataReceivedFlag = true;
        this.checkToShowIcon();
    }

    showTournamentIcon() {
        let playerInfo = slotModel.getPlayerInfo();
        if (!playerInfo.tournament_id) {
            this.visible = false;
        } else {
            this.showIconFlag = true;
        }
        this.checkToShowIcon();
    }
    checkToShowIcon() {
        return;
        this.visible = true;
        if (this.dataReceivedFlag && this.showIconFlag) {
            this.visible = true;
        }
    }

    startRandomAnim () {
        clearTimeout(this.randomAnimId);
        this.randomAnimId = setTimeout(this.playRandomAnim.bind(this), CoreLib.Util.getRandomRange(4000,12000));
    }
    playRandomAnim () {
        this.giftBox2.playAnimation(false);
    }
    onRandomAnimComplete () {
        this.startRandomAnim();
    }
    onTournamentHover () {
        clearTimeout(this.randomAnimId);
        this.giftBox2.visible = false;
        this.giftBox1.visible = true;
        this.giftBox1.playAnimation(false);
    }
    onTournamentOut () {
        //this.startRandomAnim();
    }
    onRandomAnimCompleteHover () {
        this.giftBox1.visible = false;
        this.giftBox2.visible = true;
        this.startRandomAnim();
    }

    onRandomAnimCompleteClicked () {
        this.giftBox1.visible = false;
        this.giftBox2.visible = true;
        this.giftBox3.visible = false;

        this.startRandomAnim();
    }

    resizeButtons (scale) {

    }

    onTournamentClicked () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.TOURNAMENT_ICON_CLICKED);
        CoreLib.EventHandler.dispatchEvent("TOURNAMENT_GIFT_CLICKED");
        clearTimeout(this.randomAnimId);
        this.giftBox1.visible = false;
        this.giftBox2.visible = false;
        this.giftBox3.visible = true;
        this.giftBox3.playAnimation(false);

    }

    resizePrizeText () {
        this.prizeText.scale.set(1);
        if (this.prizeText.width > this.iconBG.width * 0.85) {
            let sc = (this.iconBG.width * 0.85) / this.prizeText.width;
            this.prizeText.scale.set(sc);
        }
    }

    showRankUp (oldrank, newrank) {
        this.giftBox1.visible = false;
        this.giftBox2.visible = false;
        this.giftBox3.visible = false;
        this.newRank = newrank;
        CoreLib.AnimationManager.animateTween(this.giftBox1, 0.5, {alpha : 0, ease : Linear.easeOut});
        CoreLib.AnimationManager.animateTween(this.prizeText, 0.5, {alpha : 0, ease : Linear.easeOut});
        CoreLib.AnimationManager.animateTween(this.leftText, 0.5, {alpha : 0, ease : Linear.easeOut});
        CoreLib.AnimationManager.animateTween(this.daysText, 0.5, {alpha : 0, ease : Linear.easeOut});


        this.backLight.visible = true;
        this.rankUpText.visible = true;
        this.coin.visible = true;
        this.rankValueText.visible = true;
        this.arrow.visible = true;

        this.backLight.alpha = 0;
        this.rankUpText.alpha = 0;
        this.coin.alpha = 0;
        this.arrow.alpha = 0;
        this.rankValueText.text = oldrank;
        CoreLib.AnimationManager.animateTween(this.backLight, 0.5, {alpha : 1, ease : Linear.easeOut});
        CoreLib.AnimationManager.animateTween(this.coin, 0.5, {alpha : 1, ease : Linear.easeOut});
        CoreLib.AnimationManager.animateTween(this.rankUpText, 0.5, {alpha : 1, ease : Linear.easeOut});
        CoreLib.AnimationManager.animateTween(this.rankValueText, 0.5, {alpha : 1, ease : Linear.easeOut, onComplete : this.onFirstPhaseFadedIn.bind(this)});
    }
    onFirstPhaseFadedIn ()  {
        setTimeout(this.startSecondPhase.bind(this), 1000);
    }
    startSecondPhase () {
        CoreLib.AnimationManager.animateTween(this.rankValueText, 0.5, {alpha : 0});
        CoreLib.AnimationManager.animateTween(this.arrow, 0.5, {alpha : 1, onComplete : this.onOldRankFadedOut.bind(this)});
    }

    onOldRankFadedOut () {
        CoreLib.AnimationManager.animateTween(this.arrow, 0.2, {y : this.arrow.y - 10, repeat : 3, yoyo : true, onComplete : this.onArrowDone.bind(this)});
    }

    onArrowDone () {
        setTimeout(this.showNewRank.bind(this), 200);
    }
    showNewRank () {
        CoreLib.AnimationManager.animateTween(this.arrow, 0.25, {alpha : 0});
        this.rankValueText.text = this.newRank;
        this.rankValueText.alpha = 0;
        CoreLib.AnimationManager.animateTween(this.rankValueText, 0.25, {alpha : 1, onComplete : this.onNewRankAppeared.bind(this)})
    }

    onNewRankAppeared () {
        setTimeout(this.endSequence.bind(this), 1000);
    }

    endSequence () {
        CoreLib.AnimationManager.animateTween(this.giftBox1, 0.5, {alpha : 1, ease : Linear.easeOut});
        CoreLib.AnimationManager.animateTween(this.prizeText, 0.5, {alpha : 1, ease : Linear.easeOut});
        CoreLib.AnimationManager.animateTween(this.leftText, 0.5, {alpha : 1, ease : Linear.easeOut});
        CoreLib.AnimationManager.animateTween(this.daysText, 0.5, {alpha : 1, ease : Linear.easeOut});

        this.giftBox1.visible = true;
        this.giftBox2.visible = true;
        this.giftBox3.visible = true;

        CoreLib.AnimationManager.animateTween(this.backLight, 0.5, {alpha : 0, ease : Linear.easeOut});
        CoreLib.AnimationManager.animateTween(this.coin, 0.5, {alpha : 0, ease : Linear.easeOut});
        CoreLib.AnimationManager.animateTween(this.rankUpText, 0.5, {alpha : 0, ease : Linear.easeOut});
        CoreLib.AnimationManager.animateTween(this.rankValueText, 0.5, {alpha : 0, ease : Linear.easeOut, onComplete : this.onSequenceCompleted.bind(this)});
    }

    onSequenceCompleted () {

        setTimeout(this.showRankUp.bind(this, 25, 28), 8000);
    }



}
