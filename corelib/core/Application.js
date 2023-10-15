import {AssetLoader} from "../pixiwrapper/AssetLoader";
import {CoreLib} from "./CoreLib";
import {slotModel} from "../models/SlotModel";
import { Logger } from '../utils/LoggerService'
import { SoundAlertComp } from '../views/layoutcomps/SoundAlertComp'
import { SOUND_ALERT_CONFIG } from '../config/SoundAlertConfig'

let assetLoader = null;
let stats = null;

export class Application {
    constructor (gameconfig, loadconfig, soundconfig) {
        this.gameStartTime = CoreLib.Util.getCurrentTimeInMili();
        this.loadingTimeCount = CoreLib.Util.getCurrentTimeInMili();
        let that = this;
        this.panelLoaded = false;
        this.gameForTourneyReady = false;
        window.onTournamentPanelLoaded = function () {
            that.onPanelLoaded();
        }

        CoreLib.Model.slotModel = slotModel;
        this.spinWinStateExited = false;
        this.allAssetsLoaded = false;
        this.slotViewCreated = false;
        this.isUserInteracted = false;
        this.uploadToGPUDone = false;
        this.allGameViewCreated = false;
        this.gameCreated = false;
        this.serverConnected = false;
        this.soundOptionSelected = false;
        this.isPreloaderDone = false;
        this.primaryAssetsLoaded = false;
        this.secondaryAssetsLoaded = false;
        this.soundLoadCalled = false;
        this.loadCompletedPerc = 0;
        this.gameType = "slot";
        this.onSecondaryLoadedCallback = null;
        this.setGameLevelConfig(gameconfig, loadconfig, soundconfig);
        CoreLib.WrapperService.readLaunchParams();
        this.readDeviceParams();
        this.isFullScreen = false;
        assetLoader = new AssetLoader();
        CoreLib.assetLoader = assetLoader;
        this.createScaleProps();
        this.elapsedTime = 0;
        this.fps = 60;
        this.lastTime = CoreLib.Util.getCurrentTimeInMili();
        CoreLib.WrapperService.initWrapper(this);

    }
    getIsLocal()  {
        let hostName = location.hostname;
        return hostName === "localhost" ? true : false;
    }
    setGameLevelConfig (gameconfig, loadconfig, soundconfig) {
        if (gameconfig) {
            for (var p in gameconfig) {
                CoreLib.Model.GameConfig[p] = gameconfig[p];
            }
        }
        if (loadconfig) {
            for (var p in loadconfig) {
                CoreLib.Model.LoadConfig[p] = loadconfig[p];
            }
        }
        if (soundconfig) {
            for (var p in soundconfig) {
                CoreLib.Model.SoundLoadConfig[p] = soundconfig[p];
            }
        }
    }
    onWrapperInitiated () {
        CoreLib.WrapperService.loadingStarted();
        const commonConfig = {type : "envconfig", name : "envConfig.json"};
        assetLoader.loadJSONFile(commonConfig, this.onEnvConfigLoaded.bind(this));
        //this.startLoadingConfig();
    }
    onEnvConfigLoaded (data) {
        if (data.gameConfig) {
            for (var p in data.gameConfig) {
                CoreLib.Model.GameConfig[p] = data.gameConfig[p];
            }
        }
        CoreLib.WrapperService.connectToServer();
        if (CoreLib.Model.GameConfig.isSocketGame) {
            CoreLib.WrapperService.connectToSocket();
        }

    }
    onServerConnected () {
        CoreLib.WrapperService.requestGameInit();
        this.serverConnected = true;
    }
    loadConfigAfterInit () {
        const commonConfig = {type : "commonconfig", name : "commonConfig.json"};
        assetLoader.loadJSONFile(commonConfig, this.onCommonConfigLoaded.bind(this));
    }

    onCommonConfigLoaded(data) {
        if (data.gameConfig) {
            for (var p in data.gameConfig) {
                CoreLib.Model.GameConfig[p] = data.gameConfig[p];
            }
        }
        CoreLib.Model.GameConfig.buildVersion = CoreLib.Model.GameConfig.gameAssetVersions[CoreLib.Model.GameConfig.gameId];
        assetLoader.initiateLoader();
        CoreLib.Model.GameConfig.isTurboOn = false;
        this.startLoadingGameFiles();


    }

    startLoadingGameFiles() {
        assetLoader.loadLangJsonFile(CoreLib.Model.LoadConfig.COMMON_CONTENT, CoreLib.Model.LoadConfig.LANGUAGES_SUPPORTED, this.onCommonContentLoaded.bind(this));
    }
    onCommonContentLoaded (endata, data) {
        if (endata) {
            for (var p in endata) {
                CoreLib.Model.Content[p] = endata[p];
            }
        }
        if (data) {
            for (var p in data) {
                CoreLib.Model.Content[p] = data[p];
            }
        }
        assetLoader.loadLangJsonFile(CoreLib.Model.LoadConfig.COMMON_TEXT_CONFIG, CoreLib.Model.LoadConfig.LANGUAGES_SUPPORTED, this.onCommonTextConfigLoaded.bind(this));
    }
    onCommonTextConfigLoaded (engdata, data) {
        CoreLib.Model.TextConfig = engdata;
        if (data) {
            for (let p in data.FontFaces) {
                CoreLib.Model.TextConfig.FontFaces[p] = data.FontFaces[p];
            }
            for (let p in data.FontFiles) {
                CoreLib.Model.TextConfig.FontFiles[p] = data.FontFiles[p];
            }
            for (let p in data.FontConfig) {
                CoreLib.Model.TextConfig.FontConfig[p] = data.FontConfig[p];
            }
        }

        assetLoader.loadLangJsonFile(CoreLib.Model.LoadConfig.TEXT_CONFIG, CoreLib.Model.LoadConfig.LANGUAGES_SUPPORTED, this.onTextConfigLoaded.bind(this));
    }
    onTextConfigLoaded (engdata, data) {
        if (engdata) {
            for (let p in engdata.FontFaces) {
                CoreLib.Model.TextConfig.FontFaces[p] = engdata.FontFaces[p];
            }
            for (let p in engdata.FontFiles) {
                CoreLib.Model.TextConfig.FontFiles[p] = engdata.FontFiles[p];
            }
            for (let p in engdata.FontConfig) {
                CoreLib.Model.TextConfig.FontConfig[p] = engdata.FontConfig[p];
            }
        }
        if (data) {
            if (data.FontFaces) {
                for (let p in data.FontFaces) {
                    CoreLib.Model.TextConfig.FontFaces[p] = data.FontFaces[p];
                }
            }
            if (data.FontFiles) {
                for (let p in data.FontFiles.PrimaryFonts) {
                    CoreLib.Model.TextConfig.FontFiles.PrimaryFonts[p] = data.FontFiles.PrimaryFonts[p];
                }
                for (let p in data.FontFiles.SecondaryFonts) {
                    CoreLib.Model.TextConfig.FontFiles.SecondaryFonts[p] = data.FontFiles.SecondaryFonts[p];
                }
            }

            if (data.FontConfig) {
                for (let p in data.FontConfig) {
                    CoreLib.Model.TextConfig.FontConfig[p] = data.FontConfig[p];
                }
            }

        }
        assetLoader.loadLangJsonFile(CoreLib.Model.LoadConfig.GAME_CONTENT, CoreLib.Model.LoadConfig.LANGUAGES_SUPPORTED, this.onGameContentLoaded.bind(this));
    }
    onGameContentLoaded (engdata, data) {
        if (engdata) {
            for (var p in engdata) {
                CoreLib.Model.Content[p] = engdata[p];
            }
        }
        if (data) {
            for (var p in data) {
                CoreLib.Model.Content[p] = data[p];
            }
        }
        assetLoader.loadAssets(CoreLib.Model.LoadConfig.PRELOADER, this.onCorePreloaderLoaded.bind(this));
    }
    onCorePreloaderLoaded () {
        // do at core level whatever needs to be done
        this.createGame();
        assetLoader.loadFonts(CoreLib.Model.TextConfig.FontFiles.PrimaryFonts, this.onPrimaryFontsLoaded.bind(this));
    }

    onPrimaryFontsLoaded () {
        this.finalLoaded = 0;
        this.loadCompletedPerc = 0;
        this.maxLoadPerc = CoreLib.Model.LoadConfig.PRIMARY.MAXLOADPERC;
        this.createAlertPopup();
        this.showPreloader();
        assetLoader.loadAssets(CoreLib.Model.LoadConfig.PRIMARY, this.onPrimaryAssetLoaded.bind(this), this.onCoreLoadingProgress.bind(this));
    }
    showPreloader () {

    }
    createAlertPopup () {
        //this.alertView = this.createViewComponent(new AlertView(ALERTPOPUP_CONFIG, CoreLib.Util.getConfigByName(GAME_LAYOUT.Elements, "alertview")), "alertview", false);
    }



    onCoreLoadingProgress (loaded) {
        let nowloaded = this.loadCompletedPerc + (loaded * this.maxLoadPerc) / 100;
        if (this.finalLoaded < nowloaded) {
            CoreLib.WrapperService.updateLoadingProgress(nowloaded);
            CoreLib.EventHandler.dispatchEvent(CoreLib.AppEvents.ASSET_LOADING_PROGRESS, nowloaded)
            this.finalLoaded = nowloaded;
            CoreLib.Model.GameConfig.currentLoaded = nowloaded;
        }
    }

    onPrimaryAssetLoaded () {
        this.primaryAssetsLoaded = true;
        this.loadCompletedPerc = this.maxLoadPerc;
        this.continueGameLoading();

    }

    continueGameLoading() {
        if (this.primaryAssetsLoaded && this.serverConnected && !this.soundLoadCalled) {
            this.primaryLoadedForGameInit = true;
            this.soundLoadCalled = true;
            if (CoreLib.Model.DeviceConfig.isIOSDevice) {
                //this.showSoundAlert();
                this.onSoundNoClick();
                return;
            }
            this.onSoundYesClick();
        }
    }



    showSoundAlert () {
        this.soundAlert = new SoundAlertComp(SOUND_ALERT_CONFIG);
        CoreLib.View.addView(this.soundAlert);
    }
    onAlertCancel () {
        if (this.soundAlert) {
            this.soundAlert.destroyComp();
            this.soundAlert.destroy();
        }
    }
    loadSoundForIOSNow () {
        if (CoreLib.Model.DeviceConfig.isIOSDevice) {
            if (!this.isUserInteracted) {
                this.isUserInteracted = true;
                this.soundPresent = true;
                CoreLib.SoundFactory.loadSounds(CoreLib.Model.SoundLoadConfig.soundFiles, CoreLib.Model.GameConfig.gameAssetPath + "sounds/", CoreLib.Model.GameConfig.commonAssetPath + "sounds/");
            }
        }


    }
    onSoundYesClick () {
        this.soundPresent = true;
        this.onAlertCancel(false);
        this.loadCompletedPerc = CoreLib.Model.LoadConfig.PRIMARY.MAXLOADPERC;
        CoreLib.SoundFactory.loadSounds(CoreLib.Model.SoundLoadConfig.soundFiles, CoreLib.Model.GameConfig.gameAssetPath + "sounds/", CoreLib.Model.GameConfig.commonAssetPath + "sounds/");
        this.soundOptionSelected = true;

    }
    onSoundNoClick () {
        this.soundPresent = false;
        this.onAlertCancel(false);
        this.loadCompletedPerc = CoreLib.Model.LoadConfig.PRIMARY.MAXLOADPERC;
        this.onSoundLoadComplete();
        let soundst = false;
        this.soundOptionSelected = true;
    }

    soundLoadingProgress (loaded) {
        if (this.isUserInteracted) {
            return;
        }
        let newloaded = this.loadCompletedPerc + (loaded / 5);
        CoreLib.WrapperService.updateLoadingProgress(newloaded);
        CoreLib.EventHandler.dispatchEvent(CoreLib.AppEvents.ASSET_LOADING_PROGRESS, newloaded)
    }
    startBGSoundLate () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.START_MAINGAME_BG_MUSIC);
        CoreLib.EventHandler.dispatchEvent("PLAY_BCT_BGMUSIC");
    }
    onSoundLoadComplete () {
        if (!this.isUserInteracted) {
            this.loadCompletedPerc = 100;
            CoreLib.EventHandler.dispatchEvent(CoreLib.AppEvents.ASSET_LOADING_PROGRESS, this.loadCompletedPerc);
            CoreLib.Model.GameConfig.currentLoaded = this.loadCompletedPerc;
            CoreLib.EventHandler.dispatchEvent(CoreLib.AppEvents.SHOW_GAMEINITIALIZING);
            assetLoader.loadFonts(CoreLib.Model.TextConfig.FontFiles.SecondaryFonts, this.onSecondaryFontsLoaded.bind(this));
        } else {
            this.startBGSoundLate();
        }


    }
    onSecondaryFontsLoaded () {
        this.allAssetsLoaded = true;
        CoreLib.EventHandler.dispatchEvent(CoreLib.AppEvents.SHOW_PROGRESS_FOR_RENDERING)
        setTimeout(this.checkToCreateGame.bind(this), 0);

    }
    checkToCreateGame() {
        if (this.gameInitReceived && this.allAssetsLoaded) {
            if (!this.slotViewCreated) {
                this.slotViewCreated = true;
                this.createGameView();
            }
        }
    }

    createGameView () {
        // override in game class
    }
    onGameViewCreated () {
        let flag = this.checkForRGSError(this.gameinitMsg, this.gameinitMsgName);
        if (flag) {
            CoreLib.View.addToTop(CoreLib.View.getView("preloader"));
            this.allGameViewCreated = true;
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SET_INITIAL_VALUES);
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.UPDATE_BET_BALANCE);

            this.loadSecondaryAssets();
        }

        setTimeout(this.resizeCanvas.bind(this), 0);
        setTimeout(this.showGameNow.bind(this), 100);
        this.createGameEvents();

    }
    createGameEvents () {

    }

    /*noSleepForMobile () {
        $("canvas").click(function(){
        });
        setTimeout(this.checkNoSleepForMobile.bind(this), 60000);
    }

    checkNoSleepForMobile () {
        $("canvas").click();
        if (CoreLib.Model.DeviceConfig.isMobile) {
            setTimeout(this.checkNoSleepForMobile.bind(this), 60000);
        }
    }*/

    showGameNow () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.FADEOUT_PRELOADER);
    }
    onGameStartClickedSkipped () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.VALIDATE_TOURNEY_ICON);
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_MAINGAME_BG, true);
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_SLOTMACHINE, true);
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_SLOTPANEL, true);
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.START_MAINGAME_BG_MUSIC);
        this.createVideoElement();
        this.checkGameState();
        let playerInfo = slotModel.getPlayerInfo();
        if (playerInfo.tournament_id) {
            this.showDailyWins();
        }

    }
    onGameStartClicked () {
        if (!this.isUserInteracted) {
            this.loadSoundForIOSNow();
        }
        if (CoreLib.Model.DeviceConfig.isDevice) {
            this.doFullScreen();
        }
        this.createVideoElement();
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.VALIDATE_TOURNEY_ICON);
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_MAINGAME_BG, true);
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_SLOTMACHINE, true);
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_SLOTPANEL, true);
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.START_MAINGAME_BG_MUSIC);
        this.checkGameState();
        let playerInfo = slotModel.getPlayerInfo();
        if (playerInfo.tournament_id) {
            this.showDailyWins();
        }

    }

    checkGameState () {
        if (slotModel.isFeatureTriggered()) {
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.DISABLE_ALL_BUTTONS);
            setTimeout(this.triggerFeatureGame.bind(this), 2000);
        } else {
            this.activateControls();
        }
    }
    onRemovePreloaderCall () {
        setTimeout(this.removePreloader.bind(this), 1200);
    }
    removePreloader () {
        if (CoreLib.View.getView("preloader")) {
            CoreLib.View.getView("preloader").destroyComp();
            CoreLib.View.removeView("preloader");
        }
    }



    loadSecondaryAssets () {
        assetLoader.loadAssets(CoreLib.Model.LoadConfig.SECONDARY, this.onSecondaryAssetLoaded.bind(this), this.onCoreLoadingProgressSecondary.bind(this));
    }
    onCoreLoadingProgressSecondary () {

    }
    onSecondaryAssetLoaded () {
        setTimeout(this.onSecondaryAssetsReadyNow.bind(this), 100);

    }
    onSecondaryAssetsReadyNow () {
        CoreLib.Model.GameConfig.secondaryUILoaded = true;
        CoreLib.EventHandler.dispatchEvent(CoreLib.AppEvents.SECONDARY_ASSETS_LOADED);
    }



    createViewComponent (view, name = "", visible = true, depth) {
        CoreLib.View.addView(view, name, depth);
        view.visible = visible;
        return view;
    }

    // create game
    createGame() {
        document.addEventListener('contextmenu', event => event.preventDefault());
        this.readDeviceParams();
        PIXI.utils.sayHello("Funhouse Games");
        PIXI.settings.GC_MODE = PIXI.GC_MODES.MANUAL;
        let wid = CoreLib.Model.DeviceConfig.windowWidth;
        let ht = CoreLib.Model.DeviceConfig.windowHeight;
        if (CoreLib.Model.DeviceConfig.isDesktop) {
            wid = CoreLib.Model.GameConfig.gameWidth;
            ht = CoreLib.Model.GameConfig.gameHeight;
        }

        console.log("Funhouse - " + CoreLib.Model.GameConfig.coreVersion + "__Game Version: " + CoreLib.Model.GameConfig.gameAssetVersions[CoreLib.Model.GameConfig.gameId]);
        this.gameApp = new PIXI.Application(wid, ht, {
            backgroundColor: CoreLib.Model.GameConfig.gameBGColor,
            resolution: CoreLib.Model.DeviceConfig.appResolution,
            antialias: true,
            transparent: true,
            //roundPixels : false,
            autoResize: true
        });

        globalThis.__PIXI_APP__ = this.gameApp;

        document.getElementById('gameStage').appendChild(this.gameApp.view);

        PIXI.settings.FILTER_RESOLUTION = CoreLib.Model.DeviceConfig.appResolution;
        CoreLib.View.setPixiApp(this.gameApp)
        CoreLib.View.createView(this.gameApp.stage);
        CoreLib.EventHandler.setScope(this.gameApp.stage);
        this.addEventListeners();

        if (CoreLib.Model.GameConfig.debugMode) {
            stats = new Stats();
            document.body.appendChild(stats.domElement);
            stats.domElement.style.position = "absolute";
            stats.domElement.style.top = "0px";
        }
        requestAnimationFrame(this.animate.bind(this));
        window.addEventListener("orientationchange", this.onOrientationChange.bind(this));
        window.addEventListener("resize", this.onWindowResize.bind(this));
        document.addEventListener('visibilitychange', this.onFocusChange.bind(this), false);
        document.addEventListener('fullscreenchange', this.exitHandler.bind(this), false);
        document.addEventListener('mozfullscreenchange', this.exitHandler.bind(this), false);
        document.addEventListener('MSFullscreenChange', this.exitHandler.bind(this), false);
        document.addEventListener('webkitfullscreenchange', this.exitHandler.bind(this), false);

        let that = this;
        window.getReelSize = function () {
            return {width : CoreLib.Model.GameConfig.reelWidth, height : CoreLib.Model.GameConfig.reelHeight}
        }
        window.getCommonAssetPath = function () {
            return CoreLib.Model.GameConfig.commonAssetPath;
        }
        window.getGameAssetPath = function() {
            return CoreLib.Model.GameConfig.gameAssetPath;
        }
        window.getGameRulePath = function () {
            if (CoreLib.Model.GameConfig.isStandAlone) {
                return CoreLib.Model.GameConfig.gameAssetPath;
            } else {
                return CoreLib.Model.GameConfig.gameLangURL + CoreLib.Model.GameConfig.gameLangIds[CoreLib.Model.GameConfig.gameId] +"/";
            }

        }
        window.getCommonRulePath = function () {
            return CoreLib.Model.GameConfig.commonLangURL;
        }
        window.getGameLang = function () {
            return CoreLib.Model.GameInfo.language;
        }
        window.getPlayerInfo = function () {
            return slotModel.getPlayerInfo();
        }

        window.getBCTGameProps = function () {
            let obj = {};
            obj.betLevels = CoreLib.Model.GameInfo.betLevels;
            obj.playerBankerMaxBet = CoreLib.Model.GameConfig.playerBankerMaxBet;
            obj.superSixMaxBet = CoreLib.Model.GameConfig.superSixMaxBet;
            obj.pairMaxBet = CoreLib.Model.GameConfig.pairMaxBet;
            obj.tieMaxBet = CoreLib.Model.GameConfig.tieMaxBet;
            obj.minBet = obj.betLevels[0];
            return obj;
        }

        window.getGameProps = function () {
            let obj = {};
            obj.rtp = slotModel.getGameRTP();
            obj.minBet = slotModel.getMinBet();
            obj.maxBet = slotModel.getMaxBet();
            return obj;
        }

        // (window).__PIXI_INSPECTOR_GLOBAL_HOOK__ &&
        // (window).__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });

        this.isVideoStarted = false;

        this.onWindowResize();
    }

    createVideoElement () {

        if (CoreLib.Model.DeviceConfig.isDevice && !this.isVideoStarted) {
            this.isVideoStarted = true;
            let noSleep = new NoSleep();
            noSleep.enable();
        }
    }

    addEventListeners () {
        CoreLib.EventHandler.addEventListener(CoreLib.AppEvents.SOUNDS_LOADING_PREGRESS, this.soundLoadingProgress.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.AppEvents.SOUNDS_LOADING_COMPLETE, this.onSoundLoadComplete.bind(this));

        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.STAKE_CHANGE, this.onStakeChange.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SPIN_CLICKED, this.onSpinClicked.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.BET_CLICKED, this.onBetClicked.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.AUTOSPIN_CLICKED, this.onAutoSpinClicked.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.STOP_AUTOSPIN, this.onAutoStopClicked.bind(this));

        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.REELSPIN_COMPLETED, this.onReelSpinCompleted.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.REMOVE_PRELOADER, this.onRemovePreloaderCall.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.EXIT_SPINWIN_SYMBOL, this.exitSpinWinSymbol.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.EXIT_SPINWIN_AMOUNT, this.exitSpinWinAmount.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.EXIT_LINE_WIN, this.exitLineWin.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.CLEAR_WIN_ANIMS, this.clearWinAnimations.bind(this));

        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.AUTOSPIN_SELECTED, this.onAutospinSelection.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.STOP_SPIN_CLICKED, this.onStopSpinClicked.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.GAME_START_CLICKED, this.onGameStartClicked.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.GAME_START_CLICKED_SKIPPED, this.onGameStartClickedSkipped.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SHOW_PAYTABLE, this.showPaytable.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.DESKTOP_SETTINGS_CLICKED, this.showDesktopSettings.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SELECT_BONUS_OPTION_SELECTED, this.onSelectBonusOptionSelected.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.NOTIFY_BONUS_ROUND_END, this.onNotifyBonusRoundEnd.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.NOTIFY_FS_ENTRY_SHOWN, this.onNotifyFSEntryShown.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.DO_FULLSCREEN, this.onDoFullScreen.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.DO_GAME_FULLSCREEN, this.doFullScreen.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.BUY_BONUS_CLICKED, this.onBuyBonusClicked.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.IOS_SOUND_YES_CLICKED, this.onSoundYesClick.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.IOS_SOUND_NO_CLICKED, this.onSoundNoClick.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.TG_BUTTON_CLICKED, this.onTGButtonsClicked.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.TOURNAMENT_ICON_CLICKED, this.showTournamentPopup.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.FIVEOAK_WIN_COMPLETED, this.onFiveOfAKindCompleted.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.WINDOW_RESIZE, this.onWindowResize.bind(this));
        this.settingsShownState = false;

    }
    showTournamentPopup () {
        //window.loadTournamentUI();
    }
    showPrizePopup() {
        //CoreLib.EventHandler.dispatchEvent("SHOW_PRIZE_POPUP");
    }
    showDailyWins () {
        // window.loadDailyWins();
        // this.gameForTourneyReady = true;
        // this.callTournamentUpdate();
    }
    onPanelLoaded() {
        // this.panelLoaded = true;
        // this.callTournamentUpdate();
    }
    callTournamentUpdate() {
        // if (this.panelLoaded && this.gameForTourneyReady) {
        //     window.getTournamentInfo("fafafa", this.onTournamentDataReceived.bind(this));
        // }

    }
    onTournamentDataReceived (obj) {
        //CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.TOURNAMENT_PRIZE_UPDATE, obj);
    }
    showPaytable () {
        window.loadGameRulesPanel();
    }

    showDesktopSettings () {
        // this.checkForNextFreespin();
        // return;
        this.settingsShownState = this.settingsShownState ? false : true;
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_DESKTOP_SETTINGS, this.settingsShownState);
    }

    onStakeChange (factor) {
        this.cleanUpGame(true);
        slotModel.updateBetPosition(factor);
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.UPDATE_BET_VALUE);
    }

    onBetClicked () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_BET_SELECTION_DIALOGUE, true);
    }
    onAutoSpinClicked () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_AUTOSPIN_DIALOGUE, true);

    }
    onAutoStopClicked () {
        slotModel.resetAutoplayData();
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.UPDATE_UI_FOR_AUTOSPIN_END);
    }
    onAutospinSelection (obj) {
        slotModel.setAutoplayInfo(obj);
        this.startAutoSpin();
    }
    endAutospin() {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.UPDATE_UI_FOR_AUTOSPIN_END);
        if (slotModel.getTotalWin() > 0) {
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.ENTER_SPINWIN_STATE);
        }
        this.checkToActivateGame();
    }
    startAutoSpin () {
        if (!slotModel.isAutospinStartPossible()) {
            slotModel.resetAutoplayData();
            this.endAutospin();
            this.showLowBalanceError();
            return;
        }
        this.playNextAutoSpin();
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.UPDATE_AUTOSPIN_COUNT, slotModel.getAutoSpinRemainingCount());
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.UPDATE_UI_FOR_AUTOSPIN_START);
    }
    playNextAutoSpin () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.UPDATE_AUTOSPIN_COUNT, slotModel.getAutoSpinRemainingCount());
        this.onSpinClicked(false);
    }
    onStopSpinClicked () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.STOP_SPIN_IMMEDIATELY);
    }
    onSelectBonusOptionSelected (selection) {
        CoreLib.WrapperService.requestBonusData(slotModel.getFeatureType(), slotModel.getBonusOptionName(selection));
    }
    onDoFullScreen () {
        if (this.isFullScreen) {
            this.onFullScreenExitClick();
        } else {
            this.doFullScreen();
        }
    }
    onTGButtonsClicked () {
        if (!this.isUserInteracted) {
            this.loadSoundForIOSNow();
        }
    }
    onSpinClicked (isUserClicked = true) {
        if (!this.isUserInteracted) {
            this.loadSoundForIOSNow();
        }
        if (CoreLib.Model.DeviceConfig.isDevice) {
            if (CoreLib.Model.DeviceConfig.isIOSDevice) {
                if (isUserClicked) {
                    this.doFullScreen();
                }
            } else {
                this.doFullScreen();
            }
        }
        if (slotModel.getBalance() >= slotModel.getTotalBet()) {
            this.spinWinSymbolDone = false;
            this.spinWinAmountDone = false;
            CoreLib.Model.GameConfig.lineWinIndex = 0;
            this.cleanUpGame(true);
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.CLEAR_GAME_FOR_SPIN);
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.DISABLE_ALL_BUTTONS);
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.START_SLOT_SPIN);
            slotModel.clearFeatureData();
            this.scatterCheck = false;
            CoreLib.WrapperService.requestSpinResult(false);
        } else {
            this.showLowBalanceError();
        }

    }
    onReelSpinCompleted () {
        this.spinWinStateExited = false;
        let flag = this.checkPreWinFeature();
        if (!flag) {
            this.onPreWinFeatureCompleted();
        }

    }
    checkPreWinFeature () {
        return false;
    }
    onPreWinFeatureCompleted () {
        if (slotModel.getSpinWin() > 0 || slotModel.isFeatureTriggerPositionsAvailable()) {
            slotModel.setAutoPlayWin(slotModel.getTotalWin());
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.ENTER_SPINWIN_STATE);
            this.checkToActivateGame();
        } else {
            this.exitSpinWinState();
        }
    }

    onFiveOfAKindCompleted() {
        if (!slotModel.isFeatureTriggered() && !slotModel.getIsAutoSession() && !slotModel.getIsFreespinSession()) {
            //if(CoreLib.Model.GameConfig.dontCountUp || slotModel.getWinLevel() == 0) {
            if(slotModel.getWinLevel() == 0) {
                this.activateControls();
            }
        }
    }

    checkToActivateGame () {
        if (!slotModel.isFeatureTriggered() && !slotModel.getIsAutoSession() && !slotModel.getIsFreespinSession()) {
            //if(CoreLib.Model.GameConfig.dontCountUp || slotModel.getWinLevel() == 0) {
            if(slotModel.getWinLevel() == 0 && !slotModel.getFiveOfAKindWin().isTriggered) {
                this.activateControls();
            }
        }
    }
    activateControls () {
        if (!this.scatterCheck) {
            const scatterCount = slotModel.getScatterCount();
            this.scatterCheck = true;
            CoreLib.WrapperService.requestScatterPrize(scatterCount, slotModel.getRoundId())
        }

        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.ACTIVATE_GAME);
    }
    exitSpinWinSymbol () {
        this.spinWinSymbolDone = true;
        this.checkToExitSpinWin();
    }
    exitSpinWinAmount () {
        this.spinWinAmountDone = true;
        this.checkToExitSpinWin();
    }
    checkToExitSpinWin () {
        if (this.spinWinSymbolDone && this.spinWinAmountDone) {
            this.exitSpinWinState();
        }
    }
    exitSpinWinState() {
        slotModel.onSpinEnd();
        if (!slotModel.isFreeSpinSession) {
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.UPDATE_BALANCE);
        }
        this.cleanUpGame();
        this.spinWinStateExited = true;
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.EXIT_SPINWIN_STATE);
        this.checkForFeatureGame();
    }
    cleanUpGame(fromButton = false) {
        if (fromButton) {
            this.settingsShownState = false;
            //CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_DESKTOP_SETTINGS, this.settingsShownState);
        }
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_DESKTOP_SETTINGS, false);
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.CLEAR_ALL_WIN, fromButton);
    }
    clearWinAnimations () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.CLEAR_ALL_WIN);
    }
    checkForFeatureGame () {
        if (slotModel.isFeatureTriggered()) {
            slotModel.setAutoFeatureTriggered();
            if (slotModel.getIsFreespinSession()) {
                this.checkForNextFreespin();
            } else {
                this.triggerFeatureGame();
            }
        } else {
            if (slotModel.getIsFreespinSession()) {
                this.endFreeSpinSession();
                return;
            }
            this.checkForAutoSpin();
        }
    }
    checkForNextFreespin () {
        if (slotModel.isNextFreespinPossible()) {
            this.playNextFreespin();
        }
    }
    triggerFeatureGameCore () {
        CoreLib.Util.vibrateForFeature();
    }
    triggerFeatureGame () {
        // can be overwritten in game level
        this.triggerFeatureGameCore();
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_DESKTOP_SETTINGS, false);
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_BONUS_TRIGGERING_ANIM);
        setTimeout(this.stopTriggeringWin.bind(this), 1500);
    }

    stopTriggeringWin () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.CLEAR_TRIGGERING_ANIM);
        this.showBonusTriggerEnterPopup();
    }

    showBonusTriggerEnterPopup() {
        if (slotModel.getFeatureType() == CoreLib.Model.GameConfig.featureTypes.select) {
            let msgObj = {};
            msgObj.title = CoreLib.Util.getContent("congratText");
            msgObj.message1 = CoreLib.Util.getContent("enteringText");
            msgObj.message2 = CoreLib.Util.getContent("bonusgameText");
            msgObj.callbankFunc = this.onBonusEnterDoneClicked.bind(this);
            msgObj.bgType = 1;
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_MESSAGE_POPUP, msgObj);
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.INITIATE_BONUS_ROUND);
        } else if (slotModel.getFeatureType() == CoreLib.Model.GameConfig.featureTypes.freespins) {
            this.startFreespins();
        } else if (slotModel.getFeatureType() == 2) {
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.TRIGGER_FEATURE);
        }
    }
    onBonusEnterDoneClicked () {
        if (slotModel.getFeatureType() == CoreLib.Model.GameConfig.featureTypes.select) {
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_SELECT_BONUS);
        }
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.HIDE_MESSAGE_POPUP);
    }

    onNotifyBonusRoundEnd () {
        slotModel.clearFeatureData();
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.UPDATE_BALANCE);
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.HIDE_BONUS_ROUND);
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.HIDE_MESSAGE_POPUP);
        this.checkForFeatureGame();
    }

    onNotifyFSEntryShown () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.HIDE_BONUS_ROUND);
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.HIDE_MESSAGE_POPUP);
        this.startFreespins();
    }

    startFreespins () {
        slotModel.setFreespinSession(true);
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_FREEGAME_BG);
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.UPDATE_UI_FOR_FS_START);
        this.playNextFreespin();
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.START_FREESPIN_BG_MUSIC);
    }
    endFreeSpinSession () {
        slotModel.setFreespinSession(false);
        let totalfswin = CoreLib.WrapperService.formatCurrency(slotModel.getTotalFreespinWin());
        let msgObj = {};
        msgObj.title = CoreLib.Util.getContent("congratText");
        msgObj.message1 = CoreLib.Util.getContent("freespinWinText1");
        let arr = [totalfswin];
        let str = CoreLib.Util.parseMessage(CoreLib.Util.getContent("fromFSWin"), arr);
        msgObj.message2 = str;
        msgObj.bgType = 2;
        msgObj.callbankFunc = this.endFreespinRoundFromPopup.bind(this);
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_MESSAGE_POPUP, msgObj);
        //this.checkForFeatureGame();
    }
    endFreespinRoundFromPopup () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.HIDE_MESSAGE_POPUP);
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.UPDATE_BALANCE);
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.UPDATE_UI_FOR_FS_END);
        let flag = this.checkFSExitGameLevel();
        if (flag) {
            this.continueToMGAfterFS();
        }
    }

    continueToMGAfterFS () {

        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.STOP_FREESPIN_BG_MUSIC);
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.START_MAINGAME_BG_MUSIC);
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_MAINGAME_BG);
        if (slotModel.getIsAutoSession()) {
            this.checkForAutoSpin();
        } else {
            this.activateControls();
            //CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_FREESPIN_BIG_WIN);
        }
    }

    checkFSExitGameLevel () {
        return true;
    }

    onBuyBonusClicked (bet) {
        let msgObj = {};
        msgObj.title = CoreLib.Util.getContent("buyFreeSpinText");
        msgObj.message1 = CoreLib.WrapperService.formatCurrency(bet);
        msgObj.callbankFunc = this.onBuyBonusConfirmation.bind(this);
        msgObj.cancelCallbackFunc = this.onBuyBonusCancel.bind(this);
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_BUYBONUS_POPUP, msgObj);

    }
    onBuyBonusCancel () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.HIDE_BUYBONUS_POPUP);
    }
    onBuyBonusConfirmation () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.HIDE_BUYBONUS_POPUP);
        if (slotModel.getBalance() >= slotModel.getTotalBet() * CoreLib.Model.GameConfig.buyBonusBetMultiplier) {
            this.spinWinSymbolDone = false;
            this.spinWinAmountDone = false;
            CoreLib.Model.GameConfig.lineWinIndex = 0;
            this.cleanUpGame(true);
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.CLEAR_GAME_FOR_SPIN);
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.DISABLE_ALL_BUTTONS);
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.START_SLOT_SPIN);
            slotModel.setBuyBonus(true);
            this.scatterCheck = false;
            CoreLib.WrapperService.requestSpinResult(true);
        } else {
            this.showLowBalanceError();
        }
    }
    showLowBalanceError () {

        let msgObj = {};
        msgObj.title = CoreLib.Util.getContent("errorText");
        msgObj.message = CoreLib.Util.getContent("lowBalanceText");
        msgObj.callbankFunc = this.closeErrorPoppup.bind(this);
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_ALERT_POPUP, msgObj);

    }
    closeErrorPoppup () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.HIDE_ALERT_POPUP);
        this.activateControls();
    }

    playNextFreespin() {
        this.spinWinSymbolDone = false;
        this.spinWinAmountDone = false;
        CoreLib.Model.GameConfig.lineWinIndex = 0;
        this.cleanUpGame(true);
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.CLEAR_GAME_FOR_SPIN);
        if (slotModel.getFeatureData().retrigger && !slotModel.isUnfinishedGame()) {
            let msgObj = {};
            msgObj.title = CoreLib.Util.getContent("congratText");
            msgObj.message1 = CoreLib.Util.getContent("freespinWinText1");
            let count = slotModel.getFeatureData().retriggerCount;
            let arr = [count];
            let str = CoreLib.Util.parseMessage(CoreLib.Util.getContent("retriggerMsg"), arr);
            msgObj.message2 = str;
            msgObj.callbankFunc = this.onRetriggerYesClicked.bind(this);
            msgObj.bgType = 1;
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_MESSAGE_POPUP, msgObj);
            return;
        }
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.UPDATE_UI_FOR_FS_ROUNDS);
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.START_SLOT_SPIN);
        CoreLib.WrapperService.requestBonusData(slotModel.getCurrentBonusName());

    }
    onRetriggerYesClicked () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.HIDE_MESSAGE_POPUP);
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.UPDATE_UI_FOR_FS_ROUNDS);
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.START_SLOT_SPIN);
        CoreLib.WrapperService.requestBonusData(slotModel.getCurrentBonusName());
    }

    checkForAutoSpin () {
        if (slotModel.getIsAutoSession()) {
            slotModel.increatementAuto();
            let valid = slotModel.getNextAutoPossible();
            if (valid == 1) {
                if (slotModel.isAutospinStartPossible()) {
                    if (CoreLib.Model.GameConfig.isTurboOn) {
                        setTimeout(this.playNextAutoSpin.bind(this), 0);
                    } else {
                        setTimeout(this.playNextAutoSpin.bind(this), 500);
                    }
                } else {
                    slotModel.resetAutoplayData();
                    this.endAutospin();
                    this.showLowBalanceError();
                }
            } else {
                slotModel.resetAutoplayData();
                this.endAutospin();
                this.showError(valid);

            }
        } else {
            if(slotModel.getWinLevel() == 0) {
                this.activateControls();
                this.enterLineWin();
            } else if (slotModel.getWinLevel() > 0 && this.spinWinStateExited) {
                this.activateControls();
                this.enterLineWin();
            }

        }
    }
    enterLineWin () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_LINE_WIN);
    }
    exitLineWin () {
        CoreLib.Model.GameConfig.lineWinIndex++;
        if (CoreLib.Model.GameConfig.lineWinIndex > slotModel.getWinLines().length - 1) {
            CoreLib.Model.GameConfig.lineWinIndex = 0;
        } else {

        }
        this.enterLineWin();

    }

    refreshWindow () {
        location.reload();
    }
    closeWindow () {
        window.close();
    }

    showError (str) {

    }


    checkForRGSError (data, msgName) {
        // validate and check if any server side checks need to be done
        //this.showAlert("this is title", "there is no error in rgs", this.onServerErrorOKClicked.bind(this), this.onServerErrorCancelClicked.bind(this));
        if (data.error != undefined && data.error.length > 0) {
            if (msgName == "bctBetResponse" || msgName == "bctUndoResponse") {
                this.showBetError(CoreLib.Util.getContent("errorText"), data.error, this.onServerErrorInternalOKClicked.bind(this), this.onServerErrorCancelClicked.bind(this), true);
            } else {
                this.showAlert(CoreLib.Util.getContent("errorText"), data.error, this.onServerErrorOKClicked.bind(this), this.onServerErrorCancelClicked.bind(this));
            }
            slotModel.setDefaultReel();
            if (slotModel.getIsAutoSession()) {
                slotModel.resetAutoplayData();
                this.endAutospin();
            }

            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.STOP_SPIN_FOR_ERROR);

            return false;
        }
        if (data.playerInfo && data.playerInfo.error != undefined && data.playerInfo.error.length > 0) {
            if (msgName == "bctBetResponse") {
                this.showBetError(CoreLib.Util.getContent("errorText"), data.playerInfo.description, this.onServerErrorInternalOKClicked.bind(this), this.onServerErrorCancelClicked.bind(this), true);
            } else {
                this.showAlert(CoreLib.Util.getContent("errorText"), data.playerInfo.description, this.onServerErrorOKClicked.bind(this), this.onServerErrorCancelClicked.bind(this));
            }
            slotModel.setDefaultReel();
            if (slotModel.getIsAutoSession()) {
                slotModel.resetAutoplayData();
                this.endAutospin();
            }
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.STOP_SPIN_FOR_ERROR);
            this.onResize();
            return false;
        }
        return true;
    }
    onServerErrorInternalOKClicked () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.HIDE_ALERT_POPUP);
    }
    onServerErrorOKClicked () {
        this.refreshWindow();
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.HIDE_ALERT_POPUP);

    }
    onServerErrorCancelClicked () {
        this.refreshWindow();
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.HIDE_ALERT_POPUP);
    }
    onSocketMessage (data) {
        this.handleBaccaratResponse(data);
    }

    showBetError (title, message, okcallback, cancelcallback, isSmallPopup = false) {
        CoreLib.EventHandler.dispatchEvent("SHOW_BCT_BET_ERROR", message)
    }
    showAlert (title, message, okcallback, cancelcallback, isSmallPopup = false) {
        let obj = {};
        obj.title = title;
        obj.message = message;
        obj.okCallback = okcallback;
        obj.cancelCallback = cancelcallback;
        obj.isPopup = isSmallPopup;
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_ALERT_POPUP, obj);
    }
    onServerResponse (msgName, data) {
        if (msgName == "gameinit") {
            this.gameinitMsg = data;
            this.gameinitMsgName = msgName;
        }
        let flag = this.checkForRGSError(data, msgName);
        console.log(msgName, data)
        switch (msgName) {
            case "gameinit" :
                this.handleGameInit(data);
                break;
            case "spinresult" :
                if (flag) {
                    this.handleSpinResult(data);
                }
                break;
            case "featureResult" :
                if (flag) {
                    this.handleFeatureResult(data);
                }
                break;
            case "specialResult":
                if (flag) {
                    this.handleSpecialResult(data);
                }
                break;
            case "bctBetResponse" :
                if (flag) {
                    this.handleBCTBetResponse(data);
                }
                break;
            case "bctUndoResponse" :
                if (flag) {
                    this.handleBCTUndoResponse(data);
                    break;
                }
            case "bctHistory" :
                if (flag) {
                    this.handleBCTHistory(data);
                    break;
                }
            case "userBalance" :
                this.handleBalanceResponse(data);
                break;
            default :
                break;
        }


    }
    onServerTimeout () {

    }

    handleGameInit (data) {
        slotModel.parseGameInit(data);
        this.gameInitReceived = true;
        this.loadConfigAfterInit();
        //this.checkToCreateGame();
    }
    handleGameLevelSpinResponseData() {

    }
    handleSpinResult (data) {
        slotModel.parseSpinResult(data);
        this.handleGameLevelSpinResponseData();
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SPIN_RESPONSE_RECEIVED);
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.UPDATE_BETDEDUCTED_BALANCE);
        slotModel.setServerBalance();
        if (CoreLib.Model.GameConfig.isTurboOn) {
            this.startStoppingReels();
        } else {
            setTimeout(this.startStoppingReels.bind(this), 200);
        }
    }
    handleFeatureResult (data) {
        slotModel.parseFeatureResult(data);
        if (slotModel.getIsFreespinSession()) {
            setTimeout(this.startStoppingReels.bind(this), 250);
        } else {
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.HANDLE_FEATURE_RESPONSE_IN_GAME)
        }
        slotModel.setBuyBonus(false);
    }
    handleSpecialResult (data) {
        slotModel.parseFeatureResult(data);
        if (slotModel.getIsFreespinSession()) {
            setTimeout(this.startStoppingReels.bind(this), 250);
        } else {
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.HANDLE_FEATURE_RESPONSE_IN_GAME)
        }
        slotModel.setBuyBonus(false);
    }
    handleBalanceResponse (data) {
        slotModel.handleBalanceUpdate(data);
    }
    handleBCTBetResponse (data) {
        slotModel.parseBCTBetResponse(data);
        CoreLib.EventHandler.dispatchEvent("BCT_BET_PLACED");
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.UPDATE_BALANCE);

    }
    handleBCTUndoResponse (data) {
        slotModel.parseBCTUndoResponse(data);
        CoreLib.EventHandler.dispatchEvent("BCT_UNDO_RECEIVED");
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.UPDATE_BALANCE);
    }
    handleBCTHistory (data) {
        slotModel.parseBCTHistoryData(data);
        CoreLib.EventHandler.dispatchEvent("BCT_HISTORY_RECEIVED");

    }
    startStoppingReels () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.START_STOPPING_REELS);
    }

    onFocusChange () {
        if(document.visibilityState === 'hidden'){
            CoreLib.SoundFactory.muteAllSounds(true);
            CoreLib.EventHandler.dispatchEvent(CoreLib.AppEvents.ON_FOCUS_CHANGE, false);
            this.gameApp.stop();
        } else if(document.visibilityState === 'visible'){
            CoreLib.EventHandler.dispatchEvent(CoreLib.AppEvents.ON_FOCUS_CHANGE, true);
            this.gameApp.start();
            CoreLib.SoundFactory.unmuteAllSounds(true);
        }
    }

    handleBaccaratResponse (data) {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.HANDLE_BACCARAT_SOCKET_MESSAGE, data);
    }

    onOrientationChange () {

    }

    onWindowResize() {
        clearTimeout(this.intervalId);
        //this.resizeCanvas();
        this.intervalId = setTimeout(this.resizeCanvas.bind(this), 0);

    }

    onHandleSwipe() {
        if (CoreLib.Model.DeviceConfig.isIOSDevice) {
            let swipeLayer = document.getElementById('swipe-layer');
            let innerHeight = window.innerHeight;
            let outerHeightLandscape = screen.width;
            let outerHeightPortrait = document.body.clientHeight;
            let outerHeight = outerHeightPortrait;
            if (navigator.userAgent.match('CriOS')) {
                outerHeightLandscape = document.body.clientHeight;
            }
            if (innerHeight < window.innerWidth) {
                outerHeight = outerHeightLandscape;
                $('#swipe-layer .swipe-object').css("margin-top", "0")
            } else {
                document.body.style.height = '100vh';
                $('#swipe-layer .swipe-object').css("margin-top", "40%")
            }
            if (innerHeight < outerHeight) {
                swipeLayer.style.visibility = "visible";
                swipeLayer.style.height = innerHeight * 2.5 + "px";
                document.body.style.overflow = "auto";
                document.documentElement.style.overflow = "auto";
                $('#swipe-layer .swipe-object').css("animation", "MoveUpDown 1.5s linear infinite")
                if (navigator.userAgent.match('CriOS')) {
                    swipeLayer.style.height = innerHeight * 2 + "px";
                    window.scrollTo(0, window.innerHeight);
                } else {
                    window.scrollTo(0, 0);
                }
                // window.scrollTo(0, 0);
            } else {
                if (swipeLayer.style.visibility == "visible") {
                    swipeLayer.style.visibility = "hidden";
                    document.body.style.overflow = "hidden";
                    document.documentElement.style.overflow = "hidden";
                    let canvasElem = document.getElementsByTagName("canvas")[0];
                    canvasElem.style.position = "fixed";
                    canvasElem.style.top = "0";
                    $('#swipe-layer .swipe-object').css("animation", "none")
                    document.getElementById('swipe-layer').scrollTo(0, 0);
                    document.body.scrollTop = 0;
                    setTimeout(this.resizeCanvas.bind(this), 0);
                }
            }
        }
    }

    resizeCanvas() {
        this.readDeviceParams();
        this.gameApp.renderer.resize(CoreLib.Model.DeviceConfig.windowWidth * CoreLib.Model.DeviceConfig.appResolution, CoreLib.Model.DeviceConfig.windowHeight * CoreLib.Model.DeviceConfig.appResolution);
        this.onResize();
        this.handleCanvasResolution();
        this.onHandleSwipe();
    }
    handleCanvasResolution() {
        var canvasElem = document.getElementsByTagName("canvas")[0];
        canvasElem.style.width = CoreLib.Model.DeviceConfig.windowWidth + "px";
        canvasElem.style.height = CoreLib.Model.DeviceConfig.windowHeight + "px";
    }
    onResize () {
        this.stageScale = 1;
        CoreLib.EventHandler.dispatchEvent(CoreLib.AppEvents.RESIZE_START);
        this.notifyResizeComps();
        //setTimeout(this.notifyResizeComps.bind(this), 0)
    }
    notifyResizeComps () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.AppEvents.RESIZE_COMPS);
        //setTimeout(this.notifyResizeEnd.bind(this), 0);
        this.notifyResizeEnd();
    }

    notifyResizeEnd () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.AppEvents.RESIZE_END);

    }


    animate(time) {
        if (stats) {
            stats.begin();
        }
        this.refreshView(time);

        if (stats) {
            stats.end();
        }
        requestAnimationFrame(this.animate.bind(this));
    }

    refreshView (time) {
        let delta = (time - this.elapsedTime) / (1000 / this.fps);
        CoreLib.EventHandler.dispatchEvent(CoreLib.AppEvents.REFRESH_VIEW, delta);
        this.elapsedTime = time;
    }






    // device and orientation
    readDeviceParams() {
        ratio = window.devicePixelRatio > 1 ? 2 : window.devicePixelRatio;
        CoreLib.Model.DeviceConfig.windowWidth =   window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        CoreLib.Model.DeviceConfig.windowHeight =  window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        CoreLib.Model.DeviceConfig.isIOSDevice = isMobile.apple.device;
        CoreLib.Model.DeviceConfig.isIOSMobile = isMobile.apple.phone;
        CoreLib.Model.DeviceConfig.isTablet = isMobile.tablet;

        CoreLib.Model.DeviceConfig.isDesktop = this.isDesktop();
        CoreLib.Model.DeviceConfig.isMobile = isMobile.phone;
        CoreLib.Model.DeviceConfig.isDevice = CoreLib.Model.DeviceConfig.isMobile || CoreLib.Model.DeviceConfig.isTablet;

        CoreLib.Model.DeviceConfig.isIE11 = false;
        CoreLib.Model.DeviceConfig.isLandscape = false;
        CoreLib.Model.DeviceConfig.isPortrait = false;
        CoreLib.Model.DeviceConfig.orientation = this.checkOrientation();
        //if (CoreLib.Model.DeviceConfig.isMobile || CoreLib.Model.DeviceConfig.isTablet) {
            if (CoreLib.Model.DeviceConfig.orientation === 1) {
                CoreLib.Model.DeviceConfig.isLandscape = true;
                CoreLib.Model.DeviceConfig.scaleFactor = CoreLib.Model.DeviceConfig.windowWidth / CoreLib.Model.DeviceConfig.windowHeight;
            } else {
                CoreLib.Model.DeviceConfig.isPortrait = true;
                CoreLib.Model.DeviceConfig.scaleFactor = CoreLib.Model.DeviceConfig.windowHeight / CoreLib.Model.DeviceConfig.windowWidth;
            }
        //}

        var ratio = 1;
        if (CoreLib.Model.DeviceConfig.isDesktop) {
            ratio = 1;
        } else {
            ratio = window.devicePixelRatio;
        }

        CoreLib.Model.DeviceConfig.pixelRatio = ratio > 2 ? 2 : ratio;
        CoreLib.Model.DeviceConfig.fontFactor = window.devicePixelRatio;
        CoreLib.Model.DeviceConfig.pixelRatioString = "@" + CoreLib.Model.DeviceConfig.pixelRatio + "x";
        CoreLib.Model.DeviceConfig.appResolution = ratio; //CoreLib.Model.DeviceConfig.pixelRatio;
        //CoreLib.Model.DeviceConfig.assetResolution = CoreLib.Model.DeviceConfig.isDesktop ? "@1xd" : CoreLib.Model.DeviceConfig.pixelRatioString;
        CoreLib.Model.DeviceConfig.assetResolution = "@0.5x" // to do for mobile diff res;

        if (CoreLib.Model.DeviceConfig.isDesktop || CoreLib.Model.DeviceConfig.isTablet) {
            CoreLib.Model.DeviceConfig.assetResolution = "@1x";

            // CoreLib.Model.GameConfig.gameWidth = CoreLib.Model.GameConfig.gameFHDWidth;
            // CoreLib.Model.GameConfig.gameHeight = CoreLib.Model.GameConfig.gameFHDHeight;
            //
            // CoreLib.Model.DeviceConfig.gameWidth = CoreLib.Model.GameConfig.gameWidth;
            // CoreLib.Model.DeviceConfig.gameHeight = CoreLib.Model.GameConfig.gameHeight;
            // if (CoreLib.Model.DeviceConfig.isTablet) {
            //     CoreLib.Model.DeviceConfig.gameWidth = CoreLib.Model.DeviceConfig.windowWidth * CoreLib.Model.DeviceConfig.appResolution;
            //     CoreLib.Model.DeviceConfig.gameHeight = CoreLib.Model.DeviceConfig.windowHeight * CoreLib.Model.DeviceConfig.appResolution;
            // }
        } else {
            // CoreLib.Model.DeviceConfig.gameWidth = CoreLib.Model.DeviceConfig.windowWidth * CoreLib.Model.DeviceConfig.appResolution;
            // CoreLib.Model.DeviceConfig.gameHeight = CoreLib.Model.DeviceConfig.windowHeight * CoreLib.Model.DeviceConfig.appResolution;
        }
        CoreLib.Model.DeviceConfig.gameWidth = CoreLib.Model.DeviceConfig.windowWidth * CoreLib.Model.DeviceConfig.appResolution;
        CoreLib.Model.DeviceConfig.gameHeight = CoreLib.Model.DeviceConfig.windowHeight * CoreLib.Model.DeviceConfig.appResolution;

    }
    isDesktop() {
        return (!isMobile.phone && !isMobile.tablet);
    }
    checkOrientation() {
        var wid = CoreLib.Model.DeviceConfig.windowWidth;
        var ht = CoreLib.Model.DeviceConfig.windowHeight;
        if (wid === undefined) {
            wid = window.innerWidth;
        }
        if (ht === undefined) {
            ht = window.innerHeight;
        }
        if (typeof (wid) != "number") {
            wid = Number(wid);
        }
        if (typeof (ht) != "number") {
            ht = Number(ht);
        }
        var o = 1;
        if (ht > wid) {
            o = 2;
        }
        return o;
    }




    doFullScreen() {
        if (!this.isFullScreen) {
            var elem = document.getElementsByTagName("body")[0];
            if (elem) {
                if (elem.requestFullscreen) {
                    try {
                        elem.requestFullscreen();
                    } catch (e) {

                    }
                } else if (elem.webkitRequestFullscreen) { /* Safari */
                    try {
                        elem.webkitRequestFullscreen();
                    } catch (e) {

                    }
                } else if (elem.msRequestFullscreen) { /* IE11 */
                    try {
                        elem.msRequestFullscreen();
                    } catch (e) {

                    }
                }
            }

            //setTimeout(this.callToResizeCanvas.bind(this), 0);
        }

    }
    exitHandler () {
        if (document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement !== null) {
            if (this.isFullScreen) {
                this.isFullScreen = false;
            } else {
                this.isFullScreen = true;
            }
            setTimeout(this.onWindowResize.bind(this), 0);
        } else {
        }

    }

    onFullScreenExitClick() {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
    // --------------------------------------------- game flow ---------------------------

    callToResizeCanvas () {
        this.onWindowResize();

    }

    createScaleProps () {
        Object.defineProperties(PIXI.Sprite.prototype, {
            scaleX: {
                get: function () {
                    return this.scale.x;
                },
                set: function (v) {
                    this.scale.x = v;
                }
            },
            scaleY: {
                get: function () {
                    return this.scale.y;
                },
                set: function (v) {
                    this.scale.y = v;
                }
            },
            skewX: {
                get: function () {
                    return this.skew.x;
                },
                set: function (v) {
                    this.skew.x = v;
                }
            },
            skewY: {
                get: function () {
                    return this.skew.y;
                },
                set: function (v) {
                    this.skew.y = v;
                }
            }
        })
        Object.defineProperties(PIXI.Container.prototype, {
            scaleX: {
                get: function () {
                    return this.scale.x;
                },
                set: function (v) {
                    this.scale.x = v;
                }
            },
            scaleY: {
                get: function () {
                    return this.scale.y;
                },
                set: function (v) {
                    this.scale.y = v;
                }
            },
            skewX: {
                get: function () {
                    return this.skew.x;
                },
                set: function (v) {
                    this.skew.x = v;
                }
            },
            skewY: {
                get: function () {
                    return this.skew.y;
                },
                set: function (v) {
                    this.skew.y = v;
                }
            }
        })
    }
}
