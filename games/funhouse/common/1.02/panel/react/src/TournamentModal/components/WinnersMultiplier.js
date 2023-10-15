import { styles } from "../style.js";
import { hideId, isLandscape, parseNumber } from "./common/CommonFunction.js";

const imagePath = "../common/1.02/images";

class WinnersMultiplier extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      size: { windowWidth, windowHeight },
      multiplierData,
    } = this.props;
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
                  Multiplier
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
                  Bet
                </th>
                <th
                  style={
                    windowWidth < 920
                      ? styles.tableHeadTournamentMobile
                      : styles.tableHeadTournament
                  }
                >
                  Prize
                </th>
              </tr>
            </thead>

            {multiplierData ? (
              <tbody>
                {multiplierData.map((item, index) => (
                  <tr key={index} style={{ textAlign: "center" }}>
                    <td
                      className={
                        windowWidth < 920
                          ? "prizeTournamentMobile"
                          : "prizeTournament"
                      }
                    >
                      x{item.count}
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
                      RM{parseNumber(item.bet)}
                    </td>
                    <td
                      className={
                        windowWidth < 920
                          ? "prizeTournamentMobile"
                          : "prizeTournament"
                      }
                    >
                      RM{parseNumber(item.prize)}
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

export default WinnersMultiplier;
