import { styles } from "../style.js";
import { rules, ruleList } from "./json/rules.js";

const {
  scatter: { title, brief, scatterTable, scatterRules },
} = rules;

class RulesScatter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {
      size: { windowWidth, windowHeight },
      tournamentInfo,
    } = this.props;

    return (
      <div
        style={
          windowWidth < 920
            ? {
                ...styles.bodyContainerMobile,
                ...{ height: windowHeight - 140, padding: 10 },
              }
            : styles.bodyContainer
        }
      >
        <p
          style={{
            color: "#f9be0d",
            fontFamily: "Lato",
            fontWeight: 400,
            fontSize: 16,
          }}
        >
          {title}
        </p>
        <p style={styles.paragraph}>{brief}</p>

        <div style={styles.prizeAllocationTable}>
          <table style={{ width: "100%" }}>
            {scatterTable.map((item, index) => {
              return (
                <thead key={index}>
                  <tr>
                    {Object.values(item).map((tdItem, tdIndex) => {
                      return index === 0 ? (
                        <th key={tdIndex} style={styles.tableHead}>
                          {tdItem}
                        </th>
                      ) : (
                        <td key={tdIndex}>{tdItem}</td>
                      );
                    })}
                  </tr>
                </thead>
              );
            })}
          </table>
        </div>

        <p style={styles.headline}>{scatterRules.title}</p>
        <div style={{ marginTop: 5 }}>
          {tournamentInfo && (
            <ul style={styles.paragraph}>
              {tournamentInfo &&
                ruleList(tournamentInfo).map((item, index) => {
                  return <li key={index}>{item}</li>;
                })}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default RulesScatter;
