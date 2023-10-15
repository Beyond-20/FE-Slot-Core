import { styles } from "../style.js";
import { formatDate } from "./common/CommonFunction.js";

class ProfileRankingHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { rankingHistory } = this.props;
    return (
      <div style={styles.tournamentHistoryTable}>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={styles.tableHeadProfile}>Date</th>
              <th style={styles.tableHeadProfile}>Position</th>
              <th style={styles.tableHeadProfile}>Score</th>
              <th style={styles.tableHeadProfile}>Prize</th>
            </tr>
          </thead>

          {rankingHistory.data ? (
            <tbody>
              {rankingHistory.data.map((item, index) => (
                <tr key={index}>
                  {" "}
                  <td className="prizeTournament">{formatDate(item.date)}</td>
                  <td className="prizeTournament">x{item.position}</td>
                  <td className="prizeTournament">{item.score}</td>
                  <td className="prizeTournament">{item.prize}</td>
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

          {/* <tbody>
            <tr>
              <td className="prizeTournament">{rankingHistory.data.date}</td>
              <td className="prizeTournament">{}</td>
              <td className="prizeTournament">$5.00</td>
              <td className="prizeTournament">$100.00</td>
            </tr>
            <tr>
              <td className="prizeTournament">21/08/2022</td>
              <td className="prizeTournament">x50</td>
              <td className="prizeTournament">$5.00</td>
              <td className="prizeTournament">$100.00</td>
            </tr>
            <tr>
              <td className="prizeTournament">21/08/2022</td>
              <td className="prizeTournament">x50</td>
              <td className="prizeTournament">$5.00</td>
              <td className="prizeTournament">$100.00</td>
            </tr>
          </tbody> */}
        </table>
      </div>
    );
  }
}

export default ProfileRankingHistory;
