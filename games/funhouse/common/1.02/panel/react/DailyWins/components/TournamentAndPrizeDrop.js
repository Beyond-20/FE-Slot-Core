import { isLandscape, parseNumber } from "../../TournamentModal/components/common/CommonFunction.js";
import Timer from "./shared/Timer.js";
var _React = React,
    useEffect = _React.useEffect,
    useState = _React.useState;

function TournamentAndPrizeDrop(_ref) {
  var _ref$size = _ref.size,
      windowHeight = _ref$size.windowHeight,
      windowwidth = _ref$size.windowwidth,
      title = _ref.title,
      brief = _ref.brief,
      dataList = _ref.dataList,
      changeState = _ref.changeState,
      tournamentInfo = _ref.tournamentInfo,
      closedModal = _ref.closedModal;

  var containerStyle = {
    // height: windowHeight * 0.55,
    //  width: "100%"
  };

  return React.createElement(
    "div",
    {
      className: "dw-tournament-container",
      style: containerStyle,
      onClick: function onClick() {
        return changeState({
          isClicked: true,
          selectedRoute: title
        });
      }
    },
    React.createElement(
      "div",
      { className: "dw-touranament-brief-conatiner" },
      React.createElement(
        "div",
        { className: "dw-tournament-header" },
        title
      ),
      !isLandscape() && windowwidth > 768 && React.createElement(
        "div",
        null,
        " ",
        React.createElement(
          "div",
          { id: "brief" },
          brief
        ),
        React.createElement(
          "ul",
          { id: "brief" },
          dataList.map(function (item, index) {
            return React.createElement(
              "li",
              { className: "dw-brief", key: index },
              item
            );
          })
        )
      )
    ),
    (windowwidth < 768 || isLandscape()) && React.createElement(
      "div",
      null,
      React.createElement(
        "ul",
        { className: "dw-prize-pool-mobile" },
        React.createElement(
          "li",
          { className: "dw-lis" },
          "Minimum Bet to participate:",
          " MYR",
          tournamentInfo && tournamentInfo.tournament_info && tournamentInfo.tournament_info.min_bet && parseNumber(tournamentInfo.tournament_info.min_bet)
        ),
        React.createElement(
          "li",
          { className: "dw-lis" },
          "Tournament Prize Pool: MYR",
          " ",
          title === "Tournament" ? tournamentInfo && tournamentInfo.tournament_info && tournamentInfo.tournament_info.prize_pool && parseNumber(tournamentInfo.tournament_info.prize_pool) : tournamentInfo && tournamentInfo.tournament_info && tournamentInfo.tournament_info.prize_drop && tournamentInfo.tournament_info.prize_drop.prize_pool && parseNumber(tournamentInfo.tournament_info.prize_drop.prize_pool)
        ),
        React.createElement(
          "li",
          { className: "dw-lis" },
          "Top Prize: MYR",
          " ",
          title === "Tournament" ? tournamentInfo && tournamentInfo.tournament_info && tournamentInfo.tournament_info.top_prize && parseNumber(tournamentInfo.tournament_info.top_prize) : tournamentInfo && tournamentInfo.tournament_info && tournamentInfo.tournament_info.prize_drop && tournamentInfo.tournament_info.prize_drop.top_prize && parseNumber(tournamentInfo.tournament_info.prize_drop.top_prize),
          " "
        )
      ),
      React.createElement(Timer, {
        tournament_info: title === "Tournament" ? tournamentInfo && tournamentInfo.tournament_info : tournamentInfo && tournamentInfo.prize_drop,
        closedModal: closedModal
      })
    ),
    windowwidth > 768 && !isLandscape() && React.createElement(
      "div",
      { className: "dw-prize-pool-container" },
      React.createElement(
        "div",
        { className: "dw-tournament-prize-pool" },
        React.createElement(
          "div",
          { className: "dw-prize" },
          "Minimum Bet to participate:",
          " MYR",
          tournamentInfo && tournamentInfo.tournament_info && tournamentInfo.tournament_info.min_bet && parseNumber(tournamentInfo.tournament_info.min_bet)
        ),
        React.createElement(
          "div",
          { className: "dw-prize" },
          " ",
          "Tournament Prize Pool: MYR",
          " ",
          title === "Tournament" ? tournamentInfo && tournamentInfo.tournament_info && tournamentInfo.tournament_info.prize_pool && parseNumber(tournamentInfo.tournament_info.prize_pool) : tournamentInfo && tournamentInfo.tournament_info && tournamentInfo.tournament_info.prize_drop && tournamentInfo.tournament_info.prize_drop.prize_pool && parseNumber(tournamentInfo.tournament_info.prize_drop.prize_pool)
        ),
        React.createElement(
          "div",
          { className: "dw-prize" },
          "Top Prize: MYR",
          " ",
          title === "Tournament" ? tournamentInfo && tournamentInfo.tournament_info && tournamentInfo.tournament_info.top_prize && parseNumber(tournamentInfo.tournament_info.top_prize) : tournamentInfo && tournamentInfo.tournament_info && tournamentInfo.tournament_info.prize_drop && tournamentInfo.tournament_info.prize_drop.top_prize && parseNumber(tournamentInfo.tournament_info.prize_drop.top_prize),
          " "
        )
      ),
      React.createElement(Timer, {
        tournament_info: title === "Tournament" ? tournamentInfo && tournamentInfo.tournament_info : tournamentInfo && tournamentInfo.tournament_info && tournamentInfo.tournament_info.prize_drop,
        closedModal: closedModal
      })
    )
  );
}

export default TournamentAndPrizeDrop;