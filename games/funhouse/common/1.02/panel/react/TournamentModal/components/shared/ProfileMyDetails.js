var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { styles } from "../../style.js";
import { hideId, parseNumber } from "../common/CommonFunction.js";

var imagePath = "../common/1.02/images";

var ProfileMyDetails = function (_React$Component) {
  _inherits(ProfileMyDetails, _React$Component);

  function ProfileMyDetails(props) {
    _classCallCheck(this, ProfileMyDetails);

    var _this = _possibleConstructorReturn(this, (ProfileMyDetails.__proto__ || Object.getPrototypeOf(ProfileMyDetails)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(ProfileMyDetails, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          _props$size = _props.size,
          windowWidth = _props$size.windowWidth,
          windowHeight = _props$size.windowHeight,
          playerData = _props.playerData;

      // console.log(playerData && playerData.data && playerData.data.rank);

      return React.createElement(
        "div",
        null,
        React.createElement(
          "p",
          { style: styles.profileHeadline },
          "My Details"
        ),
        React.createElement(
          "div",
          { style: styles.myDetailsContainer },
          React.createElement(
            "div",
            { style: styles.myDetailsItemContainer },
            React.createElement(
              "div",
              { style: styles.profileLogoContainer },
              React.createElement(
                "div",
                { style: { display: "flex", flexDirection: "row" } },
                React.createElement("img", {
                  src: imagePath + "/Avater_Ellipse.png",
                  style: styles.avaterEllipse
                }),
                React.createElement("img", {
                  src: imagePath + "/chinaFlag.png",
                  style: styles.profileFlag
                })
              ),
              React.createElement(
                "div",
                {
                  style: {
                    height: 100,
                    justifyContent: "space-between",
                    display: "flex",
                    flexDirection: "column"
                  }
                },
                React.createElement(
                  "p",
                  { style: styles.myDetailsDescription },
                  playerData && playerData.player_id ? hideId(playerData.player_id) : "_"
                ),
                React.createElement(
                  "div",
                  null,
                  React.createElement(
                    "p",
                    { style: styles.myDetailsHeading },
                    "Total Wager"
                  ),
                  React.createElement(
                    "p",
                    { style: styles.myDetailsDescription },
                    "RM",
                    playerData && playerData.data && parseNumber(playerData.data.balance)
                  )
                )
              )
            )
          ),
          React.createElement("div", { style: styles.myDetailsBorder }),
          React.createElement(
            "div",
            { style: styles.myDetailsItemContainer },
            React.createElement(
              "div",
              {
                style: {
                  height: 100,
                  width: "100%",
                  justifyContent: "space-between",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }
              },
              React.createElement(
                "div",
                {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }
                },
                React.createElement(
                  "p",
                  { style: styles.myDetailsHeading },
                  "Ranking"
                ),
                React.createElement(
                  "p",
                  { style: styles.myDetailsDescription },
                  playerData && playerData.data && playerData.data.rank || "_"
                )
              ),
              React.createElement(
                "div",
                {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }
                },
                React.createElement(
                  "p",
                  { style: styles.myDetailsHeading },
                  "Total Score"
                ),
                React.createElement(
                  "p",
                  { style: styles.myDetailsDescription },
                  "RM",
                  playerData && playerData.data && playerData.data.score || "_"
                )
              )
            )
          ),
          React.createElement("div", { style: styles.myDetailsBorder }),
          React.createElement(
            "div",
            { style: styles.myDetailsItemContainer },
            React.createElement(
              "div",
              {
                style: {
                  height: 100,
                  width: "100%",
                  justifyContent: "space-between",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }
              },
              React.createElement(
                "div",
                {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }
                },
                React.createElement(
                  "p",
                  { style: styles.myDetailsHeading },
                  "No. of Scatter drop prizes"
                ),
                React.createElement(
                  "p",
                  { style: styles.myDetailsDescription },
                  playerData && playerData.data && playerData.data.scatter_prize_drop || "_"
                )
              ),
              React.createElement(
                "div",
                {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }
                },
                React.createElement(
                  "p",
                  { style: styles.myDetailsHeading },
                  "No. of Multiplier drop prizes"
                ),
                React.createElement(
                  "p",
                  { style: styles.myDetailsDescription },
                  playerData && playerData.data && playerData.data.multiplier_prize_drop || "_"
                )
              )
            )
          )
        )
      );
    }
  }]);

  return ProfileMyDetails;
}(React.Component);

export default ProfileMyDetails;