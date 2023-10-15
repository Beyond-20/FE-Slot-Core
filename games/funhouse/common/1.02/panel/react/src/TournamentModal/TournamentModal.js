import { styles } from "./style.js";
import Prizes from "./components/Prizes.js";
import Winners from "./components/Winners.js";
import Rules from "./components/Rules.js";
import Profile from "./components/Profile.js";
import BottomTab from "./components/shared/BottomTab.js";
import SidePanelItem from "./components/SidePanelItem.js";
import { getTitle, isLandscape } from "./components/common/CommonFunction.js";
import {
  getPlayerInfo,
  getTournamentRanking,
  getTournamentInfo,
  getPrizeDropHistory,
} from "./services/tournamentAPICalls.js";

const imagePath = "../common/1.02/images";

class TournamentModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
      hoverClose: false,
      selectedCategory: "prizes",
      previousSelectedCategory: "",
      isSelected: false,
      selectedMobile: "tournamentTimer",
      selectedSidePanel: "tournamentTimer",
      modalClosed: false,
      didUpdateModal: false,
    };

    window.addEventListener("resize", this.isMobile);
    // console.log("player info "+ getPlayerInfo().player_id);
    // getTournamentRanking(getPlayerInfo().tournament_id, getPlayerInfo().gameProviderId);
  }

  changeState = (value, cb) => {
    this.setState(value, cb);
  };

  renderCategoryBody = () => {
    let {
      selectedCategory,
      windowHeight,
      windowWidth,
      selectedMobile,
      selectedSidePanel,
      modalClosed,
    } = this.state;
    if (selectedCategory === "prizes") {
      return (
        <Prizes
          changeStateMobile={this.changeState}
          changeState={this.changeState}
          size={{ windowWidth, windowHeight }}
          selectedMobile={selectedMobile}
          selectedSidePanel={selectedSidePanel}
          modalClosed={modalClosed}
        />
      );
    } else if (selectedCategory === "winners") {
      return (
        <Winners
          changeStateMobile={this.changeState}
          changeState={this.changeState}
          size={{ windowWidth, windowHeight }}
          selectedMobile={selectedMobile}
          selectedSidePanel={selectedSidePanel}
          modalClosed={modalClosed}
        />
      );
    } else if (selectedCategory === "rules") {
      return (
        <Rules
          changeStateMobile={this.changeState}
          changeState={this.changeState}
          size={{ windowWidth, windowHeight }}
          selectedMobile={selectedMobile}
          selectedSidePanel={selectedSidePanel}
          modalClosed={modalClosed}
        />
      );
    } else {
      return (
        <Profile
          changeStateMobile={this.changeState}
          size={{ windowWidth, windowHeight }}
          selectedMobile={selectedMobile}
          modalClosed={modalClosed}
        />
      );
    }
  };

  isMobile = () => {
    this.setState({
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    });
  };

  componentDidMount() {
    this.isMobile();
    getPlayerInfo();
  }

  componentDidUpdate() {
    if (this.state.modalClosed && this.state.didUpdateModal) {
      this.setState({ modalClosed: false, didUpdateModal: false });
    }
  }

  componentWillUnmount() {
    this.setState({ modalClosed: true });
  }

  render() {
    let {
      hoverClose,
      selectedCategory,
      previousSelectedCategory,
      windowHeight,
      windowWidth,
      isSelected,
      modalClosed,
    } = this.state;
    // let { isSelected } = this.props;
    return (
      <div
        className="mainContainer"
        style={
          windowWidth < 920
            ? styles.mainMobile
            : { ...styles.main, ...{ height: windowHeight } }
        }
      >
        <div
          style={
            windowWidth < 920
              ? { ...styles.containerMobile, ...{ height: windowHeight } }
              : { ...styles.container, ...{ height: windowHeight * 0.82 } }
          }
        >
          {windowWidth > 920 && (
            <div
              style={{
                justifyContent: "space-between",
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <div>
                <img
                  src={imagePath + "/Avater.png"}
                  style={styles.avater}
                  onClick={() =>
                    selectedCategory !== "profile" &&
                    this.setState((prevstate) => ({
                      selectedCategory: "profile",
                      previousSelectedCategory: prevstate.selectedCategory,
                    }))
                  }
                />
                {selectedCategory === "profile" && (
                  <div
                    style={styles.profileBackBtnContainer}
                    onClick={() => {
                      this.setState({
                        selectedCategory: previousSelectedCategory,
                      });
                    }}
                  >
                    <img
                      src={imagePath + "/Back.png"}
                      style={styles.profileBackBtn}
                      onClick={() =>
                        this.setState({ selectedCategory: "profile" })
                      }
                    />
                    <p style={{ color: "#caa6ff", fontSize: 14 }}>BACK</p>
                  </div>
                )}
              </div>

              {selectedCategory === "profile" && (
                <p style={styles.profileHeading}>My Profile</p>
              )}

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  height: 40,
                  justifyContent: "flex-end",
                }}
              >
                <p style={styles.tournamentText}>Tournaments </p>
                <p
                  onMouseEnter={() => this.setState({ hoverClose: true })}
                  onMouseLeave={() => this.setState({ hoverClose: false })}
                  style={hoverClose ? styles.closeBtnHover : styles.closeBtn}
                  onClick={() =>
                    this.setState(
                      { modalClosed: true, didUpdateModal: true },
                      () => window.tournamentModalCloseBtnClicked()
                    )
                  }
                >
                  <img
                    src={imagePath + "/closeTournament.png"}
                    style={{ height: 30, width: 30 }}
                  />
                </p>
              </div>
            </div>
          )}

          {/*************** category selection starts *************/}
          {windowWidth > 920 && (
            <div
              style={
                selectedCategory === "profile"
                  ? styles.categoryContainerProfile
                  : styles.categoryContainer
              }
            >
              <div
                onClick={() => this.setState({ selectedCategory: "prizes" })}
                style={
                  selectedCategory === "prizes"
                    ? styles.categorySelected
                    : styles.categoryUnselected
                }
              >
                <img
                  src={imagePath + "/Medal_Icon.png"}
                  style={styles.categoryImg}
                />
                <p
                  style={
                    selectedCategory === "prizes"
                      ? styles.categoryItemNameSelected
                      : styles.categoryItemName
                  }
                >
                  PRIZES
                </p>
              </div>

              {/* saparator */}
              <div style={styles.categoryBorder}></div>

              <div
                onClick={() => this.setState({ selectedCategory: "winners" })}
                style={
                  selectedCategory === "winners"
                    ? styles.categorySelected
                    : styles.categoryUnselected
                }
              >
                <img
                  src={imagePath + "/Crown_Icon.png"}
                  style={styles.categoryImg}
                />
                <p
                  style={
                    selectedCategory === "winners"
                      ? styles.categoryItemNameSelected
                      : styles.categoryItemName
                  }
                >
                  WINNERS
                </p>
              </div>

              {/* saparator */}
              <div style={styles.categoryBorder}></div>

              <div
                onClick={() => this.setState({ selectedCategory: "rules" })}
                style={
                  selectedCategory === "rules"
                    ? styles.categorySelected
                    : styles.categoryUnselected
                }
              >
                <img
                  src={imagePath + "/Rules_Icon.png"}
                  style={styles.categoryRules}
                />
                <p
                  style={
                    selectedCategory === "rules"
                      ? styles.categoryItemNameSelected
                      : styles.categoryItemName
                  }
                >
                  RULES
                </p>
              </div>
            </div>
          )}

          {/*************** category selection end *************/}

          {/*************** components starts *************/}

          <div
            style={{ width: "100%", overflowY: "scroll", padding: "0 15px" }}
          >
            {(isSelected || windowWidth > 920) && this.renderCategoryBody()}
          </div>

          {!isSelected && windowWidth < 920 && (
            <div>
              <div style={styles.prizeHeaderMobile}>
                <div></div>
                <div style={{ display: "flex", flexFlow: "column nowrap" }}>
                  <div
                    style={{
                      fontSize: 18,
                      textTransform: "uppercase",
                      textAlign: "center",
                      paddingLeft: "20px",
                    }}
                  >
                    Tournament
                  </div>
                </div>
                <div
                  style={{
                    ...styles.closeButtonMobile,
                  }}
                  onClick={() => window.tournamentModalCloseBtnClicked()}
                >
                  X
                </div>
              </div>

              <div
                style={{
                  ...styles.sidePanelContainerMobile,
                  ...{
                    flexDirection: isLandscape() ? "row" : "column",
                    justifyContent: "center",
                    marginTop: 40,
                    marginBottom: 20,
                  },
                }}
              >
                <SidePanelItem
                  selection="tournamentTimer"
                  currentSelected={selectedCategory}
                  title1="Tournament"
                  title2="Timer"
                  changeState={this.changeState}
                  size={{ windowWidth, windowHeight }}
                  modalClosed={modalClosed}
                />
                <SidePanelItem
                  selection="multiplierCashDrop"
                  currentSelected={selectedCategory}
                  title1="Multiplier"
                  title2="Cash Drop"
                  changeState={this.changeState}
                  size={{ windowWidth, windowHeight }}
                  modalClosed={modalClosed}
                />
                <SidePanelItem
                  selection="scatterCashDrop"
                  currentSelected={selectedCategory}
                  title1="Scatter"
                  title2="Cash Drop"
                  changeState={this.changeState}
                  size={{ windowWidth, windowHeight }}
                  modalClosed={modalClosed}
                />
              </div>
            </div>
          )}
          {/*************** components ends *************/}
        </div>
        {windowWidth < 920 && isSelected && (
          <BottomTab
            selectedTab={selectedCategory}
            changeState={this.changeState}
          />
        )}
      </div>
    );
  }
}

const root = document.getElementById("tournament_container");
ReactDOM.createRoot(root).render(<TournamentModal />);
