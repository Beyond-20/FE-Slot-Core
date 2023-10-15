import { CoreLib } from "../core/CoreLib";
import { Logger } from '../utils/LoggerService'


class SlotModel {

    constructor() {
        this.isFreeSpinSession = false;
        this.nextFeature = null;
        this.isUnfinished = false;
        CoreLib.Model.GameConfig.gameInitReceived = false;
        this.isBuyBonusActive = false;
        this.isSpinTimeFeature = false;
        this.reelPositionMap = [
            { "reel": 0, "row": 0 },
            { "reel": 1, "row": 0 },
            { "reel": 2, "row": 0 },
            { "reel": 3, "row": 0 },
            { "reel": 4, "row": 0 },
            { "reel": 0, "row": 1 },
            { "reel": 1, "row": 1 },
            { "reel": 2, "row": 1 },
            { "reel": 3, "row": 1 },
            { "reel": 4, "row": 1 },
            { "reel": 0, "row": 2 },
            { "reel": 1, "row": 2 },
            { "reel": 2, "row": 2 },
            { "reel": 3, "row": 2 },
            { "reel": 4, "row": 2 },
        ]
    }
    isSpinTimeFeatureTriggered() {
        return this.isSpinTimeFeature;
    }
    getBCTPlatformGameId() {
        return this.gameInitFullData.playerInfo.game_id;
    }
    getBCTUndoRoundId() {

    }

    changeCoinCashMode() {
        CoreLib.Model.GameConfig.coinCashMode = CoreLib.Model.GameConfig.coinCashMode === 0 ? 1 : 0;
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.COIN_CASH_MODE_CHANGED, CoreLib.Model.GameConfig.coinCashMode);
    }

    getIsBuyBonusAvailable() {
        if (this.playerInfo.buy_feature != undefined) {
            return this.playerInfo.buy_feature;
        } else {
            return false;
        }
    }
    getGameRTP() {
        return this.rtp;
    }

    getMinBet() {
        return CoreLib.Model.GameInfo.betLevels[0] * CoreLib.Model.GameInfo.selectedLines * CoreLib.Model.GameInfo.creditValue;
    }
    getMaxBet() {
        return CoreLib.Model.GameInfo.betLevels[CoreLib.Model.GameInfo.betLevels.length - 1] * CoreLib.Model.GameInfo.selectedLines * CoreLib.Model.GameInfo.creditValue;
    }

    getPlayerInfo() {
        return this.playerInfo;
    }



    parseGameInit(data) {
        Logger.logDev("gameinit == ", data);

        CoreLib.Model.GameConfig.coinCashMode = CoreLib.Model.GameConfig.coinCashModeToStart;

        this.gameInitFullData = data;
        this.gameInitData = data.gameInfo;
        this.playerInfo = data.playerInfo;
        if (data.realReelSetName != undefined) {
            let arr = data.realReelSetName.split("_");
            this.rtp = arr[1];
        }
        this.rtp = CoreLib.Model.GameConfig.rtpValue == undefined ? "97.00" : CoreLib.Model.GameConfig.rtpValue;



        if (data.playerInfo.error == null || data.playerInfo.error.length <= 0) {
            CoreLib.Model.GameConfig.gameInitReceived = true;
        }
        this.playerId = data.playerInfo.player_id;
        CoreLib.Model.GameInfo.betLevels = data.gameInfo.betsArray;
        let bets = data.playerInfo.possible_bets;
        if (bets && bets.length > 0) {
            let len = bets.length;
            CoreLib.Model.GameInfo.betLevels = [];
            let bet;
            for (let k = 0; k < len; k++) {
                if (bets[k] != undefined && Number(bets[k]) > 0) {
                    bet = Number(bets[k]);
                    //if (bet * CoreLib.Model.GameConfig.noOfLines <= data.playerInfo.max_bet) {
                    CoreLib.Model.GameInfo.betLevels.push(bet);
                    //}

                }
            }
        }
        CoreLib.Model.GameInfo.defaultBetPos = data.playerInfo.default_bet != undefined ? data.playerInfo.default_bet : data.gameInfo.betPos;
        CoreLib.Model.GameInfo.currentBetPos = CoreLib.Model.GameInfo.defaultBetPos;
        CoreLib.Model.GameInfo.totalLines = CoreLib.Model.GameConfig.noOfLines;
        CoreLib.Model.GameInfo.selectedLines = CoreLib.Model.GameInfo.totalLines;
        if (data.playerInfo.balance != undefined) {
            CoreLib.Model.GameInfo.balance = data.playerInfo.balance;
        }

        CoreLib.Model.GameInfo.creditValue = CoreLib.Model.GameConfig.creditValue;

        if (data.unfinishedInfo) {
            this.isUnfinished = true;
            this.slotGameResult = {};
            this.slotGameResult.result = data.unfinishedInfo;
            this.featureResult = data.unfinishedInfo;
            CoreLib.Model.GameInfo.currentBetPos = CoreLib.Model.GameInfo.betLevels.indexOf(data.unfinishedInfo.betPerLine);
        }
        if (this.slotGameResult && this.slotGameResult.result && this.slotGameResult.result.featureResults) {
            let len = this.slotGameResult.result.featureResults.length;
            if (len > 0) {
                for (let k = 0; k < len; k++) {
                    if (this.slotGameResult.result.featureResults[k].featureType == this.slotGameResult.result.nextFeature) {
                        this.featureData = this.slotGameResult.result.featureResults[k];
                    }
                }

            }
            this.nextFeature = this.slotGameResult.result.nextFeature;
        }

        // for table games
        if (CoreLib.Model.GameConfig.gameId.indexOf("baccarat") > -1) {
            CoreLib.Model.GameConfig.maxBet = data.playerInfo.max_bet;
            CoreLib.Model.GameConfig.playerBankerMaxBet = data.playerInfo.max_bet != undefined ? data.playerInfo.max_bet : 5000;
            CoreLib.Model.GameConfig.superSixMaxBet = CoreLib.Model.GameConfig.playerBankerMaxBet * 0.1;
            CoreLib.Model.GameConfig.pairMaxBet = CoreLib.Model.GameConfig.playerBankerMaxBet * 0.1;
            CoreLib.Model.GameConfig.tieMaxBet = CoreLib.Model.GameConfig.playerBankerMaxBet * 0.1;
            CoreLib.Model.GameConfig.chipsArray = data.playerInfo.possible_bets ? data.playerInfo.possible_bets : CoreLib.Model.GameConfig.chipsArray;
        }

        CoreLib.Model.GameInfo.language = data.playerInfo.language == undefined ? "en" : data.playerInfo.language;
        CoreLib.Model.GameInfo.currency = data.playerInfo.currency == undefined ? "USD" : data.playerInfo.currency;
        //CoreLib.Model.GameInfo.language = "th";
        CoreLib.Model.GameConfig.selectedChip = 1;

        //this.playerInfo.tournament_id = "ASDFSADF";
    }
    getFSMultiplier() {
        if (this.featureData && this.featureData.multiplier != undefined) {
            return this.featureData.multiplier;
        } else {
            return 1;
        }

    }
    getSlotGameResult() {
        if (this.slotGameResult && this.slotGameResult.result) {
            return this.slotGameResult.result;
        } else {
            return null;
        }
    }
    setReelViewForReel(reelno, reel) {
        this.slotGameResult.result.reelView[reelno] = reel;
        if (this.slotGameResult.result.preFWReelView) {
            this.slotGameResult.result.preFWReelView[reelno] = reel;
        }
    }
    setReelSymbolForReelAtPositionRegular(reelno, position, symbol) {
        this.slotGameResult.result.reelView[reelno][position] = symbol;
    }
    setReelSymbolForReelAtPosition(reelno, position, symbol) {
        this.slotGameResult.result.preFWReelView[reelno][position] = symbol;
    }
    getReelsView() {
        if (this.slotGameResult && this.slotGameResult.result) {
            return this.slotGameResult.result.reelView;
        } else {
            return null;
        }
    }

    getPreWinReelsView() {
        if (this.slotGameResult && this.slotGameResult.result && this.slotGameResult.result.preWinSpinReelView) {
            return this.slotGameResult.result.preWinSpinReelView;
        } else {
            return this.slotGameResult.result.reelView;
        }
    }

    getPreRespinReelsView(){
        if (this.slotGameResult && this.slotGameResult.result && this.slotGameResult.result.preRainbowRespinReelView) {
            return this.slotGameResult.result.preRainbowRespinReelView;
        } else {
            return this.slotGameResult.result.reelView;
        }
    }

    setDefaultReel() {
        if (this.slotGameResult && this.slotGameResult.result) {
            this.slotGameResult.result.reelView = CoreLib.Model.GameConfig.defaultReels;
            this.slotGameResult.result.totalWin = 0;
            this.slotGameResult.result.winLines = [];
        } else {
            return null;
        }
    }
    getRoundId() {
        if (this.slotGameResult) {
            return this.slotGameResult.roundId;
        } else {
            return "";
        }
    }
    parseSpinResult(data) {
        Logger.logDev("spin == ", data);
        this.slotGameResult = data;
        this.featureData = null;
        if (this.slotGameResult.result.featureResults) {
            let len = this.slotGameResult.result.featureResults.length;
            if (len > 0) {
                for (let k = 0; k < len; k++) {
                    if (this.slotGameResult.result.featureResults[k].featureType == this.slotGameResult.result.nextFeature) {
                        this.lastFeatureData = this.featureData;
                        this.featureData = this.slotGameResult.result.featureResults[k];
                    }
                }

            }
        }
        this.nextFeature = this.slotGameResult.result.nextFeature;
        this.isUnfinished = false;
        if (data.playerInfo.balance != undefined) {
            CoreLib.Model.GameInfo.balanceNew = data.playerInfo.balance;
        }



    }
    onSpinEnd() {

        CoreLib.Model.GameInfo.balance = CoreLib.Model.GameInfo.balanceNew;
    }
    getLastFeatureData() {
        return this.lastFeatureData;
    }
    parseFeatureResult(data) {
        Logger.logDev("feature == ", data);
        this.featureResult = data.result;
        if (data.result.featureResults) {
            let len = data.result.featureResults.length;
            if (len > 0) {
                this.lastFeatureData = this.featureData;
                this.featureData = data.result.featureResults[len - 1];
            }
        }
        this.nextFeature = data.result.nextFeature;
        if (this.featureData.spinResults) {
            this.slotGameResult.result = this.featureData.spinResults[this.featureData.spinResults.length - 1];
        }
        if (data.playerInfo.balance != undefined) {
            CoreLib.Model.GameInfo.balance = data.playerInfo.balance;
            CoreLib.Model.GameInfo.balanceNew = data.playerInfo.balance;
            ;
        }
        this.isUnfinished = false;
    }
    handleBalanceUpdate(data) {
        if (data.playerInfo) {
            if (data.playerInfo.balance != undefined) {
                CoreLib.Model.GameInfo.balance = data.playerInfo.balance;
                CoreLib.Model.GameInfo.balanceNew = data.playerInfo.balance;
            }
        }

    }
    parseBCTBetResponse(data) {
        if (data.playerInfo) {
            this.bctBetResponse = data;
            if (data.playerInfo.balance != undefined) {
                CoreLib.Model.GameInfo.balance = data.playerInfo.balance;
                CoreLib.Model.GameInfo.balanceNew = data.playerInfo.balance;
            }
        } else {
            if (data.balance != undefined) {
                CoreLib.Model.GameInfo.balance = data.balance;
                CoreLib.Model.GameInfo.balanceNew = data.balance;
            }
        }

    }
    getPlayerId() {
        return this.playerId;
    }
    updateBaccaratBalance(data) {
        if (data.gameResult.player_id == this.playerId) {
            if (data.gameResult.playerInfo.balance != undefined) {
                CoreLib.Model.GameInfo.balance = data.gameResult.playerInfo.balance;
                CoreLib.Model.GameInfo.balanceNew = data.gameResult.playerInfo.balance;
            }
        }

    }
    updateEasyBaccaratBalance(data) {

        if (data.easySixGameResult.player_id == this.playerId) {
            CoreLib.Model.GameInfo.balance = data.easySixGameResult.playerInfo.balance;
            CoreLib.Model.GameInfo.balanceNew = data.easySixGameResult.playerInfo.balance;
        }

    }
    parseBCTUndoResponse(data) {
        //this.bctBetResponse = data;
        if (data.balance != undefined) {
            CoreLib.Model.GameInfo.balance = data.balance;
            CoreLib.Model.GameInfo.balanceNew = data.balance;
        }
    }
    parseBCTHistoryData(data) {
        this.bctHistory = data;

    }
    getBCTHistoryData() {
        return this.bctHistory;
    }
    getBCTBetData() {
        return this.bctBetResponse;
    }
    parseBCTGameResultResponse(data) {
        if (data.playerInfo.balance != undefined) {
            CoreLib.Model.GameInfo.balance = data.playerInfo.balance;
            CoreLib.Model.GameInfo.balanceNew = data.playerInfo.balance;
        }
    }

    getTotalFSWin() {
        return this.featureData.totalWin;
    }
    clearFeatureData() {
        if (this.featureResult && this.featureResult.nextFeature) {
            // handle multi step feature
        } else {
            this.featureData = null;
        }
    }
    getTotalFreespinWin() {
        if (this.featureResult) {
            return (this.featureResult.spinWin + this.featureData.totalWin);
        } else {
            return (this.slotGameResult.result.totalWin + this.featureData.totalWin);
        }
    }
    getFeatureResult() {
        return this.featureResult;
    }
    getLastFeatureResult() {
        let data = null;
        if (this.featureResult) {
            if (this.featureResult.featureResults && this.featureResult.featureResults.length > 0) {
                data = this.featureResult.featureResults[this.featureResult.featureResults.length - 1]
            }
        }
        return data;
    }
    isFeatureTriggered() {
        return (this.nextFeature ? true : false);
    }
    isNextFreespinPossible() {
        if (this.featureData.currentCount <= this.featureData.totalCount) {
            return true;
        } else {
            return false;
        }

    }
    isNewFeature() {
        if (this.featureData && this.lastFeatureData) {
            if (this.featureData.featureType == this.lastFeatureData.featureType) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }

    }
    getFeatureData() {
        return this.featureData;
    }
    isFeatureTriggerPositionsAvailable() {
        if (this.featureData) {
            if (this.featureData.featureTriggerPositions && this.featureData.currentCount == 0) {
                if (this.featureData.featureTriggerPositions.length > 0) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return null;
        }
    }
    getFeatureTriggerPositions() {
        return this.featureData ? this.featureData.featureTriggerPositions : null;
    }
    getFeatureType() {
        return this.nextFeature;

    }
    setFreespinSession(flag) {
        this.isFreeSpinSession = flag;
    }
    getIsFreespinSession() {
        return this.isFreeSpinSession;
    }
    getCurrentBonusName() {
        return this.getFeatureType();
    }
    getBonusOptionName(selection) {
        if (selection >= 0 && this.featureData.options != undefined) {
            return this.featureData.options[selection];
        } else {
            return "";
        }

    }
    getWinningSymbol(positions) {
        let symbs = [];
        let reelview = this.getReelsView();
        let len = positions.length;
        for (let k = 0; k < len; k++) {
            symbs.push(reelview[positions[k].reel][positions[k].row]);
        }
        let symb = "";
        len = symbs.length;
        let totalwild = 0;
        for (let k = 0; k < len; k++) {
            symb = symbs[k] == "WD" ? symb : symbs[k];
            if (symbs[k] == "WD") {
                totalwild++;
            }
        }
        if (totalwild >= 5) {
            return "WD";
        } else {
            return symb;
        }



    }
    setServerBalance() {
        //CoreLib.Model.GameInfo.balance = this.slotGameResult.balance;

    }
    getFSSpinWin() {
        let win;
        if (this.featureData && this.featureData.currentWin != undefined && this.featureData.currentRound > 0) {
            win = this.featureData.currentWin;
        } else {
            win = this.getSpinWin();
        }
        return Number(win.toFixed(2));
    }
    getSpinWin() {
        if (this.slotGameResult && this.slotGameResult.result) {
            return this.slotGameResult.result.totalWin;
        } else {
            return 0;
        }

    }
    getTotalWin() {
        return this.getFSSpinWin();
    }

    getCurrentWinLevel(val) {
        let bet = this.getTotalBet();
        let win = this.getTotalWin();
        let level = 0;
        let multi = val; //Math.round(val / bet);
        let len = CoreLib.Model.GameConfig.bigWinMultipliersSequence.length;
        let total = 0;
        for (let k = 0; k < len; k++) {
            if (multi > CoreLib.Model.GameConfig.bigWinMultipliersSequence[k]) {
                level = k + 1;
            } else {
                break;
            }
        }
        //level = 2;
        return level;
    }

    getWinLevel() {
        let bet = this.getTotalBet();
        let win = this.getTotalWin();
        let level = 0;
        let multi = Math.round(win / bet);
        let len = CoreLib.Model.GameConfig.bigWinMultipliers.length;
        let total = 0;
        for (let k = 0; k < len; k++) {
            if (multi > CoreLib.Model.GameConfig.bigWinMultipliers[k]) {
                level = k;
            } else {
                break;
            }
        }

        //level = 2;
        return level;
    }
    convertPosition(arr) {
        let result = [];
        let len = arr.length;
        for (let k = 0; k < len; k++) {
            result.push(this.reelPositionMap[arr[k]]);
        }
        return result;
    }

    getFiveOfAKindWin() {
        let obj = {};
        obj.isTriggered = false;
        let total = 0;
        const reelsview = this.getReelsView();
        if (CoreLib.Model.GameConfig.isFiveOfAKindWin) {
            let winlines = this.getWinLines();
            let len = winlines.length;
            if (len > 0) {
                for (let k = 0; k < len; k++) {
                    let arr = this.convertPosition(winlines[k].winningPosition);
                    total = arr.length;
                    if (total == 5) {
                        obj.isTriggered = true;
                        obj.symbol = this.getWinningSymbol(arr);
                        break;
                    }
                }
            }
        }
        return obj;
    }


    getWinLines() {
        if (this.slotGameResult && this.slotGameResult.result) {
            return this.slotGameResult.result.winLines;
        } else {
            return null;
        }

    }

    getCurrentWinLine() {
        let winlines = this.getWinLines();
        let obj = null;
        if (winlines) {
            obj = winlines[CoreLib.Model.GameConfig.lineWinIndex];
        }
        return obj;
    }

    getGameInitFullData() {
        return this.gameInitFullData;
    }
    getGameInitData() {
        return this.gameInitData;
    }
    isUnfinishedGame() {
        return this.isUnfinished;
    }
    getBetLevels() {
        return CoreLib.Model.GameInfo.betLevels;
    }
    setBuyBonus(flag) {
        this.isBuyBonusActive = flag;
    }
    getBetDeductedBalance() {
        if (this.isBuyBonusActive) {
            return (this.getBalance() - (this.getTotalBet() * CoreLib.Model.GameConfig.buyBonusBetMultiplier));
        } else {
            return (this.getBalance() - this.getTotalBet());
        }

    }
    getBalance() {
        return CoreLib.Model.GameInfo.balance;
    }
    getTotalBet() {
        return CoreLib.Model.GameInfo.betLevels[CoreLib.Model.GameInfo.currentBetPos] * CoreLib.Model.GameInfo.selectedLines * CoreLib.Model.GameInfo.creditValue;
    }
    getBetPosition() {
        return CoreLib.Model.GameInfo.currentBetPos;
    }
    getBetPerLine() {
        return CoreLib.Model.GameInfo.betLevels[CoreLib.Model.GameInfo.currentBetPos];
    }
    getSelectedLines() {
        return CoreLib.Model.GameInfo.selectedLines;
    }
    updateBetPosition(factor) {
        CoreLib.Model.GameInfo.currentBetPos += factor;
        if (CoreLib.Model.GameInfo.currentBetPos < 0) {
            CoreLib.Model.GameInfo.currentBetPos = 0;
        }
        if (CoreLib.Model.GameInfo.currentBetPos > this.getBetLevels().length - 1) {
            CoreLib.Model.GameInfo.currentBetPos = this.getBetLevels().length - 1;
        }
    }

    getAutoSpinRemainingCount() {
        if (this.autoPlayObj.selectedSpins == -1) {
            return this.autoPlayObj.currentAutoSpin;
        } else {
            return (this.autoPlayObj.selectedSpins - this.autoPlayObj.currentAutoSpin);
        }

    }
    setAutoplayInfo(obj) {
        this.autoPlayObj = obj;
        this.autoPlayObj.startBalance = this.getBalance();
        this.autoPlayObj.currentBalance = this.getBalance();
        this.autoPlayObj.currentAutoSpin = 1;
        this.autoPlayObj.totalAutoWin = 0;
        this.autoPlayObj.maxSingleWin = 0;
        this.autoPlayObj.featureTriggered = false;
        this.autoPlaySession = true;
    }
    setAutoPlayWin(win) {
        if (this.getIsAutoSession()) {
            this.autoPlayObj.totalAutoWin += win;
            if (win > this.autoPlayObj.maxSingleWin) {
                this.autoPlayObj.maxSingleWin = win;
            }
        }

    }
    getScatterCount() {
        const reelsview = this.getReelsView();
        let total = 0;
        if (reelsview) {
            const len = reelsview.length;
            for (let k = 0; k < len; k++) {
                const len2 = reelsview[k].length;
                for (let i = 0; i < len2; i++) {
                    if (reelsview[k][i] == CoreLib.Util.getDefaultValue(CoreLib.Model.GameConfig.scatter, "SC")) {
                        total++;
                    }
                }
            }
        }
        return total;
    }
    setAutoFeatureTriggered() {
        if (this.getIsAutoSession()) {
            this.autoPlayObj.featureTriggered = true;
        }
    }
    resetAutoplayData() {
        const obj = {};
        obj.selectedSpins = 0;
        obj.onAnyWin = false;
        obj.onBonusWin = false;
        obj.onSingleWinExceeds = 0;
        obj.balanceIncreaseBy = 0;
        obj.balanceDecreaseBy = 0;
        obj.startBalance = 0;
        obj.currentBalance = 0;
        obj.currentAutoSpin = 0;
        obj.featureTriggered = false;
        obj.totalAutoWin = 0;
        obj.startBalance = 0;
        obj.currentBalance = 0;
        this.autoPlayObj = obj;
        this.autoPlaySession = false;
    }
    increatementAuto() {
        this.autoPlayObj.currentAutoSpin++;
    }
    isAutospinStartPossible() {
        if (this.getBalance() >= this.getTotalBet()) {
            return true;
        } else {
            return false;
        }

    }
    getIsAutoSession() {
        return this.autoPlaySession;
    }
    getNextAutoPossible() {
        let state = 0;
        if (this.autoPlayObj.selectedSpins == -1) {
            state = 1;
        } else {
            if (this.autoPlayObj.currentAutoSpin > this.autoPlayObj.selectedSpins) {
                state = 2;
            } else {
                state = 1;
            }
        }
        if (this.autoPlayObj.onAnyWin) {
            if (this.autoPlayObj.totalAutoWin > 0) {
                state = 3;
            }
        }
        if (this.autoPlayObj.onBonusWin) {
            if (this.autoPlayObj.featureTriggered) {
                state = 4;
            }
        }
        if (this.autoPlayObj.onSingleWinExceeds > 0) {
            if (this.autoPlayObj.maxSingleWin > this.autoPlayObj.onSingleWinExceeds) {
                state = 5;
            }

        }
        if (this.autoPlayObj.balanceDecreaseBy > 0) {
            if (this.autoPlayObj.startBalance - this.getBalance() > this.autoPlayObj.balanceDecreaseBy) {
                state = 6;
            }
        }
        if (this.autoPlayObj.balanceIncreaseBy > 0) {
            if (this.getBalance() - this.autoPlayObj.startBalance > this.autoPlayObj.balanceIncreaseBy) {
                state = 7;
            }
        }
        return state;
    }


}


export const slotModel = new SlotModel();
