const imagePath = "../common/1.02/images";
const { useEffect } = React;
import { useCountdown } from "../commonFunction/countDownHooks.js";

export default function Timer({ tournament_info, closedModal }) {
  const timeInMs = +new Date(
    (tournament_info && tournament_info.end_date) || "2022-08-31T04:00:00.000Z"
  );

  const [days, hours, minutes, seconds] = useCountdown(
    closedModal ? new Date() : timeInMs
  );

  return (
    <div className="dw-timer-container" style={{ height: 70, width: "80%" }}>
      <img
        className="dw-ends-in"
        src={imagePath + "/Time-small-rectangle.png"}
        alt="endsIn"
      />

      <div className="dw-timer-details">
        <p className="dw-timer-value">{days}</p>
        <p className="dw-timer-text">Days</p>
      </div>
      <div className="dw-timer-details">
        <p className="dw-timer-value">{hours}</p>
        <p className="dw-timer-text">Hrs</p>
      </div>
      <div className="dw-timer-details">
        <p className="dw-timer-value">{minutes}</p>
        <p className="dw-timer-text">Mins</p>
      </div>
      <div className="dw-timer-details">
        <p className="dw-timer-value">{seconds}</p>
        <p className="dw-timer-text">Secs</p>
      </div>
    </div>
  );
}
