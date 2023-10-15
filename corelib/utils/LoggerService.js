import {CoreLib} from "../core/CoreLib";

class LoggerService {
    constructor() {

    }

    log (str, str1 = null) {
        return;
        if (CoreLib.Model.GameConfig.isConsoleActive) {
            if (str1) {
               console.log(str, str1);
            } else {
               console.log(str);
            }

        }
    }
    trace (str) {
        if (CoreLib.Model.GameConfig.isConsoleActive) {
            console.trace(str);
        }
    }
    warn (str) {
        if (CoreLib.Model.GameConfig.isConsoleActive) {
            console.warn(str);
        }
    }
    logDev (str1, str2) {
        if (CoreLib.Model.GameConfig.isConsoleActive || CoreLib.Model.GameConfig.isLocalHost) {
            //console.log(str1, str2);
        }
    }
    logObject (obj) {
        if (CoreLib.Model.GameConfig.isConsoleActive) {
            console.log(obj);
        }
    }

    clear () {
        console.clear();
    }

}

export const Logger = new LoggerService();