import { styles } from "../style.js";
import ProfileMultiplier from "./ProfileMultiplier.js";
import ProfileScatter from "./ProfileScatter.js";
import ProfileRankingHistory from "./ProfileRankingHistory.js";
import PanelHeader from "./shared/PanelHeader.js";
import ProfileDetails from "./mobile/ProfileDetails.js";
import UpdatedComponent from "./shared/withEnhancedComponents.js";
import ProfileMyDetails from "./shared/ProfileMyDetails.js";
import { isLandscape } from "./common/CommonFunction.js";
import {
  getPlayerInfo,
  getPrizeDropHistory,
  playerRankingHistory,
} from "../services/tournamentAPICalls.js";
const imagePath = "../common/1.02/images";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "multiplierCashDrop",
      selectedMobile: "",
      playerData: {},
      rankingHistory: {},
      scatterHistory: {},
      multiplierHistory: {},
    };
  }

  componentDidMount() {
    this.getPlayerData();
  }

  changeItem = () => {
    let { selected, scatterHistory, rankingHistory, multiplierHistory } =
      this.state;

    if (selected === "multiplierCashDrop") {
      return <ProfileMultiplier multiplierHistory={multiplierHistory} />;
    } else if (selected === "scatterCashDrop") {
      return <ProfileScatter scatterHistory={scatterHistory} />;
    } else {
      return <ProfileRankingHistory rankingHistory={rankingHistory} />;
    }
  };

  changeState = (value, cb) => {
    this.setState(value, cb);
  };

  getPlayerData = () => {
    getPlayerInfo().then((data) => this.setState({ playerData: data }));
    playerRankingHistory().then((data) =>
      this.setState({ rankingHistory: data })
    );
    getPrizeDropHistory("scatter").then((data) =>
      this.setState({ scatterHistory: data })
    );
    getPrizeDropHistory("multiplier").then((data) =>
      this.setState({ multiplierHistory: data })
    );
  };

  render() {
    let { selected, selectedMobile, playerData } = this.state;
    let {
      size: { windowWidth, windowHeight },
    } = this.props;
    return (
      <div
        style={
          windowWidth < 920
            ? {
                ...styles.profileContainerMobile,
                ...{ padding: 0, marginTop: 35, height: windowHeight - 105 },
              }
            : styles.profileContainer
        }
      >
        {/* //profile  header */}
        {windowWidth < 920 && (
          <PanelHeader changeState={this.changeState} title="Profile" />
        )}

        {/* Details */}

        {windowWidth < 920 && <div style={{ marginTop: 35 }}></div>}

        {windowWidth < 920 && !isLandscape() ? (
          <ProfileDetails
            selected={selected}
            changeState={this.changeState}
            size={{ windowWidth, windowHeight }}
            playerData={playerData}
          />
        ) : (
          <ProfileMyDetails
            size={{ windowWidth, windowHeight }}
            playerData={playerData}
          />
        )}

        {(windowWidth > 920 || (windowWidth < 920 && isLandscape())) && (
          <div>
            <p style={styles.profileHeadline}>Tournament History</p>

            <div style={styles.tournamentHistoryCategoryContainer}>
              <div
                onClick={() =>
                  this.setState({ selected: "multiplierCashDrop" })
                }
                style={
                  selected === "multiplierCashDrop"
                    ? styles.thCategoryItemContainerSelected
                    : styles.thCategoryItemContainerUnselected
                }
              >
                <p
                  style={
                    selected === "multiplierCashDrop"
                      ? styles.thItemTextSelected
                      : styles.thItemTextUnselected
                  }
                >
                  Multiplier Cash Drop History
                </p>
              </div>
              <div
                onClick={() => this.setState({ selected: "scatterCashDrop" })}
                style={
                  selected === "scatterCashDrop"
                    ? styles.thCategoryItemContainerSelected
                    : styles.thCategoryItemContainerUnselected
                }
              >
                <p
                  style={
                    selected === "scatterCashDrop"
                      ? styles.thItemTextSelected
                      : styles.thItemTextUnselected
                  }
                >
                  Scatter Cash Drop History
                </p>
              </div>
              <div
                onClick={() => this.setState({ selected: "rankingHistory" })}
                style={
                  selected === "rankingHistory"
                    ? styles.thCategoryItemContainerSelected
                    : styles.thCategoryItemContainerUnselected
                }
              >
                <p
                  style={
                    selected === "rankingHistory"
                      ? styles.thItemTextSelected
                      : styles.thItemTextUnselected
                  }
                >
                  Fh Tournament Ranking History
                </p>
              </div>
            </div>
          </div>
        )}

        {windowWidth < 920 && <div style={{ height: "10px" }}></div>}

        {this.changeItem()}
      </div>
    );
  }
}

export default UpdatedComponent(Profile);
