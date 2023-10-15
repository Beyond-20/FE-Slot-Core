export const MOBILE_BET_CONFIG = {
    name: "mobileBetComp", type: "Comp", class: "MobileBetComp",
    Elements: [
        { name: "bg", type: "Graphics", width: 1920, height: 1080, color: 0x000000, alpha: 0.8 },
        { name: "titlebg", type: "Graphics", width: 1920, height: 70, color: 0x000000, alpha: 0.8, y: 30 },
        { name: "titleText", type: "Text", content: "bettingMenuText", style: "commonFontStyle", anchor: { x: 0.5, y: 0.5 }, fontSize: 24, mFontSize: 60 },
        { name: "bottombg", type: "Graphics", width: 1920, height: 70, color: 0x000000, alpha: 0.8 },
        {
            name: "totalBetComp", type: "Comp", class: "BalanceComp",
            Elements: [
                { name: "clickBG", type: "Graphics", width: 200, height: 120, color: 0xff0000, x: -100, alpha: 0 },
                { name: "titleText", type: "Text", content: "totalBetsCaps", style: "commonFontStyle", mFontSize: 40, fontSize: 22, anchor: { x: 0.5, y: 0 } },
                { name: "valueText", type: "Text", contentText: "", style: "commonFontStyle", mFontSize: 40, fontSize: 22, anchor: { x: 0.5, y: 0 }, y: 30, my: 50 }
            ]
        },
        {
            name: "balanceComp", type: "Comp", class: "BalanceComp",
            Elements: [
                { name: "clickBG", type: "Graphics", width: 250, height: 120, color: 0xff0000, x: -130, alpha: 0 },
                { name: "titleText", type: "Text", content: "balanceCaps", style: "commonFontStyle", mFontSize: 40, fontSize: 22, anchor: { x: 0.5, y: 0 } },
                { name: "valueText", type: "Text", contentText: "", style: "commonFontStyle", mFontSize: 40, fontSize: 22, anchor: { x: 0.5, y: 0 }, y: 50 }
            ]
        },
        { name: "totalBetText", type: "Text", content: "totalBetsCaps", style: "commonFontStyle", anchor: { x: 0.5, y: 0 }, fontSize: 18, mFontSize: 50 },
        { name: "betValueText", type: "Text", content: "", style: "commonFontStyle", anchor: { x: 0.5, y: 0 }, fontSize: 24, mFontSize: 60 },
        { name: "upBtn", type: "Button", images: ["betIncreament_up", "betIncreament_over", "betIncreament_down"] },
        { name: "downBtn", type: "Button", images: ["betDecreament_up", "betDecreament_over", "betDecreament_down"] },
        { name: "cancelBtn", type: "Button", images: ["popupBtn_up", "popupBtn_over", "popupBtn_down"], icon: ["popup_closeBtn_icon", "popup_closeBtn_icon", "popup_closeBtn_icon"] },
        { name: "okBtn", type: "Button", images: ["popupBtn_up", "popupBtn_over", "popupBtn_down"], icon: ["popup_okBtn_icon", "popup_okBtn_icon", "popup_okBtn_icon"] }

    ],
    layoutData: {
        "Desktop": { hAlign: "left", vAlign: "top", widthPerc: 1 },
        "Portrait": { hAlign: "left", vAlign: "top" },
        "Landscape": { hAlign: "left", vAlign: "top" },
    }

}
