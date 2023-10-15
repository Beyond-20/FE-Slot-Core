export class LibSprite extends PIXI.Sprite {
    constructor(texture, configData) {
        super(texture);
        this.configData = {};
        for (var p in configData) {
            this.configData[p] = configData[p];
        }

    }

    getConfigData () {
        return this.configData;
    }



}
