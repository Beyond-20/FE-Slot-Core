import {CoreLib} from "../../core/CoreLib";
import {LibContainer} from "../../pixiwrapper/LibContainer";

export class DontShowNextTimeComp extends LibContainer {
    constructor(config) {
        super(config);

        this.bg = CoreLib.UIUtil.getSprite("splashToggleOff");
        this.addChild(this.bg);

        if (config.tickImage != undefined) {
            this.tick = CoreLib.UIUtil.getSprite(config.tickImage);
        } else {
            this.tick = CoreLib.UIUtil.getSprite("splashToggleTick");
        }
        this.addChild(this.tick);

        let tconfig = {name : "titleText", type : "Text", content : "dontShowNextTime", style : this.configData.textStyle, fontSize : this.configData.fontSize, mFontSize : this.configData.mFontSize, fontColor : this.configData.fontColor, anchor : {x : 0, y : 0.5}};
        this.titleTxt = CoreLib.UIUtil.getElement(tconfig);
        this.addChild(this.titleTxt);
        CoreLib.UIUtil.setPosition(this.titleTxt, this.bg.x + this.bg.width, this.bg.y + this.bg.height * 0.66);

        CoreLib.UIUtil.addInteraction(this.bg, this.onBGClicked.bind(this));
        CoreLib.UIUtil.setClickable(this.bg, true);
        this.setState();
        CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents.LOCALDATA_STATE_CHANGE, this.setState.bind(this));
        if (CoreLib.Model.DeviceConfig.isDevice) {
            this.tick.x = CoreLib.Util.getDefaultValue(this.configData.tickXPadding, 0);
            this.tick.y = CoreLib.Util.getDefaultValue(this.configData.tickYPadding, 0);
        }
    }



    onBGClicked () {
        CoreLib.Model.GameConfig.splashState = !CoreLib.Model.GameConfig.splashState;
        CoreLib.WrapperService.setSplashState(CoreLib.Model.GameConfig.splashState);
    }

    setState (){
        this.tick.visible = !CoreLib.Model.GameConfig.splashState;
    }


}
