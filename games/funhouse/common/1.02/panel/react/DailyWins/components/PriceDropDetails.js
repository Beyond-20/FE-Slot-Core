import Details from "./shared/Details.js";
import { prizeDrop } from "./json/priceDrop.js";
import DetailsTable from "./shared/DetailsTable.js";
import Spacer from "./shared/Spacer.js";
import { getDateAndTime24H } from "../../TournamentModal/components/common/CommonFunction.js";

export default function PriceDropDetails(props) {
  var tournamentInfo = props.tournamentInfo;

  console.log(tournamentInfo);

  var _ref = tournamentInfo && tournamentInfo.tournament_info,
      start_date = _ref.start_date,
      end_date = _ref.end_date,
      qualified_games = _ref.qualified_games;

  var filterPrizeDrop = function filterPrizeDrop(type) {
    if (tournamentInfo) {
      var prize_drop_info = tournamentInfo.tournament_info.prize_drop.prize_drop_info;

      return prize_drop_info && prize_drop_info.filter(function (item) {
        return item.type === type;
      });
    }
  };

  return React.createElement(
    "div",
    { className: "dw-price-tournament-body" },
    React.createElement(Details, {
      title: "Multiplier Reward",
      content: "Hit a X1000 multiplier and stand a chance to win an extra RM3,000. We’re giving out a total of RM11,500 weekly in prize money as a reward to players who land multipliers. ",
      isList: false
    }),
    React.createElement(Spacer, { height: 10 }),
    React.createElement(DetailsTable, {
      title: "Prize Allocation",
      data: prizeDrop.prizeAllocation,
      rowData: filterPrizeDrop("multiplier")
    }),
    React.createElement(Spacer, { height: 10 }),
    React.createElement(Details, {
      title: "Scatter Reward",
      content: "Land a scatter of 4 or more on your spin to win special scatter rewards. A total of RM4,500 is up for grabs every week.",
      isList: false
    }),
    React.createElement(Spacer, { height: 10 }),
    React.createElement(DetailsTable, {
      title: "Scatter Count",
      data: prizeDrop.scatterPrizeAllocation,
      rowData: filterPrizeDrop("scatter")
    }),
    React.createElement(Spacer, { height: 10 }),
    React.createElement(Details, {
      title: "Prize-drop Rules",
      contentList: ["Min. bet to participate is MYR1.80 ~ MYR2.50", "There are prizes worth RM3,000 which will be given to Funhouse players per week during the promotion period.", "Cash drop will run weekly from Monday to Sunday between " + (getDateAndTime24H(start_date) || "") + " to " + (getDateAndTime24H(end_date) || ""), "Qualified Games: " + qualified_games.map(function (gameName) {
        return " " + gameName && gameName.game_name + " " || " ";
      }), "Funhouse reserves the right to amend, suspend or cancel the promotion at any time and without prior notice."],
      isList: true
    })
  );
}