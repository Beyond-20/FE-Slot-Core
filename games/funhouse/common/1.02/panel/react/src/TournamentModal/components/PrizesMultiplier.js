import { styles } from "../style.js";
import { isLandscape, isMobile } from "./common/CommonFunction.js";

class PrizesMultiplier extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      size: { windowWidth, windowHeight },
      multiplierSummary,
    } = this.props;
    return (
      <div
        style={
          windowWidth < 920
            ? {
                ...styles.bodyContainerMobile,
                ...{
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
              <tr
                style={
                  windowWidth < 920
                    ? styles.tableHeadTournamentMobile
                    : styles.tableHeadTournament
                }
              >
                <th>Multiplier</th>
                <th>Reward (MYR)</th>
                <th>Rewarded per week</th>
              </tr>
            </thead>
            {multiplierSummary.data ? (
              <tbody>
                {multiplierSummary.data.map((item, index) => (
                  <tr key={index} style={{ textAlign: "center" }}>
                    {" "}
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
                      {item.reward}
                    </td>
                    <td
                      className={
                        windowWidth < 920
                          ? "prizeTournamentMobile"
                          : "prizeTournament"
                      }
                    >
                      ${item.rewarded}
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

            {/* <tbody>
              <tr>
                <td
                  className={
                    windowWidth < 920
                      ? "prizeTournamentMobile"
                      : "prizeTournament"
                  }
                >
                  x500
                </td>
                <td
                  className={
                    windowWidth < 920
                      ? "prizeTournamentMobile"
                      : "prizeTournament"
                  }
                >
                  3000
                </td>
                <td
                  className={
                    windowWidth < 920
                      ? "prizeTournamentMobile"
                      : "prizeTournament"
                  }
                >
                  0
                </td>
              </tr>

              <tr>
                <td
                  className={
                    windowWidth < 920
                      ? "prizeTournamentMobile"
                      : "prizeTournament"
                  }
                >
                  x100
                </td>
                <td
                  className={
                    windowWidth < 920
                      ? "prizeTournamentMobile"
                      : "prizeTournament"
                  }
                >
                  2000
                </td>
                <td
                  className={
                    windowWidth < 920
                      ? "prizeTournamentMobile"
                      : "prizeTournament"
                  }
                >
                  1 of 4
                </td>
              </tr>
              <tr>
                <td
                  className={
                    windowWidth < 920
                      ? "prizeTournamentMobile"
                      : "prizeTournament"
                  }
                >
                  x150
                </td>
                <td
                  className={
                    windowWidth < 920
                      ? "prizeTournamentMobile"
                      : "prizeTournament"
                  }
                >
                  1000
                </td>
                <td
                  className={
                    windowWidth < 920
                      ? "prizeTournamentMobile"
                      : "prizeTournament"
                  }
                >
                  2 of 3
                </td>
              </tr>
              <tr>
                <td
                  className={
                    windowWidth < 920
                      ? "prizeTournamentMobile"
                      : "prizeTournament"
                  }
                >
                  x80
                </td>
                <td
                  className={
                    windowWidth < 920
                      ? "prizeTournamentMobile"
                      : "prizeTournament"
                  }
                >
                  800
                </td>
                <td
                  className={
                    windowWidth < 920
                      ? "prizeTournamentMobile"
                      : "prizeTournament"
                  }
                >
                  4 of 4
                </td>
              </tr>
              <tr>
                <td
                  className={
                    windowWidth < 920
                      ? "prizeTournamentMobile"
                      : "prizeTournament"
                  }
                >
                  x1000
                </td>
                <td
                  className={
                    windowWidth < 920
                      ? "prizeTournamentMobile"
                      : "prizeTournament"
                  }
                >
                  700
                </td>
                <td
                  className={
                    windowWidth < 920
                      ? "prizeTournamentMobile"
                      : "prizeTournament"
                  }
                >
                  5 of 10
                </td>
              </tr>
              <tr>
                <td
                  className={
                    windowWidth < 920
                      ? "prizeTournamentMobile"
                      : "prizeTournament"
                  }
                >
                  x30
                </td>
                <td
                  className={
                    windowWidth < 920
                      ? "prizeTournamentMobile"
                      : "prizeTournament"
                  }
                >
                  550
                </td>
                <td
                  className={
                    windowWidth < 920
                      ? "prizeTournamentMobile"
                      : "prizeTournament"
                  }
                >
                  1 of 20
                </td>
              </tr>
              <tr>
                <td
                  className={
                    windowWidth < 920
                      ? "prizeTournamentMobile"
                      : "prizeTournament"
                  }
                >
                  x20
                </td>
                <td
                  className={
                    windowWidth < 920
                      ? "prizeTournamentMobile"
                      : "prizeTournament"
                  }
                >
                  500
                </td>
                <td
                  className={
                    windowWidth < 920
                      ? "prizeTournamentMobile"
                      : "prizeTournament"
                  }
                >
                  11 of 15
                </td>
              </tr>
              <tr>
                <td
                  className={
                    windowWidth < 920
                      ? "prizeTournamentMobile"
                      : "prizeTournament"
                  }
                >
                  x15
                </td>
                <td
                  className={
                    windowWidth < 920
                      ? "prizeTournamentMobile"
                      : "prizeTournament"
                  }
                >
                  400
                </td>
                <td
                  className={
                    windowWidth < 920
                      ? "prizeTournamentMobile"
                      : "prizeTournament"
                  }
                >
                  5 of 13
                </td>
              </tr>
              <tr>
                <td
                  className={
                    windowWidth < 920
                      ? "prizeTournamentMobile"
                      : "prizeTournament"
                  }
                >
                  x10
                </td>
                <td
                  className={
                    windowWidth < 920
                      ? "prizeTournamentMobile"
                      : "prizeTournament"
                  }
                >
                  210
                </td>
                <td
                  className={
                    windowWidth < 920
                      ? "prizeTournamentMobile"
                      : "prizeTournament"
                  }
                >
                  10 of 11
                </td>
              </tr>
            </tbody> */}
          </table>
        </div>
      </div>
    );
  }
}

export default PrizesMultiplier;
