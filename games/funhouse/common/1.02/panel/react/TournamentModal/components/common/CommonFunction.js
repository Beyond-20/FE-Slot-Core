export var isMobile = function isMobile(setState, width, height) {
  return window.innerWidth < 768 ? true : false;
};

export var getTitle = function getTitle(selected, category) {
  switch (selected) {
    case "tournamentTimer":
      return "Tournament Timer " + category;
    case "multiplierCashDrop":
      return "Multiplier CashDrop " + category;
    case "scatterCashDrop":
      return "Scatter CashDrop " + category;
    default:
      return "Profile";
  }
};

export var isPortrait = function isPortrait() {
  return window.innerHeight > window.innerWidth ? true : false;
};

export var isLandscape = function isLandscape() {
  return window.matchMedia("(max-width:920px) and (orientation:landscape)").matches ? true : false;
};

export var isRootLevelCategory = function isRootLevelCategory(category) {
  switch (category) {
    case "Prizes":
      return true;
    case "Winners":
      return true;
    case "Rules":
      return true;
    case "Profile":
      return true;

    default:
      return false;
  }
};

export var parseNumber = function parseNumber(num) {
  var internationalNumberFormat = new Intl.NumberFormat("en-IN");
  return internationalNumberFormat.format((Math.round(num * 100) / 100).toFixed(2));
};

export var formatDate = function formatDate(date) {
  return new Date(date).toLocaleString("en-IN", { timeZone: "Asia/kolkata" }).split(",")[0];
};
export var getDateAndTime24H = function getDateAndTime24H(date) {
  return new Date(date).toLocaleString("en-IN", { hour12: false });
};

export var hideId = function hideId(id) {
  return "****" + id.slice(-4);
};

export function timer(startDate, endDate) {
  var timeInSeconds = new Date(endDate) - new Date(startDate);

  var timeleft = {};

  if (timeInSeconds > 0) {
    timeleft = {
      days: Math.floor(timeInSeconds / (1000 * 60 * 60 * 24)),
      hours: Math.floor(timeInSeconds / (1000 * 60 * 60) % 24),
      minutes: Math.floor(timeInSeconds / 1000 / 60 % 60),
      seconds: Math.floor(timeInSeconds / 1000 % 60)
    };
  }

  return timeleft;
}