import { CoreLib } from "../core/CoreLib";
import { Howl, Howler } from 'howler';

class SoundFactory {
    constructor() {
        this.isSoundPresent = false;
        this.isFxSoundOn = true;
        this.isAmbientSoundOn = true;
        this.soundLibrary = null;
        this.ambientSounds = [];
        this.fxSounds = [];
        this.savedSeek = {};
    }

    getSoundState() {
        return this.isFxSoundOn;
    }
    getSFXState() {
        return this.isFxSoundOn;
    }
    getAmbientState() {
        return this.isAmbientSoundOn;
    }
    setFXState(flag) {
        this.isFxSoundOn = flag;
        let len = this.fxSounds.length;
        if (len > 0) {
            for (let k = 0; k < len; k++) {
                this.fxSounds[k].mute(flag ? false : true);
            }
        }


    }
    setAmbientState(flag) {
        this.isAmbientSoundOn = flag;
        let len = this.ambientSounds.length;
        if (len > 0) {
            for (let k = 0; k < len; k++) {
                this.ambientSounds[k].mute(flag ? false : true);
            }
        }
    }

    loadSounds(list, path, commonPath) {
        this.soundFilesArray = [];
        this.soundLibrary = {};
        let len = list.length;
        for (let k = 0; k < len; k++) {
            this.soundFilesArray.push(list[k]);
        }
        this.soundCommonPathMP3 = commonPath + "mp3/";
        this.soundCommonPathOGG = commonPath + "ogg/";
        this.soundPathMP3 = path + "mp3/";
        this.soundPathOGG = path + "ogg/";
        this.loadingIndex = 0;
        this.totalFiles = this.soundFilesArray.length;
        this.loadAllSounds();
    }

    loadAllSounds() {
        let len = this.soundFilesArray.length;
        let file1, file2;
        let refObj = this;
        if (len > 0) {
            let langstring = "";
            for (let k = 0; k < len; k++) {
                langstring = "";
                if (this.soundFilesArray[k].langEnagled) {
                    langstring = CoreLib.Model.GameInfo.language;
                }
                if (this.soundFilesArray[k].type && this.soundFilesArray[k].type == "common") {
                    file1 = this.soundCommonPathMP3 + this.soundFilesArray[k].name + langstring + ".mp3" + "?version=" + CoreLib.Model.GameConfig.buildVersion + "_" + CoreLib.Model.GameConfig.gameVersion;
                    file2 = this.soundCommonPathOGG + this.soundFilesArray[k].name + langstring + ".ogg" + "?version=" + CoreLib.Model.GameConfig.buildVersion + "_" + CoreLib.Model.GameConfig.gameVersion;
                } else {
                    file1 = this.soundPathMP3 + this.soundFilesArray[k].name + langstring + ".mp3" + "?version=" + CoreLib.Model.GameConfig.buildVersion + "_" + CoreLib.Model.GameConfig.gameVersion;
                    file2 = this.soundPathOGG + this.soundFilesArray[k].name + langstring + ".ogg" + "?version=" + CoreLib.Model.GameConfig.buildVersion + "_" + CoreLib.Model.GameConfig.gameVersion;
                }
                this.soundLibrary[this.soundFilesArray[k].name] = new Howl({
                    src: [file2, file1], autoPlay: false, onload: function (obj) {
                        refObj.handleSoundsLoaded(this._src, refObj.loadingIndex);
                    },
                    onloaderror: function (id, msg) {
                        refObj.handleSoundsLoaded(null);
                    },

                });
                if (this.soundFilesArray[k].soundType == "ambient") {
                    this.ambientSounds.push(this.soundLibrary[this.soundFilesArray[k].name]);
                } else {
                    this.fxSounds.push(this.soundLibrary[this.soundFilesArray[k].name]);
                }
            }
        } else {
            CoreLib.EventHandler.dispatchEvent(CoreLib.AppEvents.SOUNDS_LOADING_COMPLETE);
        }

    }

    handleSoundsLoaded(file, index) {
        var loaded = Math.round((((this.loadingIndex + 1) / this.totalFiles) * 100));
        CoreLib.EventHandler.dispatchEvent(CoreLib.AppEvents.SOUNDS_LOADING_PREGRESS, loaded);
        if (this.loadingIndex >= this.totalFiles - 1) {
            this.isSoundPresent = true;
            CoreLib.EventHandler.dispatchEvent(CoreLib.AppEvents.SOUNDS_LOADING_COMPLETE);
        } else {
            this.loadingIndex++;
        }
    }

    playSound(sObj, callback) {
        if (!sObj) {
            return;
        }
        if (!this.isSoundPresent) {
            return;
        }
        // console.log("play sound == ", sObj.name);
        let instance = this.soundLibrary[sObj.name];
        if (instance) {
            if (instance.playing()) {
                instance.stop();
            }
            instance.volume(CoreLib.Util.getDefaultValue(sObj.volume, 1));
            instance.loop(CoreLib.Util.getDefaultValue(sObj.loop, false));
            if (sObj.fadeInDuration) {
                instance.fade(instance.volume(), CoreLib.Util.getDefaultValue(sObj.volume, 1), sObj.fadeInDuration);
            } else {
                let id = instance.play();
                if (sObj.isSeek) {
                    instance.seek(sObj.seekNumber, id);
                }
            }
        }

        return instance;
    }
    stopSound(sObj) {
        if (!sObj) {
            return;
        }
        if (!this.isSoundPresent) {
            return;
        }

        let instance = this.soundLibrary[sObj.name];
        if (sObj.fadeOutDuration) {
            if (instance && instance.playing()) {
                instance.fade(instance.volume(), 0, sObj.fadeOutDuration);
            }
        } else {
            if (instance) {
                this.savedSeek[sObj.name] = instance.seek();
                instance.stop();
            }

        }

    }
    pauseSound(sObj) {
        if (!sObj) {
            return;
        }
        if (!this.isSoundPresent) {
            return;
        }

        let instance = this.soundLibrary[sObj.name];
        this.savedSeek = instance.seek();
        instance.fade(instance.volume(), 0, 500);
    }

    resumeSound(sObj) {
        if (!sObj) {
            return;
        }
        if (!this.isSoundPresent) {
            return;
        }
        // console.log("play sound == ", sObj.name);
        let instance = this.soundLibrary[sObj.name];
        if (instance) {
            if (instance.playing()) {
                instance.stop();
            }
            instance.volume(CoreLib.Util.getDefaultValue(sObj.volume, 1));
            instance.loop(CoreLib.Util.getDefaultValue(sObj.loop, false));
            let id = instance.play();
            if (this.savedSeek[sObj.name] != undefined) {
                instance.seek(this.savedSeek[sObj.name], id);
            }
        }

        return instance;
    }

    muteAllSounds() {
        Howler.mute(true);
    }

    unmuteAllSounds(fromFocusOff = false) {
        if (fromFocusOff) {
            Howler.mute(false);
        } else {
            Howler.mute(false);
        }

    }

}

export const soundFactory = new SoundFactory();
