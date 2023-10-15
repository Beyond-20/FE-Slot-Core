import Timer from "./shared/Timer.js";

function Tournament(props) {
  var _props$size = props.size,
      windowHeight = _props$size.windowHeight,
      windowwidth = _props$size.windowwidth;


  var containerStyle = {
    height: windowHeight * 0.5,
    width: windowwidth * 0.3
  };
  return React.createElement(
    "div",
    { className: "dw-tournament-container", style: containerStyle },
    React.createElement(
      "div",
      { className: "dw-tournament-header" },
      "Tournament"
    ),
    React.createElement(
      "div",
      { className: "dw-touranament-brief-conatiner" },
      React.createElement(
        "div",
        null,
        "A Weekly cashprize giveaway for the Top 60 players with the highest combined scores collected from both Funhouse Table Games and a selected Slot Game for the week."
      ),
      React.createElement(
        "ul",
        null,
        React.createElement(
          "li",
          null,
          "Grand prize of RM3,000 in the Weekly Funhouse Tournament."
        )
      )
    ),
    React.createElement(
      "div",
      { className: "dw-tournament-prize-pool" },
      React.createElement(
        "div",
        { className: "dw-prize" },
        "Minimum Bet to participate: MYR1.80 ~ MYR2.50"
      ),
      React.createElement(
        "div",
        { className: "dw-prize" },
        " Tournament Prize Pool: MYR 14,900.00 "
      ),
      React.createElement(
        "div",
        { className: "dw-prize" },
        "Top Prize: MYR 3,000.00"
      )
    ),
    React.createElement(Timer, null)
  );
}

export default Tournament;