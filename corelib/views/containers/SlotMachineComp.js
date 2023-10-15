import {LibView} from "../../pixiwrapper/LibView";
import {CoreLib} from "../../core/CoreLib";
import {slotModel} from "../../models/SlotModel";
import { coreClassUtil } from '../../core/CoreClassUtil'

export class SlotMachineComp extends LibView
{
    constructor(config, layoutconfig) {
        super(config, layoutconfig);
        this.guideRect = this.elementsList["guideRect"];
        if (this.guideRect) {
            this.guideRect.renderable = false;
        }
        this.gamelogo = this.elementsList["gamelogo"];
        this.slotMachine = this.elementsList["slotMachine"];
        this.winAmountComp = this.elementsList["winAmountComp"];
        this.reelFrame = this.elementsList["reelFrame"];

        this.addChild(this.winAmountComp);


        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.ENTER_SPINWIN_STATE, this.enterSpinWinState.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SHOW_FREESPIN_BIG_WIN, this.showFreespinBigWin.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.CLEAR_ALL_WIN, this.clearSpinAllWin.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.CLEAR_TRIGGERING_ANIM, this.clearTriggeringWin.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SHOW_LINE_WIN, this.showLineWin.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SHOW_BONUS_TRIGGERING_ANIM, this.showBonusTriggerAnim.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SHOW_CUSTOM_BONUS_TRIGGERING_ANIM, this.showCustomBonusTriggerAnim.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SHOW_CUSTOM_TRIGGERING_ANIM, this.showCustomTriggerAnim.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SHOW_SLOTMACHINE, this.showSlotMachine.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SHOW_SLOTMACHINE_AND_PANEL, this.showSlotMachine.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SHOW_HIDE_SLOT_SYMBOLS, this.showHideSlotSymbols.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SHOW_HIDE_SLOT_GAMETITLE, this.showHideGameTitle.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.FIVEOAK_WIN_COMPLETED, this.onFiveOfAKindCompleted.bind(this));
        CoreLib.EventHandler.addEventListener("ON_WIN_SPECIAL_SOUND_COMPLETED", this.showWinInWinAmountComp.bind(this));
        CoreLib.EventHandler.addEventListener("PLAY_BIG_WIN_COUNTUP_END_SOUND", this.onBigWinCountUpEnd.bind(this));
        //CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.SHOW_50AK_WIN, this.showWin.bind(this));
    }
    getSlotMachinePosition () {
        return {x : this.slotMachine.x, y : this.slotMachine.y};
    }
    showHideGameTitle (flag = true) {
        this.gamelogo.visible = flag;
    }
    showHideSlotSymbols (flag = true) {
        this.slotMachine.visible = flag;
    }
    showSlotMachine (flag) {
        this.visible = flag;
    }
    enterSpinWinState () {
        this.slotMachine.enterSpinWinState();
        if (slotModel.getSlotGameResult().megaStackPrize != undefined && slotModel.getSlotGameResult().megaStackPrize > 0) {
            return;
        }
        this.checkFiveOfAKindWin();

    }

    checkFiveOfAKindWin() {
        let oak5 = slotModel.getFiveOfAKindWin();
        if (oak5.isTriggered) {
            this.slotMachine.onAllWinSymbolDone();
            this.slotMachine.clearSpinAllWin();
            this.showFiveOfAKindWin(oak5)
        } else {
            this.showWinInWinAmountComp(false);
        }

    }
    showFiveOfAKindWin (oak5) {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_PAYLINE);
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_50AK_WIN, oak5);

    }
    onFiveOfAKindCompleted() {
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.HIDE_PAYLINE);
        this.showWinInWinAmountComp(true);
    }

    showWinInWinAmountComp (toShowWin = false) {
        if (toShowWin) {
            this.slotMachine.enterSpinWinState();
        }
        let win = slotModel.getTotalWin();
        if (win > 0) {
            let level = slotModel.getWinLevel();
            if (level > 0) {
                if (this.configData.showSymbolBeforeBigWin) {
                    this.bigwintimeoutId = setTimeout(this.showBigWinNow.bind(this, level), 2000);
                } else {
                    this.showBigWinNow();
                }
            } else {
                this.winAmountComp.showWin(win, slotModel.getWinLevel());
                this.winAmountComp.scale.set(0);
                CoreLib.AnimationManager.animateTween(this.winAmountComp, 0.5, {scaleX : 1, scaleY : 1, ease : Power2.easeOUt});
            }

        } else {
            CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.EXIT_SPINWIN_AMOUNT);
        }

    }
    showBigWinNow () {
        this.notifyToShowBigWin();
    }

    notifyToShowBigWin() {
        let level = slotModel.getWinLevel();
        this.slotMachine.onAllWinSymbolDone();
        this.slotMachine.clearSpinAllWin();
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.SHOW_SLOT_BIG_WIN, level);
    }
    clearSpinAllWin () {
        this.slotMachine.clearSpinAllWin();
        CoreLib.EventHandler.dispatchEvent(CoreLib.SlotEvents.CLEAR_SLOT_BIG_WIN);
        this.winAmountComp.clearWin();
    }
    clearTriggeringWin () {
        this.slotMachine.clearTriggeringWin();
    }
    showLineWin () {
        this.slotMachine.showLineWin();
    }
    showFreespinBigWin () {
        let win = slotModel.getTotalFSWin();
        this.winAmountComp.showWin(win, 3, this.onFSWinDone.bind(this));

    }
    onFSWinDone () {
        this.winAmountComp.clearWin();
    }
    showBonusTriggerAnim () {
        this.slotMachine.showBonusTriggerAnim();
    }
    showCustomBonusTriggerAnim (positions) {
        this.slotMachine.showCustomBonusTriggerAnim(positions);
    }
    showCustomTriggerAnim (positions) {
        this.slotMachine.showCustomTriggerAnim(positions);
    }

    getWidth () {
        return this.guideRect.width * this.scale.x;
    }
    getHeight() {
        return this.guideRect.height * this.scale.y;
    }

    resizeViewComponents () {
        super.resizeViewComponents();
        if (CoreLib.Model.DeviceConfig.isDevice) {
            if (CoreLib.Model.DeviceConfig.isPortrait) {
                if (this.gamelogo) {
                    this.gamelogo.scale.set(CoreLib.Util.getDefaultValue(this.gamelogo.configData.pScale, 1));
                    if (this.gamelogo.configData.px != undefined) {
                        CoreLib.UIUtil.setPositionX(this.gamelogo, this.gamelogo.configData.px);
                    }
                    if (this.gamelogo.configData.py != undefined) {
                        CoreLib.UIUtil.setPositionY(this.gamelogo, this.gamelogo.configData.py);
                    }
                }

            } else {
                if (this.gamelogo) {
                    this.gamelogo.scale.set(CoreLib.Util.getDefaultValue(this.gamelogo.configData.lScale, 1));
                    if (this.gamelogo.configData.lx != undefined) {
                        CoreLib.UIUtil.setPositionX(this.gamelogo, this.gamelogo.configData.lx);
                    }
                    if (this.gamelogo.configData.ly != undefined) {
                        CoreLib.UIUtil.setPositionY(this.gamelogo, this.gamelogo.configData.ly);
                    }
                }

            }
        }
        setTimeout(this.storeCoinPosition.bind(this), 200)
    }
    storeCoinPosition () {
        CoreLib.Model.GameConfig.coinPosition = this.toGlobal({x : this.reelFrame.x + this.reelFrame.width / 2, y : this.reelFrame.y + this.reelFrame.height});
    }

    onBigWinCountUpEnd () {
        setTimeout(this.playBigWinCountUpEndSound.bind(this), 700);
    }

    playBigWinCountUpEndSound () {
        CoreLib.EventHandler.dispatchEvent("PLAY_BIG_WIN_COUNTUP_END_SOUND_NOW");
    }

}

