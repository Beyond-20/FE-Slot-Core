import { styles } from "../../style.js";
import { hideId } from "../common/CommonFunction.js";
const imagePath = "../common/1.02/images";
const ProfileDetails = (props) => {
  let { selected, changeState, playerData } = props;
  console.log("playerData", playerData);
  return (
    <div>
      <p style={styles.profileHeadlineMobile}>My Details</p>
      <div style={styles.profileCardContainer}>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <img
                src={imagePath + "/Avater_Ellipse.png"}
                style={{
                  ...styles.avaterEllipse,
                  ...{ height: 80, width: 80 },
                }}
              />
              <img
                src={imagePath + "/chinaFlag.png"}
                style={{ ...styles.profileFlag, ...{ marginTop: -50 } }}
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
              <p style={styles.myDetailsDescriptionMobile}>
                {playerData && playerData.player_id
                  ? hideId(playerData.player_id)
                  : "_"}
              </p>
              <div>
                <p style={styles.myDetailsHeadingMobile}>Total Wager</p>
                <p style={styles.myDetailsDescriptionMobile}>RM12.00</p>
              </div>
            </div>
          </div>
        </div>
        <div style={styles.myDetailsBorderMobile}></div>

        {/* Ranking and Total score */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 5,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              // alignItems: "center",
            }}
          >
            <p style={styles.myDetailsHeadingMobile}>Ranking</p>
            <p style={styles.myDetailsDescriptionMobile}>
              {(playerData && playerData.data && playerData.data.rank) || "_"}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p style={styles.myDetailsHeadingMobile}>Total Score</p>
            <p style={styles.myDetailsDescriptionMobile}>RM12.00</p>
          </div>
        </div>
        <div style={styles.myDetailsBorderMobile}></div>

        <div style={{ padding: 5 }}>
          <p style={styles.myDetailsHeadingMobile}>
            No. of Multiplier drop prizes
          </p>
          <p style={styles.myDetailsDescriptionMobile}>4</p>
        </div>
        <div style={styles.myDetailsBorderMobile}></div>
        <div style={{ padding: 5 }}>
          <p style={styles.myDetailsHeadingMobile}>
            No. of Scatter drop prizes
          </p>
          <p style={styles.myDetailsDescriptionMobile}>2</p>
        </div>
      </div>

      <div>
        <p
          style={{
            ...styles.profileHeadlineMobile,
            ...{ marginTop: 15, marginBottom: -15 },
          }}
        >
          Tournament History
        </p>
        <div style={styles.tournamentHistoryCategoryContainerMobile}>
          <div
            onClick={() => changeState({ selected: "multiplierCashDrop" })}
            style={
              selected === "multiplierCashDrop"
                ? styles.thCategoryItemContainerSelectedMobile
                : styles.thCategoryItemContainerUnselectedMobile
            }
          >
            <p
              style={
                selected === "multiplierCashDrop"
                  ? {
                      ...styles.thItemTextSelectedMobile,
                      ...{ width: 260 },
                    }
                  : {
                      ...styles.thItemTextUnselectedMobile,
                      ...{ width: 260 },
                    }
              }
            >
              Multiplier Cash Drop History
            </p>
          </div>
          <div
            onClick={() => changeState({ selected: "rankingHistory" })}
            style={
              selected === "rankingHistory"
                ? styles.thCategoryItemContainerSelectedMobile
                : styles.thCategoryItemContainerUnselectedMobile
            }
          >
            <p
              style={
                selected === "rankingHistory"
                  ? {
                      ...styles.thItemTextSelectedMobile,
                      ...{ width: 260 },
                    }
                  : {
                      ...styles.thItemTextUnselectedMobile,
                      ...{ width: 260 },
                    }
              }
            >
              Fh Tournament Ranking History
            </p>
          </div>
          <div
            onClick={() => changeState({ selected: "scatterCashDrop" })}
            style={
              selected === "scatterCashDrop"
                ? styles.thCategoryItemContainerSelectedMobile
                : styles.thCategoryItemContainerUnselectedMobile
            }
          >
            <p
              style={
                selected === "scatterCashDrop"
                  ? {
                      ...styles.thItemTextSelectedMobile,
                      ...{ width: 260 },
                    }
                  : {
                      ...styles.thItemTextUnselectedMobile,
                      ...{ width: 260 },
                    }
              }
            >
              Scatter Cash Drop History
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
