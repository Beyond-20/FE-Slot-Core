export const PRIZE_POPUP_CONFIG = {
    name : "prizePopupComp", type : "Comp", class : "PrizePopupView",
      Elements : [
        {name : "guideRect", type : "Graphics", width : 120, height : 180, color : 0x000000, alpha : 0.7},
        {name : "prizePopupComp", type: "Comp", class: "PrizePopupComp",
            Elements: [
              {name : "popupbg", type : "Sprite", image : "tourneyPopupbg", anchor : {x:0, y : 0}},
              {name : "giftBox", type : "AnimatedSprite", animation : {prefix : "GiftBox_", postfix : "", start : 0, end : 27, toAddZero : true}, y : -40, my : 20, scale : 0.80, loop : false},
              {name : "closeBtn", type : "Button", images : ["popupClose", "popupClose", "popupClose"], x : 490, y : 10},
              {name : "continueBtn", type : "Button", images : ["popupBtn", "popupBtn", "popupBtn"],
                textConfig : {name : "tText", type : "Text", style : "commonFontStyle2", fontSize : 24, content : "continuePlayText", color : 0x8f4933}
              },
              {name : "congratText", type : "Text", content : "congratText", toUpperCase: true, style : "commonFontStyle2", fontSize : 40, mFontSize : 40, color : 0xffe7b3, anchor : {x : 0.5, y : 0}, y : 220},
              {name : "youhavewonText", type : "Text", content : "youhavewonPrizeDrop", style : "commonFontStyle", fontSize : 20, mFontSize : 20, color : 0xd4d2dc, anchor : {x : 0.5, y : 0}, y : 295},
              {name : "prizeValueText", type : "Text", contentText : "$ 5000.00",  style : "commonFontStyle2", fontSize : 60, mFontSize : 60, color : 0xffe9af, anchor : {x : 0.5, y : 0}, y : 330},
            ],
        },
      ],


}
