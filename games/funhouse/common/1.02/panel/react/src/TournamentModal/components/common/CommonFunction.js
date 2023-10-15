export const isMobile = (setState, width, height) =>
  window.innerWidth < 768 ? true : false;

export const getTitle = (selected, category) => {
  switch (selected) {
    case "tournamentTimer":
      return `Tournament Timer ${category}`;
    case "multiplierCashDrop":
      return `Multiplier CashDrop ${category}`;
    case "scatterCashDrop":
      return `Scatter CashDrop ${category}`;
    default:
      return "Profile";
  }
};

export const isPortrait = () =>
  window.innerHeight > window.innerWidth ? true : false;

export const isLandscape = () =>
  window.matchMedia("(max-width:920px) and (orientation:landscape)").matches
    ? true
    : false;

export const isRootLevelCategory = (category) => {
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

export const parseNumber = (num) => {
  let internationalNumberFormat = new Intl.NumberFormat("en-IN");
  return internationalNumberFormat.format(
    (Math.round(num * 100) / 100).toFixed(2)
  );
};

export const formatDate = (date) => {
  return new Date(date)
    .toLocaleString("en-IN", { timeZone: "Asia/kolkata" })
    .split(",")[0];
};
export const getDateAndTime24H = (date) => {
  return new Date(date).toLocaleString("en-IN", { hour12: false });
};

export const hideId = (id) => {
  return `****${id.slice(-4)}`;
};

export function timer(startDate, endDate) {
  let timeInSeconds = new Date(endDate) - new Date(startDate);

  let timeleft = {};

  if (timeInSeconds > 0) {
    timeleft = {
      days: Math.floor(timeInSeconds / (1000 * 60 * 60 * 24)),
      hours: Math.floor((timeInSeconds / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((timeInSeconds / 1000 / 60) % 60),
      seconds: Math.floor((timeInSeconds / 1000) % 60),
    };
  }

  return timeleft;
}
