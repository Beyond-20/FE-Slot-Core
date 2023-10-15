import { styles } from "../style.js";
import SidePanelItem from "./SidePanelItem.js";
import WinnersTournament from "./WinnersTournament.js";
import WinnersMultiplier from "./WinnersMultiplier.js";
import WinnersScatter from "./WinnersScatter.js";
import PanelHeader from "./shared/PanelHeader.js";
import { getTitle, isLandscape } from "./common/CommonFunction.js";
import UpdatedComponent from "./shared/withEnhancedComponents.js";
import SelectionBar from "./shared/SelectionBar.js";
import {
  getPlayerInfo,
  getPrizeDropHistory,
  getTournamentRanking,
} from "../services/tournamentAPICalls.js";

const imagePath = "../common/1.02/images";

class Winners extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "tournamentTimer",
      selectedMobile: "",
      tournamentRanking: {},
      playerData: {},
      multiplierData: [],
      scatterData: [],
    };
  }

  componentDidMount() {
    this.setState({
      selected: this.props.selectedSidePanel || "tournamentTimer",
    });
    this.getWinnersData();
  }

  changeState = (value, cb) => {
    this.setState(value, cb);
    this.props.changeState(value, cb);
  };

  changeStateMobile = (value, cb) => {
    this.props.changeStateMobile(value, cb);
  };

  getWinnersData = () => {
    getPlayerInfo()
      .then((info) => this.setState({ playerData: info.data }))
      .catch((err) => console.log(err));

    getPrizeDropHistory("multiplier", "NA")
      .then((response) => {
        this.setState({ multiplierData: response.data });
      })
      .catch((err) => console.log(err));

    getPrizeDropHistory("scatter", "NA")
      .then((response) => {
        this.setState({ scatterData: response.data });
      })
      .catch((err) => console.log(err));

    getTournamentRanking()
      .then((data) =>
        this.setState({
          tournamentRanking: data,
        })
      )
      .catch((err) => console.log(err));
  };

  changeItem = () => {
    let {
      selected,
      tournamentRanking,
      playerData,
      multiplierData,
      scatterData,
    } = this.state;
    let {
      size: { windowWidth, windowHeight },
    } = this.props;
    if (selected === "tournamentTimer") {
      return (
        <WinnersTournament
          size={{ windowWidth, windowHeight }}
          tournamentRanking={tournamentRanking}
          playerData={playerData}
        />
      );
    } else if (selected === "multiplierCashDrop") {
      return (
        <WinnersMultiplier
          size={{ windowWidth, windowHeight }}
          multiplierData={multiplierData}
        />
      );
    } else {
      return (
        <WinnersScatter
          size={{ windowWidth, windowHeight }}
          scatterData={scatterData}
        />
      );
    }
  };

  changeItemMobile = () => {
    let { tournamentRanking, playerData, multiplierData, scatterData } =
      this.state;
    let {
      size: { windowHeight, windowWidth },
      selectedMobile,
    } = this.props;
    if (selectedMobile === "tournamentTimer") {
      return (
        <WinnersTournament
          size={{ windowWidth, windowHeight }}
          tournamentRanking={tournamentRanking}
          playerData={playerData}
        />
      );
    } else if (selectedMobile === "multiplierCashDrop") {
      return (
        <WinnersMultiplier
          size={{ windowWidth, windowHeight }}
          multiplierData={multiplierData}
        />
      );
    } else {
      return (
        <WinnersScatter
          size={{ windowWidth, windowHeight }}
          scatterData={scatterData}
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
            title={getTitle(selectedMobile, "Winners")}
          />
        )}
        {/* side panel */}

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

        {/* selection div */}

        {windowWidth > 920 && <SelectionBar selected={selected} />}

        {/* body */}
        {/* {selectedMobile !== "" || windowWidth > 920 ? this.changeItem() : null} */}
        {windowWidth < 920 ? this.changeItemMobile() : this.changeItem()}
      </div>
    );
  }
}

export default Winners;
