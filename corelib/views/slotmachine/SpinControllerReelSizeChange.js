import {CoreLib} from "../../core/CoreLib";

class SpinControllerReelSizeChange {
    constructor() {
        this.symbolsArray = [];
        this.stripsArray = [];
        this.stripsSymbolsArray = [];

        this.ticker = new PIXI.Ticker();
        var that = this;
        this.ticker.add(function (delta) {
            that.doReelSpin(delta)
        });

    }
    setSlotInstance (instance) {
        this.slotMachine = instance;
        this.maxSpeed = CoreLib.Util.getDefaultValue(this.slotMachine.configData.data.reelSpinMaxSpeed, 80);
        this.minSpeed = CoreLib.Util.getDefaultValue(this.slotMachine.configData.data.reelSpinMinSpeed, 60);
        this.acceleration = CoreLib.Util.getDefaultValue(this.slotMachine.configData.data.acceleration, 2);
        this.endJerkDistance = CoreLib.Util.getDefaultValue(this.slotMachine.configData.data.endJerkDistance, 16);
        this.reelHeight = this.slotMachine.configData.data.reelHeight;
        this.reelWidth = this.slotMachine.configData.data.reelWidth;
        this.speeds = [0,0,0,0,0,0,0,0];
        this.stopIndexes = [0,0,0,0,0,0,0,0]
    }

    startAllSpin (sticky) {
        this.stickyReels = sticky;
        this.spinningReels = [];
        let symbslen = this.symbolsArray[0].length - 1;
        this.stopIndexes = [];
        this.speeds = [];
        this.reelsStopped = [];
        this.reelsCompleted = []; // new for stop spin
        this.stopStarted = [];
        for (let k = 0; k < this.slotMachine.configData.data.noOfReels; k++) {
            this.stopIndexes.push(symbslen);
            this.reelsStopped.push(0);
            this.speeds.push(0);
            this.stopStarted[k] = false;
            this.reelsCompleted[k] = false;
        }
        this.totalSymbols = this.slotMachine.configData.data.noOfRows + 2;
        this.showHideExtraSymbols(true);
        this.lastFrameTime = new Date().getTime();
        this.spinState = "spinning";
        this.resultSymbols = [];
        this.spinStopIndex = 0;
        this.quickStopStarted = false;
        //this.ticker.start();

    }
    hideSymbols (index) {
        let len = this.symbolsArray[index].length;
        for (let k = 0; k < len; k++) {
            this.symbolsArray[index][k].clearAllSymbolEffects();
            this.symbolsArray[index][k].visible = false;
        }
    }
    showSymbols (index) {
        let len = this.symbolsArray[index].length;
        for (let k = 0; k < len; k++) {
            this.symbolsArray[index][k].visible = true;
        }
    }
    startReelStripSpin (index) {
        if (CoreLib.Model.GameConfig.isTurboOn) {
            setTimeout(this.notifyStart.bind(this, index), index * 0);
        } else {
            setTimeout(this.notifyStart.bind(this, index), index * CoreLib.Util.getDefaultValue(this.slotMachine.configData.data.reelStartGap, 100));
        }

    }
    notifyStart (index) {
        if (this.quickStopStarted) {
            return;
        }
        if (this.stickyReels && this.stickyReels.indexOf(index) > -1) {

        } else {
            let arr = [];
            let totallen = this.symbolsArray[index].length;
            for (let k = 0; k < totallen; k++) {
                arr.push(this.symbolsArray[index][k].getSymbolNumber());
            }
            arr.push(this.symbolsArray[index][0].getSymbolNumber())
            let len = arr.length;
            for (let k = 0; k < len; k++) {
                let total = this.stripsSymbolsArray[index].length;
                this.stripsSymbolsArray[index][total - len + k].texture = CoreLib.UIUtil.getTexture(arr[k] + "_blur");
            }
            this.stripsArray[index].y = -this.stripsArray[index].height + ( 5 * this.configData.data.symbolHeight);
            this.stripsArray[index].visible = true;
            this.hideSymbols(index);
            // this.addBlurToAllSymbols(true, index);
            // this.reelsStopped[index] = 1;
        }
        CoreLib.AnimationManager.animateTween(this.stripsArray[index], CoreLib.Util.getDefaultValue(this.slotMachine.configData.data.spinSpeedDuration, 2.2), { y : 0, repeat : -1, ease : Linear.easeNone});
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.REELSTRIP_SPIN_STARTED);

    }
    stopReelStripQuickForPress(reelno, reelview, isTurbo = false) {
        if (this.reelsCompleted[reelno]) {
            return;
        }
        if (this.stopStarted[reelno]) {
            this.forceStopReel(reelno);
            return;
        }
        this.quickStopStarted = true;
        this.stopIndexes = [];
        for (let k = 0; k < this.slotMachine.configData.data.noOfReels; k++) {
            this.reelsStopped[k] = 2;
            this.stopIndexes.push(reelview.length + 1);
        }
        this.ticker.stop();
        this.stripsArray[reelno].visible = false;
        this.showSymbols(reelno);
        this.resultSymbols[reelno] = [];
        let len = reelview.length;
        for (let k = 0; k < len; k++) {
            this.resultSymbols[reelno].push(reelview[k]);
        }
        this.resultSymbols[reelno].unshift(reelview[reelview.length - 1]);
        this.resultSymbols[reelno].push(reelview[0]);
        this.addBlurToAllSymbols(false, reelno)

        let reellen = this.resultSymbols[reelno].length;
        let symbols = this.symbolsArray[reelno];
        for (let k = reellen - 1; k >= 0; k--) {
            let symb = this.symbolsArray[reelno][k];
            CoreLib.AnimationManager.killTweensOf(symb);
            let cursymb = this.getResultSymbolNumber(reelno);
            symb.swapSymbolTexture(cursymb, this.slotMachine.getSymbolName(cursymb));
            symb.y = (k - 1.75) * (this.slotMachine.configData.data.symbolHeight);
            this.stopIndexes[reelno]--;
        }
        this.showEndJerk(reelno, true);
    }
    stopReelStripQuick (reelno, reelview, isTurbo = false) {
        if (this.stopStarted[reelno]) {
            return;
        }
        this.quickStopStarted = true;
        this.stopIndexes = [];
        for (let k = 0; k < this.slotMachine.configData.data.noOfReels; k++) {
            this.reelsStopped[k] = 2;
            this.stopIndexes.push(reelview.length + 1);
        }
        this.ticker.stop();
        this.stripsArray[reelno].visible = false;
        this.showSymbols(reelno);
        this.resultSymbols[reelno] = [];
        let len = reelview.length;
        for (let k = 0; k < len; k++) {
            this.resultSymbols[reelno].push(reelview[k]);
        }


        this.resultSymbols[reelno].unshift(reelview[reelview.length - 1]);
        this.resultSymbols[reelno].push(reelview[0]);
        this.addBlurToAllSymbols(false, reelno)

        let reellen = this.resultSymbols[reelno].length;
        let symbols = this.symbolsArray[reelno];
        for (let k = reellen - 1; k >= 0; k--) {
            let symb = this.symbolsArray[reelno][k];
            CoreLib.AnimationManager.killTweensOf(symb);
            let cursymb = this.getResultSymbolNumber(reelno);
            symb.swapSymbolTexture(cursymb, this.slotMachine.getSymbolName(cursymb));
            symb.y = (k - 1.75) * (this.slotMachine.configData.data.symbolHeight);
            this.stopIndexes[reelno]--;
        }
        this.showEndJerk(reelno, true);
    }
    stopReelStrip (reelno, reelview, isTurbo = false) {
        if (this.stopStarted[reelno]) {
            return;
        }
        this.stopIndexes = [];
        for (let k = 0; k < this.slotMachine.configData.data.noOfReels; k++) {
            this.reelsStopped[k] = 2;
            this.stopIndexes.push(reelview.length + 1);
        }
        this.ticker.stop();

        this.resultSymbols[reelno] = [];
        let len = reelview.length;
        for (let k = 0; k < len; k++) {
            this.resultSymbols[reelno].push(reelview[k]);
        }

        this.resultSymbols[reelno].unshift(reelview[reelview.length - 1]);
        this.resultSymbols[reelno].push(reelview[0]);


        this.addBlurToAllSymbols(false, reelno)

        this.stripsArray[reelno].visible = false;
        this.showSymbols(reelno);
        let reellen = this.resultSymbols[reelno].length;
        let symbols = this.symbolsArray[reelno];
        for (let k = reellen - 1; k >= 0; k--) {
            let symb = this.symbolsArray[reelno][k];
            let cursymb = this.getResultSymbolNumber(reelno);
            symb.swapSymbolTexture(cursymb, this.slotMachine.getSymbolName(cursymb));
            symb.y = (k - 2) * (this.slotMachine.configData.data.symbolHeight);
            this.stopIndexes[reelno]--;

        }
        this.showEndJerk(reelno, false);
    }
    stopReelStrip1 (reelno, reelview, isTurbo = false) {
        this.isTurbo = isTurbo;
        if (this.stopImmediate) {
            return;
        }
        if (this.spinState === "doNothing") {
            return;
        }
        this.resultSymbols[reelno] = [];
        let len = reelview.length;
        for (let k = 0; k < len; k++) {
            this.resultSymbols[reelno].push(reelview[k]);
        }

        if (reelno == this.slotMachine.configData.data.noOfReels - 1) {
            let len = this.reelsStopped.length;
            for (let k = 0; k < len; k++) {
                if (this.stickyReels && this.stickyReels.indexOf(k) > -1) {
                    //Matrix.EventHandler.dispatchEvent(Matrix.SlotEvents.REELSTRIP_SPIN_COMPLETED, k);
                    this.spinStopIndex++;
                    if (this.spinStopIndex >= this.slotMachine.configData.data.noOfReels) {
                        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.REELSTRIP_SPIN_COMPLETED, reelno);
                    }

                } else {
                    if (isTurbo) {
                        setTimeout(this.callToStopStrip.bind(this, k), k * 5);
                    } else {

                        if (this.slotMachine.checkAnticipation(k) > 1) {
                            this.startAnticipation(k);
                            break;
                        } else {
                            setTimeout(this.callToStopStrip.bind(this, k), k * CoreLib.Util.getDefaultValue(this.slotMachine.configData.data.reelStopGap, 200));
                        }
                    }
                }
            }
        }
    }
    startAnticipation (reelno) {
        for (let k = reelno; k < this.slotMachine.configData.data.noOfReels; k++) {
            this.slotMachine.showAnticipation(k)
        }
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.PLAY_ANTICIPATION_SOUND);
        setTimeout(this.handleAnticiptionStop.bind(this, reelno), CoreLib.Util.getDefaultValue(this.slotMachine.configData.data.anticipationDelay, 3000));


    }
    handleAnticiptionStop (reelno) {
        this.slotMachine.destroyAnticipation(reelno);
        if (reelno == this.slotMachine.configData.data.noOfReels - 1) {
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.STOP_ANTICIPATION_SOUND);
        }
        this.callToStopStrip(reelno);
        if (reelno < this.slotMachine.configData.data.noOfReels - 1) {
            setTimeout(this.handleAnticiptionStop.bind(this, reelno + 1), CoreLib.Util.getDefaultValue(this.slotMachine.configData.data.anticipationDelay));
        }
    }
    callToStopStrip (index) {
        this.slotMachine.doGameSpecificStop(index);
        this.reelsStopped[index] = 2;
    }

    addBlurToAllSymbols (flag, reelno) {
        let len = this.symbolsArray[reelno].length;
        for (let k = 0; k < len; k++) {
            this.symbolsArray[reelno][k].addBlur(flag);
        }
    }


    doReelSpin (delta) {
        let len = this.slotMachine.configData.data.noOfReels;
        for (let k = 0; k < len; k++) {
            if (this.reelsStopped[k] == 1) {
                this.doSpinning(k, delta);
            } else if (this.reelsStopped[k] == 2) {
                this.slowDownReel(k, delta);
            } else if (this.reelsStopped[k] == 3) {
                this.stopReel(k, delta)
            }
        }
    }
    doSpinning (reelno, delta) {
        if (this.speeds[reelno] < this.maxSpeed) {
            this.speeds[reelno] += this.acceleration;
        } else {
            this.speeds[reelno] = this.maxSpeed;
        }
        let symbols = this.symbolsArray[reelno];

        let len2 = symbols.length;
        for (var i = 0; i < len2; i++) {
            symbols[i].y += this.speeds[reelno];// * delta; // * factor;
        }

        let symb = symbols[len2 - 1];

        if (symb.y > this.reelHeight) {
            let symbnumb = this.slotMachine.getNewRandomSymbolNumber();
            symb.swapSymbolTexture(symbnumb, symbnumb);
            symb.y = symbols[0].y - this.slotMachine.configData.data.symbolHeight;
            symbols.splice(len2 - 1, 1);
            symbols.unshift(symb);
        }
    }

    slowDownReel (reelno) {
        if (this.speeds[reelno] > this.minSpeed) {
            this.speeds[reelno] -= this.acceleration;
        } else {
            this.speeds[reelno] = this.minSpeed;
        }

        let symbols = this.symbolsArray[reelno];
        let len2 = symbols.length;
        for (var i = 0; i < len2; i++) {
            symbols[i].y += this.speeds[reelno]; // * factor;
        }
        let symb = symbols[len2 - 1];
        if (symb.y > this.reelHeight) {
            let cursymb = this.slotMachine.getNewRandomSymbolNumber();
            symb.swapSymbolTexture(cursymb, cursymb);
            symb.y = symbols[0].y - this.slotMachine.configData.data.symbolHeight;
            symbols.splice(len2 - 1, 1);
            symbols.unshift(symb);
        }
        if (this.speeds[reelno] <= this.minSpeed) {
            this.addBlurToAllSymbols(false, reelno);
            this.reelsStopped[reelno] = 3;
        }
    }

    stopReel (reelno) {
        if (this.speeds[reelno] > this.minSpeed) {
            this.speeds[reelno] -= this.acceleration;
        } else {
            this.speeds[reelno] = this.minSpeed;
        }

        let symbols = this.symbolsArray[reelno];
        let len2 = symbols.length;
        for (var i = 0; i < len2; i++) {
            symbols[i].y += this.speeds[reelno];
        }
        let symb = symbols[len2 - 1];
        if (symb.y > this.reelHeight) {
            if (this.stopIndexes[reelno] >= 0) {
                let cursymb = this.getResultSymbolNumber(reelno);
                symb.swapSymbolTexture(cursymb, this.slotMachine.getSymbolName(cursymb));
                symb.y = symbols[0].y - this.slotMachine.configData.data.symbolHeight;
                symbols.splice(len2 - 1, 1);
                symbols.unshift(symb);
                this.stopIndexes[reelno]--;
            }
        }
        if (this.stopIndexes[reelno] < 0) {
            let symb = symbols[1];
            if (symb.y > this.endJerkDistance) {
                this.showEndJerk(reelno);
                this.reelsStopped[reelno] = 0;
            }
        }

    }

    forceStopReel (reelno) {
        let customEase = Elastic.easeOut.config(0.88,0.4);
        let duration = 0.25;
        let len = this.symbolsArray[reelno].length;
        for (var k = 0; k < len; k++) {
            if (k === 0) {
                CoreLib.AnimationManager.animateTween(this.symbolsArray[reelno][k],duration, {y : (k - 1) * (this.slotMachine.configData.data.symbolHeight), ease : customEase, onComplete : this.doFinalStop.bind(this, reelno)});
            } else {
                CoreLib.AnimationManager.animateTween(this.symbolsArray[reelno][k], duration, {y: (k - 1) * (this.slotMachine.configData.data.symbolHeight), ease: customEase});
            }
        }
    }

    showEndJerk (reelno, isTurbo) {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.REELSTRIP_SPIN_JERK, reelno);
        if (reelno > this.slotMachine.configData.data.noOfReels - 2) {
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.HIDE_SPINSTOP_BUTTON, reelno);
        }

        this.checkForLanding(reelno);
        let customEase = Elastic.easeOut.config(1.8,0.4);
        if (this.slotMachine.configData.data.customReelStopEase) {
            customEase = this.slotMachine.configData.data.customReelStopEase;
        }
        let duration = 1;
        this.stopStarted[reelno] = true;
        if (this.slotMachine.configData.data.customReelStopDuration) {
            duration = this.slotMachine.configData.data.customReelStopDuration;
        }
        let len = this.symbolsArray[reelno].length;
        if (isTurbo) {
            let customEase = Elastic.easeOut.config(0.88,0.4);
            duration = 0.25;
            for (var k = 0; k < len; k++) {
                if (k === 0) {
                    CoreLib.AnimationManager.animateTween(this.symbolsArray[reelno][k],duration, {y : (k - 1) * (this.slotMachine.configData.data.symbolHeight), ease : customEase, onComplete : this.doFinalStop.bind(this, reelno)});
                } else {
                    CoreLib.AnimationManager.animateTween(this.symbolsArray[reelno][k], duration, {y: (k - 1) * (this.slotMachine.configData.data.symbolHeight), ease: customEase});
                }
            }
        } else {
            duration = 1;
            let customEase = Elastic.easeOut.config(0.88,0.4);
            for (var k = 0; k < len; k++) {
                if (k === 0) {
                    CoreLib.AnimationManager.animateTween(this.symbolsArray[reelno][k],duration, {y : (k - 1) * (this.slotMachine.configData.data.symbolHeight), ease : customEase, onComplete : this.doFinalStop.bind(this, reelno)});
                } else {
                    CoreLib.AnimationManager.animateTween(this.symbolsArray[reelno][k], duration, {y: (k - 1) * (this.slotMachine.configData.data.symbolHeight), ease: customEase});
                }
            }
        }

        setTimeout(this.playReelStopSound.bind(this), 200);


    }
    playReelStopSound () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.PLAY_REELSTOP_SOUND);
    }
    doFinalStop (reelno) {
        //this.destroyAnticipation();
        this.spinStopIndex++;
        this.reelsCompleted[reelno] = true;
        if (this.spinStopIndex >= this.slotMachine.configData.data.noOfReels) {
            this.ticker.stop();
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.REELSTRIP_SPIN_COMPLETED, reelno);
        }
        this.stripsArray[reelno].visible = false;
        this.showSymbols(reelno);
        this.stopImmediate = false;

    }

    checkForLanding (reelno) {
        let landingSymbols = this.slotMachine.configData.data.landingSymbols;
        if (landingSymbols && landingSymbols.length > 0) {
            let len = landingSymbols.length;
            if (len > 0) {
                for (let i = 0; i < len; i++) {
                    for (let k = 1; k < this.totalSymbols - 1; k++) {
                        if (landingSymbols[i] === this.symbolsArray[reelno][k].getSymbolNumber()) {
                            this.showLandingAnimation(this.symbolsArray[reelno][k], (reelno + 1));
                        }
                    }
                }
            }
        }
    }
    showLandingAnimation (symb, reelno) {
        // just added this for new games, as it is event won't affect older games
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.LANDING_SYMBOL_ANIMATION, {reelno: reelno, symbol: symb});
        symb.showLandingAnimation();
    }


    getResultSymbolNumber (reelno) {
        let symb = this.resultSymbols[reelno][this.stopIndexes[reelno]];
        return symb;
    }


    showHideExtraSymbols (flag) {
        return;
        // if (flag) {
        //     let len = this.symbolsArray.length;
        //     for (let k = 0; k < len; k++) {
        //         let len2 = this.symbolsArray[k].length;
        //         for (let i = 0; i < len2; i++) {
        //             this.symbolsArray[k][i].visible = true;
        //         }
        //
        //     }
        // } else {
        //     let len = this.symbolsArray.length;
        //     for (let k = 0; k < len; k++) {
        //         this.symbolsArray[k][0].visible = false;
        //         this.symbolsArray[k][this.symbolsArray[k].length - 1].visible = false;
        //
        //     }
        // }

    }

}

export const spinControllerRC = new SpinControllerReelSizeChange();
