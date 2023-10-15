import { styles } from "../../style.js";
import { hideId } from "../common/CommonFunction.js";
var imagePath = "../common/1.02/images";
var ProfileDetails = function ProfileDetails(props) {
  var selected = props.selected,
      changeState = props.changeState,
      playerData = props.playerData;

  console.log("playerData", playerData);
  return React.createElement(
    "div",
    null,
    React.createElement(
      "p",
      { style: styles.profileHeadlineMobile },
      "My Details"
    ),
    React.createElement(
      "div",
      { style: styles.profileCardContainer },
      React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }
          },
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }
            },
            React.createElement("img", {
              src: imagePath + "/Avater_Ellipse.png",
              style: Object.assign({}, styles.avaterEllipse, { height: 80, width: 80 })
            }),
            React.createElement("img", {
              src: imagePath + "/chinaFlag.png",
              style: Object.assign({}, styles.profileFlag, { marginTop: -50 })
            })
          ),
          React.createElement(
            "div",
            {
              style: {
                height: 100,
                justifyContent: "space-between",
                display: "flex",
                flexDirection: "column"
              }
            },
            React.createElement(
              "p",
              { style: styles.myDetailsDescriptionMobile },
              playerData && playerData.player_id ? hideId(playerData.player_id) : "_"
            ),
            React.createElement(
              "div",
              null,
              React.createElement(
                "p",
                { style: styles.myDetailsHeadingMobile },
                "Total Wager"
              ),
              React.createElement(
                "p",
                { style: styles.myDetailsDescriptionMobile },
                "RM12.00"
              )
            )
          )
        )
      ),
      React.createElement("div", { style: styles.myDetailsBorderMobile }),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 5
          }
        },
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column"
              // alignItems: "center",
            }
          },
          React.createElement(
            "p",
            { style: styles.myDetailsHeadingMobile },
            "Ranking"
          ),
          React.createElement(
            "p",
            { style: styles.myDetailsDescriptionMobile },
            playerData && playerData.data && playerData.data.rank || "_"
          )
        ),
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }
          },
          React.createElement(
            "p",
            { style: styles.myDetailsHeadingMobile },
            "Total Score"
          ),
          React.createElement(
            "p",
            { style: styles.myDetailsDescriptionMobile },
            "RM12.00"
          )
        )
      ),
      React.createElement("div", { style: styles.myDetailsBorderMobile }),
      React.createElement(
        "div",
        { style: { padding: 5 } },
        React.createElement(
          "p",
          { style: styles.myDetailsHeadingMobile },
          "No. of Multiplier drop prizes"
        ),
        React.createElement(
          "p",
          { style: styles.myDetailsDescriptionMobile },
          "4"
        )
      ),
      React.createElement("div", { style: styles.myDetailsBorderMobile }),
      React.createElement(
        "div",
        { style: { padding: 5 } },
        React.createElement(
          "p",
          { style: styles.myDetailsHeadingMobile },
          "No. of Scatter drop prizes"
        ),
        React.createElement(
          "p",
          { style: styles.myDetailsDescriptionMobile },
          "2"
        )
      )
    ),
    React.createElement(
      "div",
      null,
      React.createElement(
        "p",
        {
          style: Object.assign({}, styles.profileHeadlineMobile, { marginTop: 15, marginBottom: -15 })
        },
        "Tournament History"
      ),
      React.createElement(
        "div",
        { style: styles.tournamentHistoryCategoryContainerMobile },
        React.createElement(
          "div",
          {
            onClick: function onClick() {
              return changeState({ selected: "multiplierCashDrop" });
            },
            style: selected === "multiplierCashDrop" ? styles.thCategoryItemContainerSelectedMobile : styles.thCategoryItemContainerUnselectedMobile
          },
          React.createElement(
            "p",
            {
              style: selected === "multiplierCashDrop" ? Object.assign({}, styles.thItemTextSelectedMobile, { width: 260 }) : Object.assign({}, styles.thItemTextUnselectedMobile, { width: 260 })
            },
            "Multiplier Cash Drop History"
          )
        ),
        React.createElement(
          "div",
          {
            onClick: function onClick() {
              return changeState({ selected: "rankingHistory" });
            },
            style: selected === "rankingHistory" ? styles.thCategoryItemContainerSelectedMobile : styles.thCategoryItemContainerUnselectedMobile
          },
          React.createElement(
            "p",
            {
              style: selected === "rankingHistory" ? Object.assign({}, styles.thItemTextSelectedMobile, { width: 260 }) : Object.assign({}, styles.thItemTextUnselectedMobile, { width: 260 })
            },
            "Fh Tournament Ranking History"
          )
        ),
        React.createElement(
          "div",
          {
            onClick: function onClick() {
              return changeState({ selected: "scatterCashDrop" });
            },
            style: selected === "scatterCashDrop" ? styles.thCategoryItemContainerSelectedMobile : styles.thCategoryItemContainerUnselectedMobile
          },
          React.createElement(
            "p",
            {
              style: selected === "scatterCashDrop" ? Object.assign({}, styles.thItemTextSelectedMobile, { width: 260 }) : Object.assign({}, styles.thItemTextUnselectedMobile, { width: 260 })
            },
            "Scatter Cash Drop History"
          )
        )
      )
    )
  );
};

export default ProfileDetails;