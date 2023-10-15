import { styles } from "../style.js";
import { formatDate } from "./common/CommonFunction.js";

class ProfileMultiplier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { multiplierHistory } = this.props;
    return (
      <div style={styles.tournamentHistoryTable}>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={styles.tableHeadProfile}>Date</th>
              <th style={styles.tableHeadProfile}>Multiplier</th>
              <th style={styles.tableHeadProfile}>Bet</th>
              <th style={styles.tableHeadProfile}>Prize</th>
            </tr>
          </thead>

          {multiplierHistory.data ? (
            <tbody>
              {multiplierHistory.data.map((item, index) => (
                <tr key={index}>
                  {" "}
                  <td className="prizeTournament">{formatDate(item.date)}</td>
                  <td className="prizeTournament">x{item.count}</td>
                  <td className="prizeTournament">${item.bet}</td>
                  <td className="prizeTournament">${item.prize}</td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td className="prizeTournament">_</td>
                <td className="prizeTournament">_</td>
                <td className="prizeTournament">_</td>
                <td className="prizeTournament">_</td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    );
  }
}

export default ProfileMultiplier;
