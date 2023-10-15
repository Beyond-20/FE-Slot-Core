export const ALERT_POPUP_CONFIG = {
    name : "alertPopup", type : "Comp", class : "AlertComp",
      Elements : [
          {name : "popupbg", type : "Graphics", width : 1000, height : 600, color : 0x000000, alpha : 0.9},
          {name : "titlebg", type : "Graphics", width : 1000, height : 70, color : 0x000000, alpha : 0.7, y : 30},
          {name : "titleText", type : "Text", contentText : "", style : "commonFontStyle", fontSize : 40, mFontSize : 60, anchor : {x: 0.5, y : 0.5}},
          {name : "messageText", type : "Text", contentText : "", style : "commonFontStyle", fontSize : 30, mFontSize : 50, anchor : {x: 0.5, y : 0.5}, align : "center"},
          {name : "cancelBtn", type : "Button", images : ["popupBtn_up", "popupBtn_over", "popupBtn_down"], icon : ["popup_closeBtn_icon", "popup_closeBtn_icon", "popup_closeBtn_icon"]},
          {name : "okBtn", type : "Button", images : ["popupBtn_up", "popupBtn_over", "popupBtn_down"], icon : ["popup_okBtn_icon", "popup_okBtn_icon", "popup_okBtn_icon"]}
      ],
      layoutData : {
          "Desktop" : {hAlign : "center", vAlign : "middle", widthPerc : 1, heightPerc : 1},
          "Portrait" : {hAlign : "center", vAlign : "middle", widthPerc : 1, heightPerc : 1},
          "Landscape" : {hAlign : "center", vAlign : "middle", widthPerc : 1, heightPerc : 1},
      }

}
