import {soundFactory} from "./SoundFactory";
import {CoreLib} from '../core/CoreLib'

export class SoundManager  {
    constructor (config) {
        this.addEvents(config);
    }

    addEvents (config) {
        const soundsLength = config.soundFiles.length;
        if (soundsLength > 0) {
            for (let k = 0; k < soundsLength; k++) {
                if (config.soundFiles[k].playEvents) {
                    let playLength = config.soundFiles[k].playEvents.length;
                    if (playLength > 0) {
                        for (let i = 0; i < playLength; i++) {
                            if (CoreLib.SlotEvents[config.soundFiles[k].playEvents[i]]) {
                                CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents[config.soundFiles[k].playEvents[i]], this.onSoundPlayEvent.bind(this, config.soundFiles[k]));
                            } else {
                                CoreLib.EventHandler.addEventListener(config.soundFiles[k].playEvents[i], this.onSoundPlayEvent.bind(this, config.soundFiles[k]));
                            }
                        }
                    }
                    if (config.soundFiles[k].stopEvents) {
                        let stopLength = config.soundFiles[k].stopEvents.length;
                        if (stopLength > 0) {
                            for (let i = 0; i < stopLength; i++) {
                                if (CoreLib.SlotEvents[config.soundFiles[k].stopEvents[i]]) {
                                    CoreLib.EventHandler.addEventListener(CoreLib.SlotEvents[config.soundFiles[k].stopEvents[i]], this.onSoundStopEvent.bind(this, config.soundFiles[k]));
                                } else {
                                    CoreLib.EventHandler.addEventListener(config.soundFiles[k].stopEvents[i], this.onSoundStopEvent.bind(this, config.soundFiles[k]));
                                }

                            }
                        }
                    }
                }
            }
        }
    }

    onSoundPlayEvent (sObj, param) {
        if (CoreLib.Model.GameConfig.isDemoModePlaying) {
            return;
        }
        if (sObj.matchParam != undefined) {
            if (sObj.matchParam === param) {
                soundFactory.playSound(sObj)
            }
        } else {
            soundFactory.playSound(sObj);
        }

    }

    onSoundStopEvent (sObj) {
        if (CoreLib.Model.GameConfig.isDemoModePlaying) {
            return;
        }
        soundFactory.stopSound(sObj)
    }
}
