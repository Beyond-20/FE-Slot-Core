import { styles } from "../../style.js";
import { hideId, parseNumber } from "../common/CommonFunction.js";

const imagePath = "../common/1.02/images";

class ProfileMyDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let {
      size: { windowWidth, windowHeight },
      playerData,
    } = this.props;

    // console.log(playerData && playerData.data && playerData.data.rank);
    return (
      <div>
        <p style={styles.profileHeadline}>My Details</p>

        <div style={styles.myDetailsContainer}>
          <div style={styles.myDetailsItemContainer}>
            <div style={styles.profileLogoContainer}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <img
                  src={imagePath + "/Avater_Ellipse.png"}
                  style={styles.avaterEllipse}
                />
                <img
                  src={imagePath + "/chinaFlag.png"}
                  style={styles.profileFlag}
                />
              </div>
              <div
                style={{
                  height: 100,
                  justifyContent: "space-between",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p style={styles.myDetailsDescription}>
                  {playerData && playerData.player_id
                    ? hideId(playerData.player_id)
                    : "_"}
                </p>
                <div>
                  <p style={styles.myDetailsHeading}>Total Wager</p>
                  <p style={styles.myDetailsDescription}>
                    RM
                    {playerData &&
                      playerData.data &&
                      parseNumber(playerData.data.balance)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.myDetailsBorder}></div>

          <div style={styles.myDetailsItemContainer}>
            <div
              style={{
                height: 100,
                width: "100%",
                justifyContent: "space-between",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p style={styles.myDetailsHeading}>Ranking</p>
                <p style={styles.myDetailsDescription}>
                  {(playerData && playerData.data && playerData.data.rank) ||
                    "_"}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p style={styles.myDetailsHeading}>Total Score</p>
                <p style={styles.myDetailsDescription}>
                  RM
                  {(playerData && playerData.data && playerData.data.score) ||
                    "_"}
                </p>
              </div>
            </div>
          </div>

          <div style={styles.myDetailsBorder}></div>

          <div style={styles.myDetailsItemContainer}>
            <div
              style={{
                height: 100,
                width: "100%",
                justifyContent: "space-between",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p style={styles.myDetailsHeading}>
                  No. of Scatter drop prizes
                </p>
                <p style={styles.myDetailsDescription}>
                  {(playerData &&
                    playerData.data &&
                    playerData.data.scatter_prize_drop) ||
                    "_"}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p style={styles.myDetailsHeading}>
                  No. of Multiplier drop prizes
                </p>
                <p style={styles.myDetailsDescription}>
                  {(playerData &&
                    playerData.data &&
                    playerData.data.multiplier_prize_drop) ||
                    "_"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileMyDetails;
