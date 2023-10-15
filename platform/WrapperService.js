import {CommunicationService} from "./CommunicationService";
import {MessageParser} from "./MessageParser";
import {CoreLib} from "../corelib/core/CoreLib";
import {slotModel} from "../corelib/models/SlotModel";
import { SocketService } from './SocketService'

const app = null;

var JsonFormatter = {
    stringify: function(cipherParams) {
        // create json object with ciphertext
        var jsonObj = { ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64) };
        // optionally add iv or salt
        if (cipherParams.iv) {
            jsonObj.iv = cipherParams.iv.toString();
        }
        if (cipherParams.salt) {
            jsonObj.s = cipherParams.salt.toString();
        }
        // stringify json object
        return JSON.stringify(jsonObj);
    },
    parse: function(jsonStr) {
        // parse json string
        var jsonObj = JSON.parse(jsonStr);
        // extract ciphertext from json object, and create cipher params object
        var cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct)
        });
        // optionally extract iv or salt
        if (jsonObj.iv) {
            cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj.iv);
        }
        if (jsonObj.s) {
            cipherParams.salt = CryptoJS.enc.Hex.parse(jsonObj.s);
        }
        return cipherParams;
    }
};

class Wrapper {
    constructor () {
    }
    readLaunchParams () {
        this.createPlayerData();
    }
    initWrapper (ref) {
        this.application = ref;
        this.application.onWrapperInitiated();
    }


    createPlayerData () {

        this.playerData = {};
        this.isLocalBuild = false;

        var result = window.location.href.substring(0).split("#")[0].split("?");
        CoreLib.Model.GameConfig.isLocalBuild = false;

        if (result[1]) {
            var params = result[1].split("&");
            var len = params.length;
            if (len > 0) {
                for (var i = 0; i < params.length; i++) {
                    var values = params[i].split("=");
                    if (values[0].length > 0) {
                        if (values[0] === "realGame") {
                            this.playerData.isRealGame = typeof values[1] === "undefined" ? "" : values[1];
                        } else {
                            this.playerData[values[0]] = typeof values[1] === "undefined" ? "" : values[1];
                        }

                    }
                }
            }
        }
        CoreLib.Model.GameConfig.isLocalHost = false;
        if (result[0].toLowerCase().indexOf("localhost") > -1) {
            CoreLib.Model.GameConfig.isLocalHost = true;
        }
        if (this.playerData.language != undefined) {
            CoreLib.Model.GameInfo.language = this.playerData.language.toLowerCase();
        } else {

        }
        if (this.playerData.playerId == undefined) {
            this.playerData.playerId = Math.round(Math.random() * 10000000);
        }
        if (this.playerData.token == undefined) {
            this.playerData.token = "61d44c3121cb4f524f4daecf";
        }
        if (this.playerData.env == undefined) {
            this.playerData.env = "demo";
        }

        CoreLib.Model.GameInfo.currency = this.playerData.currency ? this.playerData.currency.toUpperCase() : "GBP";
        CoreLib.Model.GameConfig.playerId = this.playerData.playerId;
        if (this.playerData.env == "demo") {
            //CoreLib.Model.GameConfig.baseURL += "demo/";
        }

        this.readLocalStorage();

    }

    readLocalStorage () {
        CoreLib.Model.GameConfig.splashState = true;
        let str = CoreLib.Model.GameConfig.playerId + "_localStorage";
        let objstr = localStorage.getItem(str);
        let obj;
        if (objstr != undefined) {
            obj = JSON.parse(objstr);
            CoreLib.Model.GameConfig.splashState = obj.splashState;
            CoreLib.Model.GameConfig.fxSoundState = obj.fxSoundState;
            CoreLib.Model.GameConfig.ambientSoundState = obj.ambientSoundState;
        } else {
            obj  = {};
            obj.splashState = true;
            obj.fxSoundState = true;
            obj.ambientSoundState = true;
            CoreLib.Model.GameConfig.splashState = obj.splashState;
            CoreLib.Model.GameConfig.fxSoundState = obj.fxSoundState;
            CoreLib.Model.GameConfig.ambientSoundState = obj.ambientSoundState;

            localStorage.setItem(str, JSON.stringify(obj));
        }
    }

    setSplashState (flag) {
        let str = CoreLib.Model.GameConfig.playerId + "_localStorage";
        let objstr = localStorage.getItem(str);
        let obj = JSON.parse(objstr);
        obj.splashState = flag;
        localStorage.setItem(str, JSON.stringify(obj));
        CoreLib.Model.GameConfig.splashState = obj.splashState;
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.LOCALDATA_STATE_CHANGE);
    }

    setAmbientState (flag) {
        let str = CoreLib.Model.GameConfig.playerId + "_localStorage";
        let objstr = localStorage.getItem(str);
        let obj = JSON.parse(objstr);
        obj.ambientSoundState = flag;
        localStorage.setItem(str, JSON.stringify(obj));
        CoreLib.Model.GameConfig.ambientSoundState = obj.ambientSoundState;
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.LOCALDATA_STATE_CHANGE);
    }
    setFXState (flag) {
        let str = CoreLib.Model.GameConfig.playerId + "_localStorage";
        let objstr = localStorage.getItem(str);
        let obj = JSON.parse(objstr);
        obj.fxSoundState = flag;
        localStorage.setItem(str, JSON.stringify(obj));
        CoreLib.Model.GameConfig.fxSoundState = obj.fxSoundState;
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.LOCALDATA_STATE_CHANGE);
    }




    loadingStarted () {
    }
    updateLoadingProgress (loaded) {
    }

    connectToServer () {
        this.communicationService = new CommunicationService(this);
        this.application.onServerConnected();
    }
    onSocketConnected () {

    }
    onSocketMessage (data) {
        this.application.onSocketMessage(data);
    }
    connectToSocket () {
        this.socketService = new SocketService(this);
        let gameType = "baccarats6";
        //gameType = "easySixBaccarat";
        this.socketService.connectToServer(CoreLib.Model.GameConfig.socketURL, gameType, CoreLib.Model.GameConfig.playerId);
    }

    onServerTimeout (msgName) {
        if (msgName.indexOf("jpinfo") > -1 || msgName.indexOf("jpData") > -1) {
            return;
        }
        this.application.onServerTimeout();
    }
    onServerResponse (msgName, data) {
        data = MessageParser.parseMessage(msgName, data);
        CoreLib.Logger.log(msgName, data);
        this.application.onServerResponse(msgName, data);

    }


    requestUserBalance (gamecode) {
        let url = CoreLib.Model.GameConfig.baseURL + "/api/" + CoreLib.Model.GameConfig.gameId + "/balance";
        let obj = this.getBalanceRequestObject(gamecode);
        this.communicationService.getServerResponse("userBalance", obj, url, "POST", false);

    }

    requestGameInit () {
        let gameinitObj = this.getGameInitRequestObject();
        let url = CoreLib.Model.GameConfig.baseURL + "/api/" + CoreLib.Model.GameConfig.gameId + "/" + CoreLib.Model.GameConfig.initURL;
        this.communicationService.getServerResponse("gameinit", gameinitObj,  url, "POST");
    }
    requestSpinResult (isBuyBonus = false) {
        let spinRequest = this.getSpinRequestObject(isBuyBonus);
        //let url = CoreLib.Model.GameConfig.baseURL + CoreLib.Model.GameConfig.spinURL + CoreLib.Util.getRandomRange(1,4) + ".json";
        let url = CoreLib.Model.GameConfig.baseURL + "/api/" + CoreLib.Model.GameConfig.gameId + "/" + CoreLib.Model.GameConfig.spinURL;
        this.communicationService.getServerResponse("spinresult", spinRequest, url, "POST");

    }

    requestScatterPrize(scatter, roundid) {
        return;
        if (roundid.length == 0) {
            return;
        }
        let scatterRequest = this.getScatterRequestObject(scatter, roundid);
        let url = CoreLib.Model.GameConfig.baseURL + "/api/" + CoreLib.Model.GameConfig.gameId + "/" + "tournament/prizedrop/check";
        this.communicationService.getServerResponse("ScatterPrize", scatterRequest, url, "POST");
    }
    requestSpecialData(name, selection) {
        let bonusRequest = this.getBonusRequestObject(name, selection);
        let url = CoreLib.Model.GameConfig.baseURL + "/api/" + CoreLib.Model.GameConfig.gameId + "/" + CoreLib.Model.GameConfig.bonusURL;
        this.communicationService.getServerResponse("specialResult", bonusRequest, url, "POST");
    }
    requestBonusData (name, selection) {
        let bonusRequest = this.getBonusRequestObject(name, selection);
        let url = CoreLib.Model.GameConfig.baseURL + "/api/" + CoreLib.Model.GameConfig.gameId + "/" + CoreLib.Model.GameConfig.bonusURL;
        this.communicationService.getServerResponse("featureResult", bonusRequest, url, "POST");
    }

    requestBCTBetPlacement (betsArray) {
        let betRequest = this.getBCTBetRequestObject(betsArray);
        let url = CoreLib.Model.GameConfig.baseURL + "/api/" + CoreLib.Model.GameConfig.gameId + "/" + CoreLib.Model.GameConfig.bctBetURL;
        this.communicationService.getServerResponse("bctBetResponse", betRequest, url, "POST");
    }
    requestBCTUndo(obj) {
        let betRequest = this.getBCTUndoRequestObject(obj);
        let url = CoreLib.Model.GameConfig.baseURL + "/api/" + CoreLib.Model.GameConfig.gameId + "/" + CoreLib.Model.GameConfig.bctUndoURL;
        this.communicationService.getServerResponse("bctUndoResponse", betRequest, url, "POST");
    }
    requestBCTHistory () {
        if (CoreLib.Model.GameConfig.gameInitReceived) {
            let betRequest = this.getBCTHistoryRequestObject();
            let url = CoreLib.Model.GameConfig.baseURL + "/api/" + CoreLib.Model.GameConfig.gameId + "/" + CoreLib.Model.GameConfig.bctHitoryURL;
            //url = "gameassets/config/history.json";
            this.communicationService.getServerResponse("bctHistory", betRequest, url, "POST");
        }
    }




    createCustomCurrencyObject (data) {
        CoreLib.Util.createCustomCurrencyObject(data);
    }


    getGameCurrency() {
        return CoreLib.Model.GameInfo.currency;
    }
    formatCurrency (value, showCurrency) {
        return CoreLib.Util.formatCurrency(value, showCurrency);
    }
    formatCurrencyWithoutSymbol (value, showCurrency) {
        return CoreLib.Util.formatCurrencyWithoutSymbol(value, showCurrency);
    }
    formatWinCurrency (value) {
        return CoreLib.Util.formatWinCurrency(value);
    }
    formatCurrencyInGBP(value, showCurrency) {
        return CoreLib.Util.formatCurrencyInGBP(value, showCurrency);
    }


    formatCurrencyCustom (value, showCurrency) {
        return CoreLib.Util.formatCurrencyCustom(value, showCurrency);
    }
    navigateToCashier () {
        this.playerData.cashierLocation = decodeURIComponent(this.playerData.cashierLocation);
        if (this.playerData.cashierLocation) {
            document.location.href = this.playerData.cashierLocation;
        }
    }
    navigateToHome () {
        this.playerData.homeLocation = decodeURIComponent(this.playerData.homeLocation);
        if (this.playerData.homeLocation) {
            document.location.href = this.playerData.homeLocation;
        }
    }


    quitGame () {
        this.navigateToHome();

    }


    showWrapperError (msg) {
        this.application.stopSpinForError(msg);

    }
    updateBalanceToWrapper(balance) {

    }
    updateBetToWrapper(betAmount) {
        betAmount *= 100;

    }
    updateSpinStateToWrapper (isSimulated) {

    }
    getWrapperBlockedHeight () {
        return 0;
        return 45 * Matrix.Model.DeviceConfig.appResolution * 0.4;
    }


    navigateToHistory () {
        let url = CoreLib.Model.GameConfig.historyURL + CoreLib.Model.GameConfig.gameId + "/" + this.playerData.token + "?locale=" + CoreLib.Model.GameInfo.language;
        window.open(url);
    }

    getBalanceRequestObject (gamecode) {
        let finalObj = {};
        finalObj.gameId = CoreLib.Model.GameConfig.gameId;
        finalObj.playerId = this.playerData.playerId; //CoreLib.Model.GameConfig.playerId;
        finalObj.token = this.playerData.token;
        finalObj.env = this.playerData.env;
        return this.encryptObject(finalObj);

    }

    getInitExtraDataObject () {
        let data = {};

        return data;
    }
    getRequestObject () {
        let data = {};
        return data;

    }
    encryptObject (obj) {
        let newobj = {};
        //let passPhrase = CoreLib.Model.GameConfig.passPhrase;
        for (let p in obj) {
            newobj[p] = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(obj[p]));
        }
        return newobj;
    }
    getGameInitRequestObject() {
        let finalObj = {};
        finalObj.gameId = CoreLib.Model.GameConfig.gameId;
        finalObj.playerId = this.playerData.playerId; //CoreLib.Model.GameConfig.playerId;
        finalObj.token = this.playerData.token;
        finalObj.env = this.playerData.env;
        let result = this.encryptObject(finalObj);
        return result;
    }

    getSpinRequestObject (isBuyBonus) {
        let finalObj = {};
        finalObj.gameId = CoreLib.Model.GameConfig.gameId;
        finalObj.playerId = CoreLib.Model.GameConfig.playerId;
        finalObj.betPerLine = slotModel.getBetPerLine();

        finalObj.lineSelected = slotModel.getSelectedLines();
        finalObj.token = this.playerData.token;
        finalObj.env = this.playerData.env;
        if (isBuyBonus) {
            finalObj.bb = true;
        } else {
            finalObj.bb = false;
        }
        if (this.playerData.cheat != undefined) {
            if (this.playerData.cheat == "rainbowRespin" || this.playerData.cheat == "winSpin" || this.playerData.cheat == "jockeyWilds") {
                finalObj.triggerFeature = this.playerData.cheat;
                finalObj.combination = this.playerData.cheat;
            } else {
                finalObj.combination = this.playerData.cheat;
            }
        }
        return this.encryptObject(finalObj);
    }
    getScatterRequestObject(scatter, roundid) {
        let finalObj = {};
        finalObj.gameId = CoreLib.Model.GameConfig.gameId;
        finalObj.round_id = roundid;
        finalObj.scatter = scatter;
        finalObj.token = this.playerData.token;
        return this.encryptObject(finalObj);
    }
    getBonusRequestObject (name, selection) {
        let finalObj = {};
        finalObj.gameId = CoreLib.Model.GameConfig.gameId;
        finalObj.playerId = CoreLib.Model.GameConfig.playerId;
        finalObj.featureName = name;
        finalObj.selection = selection;
        finalObj.token = this.playerData.token;
        finalObj.env = this.playerData.env;
        //finalObj.combination = "Line2";
        return this.encryptObject(finalObj);
    }
    getBCTUndoRequestObject (obj) {
        let finalObj = {};
        finalObj.token = this.playerData.token;
        finalObj.platformGameId = slotModel.getBCTPlatformGameId();
        finalObj.roundId = obj.roundId;
        return this.encryptObject(finalObj);
    }
    getBCTBetRequestObject (betsArray) {
        let finalObj = {};
        finalObj.gameId = CoreLib.Model.GameConfig.gameId;
        finalObj.playerId = CoreLib.Model.GameConfig.playerId;
        finalObj.bets = JSON.stringify(betsArray);
        finalObj.token = this.playerData.token;
        finalObj.env = this.playerData.env;
        finalObj.platformGameId = slotModel.getBCTPlatformGameId();
        return this.encryptObject(finalObj);
    }
    getBCTHistoryRequestObject () {
        let finalObj = {};
        finalObj.platformGameId = slotModel.getBCTPlatformGameId();
        return this.encryptObject(finalObj);
    }

}

export const WrapperService = new Wrapper();

