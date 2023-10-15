import {
  isLandscape,
  parseNumber,
} from "../../TournamentModal/components/common/CommonFunction.js";
import Timer from "./shared/Timer.js";
const { useEffect, useState } = React;
function TournamentAndPrizeDrop({
  size: { windowHeight, windowwidth },
  title,
  brief,
  dataList,
  changeState,
  tournamentInfo,
  closedModal,
}) {
  const containerStyle = {
    // height: windowHeight * 0.55,
    //  width: "100%"
  };

  return (
    <div
      className="dw-tournament-container"
      style={containerStyle}
      onClick={() =>
        changeState({
          isClicked: true,
          selectedRoute: title,
        })
      }
    >
      <div className="dw-touranament-brief-conatiner">
        <div className="dw-tournament-header">{title}</div>
        {!isLandscape() && windowwidth > 768 && (
          <div>
            {" "}
            <div id="brief">{brief}</div>
            <ul id="brief">
              {dataList.map((item, index) => {
                return (
                  <li className="dw-brief" key={index}>
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {(windowwidth < 768 || isLandscape()) && (
        <div>
          <ul className="dw-prize-pool-mobile">
            <li className="dw-lis">
              Minimum Bet to participate:{" MYR"}
              {tournamentInfo &&
                tournamentInfo.tournament_info &&
                tournamentInfo.tournament_info.min_bet &&
                parseNumber(tournamentInfo.tournament_info.min_bet)}
            </li>
            <li className="dw-lis">
              Tournament Prize Pool: MYR{" "}
              {title === "Tournament"
                ? tournamentInfo &&
                  tournamentInfo.tournament_info &&
                  tournamentInfo.tournament_info.prize_pool &&
                  parseNumber(tournamentInfo.tournament_info.prize_pool)
                : tournamentInfo &&
                  tournamentInfo.tournament_info &&
                  tournamentInfo.tournament_info.prize_drop &&
                  tournamentInfo.tournament_info.prize_drop.prize_pool &&
                  parseNumber(
                    tournamentInfo.tournament_info.prize_drop.prize_pool
                  )}
            </li>
            <li className="dw-lis">
              Top Prize: MYR{" "}
              {title === "Tournament"
                ? tournamentInfo &&
                  tournamentInfo.tournament_info &&
                  tournamentInfo.tournament_info.top_prize &&
                  parseNumber(tournamentInfo.tournament_info.top_prize)
                : tournamentInfo &&
                  tournamentInfo.tournament_info &&
                  tournamentInfo.tournament_info.prize_drop &&
                  tournamentInfo.tournament_info.prize_drop.top_prize &&
                  parseNumber(
                    tournamentInfo.tournament_info.prize_drop.top_prize
                  )}{" "}
            </li>
          </ul>
          <Timer
            tournament_info={
              title === "Tournament"
                ? tournamentInfo && tournamentInfo.tournament_info
                : tournamentInfo && tournamentInfo.prize_drop
            }
            closedModal={closedModal}
          />
        </div>
      )}

      {windowwidth > 768 && !isLandscape() && (
        <div className="dw-prize-pool-container">
          <div className="dw-tournament-prize-pool">
            <div className="dw-prize">
              Minimum Bet to participate:{" MYR"}
              {tournamentInfo &&
                tournamentInfo.tournament_info &&
                tournamentInfo.tournament_info.min_bet &&
                parseNumber(tournamentInfo.tournament_info.min_bet)}
            </div>
            <div className="dw-prize">
              {" "}
              Tournament Prize Pool: MYR{" "}
              {title === "Tournament"
                ? tournamentInfo &&
                  tournamentInfo.tournament_info &&
                  tournamentInfo.tournament_info.prize_pool &&
                  parseNumber(tournamentInfo.tournament_info.prize_pool)
                : tournamentInfo &&
                  tournamentInfo.tournament_info &&
                  tournamentInfo.tournament_info.prize_drop &&
                  tournamentInfo.tournament_info.prize_drop.prize_pool &&
                  parseNumber(
                    tournamentInfo.tournament_info.prize_drop.prize_pool
                  )}
            </div>
            <div className="dw-prize">
              Top Prize: MYR{" "}
              {title === "Tournament"
                ? tournamentInfo &&
                  tournamentInfo.tournament_info &&
                  tournamentInfo.tournament_info.top_prize &&
                  parseNumber(tournamentInfo.tournament_info.top_prize)
                : tournamentInfo &&
                  tournamentInfo.tournament_info &&
                  tournamentInfo.tournament_info.prize_drop &&
                  tournamentInfo.tournament_info.prize_drop.top_prize &&
                  parseNumber(
                    tournamentInfo.tournament_info.prize_drop.top_prize
                  )}{" "}
            </div>
          </div>
          <Timer
            tournament_info={
              title === "Tournament"
                ? tournamentInfo && tournamentInfo.tournament_info
                : tournamentInfo &&
                  tournamentInfo.tournament_info &&
                  tournamentInfo.tournament_info.prize_drop
            }
            closedModal={closedModal}
          />
        </div>
      )}
    </div>
  );
}

export default TournamentAndPrizeDrop;
