import Details from "./shared/Details.js";
import { tournament } from "./json/tournament.js";
import DetailsTable from "./shared/DetailsTable.js";
import Spacer from "./shared/Spacer.js";
import { getDateAndTime24H } from "../../TournamentModal/components/common/CommonFunction.js";

export default function TournamentDetails(props) {
  let { tournamentInfo } = props;
  let { start_date, end_date, qualified_games } =
    tournamentInfo && tournamentInfo.tournament_info;

  return (
    <div className="dw-price-tournament-body">
      <DetailsTable
        title={"Prize Giveaway"}
        rowData={tournamentInfo.tournament_info.cash_prize}
        data={tournament.prizeGiveway}
      />
      <Details
        title={"Scoring Structure"}
        content={
          "Funhouse Table Games earn you [0.5]x score points based on your winnings in USD."
        }
        isList={false}
      />
      <DetailsTable data={tournament.scoringExample} width="100%" />
      <Spacer height={20} />
      <DetailsTable data={tournament.scoringExample} width="100%" />
      <Details
        title={"Scoring Structure"}
        contentList={[
          "Min. bet to participate is RM2.50.",
          `Cash drop will run weekly from Monday to Sunday between ${
            getDateAndTime24H(start_date) || ""
          } to ${getDateAndTime24H(end_date) || ""}`,
          `Qualified Games: ${qualified_games.map(
            (gameName) => (" " + gameName && gameName.game_name + " ") || " "
          )}`,
          "If there are two or more players with identical scores in the tournament leaderboard, the player who scores",
        ]}
        isList={true}
      />
    </div>
  );
}
