import { styles } from "../../style.js";

const SelectionBar = (props) => {
  const { selected } = props;
  return (
    <div style={styles.selectionDivContainer}>
      <div
        style={{
          backgroundColor: "#55607A80",
          height: 144,
          marginTop:
            selected === "tournamentTimer"
              ? 15
              : selected === "multiplierCashDrop"
              ? 173
              : 332,
        }}
      ></div>
    </div>
  );
};

export default SelectionBar;
