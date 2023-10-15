import {CoreLib} from "../../core/CoreLib";
import { slotModel } from '../../models/SlotModel'

class SpinControllerSpinningSymbol {
    constructor() {
        this.symbolsArray = [];
        this.stripsArray = [];
        this.stripsSymbolsArray = [];



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
        this.stopIndexes = [0,0,0,0,0,0,0,0];

        CoreLib.EventHandler.addEventListener("SPINNING_SYMBOL_STOPPED", this.onSpinningSymbolStopped.bind(this));
    }

    startAllSpin (sticky) {
        this.stopQuickReels = [false, false, false, false, false];
        this.stickyReels = sticky;
        this.spinningReels = [];
        this.stoppingReels = [];
        this.reelStopDelay = 0;
        let len = this.symbolsArray.length;
        for (let k = 0; k < len; k++) {
            this.stoppingReels[k] = 0;
        }
        let symbslen = this.symbolsArray[0].length - 1;
        this.stopIndexes = [];
        this.speeds = [];
        this.reelsStopped = [];
        this.stopStarted = [];
        for (let k = 0; k < this.slotMachine.configData.data.noOfReels; k++) {
            this.stopIndexes.push(symbslen);
            this.reelsStopped.push(0);
            this.speeds.push(0);
            this.stopStarted[k] = false;
        }

        this.showHideExtraSymbols(true);
        this.lastFrameTime = new Date().getTime();
        this.spinState = "spinning";
        this.resultSymbols = [];
        this.spinStopIndex = 0;
        this.quickStopStarted = false;


    }
    hideSymbols (index) {
        let len = this.symbolsArray[index].length;
        for (let k = 0; k < len; k++) {
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
        setTimeout(this.notifyStart.bind(this, index), index * CoreLib.Util.getDefaultValue(this.slotMachine.configData.data.reelStartGap, 100));
    }
    notifyStart (index) {
        if (this.quickStopStarted) {
            return;
        }
        if (this.stickyReels && this.stickyReels.indexOf(index) > -1) {

        } else {
            let len = this.symbolsArray[index].length;
            for (let k = 0; k < len; k++) {
                this.symbolsArray[index][k].startSpin();
            }

        }
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.REELSTRIP_SPIN_STARTED);

    }
    onSpinningSymbolStopped (reelno) {
        this.stoppingReels[reelno] += 1;
        if (this.stoppingReels[reelno] == this.symbolsArray[reelno].length - 1) {
            this.showEndJerk(reelno);
        }
    }
    stopReelStripQuick (reelno, reelview, isTurbo = false) {
        if (slotModel.getIsFreespinSession()) {
            this.stopReelStrip(reelno, reelview, false);
            return;
        }
        this.quickStopStarted = true;
        this.stopQuickReels[reelno] = true;
        this.resultSymbols[reelno] = [];
        let len = reelview.length;
        for (let k = 0; k < len; k++) {
            this.resultSymbols[reelno].push(reelview[k]);
        }
        this.resultSymbols[reelno].unshift(reelview[reelview.length - 1]);
        this.resultSymbols[reelno].push(reelview[0]);
        this.totalSymbols = this.resultSymbols[0].length;
        let len1 = this.symbolsArray[reelno].length;
        let totalTime = 0;
        this.reelStopDelay = 0;
        for (let k = 0; k < len1; k++) {
            totalTime = this.reelStopDelay;
            if (slotModel.getIsFreespinSession()) {
                if (CoreLib.Model.GameConfig.godExpandedReels.indexOf(reelno) > -1) {
                    if (k == 0) {
                        CoreLib.EventHandler.dispatchEvent("PLAY_FS_WILD_EXPANSION_SOUND");
                    }
                    this.symbolsArray[reelno][k].stopReelSpinForWild(this.resultSymbols[reelno][k], this.slotMachine.getSymbolName(this.resultSymbols[reelno][k]), totalTime, reelno, k, true)
                } else {
                    this.symbolsArray[reelno][k].stopReelSpin(this.resultSymbols[reelno][k], this.slotMachine.getSymbolName(this.resultSymbols[reelno][k]), totalTime, reelno, k, true)
                }
            } else {
                this.symbolsArray[reelno][k].stopReelSpin(this.resultSymbols[reelno][k], this.slotMachine.getSymbolName(this.resultSymbols[reelno][k]), 0, reelno, k, true)

            }

            if (k == 0 || k == len1 - 1) {

            } else {
                this.reelStopDelay += 150;
            }
        }



    }
    stopReelStrip (reelno, reelview, isTurbo = false) {
        if (this.stopQuickReels[reelno]) {
            return;
        }
        this.resultSymbols[reelno] = [];
        let len = reelview.length;
        for (let k = 0; k < len; k++) {
            this.resultSymbols[reelno].push(reelview[k]);
        }
        this.resultSymbols[reelno].unshift(reelview[reelview.length - 1]);
        this.resultSymbols[reelno].push(reelview[0]);
        this.totalSymbols = this.resultSymbols[0].length;
        let len1 = this.symbolsArray[reelno].length;
        let totalTime = 0;
        for (let k = 0; k < len1; k++) {
            totalTime = this.reelStopDelay;
            if (slotModel.getIsFreespinSession()) {
                if (CoreLib.Model.GameConfig.godExpandedReels.indexOf(reelno) > -1) {
                    if (k == 0) {
                        CoreLib.EventHandler.dispatchEvent("PLAY_FS_WILD_EXPANSION_SOUND");
                    }
                    this.symbolsArray[reelno][k].stopReelSpinForWild(this.resultSymbols[reelno][k], this.slotMachine.getSymbolName(this.resultSymbols[reelno][k]), totalTime, reelno, k, isTurbo)
                } else {
                    this.symbolsArray[reelno][k].stopReelSpin(this.resultSymbols[reelno][k], this.slotMachine.getSymbolName(this.resultSymbols[reelno][k]), totalTime, reelno, k, isTurbo)
                }
            } else {
                this.symbolsArray[reelno][k].stopReelSpin(this.resultSymbols[reelno][k], this.slotMachine.getSymbolName(this.resultSymbols[reelno][k]), totalTime, reelno, k, isTurbo)
            }
            if (k == 0) {
            } else if (k == len1 - 1) {
                this.reelStopDelay += 100;
            } else {
                if (isTurbo) {
                    this.reelStopDelay += 25;
                } else {
                    this.reelStopDelay += 100;
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





    showEndJerk (reelno, isTurbo) {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.REELSTRIP_SPIN_JERK, reelno);
        if (reelno > this.slotMachine.configData.data.noOfReels - 2) {
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.HIDE_SPINSTOP_BUTTON, reelno);
        }
        this.checkForLanding(reelno);
        if (slotModel.getIsFreespinSession()) {
            if (CoreLib.Model.GameConfig.godExpandedReels.indexOf(reelno) > -1) {

            } else {
                this.playReelStopSound();
            }
        } else {
            this.playReelStopSound();
        }


        //setTimeout(this.doFinalStop.bind(this, reelno), 500);
        CoreLib.AnimationManager.animateTween(this,0.5, {alpha : 1, onComplete : this.doFinalStop.bind(this, reelno)}, false);


        this.stopStarted[reelno] = true;
        this.showHideExtraSymbols(false);
    }
    playReelStopSound () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.PLAY_REELSTOP_SOUND);
    }
    doFinalStop (reelno) {
        //this.destroyAnticipation();
        this.spinStopIndex++;
        if (this.spinStopIndex >= this.slotMachine.configData.data.noOfReels) {
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.REELSTRIP_SPIN_COMPLETED, reelno);

        }
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
                            this.showLandingAnimation(this.symbolsArray[reelno][k]);
                        }
                    }
                }
            }
        }

    }
    showLandingAnimation (symb) {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.LANDING_SYMBOL_ANIMATION);
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

export const spinControllerSpinning = new SpinControllerSpinningSymbol();
