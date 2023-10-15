import {CoreLib} from "../corelib/core/CoreLib";

export class AuthenticMessageParser {
    constructor() {
        this.currencyDivider = 100;
        this.createWinningPositionMap();
    }
    createWinningPositionMap () {
        this.winningPositionMap = [
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

    }



    parseMessage (msgName, data) {
        let result;
        switch (msgName) {
            case "gameinit" :
                result = this.parseGameInit(data);
                break;
            case "spinresult" :
                result = this.parseGameResult(data);
                break;
            case "featureResult" :
                result = this.parseFeatureResult(data);
                break;
            default :
                result = data;
                break;
        }
        return result;
    }


    parseGameInit (data) {
        CoreLib.Logger.log(data);
        this.createWinningPositionMap();
        if (data.unfinishedInfo) {
            data.spinResult = data.unfinishedInfo;
        }

        let result = data;
        return result;
    }
    parseGameResult (data) {
        let result = data;
        return result;
    }
    parseFeatureResult (data) {
        let wins = [];
        let result = data;
        return result;
    }

}

export const MessageParser = new AuthenticMessageParser();
