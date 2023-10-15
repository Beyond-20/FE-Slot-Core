import {CoreLib} from "../core/CoreLib";
import { Logger } from '../utils/LoggerService'

const spineLoaderOptions = { metadata: { spineSkeletonScale: 1, scale : 1 } };
const spriteLoaderOptions = { metadata: {scale : 1 } };
export class AssetLoader {
    constructor() {
        this.loader = PIXI.Loader.shared;
        this.loader.reset();
        this.loader.crossorigin = false;

        this.loader.pre(this.cachingMiddleware.bind(this));
        this.loader.use(this.parsingMiddleware.bind(this));


    }
    initiateLoader () {
        let folder = "images/";
        if (CoreLib.Model.GameConfig.isWebPTechSupported && CoreLib.Model.GameConfig.isWebPActiveGlobal && CoreLib.Model.GameConfig.webPAssetsExist) {
            folder = "imageswp/";
            //alert("loading optimized assets");
        }
        CoreLib.Model.GameConfig.gameAssetPath = CoreLib.Model.GameConfig.gamePath + CoreLib.Model.GameConfig.gameAssetVersions[CoreLib.Model.GameConfig.gameId] + "/";
        CoreLib.Model.GameConfig.commonAssetPath = CoreLib.Model.GameConfig.commonPath + CoreLib.Model.GameConfig.commonAssetVersion + "/";
        this.gameSpritePath = CoreLib.Model.GameConfig.gameAssetPath + folder + CoreLib.Model.DeviceConfig.assetResolution + "/";
        this.commonSpritePath = CoreLib.Model.GameConfig.commonAssetPath + folder + CoreLib.Model.DeviceConfig.assetResolution + "/";
        this.common1xSpritePath = CoreLib.Model.GameConfig.commonAssetPath + folder + "@1x/";
        this.commonLangDefaultSpritePath = CoreLib.Model.GameConfig.commonAssetPath + folder + CoreLib.Model.DeviceConfig.assetResolution + "/" + "en/";
        this.commonLangSpritePath = CoreLib.Model.GameConfig.commonAssetPath + folder + CoreLib.Model.DeviceConfig.assetResolution + "/" + CoreLib.Model.GameInfo.language + "/";
        this.commonVideoPath = CoreLib.Model.GameConfig.commonAssetPath + "videos/";
        this.gameSpinePath = CoreLib.Model.GameConfig.gameAssetPath + "spines/" + "@1x/";
        this.gameVideoPath = CoreLib.Model.GameConfig.gameAssetPath + "videos/";
        this.commonSpinePath = CoreLib.Model.GameConfig.commonAssetPath + "spines/" + "@1x/";
        this.gameFontsPath = CoreLib.Model.GameConfig.gameAssetPath + "fonts/en/";
        this.commonFontsPath = CoreLib.Model.GameConfig.commonAssetPath + "fonts/"
        this.gamebitmapFontsPath = CoreLib.Model.GameConfig.gameAssetPath + "fonts/bitmap/";
        this.commonbitmapFontsPath = CoreLib.Model.GameConfig.commonAssetPath + "fonts/bitmap/";

    }

    cachingMiddleware (resource, next) {
        if (resource.extension === "png" || resource.extension === "jpg") {
            resource.url = this.getFileNameWithVersion(resource.url);
        }

        next();
    }

    parsingMiddleware (resource, next) {
        next();
    }

    getFilePath (obj) {
        let path = "";
        if (obj.TYPE === "common") {
            if (obj.ASSETTYPE && obj.ASSETTYPE === "spine") {
                path = this.commonSpinePath;
            } else if (obj.ASSETTYPE && obj.ASSETTYPE === "video") {
                path = this.commonVideoPath;
            } else {
                if (obj.loadFrom != undefined) {
                    path = this.common1xSpritePath;
                } else {
                    path = this.commonSpritePath;
                }

            }
        } else if (obj.TYPE == "commonLang") {
            path = this.commonLangSpritePath;
        } else {
            if (obj.ASSETTYPE && obj.ASSETTYPE === "spine") {
                if (obj.folderName != undefined) {
                    path = this.gameSpinePath + obj.folderName + "/";
                } else {
                    path = this.gameSpinePath;
                }

            } else if (obj.ASSETTYPE && obj.ASSETTYPE === "video") {
                path = this.gameVideoPath;
            } else {
                path = this.gameSpritePath;
            }
        }
        return path;
    }

    getSpriteSheetIndex () {
        let arr = ["@1x", "@0.75x", "@0.5x"];
        let index = arr.indexOf(CoreLib.Model.DeviceConfig.assetResolution);
        return index;
    }

    loadAssets (listObj, completecallback, progresscallback) {
        let count = 0;
        this.count1 = 0;
        this.loadingSecondList = false;
        this.toLoadForGPU = [];
        this.completeCallback = completecallback;
        this.progressCallback = progresscallback;
        let list = listObj.COMMON;
        if (list) {
            var len = list.length;
            if (len > 0) {
                for (var k = 0; k < len; k++) {
                    if (list[k].ASSETTYPE && list[k].ASSETTYPE === "spine") {
                        var spineLoaderOptions = { metadata: { spineSkeletonScale: 1.0, scale : 1 } };
                        //var spineLoaderOptions = {};
                        count++;
                        this.loader.add(this.stripFileExtenstion(list[k].NAME), this.getFilePath(list[k]) + list[k].NAME, spineLoaderOptions);
                    } else if (list[k].ASSETTYPE && list[k].ASSETTYPE === "sequence") {
                        if (list[k].SPRITESHEETS != undefined) {
                            let index = this.getSpriteSheetIndex();
                            for (let j = 0; j < list[k].SPRITESHEETS[index]; j++) {
                                //if (list[k].loadToGPU) {
                                    this.count1++;
                                    this.toLoadForGPU.push({name : list[k].NAME + j, file : this.getFileNameWithVersion(this.getFilePath(list[k]) + list[k].NAME + j + ".json")})
                                    //this.loader1.add(list[k].NAME + j, this.getFileNameWithVersion(this.getFilePath(list[k]) + list[k].NAME + j + ".json"));
                                //} else {
                                  //  count++;
                                    //this.loader.add(list[k].NAME + j, this.getFileNameWithVersion(this.getFilePath(list[k]) + list[k].NAME + j + ".json"));
                                //}

                            }
                        }
                    } else {
                        if (list[k].loadToGPU) {
                            this.count1++;
                            this.toLoadForGPU.push({name : list[k].NAME, file : this.getFileNameWithVersion(this.getFilePath(list[k]) + list[k].NAME)})
                            //this.loader1.add(list[k].NAME, this.getFileNameWithVersion(this.getFilePath(list[k]) + list[k].NAME));
                        } else {
                            count++;
                            if (list[k].loadFrom != undefined) {
                                this.loader.add(list[k].NAME, this.getFileNameWithVersion(this.getFilePath(list[k]) + list[k].NAME));
                            } else {
                                this.loader.add(list[k].NAME, this.getFileNameWithVersion(this.getFilePath(list[k]) + list[k].NAME));
                            }

                        }

                    }
                }
            }
        }
        if (CoreLib.Model.DeviceConfig.isDesktop) {
            let list = listObj.DESKTOP;
            if (list) {
                var len = list.length;
                if (len > 0) {
                    for (var k = 0; k < len; k++) {
                        if (list[k].ASSETTYPE && list[k].ASSETTYPE === "spine") {
                            count++;
                            this.loader.add(this.stripFileExtenstion(list[k].NAME), this.getFilePath(list[k]) + list[k].NAME, spineLoaderOptions);
                        } else if (list[k].ASSETTYPE && list[k].ASSETTYPE === "sequence") {
                            if (list[k].SPRITESHEETS != undefined) {
                                let index = this.getSpriteSheetIndex();
                                for (let j = 0; j < list[k].SPRITESHEETS[index]; j++) {
                                    if (list[k].loadToGPU) {
                                        this.count1++;
                                        this.toLoadForGPU.push({name : list[k].NAME + j, file : this.getFileNameWithVersion(this.getFilePath(list[k]) + list[k].NAME + j + ".json")})
                                        //this.loader1.add(list[k].NAME + j, this.getFileNameWithVersion(this.getFilePath(list[k]) + list[k].NAME + j + ".json"));
                                    } else {
                                        count++;
                                        this.loader.add(list[k].NAME + j, this.getFileNameWithVersion(this.getFilePath(list[k]) + list[k].NAME + j + ".json"));
                                    }

                                }
                            }

                        } else {
                            if (list[k].loadToGPU) {
                                this.count1++;
                                this.toLoadForGPU.push({name : list[k].NAME, file : this.getFileNameWithVersion(this.getFilePath(list[k]) + list[k].NAME)});
                                //this.loader1.add(list[k].NAME, this.getFileNameWithVersion(this.getFilePath(list[k]) + list[k].NAME));
                            } else {
                                count++;
                                this.loader.add(list[k].NAME, this.getFileNameWithVersion(this.getFilePath(list[k]) + list[k].NAME));
                            }

                        }
                    }
                }
            }
        } else {
            if (CoreLib.Model.DeviceConfig.isMobile) {
                let list = listObj.MOBILE;
                if (list) {
                    var len = list.length;
                    if (len > 0) {
                        for (var k = 0; k < len; k++) {
                            if (list[k].ASSETTYPE && list[k].ASSETTYPE === "spine") {
                                count++;
                                this.loader.add(this.stripFileExtenstion(list[k].NAME), this.getFilePath(list[k]) + list[k].NAME, spineLoaderOptions);
                            } else if (list[k].ASSETTYPE && list[k].ASSETTYPE === "sequence") {
                                if (list[k].SPRITESHEETS != undefined) {
                                    let index = this.getSpriteSheetIndex();
                                    for (let j = 0; j < list[k].SPRITESHEETS[index]; j++) {
                                        if (list[k].loadToGPU) {
                                            this.count1++;
                                            this.toLoadForGPU.push({name : list[k].NAME + j, file : this.getFileNameWithVersion(this.getFilePath(list[k]) + list[k].NAME + j + ".json")});
                                            //this.loader1.add(list[k].NAME + j, this.getFileNameWithVersion(this.getFilePath(list[k]) + list[k].NAME + j + ".json"));
                                        } else {
                                            count++;
                                            this.loader.add(list[k].NAME + j, this.getFileNameWithVersion(this.getFilePath(list[k]) + list[k].NAME + j + ".json"));
                                        }

                                    }
                                }
                            } else {
                                if (list[k].loadToGPU) {
                                    this.count1++;
                                    this.toLoadForGPU.push({name : list[k].NAME, file :  this.getFileNameWithVersion(this.getFilePath(list[k]) + list[k].NAME)});
                                    //this.loader1.add(list[k].NAME, this.getFileNameWithVersion(this.getFilePath(list[k]) + list[k].NAME));
                                } else {
                                    count++;
                                    this.loader.add(list[k].NAME, this.getFileNameWithVersion(this.getFilePath(list[k]) + list[k].NAME));
                                }

                            }
                        }
                    }
                }
            }
            if (CoreLib.Model.DeviceConfig.isTablet) {
                let list = listObj.TABLET ? listObj.TABLET : listObj.MOBILE;
                if (list) {
                    var len = list.length;
                    if (len > 0) {
                        for (var k = 0; k < len; k++) {
                            if (list[k].ASSETTYPE && list[k].ASSETTYPE === "spine") {
                                count++;
                                this.loader.add(this.stripFileExtenstion(list[k].NAME), this.getFilePath(list[k]) + list[k].NAME, spineLoaderOptions);
                            } else if (list[k].ASSETTYPE && list[k].ASSETTYPE === "sequence") {
                                if (list[k].SPRITESHEETS != undefined) {
                                    let index = this.getSpriteSheetIndex();
                                    for (let j = 0; j < list[k].SPRITESHEETS[index]; j++) {
                                        if (list[k].loadToGPU) {
                                            this.count1++;
                                            this.toLoadForGPU.push({name : list[k].NAME + j, file : this.getFileNameWithVersion(this.getFilePath(list[k]) + list[k].NAME + j + ".json")});
                                            //this.loader1.add(list[k].NAME + j, this.getFileNameWithVersion(this.getFilePath(list[k]) + list[k].NAME + j + ".json"));
                                        } else {
                                            count++;
                                            this.loader.add(list[k].NAME + j, this.getFileNameWithVersion(this.getFilePath(list[k]) + list[k].NAME + j + ".json"));
                                        }

                                    }
                                }

                            } else {
                                if (list[k].loadToGPU) {
                                    this.count1++;
                                    this.toLoadForGPU.push({name : list[k].NAME, file : this.getFileNameWithVersion(this.getFilePath(list[k]) + list[k].NAME)});
                                    //this.loader1.add(list[k].NAME, this.getFileNameWithVersion(this.getFilePath(list[k]) + list[k].NAME));
                                } else {
                                    count++;
                                    this.loader.add(list[k].NAME, this.getFileNameWithVersion(this.getFilePath(list[k]) + list[k].NAME));
                                }

                            }
                        }
                    }
                }
            }
        }
        if (listObj.BMPFONT) {
            len = listObj.BMPFONT.length;
            if (len > 0) {
                for (var k = 0; k < len; k++) {
                    count++;
                    this.loader.add(listObj.BMPFONT[k], this.getFileNameWithVersion(this.gamebitmapFontsPath + listObj.BMPFONT[k]));
                }
            }
        }
        if (listObj.COMMONBMPFONT) {
            len = listObj.COMMONBMPFONT.length;
            if (len > 0) {
                for (var k = 0; k < len; k++) {
                    count++;
                    this.loader.add(listObj.COMMONBMPFONT[k], this.getFileNameWithVersion(this.commonbitmapFontsPath + listObj.COMMONBMPFONT[k]));
                }
            }
        }
        this.totalFilesToLoad = count + this.toLoadForGPU.length;
        this.primaryPercentage = (count / this.totalFilesToLoad) * 100;
        this.secondaryPercentage = (this.toLoadForGPU.length / this.totalFilesToLoad) * 100;
        if (count > 0) {
            this.loader.onProgress.add(this.loadProgressHandler.bind(this));
            this.loader.load(this.onAssetListLoaded.bind(this));
        } else {
            this.completeCallback();
        }
    }
    loadProgressHandler (loader, resource) {
        if (this.loadingSecondList) {
            return;
        }
        var loaded = Math.round(loader.progress * (this.primaryPercentage / 100));
        if (this.progressCallback) {
            this.progressCallback(loaded);
        }
    }




    getIsMultipleSprite(name) {
        let arr = name.split("");
        let len = arr.length;
        let flag = false;
        for (let k = 0; k < len; k++) {
            if (!isNaN(arr[k])) {
                flag = true;
            }
        }
        return flag;
    }

    onAssetListLoaded (loader, resource) {
        this.resourceCount = 0;
        this.uploadedCount = 0;
        this.uploadArr = [];
        this.uploadedCount = 0;
        this.resourceCount = this.uploadArr.length;
        if (this.count1 > 0) {
            //this.loader.reset();
            this.loadSecondList();
        } else {
            this.uploadToGPU();
        }
    }
    loadSecondList () {
        this.loadingSecondList = true;
        let len = this.toLoadForGPU.length;
        this.sequenceCounter = 0;
        if (len > 0) {
            //this.loader.reset();
            for (let k = 0; k < len; k++) {
                this.loader.add(this.toLoadForGPU[k].name, this.toLoadForGPU[k].file);
            }
        }
        this.loader.onProgress.add(this.loadProgressHandler1.bind(this));
        this.loader.load(this.onAssetListLoaded1.bind(this));

    }
    loadProgressHandler1 (loader, resource) {

        var loaded = Math.round(this.primaryPercentage + loader.progress * (this.secondaryPercentage / 100));
        if (this.progressCallback) {
            this.progressCallback(loaded);
        }
        this.bindToGPU(resource, loaded);
    }
    bindToGPU(resource, loaded) {

        if (CoreLib.Model.GameConfig.isLocalBuild) {
            // if (resource.name.indexOf("_image") > -1) {
            //     let texture = new PIXI.Texture.from(resource.name);
            //     const renderer = CoreLib.View.getPixiRenderer();
            //     renderer.plugins.prepare.upload(texture, this.onUploadDoneNew.bind(this, loaded));
            // }
            this.onUploadDoneNew(loaded);
        } else {
            if (resource.name.indexOf("_image") > -1) {
                let texture = new PIXI.Texture.from(resource.name);
                const renderer = CoreLib.View.getPixiRenderer();
                renderer.plugins.prepare.upload(texture, this.onUploadDoneNew.bind(this, loaded));
            }
            //this.onUploadDoneNew(loaded);
        }

    }
    onUploadDoneNew (loaded) {
        this.sequenceCounter++;
        if (this.sequenceCounter == this.toLoadForGPU.length) {
            if (this.completeCallback) {
                this.progressCallback = null;
                this.completeCallback();
            }
        }
    }
    onAssetListLoaded1 (loader, resource) {
        if (CoreLib.Model.GameConfig.isLocalBuild) {
            if (this.completeCallback) {
                this.progressCallback = null;
                this.completeCallback();
            }
        }
        return;

        this.resourceCount = 0;
        this.uploadedCount = 0;
        this.uploadArr = [];
        return;

        let len = this.toLoadForGPU.length;
        let namesArray = [];
        for (let k = 0; k < len; k++) {
            namesArray.push(this.toLoadForGPU[k].name);

        }

        for (let p in resource) {
            if (p.indexOf("_image") > -1) {
                let arr = p.split("_");
                if (namesArray.indexOf(arr[0]) > -1) {
                    this.uploadArr.push(resource[p]);
                }

            }
        }
        this.uploadedCount = 0;
        this.resourceCount = this.uploadArr.length;
        //this.uploadToGPU();
    }

    uploadToGPU () {
        if (this.resourceCount > 0) {
            if (this.uploadArr[this.uploadedCount]) {
                let texture = new PIXI.Texture.from(this.uploadArr[this.uploadedCount].name);
                const renderer = CoreLib.View.getPixiRenderer();
                renderer.plugins.prepare.upload(texture, this.onUploadDone.bind(this));
                CoreLib.Logger.log("uploading to gpu == " + this.uploadArr[this.uploadedCount].name);
            } else {
                this.onUploadDone();
            }
        } else {
            this.onUploadDone();
        }


    }

    onUploadDone () {
        this.uploadedCount++;
        if (this.progressCallback && this.resourceCount > 0) {
            let loaded = 70 + Math.round(15 * (this.uploadedCount / this.resourceCount));
            this.progressCallback(loaded);
        }
        if (this.uploadedCount >= this.resourceCount) {
            if (this.completeCallback) {
                this.progressCallback = null;
                this.completeCallback();
            }
        } else {
            setTimeout(this.uploadToGPU.bind(this), 0);
        }
    }




    loadFonts (list, fcallback) {
        this.fontCallback = fcallback;
        if (list.length <= 0) {
            this.fontCallback();
            return;
        }

        this.fontloader = new type.Loader();
        var len1 = list.length;
        for (var k = 0; k < len1; k++) {
            if (CoreLib.Model.DeviceConfig.isIE11) {
                this.fontloader.add(list[k].name, this.gameFontsPath + list[k].otfile);
            } else {
                if (list[k].type == "common") {
                    this.fontloader.add(list[k].name, this.commonFontsPath + list[k].file);
                } else {
                    this.fontloader.add(list[k].name, this.gameFontsPath + list[k].file);
                }
            }

        }

        this.fontloader.on('progress', this.onFontLoadingUpdate.bind(this));
        this.fontloader.on('loadComplete', this.onFontLoaded.bind(this));
        this.fontloader.load();

    }
    onFontLoadingUpdate (evt) {

    }

    onFontLoaded () {
        setTimeout(this.onFontsReady.bind(this), 100);
    }

    onFontsReady () {
        this.fontCallback();
    }

    loadLangJsonFile (fileObj, langs, callback) {
        if (CoreLib.Model.GameInfo.language === "en") {
            this.loadJSONFile(fileObj, callback);
            return;
        }
        this.langconfigCallback = callback;
        this.langFileObj = fileObj;
        this.languagesSupported = langs;
        if (fileObj) {
            const file = this.getFileNameWithVersion(fileObj.name);
            var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
            xobj.open('GET', this.getConfigPath(fileObj.type, "en") + file, true);
            let that = this;
            xobj.onreadystatechange = function () {
                if (xobj.readyState === 4 && xobj.status === 200) {
                    that.onLangFirstFileLoaded(JSON.parse(xobj.responseText));
                }
            };
            xobj.send(null);
        } else {
            this.configCallback(null)
        }
    }
    onLangFirstFileLoaded (data) {
        this.enData = data;
        let that = this;
        if (this.langFileObj && this.ifLangConfigPresent()) {
            const file = this.getFileNameWithVersion(this.langFileObj.name);
            var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
            xobj.open('GET', this.getConfigPath(this.langFileObj.type) + file, true);
            xobj.onreadystatechange = function () {
                if (xobj.readyState === 4 && xobj.status == 200) {
                    that.onLangSecondFileLoaded(JSON.parse(xobj.responseText));
                } else if (xobj.readyState === 4 && (xobj.status === 404 || xobj.status === 403 || xobj.status === 401)) {
                    that.onLangError();
                }
            };
            xobj.send(null);
        } else {
            that.onLangError();
        }

    }
    ifLangConfigPresent() {
        let flag = false;
        if (this.languagesSupported) {
            let len = this.languagesSupported.length;
            for (var k = 0; k < len; k++) {
                if (this.languagesSupported[k] === CoreLib.Model.GameInfo.language) {
                    flag = true;
                    break;
                }
            }
        }
        return flag;
    }
    onLangSecondFileLoaded (data) {
        this.langconfigCallback(this.enData, data)
    }
    onLangError () {
        this.langconfigCallback(this.enData, null)
    }


    loadJSONFile (fileObj, callback) {
        this.configCallback = callback;
        if (fileObj) {
            const file = this.getFileNameWithVersion(fileObj.name, true);
            var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
            let url = this.getConfigPath(fileObj.type) + file;
            xobj.open('GET', url, true);
            xobj.onreadystatechange = function () {
                if (xobj.readyState === 4 && xobj.status === 200) {
                    callback(JSON.parse(xobj.responseText));
                }
            };
            xobj.send(null);
        } else {
            this.configCallback(null)
        }
    }



    getConfigPath (type, lang) {
        if (lang === undefined) {
            lang = CoreLib.Model.GameInfo.language;
        } else {
            lang = "en";
        }

        var path = "";
        switch (type) {
            case "envconfig" :
                path = CoreLib.Model.GameConfig.commonPath + "../env/";
                break;
            case "commonconfig" :
                path = CoreLib.Model.GameConfig.commonPath + "../config/";
                break;
            case "config" :
                path = CoreLib.Model.GameConfig.configPath;
                break;
            case "commonConfig" :
                path = CoreLib.Model.GameConfig.commonPath + CoreLib.Model.GameConfig.commonAssetVersion + "/lang/" + lang + "/";
                break;
            case "gameConfig" :
                path = CoreLib.Model.GameConfig.gamePath + CoreLib.Model.GameConfig.gameAssetVersions[CoreLib.Model.GameConfig.gameId] + "/lang/" + lang + "/";
                break;
            case "commonContent":
                if (CoreLib.Model.GameConfig.isStandAlone) {
                    path = CoreLib.Model.GameConfig.commonPath + CoreLib.Model.GameConfig.commonAssetVersion + "/lang/" + lang + "/";
                } else {
                    path = CoreLib.Model.GameConfig.commonLangURL + lang + "/";
                }
                break;
            case "gameContent" :
                if (CoreLib.Model.GameConfig.isStandAlone) {
                    path = CoreLib.Model.GameConfig.gamePath + CoreLib.Model.GameConfig.gameAssetVersions[CoreLib.Model.GameConfig.gameId] + "/lang/" + lang + "/";
                } else {
                    path = CoreLib.Model.GameConfig.gameLangURL + CoreLib.Model.GameConfig.gameLangIds[CoreLib.Model.GameConfig.gameId] + "/lang/" + lang + "/";
                }

                break;
            default :
                break;
        }
        return path;
    }


    getFileNameWithVersion (file, addTimeStamp = false) {
        if (CoreLib.Model.DeviceConfig.isIE11) {
            return file;
        } else {
            if (file.indexOf("?version") > -1) {
                return file;
            } else {
                if (addTimeStamp) {
                    return file + "?version=" + CoreLib.Model.GameConfig.coreVersion + "_" + CoreLib.Model.GameConfig.buildVersion + "_" + CoreLib.Util.getCurrentTimeInMili()
                } else {
                    return file + "?version=" + CoreLib.Model.GameConfig.coreVersion + "_" + CoreLib.Model.GameConfig.buildVersion;
                }

            }

        }
    }
    stripFileExtenstion (name) {
        var arr = name.split(".");
        return arr[0];
    }
}
