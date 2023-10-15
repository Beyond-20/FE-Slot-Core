var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { styles } from "../style.js";
import SidePanelItem from "./SidePanelItem.js";
import RulesTournament from "./RulesTournament.js";
import RulesMultiplier from "./RulesMultiplier.js";
import RulesScatter from "./RulesScatter.js";
import SelectionBar from "./shared/SelectionBar.js";
import PanelHeader from "./shared/PanelHeader.js";
import { getTitle, isLandscape } from "./common/CommonFunction.js";
import UpdatedComponent from "./shared/withEnhancedComponents.js";
import { getTournamentInfo } from "../services/tournamentAPICalls.js";

var Rules = function (_React$Component) {
  _inherits(Rules, _React$Component);

  function Rules(props) {
    _classCallCheck(this, Rules);

    var _this = _possibleConstructorReturn(this, (Rules.__proto__ || Object.getPrototypeOf(Rules)).call(this, props));

    _this.getPlayerData = function () {
      getTournamentInfo().then(function (response) {
        _this.setState({
          tournamentInfo: response
        });
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
          tournamentInfo = _this$state.tournamentInfo;
      var _this$props$size = _this.props.size,
          windowWidth = _this$props$size.windowWidth,
          windowHeight = _this$props$size.windowHeight;

      if (selected === "tournamentTimer") {
        return React.createElement(RulesTournament, {
          tournamentInfo: tournamentInfo,
          size: { windowWidth: windowWidth, windowHeight: windowHeight }
        });
      } else if (selected === "multiplierCashDrop") {
        return React.createElement(RulesMultiplier, {
          tournamentInfo: tournamentInfo,
          size: { windowWidth: windowWidth, windowHeight: windowHeight }
        });
      } else {
        return React.createElement(RulesScatter, {
          tournamentInfo: tournamentInfo,
          size: { windowWidth: windowWidth, windowHeight: windowHeight }
        });
      }
    };

    _this.changeItemMobile = function () {
      var tournamentInfo = _this.state.tournamentInfo;
      var _this$props = _this.props,
          _this$props$size2 = _this$props.size,
          windowHeight = _this$props$size2.windowHeight,
          windowWidth = _this$props$size2.windowWidth,
          selectedMobile = _this$props.selectedMobile;

      if (selectedMobile === "tournamentTimer") {
        return React.createElement(RulesTournament, {
          tournamentInfo: tournamentInfo,
          size: { windowWidth: windowWidth, windowHeight: windowHeight }
        });
      } else if (selectedMobile === "multiplierCashDrop") {
        return React.createElement(RulesMultiplier, {
          tournamentInfo: tournamentInfo,
          size: { windowWidth: windowWidth, windowHeight: windowHeight }
        });
      } else {
        return React.createElement(RulesScatter, {
          tournamentInfo: tournamentInfo,
          size: { windowWidth: windowWidth, windowHeight: windowHeight }
        });
      }
    };

    _this.state = {
      selected: "tournamentTimer",
      selectedMobile: "",
      tournamentInfo: null
    };
    return _this;
  }

  _createClass(Rules, [{
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
          title: getTitle(selectedMobile, "Rules")
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

  return Rules;
}(React.Component);

export default Rules;