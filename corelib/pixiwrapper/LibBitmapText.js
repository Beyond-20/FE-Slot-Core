export class LibBitmapText extends PIXI.BitmapText {
    constructor(content, obj, configData) {
        super(content, obj);
        this.configData = configData;
    }

    getConfigData () {
        return this.configData;
    }


}
