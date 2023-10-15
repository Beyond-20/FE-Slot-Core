var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _React = React,
    useState = _React.useState,
    useEffect = _React.useEffect;


var useCountdown = function useCountdown(targetDate) {
  if (targetDate < new Date()) {
    return [0, 0, 0, 0];
  }
  var countDownDate = new Date(targetDate).getTime();

  var _useState = useState(countDownDate - new Date().getTime()),
      _useState2 = _slicedToArray(_useState, 2),
      countDown = _useState2[0],
      setCountDown = _useState2[1];

  var interval = void 0;
  useEffect(function () {
    interval = setInterval(function () {
      var diff = new Date(targetDate) - new Date();
      if (diff > 0) {
        setCountDown(countDownDate - new Date().getTime());
      } else clearInterval(interval);
    }, 1000);

    return function () {
      clearInterval(interval);
    };
  }, [countDownDate]);

  return getReturnValues(countDown);
};

var getReturnValues = function getReturnValues(countDown) {
  var days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  var hours = Math.floor(countDown % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
  var minutes = Math.floor(countDown % (1000 * 60 * 60) / (1000 * 60));
  var seconds = Math.floor(countDown % (1000 * 60) / 1000);

  return [days, hours, minutes, seconds];
};

export { useCountdown };