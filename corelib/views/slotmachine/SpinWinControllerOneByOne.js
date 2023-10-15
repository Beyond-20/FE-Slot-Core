import {slotModel} from "../../models/SlotModel";
import {CoreLib} from "../../core/CoreLib";
import { soundFactory } from '../../sound/SoundFactory'
import { ReelSlotSymbol } from './ReelSlotSymbol'

class SpinWinControllerOneByOne {
    constructor() {
        this.symbolsArray = [];
        this.stage = null;
        this.winIndex = 0;
        this.reelPositionMap = [
            {"reel": 0,"row": 0},
            {"reel": 1,"row": 0},
            {"reel": 2,"row": 0},
            {"reel": 3,"row": 0},
            {"reel": 4,"row": 0},
            {"reel": 0,"row": 1},
            {"reel": 1,"row": 1},
            {"reel": 2,"row": 1},
            {"reel": 3,"row": 1},
            {"reel": 4,"row": 1},
            {"reel": 0,"row": 2},
            {"reel": 1,"row": 2},
            {"reel": 2,"row": 2},
            {"reel": 3,"row": 2},
            {"reel": 4,"row": 2},
        ]
        this.bgMusicFaded = false;
        this.isCreated = false;
    }

    initiate () {

    }

    showSpinWin () {
        this.bgMusicFaded = false;
        if (!this.isCreated) {
            CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.CLEAR_ALL_WIN, this.exitSpinWinState.bind(this));
            this.isCreated = true;
        }
        this.cleanUp();
        this.winHighlightIndex = 0;
        this.winningSymbolsArray = [];
        this.winningPosFilledArray = [];
        let winlines = slotModel.getWinLines();
        if (slotModel.getSlotGameResult().nextFeature == "freespins" && slotModel.getFeatureTriggerPositions() != undefined) {
            let data = {lineNumber : 0, winningPosition : slotModel.getFeatureTriggerPositions()};
            winlines.push(data);
        }
        let level = slotModel.getWinLevel();

        let symbol;
        if (winlines && winlines.length > 0) {
            this.showAllSymbolsFaded(true);
            let len = winlines.length;

            let symbindex = 0;
            if (len > 0) {
                let index = 0;
                //if (level == 0) {
                    this.winIntervalIds = [];
                    for (let k = 0; k < len; k++) {
                        let obj = winlines[k];
                        let lineWin = this.convertPosition(obj.winningPosition);
                        let posLen = lineWin.length;
                        this.showPaylinesAnimation(obj.lineNumber);
                        if (posLen > 0) {
                            for (let i = 0; i < posLen; i++) {
                                if (this.winningPosFilledArray[lineWin[i].reel] && this.winningPosFilledArray[lineWin[i].reel][lineWin[i].row + 1] == 1) {
                                    continue;
                                }
                                if (!this.winningPosFilledArray[lineWin[i].reel]) {
                                    this.winningPosFilledArray[lineWin[i].reel] = [];
                                }
                                this.winningPosFilledArray[lineWin[i].reel][lineWin[i].row + 1] = 1;
                                symbol = this.symbolsArray[lineWin[i].reel][lineWin[i].row + 1].getSymbolNumber();
                                this.showSymbolLineWin(lineWin[i].reel, lineWin[i].row + 1, lineWin[i].symbol, this.stage.configData.data.showFrameForAllWin, true, index++ * 200 );
                                this.winningSymbolsArray.push(this.symbolsArray[lineWin[i].reel][lineWin[i].row + 1]);


                            }
                        }
                    }
                //}


                if (slotModel.getSlotGameResult().megaStackPrize != undefined && slotModel.getSlotGameResult().megaStackPrize > 0) {
                    let index = this.getWinningSoundIndex(symbol);
                    let sobj = CoreLib.Model.GameConfig.allofakindSounds[symbol];
                    this.aokSound = soundFactory.playSound(sobj);
                    this.aokSound.on('end', this.onAOKSoundComplete.bind(this));
                } else {
                    if (CoreLib.Model.GameConfig.isTurboOn) {
                        this.allwinId = setTimeout(this.sendAllWinCompleteNotificiation.bind(this), CoreLib.Util.getDefaultValue(CoreLib.Model.GameConfig.allWinDuration, 1200));
                    } else {
                        if (slotModel.getWinLevel() > 0) {
                            this.allwinId = setTimeout(this.sendAllWinCompleteNotificiation.bind(this), CoreLib.Util.getDefaultValue(CoreLib.Model.GameConfig.allWinDuration, 4500));
                        } else {
                            this.allwinId = setTimeout(this.sendAllWinCompleteNotificiation.bind(this), CoreLib.Util.getDefaultValue(CoreLib.Model.GameConfig.allWinDuration, 2400));
                        }

                    }
                    if (slotModel.getWinLevel() > 0) {
                        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.FADEOUT_BG_MUSIC, this.fadeOutBGMusic.bind(this));
                    } else {
                        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.PLAY_ALL_WIN_SOUND);
                    }
                }
            }
        } else {
            if (slotModel.getSlotGameResult().megaStackPrize != undefined && slotModel.getSlotGameResult().megaStackPrize > 0) {
                symbol = slotModel.getReelsView()[0][0];
                let index = this.getWinningSoundIndex(symbol);
                let sobj = CoreLib.Model.GameConfig.allofakindSounds[symbol];
                this.aokSound = soundFactory.playSound(sobj);
                this.aokSound.on('end', this.onAOKSoundComplete.bind(this));

                let len1 = 5;
                let len2 = 3;
                if (level == 0) {
                    for (let k = 0; k < len1; k++) {
                        for (let i = 0; i < len2; i++) {
                            symbol = this.symbolsArray[k][i].getSymbolNumber();
                            this.showSymbolLineWin(k, i, "WDF", true, true);
                            this.winningSymbolsArray.push(this.symbolsArray[k][i]);
                        }
                    }
                }
            }
        }
    }
    onAOKSoundComplete () {
        CoreLib.EventHandler.dispatchEvent("ON_WIN_SPECIAL_SOUND_COMPLETED");
        if (slotModel.getWinLevel() > 0) {
            CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.FADEOUT_BG_MUSIC, this.fadeOutBGMusic.bind(this));
        } else {
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.PLAY_ALL_WIN_SOUND);
        }
        if (CoreLib.Model.GameConfig.isTurboOn) {
            this.allwinId = setTimeout(this.sendAllWinCompleteNotificiation.bind(this), CoreLib.Util.getDefaultValue(CoreLib.Model.GameConfig.allWinDuration, 1200));
        } else {
            if (slotModel.getWinLevel() > 0) {
                this.allwinId = setTimeout(this.sendAllWinCompleteNotificiation.bind(this), CoreLib.Util.getDefaultValue(CoreLib.Model.GameConfig.allWinDuration, 4500));
            } else {
                this.allwinId = setTimeout(this.sendAllWinCompleteNotificiation.bind(this), CoreLib.Util.getDefaultValue(CoreLib.Model.GameConfig.allWinDuration, 2400));
            }

        }
    }
    fadeOutBGMusic () {
        this.bgMusicFaded = true;
        if (slotModel.getIsFreespinSession()) {
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.STOP_FREESPIN_BG_MUSIC);
        } else {
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.STOP_MAINGAME_BG_MUSIC);
        }
        //setTimeout(this.restartBGMusic.bind(this), 4500);
    }
    exitSpinWinState () {
        if (this.bgMusicFaded) {
            this.restartBGMusic();
            this.bgMusicFaded = false;
        }

    }
    restartBGMusic () {
        if (slotModel.getIsFreespinSession()) {
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.START_FREESPIN_BG_MUSIC);
        } else {
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.START_MAINGAME_BG_MUSIC);
        }
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.STOP_ALL_WIN_SOUND_BIGWIN);
    }
    showAllSymbolsFaded (flag) {
        let len = this.symbolsArray.length;
        for (let k = 0; k < len; k++) {
            let len2 = this.symbolsArray[k].length;
            for (let i = 0; i < len2; i++) {
                this.symbolsArray[k][i].showFaded(flag);
            }
        }
    }

    sendAllWinCompleteNotificiation () {
        this.stage.onAllWinSymbolDone();
    }

    showSymbolLineWin (reel, row, symbol, showFrame = false, isAllWin = false, delay = 200) {
        this.lineWinIds.push(setTimeout(this.showSymbolLineWinNow.bind(this, reel, row, symbol, showFrame, isAllWin), delay));

    }
    showSymbolLineWinNow (reel, row, symbol, showFrame = false, isAllWin = false) {
        this.stage.winFrameContainer.addChild(this.symbolsArray[reel][row]);
        let winFrame = this.configData.data.winFrame;
        this.symbolsArray[reel][row].showSymbolWin(symbol, showFrame, isAllWin, winFrame);
        this.stage.changeCustomSymbolDepth();
    }
    showLineWin () {
        this.cleanUp();
        this.winHighlightIndex = 0;
        this.winningSymbolsArray = [];
        this.winningPosFilledArray = [];
        let winlines = slotModel.getWinLines();
        if (winlines && winlines.length > 0) {
            let obj = winlines[CoreLib.Model.GameConfig.lineWinIndex];
            if (obj) {
                this.showPaylinesAnimation(obj.lineNumber);
                this.showAllSymbolsFaded(true);
                let lineWin = this.convertPosition(obj.winningPosition);
                let symbol = slotModel.getWinningSymbol(lineWin);

                let posLen = lineWin.length;
                if (posLen > 0) {
                    let index = 0;
                    for (let i = 0; i < posLen; i++) {
                        this.showSymbolLineWin(lineWin[i].reel, lineWin[i].row + 1, lineWin[i].symbol, this.stage.configData.data.showFrameForAllWin, false, index++ * 200);
                        this.winningSymbolsArray.push(this.symbolsArray[lineWin[i].reel][lineWin[i].row + 1]);
                    }
                }
                this.allwinId = setTimeout(this.sendLineWinCompleteNotificiation.bind(this), CoreLib.Util.getDefaultValue(CoreLib.Model.GameConfig.allWinDuration, 1800));
                if (CoreLib.Model.GameConfig.playLineWinSound) {
                    let soundno = this.getWinningSoundIndex(symbol);
                    CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.PLAY_LINEWIN_SOUND, soundno);
                }
            } else {
                //this.sendLineWinCompleteNotificiation();
            }

        }
    }

    showPaylinesAnimation (paylineNumber) {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_PAYLINE, paylineNumber);
    }

    sendLineWinCompleteNotificiation () {
        this.stage.onLineWinDone();
    }




    showHideSymbol (reel, index, flag) {
        this.symbolsArray[reel][index].visible = flag;
    }
    showAllSymbols () {
        let len = this.symbolsArray.length;
        for (let k = 0; k < len; k++) {
            let len2 = this.symbolsArray[k].length;
            for (let i = 0; i < len2; i++) {
                this.stage.symbolsContainer.addChild(this.symbolsArray[k][i]);
                this.symbolsArray[k][i].showFaded(false);
                this.symbolsArray[k][i].showSymbol(false);
            }
        }
    }



    cleanUp () {
        if (this.winningSymbolsArray) {
            let len = this.winningSymbolsArray.length;
            if (len > 0) {
                for (let k = 0; k < len; k++) {
                    this.stage.winFrameContainer.removeChild(this.winningSymbolsArray[k]);
                    this.winningSymbolsArray[k].clearSymbolSpinWin();
                    this.winningSymbolsArray[k] = null;
                }
            }
        }
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.HIDE_PAYLINE);
        this.winningSymbolsArray = null;
        clearTimeout(this.allwinId);
        if (this.lineWinIds) {
            let len = this.lineWinIds.length;
            if (len > 0) {
                for (let k = 0; k < len; k++) {
                    clearTimeout(this.lineWinIds[k]);
                }
            }
        }
        this.lineWinIds = [];
        this.showAllSymbols();
    }
    clearTriggeringWin () {
        if (this.winningSymbolsArray) {
            let len = this.winningSymbolsArray.length;
            if (len > 0) {
                for (let k = 0; k < len; k++) {
                    this.stage.winFrameContainer.removeChild(this.winningSymbolsArray[k]);
                    this.winningSymbolsArray[k].clearSymbolSpinWin();
                    this.winningSymbolsArray[k] = null;
                }
            }
        }
        this.winningSymbolsArray = null;
        this.showAllSymbols();
    }

    getWinningSoundIndex (symb) {
        let soundIndex = 0;
        if(this.configData.data.winningSoundIndex)
        {
            let len = this.configData.data.winningSoundIndex.length;
            for (let k = 0; k < len; k++) {
                if (this.configData.data.winningSoundIndex[k].indexOf(symb) > -1) {
                    soundIndex = k + 1;
                }
            }

        }

        return soundIndex;
    }

    showBonusTriggerAnim () {
        let data = this.convertPosition(slotModel.getFeatureTriggerPositions());
        let len = data.length;
        this.winningSymbolsArray = [];
        if (len > 0) {
            for (let k = 0; k < len; k++) {
                this.stage.winFrameContainer.addChild(this.symbolsArray[data[k].reel][data[k].row + 1]);
                this.symbolsArray[data[k].reel][data[k].row + 1].showTriggeringWin();
                this.winningSymbolsArray.push(this.symbolsArray[data[k].reel][data[k].row + 1]);
            }
        }
    }
    showCustomTriggerAnim (data) {

    }
    showCustomBonusTriggerAnim (positions) {
        let data = this.convertPosition(positions);
        let len = data.length;
        this.winningSymbolsArray = [];
        if (len > 0) {
            for (let k = 0; k < len; k++) {
                this.stage.winFrameContainer.addChild(this.symbolsArray[data[k].reel][data[k].row + 1]);
                this.symbolsArray[data[k].reel][data[k].row + 1].showTriggeringWin();
                this.winningSymbolsArray.push(this.symbolsArray[data[k].reel][data[k].row + 1]);
            }
        }
    }

    convertPosition (arr) {
        let result = [];
        let len = arr.length;
        for (let k = 0; k < len; k++) {
            result.push(this.reelPositionMap[arr[k]]);
        }
        return result;
    }


}

export const spinWinControllerOneByOne = new SpinWinControllerOneByOne();
