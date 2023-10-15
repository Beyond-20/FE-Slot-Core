import {LibContainer} from "./LibContainer";
import {CoreLib} from "../core/CoreLib";

export class LibView extends LibContainer {
    constructor(configData, layoutData) {
        super(configData);
        setTimeout(this.resizeViewComponents.bind(this), 0);

    }

    resizeChildren () {
        for (let p in this.elementsList) {
            CoreLib.UIUtil.adjustElement(this.elementsList[p]);
            CoreLib.UIUtil.positionObjectForDevice(this.elementsList[p])
        }
    }

    adjustChildrenForDevice(element) {
        for (let p in element.elementsList) {
            CoreLib.UIUtil.adjustWidthHeightForMobile(element.elementsList[p]);
        }
    }

    setPositionBasedOnDevice(element) {
        for (let p in element.elementsList) {
            CoreLib.UIUtil.setPositionBasedOnDevice(element.elementsList[p]);
        }
    }



    resizeViewComponents () {
        if (this.configData.resizeChildren) {
            this.resizeChildren();
        }
        // for (let p in this.elementsList) {
        //     CoreLib.UIUtil.adjustElement(this.elementsList[p]);
        // }
        CoreLib.UIUtil.adjustElement(this);

    }
    onResizeEndEvent () {
    }
    destroyView () {
        super.destroyView();
    }
    getConfigData () {
        return this.configData;
    }

    deleteLayoutData() {
        this.backupLayoutData = JSON.parse(JSON.stringify(this.configData.layoutData));
        this.configData.layoutData = null;
    }

    restoreLayoutData() {
        this.configData.layoutData = this.backupLayoutData;
    }



}
