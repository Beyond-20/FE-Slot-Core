import Button from "./components/shared/Button.js";
import Header from "./components/shared/Header.js";
import TournamentAndPrizeDrop from "./components/TournamentAndPrizeDrop.js";
import { prizeDrop } from "./components/json/priceDrop.js";
import { tournament } from "./components/json/tournament.js";
import DetailsHeader from "./components/shared/DetailsHeader.js";
import TournamentDetails from "./components/TournamentDetails.js";
import PriceDropDetails from "./components/PriceDropDetails.js";
import { isLandscape } from "../TournamentModal/components/common/CommonFunction.js";
import { getTournamentInfo } from "../TournamentModal/services/tournamentAPICalls.js";

class DailyWins extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowHeight: window.innerHeight,
      windowwidth: window.innerWidth,
      isClicked: false,
      selectedRoute: "",
      tournamentInfo: {},
      closedModal: false,
    };
    window.addEventListener("resize", this.isResponsive);
  }
  isResponsive = () => {
    this.setState({
      windowHeight: window.innerHeight,
      windowwidth: window.innerWidth,
    });
  };
  centerDiv = (param) => {
    return {
      display: "flex",
      flexDirection: param,
      justifyContent: "space-evenly",
      alignItems: "center",
    };
  };
  changeState = (value) => {
    this.setState(value);
  };

  changeStateClose = (value) => {
    this.setState(value, () => {
      window.dailyWinsCloseBtnClicked();
    });
  };

  renderPriceOrTournament = () => {
    let { tournamentInfo } = this.state;
    return this.state.selectedRoute === "Price Drop" ? (
      <PriceDropDetails tournamentInfo={tournamentInfo} />
    ) : (
      <TournamentDetails tournamentInfo={tournamentInfo} />
    );
  };

  fetchTournamentInfo = () => {
    getTournamentInfo()
      .then((data) => this.setState({ tournamentInfo: data }))
      .catch((err) => console.log(err));
  };
  componentDidMount() {
    this.isResponsive();
    this.fetchTournamentInfo();
  }

  render() {
    let { windowHeight, windowwidth, tournamentInfo, closedModal } = this.state;
    return (
      <div
        className="dw-main"
        style={{ height: windowHeight, width: windowwidth }}
      >
        <div
          className="dw-container"
          style={{
            maxHeight: 670,
            maxWidth: 1100,
          }}
        >
          {!this.state.isClicked ? (
            <div className="dw-card-main">
              <Header changeStateClose={this.changeStateClose} />
              <div
                id="dw-card-container"
                style={
                  windowwidth < 768 && !isLandscape()
                    ? this.centerDiv("column")
                    : this.centerDiv("row")
                }
              >
                <div className="dw-card-item">
                  <TournamentAndPrizeDrop
                    title="Tournament"
                    size={{ windowHeight, windowwidth }}
                    brief={tournament.brief}
                    dataList={tournament.ruleList}
                    changeState={this.changeState}
                    tournamentInfo={tournamentInfo}
                    closedModal={closedModal}
                  />
                </div>
                <div className="dw-card-item">
                  <TournamentAndPrizeDrop
                    title="Price Drop"
                    size={{ windowHeight, windowwidth }}
                    brief={prizeDrop.brief}
                    dataList={prizeDrop.ruleList}
                    changeState={this.changeState}
                    tournamentInfo={tournamentInfo}
                    closedModal={closedModal}
                  />
                </div>
              </div>
              <div style={this.centerDiv("column")}>
                <Button title={"OK"} />
              </div>
            </div>
          ) : (
            <div className="dw-price-tournament-container">
              <div className="dw-price-tournament-content">
                <DetailsHeader
                  changeState={this.changeState}
                  headerName={this.state.selectedRoute}
                />
                {this.renderPriceOrTournament()}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const root = document.getElementById("dailywins_container");
ReactDOM.createRoot(root).render(<DailyWins />);
