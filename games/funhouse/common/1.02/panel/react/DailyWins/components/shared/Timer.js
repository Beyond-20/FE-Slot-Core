var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var imagePath = "../common/1.02/images";
var _React = React,
    useEffect = _React.useEffect;

import { useCountdown } from "../commonFunction/countDownHooks.js";

export default function Timer(_ref) {
  var tournament_info = _ref.tournament_info,
      closedModal = _ref.closedModal;

  var timeInMs = +new Date(tournament_info && tournament_info.end_date || "2022-08-31T04:00:00.000Z");

  var _useCountdown = useCountdown(closedModal ? new Date() : timeInMs),
      _useCountdown2 = _slicedToArray(_useCountdown, 4),
      days = _useCountdown2[0],
      hours = _useCountdown2[1],
      minutes = _useCountdown2[2],
      seconds = _useCountdown2[3];

  return React.createElement(
    "div",
    { className: "dw-timer-container", style: { height: 70, width: "80%" } },
    React.createElement("img", {
      className: "dw-ends-in",
      src: imagePath + "/Time-small-rectangle.png",
      alt: "endsIn"
    }),
    React.createElement(
      "div",
      { className: "dw-timer-details" },
      React.createElement(
        "p",
        { className: "dw-timer-value" },
        days
      ),
      React.createElement(
        "p",
        { className: "dw-timer-text" },
        "Days"
      )
    ),
    React.createElement(
      "div",
      { className: "dw-timer-details" },
      React.createElement(
        "p",
        { className: "dw-timer-value" },
        hours
      ),
      React.createElement(
        "p",
        { className: "dw-timer-text" },
        "Hrs"
      )
    ),
    React.createElement(
      "div",
      { className: "dw-timer-details" },
      React.createElement(
        "p",
        { className: "dw-timer-value" },
        minutes
      ),
      React.createElement(
        "p",
        { className: "dw-timer-text" },
        "Mins"
      )
    ),
    React.createElement(
      "div",
      { className: "dw-timer-details" },
      React.createElement(
        "p",
        { className: "dw-timer-value" },
        seconds
      ),
      React.createElement(
        "p",
        { className: "dw-timer-text" },
        "Secs"
      )
    )
  );
}