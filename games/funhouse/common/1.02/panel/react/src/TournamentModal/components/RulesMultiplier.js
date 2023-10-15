import { styles } from "../style.js";
import { ruleList, rules } from "./json/rules.js";

const {
  multiplier: { title, brief, prizeAllocation, multiplierRules },
} = rules;

class RulesMultiplier extends React.Component {
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
        <p style={{ color: "#f9be0d", fontFamily: "Lato", fontWeight: 400 }}>
          {title}
        </p>
        <p style={styles.paragraph}>{brief}</p>

        <p style={styles.headline}>{prizeAllocation.title}</p>
        <div style={styles.prizeAllocationTable}>
          <table style={{ width: "100%" }}>
            {prizeAllocation.tableData.map((item, index) => {
              return (
                <thead key={index}>
                  <tr>
                    {Object.values(item).map((tdItem, tdIndex) => {
                      return index === 0 ? (
                        <th key={tdIndex} style={styles.tableHead}>
                          {tdItem}
                        </th>
                      ) : (
                        <td style={{ padding: 5 }} key={tdIndex}>
                          {tdItem}
                        </td>
                      );
                    })}
                  </tr>
                </thead>
              );
            })}
          </table>
        </div>

        <p style={styles.headline}>{multiplierRules.title}</p>
        <div style={{ marginTop: 5 }}>
          <ul style={styles.paragraph}>
            { tournamentInfo && ruleList(tournamentInfo).map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default RulesMultiplier;
