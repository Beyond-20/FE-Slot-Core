var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import InfiniteScroll from "react-infinite-scroll-component";

import { styles } from "../style.js";
import { rules, ruleList } from "./json/rules.js";

var _rules$tournament = rules.tournament,
    title = _rules$tournament.title,
    brief = _rules$tournament.brief,
    prizeGiveway = _rules$tournament.prizeGiveway,
    scoringStructure = _rules$tournament.scoringStructure,
    scoringExample = _rules$tournament.scoringExample,
    tournamentRules = _rules$tournament.tournamentRules;

var RulesTournament = function (_React$Component) {
  _inherits(RulesTournament, _React$Component);

  function RulesTournament(props) {
    _classCallCheck(this, RulesTournament);

    return _possibleConstructorReturn(this, (RulesTournament.__proto__ || Object.getPrototypeOf(RulesTournament)).call(this, props));
  }

  _createClass(RulesTournament, [{
    key: "render",
    value: function render() {
      var _ref;

      var _props = this.props,
          _props$size = _props.size,
          windowWidth = _props$size.windowWidth,
          windowHeight = _props$size.windowHeight,
          tournamentInfo = _props.tournamentInfo;


      return React.createElement(
        "div",
        {
          style: windowWidth < 920 ? Object.assign({}, styles.bodyContainerMobile, { height: windowHeight - 140, padding: 10 }) : styles.bodyContainer
        },
        React.createElement(
          "p",
          {
            style: (_ref = {
              color: "#f9be0d",
              fontFamily: "Lato",
              fontWeight: 400
            }, _defineProperty(_ref, "fontFamily", "Lato, sans-serif"), _defineProperty(_ref, "fontSize", 18), _ref)
          },
          title
        ),
        React.createElement(
          "p",
          { style: styles.paragraph },
          brief
        ),
        React.createElement(
          "p",
          { style: styles.headline },
          prizeGiveway.title
        ),
        React.createElement(
          "div",
          { style: styles.prizeGivewayTable },
          React.createElement(
            "table",
            { style: { width: "100%" } },
            prizeGiveway.tableData.map(function (item, index) {
              return React.createElement(
                "thead",
                { key: index },
                React.createElement(
                  "tr",
                  null,
                  Object.values(item).map(function (tdItem, tdIndex) {
                    return index === 0 ? React.createElement(
                      "th",
                      { key: tdIndex, style: styles.tableHead },
                      tdItem
                    ) : React.createElement(
                      "td",
                      { key: tdIndex },
                      tdItem
                    );
                  })
                )
              );
            })
          )
        ),
        React.createElement(
          "p",
          { style: styles.headline },
          scoringStructure.title
        ),
        React.createElement(
          "p",
          { style: styles.paragraph },
          scoringStructure.brief
        ),
        React.createElement(
          "p",
          { style: styles.headline },
          scoringExample.title
        ),
        React.createElement(
          "div",
          { style: styles.scoringExampleTable },
          React.createElement(
            "table",
            { style: { width: "100%" } },
            scoringExample.tableData.map(function (item, index) {
              return (
                // <thead key={index}>
                React.createElement(
                  "tr",
                  null,
                  Object.values(item).map(function (tdItem, tdIndex) {
                    return index === 0 ? React.createElement(
                      "th",
                      { key: tdIndex, style: styles.tableHead },
                      tdItem
                    ) : React.createElement(
                      "td",
                      { key: tdIndex },
                      tdItem
                    );
                  })
                )
                // </thead>

              );
            })
          )
        ),
        React.createElement(
          "p",
          { style: styles.paragraph },
          scoringExample.note
        ),
        React.createElement(
          "p",
          { style: styles.headline },
          tournamentRules.title
        ),
        React.createElement(
          "div",
          { style: { marginTop: 5 } },
          tournamentInfo && React.createElement(
            "ul",
            { style: styles.paragraph },
            tournamentInfo && ruleList(tournamentInfo).map(function (item, index) {
              return React.createElement(
                "li",
                { key: index },
                item
              );
            })
          )
        )
      );
    }
  }]);

  return RulesTournament;
}(React.Component);

export default RulesTournament;