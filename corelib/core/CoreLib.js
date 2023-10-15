import {eventHandler} from "../pixiwrapper/EventHandler";
import {AppEvents} from "../events/AppEvents";
import {animationManager} from "../utils/AnimationManager";
import {View} from "../views/GameView";
import {Util} from "../pixiwrapper/UtilService";
import {UIUtil} from "../pixiwrapper/UIUtilService";
import {soundFactory} from "../sound/SoundFactory";
import {SlotEvents} from "../events/SlotEvents";
import {Logger} from "../utils/LoggerService";

class CoreLibApp {
    constructor () {
        this.assetLoader = null;
        this.View = View;
        this.Util = Util;
        this.UIUtil = UIUtil;
        this.gameUtil = null;
        this.AnimationManager = animationManager;
        this.WrapperService = null;
        this.EventHandler = eventHandler;
        this.SoundFactory = soundFactory;
        this.AppEvents = AppEvents;
        this.SlotEvents = SlotEvents;
        this.Model = {};
        this.Model.GameInfo = {};
        this.Model.GameResult = {};
        this.Model.DeviceConfig = {};
        this.Model.GameConfig = {};
        this.Model.LoadConfig = {};
        this.Model.SoundLoadConfig = {};
        this.Model.Content = {};
        this.Model.TextConfig = {};
        this.winValue = 0;
        this.Logger = Logger;

    }
}


export const CoreLib = new CoreLibApp();
