import {CoreLib} from "../core/CoreLib";
import {LibSprite} from "./LibSprite";
import {LibSpine} from "./LibSpine";
import {LibDualImage} from "./LibDualImage";
import {LibText} from "./LibText";
import {LibBitmapText} from "./LibBitmapText";
import {LibButton} from "./LibButton";
import {DynamicSprite} from "./DynamicSprite";
import {LibContainer} from "./LibContainer";
import {LibToggleButton} from "./LibToggleButton";
import {LibAnimatedSprite} from "./LibAnimatedSprite";
import { LibSpriteDS } from './LibSpriteDS'
import {LibButtonV2} from "./LibButtonV2";


class UIUtilService {
    constructor() {
    }


    getThemeColor (name) {
        if (CoreLib.Model.GameConfig.themeConfig && CoreLib.Model.GameConfig.themeConfig[name] != undefined) {
            return CoreLib.Model.GameConfig.themeConfig[name];
        } else {
            return name;
        }
    }
    getGameWidth () {
        return CoreLib.Model.DeviceConfig.gameWidth;
    }
    getGameHeight () {
        return CoreLib.Model.DeviceConfig.gameHeight;
    }

    getDynamicSprite (obj) {
        let sp = new DynamicSprite(obj);
        return sp;
    }
    getDualImage (name, layoutData) {
        let sp;
        if (name.length > 0) {
            sp = new LibDualImage(name, layoutData);
            sp.name = name;
        }
        return sp;
    }
    getVideo (name, configData) {
        let vd = new CoreLibVideo(name, configData);
        return vd;
    }
    getSprite3D (name) {
        let sp = new PIXI.projection.Sprite3d(this.getTexture(name));
        return sp;
    }
    setThemeColor(element) {
        if (element && element.configData && element.configData.color != undefined) {
            element.tint = this.getThemeColor(element.configData.color);
        }

    }
    getDSSprite (name, layoutData) {
        let sp;
        let texture;
        if (typeof(name) != "string") {
            name = name.toString();
        }
        if (name.length > 0) {
            if (CoreLib.Model.DeviceConfig.isDesktop) {
                texture = this.getTexture(name);
            } else {
                if (layoutData && layoutData.mobileImage != undefined) {
                    texture = this.getTexture(layoutData.mobileImage);
                } else {
                    texture = this.getTexture(name);
                }
            }
            sp = new LibSpriteDS(texture, layoutData);
            sp.name = name;
            this.setThemeColor(sp);
            sp.roundPixels = true;
        }
        return sp;
    }
    getSprite (name, layoutData) {
        let sp;
        let texture;
        if (typeof(name) != "string") {
            name = name.toString();
        }
        if (name.length > 0) {
            if (CoreLib.Model.DeviceConfig.isDesktop) {
                texture = this.getTexture(name);
            } else {
                if (layoutData && layoutData.mobileImage != undefined) {
                    texture = this.getTexture(layoutData.mobileImage);
                } else {
                    texture = this.getTexture(name);
                }
            }
            sp = new LibSprite(texture, layoutData);
            sp.name = name;
            this.setThemeColor(sp);
            sp.roundPixels = true;
        }
        return sp;
    }
    getSpriteFromTexture (texture, layoutData) {
        let sp;
        sp = new LibSprite(texture, layoutData);
        return sp;
    }

    getTexture  (name) {
        try {
            return PIXI.Texture.from(name);
        } catch (e) {
            CoreLib.Logger.log('ERROR ' + e)
        }

    }

    getParticleContainer (num = 1000) {
        let cont = new PIXI.ParticleContainer(num, {
            scale: true,
            position: true,
            rotation: true,
            alpha : true
        });
        return cont;
    }

    getPolygon (arr, col) {
        if (col == undefined) {
            col = 0x000000;
        }
        var len = arr.length;
        var graphics = new PIXI.Graphics();
        graphics.beginFill(col);
        graphics.drawPolygon(arr);
        graphics.endFill();

        return graphics;
    }
    getBezierCurve (arr) {
        var graphics = new PIXI.Graphics();
        graphics.lineStyle(5, 0x00ff00);
        graphics.bezierCurveTo(arr[0].pt.x, arr[0].pt.y, arr[1].pt.x, arr[1].pt.y, arr[2].pt.x, arr[2].pt.y, arr[3].pt.x, arr[3].pt.y);
        return graphics;
    }

    getBorderRectangle (width, height, backgroundColor, borderColor, borderWidth, x, y,  ) {
        var box = new PIXI.Graphics();
        box.beginFill(this.getThemeColor(backgroundColor));
        box.lineStyle(borderWidth , borderColor);
        box.drawRect(0, 0, width - borderWidth, height - borderWidth);
        box.endFill();
        return box;
    };
    getRectangle(width, height, colour, x = 0, y = 0) {
        let graphics = new PIXI.Graphics();
        graphics.lineColor = 0xffff00;
        graphics.beginFill(colour);
        graphics.drawRect(x, y, width, height);
        return graphics;
    }
    getRoundedRectangle (obj) {
        let g = new PIXI.Graphics();
        g.beginFill(this.getThemeColor(obj.color)); // black color
        // x, y, width, height, radius
        g.drawRoundedRect(0, 0, obj.width, obj.height, obj.radius);
        g.endFill();
        return g;
    }

    getCircle (fill, radius) {
        let graphics = new PIXI.Graphics();
        graphics.beginFill(fill); // Red
        graphics.drawCircle(0, 0, radius); // drawCircle(x, y, radius)
        graphics.endFill();
        return graphics;

    }

    getSemiCircle(lineWidth, color, radius, angle,rotation=0, anticlockwise = false) {
        var semicircle = new PIXI.Graphics();
        semicircle.beginFill(color);
        semicircle.lineStyle(lineWidth, color);
        semicircle.rotation = rotation;
        semicircle.arc(0, 0, radius, 0, angle, anticlockwise); // cx, cy, radius, startAngle, endAngle
        return semicircle;
    }

    getCombinedAnimatedSprite (arr, configData) {
        let frames = [];
        let len = arr.length;
        for (let k = 0; k< len; k++) {
            let newarr = this.getAnimationFramesArray(arr[k]);
            let len1 = newarr.length;
            for (let i = 0; i < len1; i++) {
                frames.push(this.getTexture(newarr[i]));
            }
        }
        let movie = new LibAnimatedSprite(frames, configData);
        movie.name = arr[0];
        movie.anchor.set(0.5, 0.5);
        if (arr[0].animationSpeed) {
            movie.animationSpeed = arr[0].animationSpeed;
        }
        if (arr[0].playOnStart) {
            movie.play();
        }
        if (arr[0].staticFame && arr[0].staticFame >= 0) {
            movie.goToAndStop(arr[0].staticFame);
        }
        if (movie.width % 2 != 0) {
            movie.width = movie.width - 1;
        }
        if (movie.height % 2 != 0) {
            movie.height = movie.height - 1;
        }

        return movie;
    }


    getAmbientEventElement (obj) {
        let arr = this.getAnimationFramesArray(obj);
        let frames = [];
        let len = arr.length;
        for (let i = 0; i < len; i++) {
            frames.push(this.getTexture(arr[i]));
        }
        let element = new AmbientEventElement(frames, obj);
        return element;
    }
    getAnimatedSprite (obj, configData) {
        let frames = [];
        let arr;
        if (obj && obj.image != undefined) {
            frames.push(this.getTexture(obj.image));
        } else {

            arr = this.getAnimationFramesArray(obj);
            let len = arr.length;
            for (let i = 0; i < len; i++) {
                frames.push(this.getTexture(arr[i]));
            }
        }
        let movie = new LibAnimatedSprite(frames, configData);
        if (obj.image) {
            movie.name = obj.image;
        } else {
            movie.name = arr[0];
        }

        movie.anchor.set(0.5, 0.5);
        movie.animationSpeed = CoreLib.Model.GameConfig.globalAnimSpeed;
        if (obj.loop != undefined) {
            movie.loop = obj.loop;
        }
        if (obj.animationSpeed) {
            movie.animationSpeed = obj.animationSpeed;
        }
        if (obj.playOnStart) {
            movie.play();
        }
        if (obj.blendMode != undefined) {
            movie.blendMode = PIXI.BLEND_MODES[obj.blendMode];
        }
        if (obj && obj.pivot) {
            movie.pivot.x = obj.pivot.x;
            movie.pivot.y = obj.pivot.y;
        }
        if (obj.staticFame && obj.staticFame >= 0) {
            movie.goToAndStop(obj.staticFame);
        }
        return movie;
    }
    getAnimationFramesArray (obj) {
        let arr = [];
        if (obj === undefined) {
            return null;
        }
        if (obj.checkPoint === undefined) {
            obj.checkPoint = 10;
        }
        if (obj.start >= 0) {
            if (obj.playReverse) {
                for (let j = obj.end - 1; j >= obj.start; j--) {
                    if (obj.skipFrame) {
                        if (j % 2 != 0) {
                            continue;
                        }
                    }
                    let str = obj.prefix;
                    if (obj.toAddZero) {
                        if (obj.checkPoint === 100) {
                            if (j < 10) {
                                str += j < obj.checkPoint ? "00" + j : j;
                            } else if (j >= 10 && j < 100) {
                                str += j < obj.checkPoint ? "0" + j : j;
                            } else {
                                str += j;
                            }
                        } else {
                            str += j < obj.checkPoint ? "0" + j : j;
                        }

                    } else {
                        str += j;
                    }
                    arr.push(str + obj.postfix);
                }

            } else {
                for (let j = obj.start; j <= obj.end; j++) {
                    if (obj.skipFrame) {
                        if (j % 2 != 0) {
                            continue;
                        }
                    }
                    let str = obj.prefix;
                    if (obj.toAddZero) {
                        if (obj.checkPoint === 100) {
                            if (j < 10) {
                                str += j < obj.checkPoint ? "00" + j : j;
                            } else if (j >= 10 && j < 100) {
                                str += j < obj.checkPoint ? "0" + j : j;
                            } else {
                                str += j;
                            }
                        } else {
                            str += j < obj.checkPoint ? "0" + j : j;
                        }

                    } else {
                        str += j;
                    }
                    arr.push(str + obj.postfix);
                }
            }

        }


        return arr;
    }
    getPayline22 (arr, col1, col2, lineWidth) {
        if (col1 === undefined) {
            col1 = 0xFFFFFF;
        }
        if (col2 === undefined) {
            col2 = 0x666666;
        }
        if (lineWidth === undefined) {
            lineWidth = 5;
        }
        var len = arr.length;
        let container = this.getContainer();
        var graphics = new PIXI.Graphics();
        var graphics1 = new PIXI.Graphics();
        for (var k = 0; k < len; k++) {
            let line = null;
            let image = "winning_line";
            if (arr[k].isWin) {

            } else {

            }
            line = this.getSprite(image);
            let dist = 0;
            if (k === 0) {
                dist = 0;
                //let dist = Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
            } else {
                dist = Math.sqrt( Math.pow((arr[k - 1].x - arr[k].x), 2) + Math.pow((arr[k - 1].y - arr[k].y), 2) );
            }
            line.width = dist;
            container.addChild(line);
        }
        return container;
    }

    getPaylineStroke (arr, col1, col2, lineWidth) {
        if (col1 === undefined) {
            col1 = 0xFFFFFF;
        }
        if (col2 === undefined) {
            col2 = 0x666666;
        }
        if (lineWidth === undefined) {
            lineWidth = 5;
        }
        var len = arr.length;
        var graphics = new PIXI.Graphics();
        var graphics1 = new PIXI.Graphics();
        for (var k = 0; k < len; k++) {
            let line;
            if (arr[k].isWin) {
                graphics.lineStyle(lineWidth, col1,1);
            } else {
                graphics.lineStyle(lineWidth, col2,1);
            }
            if (k === 0) {
                graphics.moveTo(arr[k].x, arr[k].y);
            } else {
                graphics.lineTo(arr[k].x, arr[k].y);
            }
        }
        return graphics;
    }
    getPayline (arr, lineWidth, col) {
        if (lineWidth === undefined) {
            lineWidth = 5;
        }
        let len = arr.length;
        let startPos, endPos;
        const cont = this.getContainer();
        for (let k = 0; k < len; k++) {
            if (k === 0) {
                startPos = {x:arr[k].x, y : arr[k].y};
                endPos = {x : arr[k].x, y : arr[k].y};
            } else {
                startPos = {x : arr[k - 1].x, y : arr[k - 1].y};
                endPos = {x : arr[k].x, y : arr[k].y};
                var dist = Math.sqrt( Math.pow((startPos.x-endPos.x), 2) + Math.pow((startPos.y-endPos.y), 2) );
                var angle = Math.atan2(endPos.y - startPos.y, endPos.x - startPos.x)
                var sp = this.getRectangle(100, 8, col);
                sp.rotation = (angle);
                if (k == len - 1) {
                    sp.width = lineWidth / 2;
                } else {
                    sp.width = lineWidth;
                }

                sp.x = startPos.x;
                sp.y = startPos.y;
                cont.addChild(sp);
                if (!arr[k].isWin) {
                    sp.tint = 0x6b7d57;
                    //sp.alpha = 0.75;
                }
            }
        }
        return cont;

    }
    makeGreyScale (element, flag = true) {
        if (flag) {
            var colCoreLib = new PIXI.filters.ColorCoreLibFilter();
            colCoreLib.grayscale(0.5);
            element.filters = [colCoreLib];
        } else {
            element.filters = null;
        }
    }

    getContainer () {
        return new PIXI.Container();
    }

    getElement (obj) {
        let element = null;
        //console.log("element == ", obj.name);
        switch (obj.type) {
            case "Graphics" :
                element = this.getRectangle(obj.width, obj.height, obj.color);
                element.configData = obj;
                break;
            case "RoundedRect" :
                element = this.getRoundedRectangle(obj);
                element.configData = obj;
                break;
            case "Circle" :
                element = this.getCircle(obj.fill, obj.radius);
                break;
            case "BorderRectangle" :
                element = this.getBorderRectangle(obj.width, obj.height, obj.backgroundColor, obj.borderColor, obj.borderWidth, obj.x, obj.y);
                break;
            case "Polygon" :
                element = this.getPolygon(obj.points, obj.color);
                element.configData = obj;
                break;
            case "Container" :
                element = new LibContainer(obj);
                break;
            case "Text" :
                element = this.getTextField(obj);
                element.layoutData = obj.layoutData;
                break;
            case "Image" :
                element = this.getSprite(obj.image, obj);
                break;
            case "Sprite" :
                element = this.getSprite(obj.image, obj);
                break;
            case "DSSprite" :
                element = this.getDSSprite(obj.image, obj);
                break;
            case "AnimatedSprite" :
                if (CoreLib.Model.DeviceConfig.isDesktop) {
                    if (obj.animationDesktop) {
                        element = this.getAnimatedSprite(obj.animationDesktop, obj);
                    } else {
                        element = this.getAnimatedSprite(obj.animation, obj);
                    }

                } else {
                    if (obj.animationMobile) {
                        element = this.getAnimatedSprite(obj.animationMobile, obj);
                    } else {
                        element = this.getAnimatedSprite(obj.animation, obj);
                    }
                }

                break;
            case "Spine" :
                if (CoreLib.Model.DeviceConfig.isDevice && obj.mobileSpineName != undefined) {
                    element = this.getSpineAnim(obj.mobileSpineName, obj);
                } else {
                    element = this.getSpineAnim(obj.spineName, obj);
                }

                break;
            case "AmbientEventElement" :
                element = this.getAmbientEventElement(obj);
                break;
            case "Video" :
                element = this.getVideo(obj.video, obj);
                break;
            case "DualImage" :
                element = this.getDualImage(obj.image, obj);
                break;
            case "DynamicSprite" :
                element = this.getDynamicSprite(obj);
                break;
            case "Button" :
                element = this.getButton(obj);
                break;
            case "ButtonV2" :
                element = this.getButtonV2(obj);
                break;
            case "ToggleButton" :
                element = this.getToggleButton(obj);
                break;
            case "TextImageButton" :
                element = this.getTextImageButton(obj);
                break;
            case "TextButton" :
                element = this.getTextButton(obj);
                break;
            case "SelectedButton" :
                element = this.getSelectedButton(obj);
                break;
            case "Comp" :
                element = CoreLib.gameUtil.getGameClass(obj.class, obj);
                break;
            case "SliderComp" :
                element = new SliderComp(config);
                break;
            case "AnimatedButton" :
                element = new LibAnimatedButton(obj);
                break;
            default :
                break;
        }

        element.name = obj.name;
        if (obj.x) {
            this.setPositionX(element, obj.x, true);
        }
        if (obj.y) {
            this.setPositionY(element, obj.y, true);
        }


        if (CoreLib.Model.DeviceConfig.isDevice) {
            if (obj.mx) {
                this.setPositionX(element, obj.mx, true);
            }
            if (obj.my) {
                this.setPositionY(element, obj.my, true);
            }
        }
        if (obj.alpha != undefined) {
            element.alpha = obj.alpha;
        }
        if (obj.scale) {
            if (typeof(obj.scale) === "object") {
                if (obj.scale.x) {
                    element.scale.x = obj.scale.x;
                }
                if (obj.scale.y) {
                    element.scale.y = obj.scale.y;
                }
            } else {
                element.scale.set(obj.scale);
            }
        }
        if (obj.mscale != undefined) {
            if (CoreLib.Model.DeviceConfig.isDevice) {
                element.scale.set(obj.mscale)
            }
        }
        if (obj.tint) {
            element.tint = this.getThemeColor(obj.tint);
        }

        if (obj.anchor && element.anchor) {
            element.anchor.set(obj.anchor.x, obj.anchor.y);
        }
        if (obj.rotation) {
            element.rotation = CoreLib.Util.getRadians(obj.rotation);
        }
        if (obj.skewX) {
            element.skew.x = obj.skewX;
        }
        if (obj.skewY) {
            element.skew.y = obj.skewY;
        }
        if (obj.visible != undefined) {
            element.visible = obj.visible;
        }
        return element;
    }
    getSpineAnim(name, obj) {


        let spine = new LibSpine(name, obj);
        if (obj && obj.defaultState != undefined && obj.defaultState.length > 0) {
            spine.playAnimation(obj.defaultState, obj.loop);
        }
        if (obj && obj.defaultSkin != undefined) {
            spine.setSkin(obj.defaultSkin);
        }
        if (obj && obj.pivot) {
            spine.pivot.x = obj.pivot.x;
            spine.pivot.y = obj.pivot.y;
        }

        return spine;
    }

    positionObjectForDevice(element) {
        if (CoreLib.Model.DeviceConfig.isDesktop) {
            CoreLib.UIUtil.setPosition(element, element.configData.x, element.configData.y);
        } else {
            if (CoreLib.Model.DeviceConfig.isPortrait) {
                if (element.configData.pScale != undefined) {
                    element.scale.set(element.configData.pScale);
                }
                if (element.configData.px != undefined) {
                    CoreLib.UIUtil.setPositionX(element, element.configData.px);
                }
                if (element.configData.py != undefined) {
                    CoreLib.UIUtil.setPositionY(element, element.configData.py);
                }
            } else {
                if (element.configData.lScale != undefined) {
                    element.scale.set(element.configData.lScale);
                }
                if (element.configData.lx != undefined) {
                    CoreLib.UIUtil.setPositionX(element, element.configData.lx);
                }
                if (element.configData.ly != undefined) {
                    CoreLib.UIUtil.setPositionY(element, element.configData.ly);
                }

            }
        }

    }

    getButton (obj) {
        let btn = new LibButton(obj);
        return btn;
    }

    getButtonV2 (obj) {
        let btn = new LibButtonV2(obj);
        return btn;
    }
    getToggleButton (obj) {
        let btn = new LibToggleButton(obj);
        return btn;
    }
    getTextImageButton (obj) {
        var btn = new LibTextImageButton(obj);
        return btn;
    }
    getTextButton (obj) {
        var btn = new LibTextButton(obj);
        return btn;
    }

    getSelectedButton (obj) {
        var btn = new LibSelectedButton(obj);
        return btn;
    }

    getTextField (tobj) {
        if (typeof(tobj) === "string") {
            var obj = this.getTextProp(tobj);
        } else {
            var obj = this.getTextProp(tobj.style);
        }
        if (obj === undefined) {
            return;
        }
        var newobj = {};
        for (var p in obj) {
            newobj[p] = obj[p];
        }
        newobj.breakWords = true;

        if (newobj.type === "BitmapFont") {
            obj.fontName = newobj.fontFamily;
        } else {
            newobj.fontFamily = CoreLib.Model.TextConfig.FontFaces[newobj.fontFamily];
        }
        var content = "";
        if (tobj.content) {
            content = CoreLib.Util.getContent(tobj.content);
            if (tobj.toUpperCase) {
                content = content.toUpperCase();
            }
        } else if (tobj.contentText) {
            content = tobj.contentText;
        }
        if (newobj.fontSizes) {
            if (CoreLib.Model.DeviceConfig.isDesktop) {
                if (CoreLib.Model.GameConfig.isFHDSupported) {
                    newobj.fontSize = newobj.fontSizes[1];
                } else {
                    newobj.fontSize = newobj.fontSizes[0];
                }

            } else {
                newobj.fontSize = newobj.fontSizes[CoreLib.Model.DeviceConfig.appResolution - 1];
            }

        } else {
            // if (CoreLib.Model.DeviceConfig.isForcedMobile) {
            //     newobj.fontSize = Math.round(newobj.fontSize * 0.667);
            // } else {
            //     newobj.fontSize = newobj.fontSize;
            // }

        }
        if (tobj.fontSize != undefined) {
            newobj.fontSize = tobj.fontSize;
            obj.fontSize = tobj.fontSize;
        }

        if (tobj.mFontSize != undefined && CoreLib.Model.DeviceConfig.isDevice) {
            newobj.fontSize = tobj.mFontSize;
        }
        if (tobj.fontColor != undefined) {
            newobj.fill = this.getThemeColor(tobj.fontColor);
        }
        if (tobj.lineHeight != undefined) {
            newobj.lineHeight = tobj.lineHeight;
        }
        if (CoreLib.Model.DeviceConfig.isDevice) {
            if (tobj.mWordWrapWidth != undefined) {
                newobj.wordWrap = true;
                newobj.wordWrapWidth = tobj.mWordWrapWidth;
            } else {
                if (tobj.wordWrapWidth != undefined) {
                    newobj.wordWrap = true;
                    newobj.wordWrapWidth = tobj.wordWrapWidth;
                }
            }
        } else {
            if (tobj.wordWrapWidth != undefined) {
                newobj.wordWrap = true;
                newobj.wordWrapWidth = tobj.wordWrapWidth;
            }
        }

        if (tobj.align != undefined) {
            newobj.align = tobj.align;
        }
        if (CoreLib.Model.DeviceConfig.isDevice) {
            //newobj.fontSize = newobj.fontSize * CoreLib.Model.DeviceConfig.fontFactor;
        }
        if (newobj.type === "BitmapFont") {
            var txt = new LibBitmapText(content, obj, tobj);
        } else {
            var txt = new LibText(content, newobj, tobj);
        }
        if (tobj.anchor) {
            txt.anchor.set(tobj.anchor);
        }
        if (tobj.color != undefined) {
            this.updateTextColor(txt, this.getThemeColor(tobj.color));
        }
        txt.selectable = false;
        txt.name = tobj.content;
        return txt;
    }

    updateWordWrapWidth (txt, width, lineht = undefined) {
        txt._style._wordWrap = true;
        txt._style._wordWrapWidth = width;
        if (lineht != undefined) {
            txt._style.lineHeight = lineht;
        }
        let str = txt.text;
        txt.text = "ADFASDF";
        txt.text = str;
    }
    updateGraphicsColor(element, color) {
        element.tint= this.getThemeColor(color);
    }
    updateTextColor(txt, color) {
        txt._style.fill = this.getThemeColor(color);
    }
    updateTextStyle (txt, style) {
        var obj = this.getTextProp(style);
        this.updateTextColor(txt, obj.fill);
    }
    updateTextSize(txt, size) {
        txt._style.fontSize = size;
    }
    updateBitmapTextSize(txt, size) {
        txt.fontSize = size;
    }
    updateTextLineHeight (txt, val) {
        txt._style.lineHeight = val;
    }
    getTextProp (stylename) {
        var obj = CoreLib.Model.TextConfig.FontConfig[stylename];
        var tobj;
        if (CoreLib.Model.DeviceConfig.isDesktop && obj.Desktop) {
            tobj = obj.Desktop;
        } else {
            tobj = CoreLib.Model.DeviceConfig.isTablet && obj.Tablet ? obj.Tablet : obj.Mobile;
        }
        var newobj = {};
        for (var p in tobj) {
            newobj[p] = tobj[p];
        }
        return newobj;
    }

    adjustElement (element) {

        if (element) {
            let obj = this.getDeviceSpecificUIObj(element.configData.layoutData);
            if (obj) {
                element.scale.set(1);
                if (obj.widthPerc != undefined || obj.heightPerc != undefined) {
                    this.setRelativeWidthAndHeight(element, obj.widthPerc, obj.heightPerc, obj.isForced);
                }
                if (obj.fitToScreen) {
                    this.fitToScreen(element);
                }
                if (obj.hAlign != undefined) {
                    this.alignToScreen(element, obj.hAlign, CoreLib.UIUtil.getGameWidth() * obj.hPaddingPerc);
                }
                if (obj.hAlign != undefined && obj.hPadding != undefined) {
                    this.alignToScreen(element, obj.hAlign, obj.hPadding);
                }
                if (obj.vAlign != undefined) {
                    this.alignToScreen(element, obj.vAlign, CoreLib.UIUtil.getGameHeight() * obj.vPaddingPerc);
                }
                if (obj.vAlign != undefined && obj.vPadding != undefined) {
                    this.alignToScreen(element, obj.vAlign, obj.vPadding);
                }
                if (obj.x != undefined) {
                    this.setPositionX(element, obj.x);
                }
                if (obj.y != undefined) {
                    this.setPositionY(element, obj.y);
                }
            }
        }
    }
    adjustWidthHeightForMobile (element) {
        if (CoreLib.Model.DeviceConfig.isDesktop) {

        } else {

            if (CoreLib.Model.DeviceConfig.isPortrait) {
                if (element.configData.pWidth != undefined) {
                    element.width = element.configData.pWidth;
                } else {
                    if (element.configData.width != undefined) {
                        element.width = element.configData.width;
                    }

                }
                if (element.configData.pHeight != undefined) {
                    element.height = element.configData.pHeight;
                } else {
                    if (element.configData.height != undefined) {
                        element.height = element.configData.height;
                    }
                }
            } else if (CoreLib.Model.DeviceConfig.isLandscape) {
                if (element.configData.lWidth != undefined) {
                    element.width = element.configData.lWidth;
                } else {
                    if (element.configData.width != undefined) {
                        element.width = element.configData.width;
                    }
                }
                if (element.configData.lHeight != undefined) {
                    element.height = element.configData.lHeight;
                } else {
                    if (element.configData.height != undefined) {
                        element.height = element.configData.height;
                    }
                }
            }
        }

    }
    setRelativeWidthAndHeight (element, wid, ht, isForced = false) {
        element.scale.set(1);
        if (wid != undefined && ht != undefined) {
            let elementwid = element.getWidth != undefined ? element.getWidth() : element.width;
            let sc = (this.getGameWidth() * CoreLib.Util.getDefaultValue(wid, 1)) / elementwid;
            let elementht = element.getHeight != undefined ? element.getHeight() : element.height;
            let hsc = (this.getGameHeight() * CoreLib.Util.getDefaultValue(ht, 1)) / elementht;
            element.scale.set(Math.min(sc, hsc));
        } else if (wid != undefined) {
            this.setRelativeWidth(element, wid, isForced);
        } else if (ht != undefined) {
            this.setRelativeHeight(element, ht, isForced);
        }


    }
    setRelativeWidth (element, wid, isForced = false) {
        element.scale.set(1);
        let elementwid = element.getWidth != undefined ? element.getWidth() : element.width;
        let sc = (this.getGameWidth() * wid) / elementwid;
        if (sc > 1) {
            if (isForced) {
                element.scale.set(sc);
            }
        } else {
            element.scale.set(sc);

        }
    }
    setRelativeHeight (element, ht, isForced = false) {
        element.scale.set(1);
        let elementwid = element.getHeight != undefined ? element.getHeight() : element.height;
        let sc = (this.getGameHeight() * ht) / elementwid;
        if (sc > 1) {
            if (isForced) {
                element.scale.set(sc);
            }
        } else {
            element.scale.set(sc);
        }
    }
    fitToScreen (element) {
        element.scale.set(1);
        let wsc = (this.getGameWidth() / element.width);
        let hsc = (this.getGameHeight() / element.height);
        element.scale.set(Math.max(wsc, hsc));
    }
    alignToScreen(element, alignment = "left", padding = 0) {
        if (isNaN(padding)) {
            padding = 0;
        }
        let wid = element.getWidth != undefined ? element.getWidth() : element.width;
        let ht = element.getHeight != undefined ? element.getHeight() : element.height;
        if (alignment == "left") {
            this.setPositionX(element, padding);
        } else if (alignment == "center") {
            this.setPositionX(element, (this.getGameWidth() - wid) / 2 + padding);
        } else if (alignment == "right") {
            this.setPositionX(element, (this.getGameWidth() - wid) + padding);
        } else if (alignment == "top") {
            this.setPositionY(element, padding);
        } else if (alignment == "middle") {
            this.setPositionY(element, (this.getGameHeight() - ht) / 2 + padding);
        } else if (alignment == "bottom") {
            this.setPositionY(element, this.getGameHeight() - ht + padding);
        }
    }

    adjustAllChildren (element) {
        let len = element.elementsArray.length;
        if (len > 0) {
            for (let k = 0; k < len; k++) {
                if (element.elementsArray[k].name != "guideRect") {
                    this.setPositionBasedOnDevice(element.elementsArray[k]);
                }

            }
        }
    }

    setPositionBasedOnDevice (element) {
        if (CoreLib.Model.DeviceConfig.isDesktop) {
            element.x = element.configData.x;
            element.y = element.configData.y;

        } else {
            if (CoreLib.Model.DeviceConfig.isPortrait) {
                if (element.configData.pScale != undefined) {
                    element.scale.set(element.configData.pScale);
                }
                if (element.configData.mx != undefined) {
                    element.x = element.configData.mx;
                    element.y = element.configData.my;
                }
                if (element.configData.px != undefined) {
                    element.x = element.configData.px;
                    element.y = element.configData.py;
                } else {
                    if (element.configData.x != undefined && element.configData.y != undefined) {
                        element.x = element.configData.x;
                        element.y = element.configData.y;
                    }
                }
            } else {
                if (element.configData.lScale != undefined) {
                    element.scale.set(element.configData.lScale);
                }
                if (element.configData.mx != undefined) {
                    element.x = element.configData.mx;
                    element.y = element.configData.my;
                }
                if (element.configData.lx != undefined) {
                    element.x = element.configData.lx;
                    element.y = element.configData.ly;
                } else {
                    if (element.configData.x != undefined && element.configData.y != undefined) {
                        element.x = element.configData.x;
                        element.y = element.configData.y;
                    }

                }
            }
        }

    }
    alignToObject(element, alignment = "left", refObj, xPadding = 0, yPadding = 0) {
        let wid = element.getWidth != undefined ? element.getWidth() : element.width;
        let ht = element.getHeight != undefined ? element.getHeight() : element.height;
        let refWidth = refObj.getWidth != undefined ? refObj.getWidth() : refObj.width;
        let refHeight = refObj.getHeight != undefined ? refObj.getHeight() : refObj.height;
        if (alignment == "left") {
            this.setPositionX(element, refObj.x + xPadding);
        } else if (alignment == "center") {
            this.setPositionX(element, refObj.x + (refWidth - wid) / 2 + xPadding);
        } else if (alignment == "right") {
            this.setPositionX(element, refObj.x + (refWidth - wid) + xPadding);
        } else if (alignment == "top") {
            this.setPositionY(element, refObj.y + yPadding);
        } else if (alignment == "middle") {
            this.setPositionY(element, refObj.y + (refHeight - ht) / 2 + yPadding);
        } else if (alignment == "bottom") {
            this.setPositionY(element, refObj.y + refHeight - ht + yPadding);
        }
    }

    getDeviceSpecificUIObj (data) {
        var obj = null;
        if (data) {
            if (CoreLib.Model.DeviceConfig.isDesktop) {
                obj = data.Desktop;
            } else {
                if (CoreLib.Model.DeviceConfig.isLandscape) {
                    obj = CoreLib.Model.DeviceConfig.isTablet && data.TLandscape ? data.TLandscape : (data.Landscape ? data.Landscape : (data.Portrait ? data.Portrait : data.Desktop));
                } else {
                    obj = CoreLib.Model.DeviceConfig.isTablet && data.TPortrait ? data.TPortrait : (data.Portrait ? data.Portrait : (data.Landscape ? data.Landscape : data.Desktop));
                }
            }

        }
        return obj;
    }



    getDecimalValue (num) {
        var diff = num - Math.floor(num);
        return diff;
    }

    getResFactor () {
        var factor = 1;
        // if (CoreLib.Model.DeviceConfig.isDesktop) {
        //     if (!CoreLib.Model.GameConfig.isFHDSupported) {
        //         factor = 0.667;
        //     }
        // }
        return factor;
    }

    setPosition (obj, x, y, toAdjustForRes = false) {
        this.setPositionX(obj, x, toAdjustForRes);
        this.setPositionY(obj, y, toAdjustForRes);
    }

    setPositionX (obj, x, toAdjustForRes = false) {
        if (x != undefined) {
            if (toAdjustForRes) {
                obj.position.x = Math.round(this.getResFactor() * x);
            } else {
                obj.position.x = Math.round(x);
            }

        }
        // let diff = this.getDecimalValue(obj.getBounds().x);
        // if (diff > 0) {
        //     obj.position.x = (obj.position.x - diff);
        // }

    }
    setPositionY (obj, y, toAdjustForRes = false) {
        if (y != undefined) {
            if (toAdjustForRes) {
                obj.position.y = Math.round(this.getResFactor() * y);
            } else {
                obj.position.y = Math.round(y);
            }
        }
        // let diff = this.getDecimalValue(obj.getBounds().y);
        // if (diff > 0) {
        //     obj.position.y = (obj.position.y - diff);
        // }
    }

    destroyView (view, cleanUp) {
        if (cleanUp === undefined) {
            let cleanUp = false;
        }
        if (view && view.objectType) {
            if (view.objectType.indexOf("Text") >= 0) {
                cleanUp = true;
            }
        }
        if (view) {
            view.destroy(cleanUp);
            view = undefined;
            return null;
        }
    }

    addInteraction (btn, callback, params) {
        btn.on('touchend', callback, params);
        btn.on('mouseup', callback, params);
    }
    addHoverInteraction (btn, callback, params) {
        btn.on('touchstart', callback, params);
        btn.on('mouseover', callback, params);
    }
    addUpInteraction (btn, callback, params) {
        btn.on('touchend', callback, params);
        btn.on('mouseup', callback, params);
    }
    addDownInteraction (btn, callback, params) {
        btn.on('touchstart', callback, params);
        btn.on('mousedown', callback, params);
    }
    addOutInteraction (btn, callback, params) {
        btn.on('touchout', callback, params);
        btn.on('mouseout', callback, params);
    }
    addMouseUpOutsideInteraction (btn, callback, params) {
        btn.on('touchendoutside', callback, params);
        btn.on('mouseupoutside', callback, params);
    }
    addMoveInteraction (btn, callback, params) {
        btn.on('touchmove', callback, params);
        btn.on('mousemove', callback, params);
    }
    setClickable (btn, flag) {
        btn.interactive = flag;
        btn.buttonMode = flag;

    }
    setModalState (element) {
        element.buttonMode = false;
        element.interactive = true;
    }

    setRandomPositionOnScreen (element, maxYPerc = 0.75) {
        this.setPositionX(element, Math.random() * this.getGameWidth() * 0.75);
        this.setPositionY(element, Math.random() * this.getGameHeight() * maxYPerc);
    }

    fadeInElement (element, callback, delay  = 0, duration = 0.6, alpha = 1) {
        element.visible = true;
        element.alpha = 0;
        CoreLib.AnimationManager.animateTween(element, duration, {delay : delay, alpha : alpha, ease : Power2.easeOut, onComplete : callback});
    }
    fadeOutElement(element, callback, duration = 0.4) {
        CoreLib.AnimationManager.animateTween(element, duration, {alpha : 0, ease : Power2.easeIn, onComplete : this.onFadeOutDone.bind(this, element, callback)})
    }
    onFadeOutDone (element, callback) {
        element.visible = false;
        element.alpha = 1;
        if (callback) {
            callback();
        }

    }

    scaleObjectWithRef(element, ref, widthPerc, heightPerc = null, isWidthForced = false) {
        element.scale.set(1);
        if (!ref) {
            ref = {width : this.getGameWidth(), height : this.getGameHeight()};
        }
        let sc = 1;
        if (widthPerc != undefined) {
            sc = (ref.width * widthPerc) / element.width;
            if (isWidthForced) {

            } else {
                sc = Math.min(sc, 1)
            }
        }
        element.scale.set(sc);
        if (heightPerc != null) {
            if (element.height > ref.height * heightPerc) {
                element.scale.set(1);
                sc = (ref.height * heightPerc) / element.height;
                sc = Math.min(sc, 1);
                element.scale.set(sc);
            }
        }


    }
    setGameUtil (util) {
        this.gameUtil = util;
    }




}

export const UIUtil = new UIUtilService();
