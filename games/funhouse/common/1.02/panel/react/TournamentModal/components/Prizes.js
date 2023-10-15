var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { styles } from "../style.js";
import SidePanelItem from "./SidePanelItem.js";
import PrizesTournament from "./PrizesTournament.js";
import PrizesMultiplier from "./PrizesMultiplier.js";
import PrizesScatter from "./PrizesScatter.js";
import BottomTab from "./shared/BottomTab.js";
import PanelHeader from "./shared/PanelHeader.js";
import { getTitle, isLandscape } from "./common/CommonFunction.js";
import UpdatedComponent from "./shared/withEnhancedComponents.js";
import SelectionBar from "./shared/SelectionBar.js";
import { getPlayerInfo, getPrizeDropSummary, getTournamentInfo, getTournamentRanking } from "../services/tournamentAPICalls.js";
var imagePath = "../../common/1.02/images";

var Prizes = function (_React$Component) {
  _inherits(Prizes, _React$Component);

  function Prizes(props) {
    _classCallCheck(this, Prizes);

    var _this = _possibleConstructorReturn(this, (Prizes.__proto__ || Object.getPrototypeOf(Prizes)).call(this, props));

    _this.getPlayerData = function () {
      getPrizeDropSummary("scatter").then(function (data) {
        return _this.setState({
          scatterSummary: data
        });
      }).catch(function (err) {
        return console.log(err);
      });

      getPrizeDropSummary("multiplier").then(function (data) {
        _this.setState({
          multiplierSummary: data
        });
      }).catch(function (err) {
        return console.log(err);
      });

      getTournamentInfo().then(function (data) {
        _this.setState({
          tournamentPrizes: data && data.tournament_info && data.tournament_info.cash_prize || []
        });
      }).catch(function (err) {
        return console.log(err);
      });

      getPlayerInfo().then(function (data) {
        return _this.setState({ playerInfo: data.data });
      }).catch(function (err) {
        return console.log(err);
      });
    };

    _this.changeState = function (value, cb) {
      _this.setState(value, cb);
      _this.props.changeState(value, cb);
    };

    _this.changeStateMobile = function (value, cb) {
      _this.props.changeStateMobile(value, cb);
    };

    _this.changeItem = function () {
      var _this$state = _this.state,
          selected = _this$state.selected,
          multiplierSummary = _this$state.multiplierSummary,
          scatterSummary = _this$state.scatterSummary,
          tournamentPrizes = _this$state.tournamentPrizes,
          playerInfo = _this$state.playerInfo;
      var _this$props$size = _this.props.size,
          windowHeight = _this$props$size.windowHeight,
          windowWidth = _this$props$size.windowWidth;

      if (selected === "tournamentTimer") {
        return React.createElement(PrizesTournament, {
          size: { windowWidth: windowWidth, windowHeight: windowHeight },
          tournamentPrizes: tournamentPrizes,
          playerInfo: playerInfo
        });
      } else if (selected === "multiplierCashDrop") {
        return React.createElement(PrizesMultiplier, {
          size: { windowWidth: windowWidth, windowHeight: windowHeight },
          multiplierSummary: multiplierSummary
        });
      } else {
        return React.createElement(PrizesScatter, {
          size: { windowWidth: windowWidth, windowHeight: windowHeight },
          scatterSummary: scatterSummary
        });
      }
    };

    _this.changeItemMobile = function () {
      var _this$props = _this.props,
          _this$props$size2 = _this$props.size,
          windowHeight = _this$props$size2.windowHeight,
          windowWidth = _this$props$size2.windowWidth,
          selectedMobile = _this$props.selectedMobile;
      var _this$state2 = _this.state,
          tournamentPrizes = _this$state2.tournamentPrizes,
          multiplierSummary = _this$state2.multiplierSummary,
          scatterSummary = _this$state2.scatterSummary,
          playerInfo = _this$state2.playerInfo;

      if (selectedMobile === "tournamentTimer") {
        return React.createElement(PrizesTournament, {
          tournamentPrizes: tournamentPrizes,
          playerInfo: playerInfo,
          size: { windowWidth: windowWidth, windowHeight: windowHeight }
        });
      } else if (selectedMobile === "multiplierCashDrop") {
        return React.createElement(PrizesMultiplier, {
          multiplierSummary: multiplierSummary,
          size: { windowWidth: windowWidth, windowHeight: windowHeight }
        });
      } else {
        return React.createElement(PrizesScatter, {
          scatterSummary: scatterSummary,
          size: { windowWidth: windowWidth, windowHeight: windowHeight }
        });
      }
    };

    _this.state = {
      selected: "tournamentTimer",
      scatterSummary: {},
      multiplierSummary: {},
      tournamentPrizes: [],
      playerInfo: {}
    };
    return _this;
  }

  _createClass(Prizes, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        selected: this.props.selectedSidePanel || "tournamentTimer"
      });
      this.getPlayerData();
    }
  }, {
    key: "render",
    value: function render() {
      var selected = this.state.selected;
      var _props = this.props,
          _props$size = _props.size,
          windowWidth = _props$size.windowWidth,
          windowHeight = _props$size.windowHeight,
          selectedMobile = _props.selectedMobile,
          modalClosed = _props.modalClosed;


      return React.createElement(
        "div",
        {
          style: windowWidth < 920 ? styles.prizesContainerMobile : styles.prizesContainer
        },
        windowWidth < 920 && React.createElement(PanelHeader, {
          changeState: this.changeState,
          changeStateMobile: this.changeStateMobile,
          title: getTitle(selectedMobile, "Prizes")
        }),
        windowWidth > 920 && React.createElement(
          "div",
          {
            style: windowWidth < 920 ? Object.assign({}, styles.sidePanelContainerMobile, {
              flexDirection: isLandscape() ? "row" : "column",
              justifyContent: "flex-start"
            }) : styles.sidePanelContainer
          },
          React.createElement(SidePanelItem, {
            selection: "tournamentTimer",
            currentSelected: selected,
            title1: "Tournament",
            title2: "Timer",
            changeState: this.changeState,
            size: { windowWidth: windowWidth, windowHeight: windowHeight },
            modalClosed: modalClosed
          }),
          React.createElement(SidePanelItem, {
            selection: "multiplierCashDrop",
            currentSelected: selected,
            title1: "Multiplier",
            title2: "Cash Drop",
            changeState: this.changeState,
            size: { windowWidth: windowWidth, windowHeight: windowHeight },
            modalClosed: modalClosed
          }),
          React.createElement(SidePanelItem, {
            selection: "scatterCashDrop",
            currentSelected: selected,
            title1: "Scatter",
            title2: "Cash Drop",
            changeState: this.changeState,
            size: { windowWidth: windowWidth, windowHeight: windowHeight },
            modalClosed: modalClosed
          })
        ),
        windowWidth > 920 && React.createElement(SelectionBar, { selected: selected }),
        windowWidth < 920 ? this.changeItemMobile() : this.changeItem()
      );
    }
  }]);

  return Prizes;
}(React.Component);

export default Prizes;