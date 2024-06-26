import React, { useEffect, useState } from "react";
import { Modal } from "../Modal";
import { Card } from "components/Atoms/Card/Card";
import { Typography } from "components/Atoms/Typography/Typography";
import { CancleIcon, Line, TwitterLogo } from "assets";
import useBlur from "hooks/useBlur";
import { Images } from "assets/Images";
import { Button } from "components/Atoms/Button/Button";
import { POST_DAILY_SPIN } from "services/apiService";
import { useCustomError } from "hooks/accessTokenExpire";
import { Link } from "react-router-dom";
import { useGetUserDetails } from "hooks/usegetUserDetails";
import { useGetDashboardMatrics } from "hooks/usegetDashboardMatrics";
import { useDailySpinReward } from "hooks/useDailySpinRewards";

interface SpinnerProps {
  closeSpinner: () => void;
  rewardTab?:boolean;
  handleDailyReward: ()=>void;
}
interface SpinnerState {
  reward: { rotationDeg: number; shardPrize: number } | null;
  isSpinning: boolean;
  showReward: boolean;
}

export const SpinnerModal = ({ closeSpinner , rewardTab, handleDailyReward }: SpinnerProps) => {
  const [spinnerState, setSpinnerState] = useState<SpinnerState>({
    reward: null,
    isSpinning: false,
    showReward: false,
  });
  const { handleError } = useCustomError();
  const {getUserDetails} = useGetUserDetails();
  const { getDashboardMarics } = useGetDashboardMatrics();

  const getRandomNumberInRange = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getPrize = (shards: number) => {
    const prizeRanges: { [key: number]: [number, number] } = {
      0: [55, 102],
      1: [1, 52],
      3: [310, 355],
      5: [256, 300],
      10: [208, 250],
      20: [160, 200],
      50: [108, 152],
    };
    const [min, max] = prizeRanges[shards] || [0, 0];
    return {
      rotationDeg: getRandomNumberInRange(min, max),
      shardPrize: shards,
    };
  };

  const PostDailySpin = async () => {
    try {
      setSpinnerState((prevState) => ({ ...prevState, isSpinning: true }));
      const res = await POST_DAILY_SPIN();
      if (res.status === 201) {
        setSpinnerState((prevState) => ({
          ...prevState,
          reward: getPrize(res.data.shards),
        }));
        getUserDetails()
        getDashboardMarics()
        rewardTab && handleDailyReward()
      }
    } catch (error: any) {
      handleError(error);
      setSpinnerState((prevState) => ({ ...prevState, isSpinning: false }));
    }
  };

  useEffect(() => {
    if (spinnerState.reward) {
      const timer = setTimeout(() => {
        setSpinnerState((prevState) => ({ ...prevState, showReward: true }));
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [spinnerState.reward]);

  const Text = `Thanks to the $RVV Daily Spin, I'm ${spinnerState.reward?.shardPrize} shards closer to retirement! blackpass.astranova.world`

  return (
    <Modal blurImg>
      <Card
        pseudoElement="default"
        className={`!px-0 !py-2  ${
          spinnerState.showReward ? "md:!h-[400px] " : "md:!h-[550px] "
        }`}
      >
        <button
          onClick={() => closeSpinner()}
          disabled={spinnerState.isSpinning && !spinnerState.showReward}
          className="cursor-pointer absolute top-2 right-2 z-30"
        >
          <CancleIcon />
        </button>
        <div className="flex flex-col justify-center items-center relative overflow-hidden" >
          <Typography
            isIcon={false}
            variant="h2"
            font="bold"
            className="text-text-primary uppercase cursor-default mobile:text-xxxl"
          >
            Daily Spin
          </Typography>
          <div className="my-2 md:my-3 ">
            <img src={Images.LINE} alt="" />
          </div>
          {!spinnerState.showReward ? (
            <>
              <Typography
                isIcon={false}
                font="regular"
                className="text-text-primary line-clamp-2 w-full min-w-[200px] text-center"
                variant="p"
              >
                Spin daily and stand a chance to win more shards!
              </Typography>
              <div className=" my-2 md:my-3 relative p-4 overflow-hidden" >
                <div className="h-24 w-max flex justify-center items-center absolute z-20 -top-6 left-0 right-0 mx-auto">
                  <img
                    src={Images.SPINNER_POINTER}
                    alt="pointer"
                    className="h-11 w-7 object-contain"
                  />
                </div>
                <div
                  style={{
                    transform: spinnerState.reward?.rotationDeg
                      ? `rotate(${720 + spinnerState.reward.rotationDeg}deg)`
                      : "rotate(0deg)",
                    transformOrigin: "center center",
                  }}
                  className={`h-56 md:h-64 w-full relative z-10 transition-all ease-in-out duration-[5s]`}
                >
                  <img
                    src={Images.SPINNER}
                    alt="SPINNER"
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
              <div
                className={` ${
                  spinnerState.isSpinning ? "" : "group hover:drop-shadow-primary my-1 md:my-3"
                }`}
              >
                <Button
                  onClick={() => PostDailySpin()}
                  disable={spinnerState.isSpinning}
                  isBorderLoading={spinnerState.isSpinning}
                  showOnlyisBorderLoadingText={true}
                  isBorder={true}
                  bgColor={true}
                  isBorderLabel="spin"
                  color="white"
                  className="w-[100px]"
                  CLASSNAME=" text-text-primary group-hover:text-text-secondary px-3 mobile:px-3"
                />
              </div>
            </>
          ) : (
            <>
            {spinnerState.reward?.shardPrize !== 0 && 
            <>
            <img src={Images.CONGRATS_GIF} alt="congrats" className="absolute h-full w-[50%] object-contain right-0 -rotate-12 "/>
            <img src={Images.CONGRATS_GIF} alt="congrats" className="absolute h-full w-[50%] object-contain left-0 rotate-12"/>
            </>
            }
              <div className="my-3 md:my-6 text-center">
                <Typography
                  isIcon={false}
                  className="text-text-primary text-xxxxxxxl md:text-[65px] cursor-default"
                >
                  {`${spinnerState.reward?.shardPrize !== 0 ? "+" : ""}${spinnerState.reward?.shardPrize} SHARDS`}
                </Typography>
              </div>
              <div className="my-3  ">
              {spinnerState.reward?.shardPrize === 0 ?
                <Typography
                  isIcon={false}
                  variant="h3"
                  className="text-text-primary cursor-default text-center "
                >
                  Sorry, you did not win any prize.
                  <br/>
                  Better luck next time!
                </Typography>

                :
                <Typography
                  isIcon={false}
                  variant="h3"
                  className="text-text-primary cursor-default "
                >
                 Congratulations!
                </Typography>
                }
              </div>
              {spinnerState.reward?.shardPrize !== 0 &&
              <div className="flex flex-col gap-3 md:flex-row md:gap-10 my-2">
                <div className="group hover:drop-shadow-primary ">
                  <Link to={`https://twitter.com/intent/tweet?text=${Text}`}
                   target="_blank"
                   >
                  <Button
                    // onClick={() => PostDailySpin()}
                    isBorder={true}
                    bgColor={true}
                    logo={<TwitterLogo />}
                    isBorderLabel="SHARE ON X"
                    color="white"
                    CLASSNAME=" text-text-primary group-hover:text-text-secondary pr-3 mobile:px-3"
                  />
                  </Link>
                </div>
                <div className="group hover:drop-shadow-primary ">
                  <Button
                    onClick={() => closeSpinner()}
                    isBorder={true}
                    bgColor={true}
                    isBorderLabel="BACK TO DASHBOARD"
                    color="white"
                    CLASSNAME=" text-text-primary group-hover:text-text-secondary px-3 mobile:px-3"
                  />
                </div>
              </div>
              }
            </>
          )}
        </div>
      </Card>
    </Modal>
  );
};