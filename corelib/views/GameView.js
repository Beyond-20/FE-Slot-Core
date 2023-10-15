import {CoreLib} from "../core/CoreLib";

class GameView {
    constructor() {

    }
    createView (stage) {
        this.stage = stage;
        this.viewList = {};
    }

    setGameView (instance) {
        this.slotGameView = instance;
    }

    getSlotGameView () {
        return this.slotGameView;
    }

    setViewScale (scale) {
        this.stage.scale.set(scale);
    }

    addToTop(view) {
        this.stage.addChild(view);
    }
    addToBottom(view) {
        this.stage.addChildAt(view, 0);
    }

    addView (view, name, depth) {
        view.name = name;
        if (depth == undefined) {
            this.stage.addChild(view);
        } else {
            this.stage.addChildAt(view, depth);
        }

        this.viewList[name] = view;

    }
    getStageHeight () {
        return this.stage.height;
    }
    removeView (name) {
        this.stage.removeChild(this.getView(name));
        this.viewList[name] = null;
    }
    getViewList () {
        return this.viewList;
    }
    setPixiApp (pApp) {
        this.pixiApp = pApp;
    }
    getPixiApp () {
        return this.pixiApp;
    }
    setAllViewsState(flag) {
        for (let p in this.viewList) {
            if (this.viewList[p]) {
                this.viewList[p].visible = flag;
            }
        }
    }
    getPixiRenderer () {
        return this.pixiApp.renderer;
    }
    getGameScreenshot () {
        const image = this.pixiApp.renderer.plugins.extract.image(this.stage);
        let texture = PIXI.Texture.from(image);
        let sp = CoreLib.UIUtil.getSpriteFromTexture(texture);
        return sp;
    }

    getMosuePosition () {
        return this.pixiApp.renderer.plugins.interaction.mouse.global;
    }

    getView (name) {
        return this.viewList[name];
    }

    getStage () {
        return this.stage;
    }
}

export const View = new GameView();

