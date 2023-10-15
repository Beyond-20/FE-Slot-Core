var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Button from "./components/shared/Button.js";
import Header from "./components/shared/Header.js";
import TournamentAndPrizeDrop from "./components/TournamentAndPrizeDrop.js";
import { prizeDrop } from "./components/json/priceDrop.js";
import { tournament } from "./components/json/tournament.js";
import DetailsHeader from "./components/shared/DetailsHeader.js";
import TournamentDetails from "./components/TournamentDetails.js";
import PriceDropDetails from "./components/PriceDropDetails.js";
import { isLandscape } from "../TournamentModal/components/common/CommonFunction.js";
import { getTournamentInfo } from "../TournamentModal/services/tournamentAPICalls.js";

var DailyWins = function (_React$Component) {
  _inherits(DailyWins, _React$Component);

  function DailyWins(props) {
    _classCallCheck(this, DailyWins);

    var _this = _possibleConstructorReturn(this, (DailyWins.__proto__ || Object.getPrototypeOf(DailyWins)).call(this, props));

    _this.isResponsive = function () {
      _this.setState({
        windowHeight: window.innerHeight,
        windowwidth: window.innerWidth
      });
    };

    _this.centerDiv = function (param) {
      return {
        display: "flex",
        flexDirection: param,
        justifyContent: "space-evenly",
        alignItems: "center"
      };
    };

    _this.changeState = function (value) {
      _this.setState(value);
    };

    _this.changeStateClose = function (value) {
      _this.setState(value, function () {
        window.dailyWinsCloseBtnClicked();
      });
    };

    _this.renderPriceOrTournament = function () {
      var tournamentInfo = _this.state.tournamentInfo;

      return _this.state.selectedRoute === "Price Drop" ? React.createElement(PriceDropDetails, { tournamentInfo: tournamentInfo }) : React.createElement(TournamentDetails, { tournamentInfo: tournamentInfo });
    };

    _this.fetchTournamentInfo = function () {
      getTournamentInfo().then(function (data) {
        return _this.setState({ tournamentInfo: data });
      }).catch(function (err) {
        return console.log(err);
      });
    };

    _this.state = {
      windowHeight: window.innerHeight,
      windowwidth: window.innerWidth,
      isClicked: false,
      selectedRoute: "",
      tournamentInfo: {},
      closedModal: false
    };
    window.addEventListener("resize", _this.isResponsive);
    return _this;
  }

  _createClass(DailyWins, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.isResponsive();
      this.fetchTournamentInfo();
    }
  }, {
    key: "render",
    value: function render() {
      var _state = this.state,
          windowHeight = _state.windowHeight,
          windowwidth = _state.windowwidth,
          tournamentInfo = _state.tournamentInfo,
          closedModal = _state.closedModal;

      return React.createElement(
        "div",
        {
          className: "dw-main",
          style: { height: windowHeight, width: windowwidth }
        },
        React.createElement(
          "div",
          {
            className: "dw-container",
            style: {
              maxHeight: 670,
              maxWidth: 1100
            }
          },
          !this.state.isClicked ? React.createElement(
            "div",
            { className: "dw-card-main" },
            React.createElement(Header, { changeStateClose: this.changeStateClose }),
            React.createElement(
              "div",
              {
                id: "dw-card-container",
                style: windowwidth < 768 && !isLandscape() ? this.centerDiv("column") : this.centerDiv("row")
              },
              React.createElement(
                "div",
                { className: "dw-card-item" },
                React.createElement(TournamentAndPrizeDrop, {
                  title: "Tournament",
                  size: { windowHeight: windowHeight, windowwidth: windowwidth },
                  brief: tournament.brief,
                  dataList: tournament.ruleList,
                  changeState: this.changeState,
                  tournamentInfo: tournamentInfo,
                  closedModal: closedModal
                })
              ),
              React.createElement(
                "div",
                { className: "dw-card-item" },
                React.createElement(TournamentAndPrizeDrop, {
                  title: "Price Drop",
                  size: { windowHeight: windowHeight, windowwidth: windowwidth },
                  brief: prizeDrop.brief,
                  dataList: prizeDrop.ruleList,
                  changeState: this.changeState,
                  tournamentInfo: tournamentInfo,
                  closedModal: closedModal
                })
              )
            ),
            React.createElement(
              "div",
              { style: this.centerDiv("column") },
              React.createElement(Button, { title: "OK" })
            )
          ) : React.createElement(
            "div",
            { className: "dw-price-tournament-container" },
            React.createElement(
              "div",
              { className: "dw-price-tournament-content" },
              React.createElement(DetailsHeader, {
                changeState: this.changeState,
                headerName: this.state.selectedRoute
              }),
              this.renderPriceOrTournament()
            )
          )
        )
      );
    }
  }]);

  return DailyWins;
}(React.Component);

var root = document.getElementById("dailywins_container");
ReactDOM.createRoot(root).render(React.createElement(DailyWins, null));