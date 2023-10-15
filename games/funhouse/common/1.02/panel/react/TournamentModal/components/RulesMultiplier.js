var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { styles } from "../style.js";
import { ruleList, rules } from "./json/rules.js";

var _rules$multiplier = rules.multiplier,
    title = _rules$multiplier.title,
    brief = _rules$multiplier.brief,
    prizeAllocation = _rules$multiplier.prizeAllocation,
    multiplierRules = _rules$multiplier.multiplierRules;

var RulesMultiplier = function (_React$Component) {
  _inherits(RulesMultiplier, _React$Component);

  function RulesMultiplier(props) {
    _classCallCheck(this, RulesMultiplier);

    return _possibleConstructorReturn(this, (RulesMultiplier.__proto__ || Object.getPrototypeOf(RulesMultiplier)).call(this, props));
  }

  _createClass(RulesMultiplier, [{
    key: "render",
    value: function render() {
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
          { style: { color: "#f9be0d", fontFamily: "Lato", fontWeight: 400 } },
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
          prizeAllocation.title
        ),
        React.createElement(
          "div",
          { style: styles.prizeAllocationTable },
          React.createElement(
            "table",
            { style: { width: "100%" } },
            prizeAllocation.tableData.map(function (item, index) {
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
                      { style: { padding: 5 }, key: tdIndex },
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
          multiplierRules.title
        ),
        React.createElement(
          "div",
          { style: { marginTop: 5 } },
          React.createElement(
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

  return RulesMultiplier;
}(React.Component);

export default RulesMultiplier;