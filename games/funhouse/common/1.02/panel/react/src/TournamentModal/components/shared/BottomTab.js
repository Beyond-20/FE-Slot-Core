import { styles } from "../../style.js";
const { useEffect, useState } = React;
const imagePath = "../common/1.02/images";

const BottomTab = (props) => {
  const [selectedCategory, setSelectedCategory] = useState("prizes");
  const { selectedTab, changeState } = props;
  return (
    <div style={styles.bottomTabContainerMobile}>
      <div
        onClick={() => {
          setSelectedCategory("prizes");
          changeState({ selectedCategory: "prizes" });
        }}
        style={
          selectedCategory === "prizes"
            ? styles.bottomCategorySelectedIcon
            : styles.bottomCategoryUnselectedIcon
        }
      >
        <img src={imagePath + "/Medal_Icon.png"} style={styles.bottomIcon} />
        <p style={styles.bottomCategoryText}>prizes</p>
      </div>
      <div
        onClick={() => {
          setSelectedCategory("winners");
          changeState({ selectedCategory: "winners" });
        }}
        style={
          selectedCategory === "winners"
            ? styles.bottomCategorySelectedIcon
            : styles.bottomCategoryUnselectedIcon
        }
      >
        <img src={imagePath + "/Crown_Icon.png"} style={styles.bottomIcon} />
        <p style={styles.bottomCategoryText}>winners</p>
      </div>
      <div
        onClick={() => {
          setSelectedCategory("rules");
          changeState({ selectedCategory: "rules" });
        }}
        style={
          selectedCategory === "rules"
            ? styles.bottomCategorySelectedIcon
            : styles.bottomCategoryUnselectedIcon
        }
      >
        <img src={imagePath + "/Rules_Icon.png"} style={styles.bottomIcon} />
        <p style={styles.bottomCategoryText}>rules</p>
      </div>

      <div
        onClick={() => {
          setSelectedCategory("profile");
          changeState({ selectedCategory: "profile" });
        }}
        style={
          selectedCategory === "profile"
            ? styles.bottomCategorySelectedIcon
            : styles.bottomCategoryUnselectedIcon
        }
      >
        <img src={imagePath + "/Avater.png"} style={styles.bottomIcon} />
        <p style={styles.bottomCategoryText}>profile</p>
      </div>
    </div>
  );
};

export default BottomTab;
