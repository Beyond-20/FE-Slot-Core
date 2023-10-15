var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { styles } from "../style.js";
import ProfileMultiplier from "./ProfileMultiplier.js";
import ProfileScatter from "./ProfileScatter.js";
import ProfileRankingHistory from "./ProfileRankingHistory.js";
import PanelHeader from "./shared/PanelHeader.js";
import ProfileDetails from "./mobile/ProfileDetails.js";
import UpdatedComponent from "./shared/withEnhancedComponents.js";
import ProfileMyDetails from "./shared/ProfileMyDetails.js";
import { isLandscape } from "./common/CommonFunction.js";
import { getPlayerInfo, getPrizeDropHistory, playerRankingHistory } from "../services/tournamentAPICalls.js";
var imagePath = "../common/1.02/images";

var Profile = function (_React$Component) {
  _inherits(Profile, _React$Component);

  function Profile(props) {
    _classCallCheck(this, Profile);

    var _this = _possibleConstructorReturn(this, (Profile.__proto__ || Object.getPrototypeOf(Profile)).call(this, props));

    _this.changeItem = function () {
      var _this$state = _this.state,
          selected = _this$state.selected,
          scatterHistory = _this$state.scatterHistory,
          rankingHistory = _this$state.rankingHistory,
          multiplierHistory = _this$state.multiplierHistory;


      if (selected === "multiplierCashDrop") {
        return React.createElement(ProfileMultiplier, { multiplierHistory: multiplierHistory });
      } else if (selected === "scatterCashDrop") {
        return React.createElement(ProfileScatter, { scatterHistory: scatterHistory });
      } else {
        return React.createElement(ProfileRankingHistory, { rankingHistory: rankingHistory });
      }
    };

    _this.changeState = function (value, cb) {
      _this.setState(value, cb);
    };

    _this.getPlayerData = function () {
      getPlayerInfo().then(function (data) {
        return _this.setState({ playerData: data });
      });
      playerRankingHistory().then(function (data) {
        return _this.setState({ rankingHistory: data });
      });
      getPrizeDropHistory("scatter").then(function (data) {
        return _this.setState({ scatterHistory: data });
      });
      getPrizeDropHistory("multiplier").then(function (data) {
        return _this.setState({ multiplierHistory: data });
      });
    };

    _this.state = {
      selected: "multiplierCashDrop",
      selectedMobile: "",
      playerData: {},
      rankingHistory: {},
      scatterHistory: {},
      multiplierHistory: {}
    };
    return _this;
  }

  _createClass(Profile, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getPlayerData();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          selected = _state.selected,
          selectedMobile = _state.selectedMobile,
          playerData = _state.playerData;
      var _props$size = this.props.size,
          windowWidth = _props$size.windowWidth,
          windowHeight = _props$size.windowHeight;

      return React.createElement(
        "div",
        {
          style: windowWidth < 920 ? Object.assign({}, styles.profileContainerMobile, { padding: 0, marginTop: 35, height: windowHeight - 105 }) : styles.profileContainer
        },
        windowWidth < 920 && React.createElement(PanelHeader, { changeState: this.changeState, title: "Profile" }),
        windowWidth < 920 && React.createElement("div", { style: { marginTop: 35 } }),
        windowWidth < 920 && !isLandscape() ? React.createElement(ProfileDetails, {
          selected: selected,
          changeState: this.changeState,
          size: { windowWidth: windowWidth, windowHeight: windowHeight },
          playerData: playerData
        }) : React.createElement(ProfileMyDetails, {
          size: { windowWidth: windowWidth, windowHeight: windowHeight },
          playerData: playerData
        }),
        (windowWidth > 920 || windowWidth < 920 && isLandscape()) && React.createElement(
          "div",
          null,
          React.createElement(
            "p",
            { style: styles.profileHeadline },
            "Tournament History"
          ),
          React.createElement(
            "div",
            { style: styles.tournamentHistoryCategoryContainer },
            React.createElement(
              "div",
              {
                onClick: function onClick() {
                  return _this2.setState({ selected: "multiplierCashDrop" });
                },
                style: selected === "multiplierCashDrop" ? styles.thCategoryItemContainerSelected : styles.thCategoryItemContainerUnselected
              },
              React.createElement(
                "p",
                {
                  style: selected === "multiplierCashDrop" ? styles.thItemTextSelected : styles.thItemTextUnselected
                },
                "Multiplier Cash Drop History"
              )
            ),
            React.createElement(
              "div",
              {
                onClick: function onClick() {
                  return _this2.setState({ selected: "scatterCashDrop" });
                },
                style: selected === "scatterCashDrop" ? styles.thCategoryItemContainerSelected : styles.thCategoryItemContainerUnselected
              },
              React.createElement(
                "p",
                {
                  style: selected === "scatterCashDrop" ? styles.thItemTextSelected : styles.thItemTextUnselected
                },
                "Scatter Cash Drop History"
              )
            ),
            React.createElement(
              "div",
              {
                onClick: function onClick() {
                  return _this2.setState({ selected: "rankingHistory" });
                },
                style: selected === "rankingHistory" ? styles.thCategoryItemContainerSelected : styles.thCategoryItemContainerUnselected
              },
              React.createElement(
                "p",
                {
                  style: selected === "rankingHistory" ? styles.thItemTextSelected : styles.thItemTextUnselected
                },
                "Fh Tournament Ranking History"
              )
            )
          )
        ),
        windowWidth < 920 && React.createElement("div", { style: { height: "10px" } }),
        this.changeItem()
      );
    }
  }]);

  return Profile;
}(React.Component);

export default UpdatedComponent(Profile);