import {LibContainer} from "../../pixiwrapper/LibContainer";
import {CoreLib} from "../../core/CoreLib";
import {ReelSlotSymbol} from "./ReelSlotSymbol";
import {slotModel} from "../../models/SlotModel";
import { soundFactory } from '../../sound/SoundFactory'
import { ReelSlotSpinningSymbol } from './ReelSlotSpinningSymbol'

export class SlotMachineV1 extends LibContainer {
    constructor(config) {
        super(config);
        this.maskRect = this.elementsList["maskRect"];
        this.coverRect = this.elementsList["coverRect"];
        this.paylinesComp = this.elementsList["paylinesComp"];

        if (this.coverRect) {
            this.coverRect.width = 100000;
            this.coverRect.height = 100000;
            this.coverRect.x = -2000;
            this.coverRect.y = -2000;
        }


        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SET_SPIN_CONTROLLER, this.setSpinController.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SET_WIN_CONTROLLER, this.setWinController.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.START_SLOT_SPIN, this.startSlotSpin.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.START_STOPPING_REELS, this.startStoppingReels.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.STOP_SPIN_IMMEDIATELY, this.stopReelsImmediately.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.STOP_SPIN_FOR_ERROR, this.stopSpinForError.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.REELSTRIP_SPIN_STARTED, this.onReelStripStarted.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.REELSTRIP_SPIN_JERK, this.onReelStripSpinJerk.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.REELSTRIP_SPIN_COMPLETED, this.onReelStripSpinCompleted.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.REPLACE_REEL_SYMBOLS, this.replaceReelSymbols.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.REPLACE_REEL_SYMBOLS_FOR_REEL, this.replaceReelSymbolsForReel.bind(this));
        //CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.REPLACE_REEL_WITH_SYMBOLS, this.replaceReelSymbols.bind(this));

        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SHOW_PAYLINE, this.showPayline.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.HIDE_PAYLINE, this.hidePayline.bind(this));

        this.createSymbols();
        this.createAnticipations();
        if (this.maskRect && this.symbolsContainer) {
            this.addChild(this.maskRect);
            this.symbolsContainer.mask = this.maskRect;
            if (this.configData.disableMask) {
                this.disableMask();
            }
        }


    }
    showPayline () {
        if (this.coverRect) {
            this.coverRect.visible = true;
        }
    }
    hidePayline (num) {
        if (this.coverRect) {
            this.coverRect.visible = false;
        }
    }

    createAnticipations () {
        if (this.configData.anticipationConfig) {
            this.anticipationMoviesArray = [];
            this.anticipationContainer = CoreLib.UIUtil.getContainer();
            this.anticipationContainer.name = "AnticipationCont";
            this.addChild(this.anticipationContainer);
            let len = this.configData.anticipationConfig.totalElements;
            for (let k = 0; k < len; k++) {
                let element = CoreLib.UIUtil.getElement(this.configData.anticipationConfig.element);
                element.x = this.configData.anticipationConfig.positions[k].x;
                element.y = this.configData.anticipationConfig.positions[k].y;
                this.anticipationContainer.addChild(element);
                if(this.configData.anticipationConfig.element.type == "Spine") {
                    element.stopAnimation();
                }else{
                    element.stopAnimation();
                }
                element.visible = false;
                this.anticipationMoviesArray.push(element);
            }
        }

        this.stripsArray = [];
        this.stripsSymbolsArray = [];
        for (let i = 0; i < 5; i++) {
            this.stripsSymbolsArray[i] = [];
            let strip1 = CoreLib.UIUtil.getContainer();
            this.symbolsContainer.addChild(strip1);
            let len = 50;
            let symb;
            for (let k = 0; k < len; k++) {
                symb = CoreLib.UIUtil.getSprite(this.getNewRandomSymbolNumber() + "_blur");
                symb.y = k * this.configData.data.symbolHeight;
                symb.anchor.set(0.5,0.5);
                strip1.addChild(symb);
                this.stripsSymbolsArray[i].push(symb);
            }
            strip1.x = this.configData.data.reelPositionX[i];
            strip1.y = -strip1.height + ( 5 * this.configData.data.symbolHeight);

            this.stripsArray.push(strip1);
            strip1.visible = false;



        }


    }
    onDone () {

    }

    showAnticipation (reelno) {
        if (this.dontShowAnticipation) {
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.STOP_ANTICIPATION_SOUND);
            return;
        }
        if (!this.maingameSoundStopped) {
            let obj;
            if (slotModel.getIsFreespinSession()) {
                obj = { name : "freespinBGMusic"};
            } else {
                obj = { name : "maingameBGMusic"};
            }
            if (obj) {
                soundFactory.stopSound(obj);
                this.maingameSoundStopped = true;
            }

        }


        this.anticipationStarted = true;
        this.anticipationMoviesArray[reelno].visible = true;
        if(this.configData.anticipationConfig.element.type == "Spine") {
            this.anticipationMoviesArray[reelno].playAnimation("animation", true);
        }else {
            this.anticipationMoviesArray[reelno].gotoAndPlay(0);
        }
    }
    destroyAnticipation (reelno) {
        CoreLib.AnimationManager.animateTween(this.anticipationMoviesArray[reelno], 0.5, {alpha : 0, onComplete : this.hideAnticipationStrip.bind(this, reelno)});

    }
    hideAnticipationStrip (reelno) {
        if (this.configData.anticipationConfig) {
            if(this.configData.anticipationConfig.element.type == "Spine") {
                this.anticipationMoviesArray[reelno].stopAnimation();
            }else {
                this.anticipationMoviesArray[reelno].gotoAndStop(0);
            }
            this.anticipationMoviesArray[reelno].visible = false;
            this.anticipationMoviesArray[reelno].alpha = 1;
            if (reelno == this.configData.data.noOfReels - 1) {
                CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.STOP_ANTICIPATION_SOUND);
            }
        }

    }

    getReelSymbol (val) {
        if (val == undefined) {
            let index = 0;
            let target = CoreLib.Util.getRandomRange(1,8)
            for (let p in this.configData.data.symbolsData) {
                if (index == target) {
                    val = p;
                }
                index++;
            }
        }
        let symbname = this.getSymbolName(val);
        if (this.configData.symbolClass != undefined) {
            // to do dynamically instantiate the class
            let symbHeight = this.configData.data.symbolHeight;
            let symbolGap = this.configData.data.symbolGap;
            let totalht = symbHeight + symbolGap;
            return new ReelSlotSpinningSymbol(val, symbname, this.configData.data.symbolsData, this.configData.wildFrameAnim, totalht);
        } else {
            return new ReelSlotSymbol(val, symbname);
        }

    }
    getSymbolName (val) {
        return this.configData.data.symbolsData[val].name;
    }
    createSymbols () {
        this.symbolsContainer = CoreLib.UIUtil.getContainer();
        this.symbolsContainer.x = this.configData.data.reelContainerPos.x;
        this.symbolsContainer.y = this.configData.data.reelContainerPos.y;
        this.addChild(this.symbolsContainer);
        this.symbolsContainer.name = "SymbolsCont";

        if (this.coverRect) {
            this.addChild(this.coverRect);
            this.coverRect.visible = false;
        }
        if (this.paylinesComp) {
            this.addChild(this.paylinesComp);
        }

        this.winFrameContainer = CoreLib.UIUtil.getContainer();
        this.winFrameContainer.x = this.configData.data.reelContainerPos.x;
        this.winFrameContainer.y = this.configData.data.reelContainerPos.y;
        this.addChild(this.winFrameContainer);
        this.winFrameContainer.name = "winFrameCont";


        CoreLib.Model.GameConfig.defaultReels = this.configData.data.reelsView;
        let reellen = this.configData.data.noOfReels;
        let rowlen = this.configData.data.noOfRows;
        let reelsview = slotModel.getReelsView() ? slotModel.getReelsView() : this.configData.data.reelsView;
        let xPos = this.configData.data.reelPositionX;
        let symbHeight = this.configData.data.symbolHeight;
        let symbolGap = this.configData.data.symbolGap;
        let index = 0;
        this.symbolsArray = [];
        CoreLib.Model.GameConfig.symbolHeight = this.configData.data.symbolHeight;
        CoreLib.Model.GameConfig.symbolsData = this.configData.data.symbolsData;
        CoreLib.Model.GameConfig.symbolWinFrame = this.configData.data.winFrame;
        CoreLib.Model.GameConfig.symbolPositions = [];
        CoreLib.Model.GameConfig.symbolPositionsForReel = [];
        let totalSymbols = 0;
        for (let k = 0; k < reellen; k++) {
            let flag = false;
            for (let i = 0; i < rowlen + 2; i++) {
                let symbnum = (i == 0 || i == rowlen + 1) ? undefined : reelsview[k][i - 1];
                var symb = this.getReelSymbol(symbnum);
                totalSymbols++;
                CoreLib.UIUtil.setPositionX(symb, xPos[k]);
                CoreLib.UIUtil.setPositionY(symb, (i - 1) * (symbHeight + symbolGap), false);
                this.symbolsContainer.addChild(symb);
                if (!CoreLib.Model.GameConfig.symbolPositions[k]) {
                    CoreLib.Model.GameConfig.symbolPositions[k] = [];
                }
                if (!CoreLib.Model.GameConfig.symbolPositionsForReel[k]) {
                    CoreLib.Model.GameConfig.symbolPositionsForReel[k] = [];
                }
                CoreLib.Model.GameConfig.symbolPositions[k][i] = {x: this.symbolsContainer.x + symb.x, y: this.symbolsContainer.y + symb.y};
                CoreLib.Model.GameConfig.symbolPositionsForReel[k][i] = {x: symb.x, y: symb.y};
                if (!this.symbolsArray[index]) {
                    this.symbolsArray[index] = [];
                }
                this.symbolsArray[index].push(symb);
                flag = true;
            }
            if (flag) {
                index++
            }

        }
        // if (CoreLib.Model.GameConfig.hideExtraSymbols) {
        //     let len = this.symbolsArray.length;
        //     for (let k = 0; k < len; k++) {
        //         let len2 = this.symbolsArray[k].length;
        //         for (let i = 0; i < len2; i++) {
        //             if (i == 0 || i == len2 - 1) {
        //                 this.symbolsArray[k][i].visible = false;
        //                 this.symbolsArray[k][i].renderable = false;
        //             }
        //         }
        //     }
        // }

    }

    replaceReelSymbolsForReel (obj) {
        let len2 = this.symbolsArray[obj.reelNumber].length;
        for (let i = 0; i < len2; i++) {
            this.symbolsArray[obj.reelNumber][i].visible = true;
            let symb = obj.symbols[i];
            this.symbolsArray[obj.reelNumber][i].swapSymbolTexture(symb, symb);
        }
    }
    replaceReelSymbols (symb) {
        let len = this.symbolsArray.length;
        for (let k = 0; k < len; k++) {
            let len2 = this.symbolsArray[k].length;
            for (let i = 0; i < len2; i++) {
                this.symbolsArray[k][i].visible = true;
                this.symbolsArray[k][i].swapSymbolTexture(symb, symb);
            }
        }
    }

    setSpinController (controller) {
        this.spinController = controller;
        this.spinController.setSlotInstance(this);
        this.spinController.symbolsArray = this.symbolsArray;
        this.spinController.stripsArray = this.stripsArray;
        this.spinController.stripsSymbolsArray = this.stripsSymbolsArray;
        this.spinController.configData = this.configData;
    }
    setWinController (controller) {
        this.winController = controller;
        this.winController.symbolsArray = this.symbolsArray;
        this.winController.configData = this.configData;
        this.winController.stage = this;


    }
    enableMask () {
        if (this.maskRect) {
            this.maskRect.visible = true;
            this.symbolsContainer.mask = this.maskRect;
        }

    }
    disableMask () {
        // if (this.configData.disableMask) {
        //     if (this.maskRect) {
        //         this.maskRect.visible = false;
        //         this.symbolsContainer.mask = null;
        //     }
        //
        // }

    }
    startSlotSpin () {
        this.enableMask();
        this.dontShowAnticipation = false;
        this.isSpinning = true;
        this.anticipationStarted = false;
        this.maingameSoundStopped = false;
        this.maingameSoundStarted = false;
        this.spinStartIndex = 0;
        this.gameResultReceived = false;
        this.allReelsSpinStarted = false;
        this.reelStopIndex = 0;
        this.spinController.startAllSpin();
        for (let k = 0; k < this.configData.data.noOfReels; k++) {
            this.startReelStripSpin(k);
            this.reelStartIndex++;
        }
    }
    startReelStripSpin (index) {
        this.spinController.startReelStripSpin(index);
    }
    onReelStripStarted () {
        this.spinStartIndex++;
        if (this.spinStartIndex == this.configData.data.noOfReels) {
            this.allReelsSpinStarted = true;
            this.checkToStopSpin();
        }
    }
    onReelStripSpinJerk (reelno) {
        this.hideAnticipationStrip(reelno);
    }
    onReelStripSpinCompleted (reelno) {
        if (this.anticipationStarted) {
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.STOP_ANTICIPATION_SOUND);
            let obj;
            if (!this.maingameSoundStarted) {
                if (slotModel.getIsFreespinSession()) {
                    obj = { name : "freespinBGMusic"};
                } else {
                    obj = { name : "maingameBGMusic"};
                }
                soundFactory.playSound(obj);
                this.maingameSoundStarted = true;
            }
        }
        this.disableMask();
        for (let k = 0; k < this.configData.data.noOfReels; k++) {
            this.hideAnticipationStrip(k);
        }
        this.dontShowAnticipation = true;
        this.sendReelCompleteNotification();

        //this.showFinalReelSymbols();
        this.isSpinning = false;
    }
    sendReelCompleteNotification () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.REELSPIN_COMPLETED);
        this.doGameSpecificStop();
    }
    doGameSpecificStop() {

    }
    startStoppingReels () {
        if (this.gameResultReceived) {
            // already stopping from immediate
            return;
        }
        if (CoreLib.Model.GameConfig.isTurboOn) {
            this.stopReelsImmediately();
            return;
        }
        this.gameResultReceived = true;
        this.isQuickStop = false;
        this.createScatterAnticipationArray();
        this.checkToStopSpin();
    }
    stopReelsImmediately () {
        this.gameResultReceived = true;
        this.isQuickStop = true;
        if (CoreLib.Model.GameConfig.notNormalQuickStop) {

        } else {
            this.allReelsSpinStarted = true;
        }

        this.checkToStopQuickSpin();
    }
    stopSpinForError () {
        if (this.isSpinning) {
            let reelsview = slotModel.getReelsView() ? slotModel.getReelsView() : this.configData.data.reelsView;
            this.reelStopIndex = 0;
            for (let k = 0; k < this.configData.data.noOfReels; k++) {
                let reel = reelsview[this.reelStopIndex];
                this.stopReelStripQuick(this.reelStopIndex, reel, 0);
                this.reelStopIndex++;
                if (this.stopStripTimerIds && this.stopStripTimerIds[k]) {
                    clearTimeout(this.stopStripTimerIds[k]);
                }
            }
            clearTimeout(this.antiTimerId);
        }

    }
    checkToStopQuickSpin () {
        if (this.allReelsSpinStarted && this.gameResultReceived) {
            this.reelStopIndex = 0;
            for (let k = 0; k < this.configData.data.noOfReels; k++) {
                let reel = CoreLib.gameUtil.getReelView(this.reelStopIndex);
                this.stopReelStripQuickOnPress(this.reelStopIndex, reel, 0);
                this.reelStopIndex++;
                if (this.stopStripTimerIds && this.stopStripTimerIds[k]) {
                    clearTimeout(this.stopStripTimerIds[k]);
                }
            }
            clearTimeout(this.antiTimerId);
        }
    }
    checkToStopSpin () {
        if (this.allReelsSpinStarted && this.gameResultReceived) {
            if (this.isQuickStop && CoreLib.Model.GameConfig.notNormalQuickStop) {
                this.checkToStopQuickSpin();
            } else {
                this.stopSpinNow();
            }

        }
    }
    stopSpinNow () {
        this.isAnticipationShown = false;
        let delay = 200;
        let anti = false;
        this.stopStripTimerIds = [];
        for (let k = 0; k < this.configData.data.noOfReels; k++) {
            let reel = CoreLib.gameUtil.getReelView(this.reelStopIndex);
            if (this.checkAnticipation(k) > 1) {
                delay += 2000;
                anti = true;
            } else {
                anti = false;
                delay += 200;
            }
            if (anti) {
                this.antiTimerId = setTimeout(this.startShowingAnticipation.bind(this, k), k * 200);
            }
            this.stopStripTimerIds[k] = setTimeout(this.stopReelStrip.bind(this, this.reelStopIndex, reel), delay);
            this.reelStopIndex++;
        }
    }
    startShowingAnticipation (reelno) {
        if (!this.isAnticipationShown) {
            this.isAnticipationShown = true;
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.PLAY_ANTICIPATION_SOUND);
            for (let k = reelno; k < this.configData.data.noOfReels; k++) {
                this.showAnticipation(k);
            }
        }
    }
    stopReelStrip (reelno, reelview) {
        this.spinController.stopReelStrip(reelno, reelview, false, this.stickyReels);
    }
    stopReelStripQuick (reelno, reelview, delay = 0) {
        //this.createScatterAnticipationArray();
        setTimeout(this.callToStopQuickSpin.bind(this, reelno, reelview), delay)
    }
    stopReelStripQuickOnPress(reelno, reelview, delay = 0) {
        this.spinController.stopReelStripQuickForPress(reelno, reelview);
    }
    callToStopQuickSpin (reelno, reelview) {
        this.spinController.stopReelStripQuick(reelno, reelview);
    }
    checkAnticipation (reelno) {
        if (CoreLib.Model.GameConfig.isTurboOn || this.configData.anticipationConfig == null) {
            return 0;
        }
        if (this.scatterAnticipArray && this.scatterAnticipArray[reelno] != undefined) {
            return this.scatterAnticipArray[reelno];
        } else {
            return 0;
        }


    }
    createScatterAnticipationArray () {
        this.scatterAnticipArray = [];
        let len = slotModel.getReelsView().length;
        let totalScatters = 0;
        this.scatterAnticipArray[0] = [0];
        for (let k = 1; k < len; k++) {
            this.scatterAnticipArray[k] = [];
            let reel = slotModel.getReelsView()[k - 1];
            if (reel) {
                let symbLen = reel.length;
                let scattersLen = this.configData.data.anticipationSymbols.length;
                if (scattersLen) {
                    for (let p = 0; p < scattersLen; p++) {
                        for (let i = 0; i < symbLen; i++) {
                            let landinglen = this.configData.data.anticipationSymbols.length;
                            if (landinglen) {
                                for (let j = 0; j < landinglen; j++) {
                                    if (reel[i] === this.configData.data.anticipationSymbols[j]) {
                                        totalScatters++;
                                    }
                                }
                            }
                        }
                        this.scatterAnticipArray[k].push(totalScatters);

                    }
                }
            }
        }
    }
    doGameSpecificStop (reelno) {

    }


    enterSpinWinState () {
        this.winController.showSpinWin();
    }
    onAllWinSymbolDone () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.EXIT_SPINWIN_SYMBOL);
    }
    changeCustomSymbolDepth () {

    }

    clearSpinAllWin () {
        this.winController.cleanUp();
    }
    clearTriggeringWin () {
        this.winController.clearTriggeringWin();
    }

    showLineWin () {
        this.winController.showLineWin()
    }
    onLineWinDone () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.EXIT_LINE_WIN);
    }
    showBonusTriggerAnim () {
        this.winController.showBonusTriggerAnim();
    }
    showCustomBonusTriggerAnim (positions) {
        this.winController.showCustomBonusTriggerAnim(positions);
    }
    showCustomTriggerAnim (positions) {
        //this.winController.showCustomTriggerAnim(positions);
    }

    getNewRandomSymbolNumber () {
        let obj = CoreLib.Util.pickRandomProperty(this.configData.data.symbolsData);
        return obj.name;
    }

    onResizeEndEvent () {
        super.onResizeEndEvent();
        if (this.coverRect) {
            this.coverRect.width = 100000;
            this.coverRect.height = 100000;
            this.coverRect.x = -3000;
            this.coverRect.y = -3000;
        }
    }

}
