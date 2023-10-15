import {LibContainer} from '../../pixiwrapper/LibContainer'
import {CoreLib} from '../../core/CoreLib'
import { Physics2DPlugin } from '../../../games/funhouse/jslibs/1.00/gsap/Physics2DPlugin.min'
import { TimelineMax } from '../../../games/funhouse/jslibs/1.00/gsap/gsap.min'


let vMin = 200;
let vMax = 350;
let gravity = 1600;
let angMin = 260;
let angMax = 280;
let xProp = "x";
let yProp = "y";

export class CoinFallAnimation extends LibContainer {
    constructor(config) {
        super(config);
        gsap.registerPlugin(Physics2DPlugin);
        this.coinsArray = [];
        this.coinfallAnimArray = [];

        //setTimeout(this.showCoinFallAnim.bind(this), 2000);
        // setTimeout(this.stopCoinFall.bind(this,1), 10000);

    }
    showCoinFallAnim () {
        this.stopBigWinCoinSound = true;
        CoreLib.EventHandler.dispatchEvent("PLAY_BIG_WIN_COUNTUP_LOOP");
        if (this.configData.fallType == 1) {
            this.showCoinFallFromTop(1, 100);
        } else if(this.configData.fallType == 2){
            this.showCoinFallFromTopWithBounce(1, 200);
            //setTimeout(this.showCoinFallFromBottom.bind(this), 1500, 2);
        }
        else {
            this.showCoinFall(1)
        }
    }
    stopCoinFall() {
        this.isStopped = true;
    }

    showCoinFallFromTopWithBounce (type, coinsCount) {
        this.isStopped = false;
        this.visible = true;
        let totalCoins = CoreLib.Model.DeviceConfig.isDesktop ? coinsCount : 2 * coinsCount;
        let duration = 2;
        if (CoreLib.Model.DeviceConfig.isMobile) {
            duration = 3;
        } else if (CoreLib.Model.DeviceConfig.isTablet) {
            duration = 4;
        }
        this.coinsArray = [];

        for (let k = 0; k < totalCoins; k++) {
            let rnd = CoreLib.Util.getRandomRange(0, this.configData.animations.length - 1)
            let coin = CoreLib.UIUtil.getElement(this.configData.animations[rnd]);
            this.coinsArray.push(coin);
            coin.index = k;
            this.addChild(coin);
            coin.loop = true;
            coin.play();
            if (CoreLib.Model.DeviceConfig.isDesktop) {
                coin.y = -150;
                coin.x = CoreLib.Util.getRandomRange(-300, CoreLib.UIUtil.getGameWidth() * 1.1);
            } else {
                if (CoreLib.Model.DeviceConfig.isPortrait) {
                    coin.x = CoreLib.Util.getRandomRange(0, CoreLib.UIUtil.getGameWidth() * 2.5);
                    coin.y = -1000;
                } else {
                    coin.x = CoreLib.Util.getRandomRange(-300, CoreLib.UIUtil.getGameWidth() * 1.5);
                    coin.y = -250;
                }
            }
            let delay = Math.random() * duration * .6;
            coin.visible = false;
            duration = Math.random() * 4 + 2;
            var rnum = CoreLib.Util.getRandomRange(1,2);
            let sc;
            if (CoreLib.Model.DeviceConfig.isDesktop) {
                sc = Math.floor(Math.random() * (0.80 - 0.08)) + 0.08;
            } else {
                sc = Math.floor(Math.random() * (0.45 - 0.15)) + 0.1;
            }
            coin.scale.set(sc);
            CoreLib.AnimationManager.animateTween(coin, duration, {delay : delay, rotation : CoreLib.Util.getRadians(CoreLib.Util.getRandomRange(-90,120)),
                y : CoreLib.UIUtil.getGameHeight() + coin.height * 2,
                ease : "bounce.out",
                transformOrigin:"center center",
                onComplete : this.onAnimDoneFromTopWithBounce.bind(this), onCompleteParams : [coin], onStart : this.onAnimStart.bind(this), onStartParams : [coin]});
        }
    }
    onAnimDoneFromTopWithBounce (coin) {
        if (coin) {
            if (this.isStopped) {
                if(this.stopBigWinCoinSound) {
                    this.stopBigWinCoinSound = false;
                    CoreLib.EventHandler.dispatchEvent("PLAY_BIG_WIN_COUNTUP_END");
                }
                CoreLib.AnimationManager.killTweensOf(coin);
                coin.destroy();
                coin = null;
            } else {
                let rnd = CoreLib.Util.getRandomRange(0, this.configData.animations.length - 1)
                let duration = Math.random() * 4 + 2;
                coin.x = CoreLib.UIUtil.getGameWidth() * Math.random();
                coin.y = -coin.height * 1.5;
                let sc;
                if (CoreLib.Model.DeviceConfig.isDesktop) {
                    sc = Math.floor(Math.random() * (0.40 - 0.08)) + 0.08;
                } else {
                    sc = Math.floor(Math.random() * (0.3 - 0.15)) + 0.1;
                }
                coin.scale.set(sc);
                let delay = 0.1;
                CoreLib.AnimationManager.animateTween(coin, duration / 2, {delay : delay, rotation : CoreLib.Util.getRadians(CoreLib.Util.getRandomRange(-90,120)),
                    y : CoreLib.UIUtil.getGameHeight() + coin.height * 2,
                    ease : "bounce.out",
                    transformOrigin:"center center",
                    onComplete : this.onAnimDoneFromTopWithBounce.bind(this), onCompleteParams : [coin], onStart : this.onAnimStart.bind(this), onStartParams : [coin]});
            }
        }
    }
    showCoinFallFromTop (type = 2, coinsCount) {
        this.isStopped = false;
        this.visible = true;
        let totalCoins = CoreLib.Model.DeviceConfig.isDesktop ? coinsCount : 2 * coinsCount;
        let duration = 2;
        if (CoreLib.Model.DeviceConfig.isMobile) {
            duration = 3;
        } else if (CoreLib.Model.DeviceConfig.isTablet) {
            duration = 4;
        }
        this.coinsArray = [];

        for (let k = 0; k < totalCoins; k++) {
            let rnd = CoreLib.Util.getRandomRange(0, this.configData.animations.length - 1)
            let coin = CoreLib.UIUtil.getElement(this.configData.animations[rnd]);
            this.coinsArray.push(coin);
            coin.index = k;
            this.addChild(coin);
            coin.loop = true;
            coin.play();
            if (CoreLib.Model.DeviceConfig.isDesktop) {
                coin.y = -150;
                coin.x = CoreLib.Util.getRandomRange(-300, CoreLib.UIUtil.getGameWidth() * 1.1);
            } else {
                if (CoreLib.Model.DeviceConfig.isPortrait) {
                    coin.x = CoreLib.Util.getRandomRange(0, CoreLib.UIUtil.getGameWidth() * 2.5);
                    coin.y = -1000;
                } else {
                    coin.x = CoreLib.Util.getRandomRange(-300, CoreLib.UIUtil.getGameWidth() * 1.5);
                    coin.y = -250;
                }
            }
            let delay = Math.random() * duration * .6;
            coin.visible = false;
            duration = Math.random() * 4 + 2;
            var rnum = CoreLib.Util.getRandomRange(1,2);
            let sc;
            if (CoreLib.Model.DeviceConfig.isDesktop) {
                sc = Math.floor(Math.random() * (0.80 - 0.08)) + 0.08;
            } else {
                sc = Math.floor(Math.random() * (0.45 - 0.15)) + 0.1;
            }
            coin.scale.set(sc);
            CoreLib.AnimationManager.animateTween(coin, duration, {delay : delay, rotation : CoreLib.Util.getRadians(CoreLib.Util.getRandomRange(-90,120)), physics2D:{velocity:CoreLib.Util.getRandomRange(vMin, vMax), gravity:gravity, angle:CoreLib.Util.getRandomRange(angMin, angMax), xProp:xProp, yProp:yProp}, onComplete : this.onAnimDoneFromTop.bind(this), onCompleteParams : [coin], onStart : this.onAnimStart.bind(this), onStartParams : [coin]});
        }
    }
    onAnimStart (coin) {
        coin.visible = true;
    }
    onAnimDoneFromTop (coin) {
        if (coin) {
            if (this.isStopped) {
                if(this.stopBigWinCoinSound) {
                    this.stopBigWinCoinSound = false;
                    CoreLib.EventHandler.dispatchEvent("PLAY_BIG_WIN_COUNTUP_END");
                }
                CoreLib.AnimationManager.killTweensOf(coin);
                coin.destroy();
                coin = null;
            } else {
                let rnd = CoreLib.Util.getRandomRange(0, this.configData.animations.length - 1)
                let duration = Math.random() * 4 + 2;
                coin.x = CoreLib.UIUtil.getGameWidth() * Math.random();
                coin.y = -coin.height * 1.5;
                let sc;
                if (CoreLib.Model.DeviceConfig.isDesktop) {
                    sc = Math.floor(Math.random() * (0.40 - 0.08)) + 0.08;
                } else {
                    sc = Math.floor(Math.random() * (0.3 - 0.15)) + 0.1;
                }
                coin.scale.set(sc);
                CoreLib.AnimationManager.animateTween(coin, duration, {rotation : CoreLib.Util.getRadians(CoreLib.Util.getRandomRange(-90,120)), physics2D:{velocity:CoreLib.Util.getRandomRange(vMin, vMax), gravity:gravity, angle:CoreLib.Util.getRandomRange(angMin, angMax), xProp:xProp, yProp:yProp}, onComplete : this.onAnimDoneFromTop.bind(this), onCompleteParams : [coin], onStart : this.onAnimStart.bind(this), onStartParams : [coin]});
            }
        }
    }





    showCoinFall (type = 1) {
        this.visible = true;
        let totalCoins = type == 1 ? 150 : 80;
        let duration = 2;
        let vMin = 700;
        let vMax = 900;
        let gravity = 500;
        let angMin = 220;
        let angMax = 320;

        if (CoreLib.Model.DeviceConfig.isMobile) {
            duration = 3;
        } else if (CoreLib.Model.DeviceConfig.isTablet) {
            duration = 4;
        }
        this.coinsArray =[];
        var xProp = "x";
        var yProp = "y";
        for (let k = 0; k < totalCoins; k++) {
            let coin = CoreLib.UIUtil.getElement(this.configData.animations[0]);
            this.coinsArray.push(coin);
            coin.index = k;
            this.addChild(coin);
            if (CoreLib.Model.DeviceConfig.isDesktop) {
                coin.scale.set(0.10);
            } else {
                coin.scale.set(0.1);
            }

            coin.loop = true;
            coin.gotoAndPlay(CoreLib.Util.getRandomRange(0,7));
            CoreLib.UIUtil.positionObjectForDevice(coin, this.configData)
            if (CoreLib.Model.DeviceConfig.isDesktop) {
                coin.x = this.configData.xPos || 700;
                coin.y = CoreLib.UIUtil.getGameHeight();
            } else {
                coin.x = CoreLib.Model.GameConfig.coinPosition.x;
                coin.y = CoreLib.Model.GameConfig.coinPosition.y - coin.height / 2;
            }

            let delay = Math.random() * duration * .10;
            coin.visible = false;
            duration = duration + Math.random() * 0.4;
            var rnum = CoreLib.Util.getRandomRange(1,2);
            let anim = CoreLib.AnimationManager.animateTween(coin, duration, {scaleX : 0.1, scaleY : 0.1, delay : delay, rotation : CoreLib.Util.getRadians(CoreLib.Util.getRandomRange(-90,120)), physics2D:{velocity:CoreLib.Util.getRandomRange(vMin, vMax), gravity:gravity, angle:CoreLib.Util.getRandomRange(angMin, angMax), xProp:xProp, yProp:yProp}, onComplete : this.onAnimDone.bind(this), onCompleteParams : [coin], onStart : this.onAnimStart.bind(this), onStartParams : [coin]});

        }
    }

    showCoinFallFromBottom (type = 1) {
        this.visible = true;
        let totalCoins = type == 1 ? 150 : 80;
        let duration = 50;
        let vMin = 500;
        let vMax = 700;
        let gravity = 900;
        let angMin = 220;
        let angMax = 260;

        if (CoreLib.Model.DeviceConfig.isMobile) {
            duration = 3;
        } else if (CoreLib.Model.DeviceConfig.isTablet) {
            duration = 4;
        }
        this.coinsArray =[];
        var xProp = "x";
        var yProp = "y";
        for (let k = 0; k < totalCoins; k++) {
            let coin = CoreLib.UIUtil.getElement(this.configData.animations[0]);
            this.coinsArray.push(coin);
            coin.index = k;
            this.addChild(coin);
            if (CoreLib.Model.DeviceConfig.isDesktop) {
                coin.scale.set(0.10);
            } else {
                coin.scale.set(0.1);
            }

            coin.loop = true;
            coin.gotoAndPlay(CoreLib.Util.getRandomRange(0,7));
            CoreLib.UIUtil.positionObjectForDevice(coin, this.configData)
            if (CoreLib.Model.DeviceConfig.isDesktop) {
                coin.x = Math.random() * CoreLib.UIUtil.getGameWidth();
                coin.y = CoreLib.UIUtil.getGameHeight();
            } else {
                coin.x = CoreLib.Model.GameConfig.coinPosition.x;
                coin.y = CoreLib.Model.GameConfig.coinPosition.y - coin.height / 2;
            }

            let delay = Math.random() * duration * .10;
            coin.visible = false;
            duration = duration + Math.random() * 0.4;
            var rnum = CoreLib.Util.getRandomRange(1,2);
            let anim = CoreLib.AnimationManager.animateTween(coin, duration, {scaleX : 0.1, scaleY : 0.1, delay : delay,
                rotation : CoreLib.Util.getRadians(CoreLib.Util.getRandomRange(-90,100)),
                physics2D:{velocity:CoreLib.Util.getRandomRange(vMin, vMax), gravity:gravity,
                angle:CoreLib.Util.getRandomRange(angMin, angMax), xProp:xProp, yProp:yProp},
                onComplete : this.onAnimDone.bind(this), onCompleteParams : [coin], onStart : this.onAnimStart.bind(this), onStartParams : [coin]});

        }
    }





    clearCoinFallImmediately () {
        if (this.coinsArray) {
            let len = this.coinsArray.length;
            if (len > 0) {
                for (let k = 0; k < len; k++) {
                    if (this.coinsArray[k]) {
                        CoreLib.AnimationManager.killTweensOf(this.coinsArray[k]);
                        this.coinsArray[k].destroy();
                        this.coinsArray[k] = null;
                    }
                }
            }
        }
        this.coinsArray = null;
    }


    onAnimDone (coin) {
        if (coin) {
            if (coin.index != undefined) {
                if (this.coinsArray[coin.index]) {
                    this.coinsArray[coin.index] = null;
                }
            }
        }
        coin.destroy();
    }

}
