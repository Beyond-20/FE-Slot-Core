import {SliderComp} from "./SliderComp";
import { CoreLib } from '../../core/CoreLib'
import { LibContainer } from '../../pixiwrapper/LibContainer'

export class CircularTimer extends LibContainer {
    constructor(config) {
        super(config);

        this.bg = CoreLib.UIUtil.getSprite("timercircle");
        this.addChild(this.bg);

        this.filledCircle = CoreLib.UIUtil.getSprite("timerborder");
        this.addChild(this.filledCircle);
        this.filledCircle.tint = this.configData.fillColor;
        this.filledCircle.visible = false;


        // this.maskCircle = CoreLib.UIUtil.getSemiCircle(60, 0xff0000, this.filledCircle.width / 2, CoreLib.Util.getRadians(360));
        // this.addChild(this.maskCircle);
        // this.maskCircle.x = this.filledCircle.width / 2;
        // this.maskCircle.y = this.filledCircle.height / 2;

        //this.filledCircle.mask = this.maskCircle;

        let tobj = {};
        tobj.type = "Text";
        tobj.style = this.configData.style;
        tobj.fontSize = this.configData.fontSize;
        tobj.mFontSize = this.configData.mFontSize;
        tobj.anchor = { x: 0.5, y : 0.5 };
        tobj.fontColor = this.configData.fontColor;
        tobj.align = "center";

        this.valueText = CoreLib.UIUtil.getTextField(tobj);
        this.valueText.anchor.set(0.5,0.5);
        CoreLib.UIUtil.setPosition(this.valueText, this.bg.width / 2, this.bg.height / 2 - 4);
        this.valueText.text = 0;
        this.addChild(this.valueText);


    }

    showValue (val) {
        this.valueText.text = val;
    }
    updatePercentage(val) {
        if(this.maskCircle){
            this.maskCircle.destroy();
            this.maskCircle = null;
        }
        if (val < 0) {
          this.filledCircle.visible = false;
          return;
        }
        let angle = CoreLib.Util.getRadians((360 * (-val / 100)));
        this.maskCircle = CoreLib.UIUtil.getSemiCircle(
          60,
          0xffff00,
          this.filledCircle.width / 3,
          angle,
          CoreLib.Util.getRadians(-90),
          true
        );
        this.addChild(this.maskCircle);
        this.addChild(this.valueText);
        this.filledCircle.visible = true;
        this.maskCircle.x = this.filledCircle.width / 2;
        this.maskCircle.y = this.filledCircle.height / 2;
        this.filledCircle.mask = this.maskCircle;

      }

      updateBetStatusCompPercentage(val){
        this.showValue(val);
        if(this.maskCircle){
            this.maskCircle.destroy();
            this.maskCircle = null;
        }
        if (val <= 0) {
          this.filledCircle.visible = false;
          return;
        }
        let drawAngle = CoreLib.Util.getRadians((360 / 100) * val);

        this.maskCircle = CoreLib.UIUtil.getSemiCircle(
          60,
          0xffff00,
          this.filledCircle.width / 3,
          drawAngle,
          -1.6,
          false
        );
        this.addChild(this.maskCircle);
        this.addChild(this.valueText);
        this.filledCircle.visible = true;
        this.maskCircle.x = this.filledCircle.width / 2;
        this.maskCircle.y = this.filledCircle.height / 2;
        this.filledCircle.mask = this.maskCircle;
      }

}
