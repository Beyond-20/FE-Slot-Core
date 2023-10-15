var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { styles } from "../style.js";
import { formatDate } from "./common/CommonFunction.js";

var ProfileRankingHistory = function (_React$Component) {
  _inherits(ProfileRankingHistory, _React$Component);

  function ProfileRankingHistory(props) {
    _classCallCheck(this, ProfileRankingHistory);

    var _this = _possibleConstructorReturn(this, (ProfileRankingHistory.__proto__ || Object.getPrototypeOf(ProfileRankingHistory)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(ProfileRankingHistory, [{
    key: "render",
    value: function render() {
      var rankingHistory = this.props.rankingHistory;

      return React.createElement(
        "div",
        { style: styles.tournamentHistoryTable },
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
                { style: styles.tableHeadProfile },
                "Date"
              ),
              React.createElement(
                "th",
                { style: styles.tableHeadProfile },
                "Position"
              ),
              React.createElement(
                "th",
                { style: styles.tableHeadProfile },
                "Score"
              ),
              React.createElement(
                "th",
                { style: styles.tableHeadProfile },
                "Prize"
              )
            )
          ),
          rankingHistory.data ? React.createElement(
            "tbody",
            null,
            rankingHistory.data.map(function (item, index) {
              return React.createElement(
                "tr",
                { key: index },
                " ",
                React.createElement(
                  "td",
                  { className: "prizeTournament" },
                  formatDate(item.date)
                ),
                React.createElement(
                  "td",
                  { className: "prizeTournament" },
                  "x",
                  item.position
                ),
                React.createElement(
                  "td",
                  { className: "prizeTournament" },
                  item.score
                ),
                React.createElement(
                  "td",
                  { className: "prizeTournament" },
                  item.prize
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
                { className: "prizeTournament" },
                "_"
              ),
              React.createElement(
                "td",
                { className: "prizeTournament" },
                "_"
              ),
              React.createElement(
                "td",
                { className: "prizeTournament" },
                "_"
              ),
              React.createElement(
                "td",
                { className: "prizeTournament" },
                "_"
              )
            )
          )
        )
      );
    }
  }]);

  return ProfileRankingHistory;
}(React.Component);

export default ProfileRankingHistory;