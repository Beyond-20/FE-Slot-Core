import { styles } from "../style.js";
import {
  isLandscape,
  isPortrait,
  parseNumber,
} from "./common/CommonFunction.js";
import fonts from "../../constants/constants.js";

const imagePath = "../common/1.02/images";

class PrizesTournament extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      size: { windowWidth, windowHeight },
      tournamentPrizes,
      playerInfo,
    } = this.props;
    const tableHeaderStyle = {
      fontSize: windowWidth < 920 ? fonts.mTableHeading : fonts.dSubHeading,
      fontFamily: "Lato, sans-serif",
      fontWeight: "400",
      color: "#fdecdd",
      marginLeft: 35,
    };

    return (
      <div
        style={
          windowWidth < 920
            ? {
                ...styles.bodyContainerMobile,
                ...{
                  padding: 0,
                  height: windowHeight - 120,
                  backgroundColor: "#00000000",
                  marginTop: isLandscape() ? 55 : 75,
                },
              }
            : styles.bodyContainer
        }
      >
        <div
          style={
            windowWidth < 920
              ? styles.prizeTableHeadlineContainerMobile
              : styles.prizeTableHeadlineContainer
          }
        >
          <div
            style={
              windowWidth < 920
                ? styles.prizeHeadlineItemContainerMobile
                : styles.prizeHeadlineItemContainer
            }
          >
            <p style={tableHeaderStyle}>
              My Score:{" "}
              <mark
                style={
                  windowWidth < 920 ? styles.headlineMobile : styles.headline
                }
              >
                {playerInfo.score ? playerInfo.score : ""}
              </mark>
            </p>
          </div>
          <div
            style={
              windowWidth < 920
                ? styles.prizeHeadlineItemContainerMobile
                : styles.prizeHeadlineItemContainer
            }
          >
            <p style={tableHeaderStyle}>
              My Rank:{" "}
              <mark
                style={
                  windowWidth < 920 ? styles.headlineMobile : styles.headline
                }
              >
                {playerInfo.rank ? playerInfo.rank : ""}
              </mark>
            </p>
          </div>
        </div>

        <div style={styles.prizeTournamentTable}>
          <table style={{ width: "100%" }}>
            <thead>
              <tr
                style={
                  windowWidth < 920
                    ? styles.tableHeadTournamentMobile
                    : styles.tableHeadTournament
                }
              >
                <th style={{ padding: 5 }}>Leaderboard Position</th>
                <th style={{ padding: 5 }}>Cashprize (MYR)</th>
              </tr>
            </thead>
            {tournamentPrizes ? (
              <tbody>
                {tournamentPrizes.map((item, index) => (
                  <tr key={index} style={{ textAlign: "center" }}>
                    {" "}
                    <td
                      className={
                        windowWidth < 920
                          ? "prizeTournamentMobile"
                          : "prizeTournament"
                      }
                    >
                      {item.from_position === item.to_position
                        ? item.from_position
                        : item.from_position + " to " + item.to_position}
                    </td>
                    <td
                      className={
                        windowWidth < 920
                          ? "prizeTournamentMobile"
                          : "prizeTournament"
                      }
                    >
                      {parseNumber(item.cash)}
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td
                    className={
                      windowWidth < 920
                        ? "prizeTournamentMobile"
                        : "prizeTournament"
                    }
                  >
                    _
                  </td>
                  <td
                    className={
                      windowWidth < 920
                        ? "prizeTournamentMobile"
                        : "prizeTournament"
                    }
                  >
                    _
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
    );
  }
}

export default PrizesTournament;
