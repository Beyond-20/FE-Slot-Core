var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { styles } from "./style.js";
import Prizes from "./components/Prizes.js";
import Winners from "./components/Winners.js";
import Rules from "./components/Rules.js";
import Profile from "./components/Profile.js";
import BottomTab from "./components/shared/BottomTab.js";
import SidePanelItem from "./components/SidePanelItem.js";
import { getTitle, isLandscape } from "./components/common/CommonFunction.js";
import { getPlayerInfo, getTournamentRanking, getTournamentInfo, getPrizeDropHistory } from "./services/tournamentAPICalls.js";

var imagePath = "../common/1.02/images";

var TournamentModal = function (_React$Component) {
  _inherits(TournamentModal, _React$Component);

  function TournamentModal(props) {
    _classCallCheck(this, TournamentModal);

    var _this = _possibleConstructorReturn(this, (TournamentModal.__proto__ || Object.getPrototypeOf(TournamentModal)).call(this, props));

    _this.changeState = function (value, cb) {
      _this.setState(value, cb);
    };

    _this.renderCategoryBody = function () {
      var _this$state = _this.state,
          selectedCategory = _this$state.selectedCategory,
          windowHeight = _this$state.windowHeight,
          windowWidth = _this$state.windowWidth,
          selectedMobile = _this$state.selectedMobile,
          selectedSidePanel = _this$state.selectedSidePanel,
          modalClosed = _this$state.modalClosed;

      if (selectedCategory === "prizes") {
        return React.createElement(Prizes, {
          changeStateMobile: _this.changeState,
          changeState: _this.changeState,
          size: { windowWidth: windowWidth, windowHeight: windowHeight },
          selectedMobile: selectedMobile,
          selectedSidePanel: selectedSidePanel,
          modalClosed: modalClosed
        });
      } else if (selectedCategory === "winners") {
        return React.createElement(Winners, {
          changeStateMobile: _this.changeState,
          changeState: _this.changeState,
          size: { windowWidth: windowWidth, windowHeight: windowHeight },
          selectedMobile: selectedMobile,
          selectedSidePanel: selectedSidePanel,
          modalClosed: modalClosed
        });
      } else if (selectedCategory === "rules") {
        return React.createElement(Rules, {
          changeStateMobile: _this.changeState,
          changeState: _this.changeState,
          size: { windowWidth: windowWidth, windowHeight: windowHeight },
          selectedMobile: selectedMobile,
          selectedSidePanel: selectedSidePanel,
          modalClosed: modalClosed
        });
      } else {
        return React.createElement(Profile, {
          changeStateMobile: _this.changeState,
          size: { windowWidth: windowWidth, windowHeight: windowHeight },
          selectedMobile: selectedMobile,
          modalClosed: modalClosed
        });
      }
    };

    _this.isMobile = function () {
      _this.setState({
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth
      });
    };

    _this.state = {
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
      hoverClose: false,
      selectedCategory: "prizes",
      previousSelectedCategory: "",
      isSelected: false,
      selectedMobile: "tournamentTimer",
      selectedSidePanel: "tournamentTimer",
      modalClosed: false,
      didUpdateModal: false
    };

    window.addEventListener("resize", _this.isMobile);
    // console.log("player info "+ getPlayerInfo().player_id);
    // getTournamentRanking(getPlayerInfo().tournament_id, getPlayerInfo().gameProviderId);
    return _this;
  }

  _createClass(TournamentModal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.isMobile();
      getPlayerInfo();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.state.modalClosed && this.state.didUpdateModal) {
        this.setState({ modalClosed: false, didUpdateModal: false });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.setState({ modalClosed: true });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          hoverClose = _state.hoverClose,
          selectedCategory = _state.selectedCategory,
          previousSelectedCategory = _state.previousSelectedCategory,
          windowHeight = _state.windowHeight,
          windowWidth = _state.windowWidth,
          isSelected = _state.isSelected,
          modalClosed = _state.modalClosed;
      // let { isSelected } = this.props;

      return React.createElement(
        "div",
        {
          className: "mainContainer",
          style: windowWidth < 920 ? styles.mainMobile : Object.assign({}, styles.main, { height: windowHeight })
        },
        React.createElement(
          "div",
          {
            style: windowWidth < 920 ? Object.assign({}, styles.containerMobile, { height: windowHeight }) : Object.assign({}, styles.container, { height: windowHeight * 0.82 })
          },
          windowWidth > 920 && React.createElement(
            "div",
            {
              style: {
                justifyContent: "space-between",
                display: "flex",
                flexDirection: "row",
                width: "100%"
              }
            },
            React.createElement(
              "div",
              null,
              React.createElement("img", {
                src: imagePath + "/Avater.png",
                style: styles.avater,
                onClick: function onClick() {
                  return selectedCategory !== "profile" && _this2.setState(function (prevstate) {
                    return {
                      selectedCategory: "profile",
                      previousSelectedCategory: prevstate.selectedCategory
                    };
                  });
                }
              }),
              selectedCategory === "profile" && React.createElement(
                "div",
                {
                  style: styles.profileBackBtnContainer,
                  onClick: function onClick() {
                    _this2.setState({
                      selectedCategory: previousSelectedCategory
                    });
                  }
                },
                React.createElement("img", {
                  src: imagePath + "/Back.png",
                  style: styles.profileBackBtn,
                  onClick: function onClick() {
                    return _this2.setState({ selectedCategory: "profile" });
                  }
                }),
                React.createElement(
                  "p",
                  { style: { color: "#caa6ff", fontSize: 14 } },
                  "BACK"
                )
              )
            ),
            selectedCategory === "profile" && React.createElement(
              "p",
              { style: styles.profileHeading },
              "My Profile"
            ),
            React.createElement(
              "div",
              {
                style: {
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  height: 40,
                  justifyContent: "flex-end"
                }
              },
              React.createElement(
                "p",
                { style: styles.tournamentText },
                "Tournaments "
              ),
              React.createElement(
                "p",
                {
                  onMouseEnter: function onMouseEnter() {
                    return _this2.setState({ hoverClose: true });
                  },
                  onMouseLeave: function onMouseLeave() {
                    return _this2.setState({ hoverClose: false });
                  },
                  style: hoverClose ? styles.closeBtnHover : styles.closeBtn,
                  onClick: function onClick() {
                    return _this2.setState({ modalClosed: true, didUpdateModal: true }, function () {
                      return window.tournamentModalCloseBtnClicked();
                    });
                  }
                },
                React.createElement("img", {
                  src: imagePath + "/closeTournament.png",
                  style: { height: 30, width: 30 }
                })
              )
            )
          ),
          windowWidth > 920 && React.createElement(
            "div",
            {
              style: selectedCategory === "profile" ? styles.categoryContainerProfile : styles.categoryContainer
            },
            React.createElement(
              "div",
              {
                onClick: function onClick() {
                  return _this2.setState({ selectedCategory: "prizes" });
                },
                style: selectedCategory === "prizes" ? styles.categorySelected : styles.categoryUnselected
              },
              React.createElement("img", {
                src: imagePath + "/Medal_Icon.png",
                style: styles.categoryImg
              }),
              React.createElement(
                "p",
                {
                  style: selectedCategory === "prizes" ? styles.categoryItemNameSelected : styles.categoryItemName
                },
                "PRIZES"
              )
            ),
            React.createElement("div", { style: styles.categoryBorder }),
            React.createElement(
              "div",
              {
                onClick: function onClick() {
                  return _this2.setState({ selectedCategory: "winners" });
                },
                style: selectedCategory === "winners" ? styles.categorySelected : styles.categoryUnselected
              },
              React.createElement("img", {
                src: imagePath + "/Crown_Icon.png",
                style: styles.categoryImg
              }),
              React.createElement(
                "p",
                {
                  style: selectedCategory === "winners" ? styles.categoryItemNameSelected : styles.categoryItemName
                },
                "WINNERS"
              )
            ),
            React.createElement("div", { style: styles.categoryBorder }),
            React.createElement(
              "div",
              {
                onClick: function onClick() {
                  return _this2.setState({ selectedCategory: "rules" });
                },
                style: selectedCategory === "rules" ? styles.categorySelected : styles.categoryUnselected
              },
              React.createElement("img", {
                src: imagePath + "/Rules_Icon.png",
                style: styles.categoryRules
              }),
              React.createElement(
                "p",
                {
                  style: selectedCategory === "rules" ? styles.categoryItemNameSelected : styles.categoryItemName
                },
                "RULES"
              )
            )
          ),
          React.createElement(
            "div",
            {
              style: { width: "100%", overflowY: "scroll", padding: "0 15px" }
            },
            (isSelected || windowWidth > 920) && this.renderCategoryBody()
          ),
          !isSelected && windowWidth < 920 && React.createElement(
            "div",
            null,
            React.createElement(
              "div",
              { style: styles.prizeHeaderMobile },
              React.createElement("div", null),
              React.createElement(
                "div",
                { style: { display: "flex", flexFlow: "column nowrap" } },
                React.createElement(
                  "div",
                  {
                    style: {
                      fontSize: 18,
                      textTransform: "uppercase",
                      textAlign: "center",
                      paddingLeft: "20px"
                    }
                  },
                  "Tournament"
                )
              ),
              React.createElement(
                "div",
                {
                  style: Object.assign({}, styles.closeButtonMobile),
                  onClick: function onClick() {
                    return window.tournamentModalCloseBtnClicked();
                  }
                },
                "X"
              )
            ),
            React.createElement(
              "div",
              {
                style: Object.assign({}, styles.sidePanelContainerMobile, {
                  flexDirection: isLandscape() ? "row" : "column",
                  justifyContent: "center",
                  marginTop: 40,
                  marginBottom: 20
                })
              },
              React.createElement(SidePanelItem, {
                selection: "tournamentTimer",
                currentSelected: selectedCategory,
                title1: "Tournament",
                title2: "Timer",
                changeState: this.changeState,
                size: { windowWidth: windowWidth, windowHeight: windowHeight },
                modalClosed: modalClosed
              }),
              React.createElement(SidePanelItem, {
                selection: "multiplierCashDrop",
                currentSelected: selectedCategory,
                title1: "Multiplier",
                title2: "Cash Drop",
                changeState: this.changeState,
                size: { windowWidth: windowWidth, windowHeight: windowHeight },
                modalClosed: modalClosed
              }),
              React.createElement(SidePanelItem, {
                selection: "scatterCashDrop",
                currentSelected: selectedCategory,
                title1: "Scatter",
                title2: "Cash Drop",
                changeState: this.changeState,
                size: { windowWidth: windowWidth, windowHeight: windowHeight },
                modalClosed: modalClosed
              })
            )
          )
        ),
        windowWidth < 920 && isSelected && React.createElement(BottomTab, {
          selectedTab: selectedCategory,
          changeState: this.changeState
        })
      );
    }
  }]);

  return TournamentModal;
}(React.Component);

var root = document.getElementById("tournament_container");
ReactDOM.createRoot(root).render(React.createElement(TournamentModal, null));