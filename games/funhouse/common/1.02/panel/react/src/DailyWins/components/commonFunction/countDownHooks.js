const { useState, useEffect } = React;

const useCountdown = (targetDate) => {
  if (targetDate < new Date()) {
    return [0, 0, 0, 0];
  }
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  let interval;
  useEffect(() => {
    interval = setInterval(() => {
      let diff = new Date(targetDate) - new Date();
      if (diff > 0) {
        setCountDown(countDownDate - new Date().getTime());
      } else clearInterval(interval);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

export { useCountdown };
