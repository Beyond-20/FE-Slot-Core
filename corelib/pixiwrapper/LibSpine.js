import {CoreLib} from "../core/CoreLib";

export class LibSpine extends PIXI.spine.Spine {
    constructor(name, configData) {
        super(PIXI.Loader.shared.resources[name].spineData);
        this.anchor = {x:0.5,y:0.5};
        this.configData = {};
        for (var p in configData) {
            this.configData[p] = configData[p];
        }
        const that = this;
        // this.spListener = this.state.addListener({
        //     event: function(entry, event) { that.onAnimEvent(entry, event) },
        //     complete: function(entry) { that.onAnimComplete(entry)},
        //     start: function(entry) { that.onAnimStart(entry) },
        //     end: function(entry) { that.onAnimEnd(entry) },
        // });
        this.isEventRemoved = false;
    }

    showLeftHander () {
        //this.skeleton.scaleX = -1;
        let index = 0;
        let len = this.skeleton.bones.length;
        for (let k = 0; k < len; k++) {
            if (this.skeleton.bones[k].data.name == "Head") {
                this.skeleton.bones[k].scaleY = -1;
            } else if (this.skeleton.bones[k].data.name == "root") {
                this.skeleton.bones[k].scaleX = -1;
            }
        }
    }
    showRightHander () {
        //this.skeleton.scaleX = -1;
        let index = 0;
        let len = this.skeleton.bones.length;
        for (let k = 0; k < len; k++) {
            if (this.skeleton.bones[k].data.name == "Head") {
                this.skeleton.bones[k].scaleY = 1;
            } else if (this.skeleton.bones[k].data.name == "root") {
                this.skeleton.bones[k].scaleX = 1;
            }
        }
    }

    setSkin (name) {
        this.skeleton.setSkinByName(name);
    }

    addEventListener(event, callback) {
        let that = this;
        if (event === "complete") {
            this.state.addListener({complete : function (entry) {
                callback(entry.animation, that)
                }
            })
        } else if (event === "event") {
            this.state.addListener({event : function (entry) {
                    callback(entry.animation, that)
                }
            })
        }
    }
    removeEventListners () {
        this.state.removeListener();
    }


    playAnimation (state, loop = false, trackIndex = 0, delay = 0) {
        if (state == undefined) {
            state = this.configData.defaultState;
        }
        this.state.timeScale = 1;

        if (delay > 0) {
            this.visible = false;
            setTimeout(this.playAnimNow.bind(this, state, loop, trackIndex), delay);
        } else {
            this.state.setAnimation(trackIndex, state, loop);
        }

    }
    playAnimNow(state, loop = false, trackIndex = 0) {
        this.visible = true;
        this.state.setAnimation(trackIndex, state, loop);
    }
    stopAnimation () {
        this.state.timeScale = 0;

    }





}
