export class LibText extends PIXI.Text {
    constructor(content, obj, configData) {
        super(content, obj);
        this.type = "TextField";
        this.configData = {};
        for (var p in configData) {
            this.configData[p] = configData[p];
        }
    }

    getConfigData () {
        return this.configData;
    }

    getLayoutData () {
        if (this.configData && this.configData.layoutData) {
            return this.configData.layoutData;
        } else {
            return null;
        }
    }


}
