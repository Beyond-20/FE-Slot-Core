import {LibContainer} from "../../pixiwrapper/LibContainer";
import {CoreLib} from "../../core/CoreLib";

export class ReelSlotSymbol extends LibContainer {
    constructor (symbNum, symbName) {
        super();
        this.symbolNumber = symbNum;
        this.symbolName = symbName;
        if (CoreLib.Model.GameConfig.symbolWinFrame) {
            this.winFrame = CoreLib.UIUtil.getElement(CoreLib.Model.GameConfig.symbolWinFrame);
            this.addChild(this.winFrame);
            this.winFrame.stopAnimation();
            this.winFrame.visible = false;
        }
        this.createSymbol();
       //setTimeout(this.showSymbolWin.bind(this), 5000);

    }

    showLandingAnimation () {
        let anim = CoreLib.Model.GameConfig.symbolsData[this.symbolNumber].landingAnimation;
        if (this.winSymbol) {
            this.removeChild(this.winSymbol);
            this.winSymbol.destroy();
            this.winSymbol = null;
        }
        if (anim) {
            this.winSymbol = CoreLib.UIUtil.getAnimatedSprite(anim);
            this.addChild(this.winSymbol);
            this.winSymbol.loop = false;
            this.winSymbol.play();
            this.winSymbol.onComplete = this.onLandingDone.bind(this);
            this.symbol.visible = false;

        }

    }

    onLandingDone () {
        this.clearSymbolSpinWin();
    }
    replaceSymbol (symb) {
        this.swapSymbolTexture(symb);
    }
    swapSymbolTexture (val, name) {
        if (this.winSymbol) {
            this.removeChild(this.winSymbol);
            this.winSymbol.destroy();
            this.winSymbol = null;
        }
        this.symbolNumber = val;
        this.symbolName = name;
        if (this.isBlurred) {
            this.symbol.texture = CoreLib.UIUtil.getTexture(this.symbolName + "_blur");
        } else {
            this.symbol.texture = CoreLib.UIUtil.getTexture(this.symbolName);
        }
    }

    getSymbolNumber () {
        return this.symbolNumber;
    }

    createSymbol () {
        this.isBlurred = false;
        this.symbol = CoreLib.UIUtil.getSprite(this.symbolName);
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
        this.hideSymbol();
        if (this.winSymbol) {
            this.removeChild(this.winSymbol);
            this.winSymbol.destroy();
            this.winSymbol = null;
        }
        this.showFaded(false);
        let winState = CoreLib.Model.GameConfig.symbolsData[this.symbolNumber];

        if (this.winFrame) {
            this.winFrame.playAnimation(this.winFrame.configData.defaultState, this.winFrame.configData.loop);
            this.winFrame.visible = true;
        }
        if(CoreLib.Model.GameConfig.symbolsData[this.symbolNumber].type && CoreLib.Model.GameConfig.symbolsData[this.symbolNumber].type == "Spine"){
            if (winState.winAnimation != undefined) {
                this.winSymbol = CoreLib.UIUtil.getSpineAnim(winState.spineName);
                this.winSymbol.playAnimation(winState.winAnimation, winState.loop == undefined ? true : winState.loop);
                if (winState.scale && winState.scale.x) {
                    this.winSymbol.scale.x = winState.scale.x;
                }
                if (winState.scale && winState.scale.y) {
                    this.winSymbol.scale.y = winState.scale.y;
                }
                if (winState.scale != undefined && winState.scale.x == undefined && winState.scale.y == undefined) {
                    this.winSymbol.scale.set(winState.scale);
                }
                if (winState.x) {
                    this.winSymbol.x = winState.x;
                }
                if (winState.y) {
                    this.winSymbol.y = winState.y;
                }
                this.addChild(this.winSymbol);
            }
        }else {
            let anim = CoreLib.Model.GameConfig.symbolsData[this.symbolNumber].animation;
            this.winSymbol = CoreLib.UIUtil.getAnimatedSprite(anim);
            if (anim.scale != undefined) {
                this.winSymbol.scale.set(anim.scale);
            }
            if (anim.x) {
                this.winSymbol.x = anim.x;
            }
            if (anim.y) {
                this.winSymbol.y = anim.y;
            }
            this.addChild(this.winSymbol);
            this.winSymbol.loop = true;
            this.winSymbol.play();
        }


    }
    stopCustomAnimation () {
        if (this.winSymbol) {
            this.winSymbol.stopAnimation();
        }
    }
    resumeCustomAnimation () {
        if (this.winSymbol) {
            let winState = CoreLib.Model.GameConfig.symbolsData[this.symbolNumber];
            this.winSymbol.playAnimation(winState.animationSpecial, winState.loop == undefined ? true : winState.loop);
        }
    }
    showCustomAnim () {
        if (this.winSymbol) {
            this.removeChild(this.winSymbol);
            this.winSymbol.destroy();
            this.winSymbol = null;
        }
        let winState = CoreLib.Model.GameConfig.symbolsData[this.symbolNumber];
        if (winState.animationSpecial != undefined) {
            this.winSymbol = CoreLib.UIUtil.getSpineAnim(winState.spineName);
            this.winSymbol.playAnimation(winState.animationSpecial, winState.loop == undefined ? true : winState.loop);
            if (winState.scale && winState.scale.x) {
                this.winSymbol.scale.x = winState.scale.x;
            }
            if (winState.scale && winState.scale.y) {
                this.winSymbol.scale.y = winState.scale.y;
            }
            if (winState.scale != undefined && winState.scale.x == undefined && winState.scale.y == undefined) {
                this.winSymbol.scale.set(winState.scale);
            }
            if (winState.x) {
                this.winSymbol.x = winState.x;
            }
            if (winState.y) {
                this.winSymbol.y = winState.y;
            }

            this.addChild(this.winSymbol);

        } else {
            let anim = CoreLib.Model.GameConfig.symbolsData[this.symbolNumber].animation;
            this.winSymbol = CoreLib.UIUtil.getAnimatedSprite(anim);
            this.addChild(this.winSymbol);
            if (anim.scale != undefined) {
                this.winSymbol.scale.set(anim.scale);
            }
            if (anim.x) {
                this.winSymbol.x = anim.x;
            }
            if (anim.y) {
                this.winSymbol.y = anim.y;
            }
            this.winSymbol.loop = true;
            if(CoreLib.Model.GameConfig.customWildSpeed){
                this.winSymbol.animationSpeed = CoreLib.Model.GameConfig.customWildSpeed;
            }
            this.winSymbol.play();
        }
        this.removeChild(this.symbol);
        this.symbol.destroy();
        this.symbol = null;
    }

    showTriggeringWin() {
        this.hideSymbol();
        if (this.winSymbol) {
            this.removeChild(this.winSymbol);
            this.winSymbol.destroy();
            this.winSymbol = null;
        }
        this.showFaded(false);
        let winState = CoreLib.Model.GameConfig.symbolsData[this.symbolNumber];
        if(CoreLib.Model.GameConfig.symbolsData[this.symbolNumber].type && CoreLib.Model.GameConfig.symbolsData[this.symbolNumber].type == "Spine"){
            if (winState.winAnimation != undefined) {
                this.winSymbol = CoreLib.UIUtil.getSpineAnim(winState.spineName);
                this.winSymbol.playAnimation(winState.winAnimation, winState.loop == undefined ? true : winState.loop);
                if (winState.scale && winState.scale.x) {
                    this.winSymbol.scale.x = winState.scale.x;
                }
                if (winState.scale && winState.scale.y) {
                    this.winSymbol.scale.y = winState.scale.y;
                }
                if (winState.scale != undefined && winState.scale.x == undefined && winState.scale.y == undefined) {
                    this.winSymbol.scale.set(winState.scale);
                }
                if (winState.x) {
                    this.winSymbol.x = winState.x;
                }
                if (winState.y) {
                    this.winSymbol.y = winState.y;
                }
                this.addChild(this.winSymbol);
            }

        }else {
            let anim = CoreLib.Model.GameConfig.symbolsData[this.symbolNumber].animation;
            this.winSymbol = CoreLib.UIUtil.getAnimatedSprite(anim);
            if (anim.scale != undefined) {
                this.winSymbol.scale.set(anim.scale);
            }
            if (anim.x) {
                this.winSymbol.x = anim.x;
            }
            if (anim.y) {
                this.winSymbol.y = anim.y;
            }
            this.addChild(this.winSymbol);
            this.winSymbol.loop = false;
            this.winSymbol.play();
        }
    }
    clearSymbolSpinWin () {
        if (this.winSymbol) {
            this.removeChild(this.winSymbol);
            this.winSymbol.destroy();
            this.winSymbol = null;
        }
        if (this.winFrame) {
            this.winFrame.stopAnimation();
            this.winFrame.visible = false;
        }
        this.showSymbol();
    }
    clearAllSymbolEffects () {
        if (this.winSymbol) {
            this.removeChild(this.winSymbol);
            this.winSymbol.destroy();
            this.winSymbol = null;
        }
        if (this.symbol) {
            CoreLib.AnimationManager.killTweensOf(this.symbol);
            this.symbol.scale.set(1);
            this.symbol.alpha = 1;
            this.symbol.visible = true;
            this.symbol.renderable = true;
            this.symbol.filters = null;
        }
    }
    
    
    
    
    destroySymbol() {
        if (this.symbol) {
            this.symbol.destroy();
        }

    }
    
}
