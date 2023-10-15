$("#close_btn").click(() => {
    window.gameRulesCloseBtnClicked();
})
var isMobileDevice = window.mobileCheck();

if (isMobileDevice) {
    $("#gamerules_container").css("width", "100%");
}
else {
    let reelSize = window.getReelSize()
    setRulesDimensions(reelSize);
    $("#gamerules_container").addClass("mt-10");
}
var loadingRules = document.getElementById('loading-rules');
var mainRulesContainer = document.getElementById("lower_container");
var imageGif = document.getElementById('gif');

mainRulesContainer && (mainRulesContainer.style.display = "none");
$('#lower').addClass("lower-pre");

if (imageGif) {
    let browserInfo = getBrowserInfo();

    if (browserInfo == 'firefox') {
        $(function () {
            mainRulesContainer.style.display = "block";
            loadingRules.style.display = "none";
            $('#lower').removeClass("lower-pre")
        });
    } else {
        imageGif.onload = function () {
            mainRulesContainer.style.display = "block";
            loadingRules.style.display = "none";
            $('#lower').removeClass("lower-pre");
        }
    }

}

function getBrowserInfo() {
    let userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.search('firefox') > -1 || userAgent.search('fxios') > -1 || userAgent.search('focus') > -1) {
        return "firefox";
    }
}

var onResize = () => {
    let isMobile = window.mobileCheck();
    if (isMobile) {
        $("#gamerules_container").css("width", "100%");
    }
    else {
        let reelSize = window.getReelSize()
        setRulesDimensions(reelSize);
        $("#gamerules_container").addClass("mt-10");
    }
}
window.addEventListener("resize", onResize);

var gamePropsObj = window.getGameProps();
var { rtp, maxBet } = gamePropsObj;
var minimumBet = gamePropsObj.minBet
var renderCommonHtml = () => {
    let path = window.getCommonRulePath();
    let lang = window.getGameLang();
    fetch(path + lang + "/commonRule.json")
        .then((d) => d.json())
        .then(async (res) => {
            const jsonData = await res;
            let { commonRules, headings, gameButtonsRule } = jsonData;

            let common = document.getElementsByClassName("common-rules");
            for (let i = 0; i < common.length; i++) {
                let dataAttr = common[i].getAttribute("data-common");
                if (headings[dataAttr]) {
                    common[i].innerHTML = headings[dataAttr];
                }
                if (commonRules[dataAttr]) {
                    common[i].innerHTML = commonRules[dataAttr];
                }
                if (gameButtonsRule[dataAttr]) {
                    common[i].innerHTML = gameButtonsRule[dataAttr];
                }
            }
        })
}

renderCommonHtml();

var renderGameHtml = () => {
    // let getLanguagePromise = new Promise((resolve, reject) => {
    //     resolve(window.getLanguage());
    //   });
    let path = window.getGameRulePath();
    let lang = window.getGameLang();
    fetch(path + 'lang/' + lang + '/rules.json')
        .then((d) => d.json())
        .then(async (res) => {

            const jsonData = await res;
            let { gamerules, headings, tableData } = jsonData;

            let game = document.getElementsByClassName("game-rules");

            for (let i = 0; i < game.length; i++) {
                let dataAttr = game[i].getAttribute("data-game");

                if (gamerules && gamerules[dataAttr]) {
                    game[i].innerHTML = gamerules[dataAttr];
                }
                if (headings && headings[dataAttr]) {
                    game[i].innerHTML = headings[dataAttr];
                }
                if (tableData && tableData[dataAttr]) {
                    game[i].innerHTML = tableData[dataAttr];
                }
            }

            if (minimumBet && maxBet) {
                document.getElementById('rtp').textContent = rtp;
                document.getElementById('min').textContent = minimumBet;
                document.getElementById('max').textContent = maxBet;
            }


            if (tableData) {
                var bctGameProps = window.getBCTGameProps();

                var { betLevels, minBet, pairMaxBet, playerBankerMaxBet, superSixMaxBet, tieMaxBet } = bctGameProps;

                if(document.getElementById('baccaratBets')){
                    document.getElementById('baccaratBets').textContent = betLevels;
                    document.getElementById('pairMaxBet').textContent = pairMaxBet;
                    document.getElementById('super6MaxBet').textContent = superSixMaxBet;
                    document.getElementById('tieMaxBet').textContent = tieMaxBet;
                    document.getElementById('playerbankerMaxBet').textContent = playerBankerMaxBet;

                    document.getElementById('playerbankerMinBet').textContent = minBet;
                    document.getElementById('super6MinBet').textContent = minBet;
                    document.getElementById('pairMinBet').textContent = minBet;
                    document.getElementById('tieMinBet').textContent = minBet;
                }
            }


        })


}

renderGameHtml();


function setRulesDimensions(reelSize) {
    let { width, height } = reelSize;
    $("#gamerules_container").attr(
        "style",
        "width:" + width + "px"
    )

}
