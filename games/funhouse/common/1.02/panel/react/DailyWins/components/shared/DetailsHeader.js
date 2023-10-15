var imagePath = "../common/1.02/images/dailywins";

var DetailsHeader = function DetailsHeader(props) {
  var headerName = props.headerName,
      changeState = props.changeState;

  var backBtn = function backBtn() {
    changeState({
      isClicked: false,
      selectedRoute: ""
    });
  };
  var closeBtn = function closeBtn() {
    window.dailyWinsCloseBtnClicked();
    changeState({ closedModal: true });
  };
  return React.createElement(
    "div",
    { className: "dw-header-container" },
    React.createElement(
      "div",
      { className: "dw-backBtn-container", onClick: function onClick() {
          return backBtn();
        } },
      React.createElement("img", { className: "dw-backBtn", src: imagePath + "/Back.png" }),
      React.createElement(
        "p",
        { className: "dw-backBtn-text" },
        "back"
      )
    ),
    React.createElement(
      "div",
      { className: "dw-header-title" },
      React.createElement(
        "div",
        null,
        "Daily Wins -"
      ),
      React.createElement(
        "div",
        null,
        headerName
      )
    ),
    window.innerWidth < 768 ? React.createElement("img", {
      onClick: closeBtn,
      className: "dw-closeBtn",
      src: imagePath + "/Close_White.png",
      alt: "closeBtn"
    }) : React.createElement("div", { id: "dw-header-empty-div" })
  );
};

export default DetailsHeader;