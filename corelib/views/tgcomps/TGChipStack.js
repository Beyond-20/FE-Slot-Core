import { LibContainer } from '../../pixiwrapper/LibContainer'
import {TGChip} from './TGChip'
import {CoreLib} from '../../core/CoreLib';

export class TGChipStack extends LibContainer {
    constructor(config) {
        super(config);

        // this.left = CoreLib.UIUtil.getSprite("bettooltipcorner");
        // this.center = CoreLib.UIUtil.getSprite("bettooltipcenter");
        // this.right = CoreLib.UIUtil.getSprite("bettooltipcorner");
        // this.right.scale.x = -1;
        // this.tipContainer = CoreLib.UIUtil.getContainer();
        // this.addChild(this.tipContainer);
        // this.center.width *= 2;
        // this.tipContainer.addChild(this.left, this.center, this.right);
        // this.center.x = this.left.width;
        // this.right.x = this.center.x + this.center.width + this.right.width - 1;
        // this.betValueText = CoreLib.UIUtil.getTextField({type : "Text", content : "", style : "commonFontStyle", fontSize : 20, mFontSize : 30});
        // this.tipContainer.addChild(this.betValueText);
        // this.betValueText.anchor.set(0.5,0.5);
        // this.betValueText.x = this.tipContainer.width * 0.5;
        // this.betValueText.y = this.tipContainer.height * 0.4;
        // this.tipContainer.visible = false;
        // this.tipContainer.y = 60;
        // this.tipContainer.x = -50;
    }

    showStack (value, showValue = true) {
        this.clearStack(value);
        if (value == 0) {
            return;
        }
        let obj = this.getChipsArrayForBet(value);
        let arr = obj.chips;
        let len = arr.length;
        this.chipsArray = [];
        let index = 0;
        let imgno = 1;
        if (len > 0) {
            for (let k = len - 1; k >= 0; k--) {
                if (arr[k] > 0) {
                    let len2 = arr[k];
                    for (let i = 0; i < len2; i++) {
                        let chip = new TGChip({id : k, imageNo : imgno, chipValue : CoreLib.Model.GameConfig.chipsArray[k], textColor : 0xffffff})
                        this.addChild(chip);
                        chip.y = -index++ * 14;
                        this.chipsArray.push(chip);
                        imgno++;
                        if (imgno > 6) {
                            imgno = 1;
                        }
                    }
                }
            }
            if (obj.extraChip > 0) {
                let chip = new TGChip({id : len, imageNo : 2, chipValue : obj.extraChip, textColor : 0x000000})
                this.addChild(chip);
                chip.y = -index++ * 14;
                this.chipsArray.push(chip);
            }
            // if (this.chipsArray.length > 0) {
            //     let chip = this.chipsArray[this.chipsArray.length - 1];
            //     chip.y = chip.y - 80;
            //     chip.alpha = 0;
            //     CoreLib.AnimationManager.animateTween(chip, 0.25, {alpha : 1, y : chip.y + 80, ease : Back.easeIn, onComplete : this.showValueText.bind(this)});
            //     // CoreLib.AnimationManager.killTweensOf(this.tipContainer);
            //     // this.tipContainer.alpha = 1;
            //     if (this.betValueText) {
            //         this.betValueText.text = CoreLib.WrapperService.formatCurrency(value);
            //     }
            //     CoreLib.EventHandler.dispatchEvent("CHIP_STACK");
            //
            // }
        }
    }
    showValueText () {

    }
    onTipVanished () {
        CoreLib.AnimationManager.killTweensOf(this.tipContainer);

    }

    clearStack (val) {
        if (this.chipsArray) {
            let len = this.chipsArray.length;
            if (len > 0) {
                for (let k = 0; k < len; k++) {
                    this.chipsArray[k].destroyComp();
                    this.removeChild(this.chipsArray[k]);
                    this.chipsArray[k] = null
                }
            }
            this.chipsArray = [];
        }
        if (val == 0) {
            this.onTipVanished();
        }



    }

    getChipsArrayForBet (bet) {
        let arr = [];
        let len = CoreLib.Model.GameConfig.chipsArray.length
        let n = 0;
        for (let i = len - 1; i >= 0; i--) {
            n = Math.floor(bet / CoreLib.Model.GameConfig.chipsArray[i]);
            bet = Number((bet - (n * CoreLib.Model.GameConfig.chipsArray[i])).toFixed(2));
            arr.push(n);
        }
        arr.reverse();
        let obj = {};
        obj.chips = arr;
        obj.extraChip = bet;
        return obj;
    }


}
