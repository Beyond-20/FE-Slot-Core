var imagePath = "../common/1.02/images/dailywins";

var Header = function Header(_ref) {
  var changeStateClose = _ref.changeStateClose;

  var closeBtn = function closeBtn() {
    changeStateClose({ closedModal: true });
  };
  return React.createElement(
    "div",
    { className: "dw-header-container" },
    React.createElement("div", null),
    React.createElement(
      "div",
      { className: "dw-header-title" },
      "Daily Wins"
    ),
    React.createElement("img", {
      onClick: closeBtn,
      className: "dw-closeBtn",
      src: imagePath + "/Close_White.png",
      alt: "closeBtn"
    })
  );
};

export default Header;