export const AUTOPLAY_CONFIG = {
    name: "autoplayComp", type: "Comp", class: "AutoplayComp",
    btnConfig: {
        name: "btn1", type: "ToggleButton", images: ["autoNumberSelBtn_up", "autoNumberSelBtn_up", "autoNumberSelBtn_up", "autoNumberSelBtn_selected", "autoNumberSelBtn_selected", "autoNumberSelBtn_selected"],
        textConfig: { name: "btnText", type: "Text", contentText: "5", style: "commonFontStyle", fontSize: 25, mFontSize: 50, fontColor: 0xffffff }
    },
    Elements: [
        { name: "bg", type: "Graphics", width: 1920, height: 1080, color: 0x000000, alpha: 0.8 },
        { name: "titlebg", type: "Graphics", width: 1920, height: 70, color: 0x000000, alpha: 0.8, y: 30 },
        { name: "titleText", type: "Text", content: "autoplayTitle", style: "commonFontStyle", anchor: { x: 0.5, y: 0.5 }, fontSize: 24, mFontSize: 60 },
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
                { name: "clickBG", type: "Graphics", width: 200, height: 120, color: 0xff0000, x: -100, alpha: 0 },
                { name: "titleText", type: "Text", content: "balanceCaps", style: "commonFontStyle", mFontSize: 40, fontSize: 22, anchor: { x: 0.5, y: 0 } },
                { name: "valueText", type: "Text", contentText: "", style: "commonFontStyle", mFontSize: 40, fontSize: 22, anchor: { x: 0.5, y: 0 }, y: 30, my: 50 }
            ]
        },
        { name: "numberOfSpinsText", type: "Text", content: "noOfSpins", style: "commonFontStyle", anchor: { x: 0.5, y: 0 }, fontSize: 18, mFontSize: 44 },
        { name: "stopSpinText", type: "Text", content: "stopAutoText", style: "commonFontStyle", anchor: { x: 0.5, y: 0 }, fontSize: 18, mFontSize: 44 },
        {
            name: "onBonusWin", type: "Comp", class: "ToggleOption", state: true,
            Elements: [
                { name: "onbg", type: "Sprite", image: "toggleOn" },
                { name: "offbg", type: "Sprite", image: "toggleOff" },
                { name: "titleText", type: "Text", content: "bonuswinText", style: "commonFontStyle", fontSize: 18, mFontSize: 44 }
            ]
        },
        {
            name: "onAnyWin", type: "Comp", class: "ToggleOption", state: false,
            Elements: [
                { name: "onbg", type: "Sprite", image: "toggleOn" },
                { name: "offbg", type: "Sprite", image: "toggleOff" },
                { name: "titleText", type: "Text", content: "anywinText", style: "commonFontStyle", fontSize: 18, mFontSize: 44 }
            ]
        },
        {
            name: "singleWinExceeds", type: "Comp", class: "ToggleOption", state: false,
            Elements: [
                { name: "onbg", type: "Sprite", image: "toggleOn" },
                { name: "offbg", type: "Sprite", image: "toggleOff" },
                { name: "titleText", type: "Text", content: "singWinExceedsText", style: "commonFontStyle", fontSize: 18, mFontSize: 44 }
            ]
        },
        { name: "singleWinSlider", type: "Comp", class: "AutoSliderComp", isAmountField: false, sliderWidth: 4, mSliderWidth: 12, sliderLength: 320, mSliderLength: 800, title: "noOfSpins", totalValue: 1000 },
        {
            name: "balanceIncreaseBy", type: "Comp", class: "ToggleOption", state: false,
            Elements: [
                { name: "onbg", type: "Sprite", image: "toggleOn" },
                { name: "offbg", type: "Sprite", image: "toggleOff" },
                { name: "titleText", type: "Text", content: "balanceIncreaseByText", style: "commonFontStyle", fontSize: 18, mFontSize: 44 }
            ]
        },
        { name: "balanceIncreaseSlider", type: "Comp", class: "AutoSliderComp", isAmountField: false, sliderWidth: 4, mSliderWidth: 12, sliderLength: 320, mSliderLength: 800, title: "noOfSpins", totalValue: 1000 },
        {
            name: "balanceDecreaseBy", type: "Comp", class: "ToggleOption", state: false,
            Elements: [
                { name: "onbg", type: "Sprite", image: "toggleOn" },
                { name: "offbg", type: "Sprite", image: "toggleOff" },
                { name: "titleText", type: "Text", content: "balanceDecreaseByText", style: "commonFontStyle", fontSize: 18, mFontSize: 44 }
            ]
        },
        { name: "balanceDecreaseSlider", type: "Comp", class: "AutoSliderComp", isAmountField: false, sliderWidth: 4, mSliderWidth: 12, sliderLength: 320, mSliderLength: 800, title: "noOfSpins", totalValue: 1000 },
        { name: "cancelBtn", type: "Button", images: ["popupBtn_up", "popupBtn_over", "popupBtn_down"], icon: ["popup_closeBtn_icon", "popup_closeBtn_icon", "popup_closeBtn_icon"] },
        { name: "okBtn", type: "Button", images: ["popupBtn_up", "popupBtn_over", "popupBtn_down"], icon: ["popup_okBtn_icon", "popup_okBtn_icon", "popup_okBtn_icon"] }

    ],
    layoutData: {
        "Desktop": { hAlign: "left", vAlign: "top", widthPerc: 1 },
        "Portrait": { hAlign: "left", vAlign: "top" },
        "Landscape": { hAlign: "left", vAlign: "top" },
    }

}
