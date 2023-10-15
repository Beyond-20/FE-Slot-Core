var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { styles } from "../../style.js";
var _React = React,
    useEffect = _React.useEffect,
    useState = _React.useState;

var imagePath = "../common/1.02/images";

var BottomTab = function BottomTab(props) {
  var _useState = useState("prizes"),
      _useState2 = _slicedToArray(_useState, 2),
      selectedCategory = _useState2[0],
      setSelectedCategory = _useState2[1];

  var selectedTab = props.selectedTab,
      changeState = props.changeState;

  return React.createElement(
    "div",
    { style: styles.bottomTabContainerMobile },
    React.createElement(
      "div",
      {
        onClick: function onClick() {
          setSelectedCategory("prizes");
          changeState({ selectedCategory: "prizes" });
        },
        style: selectedCategory === "prizes" ? styles.bottomCategorySelectedIcon : styles.bottomCategoryUnselectedIcon
      },
      React.createElement("img", { src: imagePath + "/Medal_Icon.png", style: styles.bottomIcon }),
      React.createElement(
        "p",
        { style: styles.bottomCategoryText },
        "prizes"
      )
    ),
    React.createElement(
      "div",
      {
        onClick: function onClick() {
          setSelectedCategory("winners");
          changeState({ selectedCategory: "winners" });
        },
        style: selectedCategory === "winners" ? styles.bottomCategorySelectedIcon : styles.bottomCategoryUnselectedIcon
      },
      React.createElement("img", { src: imagePath + "/Crown_Icon.png", style: styles.bottomIcon }),
      React.createElement(
        "p",
        { style: styles.bottomCategoryText },
        "winners"
      )
    ),
    React.createElement(
      "div",
      {
        onClick: function onClick() {
          setSelectedCategory("rules");
          changeState({ selectedCategory: "rules" });
        },
        style: selectedCategory === "rules" ? styles.bottomCategorySelectedIcon : styles.bottomCategoryUnselectedIcon
      },
      React.createElement("img", { src: imagePath + "/Rules_Icon.png", style: styles.bottomIcon }),
      React.createElement(
        "p",
        { style: styles.bottomCategoryText },
        "rules"
      )
    ),
    React.createElement(
      "div",
      {
        onClick: function onClick() {
          setSelectedCategory("profile");
          changeState({ selectedCategory: "profile" });
        },
        style: selectedCategory === "profile" ? styles.bottomCategorySelectedIcon : styles.bottomCategoryUnselectedIcon
      },
      React.createElement("img", { src: imagePath + "/Avater.png", style: styles.bottomIcon }),
      React.createElement(
        "p",
        { style: styles.bottomCategoryText },
        "profile"
      )
    )
  );
};

export default BottomTab;