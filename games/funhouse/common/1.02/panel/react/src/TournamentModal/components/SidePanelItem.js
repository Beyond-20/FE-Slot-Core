import { styles } from "../style.js";
import { isLandscape } from "./common/CommonFunction.js";
const imagePath = "../common/1.02/images";
const { useState } = React;
import { useCountdown } from "../../DailyWins/components/commonFunction/countDownHooks.js";

const SidePanelItem = ({
  selection,
  currentSelected,
  title1,
  title2,
  selectedMobile,
  size: { windowWidth, windowHeight },
  changeState,
  tournamentInfo,
  modalClosed,
}) => {
  const timeInMs = +new Date(
    (tournamentInfo && tournamentInfo.tournamentInfo.end_date) ||
      "2022-08-31T04:00:00.000Z"
  );
  const [selected, setSelected] = useState("tournamentTimer");
  const [selectedCategoryMobile, setSelectedCategoryMobile] = useState("prize");
  const [days, hours, minutes, seconds] = useCountdown(
    modalClosed ? new Date() : timeInMs
  );

  return (
    <div
      onClick={() => {
        setSelected(selection);
        changeState({
          selected: selection,
          selectedMobile: selection,
          selectedSidePanel: selection,
          selectedCategoryMobile: currentSelected,
          isSelected: true,
        });
      }}
      style={
        selection === currentSelected || selectedMobile === currentSelected
          ? windowWidth < 920
            ? {
                ...styles.sidePanelItemContainerSelectedMobile,
                ...{
                  width: isLandscape()
                    ? windowWidth / 3 - 15
                    : windowWidth * 0.9,
                  marginLeft: isLandscape() ? 10 : 0,
                },
              }
            : styles.sidePanelItemContainerSelected
          : windowWidth < 920
          ? {
              ...styles.sidePanelItemContainerUnselectedMobile,
              ...{
                width: isLandscape() ? windowWidth / 3 - 15 : windowWidth * 0.9,
                marginLeft: isLandscape() ? 10 : 0,
              },
            }
          : styles.sidePanelItemContainerUnselected
      }
    >
      <p
        style={
          selection === currentSelected ||
          selectedCategoryMobile === currentSelected
            ? windowWidth < 920
              ? styles.sidePanelItemTextSelectedMobile
              : styles.sidePanelItemTextSelected
            : windowWidth < 920
            ? styles.sidePanelItemTextUnselectedMobile
            : styles.sidePanelItemTextUnselected
        }
      >
        {title1} <br />
        {title2}
      </p>
      <div
        style={
          selection === currentSelected ||
          selectedCategoryMobile === currentSelected
            ? windowWidth < 920
              ? styles.timerContainerSelectedMobile
              : styles.timerContainerSelected
            : windowWidth < 920
            ? styles.timerContainerUnselectedMobile
            : styles.timerContainerUnselected
        }
      >
        <div
          style={
            windowWidth < 920
              ? styles.dailyWinsContainerMobile
              : styles.dailyWinsContainer
          }
        >
          <p
            style={
              windowWidth < 920
                ? styles.dailyWinsTextMobile
                : styles.dailyWinsText
            }
          >
            Daily Wins
          </p>
        </div>
        <img
          src={imagePath + "/Time-small-rectangle.png"}
          style={
            windowWidth < 920 ? styles.timeSmallImgMobile : styles.timeSmallImg
          }
        />

        <div
          style={windowWidth < 920 ? styles.timerItemMobile : styles.timerItem}
        >
          <p
            style={
              windowWidth < 920 ? styles.timerCountMobile : styles.timerCount
            }
          >
            {days}
          </p>
          <p
            style={
              windowWidth < 920 ? styles.timerTextMobile : styles.timerText
            }
          >
            Days
          </p>
        </div>
        <div
          style={windowWidth < 920 ? styles.timerItemMobile : styles.timerItem}
        >
          <p
            style={
              windowWidth < 920 ? styles.timerCountMobile : styles.timerCount
            }
          >
            {hours}
          </p>
          <p
            style={
              windowWidth < 920 ? styles.timerTextMobile : styles.timerText
            }
          >
            Hrs
          </p>
        </div>
        <div
          style={windowWidth < 920 ? styles.timerItemMobile : styles.timerItem}
        >
          <p
            style={
              windowWidth < 920 ? styles.timerCountMobile : styles.timerCount
            }
          >
            {minutes}
          </p>
          <p
            style={
              windowWidth < 920 ? styles.timerTextMobile : styles.timerText
            }
          >
            Mins
          </p>
        </div>
        <div
          style={windowWidth < 920 ? styles.timerItemMobile : styles.timerItem}
        >
          <p
            style={
              windowWidth < 920 ? styles.timerCountMobile : styles.timerCount
            }
          >
            {seconds}
          </p>
          <p
            style={
              windowWidth < 920 ? styles.timerTextMobile : styles.timerText
            }
          >
            Secs
          </p>
        </div>
      </div>
    </div>
  );
};

export default SidePanelItem;
