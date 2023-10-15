import Details from "./shared/Details.js";
import { tournament } from "./json/tournament.js";
import DetailsTable from "./shared/DetailsTable.js";
import Spacer from "./shared/Spacer.js";

export default function PricedropAndTournamentDetails() {
  return React.createElement(
    "div",
    { className: "dw-price-tournament-body" },
    React.createElement(DetailsTable, { data: tournament.prizeGiveway }),
    React.createElement(Details, {
      title: "Scoring Structure",
      content: "Funhouse Table Games earn you [0.5]x score points based on your winnings in USD.",
      isList: false
    }),
    React.createElement(DetailsTable, { data: tournament.scoringExample, width: "100%" }),
    React.createElement(Spacer, { height: 20 }),
    React.createElement(DetailsTable, { data: tournament.scoringExample, width: "100%" }),
    React.createElement(Details, {
      title: "Scoring Structure",
      contentList: ["Min. bet to participate is RM2.50.", "Cash drop will run weekly from Monday to Sunday between [XXX] to [XXXX]", "Qualified Games: [XXXX], [XXXX]", "If there are two or more players with identical scores in the tournament leaderboard, the player who scores"],
      isList: true
    })
  );
}