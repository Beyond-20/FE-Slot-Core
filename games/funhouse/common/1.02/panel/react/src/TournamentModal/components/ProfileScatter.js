import { styles } from "../style.js";
import { formatDate } from "./common/CommonFunction.js";

class ProfileScatter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { scatterHistory } = this.props;
    return (
      <div style={styles.tournamentHistoryTable}>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={styles.tableHeadProfile}>Date</th>
              <th style={styles.tableHeadProfile}>No. of Scatters</th>
              <th style={styles.tableHeadProfile}>Bet</th>
              <th style={styles.tableHeadProfile}>Prize</th>
            </tr>
          </thead>
          

          {scatterHistory.data ? (
            <tbody>
              {scatterHistory.data.map((item, index) => (
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

          {/* <tbody>
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

export default ProfileScatter;
