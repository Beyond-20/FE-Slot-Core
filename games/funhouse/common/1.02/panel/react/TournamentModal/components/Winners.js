var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { styles } from "../style.js";
import SidePanelItem from "./SidePanelItem.js";
import WinnersTournament from "./WinnersTournament.js";
import WinnersMultiplier from "./WinnersMultiplier.js";
import WinnersScatter from "./WinnersScatter.js";
import PanelHeader from "./shared/PanelHeader.js";
import { getTitle, isLandscape } from "./common/CommonFunction.js";
import UpdatedComponent from "./shared/withEnhancedComponents.js";
import SelectionBar from "./shared/SelectionBar.js";
import { getPlayerInfo, getPrizeDropHistory, getTournamentRanking } from "../services/tournamentAPICalls.js";

var imagePath = "../common/1.02/images";

var Winners = function (_React$Component) {
  _inherits(Winners, _React$Component);

  function Winners(props) {
    _classCallCheck(this, Winners);

    var _this = _possibleConstructorReturn(this, (Winners.__proto__ || Object.getPrototypeOf(Winners)).call(this, props));

    _this.changeState = function (value, cb) {
      _this.setState(value, cb);
      _this.props.changeState(value, cb);
    };

    _this.changeStateMobile = function (value, cb) {
      _this.props.changeStateMobile(value, cb);
    };

    _this.getWinnersData = function () {
      getPlayerInfo().then(function (info) {
        return _this.setState({ playerData: info.data });
      }).catch(function (err) {
        return console.log(err);
      });

      getPrizeDropHistory("multiplier", "NA").then(function (response) {
        _this.setState({ multiplierData: response.data });
      }).catch(function (err) {
        return console.log(err);
      });

      getPrizeDropHistory("scatter", "NA").then(function (response) {
        _this.setState({ scatterData: response.data });
      }).catch(function (err) {
        return console.log(err);
      });

      getTournamentRanking().then(function (data) {
        return _this.setState({
          tournamentRanking: data
        });
      }).catch(function (err) {
        return console.log(err);
      });
    };

    _this.changeItem = function () {
      var _this$state = _this.state,
          selected = _this$state.selected,
          tournamentRanking = _this$state.tournamentRanking,
          playerData = _this$state.playerData,
          multiplierData = _this$state.multiplierData,
          scatterData = _this$state.scatterData;
      var _this$props$size = _this.props.size,
          windowWidth = _this$props$size.windowWidth,
          windowHeight = _this$props$size.windowHeight;

      if (selected === "tournamentTimer") {
        return React.createElement(WinnersTournament, {
          size: { windowWidth: windowWidth, windowHeight: windowHeight },
          tournamentRanking: tournamentRanking,
          playerData: playerData
        });
      } else if (selected === "multiplierCashDrop") {
        return React.createElement(WinnersMultiplier, {
          size: { windowWidth: windowWidth, windowHeight: windowHeight },
          multiplierData: multiplierData
        });
      } else {
        return React.createElement(WinnersScatter, {
          size: { windowWidth: windowWidth, windowHeight: windowHeight },
          scatterData: scatterData
        });
      }
    };

    _this.changeItemMobile = function () {
      var _this$state2 = _this.state,
          tournamentRanking = _this$state2.tournamentRanking,
          playerData = _this$state2.playerData,
          multiplierData = _this$state2.multiplierData,
          scatterData = _this$state2.scatterData;
      var _this$props = _this.props,
          _this$props$size2 = _this$props.size,
          windowHeight = _this$props$size2.windowHeight,
          windowWidth = _this$props$size2.windowWidth,
          selectedMobile = _this$props.selectedMobile;

      if (selectedMobile === "tournamentTimer") {
        return React.createElement(WinnersTournament, {
          size: { windowWidth: windowWidth, windowHeight: windowHeight },
          tournamentRanking: tournamentRanking,
          playerData: playerData
        });
      } else if (selectedMobile === "multiplierCashDrop") {
        return React.createElement(WinnersMultiplier, {
          size: { windowWidth: windowWidth, windowHeight: windowHeight },
          multiplierData: multiplierData
        });
      } else {
        return React.createElement(WinnersScatter, {
          size: { windowWidth: windowWidth, windowHeight: windowHeight },
          scatterData: scatterData
        });
      }
    };

    _this.state = {
      selected: "tournamentTimer",
      selectedMobile: "",
      tournamentRanking: {},
      playerData: {},
      multiplierData: [],
      scatterData: []
    };
    return _this;
  }

  _createClass(Winners, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        selected: this.props.selectedSidePanel || "tournamentTimer"
      });
      this.getWinnersData();
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
          title: getTitle(selectedMobile, "Winners")
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

  return Winners;
}(React.Component);

export default Winners;