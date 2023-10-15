var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { styles } from "../style.js";
import { hideId, isLandscape, parseNumber } from "./common/CommonFunction.js";

var imagePath = "../common/1.02/images";

var WinnersScatter = function (_React$Component) {
  _inherits(WinnersScatter, _React$Component);

  function WinnersScatter(props) {
    _classCallCheck(this, WinnersScatter);

    return _possibleConstructorReturn(this, (WinnersScatter.__proto__ || Object.getPrototypeOf(WinnersScatter)).call(this, props));
  }

  _createClass(WinnersScatter, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          _props$size = _props.size,
          windowHeight = _props$size.windowHeight,
          windowWidth = _props$size.windowWidth,
          scatterData = _props.scatterData;

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
          { style: styles.prizeTournamentTable },
          React.createElement(
            "table",
            { style: { width: "100%" } },
            React.createElement(
              "thead",
              null,
              React.createElement(
                "tr",
                null,
                React.createElement(
                  "th",
                  {
                    style: windowWidth < 920 ? styles.tableHeadTournamentMobile : styles.tableHeadTournament
                  },
                  "No. of Scatters"
                ),
                React.createElement(
                  "th",
                  {
                    style: windowWidth < 920 ? styles.tableHeadTournamentMobile : styles.tableHeadTournament
                  },
                  "Player ID"
                ),
                React.createElement(
                  "th",
                  {
                    style: windowWidth < 920 ? styles.tableHeadTournamentMobile : styles.tableHeadTournament
                  },
                  "Bet"
                ),
                React.createElement(
                  "th",
                  {
                    style: windowWidth < 920 ? styles.tableHeadTournamentMobile : styles.tableHeadTournament
                  },
                  "Prize"
                )
              )
            ),
            scatterData ? React.createElement(
              "tbody",
              null,
              scatterData.map(function (item, index) {
                return React.createElement(
                  "tr",
                  { key: index, style: { textAlign: "center" } },
                  React.createElement(
                    "td",
                    {
                      className: windowWidth < 920 ? "prizeTournamentMobile" : "prizeTournament"
                    },
                    "x",
                    item.count
                  ),
                  React.createElement(
                    "td",
                    {
                      className: windowWidth < 920 ? "prizeTournamentMobile" : "prizeTournament"
                    },
                    React.createElement("img", {
                      src: imagePath + "/chinaFlag.png",
                      style: {
                        height: 20,
                        width: 20,
                        borderRadius: 10,
                        marginRight: 10
                      }
                    }),
                    hideId(item.player_id)
                  ),
                  React.createElement(
                    "td",
                    {
                      className: windowWidth < 920 ? "prizeTournamentMobile" : "prizeTournament"
                    },
                    "RM",
                    parseNumber(item.bet)
                  ),
                  React.createElement(
                    "td",
                    {
                      className: windowWidth < 920 ? "prizeTournamentMobile" : "prizeTournament"
                    },
                    "RM",
                    parseNumber(item.prize)
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
                ),
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

  return WinnersScatter;
}(React.Component);

export default WinnersScatter;