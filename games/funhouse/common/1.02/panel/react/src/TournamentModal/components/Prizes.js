import { styles } from "../style.js";
import SidePanelItem from "./SidePanelItem.js";
import PrizesTournament from "./PrizesTournament.js";
import PrizesMultiplier from "./PrizesMultiplier.js";
import PrizesScatter from "./PrizesScatter.js";
import BottomTab from "./shared/BottomTab.js";
import PanelHeader from "./shared/PanelHeader.js";
import { getTitle, isLandscape } from "./common/CommonFunction.js";
import UpdatedComponent from "./shared/withEnhancedComponents.js";
import SelectionBar from "./shared/SelectionBar.js";
import {
  getPlayerInfo,
  getPrizeDropSummary,
  getTournamentInfo,
  getTournamentRanking,
} from "../services/tournamentAPICalls.js";
const imagePath = "../../common/1.02/images";

class Prizes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "tournamentTimer",
      scatterSummary: {},
      multiplierSummary: {},
      tournamentPrizes: [],
      playerInfo: {},
    };
  }

  componentDidMount() {
    this.setState({
      selected: this.props.selectedSidePanel || "tournamentTimer",
    });
    this.getPlayerData();
  }

  getPlayerData = () => {
    getPrizeDropSummary("scatter")
      .then((data) =>
        this.setState({
          scatterSummary: data,
        })
      )
      .catch((err) => console.log(err));

    getPrizeDropSummary("multiplier")
      .then((data) => {
        this.setState({
          multiplierSummary: data,
        });
      })
      .catch((err) => console.log(err));

    getTournamentInfo()
      .then((data) => {
        this.setState({
          tournamentPrizes:
            (data && data.tournament_info && data.tournament_info.cash_prize) ||
            [],
        });
      })
      .catch((err) => console.log(err));

    getPlayerInfo()
      .then((data) => this.setState({ playerInfo: data.data }))
      .catch((err) => console.log(err));
  };

  changeState = (value, cb) => {
    this.setState(value, cb);
    this.props.changeState(value, cb);
  };

  changeStateMobile = (value, cb) => {
    this.props.changeStateMobile(value, cb);
  };

  changeItem = () => {
    let {
      selected,
      multiplierSummary,
      scatterSummary,
      tournamentPrizes,
      playerInfo,
    } = this.state;
    let {
      size: { windowHeight, windowWidth },
    } = this.props;
    if (selected === "tournamentTimer") {
      return (
        <PrizesTournament
          size={{ windowWidth, windowHeight }}
          tournamentPrizes={tournamentPrizes}
          playerInfo={playerInfo}
        />
      );
    } else if (selected === "multiplierCashDrop") {
      return (
        <PrizesMultiplier
          size={{ windowWidth, windowHeight }}
          multiplierSummary={multiplierSummary}
        />
      );
    } else {
      return (
        <PrizesScatter
          size={{ windowWidth, windowHeight }}
          scatterSummary={scatterSummary}
        />
      );
    }
  };

  changeItemMobile = () => {
    let {
      size: { windowHeight, windowWidth },
      selectedMobile,
    } = this.props;
    let { tournamentPrizes, multiplierSummary, scatterSummary, playerInfo } =
      this.state;
    if (selectedMobile === "tournamentTimer") {
      return (
        <PrizesTournament
          tournamentPrizes={tournamentPrizes}
          playerInfo={playerInfo}
          size={{ windowWidth, windowHeight }}
        />
      );
    } else if (selectedMobile === "multiplierCashDrop") {
      return (
        <PrizesMultiplier
          multiplierSummary={multiplierSummary}
          size={{ windowWidth, windowHeight }}
        />
      );
    } else {
      return (
        <PrizesScatter
          scatterSummary={scatterSummary}
          size={{ windowWidth, windowHeight }}
        />
      );
    }
  };

  render() {
    let { selected } = this.state;
    let {
      size: { windowWidth, windowHeight },
      selectedMobile,
      modalClosed,
    } = this.props;

    return (
      <div
        style={
          windowWidth < 920
            ? styles.prizesContainerMobile
            : styles.prizesContainer
        }
      >
        {/*********header with back and close button**********/}
        {windowWidth < 920 && (
          <PanelHeader
            changeState={this.changeState}
            changeStateMobile={this.changeStateMobile}
            title={getTitle(selectedMobile, "Prizes")}
          />
        )}
        {/************************side panel *************/}
        {windowWidth > 920 && (
          <div
            style={
              windowWidth < 920
                ? {
                    ...styles.sidePanelContainerMobile,
                    ...{
                      flexDirection: isLandscape() ? "row" : "column",
                      justifyContent: "flex-start",
                    },
                  }
                : styles.sidePanelContainer
            }
          >
            {/* {isLandscape && <div style={{margin}}></div>} */}
            <SidePanelItem
              selection="tournamentTimer"
              currentSelected={selected}
              title1="Tournament"
              title2="Timer"
              changeState={this.changeState}
              size={{ windowWidth, windowHeight }}
              modalClosed={modalClosed}
            />
            <SidePanelItem
              selection="multiplierCashDrop"
              currentSelected={selected}
              title1="Multiplier"
              title2="Cash Drop"
              changeState={this.changeState}
              size={{ windowWidth, windowHeight }}
              modalClosed={modalClosed}
            />
            <SidePanelItem
              selection="scatterCashDrop"
              currentSelected={selected}
              title1="Scatter"
              title2="Cash Drop"
              changeState={this.changeState}
              size={{ windowWidth, windowHeight }}
              modalClosed={modalClosed}
            />
          </div>
        )}

        {/****************  selection div *********************8*/}
        {windowWidth > 920 && <SelectionBar selected={selected} />}

        {/* body */}

        {/* {windowWidth > 920 || selectedMobile !== "" ? this.changeItem() : null} */}
        {windowWidth < 920 ? this.changeItemMobile() : this.changeItem()}
      </div>
    );
  }
}

export default Prizes;
