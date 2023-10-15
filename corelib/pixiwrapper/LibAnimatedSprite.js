
export class LibAnimatedSprite extends PIXI.AnimatedSprite {
    constructor(textureArray, configData) {
        super(textureArray);
        this.configData = {};
        for (var p in configData) {
            this.configData[p] = configData[p];
        }

    }
    playReverseAnimation () {
        this.gotoAndStop(this.totalFrames - 1);
        this.animationSpeed = - this.animationSpeed;
        this.gotoAndPlay(this.totalFrames - 1);
    }
    playAnimation (loop = true) {
        this.loop = loop;
        this.gotoAndPlay(0);
    }
    stopAnimation () {
        this.gotoAndStop(0);
    }
    updateFrames (textureArray) {
        this.textures = textureArray;
    }

    getConfigData () {
        return this.configData;
    }


}
