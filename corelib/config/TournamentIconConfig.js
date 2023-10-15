export const TOURNAMENT_ICON_CONFIG = {
    name : "tournamentIcon", type : "Comp", class : "TournamentIcon",
      Elements : [
        {name : "guideRect", type : "Graphics", width : 120, height : 180, color : 0xff000, alpha : 0},
        {name : "iconBG", type : "Sprite", image : "ticonbg", anchor : {x:0.5, y : 0.5}},
        {name : "giftBox1", type : "AnimatedSprite", animation : {prefix : "GiftBox_Anim01_", postfix : "", start : 0, end : 39, toAddZero : true}, y : 46, my : 15,},
        {name : "giftBox2", type : "AnimatedSprite", animation : {prefix : "GiftBox_Anim02_", postfix : "", start : 0, end : 39, toAddZero : true}, y : 46, my : 15,},
        {name : "giftBox3", type : "AnimatedSprite", animation : {prefix : "GiftBox_Anim03_", postfix : "", start : 0, end : 39, toAddZero : true}, y : 46, my : 15,},
        {name : "prizeText", type : "Text", contentText : "", style : "commonFontStyle2", fontSize : 18, mFontSize : 40, color : 0xFFE9AF, anchor : {x : 0.5, y : 0.5}, y : 100, my : 120},
        {name : "leftText", type : "Text", content : "prizesLeft", style : "commonFontStyle", fontSize : 11, mFontSize : 24, color : 0x48BEFF, anchor : {x : 0.5, y : 0.5}, y : 120, my : 160},
        {name : "daysText", type : "Text", content : "daysText", style : "commonFontStyle", fontSize : 11, mFontSize : 24, color : 0x48BEFF, anchor : {x : 0.5, y : 0.5}, y : 136, my : 188},
        {name : "backLight", type : "Sprite", image : "back_light", anchor : {x:0.5, y : 0.5}, scale : 0.50, x : 54, y : 70, blendMode : "ADD"},
        {name : "coin", type : "Sprite", image : "Medal", anchor : {x : 0.5, y : 0.5}, y : 60, scale : 0.7},
        {name : "arrow", type : "Sprite", image : "RankUp_arrow", anchor : {x : 0.5, y : 0.5}, y : 60, scale : 0.7},
        {name : "rankUpText", type : "Text", content : "rankupText", style : "commonFontStyle", fontSize : 15, color : 0x48BEFF, anchor : {x : 0.5, y : 0.5}, y : 120},
        {name : "rankValueText", type : "Text", contentText : "", style : "commonFontStyle", fontSize : 26, color : 0xe49604, anchor : {x : 0.5, y : 0.5}, y : 56}
      ],
      layoutData : {
        "Desktop" : {heightPerc: 0.2, widthPerc : 0.1, x : 40, y : 40,},
        "Portrait" : {heightPerc : 0.067, isForced : true},
        "Landscape" : {heightPerc : 0.14, isForced : true}
      }

}
