import {CoreLib} from "../core/CoreLib";

export class LibContainer extends PIXI.Container {
    constructor(configData) {
        super();
        this.secondaryViewCreated = false;
        this.isDestroyed = false;
        this.configData = {};
        for (var p in configData) {
            this.configData[p] = configData[p];
        }


        CoreLib.EventHandler.addEventListener(CoreLib.AppEvents.RESIZE_START, this.onResizeStartEvent.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.AppEvents.RESIZE_COMPS, this.resizeViewComponents.bind(this));
        CoreLib.EventHandler.addEventListener(CoreLib.AppEvents.RESIZE_END, this.onResizeEndEvent.bind(this));
        if (this.configData.createOnDemand == undefined || !this.configData.createOnDemand) {
            this.createElements();
        }
        setTimeout(this.resizeViewComponents.bind(this), 0);


    }

    stopAnimation() {
        for (let p in this.elementsList) {
            this.elementsList[p].stopAnimation();
        }
    }
    playAnimation() {
        for (let p in this.elementsList) {
            this.elementsList[p].playAnimation();
        }
    }
    gotoAndStop(fr) {
        for (let p in this.elementsList) {
            this.elementsList[p].gotoAndStop(fr);
        }
    }

    gotoAndPlay(fr) {
        for (let p in this.elementsList) {
            this.elementsList[p].gotoAndPlay(fr);
        }
    }
    positionForDevice () {
        for (let p in this.elementsList) {
            CoreLib.UIUtil.positionObjectForDevice(this.elementsList[p]);
        }
    }

    createElements () {
        this.elementsList = [];
        this.elementsArray = [];
        if (this.configData.Elements) {
            var len = this.configData.Elements.length;
            if (len > 0) {
                for (let k = 0; k < len; k++) {
                    if (this.configData.Elements[k].assetType == undefined || this.configData.Elements[k].assetType == "Primary") {
                        if (this.configData.Elements[k].createType === "desktop") {
                            if (CoreLib.Model.DeviceConfig.isDesktop) {
                                let obj = this.configData.Elements[k];
                                let element = CoreLib.UIUtil.getElement(obj);
                                if (obj.dontAdd) {

                                } else {
                                    if (this.view) {
                                        this.view.addChild(element);
                                    } else {
                                        this.addChild(element);
                                    }
                                }
                                this.elementsList[obj.name] = element;
                                this[obj.name] = element;
                                this.elementsArray.push(element);
                            }
                        } else if (this.configData.Elements[k].createType === "mobile") {
                            if (!CoreLib.Model.DeviceConfig.isDesktop) {
                                let obj = this.configData.Elements[k];
                                let element = CoreLib.UIUtil.getElement(obj);
                                if (obj.dontAdd) {

                                } else {
                                    if (this.view) {
                                        this.view.addChild(element);
                                    } else {
                                        this.addChild(element);
                                    }
                                }
                                this.elementsList[obj.name] = element;
                                this.elementsArray.push(element);
                            }
                        } else if (this.configData.Elements[k].createType === "desktop") {
                            if (CoreLib.Model.DeviceConfig.isDesktop) {
                                let obj = this.configData.Elements[k];
                                let element = CoreLib.UIUtil.getElement(obj);
                                if (obj.dontAdd) {

                                } else {
                                    if (this.view) {
                                        this.view.addChild(element);
                                    } else {
                                        this.addChild(element);
                                    }
                                }
                                this.elementsList[obj.name] = element;
                                this.elementsArray.push(element);
                            }
                        } else {
                            let obj = this.configData.Elements[k];
                            let element = CoreLib.UIUtil.getElement(obj);
                            if (obj.dontAdd) {

                            } else {
                                if (this.view) {
                                    this.view.addChild(element);
                                } else {
                                    this.addChild(element);
                                }
                            }
                            this.elementsList[obj.name] = element;
                            this.elementsArray.push(element);
                        }

                    }
                }
            }
        }
        setTimeout(this.onInitialViewCreated.bind(this), 0);
    }
    onInitialViewCreated () {

    }
    onSecondaryAssetsLoaded () {
        if (this.configData.Elements) {
            var len = this.configData.Elements.length;
            if (len > 0) {
                for (let k = 0; k < len; k++) {
                    if (this.configData.Elements[k].assetType != undefined || this.configData.Elements[k].assetType == "Secondary") {
                        let obj = this.configData.Elements[k];
                        let element = CoreLib.UIUtil.getElement(obj);
                        if (obj.dontAdd) {

                        } else {
                            if (this.view) {
                                this.view.addChild(element);
                            } else {
                                this.addChild(element);
                            }
                        }

                        this.elementsList[obj.name] = element;
                        setTimeout(this.onSecondaryViewCreated.bind(this), 0);
                        setTimeout(this.resizeViewComponents.bind(this), 0);
                    }

                }

            }
        }
    }
    onSecondaryViewCreated () {
        this.secondaryViewCreated = true;
    }
    getWidth () {
        if (this.guideRect) {
            return this.guideRect.width * this.scale.x;
        } else {
            return this.width;
        }
    }
    getHeight () {
        if (this.guideRect) {
            return this.guideRect.height * this.scale.y;
        } else {
            return this.height;
        }
    }
    getConfigData () {
        return this.configData;
    }
    getLayoutData () {
        return this.configData.layoutData;
    }
    getScreenLayoutData () {
        return this.configData.screenLayoutConfig;
    }


    destroyView () {
        this.destroyComp();
        this.destroy();
    }
    positionElements () {

    }

    onResizeStartEvent () {

    }
    resizeViewComponents (layoutData = null) {

    }
    resizeViewContainers () {

    }
    onResizeEndEvent() {

    }

    destroyComp () {
        for (var p in this.elementsList) {
            CoreLib.UIUtil.destroyView(this.elementsList[p]);
        }
    }
    show () {
        this.visible = true;

    }
    hide () {
        this.visible = false;
    }
}
