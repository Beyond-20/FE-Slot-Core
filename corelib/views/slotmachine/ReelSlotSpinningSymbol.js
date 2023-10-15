import {LibContainer} from "../../pixiwrapper/LibContainer";
import {CoreLib} from "../../core/CoreLib";
import { Power4 } from '../../../games/funhouse/jslibs/1.00/gsap/gsap.min'

export class ReelSlotSpinningSymbol extends LibContainer {
    constructor (symbNum, symbName, symbData, frameData, symbHt) {
        super();
        this.symbolsData = symbData;
        this.symbolNumber = symbNum;
        this.symbolName = symbName;
        this.symbolHeight = symbHt;
        this.symbCont = CoreLib.UIUtil.getContainer();
        this.addChild(this.symbCont);
        // this.maskRect = CoreLib.UIUtil.getSprite("maskFrame");
        // this.addChild(this.maskRect);
        // this.maskRect.x = -this.maskRect.width / 2;
        // this.maskRect.y = -this.maskRect.height / 2;
        // this.maskRect.visible = false;
        // this.mask = null;

        

        this.createSymbol();

        this.whiteBox = CoreLib.UIUtil.getRectangle(this.symbolHeight, this.symbolHeight, 0xffffff);
        this.addChild(this.whiteBox);
        this.whiteBox.x = -this.whiteBox.width / 2;
        this.whiteBox.y = -this.whiteBox.height / 2;
        this.whiteBox.visible = false;

        this.winFrame = CoreLib.UIUtil.getElement(frameData);
        this.addChild(this.winFrame);
        this.winFrame.gotoAndStop(0);
        this.winFrame.visible = false;




        let config = {name: "element1", type: "AnimatedSprite", animation : {prefix : "reelspin_0", postfix: "", start : 1, end : 20, toAddZero : true}};
        this.spinMovie = CoreLib.UIUtil.getElement(config);
        this.addChild(this.spinMovie);
        this.spinMovie.gotoAndStop(0);
        this.spinMovie.visible = false;

    }

    showLandingAnimation () {
        let anim = CoreLib.Model.GameConfig.symbolsData[this.symbolNumber].landingAnimation;
        if (anim) {
            this.winSymbol = CoreLib.UIUtil.getAnimatedSprite(anim);
            this.addChild(this.winSymbol);
            this.winSymbol.loop = false;
            this.winSymbol.play();
            this.winSymbol.onComplete = this.onLandingDone.bind(this);
            this.symbol.visible = false;

        }

    }
    startSpin () {
        clearTimeout(this.frameid);
        if (this.winFrame) {
            this.winFrame.visible = false;
            this.winFrame.gotoAndStop(0);
        }
        this.stoppingStarted = false;
        this.isBlurred = true;
        this.symbol.visible = false;
        this.symbol.y = -this.symbolHeight;

        this.spinMovie.visible = true;
        this.spinMovie.gotoAndPlay(CoreLib.Util.getRandomRange(0,19));
        CoreLib.AnimationManager.animateTween(this.symbCont, 0.15, { y : this.symbolHeight * (this.totalSymbols - 1), repeat : -1, ease : Linear.easeNone})
    }
    stopReelSpin (val, name, delay, reelno, rowno, isTurbo) {
        if (this.stoppingStarted) {
            return;
        }
        clearTimeout(this.stopId);
        if (isTurbo) {
            this.stopId = setTimeout(this.stopReelSpinNow.bind(this, val, name, reelno, rowno, 0.20, true), delay);
        } else {
            this.stopId = setTimeout(this.stopReelSpinNow.bind(this, val, name, reelno, rowno, 0.50), delay);
        }

    }
    stopReelSpinForWild (val, name, delay, reelno, rowno, isTurbo) {
        let newdelay = (3 - rowno) * 100 + (reelno * 200);
        clearTimeout(this.stopreelId);
        this.stopreelId = setTimeout(this.stopReelSpinNowForWild.bind(this, val, name, reelno, rowno, 0.25), newdelay);
    }
    stopReelSpinNow (val, name, reelno, rowno, duration = 0.5, isTurbo) {
        this.isBlurred = false;
        this.swapSymbolTexture(val, name);

        this.symbol.y = -40;
        this.symbol.visible = true;
        this.spinMovie.gotoAndStop(0);
        this.spinMovie.visible = false;
        if (isTurbo) {
            duration = 0.20;
        }
        this.stoppingStarted = true;
        let customEase = Elastic.easeOut.config(0.8,0.4);
        CoreLib.AnimationManager.animateTween(this.symbol, duration, {y : 0, ease : customEase, onComplete : this.onSymbolStopped.bind(this, reelno, rowno)});
        CoreLib.EventHandler.dispatchEvent("SPINNING_SYMBOL_STOPPED", reelno);
        clearTimeout(this.checkerId);
        this.checkerId = setTimeout(this.checkForWildFrame.bind(this), 100);
    }
    stopReelSpinNowForWild (val, name, reelno, rowno, duration = 0.75) {
        this.isBlurred = false;
        this.swapSymbolTexture(val, name);
        this.symbol.y = 0;
        this.symbol.visible = true;
        this.spinMovie.gotoAndStop(0);
        this.spinMovie.visible = false;
        this.whiteBox.alpha = 1;
        this.whiteBox.visible = true;
        this.addChild(this.whiteBox);
        let customEase = Power2.easeIn;
        this.symbol.alpha = 0;
        CoreLib.AnimationManager.animateTween(this.symbol, 0.4, {delay : 0.3, alpha : 1, ease : Power2.eaesIn});
        CoreLib.AnimationManager.animateTween(this.whiteBox, 0.4, {alpha : 0, ease : customEase, onComplete : this.onSymbolStopped.bind(this, reelno, rowno)});
        CoreLib.EventHandler.dispatchEvent("SPINNING_SYMBOL_STOPPED", reelno);

    }
    checkForWildFrame () {
        if (this.symbolName == "WD") {
            this.showFrame();
        }
    }

    onSymbolStopped (reelno, rowno) {

    }
    showFrame () {
        this.winFrame.visible = true;
        this.winFrame.gotoAndPlay(0);
        this.addChild(this.winFrame);
        clearTimeout(this.frameid);
        this.frameid = setTimeout(this.clearWildFrame.bind(this), 1000);
    }
    clearWildFrame () {
        this.symbol.visible = true;
        if (this.winFrame) {
            this.winFrame.visible = false;
            this.winFrame.gotoAndStop(0);
        }
        clearTimeout(this.frameid);

    }
    getRandomSymbol() {
        let index = 0;
        let val;
        let target = CoreLib.Util.getRandomRange(1,8)
        for (let p in this.symbolsData) {
            if (index == target) {
                val = p;
            }
            index++;
        }
        let symbname;
        symbname = this.symbolsData[val].name;
        return symbname;
    }

    onLandingDone () {
        this.clearSymbolSpinWin();
    }
    replaceSymbol (symb) {
        this.swapSymbolTexture(symb);
    }
    swapSymbolTexture (val, name) {
        if (this.winSymbol) {
            this.winSymbol.destroy();
            this.removeChild(this.winSymbol);
            this.winSymbol = null;
        }
        this.symbolNumber = val;
        this.symbolName = name;
        if (this.isBlurred) {
            this.symbol.texture = CoreLib.UIUtil.getTexture(this.symbolName + "_blur");
        } else {
            this.symbol.texture = CoreLib.UIUtil.getTexture(this.symbolsData[val].name);
        }
    }

    getSymbolNumber () {
        return this.symbolNumber;
    }

    createSymbol () {
        this.isBlurred = false;
        this.symbol = CoreLib.UIUtil.getSprite(this.symbolName);
        this.symbol.name = "symbol";
        this.symbol.anchor.set(0.5,0.5);
        CoreLib.UIUtil.setPosition(this.symbol, 0, 0);
        this.addChild(this.symbol);
    }
    addBlur (flag) {
        if (flag) {
            if (!this.isBlurred) {
                this.symbol.texture = CoreLib.UIUtil.getTexture(this.symbolName + "_blur");
                this.isBlurred = true;
            }
        } else {
            if (this.isBlurred) {
                this.symbol.texture = CoreLib.UIUtil.getTexture(this.symbolName);
                this.isBlurred = false;
            }
        }
    }

    showFaded (flag) {
        if (flag) {
            this.symbol.alpha = 0.6;
        } else {
            this.symbol.alpha = 1;
        }
    }

    hideSymbol () {
        this.symbol.visible = false;
    }
    showSymbol () {
        this.symbol.visible = true;

    }
    showSymbolWin(symbol, showFrame, isAllWin) {
        clearTimeout(this.frameid);
        this.hideSymbol();
        this.showFaded(false);
        let anim = CoreLib.Model.GameConfig.symbolsData[this.symbolNumber].animation;
        this.winSymbol = CoreLib.UIUtil.getAnimatedSprite(anim);
        this.addChild(this.winSymbol);
        this.winSymbol.loop = false;
        this.winSymbol.play();
        this.winFrame.visible = true;
        this.winFrame.gotoAndPlay(0);
        this.addChild(this.winFrame);


    }

    showTriggeringWin() {

        this.hideSymbol();
        this.showFaded(false);
        let anim = CoreLib.Model.GameConfig.symbolsData[this.symbolNumber].animation;
        this.winSymbol = CoreLib.UIUtil.getAnimatedSprite(anim);
        this.addChild(this.winSymbol);
        this.winSymbol.loop = true;
        this.winSymbol.play();
        this.winFrame.visible = true;
        this.winFrame.gotoAndPlay(0);
        this.addChild(this.winFrame);
    }
    clearSymbolSpinWin () {
        if (this.winSymbol) {
            this.winSymbol.destroy();
            this.winSymbol = null;
        }

        this.showSymbol();
        this.clearWildFrame();
    }
    clearAllSymbolEffects () {
        if (this.winSymbol) {
            this.removeChild(this.winSymbol);
            this.winSymbol.destroy();
            this.winSymbol = null;
        }
        CoreLib.AnimationManager.killTweensOf(this.symbol);
        this.symbol.scale.set(1);
        this.symbol.alpha = 1;
        this.symbol.visible = true;
        this.symbol.renderable = true;
        this.symbol.filters = null;
        this.clearWildFrame();
    }

    
    
    destroySymbol() {
        this.symbol.destroy();
    }
    
}
