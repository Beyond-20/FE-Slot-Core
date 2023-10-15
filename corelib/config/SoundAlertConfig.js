export const SOUND_ALERT_CONFIG = {
    name : "alertPopup", type : "Comp", class : "SoundAlertComp",
      Elements : [
          {name : "popupbg", type : "Graphics", width : 1000, height : 600, color : 0x000000, alpha : 0.98},
          {name : "messageText", type : "Text", content : "useSound", style : "commonFontStyle", fontSize : 30, mFontSize : 60, anchor : {x: 0.5, y : 0.5}, align : "center"},
          {name : "cancelBtn", type : "Button", images : ["popupBtn_up", "popupBtn_over", "popupBtn_down"], icon : ["popup_closeBtn_icon", "popup_closeBtn_icon", "popup_closeBtn_icon"]},
          {name : "okBtn", type : "Button", images : ["popupBtn_up", "popupBtn_over", "popupBtn_down"], icon : ["popup_okBtn_icon", "popup_okBtn_icon", "popup_okBtn_icon"]}
      ],
      layoutData : {
          "Desktop" : {hAlign : "center", vAlign : "middle", widthPerc : 1, heightPerc : 1},
          "Portrait" : {hAlign : "center", vAlign : "middle", widthPerc : 1, heightPerc : 1},
          "Landscape" : {hAlign : "center", vAlign : "middle", widthPerc : 1, heightPerc : 1},
      }

}
