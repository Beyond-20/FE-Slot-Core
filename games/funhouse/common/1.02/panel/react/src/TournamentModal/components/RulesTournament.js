// import InfiniteScroll from "react-infinite-scroll-component";

import { styles } from "../style.js";
import { rules, ruleList } from "./json/rules.js";

const {
  tournament: {
    title,
    brief,
    prizeGiveway,
    scoringStructure,
    scoringExample,
    tournamentRules,
  },
} = rules;

class RulesTournament extends React.Component {
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
            fontFamily: "Lato, sans-serif",
            fontSize: 18,
          }}
        >
          {title}
        </p>
        <p style={styles.paragraph}>{brief}</p>

        {/************ prizeGiveway table starts ************/}

        <p style={styles.headline}>{prizeGiveway.title}</p>
        <div style={styles.prizeGivewayTable}>
          <table style={{ width: "100%" }}>
            {prizeGiveway.tableData.map((item, index) => {
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

        {/************ prizeGiveway table ends ************/}

        {/************ Scoring Structure starts ************/}

        <p style={styles.headline}>{scoringStructure.title}</p>
        <p style={styles.paragraph}>{scoringStructure.brief}</p>

        {/************ Scoring Structure ends ************/}

        {/************ Scoring Example starts ************/}

        <p style={styles.headline}>{scoringExample.title}</p>
        <div style={styles.scoringExampleTable}>
          <table style={{ width: "100%" }}>
            {scoringExample.tableData.map((item, index) => {
              return (
                // <thead key={index}>
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
                // </thead>
              );
            })}
          </table>
        </div>
        <p style={styles.paragraph}>{scoringExample.note}</p>

        {/************ Scoring Example ends ************/}

        {/************ Tournament Rules starts ************/}

        <p style={styles.headline}>{tournamentRules.title}</p>
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

        {/************ Tournament Rules ends ************/}
      </div>
    );
  }
}

export default RulesTournament;
