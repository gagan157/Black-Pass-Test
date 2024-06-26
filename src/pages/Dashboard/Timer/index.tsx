import { Button } from "components/Atoms/Button/Button";
import { Typography } from "components/Atoms/Typography/Typography";
import { SpinnerModal } from "components/Molecules/PopUp/Spinner";
import { ENV } from "constants/config";
import { EventButtonNames, trackButtonClick } from "constants/cookie3";
import { useUser } from "context/userContext";
import React, { useEffect, useState } from "react";

type Countdown = {
  hours: number;
  minutes: number;
  seconds: number;
};

export const Timer = ({isBonusRewardTab , handleDailyReward} : {isBonusRewardTab?: boolean; handleDailyReward:()=>void;}) => {
  const { user } = useUser();
  const [countdown, setCountdown] = useState<Countdown>({
    hours: -1,
    minutes: -1,
    seconds: -1,
  });
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    let intervalId: any;
    const updateCountdown = () => {
      if (user) {
        const currentTimeInSeconds = Math.floor(Date.now() / 1000);
        const lastSpinTime = user?.DailySpinActivity?.last_spin || 0;
        const timeSinceLastSpin = currentTimeInSeconds - lastSpinTime;
        const nextSpinAvailableIn = 86400 - timeSinceLastSpin;

        if (nextSpinAvailableIn > 0) {
          setCountdown({
            hours: Math.floor(nextSpinAvailableIn / 3600),
            minutes: Math.floor((nextSpinAvailableIn % 3600) / 60),
            seconds: nextSpinAvailableIn % 60,
          });
        } else {
          setCountdown({ hours: 0, minutes: 0, seconds: 0 });
          clearInterval(intervalId)
          return;
        }
      };
    }
    updateCountdown();
    intervalId = setInterval(updateCountdown, 1000);
    return () => clearInterval(intervalId);
  }, [user]);

  return (
    <>
      {countdown.hours === -1 &&
        countdown.minutes === -1 &&
        countdown.seconds === -1 ? null : countdown.hours === 0 &&
          countdown.minutes === 0 &&
          countdown.seconds === 0 ? (
        <div className="group hover:drop-shadow-primary  ">
          <Button
            onClick={() => {
            setShowSpinner(true)
            trackButtonClick(EventButtonNames.SPIN_THE_WHEEL, user?.id);
            }}
            isBorder={true}
            bgColor={true}
            isBorderLabel="spin the wheel"
            color="white"
            CLASSNAME=" text-text-primary group-hover:text-text-secondary px-2 mobile:ml-1"
          />
        </div>
      ) : (
        // <div className="grid grid-cols-5 md:float-end md:w-3/4 md:space-x-1 px-1">
        <div className="flex items-center justify-end gap-[.20rem]">
          <div className="grid place-content-center place-items-center leading-6">
            <Typography isIcon={false} variant="p">
              {countdown.hours.toString().padStart(2, "0")}
            </Typography>
            <Typography isIcon={false} variant="customp">
              HRS
            </Typography>
          </div>
          <div>:</div>
          <div className="grid place-content-center place-items-center leading-6">
            <Typography isIcon={false} variant="p">
              {countdown.minutes.toString().padStart(2, "0")}
            </Typography>
            <Typography isIcon={false} variant="customp">
              MIN
            </Typography>
          </div>
          <div>:</div>
          <div className="grid place-content-center place-items-center leading-6">
            <Typography isIcon={false} variant="p">
              {countdown.seconds.toString().padStart(2, "0")}
            </Typography>
            <Typography isIcon={false} variant="customp">
              SEC
            </Typography>
          </div>
        </div>
      )}

      {showSpinner && (
        <SpinnerModal rewardTab={isBonusRewardTab} handleDailyReward={handleDailyReward} closeSpinner={() => setShowSpinner(false)} />
      )}
    </>
  );
};