import { styles } from "../style.js";
import SidePanelItem from "./SidePanelItem.js";
import RulesTournament from "./RulesTournament.js";
import RulesMultiplier from "./RulesMultiplier.js";
import RulesScatter from "./RulesScatter.js";
import SelectionBar from "./shared/SelectionBar.js";
import PanelHeader from "./shared/PanelHeader.js";
import { getTitle, isLandscape } from "./common/CommonFunction.js";
import UpdatedComponent from "./shared/withEnhancedComponents.js";
import { getTournamentInfo } from "../services/tournamentAPICalls.js";

class Rules extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "tournamentTimer",
      selectedMobile: "",
      tournamentInfo: null,
    };
  }

  componentDidMount() {
    this.setState({
      selected: this.props.selectedSidePanel || "tournamentTimer",
    });

    this.getPlayerData();
  }
  getPlayerData = () => {
    getTournamentInfo()
      .then((response) => {
        this.setState({
          tournamentInfo: response,
        });
      })
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
    let { selected, tournamentInfo } = this.state;
    let {
      size: { windowWidth, windowHeight },
    } = this.props;
    if (selected === "tournamentTimer") {
      return (
        <RulesTournament
          tournamentInfo={tournamentInfo}
          size={{ windowWidth, windowHeight }}
        />
      );
    } else if (selected === "multiplierCashDrop") {
      return (
        <RulesMultiplier
          tournamentInfo={tournamentInfo}
          size={{ windowWidth, windowHeight }}
        />
      );
    } else {
      return (
        <RulesScatter
          tournamentInfo={tournamentInfo}
          size={{ windowWidth, windowHeight }}
        />
      );
    }
  };

  changeItemMobile = () => {
    let { tournamentInfo } = this.state;
    let {
      size: { windowHeight, windowWidth },
      selectedMobile,
    } = this.props;
    if (selectedMobile === "tournamentTimer") {
      return (
        <RulesTournament
          tournamentInfo={tournamentInfo}
          size={{ windowWidth, windowHeight }}
        />
      );
    } else if (selectedMobile === "multiplierCashDrop") {
      return (
        <RulesMultiplier
          tournamentInfo={tournamentInfo}
          size={{ windowWidth, windowHeight }}
        />
      );
    } else {
      return (
        <RulesScatter
          tournamentInfo={tournamentInfo}
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
        {/*header with back and close button*/}
        {windowWidth < 920 && (
          <PanelHeader
            changeState={this.changeState}
            changeStateMobile={this.changeStateMobile}
            title={getTitle(selectedMobile, "Rules")}
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
        {/* {windowWidth > 920 || selectedMobile !== "" ? this.changeItem() : null} */}
        {windowWidth < 920 ? this.changeItemMobile() : this.changeItem()}
      </div>
    );
  }
}

export default Rules;
