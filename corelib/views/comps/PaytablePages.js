import {LibContainer} from "../../pixiwrapper/LibContainer";
import {CoreLib} from "../../core/CoreLib";

export class PaytablePages extends LibContainer {
    constructor(config) {
        super(config);

        this.guideRect = this.elementsList["guideRect"];

        let len = this.elementsArray.length;
        this.pagesArray = [];
        let index = 0;
        for (let k = 0; k < len; k++) {
            if (this.elementsArray[k].name.indexOf("page") > -1) {
                this.pagesArray.push(this.elementsArray[k]);
                if (index != 0) {
                    this.elementsArray[k].visible = false;
                }
                index++;
            }
        }
        this.lastIndex = 0;
        this.currentIndex = 0;

    }

    navigateNext (index) {

        if (index == 1) {
            if (this.currentIndex == this.pagesArray.length - 1) {
                this.currentIndex = 0;
            } else {
                this.currentIndex += index;
            }
        } else {
            if (this.currentIndex == 0) {
                this.currentIndex = this.pagesArray.length - 1;
            } else {
                this.currentIndex += index;
            }
        }
        if (index > 0) {
            CoreLib.AnimationManager.animateTween(this.pagesArray[this.lastIndex], 0.25, {x : - this.guideRect.width * 1.2});
            this.pagesArray[this.currentIndex].x = this.guideRect.width * 1.2;
            this.pagesArray[this.currentIndex].visible = true;
            CoreLib.AnimationManager.animateTween(this.pagesArray[this.currentIndex], 0.25, {x : (this.guideRect.width - this.pagesArray[this.currentIndex].width) / 2});
        } else {
            CoreLib.AnimationManager.animateTween(this.pagesArray[this.lastIndex], 0.25, {x : this.guideRect.width * 1.2});
            this.pagesArray[this.currentIndex].x = -this.guideRect.width * 1.2;
            this.pagesArray[this.currentIndex].visible = true;
            CoreLib.AnimationManager.animateTween(this.pagesArray[this.currentIndex], 0.25, {x : (this.guideRect.width - this.pagesArray[this.currentIndex].width) / 2});
        }
        this.lastIndex = this.currentIndex;
        this.emit("PT_PAGE_CHANGED", this.currentIndex);
    }


}
