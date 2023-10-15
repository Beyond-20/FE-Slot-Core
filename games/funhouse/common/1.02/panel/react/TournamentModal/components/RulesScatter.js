var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { styles } from "../style.js";
import { rules, ruleList } from "./json/rules.js";

var _rules$scatter = rules.scatter,
    title = _rules$scatter.title,
    brief = _rules$scatter.brief,
    scatterTable = _rules$scatter.scatterTable,
    scatterRules = _rules$scatter.scatterRules;

var RulesScatter = function (_React$Component) {
  _inherits(RulesScatter, _React$Component);

  function RulesScatter(props) {
    _classCallCheck(this, RulesScatter);

    return _possibleConstructorReturn(this, (RulesScatter.__proto__ || Object.getPrototypeOf(RulesScatter)).call(this, props));
  }

  _createClass(RulesScatter, [{
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
          {
            style: {
              color: "#f9be0d",
              fontFamily: "Lato",
              fontWeight: 400,
              fontSize: 16
            }
          },
          title
        ),
        React.createElement(
          "p",
          { style: styles.paragraph },
          brief
        ),
        React.createElement(
          "div",
          { style: styles.prizeAllocationTable },
          React.createElement(
            "table",
            { style: { width: "100%" } },
            scatterTable.map(function (item, index) {
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
          scatterRules.title
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

  return RulesScatter;
}(React.Component);

export default RulesScatter;