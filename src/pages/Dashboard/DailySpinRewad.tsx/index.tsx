import { Spinner } from "assets";
import { Typography } from "components/Atoms/Typography/Typography";
import { Smallloader } from "components/Loader";
import { isDevices } from "constants/utils";
import { useDailySpinReward } from "hooks/useDailySpinRewards";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
const { DateTime } = require('luxon');

interface DailyReward{
  reward_type: string;
  shards: number;
  created_at: string;
}
interface DailySpinInterface{
  history: DailyReward[];
  total: number;
}
interface DailySpinPops {
  dailySpinRewardsData?: DailySpinInterface; 
  handleLoadMoreData:() => void;
    hasMoreData:boolean;
    isloading:boolean;
}

export const DailySpinReward = ({
  dailySpinRewardsData,
  handleLoadMoreData,
  hasMoreData,
  isloading,
} : DailySpinPops) => {
   
  return (
    <div
                          className={`h-[250px] overflow-y-auto mobile:h-[160px] pr-2 ${
                            dailySpinRewardsData && dailySpinRewardsData.history.length <= 0 &&
                            "grid place-content-center place-items-center text-text-primary "
                          } `}
                        >
                          <InfiniteScroll
                            dataLength={(dailySpinRewardsData && dailySpinRewardsData.history.length) || 0}
                            next={handleLoadMoreData}
                            hasMore={hasMoreData}
                            loader={isloading ?<Smallloader />: ""}
                            scrollThreshold={0.8}
                            height={isDevices() ? "160px" : "250px"}
                          >
                            {dailySpinRewardsData && dailySpinRewardsData.history.length <= 0 ? (
                              <Typography isIcon={false} variant="h3" pclassName="h-full w-full justify-center">
                                No Data{" "}
                              </Typography>
                            ) : (
                              dailySpinRewardsData &&
                              dailySpinRewardsData.history.map(
                                (data: any, index: number) => {
                                  const colorShow = `text-text-lightgray`;

                                  const cursor_style = "cursor-default";

                                  return (
                                    <React.Fragment key={data?.created_at}>
                                      <div
                                        className={` min-h-[10vh] pr-1 flex justify-between items-center py-3 border-t-xs border-b-xs border-t-lightprimary border-b-lightprimary border-dashed mobile:gap-2 ${cursor_style} `}
                                      >
                                        <div className=" flex gap-10 items-center mobile:gap-4">
                                          <div className="w-full h-full flex justify-center items-center gap-1">
                                            <span className={`${colorShow}`}>
                                              {(index + 1)
                                                .toString()
                                                .padStart(2, "0")}
                                            </span>
                                            <div className="h-8 w-9 flex justify-center items-center text-text-lightgray">
                                            <Spinner />
                                            </div>
                                          </div>
                                          <div className="flex flex-col">
                                            <div className="flex gap-5 mobile:gap-2">
                                              <div>
                                              <Typography
                                                variant="p"
                                                isIcon={false}
                                                font="bold"
                                                className={` tracking-widest text-xs w-[200px] line-clamp-3 mobile:w-[110px]  mobile:tracking-normal break-words
                                                  ${colorShow}  ${cursor_style}`}
                                                title={"Spin Bonus"}
                                              >
                                                {"Spin Bonus"}
                                              </Typography>
                                              <Typography
                                                variant="p"
                                                isIcon={false}
                                                font="bold"
                                                className={` tracking-widest text-xs w-[200px] line-clamp-3 mobile:w-[110px]  mobile:tracking-normal break-words
                                                  ${colorShow}  ${cursor_style}`}
                                                title={"Daily Spin"}
                                              >
                                                {DateTime.fromISO(data?.created_at).toFormat("dd-MMM-yyyy | hh:mm:ss a") }
                                              </Typography>
                                              </div>
                                              <Typography
                                                variant="p"
                                                isIcon={false}
                                                font="bold"
                                                title={"shard"}
                                                className="bg-background-lightgray !text-black px-1 tracking-widest text-xs w-[40px] text-center truncate mobile:tracking-normal"
                                              >
                                                {data?.shards}
                                              </Typography>
                                            </div>
                                          </div>
                                        </div>
                                        <Typography
                                          variant="p"
                                          isIcon={false}
                                          className="text-text-lightgray cursor-not-allowed tracking-widest text-xs"
                                        >
                                          CLAIMED
                                        </Typography>
                                      </div>
                                    </React.Fragment>
                                  );
                                }
                              )
                            )}
                          </InfiniteScroll>
                        </div>
  )
}
