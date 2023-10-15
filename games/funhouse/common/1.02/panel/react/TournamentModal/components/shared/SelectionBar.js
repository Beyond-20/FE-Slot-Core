import { styles } from "../../style.js";

var SelectionBar = function SelectionBar(props) {
  var selected = props.selected;

  return React.createElement(
    "div",
    { style: styles.selectionDivContainer },
    React.createElement("div", {
      style: {
        backgroundColor: "#55607A80",
        height: 144,
        marginTop: selected === "tournamentTimer" ? 15 : selected === "multiplierCashDrop" ? 173 : 332
      }
    })
  );
};

export default SelectionBar;