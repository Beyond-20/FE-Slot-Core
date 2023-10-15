import { COLORS } from "../constants/Colors.js";
import { isLandscape } from "./components/common/CommonFunction.js";
import fonts from "../constants/constants.js";
export var styles = {
  main: {
    backgroundColor: "#000000BF",
    height: window.innerHeight,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    display: "flex",
    height: window.innerHeight * 0.82,
    width: "70%",
    maxHeight: 670,
    maxWidth: 1100,
    minWidth: 600,
    borderRadius: 6,
    flexDirection: "column",
    backgroundImage: "url('../common/1.02/images/tournamentPanel_C.png')",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    paddingBottom: 15
  },
  tournamentText: {
    color: "#55607A",
    marginTop: 15,
    fontSize: 14,
    marginRight: 5,
    textTransform: "uppercase",
    fontFamily: "Exo2, sans-serif",
    fontWeight: "700"
  },
  closeBtn: {
    color: "#55607A",
    marginTop: 15,
    fontSize: 18,
    marginRight: 25
  },
  closeBtnHover: {
    color: "#55607A",
    marginTop: 15,
    fontSize: 18,
    marginRight: 25,
    cursor: "pointer"
  },
  avater: {
    marginLeft: 25,
    marginTop: -25,
    height: 80,
    width: 70,
    borderRadius: 6,
    zIndex: 1,
    cursor: "pointer"
  },
  categoryContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    width: 600,
    justifyContent: "space-around",
    paddingBottom: 15
  },
  categoryContainerProfile: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    width: 600,
    justifyContent: "space-around",
    marginTop: 25
  },
  categoryImg: {
    width: 40,
    borderRadius: 6
  },
  categoryRules: {
    width: 45,
    borderRadius: 6
  },
  categoryBorder: {
    width: 1.5,
    height: "80%",
    display: "flex",
    alignSelf: "center",
    backgroundColor: "#7E8145"
  },
  categoryItemName: {
    fontFamily: "Exo2 , sans-serif",
    fontWeight: 700,
    fontSize: 16,
    color: "#fdecdc",
    textTransform: "uppercase"
  },
  categoryItemNameSelected: {
    fontFamily: "Exo2 , sans-serif",
    fontWeight: 700,
    fontSize: 16,
    color: COLORS.blue,
    textTransform: "uppercase"
  },
  categorySelected: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    backgroundColor: "#55607A80",
    height: 100,
    width: 120,
    border: "1px solid #ac922e"
  },
  categoryUnselected: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    width: 120,
    cursor: "pointer"
  },
  prizesContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    // marginTop: 20,
    // height: window.innerHeight * 0.82 - 220,
    overflowY: "scroll",
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto"
  },
  sidePanelContainer: {
    display: "flex",
    flexDirection: "column"
  },
  sidePanelItemContainerUnselected: {
    display: "flex",
    flexDirection: "column",
    // height: 150,
    width: 220,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    backgroundColor: "#55607A4D",
    marginTop: 15,
    border: "1px solid #55607A80",
    cursor: "pointer",
    paddingBottom: 15
  },
  sidePanelItemContainerSelected: {
    display: "flex",
    flexDirection: "column",
    // height: 150,
    width: 220,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    backgroundColor: "#55607A80",
    marginTop: 15,
    borderLeft: "1px solid #55607A80",
    borderTop: "1px solid #55607A80",
    borderBottom: "1px solid #55607A80",
    borderRight: "none",
    cursor: "pointer",
    paddingBottom: 15
  },
  sidePanelItemTextUnselected: {
    fontFamily: "Exo2, sans-serif",
    fontWeight: "700",
    fontSize: 16,
    color: COLORS.purple,
    textTransform: "uppercase",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 1.2
  },
  sidePanelItemTextSelected: {
    fontFamily: "Exo2, sans-serif",
    fontWeight: "700",
    fontSize: 16,
    color: COLORS.blue,
    textTransform: "uppercase",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 1.2
  },
  timerContainerUnselected: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    margin: "auto",
    marginTop: 20,
    width: "85%",
    height: 60,
    borderRadius: 6,
    backgroundColor: "#55607A80",
    border: "1.5px solid #55607A80",
    justifyContent: "space-around",
    alignItems: "flex-end"
  },
  timerContainerSelected: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    margin: "auto",
    marginTop: 20,
    width: "85%",
    height: 60,
    borderRadius: 6,
    backgroundImage: "url('../common/1.02/images/selectedTournament.png')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    border: "1.5px solid #55607A80",
    justifyContent: "space-around",
    alignItems: "flex-end"
  },
  timerItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  timerCount: {
    fontSize: 18,
    color: "#fdecdc",
    marginTop: 2
  },
  timerText: {
    fontSize: 12,
    color: "#d2a425"
  },
  timeSmallImg: {
    display: "flex",
    height: 20,
    width: 60,
    borderRadius: 6,
    position: "absolute",
    marginTop: -10,
    alignSelf: "flex-start"
  },
  dailyWinsContainer: {
    display: "flex",
    height: 35,
    width: 35,
    borderRadius: 17.5,
    position: "absolute",
    marginTop: -15,
    marginLeft: -170,
    alignSelf: "flex-start",
    backgroundImage: "url('../common/1.02/images/DailyWins.png')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    transform: "rotate(-20deg)",
    alignItems: "center",
    justifyContent: "center"
  },
  dailyWinsText: {
    fontSize: 9,
    color: "#802a8c",
    textAlign: "center",
    lineHeight: 0.9,
    textTransform: "uppercase"
  },
  bodyContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "10px 25px 10px 20px",
    marginTop: 15,
    height: 462,
    width: "75%",
    overflowY: "scroll",
    backgroundColor: "#55607A80",
    borderRadius: 6
  },
  selectionDivContainer: {
    display: "flex",
    flexDirection: "column",
    overflowY: scroll,
    width: 15,
    height: 495
  },
  prizeGivewayTable: {
    display: "flex",
    flexDirection: "row",
    width: 300,
    borderRadius: 6,
    marginTop: 5,
    border: "2px solid #55607A"
  },
  tableHead: {
    backgroundColor: "#55607A",
    color: "#f9be0d",
    fontFamily: "Exo2, sans-serif",
    fontWeight: 700,
    textAlign: "center"
  },
  paragraph: {
    color: "#fdecdc",
    fontSize: fonts.dParagraph,
    fontWeight: "400",
    fontFamily: "Lato, sans-serif",
    marginTop: 5,
    lineHeight: 1.3
  },
  headline: {
    color: "#f9be0d",
    marginTop: 20,
    fontFamily: "Lato, sans-serif",
    fontSize: fonts.mTableHeading,
    fontWeight: 400,
    background: "none"
  },
  scoringExampleTable: {
    display: "flex",
    flexDirection: "row",
    // width: 650,
    borderRadius: 6,
    marginTop: 5,
    marginBottom: 10,
    border: "2px solid #55607A"
  },
  prizeAllocationTable: {
    display: "flex",
    flexDirection: "row",
    // width: 450,
    borderRadius: 6,
    marginTop: 5,
    border: "2px solid #55607A"
  },
  prizeTableHeadlineContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#55607A80",
    padding: "10px 0px 10px 0px"
  },
  prizeHeadlineItemContainer: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    display: "flex",
    fontSize: fonts.dSubHeading
  },
  prizeTournamentTable: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    borderRadius: 6,
    border: "2px solid #55607A"
  },
  tableHeadTournament: {
    backgroundColor: "#55607A",
    color: "#f9be0d",
    fontFamily: "Lato, sans-serif",
    fontWeight: 700,
    fontSize: 18,
    textAlign: "center",
    padding: "10px 0px 10px 0px"
  },
  profileHeading: {
    fontSize: 24,
    color: "#fce9af",
    textTransform: "uppercase",
    fontWeight: "500",
    marginTop: 20
  },
  profileBackBtn: {
    height: 30,
    width: 30
  },
  profileBackBtnContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginLeft: 30,
    position: "absolute",
    cursor: "pointer"
  },
  profileContainer: {
    padding: "20px",
    height: window.innerHeight * 0.82 - 220,
    overflowY: "scroll",
    width: "100%"
  },
  profileHeadline: {
    fontSize: 14,
    color: "#fce9af",
    textTransform: "uppercase",
    fontWeight: "700",
    marginLeft: 20
  },
  myDetailsContainer: {
    display: "flex",
    flexDirection: "row",
    height: 120,
    width: "100%",
    borderRadius: 6,
    marginTop: 10,
    marginBottom: 40,
    backgroundColor: "#55607A4D",
    border: "2px solid #55607A",
    alignSelf: "center",
    justifyContent: "space-between"
  },
  myDetailsItemContainer: {
    display: "flex",
    // width: "33%",
    paddingRight: 5,
    height: "100%",
    alignItems: "center"
  },
  myDetailsBorder: {
    width: 1,
    height: "70%",
    display: "flex",
    alignSelf: "center",
    backgroundColor: "#55607A"
  },
  avaterEllipse: {
    height: 100,
    width: 100,
    marginLeft: 10
  },
  profileFlag: {
    height: 40,
    width: 50,
    marginLeft: -20
  },
  myDetailsHeading: {
    fontSize: 14,
    color: "#f9be0d",
    fontFamily: "Lato, sans-serif",
    fontWeight: "400"
  },
  myDetailsDescription: {
    fontSize: 18,
    color: "#fdecdc",
    fontFamily: "Lato, sans-serif",
    fontWeight: "700"
  },
  tournamentHistoryCategoryContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    alignSelf: "center",
    marginTop: 15
  },
  thCategoryItemContainerSelected: {
    backgroundColor: "#55607A80",
    padding: "8px 30px",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderTop: "2px solid #55607A",
    borderLeft: "2px solid #55607A",
    borderRight: "2px solid #55607A"
  },
  thCategoryItemContainerUnselected: {
    padding: "8px 30px",
    cursor: "pointer"
  },
  thItemTextSelected: {
    color: "#fdecdc",
    fontSize: 14,
    fontFamily: "Lato, sans-serif",
    fontWeight: "400"
  },
  thItemTextUnselected: {
    color: "#caa6ff",
    borderBottom: "1px solid #caa6ff",
    fontSize: 14,
    fontFamily: "Lato, sans-serif",
    fontWeight: "400"
  },
  tournamentHistoryTable: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    borderRadius: 6,
    border: "2px solid #55607A"
  },
  tableHeadProfile: {
    backgroundColor: "#55607A",
    color: "#f9be0d",
    fontFamily: "Lato, sans-serif",
    fontWeight: 700,
    fontSize: fonts.mTableRow,
    textTransform: "uppercase",
    textAlign: "center",
    padding: "10px 0px 10px 0px"
  },

  profileLogoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%"
  },

  /// **************all mobile styles*************** ///

  mainMobile: {
    position: "relative",
    backgroundColor: "#000000CC",
    height: window.innerHeight,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    overflowY: "scroll"
  },
  prizesContainerMobile: {
    position: "relative",
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  containerMobile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "96%"
  },
  prizeHeaderMobile: {
    backgroundColor: "#000000",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: "10px 15px 10px 10px",
    color: "#FFE9AF",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1
  },
  backButtonMobile: {
    height: 30,
    width: 30,
    cursor: "pointer"
  },
  closeButtonMobile: {
    color: COLORS.purple,
    fontSize: 22,
    cursor: "pointer"
  },
  sidePanelItemContainerUnselectedMobile: {
    display: "flex",
    flexDirection: "column",

    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    backgroundColor: "#55607A80",
    marginTop: 15,
    border: "1px solid #55607A80",
    cursor: "pointer",
    paddingBottom: "20px"
  },
  sidePanelItemContainerSelectedMobile: {
    display: "flex",
    flexDirection: "column",

    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    backgroundColor: "#55607AB3",
    marginTop: 15,
    border: "1px solid #55607A80",
    cursor: "pointer",
    paddingBottom: "20px"
  },
  sidePanelItemTextSelectedMobile: {
    fontSize: "calc(18px + .3vw",
    color: COLORS.blue,
    textTransform: "uppercase",
    textAlign: "center",
    marginTop: 15,
    lineHeight: 1.3
  },
  sidePanelItemTextUnselectedMobile: {
    fontSize: "calc(18px + .3vw",
    color: COLORS.purple,
    textTransform: "uppercase",
    textAlign: "center",
    marginTop: 15,
    lineHeight: 1.2
  },
  timerContainerUnselectedMobile: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    margin: "auto",
    marginTop: 20,
    width: "85%",
    height: 80,
    borderRadius: 16,
    backgroundColor: "#55607A80",
    border: "1.5px solid #55607A80",
    justifyContent: "space-around",
    alignItems: "flex-end"
  },
  timerContainerSelectedMobile: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    margin: "auto",
    marginTop: 20,
    width: "85%",
    height: 80,
    borderRadius: 16,
    backgroundImage: "url('../common/1.02/images/selectedTournament.png')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    border: "1.5px solid #55607A80",
    justifyContent: "space-around",
    alignItems: "flex-end"
  },
  dailyWinsContainerMobile: {
    position: "absolute",
    display: "flex",
    height: 50,
    width: 50,
    borderRadius: 17.5,
    left: -10,
    top: -20,
    alignSelf: "flex-start",
    backgroundImage: "url('../common/1.02/images/DailyWins.png')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    transform: "rotate(-20deg)",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "box-shadow: 6px 8px 5px 0px rgba(0,0,0,0.75)\n    -webkit-box-shadow: 6px 8px 5px 0px rgba(0,0,0,0.75)\n    -moz-box-shadow: 6px 8px 5px 0px rgba(0,0,0,0.75)"
  },
  dailyWinsTextMobile: {
    fontSize: "12px",
    color: "#802a8c",
    textAlign: "center",
    lineHeight: 0.9,
    textTransform: "uppercase"
  },
  timeSmallImgMobile: {
    display: "flex",
    height: 30,
    width: 90,
    borderRadius: 10,
    position: "absolute",
    marginTop: -15,
    alignSelf: "flex-start"
  },
  timerItemMobile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  timerCountMobile: {
    fontSize: 20,
    color: "#fdecdc",
    marginTop: 0
  },
  timerTextMobile: {
    fontSize: 14,
    color: "#d2a425"
  },
  sidePanelContainerMobile: {
    display: "flex",
    flexDirection: "column",
    marginTop: 30,
    paddingBottom: 70
  },
  // bottom tab
  bottomTabContainerMobile: {
    backgroundColor: "#525F80",
    height: 65,
    display: "flex",
    position: "fixed",
    bottom: 0,
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    color: "white"
  },

  bottomIcon: {
    height: 30,
    width: 26,
    cursor: "pointer"
  },
  bottomCategoryText: {
    textTransform: "uppercase",
    color: COLORS.yellow,
    fontSize: 10
  },
  bottomCategorySelectedIcon: {
    height: 55,
    width: 60,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    backgroundColor: "#545964",
    border: "2px solid #CC921C",
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 3
  },
  bottomCategoryUnselectedIcon: {
    height: 55,
    width: 60,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 3
  },

  bodyContainerMobile: {
    marginTop: 75,
    display: "flex",
    flexDirection: "column",
    // padding: "10px 20px 10px 20px",
    width: "100%",
    overflowY: "scroll",
    backgroundColor: "#55607A80",
    borderRadius: 6
    // justifyContent: "center"
  },
  prizeTableHeadlineContainerMobile: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    fontSize: "calc(16px+.3vw)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#55607A80"
    // padding: "20px 0px 20px 0px",
  },
  prizeHeadlineItemContainerMobile: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    display: "flex",
    fontSize: "20px"
  },
  tableHeadTournamentMobile: {
    backgroundColor: "#55607A",
    color: "#f9be0d",
    fontFamily: "Lato, sans-serif",
    fontWeight: 700,
    fontSize: fonts.mParagraph,
    minWidth: 100,
    textAlign: "center"
    // padding: "20px 0px 20px 0px",
  },

  //mobile profile

  profileContainerMobile: {
    display: "flex",
    flexDirection: "column",
    overflowY: "scroll",
    width: "100%",
    marginTop: 20
  },

  profileLogoContainerMobile: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%"
  },
  myDetailsContainerMobile: {
    display: "flex",
    flexDirection: "row",
    height: 120,
    width: "100%",
    borderRadius: 6,
    marginTop: 10,
    marginBottom: 40,
    backgroundColor: "#55607A4D",
    border: "2px solid #55607A",
    alignSelf: "center",
    justifyContent: "space-between"
  },
  myDetailsItemContainerMobile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  profileHeadlineMobile: {
    fontSize: 16,
    color: "#fce9af",
    textTransform: "uppercase",
    fontFamily: "Lato, sans-serif",
    fontWeight: "700",
    // marginLeft: 20,
    marginBottom: 10
  },
  myDetailsBorderMobile: {
    display: "flex",
    flexDirection: "row",
    height: 5,
    width: "100%",
    backgroundColor: "#484C53",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 50
  },
  myDetailsHeadingMobile: {
    fontSize: fonts.mParagraph,
    color: "#f9be0d",
    fontFamily: "Lato, sans-serif",
    fontWeight: "400"
  },
  myDetailsDescriptionMobile: {
    fontSize: 18,
    color: "#fdecdc",
    fontFamily: "Lato, sans-serif",
    fontWeight: "700"
  },
  profileCardContainer: {
    backgroundColor: "#55607A80",
    padding: 5,
    borderRadius: 15,
    border: "5px solid #4D5976"
  },
  tournamentHistoryCategoryContainerMobile: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    overflowX: "scroll",
    overflowY: "hidden",
    marginTop: 15
  },
  thCategoryItemContainerSelectedMobile: {
    backgroundColor: "#55607A80",
    borderRadius: 15,
    border: "2px solid #55607A",
    padding: "5px",
    marginRight: "10px",
    textAlign: "center"
  },
  thCategoryItemContainerUnselectedMobile: {
    borderRadius: 15,
    padding: "5px",
    cursor: "pointer",
    border: "2px solid #55607A",
    marginRight: "10px",
    textAlign: "center"
  },
  thItemTextSelectedMobile: {
    color: "#fdecdc",
    textAlign: "center",
    fontSize: fonts.mParagraph,
    fontFamily: "Lato, sans-serif",
    fontWeight: "400"
  },
  thItemTextUnselectedMobile: {
    textAlign: "center",
    color: "#caa6ff",
    textDecoration: "underline",
    fontSize: fonts.mParagraph,
    fontFamily: "Lato, sans-serif",
    fontWeight: "400"
  },
  headlineMobile: {
    color: "#f9be0d",
    marginTop: 20,
    fontFamily: "Lato, sans-serif",
    fontSize: fonts.mTableRow,
    fontWeight: 400,
    background: "none",
    paddingTop: 10,
    paddingBottom: 10
  }
};