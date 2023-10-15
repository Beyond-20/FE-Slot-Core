import {CoreLib} from "../core/CoreLib";

class UtilService {
    getRandomRange(min, max, exclude = null) {
        if (exclude) {
            let val = Math.floor(Math.random() * (max - min + 1)) + min;
            while (val == exclude) {
                val = Math.floor(Math.random() * (max - min + 1)) + min;
            }
            return val;
        } else {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }
    getAnimationDuration (totalwin) {
        var time = 1;
        if (totalwin >= 100 && totalwin < 500) {
            time = 1.5;
        } else if (totalwin >= 500 && totalwin < 1000) {
            time = 4;
        } else if (totalwin >= 1000 && totalwin < 10000) {
            time = 6;
        } else if (totalwin >= 10000 && totalwin < 50000) {
            time = 7;
        } else if (totalwin >= 50000 && totalwin < 100000) {
            time = 8
        } else if (totalwin > 100000) {
            time = 9;
        }

        return time * 2;
    }
    getDecimalOrNumberValue(val) {
        if (val % 1 == 0) {
            return val;
        } else {
            return val.toFixed(2);
        }
    }
    getTwoDecimalValue (val) {
        let str = val.toFixed(2);
        return Number(str);
    }
    getSoundObject (name) {
        for (let p in CoreLib.Model.SoundLoadConfig.soundFiles) {
            if (CoreLib.Model.SoundLoadConfig.soundFiles[p].name == name) {
                return CoreLib.Model.SoundLoadConfig.soundFiles[p];
            }
        }
        return null;
    }
    moveArrayElement (array, from, to) {
        if (to === from ) {
            return array;
        }
        var target = array[from];
        var increment = to < from ? -1 : 1;

        for(var k = from; k != to; k += increment){
            array[k] = array[k + increment];
        }
        array[to] = target;
        return array;
    }

    getCurrencySymbol (val = 200) {
        const decimal = 2;
        let currency = "";
        let arr = new Intl.NumberFormat(CoreLib.Model.GameInfo.language, {
            style: 'currency',
            currencyDisplay : 'narrowSymbol',
            currency: CoreLib.Model.GameInfo.currency,
            minimumFractionDigits: decimal,
            maximumFractionDigits: decimal
        }).formatToParts(val);
        let len = arr.length;
        for (let k = 0; k < len; k++) {
            if (arr[k].type == "currency") {
                currency = arr[k].value;
                break;
            }
        }
        return currency;
    }

    getCurrentTimeInMili () {
        return Date.now();
    }

    getConfigByName (config, name) {
        let len = config.length;
        for (let k = 0; k < len; k++) {
            if (config[k].name == name) {
                return config[k];
            }
        }
    }

    getDefaultValue (val, originalVal = 0) {
        return (val === undefined || isNaN(val)) ? originalVal : val
    }
    getServerValue (val, defaultVal) {
        return (val == null || val == undefined) ? defaultVal : val;
    }

    getServerArrayValue (val, defaultVal) {
        let result = [];
        if (val) {
            if (val.indexOf("-") > -1) {
                let arr = val.split("-");
                let len = arr.length;
                for (let k = 0; k < len; k++) {
                    result.push(Number(arr[k]));
                }
            } else {
                result.push(Number(val));
            }
        }
        return result;
    }
    shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
    getDegrees (radians) {
        var pi = Math.PI;
        return radians * (180/pi);
    }
    getRadians (degrees) {
        return degrees * Math.PI / 180;
    }
    parseMessage (str, map) {
        var st = "";
        var len = map.length;
        for (var n = 0; n < len; n++) {
            st = "@" + (n + 1) + "r";
            str = str.replace(st, map[n]);
        }
        return str;
    }
    getHourAndMin (seconds) {
        let hr = Math.floor(seconds / 3600);
        let min = Math.floor(seconds % 3600 / 60);
        let obj = {};
        obj.hour = hr;
        obj.min = min;
        return obj;
    }
    getCurrentTime () {
        let d = new Date();
        return (d.getHours() + " :: " + d.getMinutes() + " :: " + d.getSeconds());
    }

    getContent (str) {
        return CoreLib.Model.Content[str];
    }


    formatCurrency (num, showCurrency = true) {
        let result;
        const decimal = 2;
        if (CoreLib.Model.GameConfig.coinCashMode === 0) {
            // coin value
            result = (num * 100).toFixed(0);
        } else {
            if (Intl) {
                result = new Intl.NumberFormat(CoreLib.Model.GameInfo.language, {
                    style: 'currency',
                    currencyDisplay : 'narrowSymbol',
                    currency: CoreLib.Model.GameInfo.currency,
                    minimumFractionDigits: decimal,
                    maximumFractionDigits: decimal
                }).format(num);

            } else {
                result = CoreLib.Model.GameInfo.currency + num;
            }
        }
        return result;

    }
    formatCurrencyWithoutSymbol (num, decimal = 2) {
        const result = num;
        if (Intl) {
            var str = new Intl.NumberFormat(CoreLib.Model.GameInfo.language, {
                currency: CoreLib.Model.GameInfo.currency,
                minimumFractionDigits: decimal,
                maximumFractionDigits: decimal
            }).format(result);

        } else {
            str = CoreLib.Model.GameInfo.currency + result;
        }
        return str;
    }

    formatWinCurrency (num, decimal = 2) {
        let result;
        if (CoreLib.Model.GameConfig.coinCashMode === 0) {
            // coin value
            result = (num * 100).toFixed(0);
        } else {
            if (Intl) {
                result = new Intl.NumberFormat(CoreLib.Model.GameInfo.language, {
                    // style: 'currency',
                    // currency: CoreLib.Model.GameInfo.currency,
                    minimumFractionDigits: decimal,
                    maximumFractionDigits: decimal
                }).format(num);

            } else {
                result = CoreLib.Model.GameInfo.currency + num;
            }
        }
        return result;
    }

    formatCurrencyCustom (num, showCurrencySymbol) {
        //num = num / 100;

        if (this.currencyCode === undefined) {
            this.createCustomCurrencyObject();
        }
        let negative = (parseFloat(num) < 0);
        if(typeof showCurrencySymbol !== 'boolean') showCurrencySymbol = true;

        // turn the value into a string and split the pennies from the pounds;
        if (typeof num === 'undefined') { num = 0; }
        let str = String(Math.abs(parseFloat(num)).toFixed(this.decimalPlaces));
        str = str.split('.');
        let pounds = str[0];
        let pennies = str[1] === undefined ? "" : str[1];
        let thousandSplit = [];
        let justPennies = false;

        // split the pounds into groups of 3 starting at the right hand side
        for (let i = pounds.length; i > 0; i -= 3) {
            thousandSplit.push(pounds.substring(i - 3, i));
            pounds = pounds.substring(0, pounds.length - 2);
        }

        if (thousandSplit.length === 1 && thousandSplit[0] == '0' && this.fractionalCurrencySymbol !== ' ' && showCurrencySymbol === true ) {
            //justPennies = true;
        }

        // add the currency symbol if it belongs on the left
        let returnString = '';
        if (justPennies === false && this.wholeCurrencyRight === false && showCurrencySymbol === true) {
            returnString += this.currencySeparator + this.wholeCurrencySymbol;
        }else if (justPennies === true && this.fractionalCurrencyRight === false && showCurrencySymbol === true) {
            returnString += this.fractionalCurrencySymbol;
        }

        // add the thousands and follow them up with a comma if it isn't the last one
        if (justPennies === false) {
            for (let i = thousandSplit.length -1; i >= 0; i--) {
                returnString += thousandSplit[i];
                if (i > 0) {
                    returnString += this.thousandSeperator;
                }
            }
        }
        // add the decimal point if we had any pounds to play with
        if (justPennies === false) {
            returnString += this.decimalSeperator;
        }else{
            // if we're just pennies then don't enforce the 2 character thingy
            pennies = parseInt(pennies);
        }
        returnString += pennies;
        if (justPennies === false && this.wholeCurrencyRight === true && showCurrencySymbol === true) {
            returnString += this.currencySeparator + this.wholeCurrencySymbol;

        }else if (justPennies === true && this.fractionalCurrencyRight === true && showCurrencySymbol === true ) {
            returnString += this.fractionalCurrencySymbol;
        }
        if (negative) {
            returnString = '-'+returnString;
        }
        return returnString;
    }
    getAnimationDuration (totalwin) {
        var time = 1;
        if (totalwin >= 100 && totalwin < 500) {
            time = 3;
        } else if (totalwin >= 500 && totalwin < 1000) {
            time = 4;
        } else if (totalwin >= 1000 && totalwin < 10000) {
            time = 6;
        } else if (totalwin >= 10000 && totalwin < 50000) {
            time = 7;
        } else if (totalwin >= 50000 && totalwin < 100000) {
            time = 8
        } else if (totalwin > 100000) {
            time = 9;
        }

        return time * 2;
    }

    pickRandomProperty(obj) {
        var prop, len = 0, randomPos, pos = 0;
        for (prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                len += 1;
            }
        }
        randomPos = Math.floor(Math.random() * len);
        for (prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                if (pos === randomPos) {
                    return obj[prop];
                }
                pos += 1;
            }
        }
    }


    createCustomCurrencyObject (currencyObject11) {
        let currencyObject =  {
            "symbol": "£",
            "code": "FUN",
            "decimalSeparator": ".",
            "groupingSeparator": ",",
            "currencyId" : "GBP",
            "currencyPrefix" : "£",
            "currencyPrefixSeparator" : "",
            "fractionalCurrencySymbol" : "",
            "decimalPlaces" : 2,
            "currencySuffix" : "",
            "currencySuffixSeparator" : ""
        };
        this.decimalSeperator = currencyObject.decimalSeparator || ',';
        this.thousandSeperator = currencyObject.groupingSeparator || ' ';
        this.currencyCode = currencyObject.currencyId || 'GBP';
        this.wholeCurrencySymbol = currencyObject.currencyPrefix || '';
        this.fractionalCurrencySymbol = currencyObject.fractionalCurrencySymbol || '';
        this.decimalPlaces = currencyObject.decimalPlaces;
        this.wholeCurrencyRight = currencyObject.currencySuffix.length > 0 ? true : false;
        this.currencySeparator = currencyObject.currencyPrefixSeparator;
        if (this.wholeCurrencyRight) {
            this.wholeCurrencySymbol = currencyObject.currencySuffix;
            this.currencySeparator = currencyObject.currencySuffixSeparator;
        }

        this.fractionalCurrencyRight = (currencyObject.fractionalCurrencyPlacement === 'right');
    }

    cloneArray (arr) {
        let arrCopy = JSON.parse(JSON.stringify(arr));
        return arrCopy;
    }

    isBatsmanLeftHanded (batsman) {
       if (CoreLib.Model.GameConfig.leftHandedBatsmen.indexOf(batsman) > -1) {
           return true;
       } else {
           return false;
       }
    }

    hitTest (r1, r2) {
        //Define the variables we'll need to calculate
        let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

        //hit will determine whether there's a collision
        hit = false;

        //Find the center points of each sprite
        r1.centerX = r1.x + r1.width / 2;
        r1.centerY = r1.y + r1.height / 2;
        r2.centerX = r2.x + r2.width / 2;
        r2.centerY = r2.y + r2.height / 2;

        //Find the half-widths and half-heights of each sprite
        r1.halfWidth = r1.width / 2;
        r1.halfHeight = r1.height / 2;
        r2.halfWidth = r2.width / 2;
        r2.halfHeight = r2.height / 2;

        //Calculate the distance vector between the sprites
        vx = r1.centerX - r2.centerX;
        vy = r1.centerY - r2.centerY;

        //Figure out the combined half-widths and half-heights
        combinedHalfWidths = r1.halfWidth + r2.halfWidth;
        combinedHalfHeights = r1.halfHeight + r2.halfHeight;

        //Check for a collision on the x axis
        if (Math.abs(vx) < combinedHalfWidths) {

            //A collision might be occurring. Check for a collision on the y axis
            if (Math.abs(vy) < combinedHalfHeights) {

                //There's definitely a collision happening
                hit = true;
            } else {

                //There's no collision on the y axis
                hit = false;
            }
        } else {

            //There's no collision on the x axis
            hit = false;
        }

        //`hit` will be either `true` or `false`
        return hit;
    }

    vibrateForFeature () {
        if (CoreLib.Model.DeviceConfig.isDevice) {
            if (!CoreLib.Model.DeviceConfig.isIOSDevice) {
                navigator.vibrate(2000);
            }
        }
    }
    vibrateForBigWins () {
        if (CoreLib.Model.DeviceConfig.isDevice) {
            if (!CoreLib.Model.DeviceConfig.isIOSDevice) {
                navigator.vibrate([1000, 500, 2000, 500, 3000, 1000, 500, 2000, 500, 3000, 1000, 500, 2000, 500, 3000, 1000, 500, 2000, 500, 3000, 1000, 500, 2000, 500, 3000, 1000, 500, 2000, 500, 3000, 1000, 500, 2000, 500, 3000, 1000, 500, 2000, 500, 3000, 1000, 500, 2000, 500, 3000, 1000, 500, 2000, 500, 3000]);
            }
        }
    }
    stopVibration() {
        navigator.vibrate(0);
    }



}

export const Util = new UtilService();
