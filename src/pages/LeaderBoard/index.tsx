import { InfiniteIcon, SmallShardIcon } from "assets";
import { Images } from "assets/Images";
import { Button } from "components/Atoms/Button/Button";
import { Card } from "components/Atoms/Card/Card";
import { Typography } from "components/Atoms/Typography/Typography";
import LazyImage from "components/LazyImage";
import { Loader } from "components/Loader";
import { shortenAddress } from "constants/function";
import { formatNumber } from "constants/utils";
import { useUser } from "context/userContext";
import { useCustomError } from "hooks/accessTokenExpire";
import { useGetDashboardMatrics } from "hooks/usegetDashboardMatrics";
import { useGetLeaderboard } from "hooks/useGetLeaderBoard";
import { useGetUserDetails } from "hooks/usegetUserDetails";
import { useEffect, useState } from "react";
import { GET_LEADERBOARD_USER_COUNT } from "services/apiService";

export const Leaderboard = () => {
  const {
    leaderboard,
    setCurrentPage,
    totalEntries,
    currentPage,
    isLoading,
    myLeaderboardData,
  } = useGetLeaderboard();
  const { handleError } = useCustomError();
  const { dashboardMetrics }: any = useUser();
  const [totalUsers, setTotalUsers] = useState(0);
  const { getDashboardMarics } = useGetDashboardMatrics(false);
  const { getUserDetails } = useGetUserDetails(false);

  const getLeaderboardUser = async () => {
    try {
      const response = await GET_LEADERBOARD_USER_COUNT();
      if (response?.status === 200) {
        setTotalUsers(response?.data);
      }
    } catch (error: any) {
      handleError(error);
    }
  };

  useEffect(() => {
    getLeaderboardUser();
    getUserDetails();
    getDashboardMarics();
  }, []);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <>
      <div className="relative min-h-[90vh] pb-14">
        <div className="min-h-wrapper min-w-screen h-full w-full absolute -z-10 top-0 left-0">
          <img
            className={`object-cover sm:object-fill w-full h-full`}
            src={Images.LEADERBOARD}
            alt="leaderboard"
          />
        </div>
        <div className="container bg-transparent max-w-[70%] mx-auto py-5 pb-10 mobile:max-w-[92%] ">
          <Card
            pseudoElement="primary"
            bgColor
            className="py-1 pl-9 !text-center"
          >
            <Typography
              isIcon={false}
              variant="p"
              font="bold"
              className="text-xxs mobile:text-[8px] uppercase"
            >
              SEASON 1
            </Typography>
          </Card>
          <div className="flex flex-row items-center justify-between w-full text-center mobile:flex-col mobile:items-start ">
            <Typography
              isIcon={false}
              variant="h2"
              className="text-text-primary cursor-default"
            >
              LEADERBOARD
            </Typography>
            <div className="flex gap-1">
              <Typography
                isIcon={false}
                variant="h5"
                className="text-text-primary uppercase mobile:text-lg cursor-default"
              >
                your position :{" "}
              </Typography>
              <span className="text-text-primary mobile:truncate text-2xl leading-xxxl mobile:text-lg flex gap-1 cursor-default">
                {dashboardMetrics?.rank === "NA" ? (
                  <InfiniteIcon />
                ) : (
                  dashboardMetrics?.rank
                )}
                / {totalUsers}
              </span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="grid grid-cols-4 place-items-center p-4 border-t border-b border-dashed border-lightprimary ">
              <div className=" ml-5">
                <Typography
                  isIcon={false}
                  variant="customp"
                  className="text-text-primary cursor-default"
                >
                  POSITION
                </Typography>
              </div>
              <div className="  ">
                {" "}
                <Typography
                  isIcon={false}
                  variant="customp"
                  className="text-text-primary cursor-default"
                >
                  USERNAME
                </Typography>
              </div>
              <div className="  ">
                <Typography
                  isIcon={false}
                  variant="customp"
                  className="text-text-primary cursor-default"
                >
                  INVITED BY
                </Typography>
              </div>
              <div className=" md:min-w-[150px] ">
                <Typography
                  isIcon={false}
                  variant="customp"
                  className="text-text-primary cursor-default"
                >
                  TOTAL SHARDS
                </Typography>
              </div>
            </div>
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {currentPage === 1 &&
                myLeaderboardData?.rank !== undefined &&
                dashboardMetrics?.rank > 20 && (
                  <>
                    <div
                      className={`bg-background-mainWhite 
               p-[1px] mt-5 hidden md:block `}
                      style={{
                        clipPath:
                          "polygon(2% 0px, 100% 0px, 100% 55%, 98% 100%, 0px 100%, 0px 40%)",
                      }}
                    >
                      <div
                        className="bg-cyanGradient w-full h-11 pl-5 mobile:pl-0"
                        style={{
                          clipPath:
                            "polygon(2% 0px, 100% 0px, 100% 55%, 98% 100%, 0px 100%, 0px 40%)",
                        }}
                      >
                        <div className="grid grid-cols-4 place-items-center p-3 ">
                          <div className="md:min-w-[150px]">
                            <Typography
                              isIcon={false}
                              variant="p"
                              className="text-text-primary"
                              JustifyContentCenter={true}
                            >
                              {myLeaderboardData?.rank}
                            </Typography>
                          </div>

                          <div className="flex gap-2 md:min-w-[150px]">
                            <div className="w-5 h-5 ">
                              <img
                                className="w-full h-full rounded-full"
                                src={myLeaderboardData?.avatar}
                                alt=""
                              />
                            </div>
                            <Typography
                              JustifyContentCenter={true}
                              isIcon={false}
                              variant="p"
                              className="text-text-primary mobile:truncate mobile:w-[60px]"
                            >
                              {myLeaderboardData?.user_name}
                            </Typography>
                          </div>
                          <div className="md:min-w-[150px]">
                            <Typography
                              isIcon={false}
                              JustifyContentCenter={true}
                              variant="p"
                              className="text-text-primary mobile:truncate mobile:w-[60px]"
                            >
                              {myLeaderboardData?.invited_by
                                ? shortenAddress(
                                    myLeaderboardData?.invited_by ?? "",
                                    7
                                  )
                                : "-"}
                            </Typography>
                          </div>
                          <div className="flex gap-2 md:min-w-[150px]">
                          
                          <SmallShardIcon />
                          {/* <div className="w-5 h-5 rounded-full">
                          <img src={Images.Shards} alt="" className="w-full h-full object-contain" />
                          </div> */}
                            <Typography
                              JustifyContentCenter={true}
                              isIcon={false}
                              variant="p"
                              className="text-text-primary mobile:truncate mobile:w-[60px]"
                            >
                              {myLeaderboardData?.total_value}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={` bg-background-mainWhite p-[1px] mt-5 block md:hidden `}
                      style={{
                        clipPath:
                          "polygon(2% 0px, 100% 0px, 100% 55%, 98% 100%, 0px 100%, 0px 40%)",
                      }}
                    >
                      <div
                        className="bg-cyanGradient w-full h-36 p-5"
                        style={{
                          clipPath:
                            "polygon(2% 0px, 100% 0px, 100% 55%, 98% 100%, 0px 100%, 0px 40%)",
                        }}
                      >
                        <div className="flex flex-col justify-between gap-y-2">
                          <div className="flex justify-between">
                            <Typography
                              isIcon={false}
                              variant="p"
                              className="text-text-primary cursor-default"
                            >
                              YOUR POSITION
                            </Typography>
                            <Typography
                              isIcon={false}
                              variant="p"
                              className="text-text-primary"
                            >
                              {myLeaderboardData?.rank}
                            </Typography>
                          </div>
                          <div className="flex justify-between">
                            <Typography
                              isIcon={false}
                              variant="p"
                              className="text-text-primary "
                            >
                              USERNAME
                            </Typography>
                            <div className="flex gap-2">
                              <div className="w-5 h-5 ">
                                <img
                                  className="w-full h-full rounded-full"
                                  src={myLeaderboardData?.avatar}
                                  alt=""
                                />
                              </div>
                              <Typography
                                isIcon={false}
                                variant="p"
                                className="text-text-primary "
                              >
                                {myLeaderboardData?.user_name}
                              </Typography>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <Typography
                              isIcon={false}
                              variant="p"
                              className="text-text-primary "
                            >
                              INVITED BY
                            </Typography>
                            <Typography
                              isIcon={false}
                              variant="p"
                              className="text-text-primary "
                            >
                              {myLeaderboardData?.invited_by
                                ? shortenAddress(
                                    myLeaderboardData?.invited_by ?? "",
                                    7
                                  )
                                : "-"}
                            </Typography>
                          </div>

                          <div className="flex justify-between">
                            <Typography
                              isIcon={false}
                              variant="p"
                              className="text-text-primary "
                            >
                              TOTAL SHARDS
                            </Typography>
                            <div className="flex gap-2">
                              <SmallShardIcon />
                              {/* <div className="w-5 h-5 rounded-full">
                              <img src={Images.Shards} alt="" className="w-full h-full object-contain" />
                              </div> */}
                              <Typography
                                isIcon={false}
                                variant="p"
                                className="text-text-primary"
                              >
                                {myLeaderboardData?.total_value}
                              </Typography>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

              {leaderboard.map((data: any, index: number) => (
                <>
                  <div
                    className={`  bg-background-mainWhite
                     p-[1px] mt-5 hidden md:block `}
                    style={{
                      clipPath:
                        "polygon(2% 0px, 100% 0px, 100% 55%, 98% 100%, 0px 100%, 0px 40%)",
                    }}
                  >
                    <div
                      className={` ${
                        data.rank === 1
                          ? "bg-goldenGradient"
                          : data.rank === 2
                          ? "bg-silverGradient"
                          : data.rank === 3
                          ? "bg-bronzeGradient"
                          : "bg-background-blackmain"
                      }  w-full h-11 pl-5 mobile:pl-0 `}
                      style={{
                        clipPath:
                          "polygon(2% 0px, 100% 0px, 100% 55%, 98% 100%, 0px 100%, 0px 40%)",
                      }}
                    >
                      <div className="grid grid-cols-4 place-items-center p-3 ">
                        <div className="md:min-w-[150px]">
                          <Typography
                            isIcon={false}
                            variant="p"
                            className="text-text-primary"
                            JustifyContentCenter={true}
                          >
                            {data.rank}
                          </Typography>
                        </div>

                        <div className="flex gap-2 md:min-w-[150px]">
                          <div
                            className={`w-5 h-5 relative overflow-hidden rounded-full`}
                          >
                            <LazyImage
                              highQualitySrc={data.avatar}
                              alt="avatar"
                              imgClassName="w-full h-full rounded-full"
                            />
                          </div>
                          <Typography
                            JustifyContentCenter={true}
                            isIcon={false}
                            variant="p"
                            className="text-text-primary mobile:truncate mobile:w-[60px]"
                          >
                            {data.user_name}
                          </Typography>
                        </div>
                        <div className="md:min-w-[150px]">
                          <Typography
                            isIcon={false}
                            JustifyContentCenter={true}
                            variant="p"
                            className="text-text-primary mobile:truncate mobile:w-[60px]"
                          >
                            {data.invited_by
                              ? shortenAddress(data.invited_by ?? "", 7)
                              : "-"}
                          </Typography>
                        </div>
                        <div className="flex gap-2 md:min-w-[150px]">
                          <SmallShardIcon />
                          {/* <div className="w-5 h-5 rounded-full">
                      <img src={Images.Shards} alt="" className="w-full h-full object-contain" />
                      </div> */}
                          <Typography
                            JustifyContentCenter={true}
                            isIcon={false}
                            variant="p"
                            className="text-text-primary mobile:truncate mobile:w-[60px]"
                          >
                            {formatNumber(data.total_value)}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={` bg-background-mainWhite p-[1px] mt-5 block md:hidden `}
                    style={{
                      clipPath:
                        "polygon(2% 0px, 100% 0px, 100% 55%, 98% 100%, 0px 100%, 0px 40%)",
                    }}
                  >
                    <div
                      className={` ${
                        data.rank === 1
                          ? "bg-goldenGradient"
                          : data.rank === 2
                          ? "bg-silverGradient"
                          : data.rank === 3
                          ? "bg-bronzeGradient"
                          : "bg-background-blackmain"
                      } w-full h-36 p-5 `}
                      style={{
                        clipPath:
                          "polygon(2% 0px, 100% 0px, 100% 55%, 98% 100%, 0px 100%, 0px 40%)",
                      }}
                    >
                      <div className="flex flex-col justify-between gap-y-2">
                        <div className="flex justify-between">
                          <Typography
                            isIcon={false}
                            variant="p"
                            className="text-text-primary"
                          >
                            POSITION
                          </Typography>
                          <Typography
                            isIcon={false}
                            variant="p"
                            className="text-text-primary"
                          >
                            {data.rank}
                          </Typography>
                        </div>
                        <div className="flex justify-between">
                          <Typography
                            isIcon={false}
                            variant="p"
                            className="text-text-primary "
                          >
                            USERNAME
                          </Typography>
                          <div className="flex gap-2">
                            <div
                              className={`w-5 h-5 relative overflow-hidden rounded-full`}
                            >
                              <LazyImage
                                highQualitySrc={data.avatar}
                                alt="avatar"
                                imgClassName="w-full h-full rounded-full"
                              />
                            </div>
                            <Typography
                              isIcon={false}
                              variant="p"
                              className="text-text-primary "
                            >
                              {data.user_name}
                            </Typography>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <Typography
                            isIcon={false}
                            variant="p"
                            className="text-text-primary "
                          >
                            INVITED BY
                          </Typography>
                          <Typography
                            isIcon={false}
                            variant="p"
                            className="text-text-primary "
                          >
                            {data.invited_by
                              ? shortenAddress(data.invited_by ?? "", 7)
                              : "-"}
                          </Typography>
                        </div>

                        <div className="flex justify-between">
                          <Typography
                            isIcon={false}
                            variant="p"
                            className="text-text-primary "
                          >
                            TOTAL SHARDS
                          </Typography>
                          <div className="flex gap-2">
                            {<SmallShardIcon />}
                          {/* <div className="w-5 h-5 rounded-full">
                          <img src={Images.Shards} alt="" className="w-full h-full object-contain" />
                          </div> */}
                            <Typography
                              isIcon={false}
                              variant="p"
                              className="text-text-primary"
                            >
                              {formatNumber(data.total_value)}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </>
          )}

          <div className="flex flex-row justify-between w-[70%] mt-5 absolute bottom-10 mobile:w-[90%]">
            <div className="group ">
              <Button
                bgColor
                onClick={prevPage}
                disable={currentPage === 1}
                color="white"
                isBorderLabel="Prev"
                isBorder={true}
                CLASSNAME={`w-[150px] ${
                  currentPage === 1
                    ? ""
                    : "text-text-primary group-hover:text-text-secondary"
                }`}
              />
            </div>

            <div className="group">
              <Button
                CLASSNAME={`w-[150px] ${
                  currentPage * 20 >= totalEntries
                    ? ""
                    : "text-text-primary group-hover:text-text-secondary"
                }`}
                onClick={nextPage}
                color="white"
                isBorderLabel="Next"
                isBorder={true}
                disable={currentPage * 20 >= totalEntries}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
