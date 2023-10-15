import {LibView} from "../../pixiwrapper/LibView";
import {CoreLib} from "../../core/CoreLib";
import {slotModel} from "../../models/SlotModel";
import { soundFactory } from '../../sound/SoundFactory'

export class SlotPanelComp extends LibView
{
    constructor(config, layoutconfig) {
        super(config, layoutconfig);
        this.panelBG = this.elementsList["panelBG"];
        this.ptPanelBG = this.elementsList["ptPanelBG"];
        this.ptPanelBG.visible = false;

        this.lsbuttonsBG = this.elementsList["lsbuttonsBG"];
        this.lsbuttonsBG.visible = false;

        this.ptbuttonsBG = this.elementsList["ptbuttonsBG"];
        this.mobileMenus = CoreLib.UIUtil.getContainer();
        this.addChild(this.mobileMenus);
        this.mobileMenus.addChild(this.ptbuttonsBG);
        this.ptPanelBG.addChild(this.mobileMenus);
        this.balanceComp = this.elementsList["balanceComp"];
        this.winComp = this.elementsList["winComp"];
        this.fsWinComp = this.elementsList["fsWinComp"];
        this.stakeComp = this.elementsList["stakeComp"];

        this.spinBtn = this.elementsList["spinBtn"];
        this.stopspinBtn = this.elementsList["stopspinBtn"];
        this.autospinBtn = this.elementsList["autospinBtn"];
        this.autoStopBtn = this.elementsList["autoStopBtn"];
        this.turboBtn = this.elementsList["turboBtn"];
        this.turboSelectedBtn = this.elementsList["turboSelectedBtn"];
        this.settingsBtn = this.elementsList["settingsBtn"];
        this.infoBtn = this.elementsList["infoBtn"];
        this.betBtn = this.elementsList["betBtn"];
        this.menuBtn = this.elementsList["menuBtn"];

        this.exitMBtn = this.elementsList["exitMBtn"];
        this.settingsMBtn = this.elementsList["settingsMBtn"]
        this.infoMBtn = this.elementsList["infoMBtn"];
        this.rulesMBtn = this.elementsList["rulesMBtn"];
        this.timeMBtn = this.elementsList["timeMBtn"];
        this.exitMBtn.setEnabled(true);
        this.settingsMBtn.setEnabled(true);
        this.infoMBtn.setEnabled(true);
        this.rulesMBtn.setEnabled(true);
        this.mobileMenus.addChild(this.ptbuttonsBG, this.exitMBtn, this.settingsMBtn, this.infoMBtn, this.rulesMBtn);

        let area = this.ptbuttonsBG.width / 4;
        let btnWidth = this.exitMBtn.width;
        CoreLib.UIUtil.setPosition(this.exitMBtn, (area - btnWidth) / 2, (this.ptbuttonsBG.height - this.exitMBtn.height) / 2);
        CoreLib.UIUtil.setPosition(this.settingsMBtn, area + (area - btnWidth) / 2, this.exitMBtn.y);
        CoreLib.UIUtil.setPosition(this.infoMBtn, area * 2 + (area - btnWidth) / 2, this.exitMBtn.y);
        CoreLib.UIUtil.setPosition(this.rulesMBtn, area * 3 + (area - btnWidth) / 2, this.exitMBtn.y);
        //CoreLib.UIUtil.setPosition(this.timeMBtn, area * 4 + (area - btnWidth) / 2, this.exitMBtn.y);

        this.spinBtn.addInteraction(this.onSpinClicked.bind(this));
        this.stopspinBtn.addInteraction(this.onStopSpinClicked.bind(this));
        this.autospinBtn.addInteraction(this.onAutoSpinClicked.bind(this));
        this.autoStopBtn.addInteraction(this.onAutoStopClicked.bind(this));
        this.betBtn.addInteraction(this.onBetClicked.bind(this));
        this.menuBtn.addInteraction(this.onMenuClicked.bind(this));
        this.infoBtn.addInteraction(this.onInfoClicked.bind(this));
        this.infoMBtn.addInteraction(this.onInfoClicked.bind(this));
        this.rulesMBtn.addInteraction(this.onInfoClicked.bind(this));
        this.settingsBtn.addInteraction(this.onSettingsClicked.bind(this));
        this.settingsMBtn.addInteraction(this.onMSettingsClicked.bind(this));


        this.turboBtn.addInteraction(this.onTurboOnClicked.bind(this));
        this.turboSelectedBtn.addInteraction(this.onTurboOffClicked.bind(this));

        this.autoCounterBG = this.elementsList["autoCounterBG"];
        this.autoCounterText = this.elementsList["autoCounterText"];
        this.autoCounterBG.addChild(this.autoCounterText);
        CoreLib.UIUtil.setPosition(this.autoCounterText, this.autoCounterBG.width / 2, this.autoCounterBG.height / 2);

        this.autoCounterBG.visible = false;
        this.autoCounterText.text = "";

        this.isFreeSpinSession = false;

        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.ACTIVATE_GAME, this.activateButtons.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SHOW_SLOTPANEL, this.showPanel.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SHOW_SLOTMACHINE_AND_PANEL, this.showPanel.bind(this));



        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SET_INITIAL_VALUES, this.setInitialValues.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.UPDATE_BET_BALANCE, this.updateBetBalance.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.UPDATE_BALANCE, this.updateBalance.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.UPDATE_BETDEDUCTED_BALANCE, this.updateBalanceForBetDeduction.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.UPDATE_BET_VALUE, this.updateBet.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.DISABLE_ALL_BUTTONS, this.disableButtons.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.ENTER_SPINWIN_STATE, this.enterSpinWinState.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SHOW_LINE_WIN, this.showLineWin.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.CLEAR_GAME_FOR_SPIN, this.clearGameForSpin.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.UPDATE_UI_FOR_AUTOSPIN_START, this.updateUIForAutospinStart.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.UPDATE_UI_FOR_AUTOSPIN_END, this.updateUIForAutospinEnd.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.UPDATE_AUTOSPIN_COUNT, this.updateUIForAutospinCount.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SPIN_RESPONSE_RECEIVED, this.onSpinResponseReceived.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.HIDE_SPINSTOP_BUTTON, this.hideStopSpin.bind(this));

        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.UPDATE_UI_FOR_FS_START, this.updateUIForFSStart.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.UPDATE_UI_FOR_FS_END, this.updateUIForFSEnd.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.UPDATE_UI_FOR_FS_ROUNDS, this.updateUIForFSRounds.bind(this));
        this.winComp.updateWin(0);
        this.onTurboOffClicked();
        this.updateUIForFSEnd();
        this.updateUIForAutospinEnd();


        this.addKeyEvent();

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
    }

    addKeyEvent () {
        let that = this;
        $(document).on("keypress", function (e) {
            e = e || window.event;
            that.onKeyPress(e.keyCode);
        });
    }

    onKeyPress (code) {
        if (this.isFreeSpinSession) {
            return;
        }
        if (code == 32 || code == 13) {
            if (this.spinBtn.getEnabled()) {
                this.onSpinClicked();
            } else {
                if (this.stopspinBtn.getEnabled() && this.stopspinBtn.visible) {
                    this.onStopSpinClicked();
                }

            }
        }
    }
    updateUIForAutospinStart () {
        this.autoStopBtn.setEnabled(true);
        this.autospinBtn.visible = false;
        this.autoStopBtn.visible = true;
        this.spinBtn.visible = false;
        this.autoCounterBG.visible = true;
        this.autoCounterText.visible = true;
    }
    updateUIForAutospinEnd () {
        this.autospinBtn.visible = true;
        this.autoStopBtn.visible = false;
        this.autoStopBtn.setEnabled(false);
        this.stopspinBtn.visible = false;
        if (!this.isFreeSpinSession) {
            this.autoCounterBG.visible = false;
            this.autoCounterText.visible = false;
            this.spinBtn.visible = true;
        }


    }
    updateUIForAutospinCount (num) {
        this.updateUIForAutospinStart();
        this.autoCounterText.text = num;
    }
    updateUIForFSStart () {
        this.isFreeSpinSession = true;
        this.spinBtn.visible = false;
        this.winComp.visible = false;
        this.fsWinComp.visible = true;
        this.fsWinComp.updateWin(0);
        this.fsWinComp.updateTotalWin(slotModel.getTotalFreespinWin(), false)
        this.autoCounterBG.visible = true;
        this.autoCounterText.visible = true;
    }
    updateUIForFSEnd () {
        this.isFreeSpinSession = false;
        this.spinBtn.visible = true;
        this.winComp.visible = true;
        this.fsWinComp.visible = false;
        this.autoCounterBG.visible = false;
        this.autoCounterText.visible = false;
    }
    updateUIForFSRounds () {
        this.isFreeSpinSession = true;
        let data = slotModel.getFeatureData();
        this.autoCounterText.text = (data.currentCount + 1) + "/" + data.totalCount;
    }
    onTurboOnClicked () {
        this.turboBtn.visible = false;
        this.turboSelectedBtn.visible = true;
        CoreLib.Model.GameConfig.isTurboOn = true;
        this.hideMobileButtons();
    }
    onTurboOffClicked () {
        this.turboBtn.visible = true;
        this.turboSelectedBtn.visible = false;
        CoreLib.Model.GameConfig.isTurboOn = false;
        this.hideMobileButtons();
    }
    showPanel (flag) {
        this.visible = flag;
    }
    disableButtons () {
        this.updateButtonStates(false);

    }
    activateButtons () {
        this.updateButtonStates(true);
        this.doOtherButtonsAnimation(false);

    }
    updateButtonStates (flag) {
        this.spinBtn.setEnabled(flag);
        this.autospinBtn.setEnabled(flag);

        this.turboBtn.setEnabled(flag);
        this.turboSelectedBtn.setEnabled(flag);
        this.settingsBtn.setEnabled(true);
        this.infoBtn.setEnabled(true);
        if (flag) {
            this.stakeComp.enable();
        } else {
            this.stakeComp.disable();
        }
        this.betBtn.setEnabled(flag);
        this.menuBtn.setEnabled(true);
        if (!slotModel.getIsAutoSession()) {
            this.stopspinBtn.visible = false;
            this.spinBtn.visible = true;
        }
    }
    onSpinClicked () {
        this.updateButtonStates(false);
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SPIN_CLICKED);
        this.hideMobileButtons();
        this.doOtherButtonsAnimation(true);
    }
    onStopSpinClicked () {
        this.stopspinBtn.setEnabled(false);
        this.stopspinBtn.visible = false;
        this.spinBtn.visible = true;
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.STOP_SPIN_CLICKED);
    }
    hideStopSpin () {
        if (this.stopspinBtn.visible) {
            this.stopspinBtn.setEnabled(false);
            this.stopspinBtn.visible = false;
            this.spinBtn.visible = true;
        }

    }
    onSpinResponseReceived () {
        if (CoreLib.Model.GameConfig.isTurboOn || slotModel.getIsAutoSession() || slotModel.isSpinTimeFeatureTriggered()) {
            return;
        }
        this.spinBtn.visible = false;
        this.stopspinBtn.visible = true;
        this.stopspinBtn.setEnabled(true);
    }
    doOtherButtonsAnimation (flag) {
        if (CoreLib.Model.DeviceConfig.isDevice) {
            if (CoreLib.Model.DeviceConfig.isLandscape) {
                if (flag) {
                    this.buttonsHiddenForLS = true;
                    let xx = this.spinBtn.x + this.spinBtn.width / 2 - this.betBtn.width / 2;
                    let yy = this.spinBtn.y + this.spinBtn.height / 2 - this.betBtn.height / 2;
                    CoreLib.AnimationManager.animateTween(this.betBtn, 0.4, {x : xx, y : yy, alpha : 0, ease : Power2.easeIn});
                    CoreLib.AnimationManager.animateTween(this.menuBtn, 0.4, {x : xx, y : yy, alpha : 0, ease : Power2.easeIn});
                    this.menuBtn.setEnabled(false);
                    CoreLib.AnimationManager.animateTween(this.autospinBtn, 0.4, {x : xx, y : yy, alpha : 0, ease : Power2.easeIn});
                    CoreLib.AnimationManager.animateTween(this.autoStopBtn, 0.4, {x : xx, y : yy, alpha : 0, ease : Power2.easeIn});
                    CoreLib.AnimationManager.animateTween(this.turboBtn, 0.4, {x : xx, y : yy, alpha : 0, ease : Power2.easeIn});
                    CoreLib.AnimationManager.animateTween(this.turboSelectedBtn, 0.4, {x : xx, y : yy, alpha : 0, ease : Power2.easeIn, onComplete : this.spinTimeButtonAnimationDone.bind(this, true)});
                    this.buttonsHiddenForLS = true;
                } else {
                    if (this.buttonsHiddenForLS) {
                        this.betBtn.renderable = this.menuBtn.renderable = this.autospinBtn.renderable = this.autoStopBtn.renderable = this.turboBtn.renderable = this.turboSelectedBtn.renderable = true;
                        CoreLib.AnimationManager.animateTween(this.betBtn, 0.4, {x : this.betBtnPos.x, y : this.betBtnPos.y, alpha : 1, ease : Power2.easeIn});
                        CoreLib.AnimationManager.animateTween(this.menuBtn, 0.4, {x : this.menuBtnPos.x, y : this.menuBtnPos.y, alpha : 1, ease : Power2.easeIn});
                        CoreLib.AnimationManager.animateTween(this.autospinBtn, 0.4, {x : this.autospinBtnPos.x, y : this.autospinBtnPos.y, alpha : 1, ease : Power2.easeIn});
                        CoreLib.AnimationManager.animateTween(this.autoStopBtn, 0.4, {x : this.autospinBtnPos.x, y : this.autospinBtnPos.y, alpha : 1, ease : Power2.easeIn});
                        CoreLib.AnimationManager.animateTween(this.turboBtn, 0.4, {x : this.turboBtnPos.x, y : this.turboBtnPos.y, alpha : 1, ease : Power2.easeIn});
                        CoreLib.AnimationManager.animateTween(this.turboSelectedBtn, 0.4, {x : this.turboBtnPos.x, y : this.turboBtnPos.y, alpha : 1, ease : Power2.easeIn, onComplete : this.spinTimeButtonAnimationDone.bind(this, false)});
                        this.buttonsHiddenForLS = false;
                    }

                }
            }
        }

    }
    spinTimeButtonAnimationDone (flag) {
        if (flag) {
            this.betBtn.alpha = this.menuBtn.alpha = this.autospinBtn.alpha = this.autoStopBtn.alpha = this.turboBtn.alpha = this.turboSelectedBtn.alpha = 1;
            this.betBtn.renderable = this.menuBtn.renderable = this.autospinBtn.renderable = this.autoStopBtn.renderable = this.turboBtn.renderable = this.turboSelectedBtn.renderable = false;
        } else {

        }
    }
    onAutoSpinClicked () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.AUTOSPIN_CLICKED);
        this.hideMobileButtons();
    }
    onAutoStopClicked () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.STOP_AUTOSPIN);
        this.hideMobileButtons();
    }
    onBetClicked () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.BET_CLICKED);
        this.hideMobileButtons();
    }
    onMenuClicked () {
        if (CoreLib.Model.DeviceConfig.isDevice && !this.buttonsHiddenForLS) {
            this.showMobileMenu();
        }
    }
    onInfoClicked () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_PAYTABLE);
    }
    onSettingsClicked () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.DESKTOP_SETTINGS_CLICKED);
    }
    onMSettingsClicked () {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_MOBILE_SETTINGS_DIALOGUE, true);
    }
    onSoundOnClicked () {
        soundFactory.setAmbientState(false);
        soundFactory.setFXState(false);
        this.soundOffMBtn.visible = true;
        this.soundOnMBtn.visible = false;
    }
    onSoundOffClicked () {
        soundFactory.setAmbientState(true);
        soundFactory.setFXState(true);
        this.soundOffMBtn.visible = false;
        this.soundOnMBtn.visible = true;
    }
    showMobileMenu () {
        if (!this.ptVisible) {
            this.mobileMenus.visible = true;
            this.mobileMenus.alpha = 0;
            this.mobileMenus.y = this.ptYPos + 60;
            CoreLib.AnimationManager.animateTween(this.mobileMenus, 0.5, {alpha : 0.6, y : this.ptYPos, ease : Power2.easeOut});
            this.ptVisible = true;
        } else {
            this.ptVisible = false;
            CoreLib.AnimationManager.animateTween(this.mobileMenus, 0.5, {alpha : 0, y : this.ptYPos + 60, ease : Power2.easeOut, onComplete : this.onMobileButtonsHidden.bind(this)});
        }
    }
    hideMobileButtons () {
        if (this.ptVisible) {
            CoreLib.AnimationManager.animateTween(this.mobileMenus, 0.5, {alpha : 0, y : this.ptYPos + 60, ease : Power2.easeOut, onComplete : this.onMobileButtonsHidden.bind(this)});
        }
    }
    onMobileButtonsHidden () {
        this.ptVisible = false;
        this.mobileMenus.visible = false;
        this.mobileMenus.alpha = 1;
    }
    setInitialValues () {
        this.stakeComp.setBetsArray(slotModel.getBetLevels());
        this.stakeComp.enable();
    }
    updateBet () {
        this.stakeComp.updateBet(slotModel.getTotalBet(), slotModel.getBetPosition());
    }
    updateBetBalance () {
        this.stakeComp.updateBet(slotModel.getTotalBet(), slotModel.getBetPosition());
        this.balanceComp.updateBalance(slotModel.getBalance());
    }
    updateBalance () {
        this.balanceComp.updateBalance(slotModel.getBalance());
    }
    updateBalanceForBetDeduction () {
        let newbalance = slotModel.getBetDeductedBalance();
        this.balanceComp.updateBalance(newbalance);
    }
    enterSpinWinState () {
        let win = slotModel.getTotalWin();
        this.winComp.updateWin(win);
        if (this.isFreeSpinSession) {
            this.fsWinComp.updateWin(slotModel.getFSSpinWin(), slotModel.getFSMultiplier());
            this.fsWinComp.updateTotalWin(slotModel.getTotalFreespinWin());
        }
    }
    showLineWin () {
        let obj = slotModel.getCurrentWinLine();
        if (obj) {
            let wildWinCount = 0;
            let wildWin = false;
            if(CoreLib.Model.GameConfig.wildMultiplierWin) {
                let lineWin = this.convertPosition(obj.winningPosition);
                this.symbolsWinArr = this.getWinningSymbols(lineWin);
                for (let i = 0; i < this.symbolsWinArr.length; i++) {
                    if (this.symbolsWinArr[i] == "WD") {
                        wildWinCount++;
                        wildWin = true;
                    }
                }
            }
            let symbolLen = 0;
            if (this.symbolsWinArr) {
                symbolLen = this.symbolsWinArr.length;
            }
            this.winComp.updateLineWin(wildWin, wildWinCount, symbolLen, obj);
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

    getWinningSymbols (positions) {
        let symbs = [];
        let reelview = slotModel.getReelsView();
        let len = positions.length;
        for (let k = 0; k < len; k++) {
            symbs.push(reelview[positions[k].reel][positions[k].row]);
        }
        return symbs;
    }

    clearGameForSpin () {
        this.fsWinComp.updateWin(0);
        this.winComp.updateWin(0);
        this.winComp.updateLineWin("");
    }
    getHeight () {
        return this.panelBG.height * this.scale.y;
    }



    resizeViewComponents() {
        super.resizeViewComponents();
        if (CoreLib.Model.DeviceConfig.isDesktop) {
            this.menuBtn.visible = false;
            this.betBtn.visible = false;
            this.panelBG.visible = true;
            this.ptPanelBG.visible = false;
            this.panelBG.addChild(this.spinBtn, this.stopspinBtn, this.autospinBtn, this.autoStopBtn, this.turboBtn, this.turboSelectedBtn, this.autoCounterBG, this.stakeComp, this.winComp, this.fsWinComp, this.balanceComp, this.settingsBtn, this.infoBtn);
            this.panelBG.scale.set(1);
            let sc = CoreLib.UIUtil.getGameWidth() / this.panelBG.width;
            this.panelBG.scale.set(sc);
            CoreLib.UIUtil.setPosition(this.panelBG, 0, CoreLib.UIUtil.getGameHeight() - this.panelBG.height + 2);
            // CoreLib.UIUtil.alignToObject(this.balanceComp, "middle", this.panelBG);
            // CoreLib.UIUtil.alignToObject(this.winComp, "middle", this.panelBG);
            // CoreLib.UIUtil.alignToObject(this.stakeComp, "middle", this.panelBG);

            this.ptYPos = this.mobileMenus.y;
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.PANEL_RESIZED, this.panelBG.scale.x);

        } else {
            if (CoreLib.Model.DeviceConfig.isPortrait) {
                this.alignForMobilePortrait();
            } else {
                this.alignForMobileLandscape();
            }
            this.autospinBtnPos = {x : this.autospinBtn.x, y : this.autospinBtn.y};
            this.turboBtnPos = {x : this.turboBtn.x, y : this.turboBtn.y};
            this.betBtnPos = {x : this.betBtn.x, y : this.betBtn.y};
            this.menuBtnPos = {x : this.menuBtn.x, y : this.menuBtn.y};

        }
        this.onMobileButtonsHidden();
    }

    alignForDesktopPortrait () {

    }
    alignForDesktopLandscape () {
        this.panelBG.visible = true;
        this.ptPanelBG.visible = false;
        CoreLib.UIUtil.alignToObject(this.balanceComp, "middle", this.panelBG);
        CoreLib.UIUtil.alignToObject(this.winComp, "middle", this.panelBG);
        CoreLib.UIUtil.alignToObject(this.fsWinComp, "middle", this.panelBG);
        CoreLib.UIUtil.alignToObject(this.stakeComp, "middle", this.panelBG);
    }

    alignForMobilePortrait() {
        this.panelBG.visible = false;
        this.settingsBtn.visible = false;
        this.infoBtn.visible = false;
        this.lsbuttonsBG.visible = false;


        let pscale = 1;
        this.autospinBtn.scale.set(pscale);
        this.autoStopBtn.scale.set(pscale);
        this.turboBtn.scale.set(pscale);
        this.turboSelectedBtn.scale.set(pscale);
        this.betBtn.scale.set(pscale);
        this.menuBtn.scale.set(pscale);

        this.ptPanelBG.visible = true;
        this.mobileMenus.visible = true;
        this.betBtn.visible = true;
        this.menuBtn.visible = true;
        this.ptPanelBG.scale.set(1);
        this.ptbuttonsBG.width = this.ptPanelBG.width;
        this.ptbuttonsBG.scale.y = this.ptbuttonsBG.scale.x;
        let spinscale = 0.94;
        this.spinBtn.scale.set(spinscale);
        this.stopspinBtn.scale.set(spinscale);
        this.autoCounterBG.scale.set(spinscale);

        this.ptPanelBG.addChild(this.mobileMenus);

        this.exitMBtn.scale.set(1);
        let sc1 = (this.ptbuttonsBG.height * 0.9) / this.exitMBtn.height;
        this.exitMBtn.scale.set(sc1);
        this.settingsMBtn.scale.set(sc1);
        this.infoMBtn.scale.set(sc1);
        this.rulesMBtn.scale.set(sc1);

        let area = this.ptbuttonsBG.width / 4;
        let btnWidth = this.exitMBtn.width;

        CoreLib.UIUtil.setPosition(this.exitMBtn, (area - btnWidth) / 2, (this.ptbuttonsBG.height - this.exitMBtn.height) / 2);
        CoreLib.UIUtil.setPosition(this.settingsMBtn, area + (area - btnWidth) / 2, this.exitMBtn.y);
        CoreLib.UIUtil.setPosition(this.infoMBtn, area * 2 + (area - btnWidth) / 2, this.exitMBtn.y);
        CoreLib.UIUtil.setPosition(this.rulesMBtn, area * 3 + (area - btnWidth) / 2, this.exitMBtn.y);


        this.ptPanelBG.addChild(this.autospinBtn, this.autoStopBtn, this.turboBtn, this.turboSelectedBtn, this.betBtn, this.menuBtn, this.mobileMenus, this.spinBtn, this.stopspinBtn, this.autoCounterBG);
        if (CoreLib.Model.DeviceConfig.isDesktop) {
            CoreLib.UIUtil.setPosition(this.spinBtn, 248, -61);
        } else {
            CoreLib.UIUtil.setPosition(this.spinBtn, 498, -120);
        }

        CoreLib.UIUtil.setPosition(this.stopspinBtn, this.spinBtn.x, this.spinBtn.y);
        CoreLib.UIUtil.setPosition(this.autospinBtn, this.spinBtn.x - this.autospinBtn.width * 1.5, this.spinBtn.y + this.spinBtn.height - this.autospinBtn.height * 0.65);
        CoreLib.UIUtil.setPosition(this.autoStopBtn, this.autospinBtn.x, this.autospinBtn.y);
        CoreLib.UIUtil.setPosition(this.turboBtn, this.turboBtn.width * 0.25, this.autospinBtn.y + this.autospinBtn.height * 0.5);
        CoreLib.UIUtil.setPosition(this.turboSelectedBtn, this.turboBtn.x, this.turboBtn.y);
        CoreLib.UIUtil.setPosition(this.betBtn, this.spinBtn.x + this.spinBtn.width + this.betBtn.width * 0.5, this.autospinBtn.y);
        CoreLib.UIUtil.setPosition(this.menuBtn, this.ptPanelBG.width - this.menuBtn.width * 1.25, this.turboBtn.y);



        this.menuBtn.renderable = true;
        this.betBtn.renderable = true;
        this.autospinBtn.renderable = true;
        this.autoStopBtn.renderable = true;
        this.turboBtn.renderable = true;
        this.turboSelectedBtn.renderable = true;


        this.winComp.updateBGToPortrait();
        this.fsWinComp.updateBGToPortrait();
        this.stakeComp.showMobilePortrait();
        this.winComp.scale.set(1);
        this.fsWinComp.scale.set(1);
        this.stakeComp.scale.set(1);
        this.balanceComp.scale.set(1);
        let sc = (CoreLib.UIUtil.getGameWidth() * 0.36) / this.winComp.width;
        this.winComp.scale.set(sc);
        this.fsWinComp.scale.set(sc);
        this.stakeComp.scale.set(sc * 0.9);
        this.balanceComp.scale.set(sc * 0.9);

        CoreLib.UIUtil.setPosition(this.winComp, (CoreLib.UIUtil.getGameWidth() - this.winComp.width) / 2, CoreLib.UIUtil.getGameHeight() - this.winComp.winBG.height * this.winComp.scale.y * 1.2);
        CoreLib.UIUtil.setPosition(this.fsWinComp, this.winComp.x, this.winComp.y);
        CoreLib.UIUtil.setPosition(this.stakeComp, this.stakeComp.width / 2 + (this.winComp.x - this.stakeComp.width) / 2, this.winComp.y + (this.winComp.winBG.height * this.winComp.scale.y - this.stakeComp.height) / 2);
        CoreLib.UIUtil.setPosition(this.balanceComp, this.winComp.x + this.winComp.width + this.balanceComp.width / 2 + (CoreLib.UIUtil.getGameWidth() - this.winComp.x - this.winComp.width - this.balanceComp.width) / 2, this.winComp.y + (this.winComp.winBG.height * this.winComp.scale.y - this.balanceComp.height) / 2);



        CoreLib.UIUtil.setPositionX(this.mobileMenus, 0);
        CoreLib.UIUtil.setPositionY(this.mobileMenus, this.menuBtn.y + this.menuBtn.height * 1.32);

        sc = (CoreLib.UIUtil.getGameWidth() / this.ptPanelBG.width);
        this.ptPanelBG.scale.set(sc);
        CoreLib.UIUtil.alignToScreen(this.ptPanelBG, "center");
        CoreLib.UIUtil.alignToScreen(this.ptPanelBG, "bottom");

        CoreLib.UIUtil.setPosition(this.autoCounterBG, this.spinBtn.x, this.spinBtn.y);

        this.mobileMenus.visible = false;
        this.ptYPos = this.mobileMenus.y;
    }

    alignForMobileLandscape () {
        this.panelBG.visible = false;
        this.settingsBtn.visible = false;
        this.infoBtn.visible = false;
        this.ptPanelBG.visible = false;
        this.lsbuttonsBG.visible = true;
        this.lsbuttonsBG.width = CoreLib.UIUtil.getGameWidth();
        this.lsbuttonsBG.width = CoreLib.UIUtil.getGameWidth();
        this.lsbuttonsBG.height = CoreLib.UIUtil.getGameHeight() * 0.14;
        CoreLib.UIUtil.setPosition(this.lsbuttonsBG, 0, CoreLib.UIUtil.getGameHeight() - this.lsbuttonsBG.height);


        let pscale = 1;
        this.autospinBtn.scale.set(pscale);
        this.autoStopBtn.scale.set(pscale);
        this.turboBtn.scale.set(pscale);
        this.turboSelectedBtn.scale.set(pscale);
        this.betBtn.scale.set(pscale);
        this.menuBtn.scale.set(pscale);


        this.winComp.updateBGToLandscape();
        this.fsWinComp.updateBGToLandscape();
        this.stakeComp.showMobileLandscape();
        this.winComp.scale.set(1);
        this.fsWinComp.scale.set(1);
        this.stakeComp.scale.set(1);
        this.balanceComp.scale.set(1);
        let sc = (this.lsbuttonsBG.height * 0.8) / this.winComp.height;
        this.winComp.scale.set(sc);
        this.fsWinComp.scale.set(sc);
        this.stakeComp.scale.set(sc);
        this.balanceComp.scale.set(sc);

        let gap = CoreLib.UIUtil.getGameWidth() * 0.15;
        CoreLib.UIUtil.setPosition(this.winComp, (CoreLib.UIUtil.getGameWidth() - this.winComp.width) / 2, this.lsbuttonsBG.y + (this.lsbuttonsBG.height - this.winComp.height) / 2);
        CoreLib.UIUtil.setPosition(this.fsWinComp, this.winComp.x, this.winComp.y);
        CoreLib.UIUtil.setPosition(this.stakeComp, this.stakeComp.width / 2 + (this.winComp.x - this.stakeComp.width) / 2, this.lsbuttonsBG.y + (this.lsbuttonsBG.height - this.stakeComp.height) / 2);
        CoreLib.UIUtil.setPosition(this.balanceComp, this.winComp.x + this.winComp.width + this.balanceComp.width / 2 + (CoreLib.UIUtil.getGameWidth() - this.winComp.x - this.winComp.width - this.balanceComp.width) / 2, this.lsbuttonsBG.y + (this.lsbuttonsBG.height - this.balanceComp.height) / 2);


        this.addChild(this.autospinBtn, this.autoStopBtn, this.turboBtn, this.turboSelectedBtn, this.betBtn, this.menuBtn, this.spinBtn, this.stopspinBtn, this.autoCounterBG);
        this.spinBtn.scale.set(1);
        sc = (CoreLib.UIUtil.getGameHeight() * 0.24) / this.spinBtn.height;
        this.spinBtn.scale.set(sc);
        this.stopspinBtn.scale.set(sc)
        this.autospinBtn.scale.set(sc);
        this.autoStopBtn.scale.set(sc);
        this.turboBtn.scale.set(sc);
        this.turboSelectedBtn.scale.set(sc);
        this.menuBtn.scale.set(sc);
        this.betBtn.scale.set(sc);
        this.autoCounterBG.scale.set(sc);

        let xpadding = CoreLib.UIUtil.getGameWidth() * 0.02;
        let availHt = CoreLib.UIUtil.getGameHeight() - this.lsbuttonsBG.height;
        CoreLib.UIUtil.setPosition(this.spinBtn, CoreLib.UIUtil.getGameWidth() - this.spinBtn.btn.width * this.spinBtn.scale.x - xpadding, (availHt - this.spinBtn.btn.height * this.spinBtn.scale.y) / 2);
        CoreLib.UIUtil.setPosition(this.stopspinBtn, this.spinBtn.x, this.spinBtn.y);

        let upHt = this.spinBtn.y;
        CoreLib.UIUtil.setPosition(this.menuBtn, this.spinBtn.x + this.spinBtn.width - this.menuBtn.width, (upHt / 2 - this.menuBtn.height) / 2);
        CoreLib.UIUtil.setPosition(this.betBtn, this.menuBtn.x, upHt / 2 + (upHt / 2 - this.betBtn.height) / 2);
        let botht = this.spinBtn.y + this.spinBtn.height;
        let availbt = availHt - botht;
        CoreLib.UIUtil.setPosition(this.autospinBtn, this.menuBtn.x, botht + (availbt / 2 - this.autospinBtn.height) / 2);
        CoreLib.UIUtil.setPosition(this.autoStopBtn, this.autospinBtn.x, this.autospinBtn.y);
        CoreLib.UIUtil.setPosition(this.turboBtn, this.menuBtn.x, botht + availbt / 2 + (availbt / 2 - this.autospinBtn.height) / 2);
        CoreLib.UIUtil.setPosition(this.turboSelectedBtn, this.turboBtn.x, this.turboBtn.y);


        this.addChild(this.mobileMenus);
        this.ptbuttonsBG.scale.set(1);

        this.exitMBtn.scale.set(1);
        let sc1 = (this.ptbuttonsBG.height * 0.9) / this.exitMBtn.height;
        this.exitMBtn.scale.set(sc1);
        this.settingsMBtn.scale.set(sc1);
        this.infoMBtn.scale.set(sc1);
        this.rulesMBtn.scale.set(sc1);

        let area = this.ptbuttonsBG.width / 4;
        let btnWidth = this.exitMBtn.width;

        CoreLib.UIUtil.setPosition(this.exitMBtn, (area - btnWidth) / 2, (this.ptbuttonsBG.height - this.exitMBtn.height) / 2);
        CoreLib.UIUtil.setPosition(this.settingsMBtn, area + (area - btnWidth) / 2, this.exitMBtn.y);
        CoreLib.UIUtil.setPosition(this.infoMBtn, area * 2 + (area - btnWidth) / 2, this.exitMBtn.y);
        CoreLib.UIUtil.setPosition(this.rulesMBtn, area * 3 + (area - btnWidth) / 2, this.exitMBtn.y);

        CoreLib.UIUtil.setPositionX(this.mobileMenus, (this.lsbuttonsBG.width - this.mobileMenus.width) / 2);
        CoreLib.UIUtil.setPositionY(this.mobileMenus, this.lsbuttonsBG.y -this.mobileMenus.height);

        CoreLib.UIUtil.setPosition(this.autoCounterBG, this.spinBtn.x, this.spinBtn.y);

        if (this.buttonsHiddenForLS) {
            this.menuBtn.renderable = false;
            this.betBtn.renderable = false;
            this.autospinBtn.renderable = false;
            this.autoStopBtn.renderable = false;
            this.turboBtn.renderable = false;
            this.turboSelectedBtn.renderable = false;
        }
        this.mobileMenus.visible = false;
        this.ptYPos = this.mobileMenus.y;
    }




}
