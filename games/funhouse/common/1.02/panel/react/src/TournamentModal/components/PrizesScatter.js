import { styles } from "../style.js";
import { isLandscape } from "./common/CommonFunction.js";

class PrizesScatter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      size: { windowWidth, windowHeight }, scatterSummary
    } = this.props;
    return (
      <div
        style={
          windowWidth < 920
            ? {
                ...styles.bodyContainerMobile,
                ...{
                  padding: 0,
                  textSize: 20,
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
                <th>Scatter Count</th>
                <th>Reward (MYR)</th>
                <th>Rewarded per week</th>
              </tr>
            </thead>

            {scatterSummary.data ? (
            <tbody>
              {scatterSummary.data.map((item, index) => (
                <tr key={index} style={{ textAlign: "center" }}>
                  {" "}
                  <td className={windowWidth< 920 ?"prizeTournamentMobile" :"prizeTournament"}>x{item.count}</td>
                  <td className={windowWidth< 920 ?"prizeTournamentMobile" :"prizeTournament"}>{item.reward}</td>
                  <td className={windowWidth< 920 ?"prizeTournamentMobile" :"prizeTournament"}>${item.rewarded}</td>
               
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td className={windowWidth< 920 ?"prizeTournamentMobile" :"prizeTournament"}>_</td>
                <td className={windowWidth< 920 ?"prizeTournamentMobile" :"prizeTournament"}>_</td>
                <td className={windowWidth< 920 ?"prizeTournamentMobile" :"prizeTournament"}>_</td>
                <td className={windowWidth< 920 ?"prizeTournamentMobile" :"prizeTournament"}>_</td>
              </tr>
            </tbody>
          )}

            {/* <tbody>
              <tr style={{ textAlign: "center" }}>
                <td
                  className={
                    windowWidth < 920
                      ? "prizeTournamentMobile"
                      : "prizeTournament"
                  }
                >
                  4 Scatter
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
                  2 Scatter
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
            </tbody> */}
          </table>
        </div>
      </div>
    );
  }
}

export default PrizesScatter;
