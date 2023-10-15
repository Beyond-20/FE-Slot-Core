import { styles } from "../style.js";
import { hideId, isLandscape, parseNumber } from "./common/CommonFunction.js";
const imagePath = "../common/1.02/images";

class WinnersTournament extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      size: { windowHeight, windowWidth },
      tournamentRanking,
      playerData,
    } = this.props;

    const headingStyle = {
      fontSize: windowWidth < 920 ? 14 : 18,
      fontFamily: "Lato",
      fontWeight: "400",
      color: "#fdecdd",
    };
    const flagStyle = {
      height: 20,
      width: 20,
      borderRadius: 10,
      marginRight: 10,
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
            <p style={headingStyle}>
              My Score:{" "}
              <mark
                style={
                  windowWidth < 920 ? styles.headlineMobile : styles.headline
                }
              >
                {(playerData &&
                  playerData.score &&
                  parseNumber(playerData.score)) ||
                  "-"}
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
            <p style={headingStyle}>
              My Rank:{" "}
              <mark
                style={
                  windowWidth < 920 ? styles.headlineMobile : styles.headline
                }
              >
                {(playerData && playerData.rank && playerData.rank) || "-"}
              </mark>
            </p>
          </div>
        </div>

        <div style={styles.prizeTournamentTable}>
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th
                  style={
                    windowWidth < 920
                      ? styles.tableHeadTournamentMobile
                      : styles.tableHeadTournament
                  }
                >
                  Position
                </th>
                <th
                  style={
                    windowWidth < 920
                      ? styles.tableHeadTournamentMobile
                      : styles.tableHeadTournament
                  }
                >
                  Player ID
                </th>
                <th
                  style={
                    windowWidth < 920
                      ? styles.tableHeadTournamentMobile
                      : styles.tableHeadTournament
                  }
                >
                  Score
                </th>
              </tr>
            </thead>

            {tournamentRanking && tournamentRanking.data ? (
              <tbody>
                {tournamentRanking.data.map((item, index) => (
                  <tr key={index} style={{ textAlign: "center" }}>
                    {" "}
                    <td
                      className={
                        windowWidth < 920
                          ? "prizeTournamentMobile"
                          : "prizeTournament"
                      }
                    >
                      {item.position}
                    </td>
                    <td
                      className={
                        windowWidth < 920
                          ? "prizeTournamentMobile"
                          : "prizeTournament"
                      }
                    >
                      <img
                        src={imagePath + "/chinaFlag.png"}
                        style={{
                          height: 20,
                          width: 20,
                          borderRadius: 10,
                          marginRight: 10,
                        }}
                      />
                      {hideId(item.player_id)}
                    </td>
                    <td
                      className={
                        windowWidth < 920
                          ? "prizeTournamentMobile"
                          : "prizeTournament"
                      }
                    >
                      {parseNumber(item.score)}
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

export default WinnersTournament;
