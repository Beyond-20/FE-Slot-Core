var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function UpdatedComponent(OriginalComponent) {
  var EnhancedComponent = function (_React$Component) {
    _inherits(EnhancedComponent, _React$Component);

    function EnhancedComponent(props) {
      _classCallCheck(this, EnhancedComponent);

      var _this = _possibleConstructorReturn(this, (EnhancedComponent.__proto__ || Object.getPrototypeOf(EnhancedComponent)).call(this, props));

      _this.isMobile = function () {
        _this.setState({
          windowHeight: window.innerHeight,
          windowWidth: window.innerWidth
        });
      };

      _this.state = {
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
      };
      window.addEventListener("resize", _this.isMobile);
      return _this;
    }

    _createClass(EnhancedComponent, [{
      key: "render",
      value: function render() {
        var _state = this.state,
            windowWidth = _state.windowWidth,
            windowHeight = _state.windowHeight;

        return React.createElement(OriginalComponent, { size: { windowWidth: windowWidth, windowHeight: windowHeight } });
      }
    }]);

    return EnhancedComponent;
  }(React.Component);

  return EnhancedComponent;
}

export default UpdatedComponent;