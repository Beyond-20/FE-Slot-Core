import {LibContainer} from "../../pixiwrapper/LibContainer";
import {CoreLib} from "../../core/CoreLib";

export class SliderComp extends LibContainer {
    constructor(config) {
        super(config);
        this.isMapped = false;
    }

    createView ( width, length, totalvalue , title, app) {
        this.SLIDE_LENGTH = length;
        this.SLIDE_WIDTH = width;
        this.SLIDE_COL = 0xffffff;
        this.SLIDE_X0 = 0;
        this.SLIDE_Y0 = 0;
        this.totalValue = totalvalue;

        this.app = app;

        this.KNOB_COL = 0xaaaaaa;

        this.container = CoreLib.UIUtil.getContainer();
        this.addChild(this.container);

        this.clickRect = CoreLib.UIUtil.getRectangle(100,50, 0xffff00);
        this.container.addChild(this.clickRect);
        this.clickRect.y = -28;
        CoreLib.UIUtil.setClickable(this.clickRect, true);
        CoreLib.UIUtil.setModalState(this.clickRect);
        CoreLib.UIUtil.addInteraction(this.clickRect, this.onClickRectClicked.bind(this))


        this.slide = new PIXI.Graphics();
        this.slide.lineStyle(this.SLIDE_WIDTH, this.SLIDE_COL, 1);
        this.slide.moveTo(this.SLIDE_X0, this.SLIDE_Y0);
        this.slide.lineTo(this.SLIDE_X0 + this.SLIDE_LENGTH, this.SLIDE_Y0);
        this.slide.alpha = 0.4;

        this.slidebg = new PIXI.Graphics();
        this.slidebg.lineStyle(this.SLIDE_WIDTH, 0xffffff, 1);
        this.slidebg.alpha = 0.8;
        this.slidebg.moveTo(this.SLIDE_X0, this.SLIDE_Y0);
        this.slidebg.lineTo(this.SLIDE_X0 + this.SLIDE_LENGTH, this.SLIDE_Y0);

        this.maskRect = CoreLib.UIUtil.getRectangle(this.SLIDE_LENGTH, 8, 0x0bb461);
        this.maskRect.y = -4;


        this.knob = CoreLib.UIUtil.getSprite("sliderknob");
        this.knob.interactive = true;
        this.knob.buttonMode = true;
        this.knob.anchor.x = 0.1;
        this.knob.anchor.y = 0.5;
        this.knob.x = this.SLIDE_X0;
        this.knob.y = this.SLIDE_Y0;

        this.clickRect.width = this.SLIDE_LENGTH;
        this.clickRect.x = this.slide.x;
        this.clickRect.renderable = false;

        this.container.addChild(this.slide);
        this.container.addChild(this.slidebg);
        this.container.addChild(this.maskRect);
        this.container.addChild(this.knob);
        //this.slidebg.mask = this.maskRect;
        //this.maskRect.scale.x = 0;

        let obj = {name : "sliderText", type : "Text", content : "", style : "commonFontStyle", anchor : {x:0, y: 0}, fontSize : 18, mFontSize : 50, fontColor : 0x0bb461}
        this.valueText = CoreLib.UIUtil.getElement(obj);
        this.valueText.text = "None";
        this.addChild(this.valueText);


        let obj1 = {name : "titleText", type : "Text", content : title, style : "commonFontStyle", anchor : {x:0, y: 0}, fontSize: 18, mFontSize: 44}
        this.titleText = CoreLib.UIUtil.getElement(obj1);
        this.titleText.text = this.titleText.text + " : ";
        //this.addChild(this.titleText);

        this.valueText.x = this.slidebg.x + this.slidebg.width - this.valueText.width;
        this.valueText.y = this.titleText.y - 10;
        this.valueText.text = "None";

        this.container.y = this.titleText.height * 2;



        const refObj = this;
        // use the mousedown and touchstartthis.
        this.knob.mousedown = this.knob.touchstart = function (data) {
            this.data = data;
            this.alpha = 0.9;
            this.dragging = true;
            refObj.draggingStart();
        };

        // set the events for when the mouse is released or a touch is released
        this.knob.mouseup = this.knob.mouseupoutside = this.knob.touchend = this.knob.touchendoutside = function (data) {
            this.alpha = 1
            this.dragging = false;
            this.data = null;
            refObj.draggingEnd();
        };

        // set the callbacks for when the mouse or a touch moves
        this.knob.mousemove = this.knob.touchmove = function (data) {
            if (this.dragging) {
                let newPosition = this.data.data.global;
                newPosition = this.parent.toLocal(newPosition);
                if (newPosition.x >= refObj.SLIDE_X0 && newPosition.x <= refObj.SLIDE_X0 + refObj.SLIDE_LENGTH - this.width / 2) {
                    this.x = newPosition.x;
                    refObj.updateValue();
                } else if (newPosition.x < refObj.SLIDE_X0) {
                    this.x = refObj.SLIDE_X0;
                    refObj.updateValue();
                } else if (newPosition.x > refObj.SLIDE_X0 + refObj.SLIDE_LENGTH - this.width / 2) {
                    this.x = refObj.SLIDE_X0 + refObj.SLIDE_LENGTH - this.width / 2;
                    refObj.updateValue();
                }
            }
        }
        this.updateValue();
        this.disable();
    }

    disable () {
        this.init();
        this.knob.interactive = false;
        CoreLib.UIUtil.setClickable(this.clickRect, false);

    }
    enable () {
        this.init();
        this.knob.interactive = true;
        CoreLib.UIUtil.setClickable(this.clickRect, true);
    }

    resize (wid) {
        this.SLIDE_LENGTH = wid;
        this.slidebg.width = wid;
        this.slide.width = wid;
        this.clickRect.width = wid;
        this.maskRect.destroy();
        this.maskRect = CoreLib.UIUtil.getRectangle(this.SLIDE_LENGTH, 8, 0x0bb461);
        this.maskRect.y = -4;
        this.slidebg.mask = this.maskRect;
        this.container.addChild(this.maskRect);
        this.setSliderVal(this.currentValue);
        this.updateValue();

    }

    onClickRectClicked (data) {
        let newPosition = data.data.global;
        newPosition = this.toLocal(newPosition);
        let perc = Math.round((newPosition.x / this.clickRect.width) * 100);
        this.setSliderVal(perc, true);
        //this.updateValue()
    }

    draggingStart () {
        //gameConfig.controlPanelView.panel.setStageClickState(false);
    }

    draggingEnd () {
        setTimeout(this.draggingEndStep2.bind(this), 50)

    }
    draggingEndStep2 (){
        //gameConfig.controlPanelView.panel.setStageClickState(true);
    }
    updateValue(flag) {
        if (flag === undefined) {
            flag = false;
        }
        this.currentValue = Math.round(this.totalValue * this.getSliderVal() /100);
        if (this.isMapped) {
            let perc = (this.currentValue / this.totalValue)
            let index = Math.round((this.valueMap.length - 1) * perc);
            if (index >= this.valueMap.length) {
                index = this.valueMap.length - 1;
            }
            this.currentText = this.valueMap[index];
        } else {
            this.currentText = this.currentValue;
        }
        if (this.valueText) {
            if (this.configData.isAmountField) {
                if (this.currentValue <= 0 && !this.isMapped) {
                    this.valueText.text = CoreLib.Util.getContent("notSet");
                } else {
                    this.valueText.text = CoreLib.WrapperService.formatCurrency(this.currentText);
                }

            } else {
                if (this.currentValue <= 0 && !this.isMapped) {
                    this.valueText.text = CoreLib.Util.getContent("notSet");
                } else {
                    this.valueText.text = this.currentText;
                }

            }


        }
        this.valueText.x = this.slidebg.x + this.slidebg.width - this.valueText.width;
        this.maskRect.scale.x = this.currentValue / this.totalValue;
        this.emit("SliderUpdate", this.currentValue)
    }
    setMapValues (arr) {
        this.isMapped = true;
        this.valueMap = arr;
    }

    getSliderVal () {
        if (this.knob) {
            return ((this.knob.x - this.SLIDE_X0) / (this.SLIDE_LENGTH - this.knob.width / 2) * 100);

        } else {
            return 0;
        }

    }

    getSelectedValue () {
        return this.currentValue;
    }

    setSliderVal (x, isAnimate = false) {
        if (this.knob) {
            if (isAnimate) {
                let xx = parseInt(x * (this.SLIDE_LENGTH - this.knob.width / 2) / 100 + this.SLIDE_X0);
                CoreLib.AnimationManager.animateTween(this.knob, 0.1, {x : xx, onComplete : this.onKnobAnimComplete.bind(this), ease : Power2.easeOut});
            } else {
                this.knob.x = parseInt(x * (this.SLIDE_LENGTH - this.knob.width / 2) / 100 + this.SLIDE_X0);
            }

        }
    }
    onKnobAnimComplete () {
        this.updateValue()
    }

    init (val = 0) {
        this.setSliderVal(val);
        this.updateValue(true);
    }

}




