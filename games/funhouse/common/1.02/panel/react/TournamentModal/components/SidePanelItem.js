var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { styles } from "../style.js";
import { isLandscape } from "./common/CommonFunction.js";
var imagePath = "../common/1.02/images";
var _React = React,
    useState = _React.useState;

import { useCountdown } from "../../DailyWins/components/commonFunction/countDownHooks.js";

var SidePanelItem = function SidePanelItem(_ref) {
  var selection = _ref.selection,
      currentSelected = _ref.currentSelected,
      title1 = _ref.title1,
      title2 = _ref.title2,
      selectedMobile = _ref.selectedMobile,
      _ref$size = _ref.size,
      windowWidth = _ref$size.windowWidth,
      windowHeight = _ref$size.windowHeight,
      changeState = _ref.changeState,
      tournamentInfo = _ref.tournamentInfo,
      modalClosed = _ref.modalClosed;

  var timeInMs = +new Date(tournamentInfo && tournamentInfo.tournamentInfo.end_date || "2022-08-31T04:00:00.000Z");

  var _useState = useState("tournamentTimer"),
      _useState2 = _slicedToArray(_useState, 2),
      selected = _useState2[0],
      setSelected = _useState2[1];

  var _useState3 = useState("prize"),
      _useState4 = _slicedToArray(_useState3, 2),
      selectedCategoryMobile = _useState4[0],
      setSelectedCategoryMobile = _useState4[1];

  var _useCountdown = useCountdown(modalClosed ? new Date() : timeInMs),
      _useCountdown2 = _slicedToArray(_useCountdown, 4),
      days = _useCountdown2[0],
      hours = _useCountdown2[1],
      minutes = _useCountdown2[2],
      seconds = _useCountdown2[3];

  return React.createElement(
    "div",
    {
      onClick: function onClick() {
        setSelected(selection);
        changeState({
          selected: selection,
          selectedMobile: selection,
          selectedSidePanel: selection,
          selectedCategoryMobile: currentSelected,
          isSelected: true
        });
      },
      style: selection === currentSelected || selectedMobile === currentSelected ? windowWidth < 920 ? Object.assign({}, styles.sidePanelItemContainerSelectedMobile, {
        width: isLandscape() ? windowWidth / 3 - 15 : windowWidth * 0.9,
        marginLeft: isLandscape() ? 10 : 0
      }) : styles.sidePanelItemContainerSelected : windowWidth < 920 ? Object.assign({}, styles.sidePanelItemContainerUnselectedMobile, {
        width: isLandscape() ? windowWidth / 3 - 15 : windowWidth * 0.9,
        marginLeft: isLandscape() ? 10 : 0
      }) : styles.sidePanelItemContainerUnselected
    },
    React.createElement(
      "p",
      {
        style: selection === currentSelected || selectedCategoryMobile === currentSelected ? windowWidth < 920 ? styles.sidePanelItemTextSelectedMobile : styles.sidePanelItemTextSelected : windowWidth < 920 ? styles.sidePanelItemTextUnselectedMobile : styles.sidePanelItemTextUnselected
      },
      title1,
      " ",
      React.createElement("br", null),
      title2
    ),
    React.createElement(
      "div",
      {
        style: selection === currentSelected || selectedCategoryMobile === currentSelected ? windowWidth < 920 ? styles.timerContainerSelectedMobile : styles.timerContainerSelected : windowWidth < 920 ? styles.timerContainerUnselectedMobile : styles.timerContainerUnselected
      },
      React.createElement(
        "div",
        {
          style: windowWidth < 920 ? styles.dailyWinsContainerMobile : styles.dailyWinsContainer
        },
        React.createElement(
          "p",
          {
            style: windowWidth < 920 ? styles.dailyWinsTextMobile : styles.dailyWinsText
          },
          "Daily Wins"
        )
      ),
      React.createElement("img", {
        src: imagePath + "/Time-small-rectangle.png",
        style: windowWidth < 920 ? styles.timeSmallImgMobile : styles.timeSmallImg
      }),
      React.createElement(
        "div",
        {
          style: windowWidth < 920 ? styles.timerItemMobile : styles.timerItem
        },
        React.createElement(
          "p",
          {
            style: windowWidth < 920 ? styles.timerCountMobile : styles.timerCount
          },
          days
        ),
        React.createElement(
          "p",
          {
            style: windowWidth < 920 ? styles.timerTextMobile : styles.timerText
          },
          "Days"
        )
      ),
      React.createElement(
        "div",
        {
          style: windowWidth < 920 ? styles.timerItemMobile : styles.timerItem
        },
        React.createElement(
          "p",
          {
            style: windowWidth < 920 ? styles.timerCountMobile : styles.timerCount
          },
          hours
        ),
        React.createElement(
          "p",
          {
            style: windowWidth < 920 ? styles.timerTextMobile : styles.timerText
          },
          "Hrs"
        )
      ),
      React.createElement(
        "div",
        {
          style: windowWidth < 920 ? styles.timerItemMobile : styles.timerItem
        },
        React.createElement(
          "p",
          {
            style: windowWidth < 920 ? styles.timerCountMobile : styles.timerCount
          },
          minutes
        ),
        React.createElement(
          "p",
          {
            style: windowWidth < 920 ? styles.timerTextMobile : styles.timerText
          },
          "Mins"
        )
      ),
      React.createElement(
        "div",
        {
          style: windowWidth < 920 ? styles.timerItemMobile : styles.timerItem
        },
        React.createElement(
          "p",
          {
            style: windowWidth < 920 ? styles.timerCountMobile : styles.timerCount
          },
          seconds
        ),
        React.createElement(
          "p",
          {
            style: windowWidth < 920 ? styles.timerTextMobile : styles.timerText
          },
          "Secs"
        )
      )
    )
  );
};

export default SidePanelItem;