import fonts from "../../../constants/constants.js";
import { styles } from "../../style.js";
var imagePath = "../common/1.02/images";
var _React = React,
    useState = _React.useState;


import { isLandscape, isMobile, isRootLevelCategory } from "../common/CommonFunction.js";
var PanelHeader = function PanelHeader(props) {
  var changeState = props.changeState,
      title = props.title,
      changeStateMobile = props.changeStateMobile;

  var style = {
    fontSize: fonts.mHeading,
    textTransform: "uppercase",
    textAlign: "center"
  };
  return React.createElement(
    "div",
    { style: styles.prizeHeaderMobile },
    !isRootLevelCategory(title.split(" ")[0]) ? React.createElement("img", {
      src: imagePath + "/Back.png",
      style: styles.backButtonMobile,
      onClick: function onClick() {
        return changeStateMobile({ isSelected: false, selectedCategory: "prizes" });
      }
    }) : React.createElement("div", { style: { width: "50px" } }),
    isLandscape() ? React.createElement(
      "div",
      { style: { display: "flex", flexFlow: "column nowrap" } },
      title === "Profile" ? React.createElement(
        "div",
        { style: style },
        title
      ) : !isRootLevelCategory(title.split(" ")[0]) && React.createElement(
        "div",
        { style: Object.assign({}, style, { fontSize: 16 }) },
        title.split(" ")[0] + " " + title.split(" ")[1] + " " + title.split(" ")[2]
      )
    ) : React.createElement(
      "div",
      { style: { display: "flex", flexFlow: "column nowrap" } },
      React.createElement(
        "div",
        { style: style },
        title.split(" ")[0]
      ),
      !isRootLevelCategory(title.split(" ")[0]) && React.createElement(
        "div",
        { style: style },
        title.split(" ")[1] + " " + title.split(" ")[2]
      )
    ),
    React.createElement(
      "div",
      {
        style: title === "Prizes" ? Object.assign({}, styles.closeButtonMobile, { paddingRight: 0 }) : styles.closeButtonMobile,
        onClick: function onClick() {
          return window.tournamentModalCloseBtnClicked();
        }
      },
      "X"
    )
  );
};

export default PanelHeader;