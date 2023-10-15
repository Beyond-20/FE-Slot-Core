var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { styles } from "../style.js";
import { isLandscape, isPortrait, parseNumber } from "./common/CommonFunction.js";
import fonts from "../../constants/constants.js";

var imagePath = "../common/1.02/images";

var PrizesTournament = function (_React$Component) {
  _inherits(PrizesTournament, _React$Component);

  function PrizesTournament(props) {
    _classCallCheck(this, PrizesTournament);

    return _possibleConstructorReturn(this, (PrizesTournament.__proto__ || Object.getPrototypeOf(PrizesTournament)).call(this, props));
  }

  _createClass(PrizesTournament, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          _props$size = _props.size,
          windowWidth = _props$size.windowWidth,
          windowHeight = _props$size.windowHeight,
          tournamentPrizes = _props.tournamentPrizes,
          playerInfo = _props.playerInfo;

      var tableHeaderStyle = {
        fontSize: windowWidth < 920 ? fonts.mTableHeading : fonts.dSubHeading,
        fontFamily: "Lato, sans-serif",
        fontWeight: "400",
        color: "#fdecdd",
        marginLeft: 35
      };

      return React.createElement(
        "div",
        {
          style: windowWidth < 920 ? Object.assign({}, styles.bodyContainerMobile, {
            padding: 0,
            height: windowHeight - 120,
            backgroundColor: "#00000000",
            marginTop: isLandscape() ? 55 : 75
          }) : styles.bodyContainer
        },
        React.createElement(
          "div",
          {
            style: windowWidth < 920 ? styles.prizeTableHeadlineContainerMobile : styles.prizeTableHeadlineContainer
          },
          React.createElement(
            "div",
            {
              style: windowWidth < 920 ? styles.prizeHeadlineItemContainerMobile : styles.prizeHeadlineItemContainer
            },
            React.createElement(
              "p",
              { style: tableHeaderStyle },
              "My Score:",
              " ",
              React.createElement(
                "mark",
                {
                  style: windowWidth < 920 ? styles.headlineMobile : styles.headline
                },
                playerInfo.score ? playerInfo.score : ""
              )
            )
          ),
          React.createElement(
            "div",
            {
              style: windowWidth < 920 ? styles.prizeHeadlineItemContainerMobile : styles.prizeHeadlineItemContainer
            },
            React.createElement(
              "p",
              { style: tableHeaderStyle },
              "My Rank:",
              " ",
              React.createElement(
                "mark",
                {
                  style: windowWidth < 920 ? styles.headlineMobile : styles.headline
                },
                playerInfo.rank ? playerInfo.rank : ""
              )
            )
          )
        ),
        React.createElement(
          "div",
          { style: styles.prizeTournamentTable },
          React.createElement(
            "table",
            { style: { width: "100%" } },
            React.createElement(
              "thead",
              null,
              React.createElement(
                "tr",
                {
                  style: windowWidth < 920 ? styles.tableHeadTournamentMobile : styles.tableHeadTournament
                },
                React.createElement(
                  "th",
                  { style: { padding: 5 } },
                  "Leaderboard Position"
                ),
                React.createElement(
                  "th",
                  { style: { padding: 5 } },
                  "Cashprize (MYR)"
                )
              )
            ),
            tournamentPrizes ? React.createElement(
              "tbody",
              null,
              tournamentPrizes.map(function (item, index) {
                return React.createElement(
                  "tr",
                  { key: index, style: { textAlign: "center" } },
                  " ",
                  React.createElement(
                    "td",
                    {
                      className: windowWidth < 920 ? "prizeTournamentMobile" : "prizeTournament"
                    },
                    item.from_position === item.to_position ? item.from_position : item.from_position + " to " + item.to_position
                  ),
                  React.createElement(
                    "td",
                    {
                      className: windowWidth < 920 ? "prizeTournamentMobile" : "prizeTournament"
                    },
                    parseNumber(item.cash)
                  )
                );
              })
            ) : React.createElement(
              "tbody",
              null,
              React.createElement(
                "tr",
                null,
                React.createElement(
                  "td",
                  {
                    className: windowWidth < 920 ? "prizeTournamentMobile" : "prizeTournament"
                  },
                  "_"
                ),
                React.createElement(
                  "td",
                  {
                    className: windowWidth < 920 ? "prizeTournamentMobile" : "prizeTournament"
                  },
                  "_"
                )
              )
            )
          )
        )
      );
    }
  }]);

  return PrizesTournament;
}(React.Component);

export default PrizesTournament;