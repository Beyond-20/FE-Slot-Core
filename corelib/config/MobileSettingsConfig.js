export const MOBILE_SETTINGS_CONFIG = {
    name :"mobileSettingsComp", type : "Comp", class : "MobileSetingsComp",
    Elements : [
        {name : "bg", type : "Graphics", width : 1920, height : 1080, color : 0x000000, alpha : 0.74},
        {name : "titlebg", type : "Graphics", width : 1920, height : 90, color : 0x000000, alpha : 1, y : 0},
        {name : "titlebg2", type : "Graphics", width : 1920, height : 90, color : 0x000000, alpha : 1, y : 0},
        {name : "titleText", type : "Text", content : "systemSettings", style : "commonFontStyle", anchor : {x:0.5, y : 0.5}, fontSize : 24, mFontSize : 40},
        {name : "titleText2", type : "Text", content : "generalSettings", style : "commonFontStyle", anchor : {x:0.5, y : 0.5}, fontSize : 24, mFontSize : 40},
        {name : "homeBtn", type : "Comp", class : "MobileLongBtnComp",
            Elements: [
                {name : "bg", type : "Graphics", width : 100, height : 100, color : 0xff0000},
                {name : "titleText", type : "Text", content : "homeText", style : "commonFontStyle", fontSize : 36, mFontSize : 36, anchor : {x : 0, y : 0}},
                {name : "icon", type : "Sprite", image : "homeIconBtn", x : 340},
            ]
        },
        {name : "historyBtn", type : "Comp", class : "MobileLongBtnComp",
            Elements: [
                {name : "bg", type : "Graphics", width : 100, height : 100, color : 0xffff00},
                {name : "titleText", type : "Text", content : "historyText", style : "commonFontStyle", fontSize : 36, mFontSize : 36, anchor : {x : 0, y : 0}},
                {name : "icon", type : "Sprite", image : "historyIconBtn", x : 340},
            ]
        },
        {name : "ambientSetting", type : "Comp", class : "SettingsElement",
            Elements : [
                {name : "toggleOption", type : "Comp", class : "AnimatedToggleOption", x : 390, y : 44, mx : 740, state : true,
                    Elements : [
                        {name : "onbg", type : "Sprite", image : "onbar"},
                        {name : "offbg", type : "Sprite", image : "offbar"},
                        {name : "offbtn", type : "Sprite", image : "offBtn"},
                        {name : "onbtn", type : "Sprite", image : "onBtn"},
                    ]
                },
                {name : "titleText", type : "Text", content : "ambientMusicText", style : "commonFontStyle", fontSize : 38, mFontSize : 70, anchor : {x : 0, y : 0}},
                {name : "descText", type : "Text", content : "ambientMusicDesc", style : "commonFontStyle", wordWrap : true, wordWrapWidth : 340, fontSize : 22, mFontSize : 40, anchor : {x : 0, y : 0}, y : 50, my : 100}
            ]
        },
        {name : "fxSetting", type : "Comp", class : "SettingsElement",
            Elements : [
                {name : "toggleOption", type : "Comp", class : "AnimatedToggleOption", x : 390, y : 44, mx : 740, state : true,
                    Elements : [
                        {name : "onbg", type : "Sprite", image : "onbar"},
                        {name : "offbg", type : "Sprite", image : "offbar"},
                        {name : "offbtn", type : "Sprite", image : "offBtn"},
                        {name : "onbtn", type : "Sprite", image : "onBtn"},
                    ]
                },
                {name : "titleText", type : "Text", content : "soundFXText", style : "commonFontStyle", fontSize : 38, mFontSize : 70, anchor : {x : 0, y : 0}},
                {name : "descText", type : "Text", content : "fxMusicDesc", style : "commonFontStyle", wordWrap : true, wordWrapWidth : 340, fontSize : 22, mFontSize : 40, anchor : {x : 0, y : 0}, y : 50, my : 100}
            ]
        },
        {name : "introSetting", type : "Comp", class : "SettingsElement",
            Elements : [
                {name : "toggleOption", type : "Comp", class : "AnimatedToggleOption", x : 390, y : 44, mx : 740, state : true,
                    Elements : [
                        {name : "onbg", type : "Sprite", image : "onbar"},
                        {name : "offbg", type : "Sprite", image : "offbar"},
                        {name : "offbtn", type : "Sprite", image : "offBtn"},
                        {name : "onbtn", type : "Sprite", image : "onBtn"},
                    ]
                },
                {name : "titleText", type : "Text", content : "introScreenText", style : "commonFontStyle", fontSize : 38, mFontSize : 70, anchor : {x : 0, y : 0}},
                {name : "descText", type : "Text", content : "introDesc", style : "commonFontStyle", wordWrap : true, wordWrapWidth : 340, fontSize : 22, mFontSize : 40, anchor : {x : 0, y : 0}, y : 50, my : 100}
            ]
        },
        {name : "cancelBtn", type : "Button", images : ["popupBtn_up", "popupBtn_over", "popupBtn_down"], icon : ["popup_closeBtn_icon", "popup_closeBtn_icon", "popup_closeBtn_icon"]},
        {name : "okBtn", type : "Button", images : ["popupBtn_up", "popupBtn_over", "popupBtn_down"], icon : ["popup_okBtn_icon", "popup_okBtn_icon", "popup_okBtn_icon"]}

    ],
    layoutData : {
        "Desktop" : {hAlign : "left", vAlign : "top", widthPerc : 1},
        "Portrait" : {hAlign : "left", vAlign : "top"},
        "Landscape" : {hAlign : "left", vAlign : "top"},
    }

}
