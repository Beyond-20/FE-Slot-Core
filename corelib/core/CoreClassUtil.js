import {GameBGComp} from "../views/containers/GameBGComp";
import {SlotMachineComp} from "../views/containers/SlotMachineComp";
import {SlotPanelComp} from "../views/containers/SlotPanelComp";
import {BalanceComp} from "../views/comps/BalanceComp";
import {PanelWinComp} from "../views/comps/PanelWinComp";
import {StakeComp} from "../views/comps/StakeComp";
import {SlotMachineV1} from "../views/slotmachine/SlotMachineV1";
import {SpinButton} from "../views/comps/SpinButton";
import {PreloaderComp} from "../views/containers/PreloaderComp";
import {SlotWinAmountComp} from "../views/comps/SlotWinAmountComp";
import {SlotSplashComp} from "../views/containers/SlotSplashComp";
import {AutoplayComp} from "../views/containers/AutoplayComp";
import {AutoSliderComp} from "../views/comps/AutoSliderComp";
import {ToggleOption} from "../views/comps/ToggleOption";
import {MobileBetComp} from "../views/containers/MobileBetComp";
import { PaytablePages } from '../views/comps/PaytablePages'
import { PaytablePage } from '../views/comps/PaytablePage'
import { PaytableItem } from '../views/comps/PaytableItem'
import { PTPageIndicator } from '../views/comps/PTPageIndicator'
import { CircularTimer } from '../views/comps/CircularTimer'
import { DesktopSettingsComp } from '../views/comps/DesktopSettingsComp'
import { SettingsElement } from '../views/comps/SettingsElement'
import { AnimatedToggleOption } from '../views/comps/AnimatedToggleOption'
import { VolatilityComp } from '../views/comps/VolatilityComp'
import { DontShowNextTimeComp } from '../views/comps/DontShowNextTimeComp'
import { MobileSettingsComp } from '../views/containers/MobileSettingsComp'
import { MobileLongBtnComp } from '../views/comps/MobileLongBtnComp'
import { MessagePopupView } from '../views/layoutcomps/MessagePopupView'
import { PopupComp } from '../views/comps/PopupComp'
import { WinAmountComp } from '../views/comps/WinAmountComp'
import { PixiContainer } from '../views/layoutcomps/PixiContainer'
import { DesktopButtonsComp } from '../views/containers/DesktopButtonsComp'
import { AlertComp } from '../views/layoutcomps/AlertComp'
import { FSPanelWinComp } from '../views/comps/FSPanelWinComp'
import { SlotWinAmountSpineComp } from '../views/comps/SlotWinAmountSpineComp'
import { AnimatedPopupComp } from '../views/comps/AnimatedPopupComp'
import { MultiStateAnimatedSprite } from '../views/comps/MultiStateAnimatedSprite'
import { BuyBonusPopupComp } from '../views/comps/BuyBonusPopupComp'
import { BuyBonusView } from '../views/layoutcomps/BuyBonusView'
import { SlotSpinWinAmountComp } from '../views/comps/SlotSpinWinAmountComp'
import { CoinFallAnimation } from '../views/comps/CoinFallAnimation'
import { SlotPaylinesComp } from '../views/comps/SlotPaylinesComp'
import { TournamentIcon } from '../views/comps/TournamentIcon'
import { PrizePopupView } from '../views/containers/PrizePopupView'
import { PrizePopupComp } from '../views/comps/PrizePopupComp'
import {FiveOfAKindComp} from "../views/comps/FiveOfAKindComp";
import {SlotWinAmountSequentialSpineComp} from "../views/comps/SlotWinAmountSequentialSpineComp";
import {SlotSpinWinAnimAmountComp} from "../views/comps/SlotSpinWinAnimAmountComp";

class CoreClassUtil {
    constructor() {
    }

    getGameClass (string, config) {
        let element = null;
        switch (string) {
            case "PixiContainer" :
                element = new PixiContainer(config);
                break;
            case "GameBGComp" :
                element = new GameBGComp(config);
                break;
            case "SlotMachineComp" :
                element = new SlotMachineComp(config);
                break;
            case "SlotPanelComp" :
                element = new SlotPanelComp(config);
                break;
            case "BalanceComp" :
                element = new BalanceComp(config);
                break;
            case "PanelWinComp" :
                element = new PanelWinComp(config);
                break;
            case "FSPanelWinComp" :
                element = new FSPanelWinComp(config);
                break;
            case "StakeComp" :
                element = new StakeComp(config);
                break;
            case "SlotMachineV1" :
                element = new SlotMachineV1(config);
                break;
            case "SpinButton" :
                element = new SpinButton(config);
                break;
            case "PreloaderComp" :
                element = new PreloaderComp(config);
                break;
            case "SlotWinAmountComp" :
                element = new SlotWinAmountComp(config);
                break;
            case "SlotWinAmountSpineComp" :
                element = new SlotWinAmountSpineComp(config);
                break;
            case "SlotWinAmountSequentialSpineComp" :
                element = new SlotWinAmountSequentialSpineComp(config);
                break;
            case "SlotSplashComp" :
                element = new SlotSplashComp(config);
                break;
            case "AutoplayComp" :
                element = new AutoplayComp(config);
                break;
            case "AutoSliderComp" :
                element = new AutoSliderComp(config);
                break;
            case "ToggleOption" :
                element = new ToggleOption(config);
                break;
            case "MobileBetComp" :
                element = new MobileBetComp(config);
                break;
            case "PaytablePages" :
                element = new PaytablePages(config);
                break;
            case "PaytablePage" :
                element = new PaytablePage(config);
                break;
            case "PaytableItem" :
                element = new PaytableItem(config);
                break;
            case "PTPageIndicator" :
                element = new PTPageIndicator(config);
                break;
            case "CircularTimer" :
                element = new CircularTimer(config);
                break;
            case "DesktopSettingsComp" :
                element = new DesktopSettingsComp(config);
                break;
            case "ToggleOption" :
                element = new ToggleOption(config);
                break;
            case "AnimatedToggleOption" :
                element = new AnimatedToggleOption(config);
                break;
            case "SettingsElement" :
                element = new SettingsElement(config);
                break;
            case "VolatilityComp" :
                element = new VolatilityComp(config);
                break;
            case "DontShowNextTimeComp" :
                element = new DontShowNextTimeComp(config);
                break;
            case "MobileSetingsComp" :
                element = new MobileSettingsComp(config);
                break;
            case "MobileLongBtnComp" :
                element = new MobileLongBtnComp(config);
                break;
            case "MessagePopupView" :
                element = new MessagePopupView(config);
                break;
            case "PopupComp" :
                element = new PopupComp(config);
                break;
            case "MultiStateAnimatedSprite" :
                element = new MultiStateAnimatedSprite(config);
                break;
            case "AnimatedPopupComp" :
                element = new AnimatedPopupComp(config);
                break;
            case "BuyBonusPopupComp" :
                element = new BuyBonusPopupComp(config);
                break;
            case "BuyBonusView" :
                element = new BuyBonusView(config);
                break;
            case "WinAmountComp" :
                element = new WinAmountComp(config);
                break;
            case "DesktopButtonsComp" :
                element = new DesktopButtonsComp(config);
                break;
            case "AlertComp" :
                element = new AlertComp(config);
                break;
            case "SlotSpinWinAmountComp" :
                element = new SlotSpinWinAmountComp(config);
                break;
            case "SlotSpinWinAnimAmountComp" :
                element = new SlotSpinWinAnimAmountComp(config);
                break;
            case "CoinFallAnimation" :
                element = new CoinFallAnimation(config);
                break;
            case "SlotPaylinesComp" :
                element = new SlotPaylinesComp(config);
                break;
            case "TournamentIcon" :
                element = new TournamentIcon(config);
                break;
            case "PrizePopupView" :
                element = new PrizePopupView(config);
                break;
            case "PrizePopupComp" :
                element = new PrizePopupComp(config);
                break;
            case "FiveOfAKindComp":
                element = new FiveOfAKindComp(config);
                break;
            default :
                break;
        }
        return element;
    }
}
export const coreClassUtil = new CoreClassUtil();
