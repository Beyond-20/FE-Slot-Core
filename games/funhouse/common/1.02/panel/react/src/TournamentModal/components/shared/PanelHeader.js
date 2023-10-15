import fonts from "../../../constants/constants.js";
import { styles } from "../../style.js";
const imagePath = "../common/1.02/images";
const { useState } = React;

import {
  isLandscape,
  isMobile,
  isRootLevelCategory,
} from "../common/CommonFunction.js";
const PanelHeader = (props) => {
  let { changeState, title, changeStateMobile } = props;
  const style = {
    fontSize: fonts.mHeading,
    textTransform: "uppercase",
    textAlign: "center",
  };
  return (
    <div style={styles.prizeHeaderMobile}>
      {!isRootLevelCategory(title.split(" ")[0]) ? (
        <img
          src={imagePath + "/Back.png"}
          style={styles.backButtonMobile}
          onClick={() =>
            changeStateMobile({ isSelected: false, selectedCategory: "prizes" })
          }
        />
      ) : (
        <div style={{ width: "50px" }}></div>
      )}
      {isLandscape() ? (
        <div style={{ display: "flex", flexFlow: "column nowrap" }}>
          {title === "Profile" ? (
            <div style={style}>{title}</div>
          ) : (
            !isRootLevelCategory(title.split(" ")[0]) && (
              <div style={{ ...style, ...{ fontSize: 16 } }}>
                {title.split(" ")[0] +
                  " " +
                  title.split(" ")[1] +
                  " " +
                  title.split(" ")[2]}
              </div>
            )
          )}
        </div>
      ) : (
        <div style={{ display: "flex", flexFlow: "column nowrap" }}>
          <div style={style}>{title.split(" ")[0]}</div>

          {!isRootLevelCategory(title.split(" ")[0]) && (
            <div style={style}>
              {title.split(" ")[1] + " " + title.split(" ")[2]}
            </div>
          )}
        </div>
      )}
      <div
        style={
          title === "Prizes"
            ? { ...styles.closeButtonMobile, paddingRight: 0 }
            : styles.closeButtonMobile
        }
        onClick={() => window.tournamentModalCloseBtnClicked()}
      >
        X
      </div>
    </div>
  );
};

export default PanelHeader;
