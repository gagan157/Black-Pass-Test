import { ReferralLogo } from "assets";
import { Images } from "assets/Images";
import { Button } from "components/Atoms/Button/Button";
import { Card } from "components/Atoms/Card/Card";
import { Typography } from "components/Atoms/Typography/Typography";
import LazyImage from "components/LazyImage";
import { Loader } from "components/Loader";
import { ReferralLinkBtn } from "components/ReferralLinkBtn";
import { DEFAULT_QUEST_LIMIT } from "constants/config";
import { shortenAddress } from "constants/function";
import { useGet3XReferrals } from "hooks/useGet3XReferrals";
import { useGetReferralShards } from "hooks/useReferrals";
import React from "react";

export const Referrals = () => {

  const {referralShards, isLoading, handleNextPage, handlePrevPage,currentPage} = useGetReferralShards();
  const {data} = useGet3XReferrals(true);

  return (
    <div className="relative min-h-[90vh] pb-14">
      <div className="min-h-wrapper min-w-screen h-full w-full absolute -z-10 top-0 left-0">
        <img
          className={`object-cover sm:object-fill w-full h-full`}
          src={Images.LEADERBOARD}
          alt="leaderboard"
        />
      </div>
      <div className="container max-w-[70%] mx-auto py-5 pb-10 mobile:max-w-[92%] ">
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
        <div className="flex md:flex-row items-start md:items-center justify-between w-full text-center flex-col">
          <Typography
            isIcon={false}
            variant="h2"
            className="text-text-primary cursor-default"
          >
            REFERRALS
          </Typography>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-start md:items-center ">
            <div className="flex gap-1 items-end  ">
              <Typography
                isIcon={false}
                variant="h6"
                className="text-text-lightgray uppercase !cursor-default"
                pclassName="items-end "
              >
                Total Referrals:{" "}
                <span className="text-text-primary leading-[26px] text-medium cursor-default ">
                  {referralShards?.totalReferrals || 0}
                </span>
              </Typography>
            </div>
            <div className="h-[0.1rem] md:h-5 w-full md:w-[2px] bg-background-third rounded-md">
              {""}
            </div>
            <div className="flex gap-1 items-end ">
              <Typography
                isIcon={false}
                variant="h6"
                className="text-text-lightgray uppercase !cursor-default"
                pclassName="items-end "
              >
                Total Referral Earnings:{" "}
                <span className="text-text-primary text-medium leading-[26px] cursor-default">
                  {referralShards?.totalShards || 0}
                </span>
              </Typography>
            </div>
          </div>
        </div>

        
        
        {isLoading ? 
        <Loader /> : 
        referralShards?.list.length === 0 ? 
        <>
        <div className="h-[50vh] flex flex-col gap-y-10 justify-center items-center px-5">
          <Typography
            isIcon={false}
            variant="h5"
            className="text-text-primary text-center"
          >
           Currently, you have no referrals. Would you 
            <span className="block mt-1 ">
            like to start earning Shards?
            </span>
          </Typography>

          <ReferralLinkBtn Btnname=" Start referring now!" />
        </div>
        </> :
        <>
        {/* table headers */}
        {referralShards && referralShards?.list.length > 0 &&<div className="hidden md:block">
          <div className="grid grid-cols-4 place-items-center p-4 border-t border-b border-dashed border-lightprimary ">
            <div className=" ml-5">
              <Typography
                isIcon={false}
                variant="customp"
                className="text-text-primary cursor-default uppercase"
              >
                Serial No.
              </Typography>
            </div>
            <div>
              <Typography
                isIcon={false}
                variant="customp"
                className="text-text-primary cursor-default"
              >
                USERNAME
              </Typography>
            </div>
            <div>
              <Typography
                isIcon={false}
                variant="customp"
                className="text-text-primary cursor-default uppercase"
              >
                Wallet address
              </Typography>
            </div>
            <div className=" md:min-w-[150px] ">
              <Typography
                isIcon={false}
                variant="customp"
                className="text-text-primary cursor-default"
              >
                EARNED SHARDS
              </Typography>
            </div>
          </div>
        </div>}
       {referralShards && referralShards?.list.map((item, idx)=>(
          <React.Fragment key={item?.id + idx}>
            
            <div                    
              className={`bg-background-third 
                  p-[1px] mt-5 hidden md:block `}
              style={{
                clipPath:
                  "polygon(2% 0px, 100% 0px, 100% 55%, 98% 100%, 0px 100%, 0px 40%)",
              }}
            >
              <div
                className="bg-background-blackmain w-full h-11 pl-5 mobile:pl-0"
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
                      {((currentPage - 1) * DEFAULT_QUEST_LIMIT + idx + 1).toString().padStart(2, "0")}
                    </Typography>
                  </div>

                  <div className="flex gap-2 md:min-w-[150px]">
                    <div
                      className={`w-5 h-5 relative overflow-hidden rounded-full`}
                    >
                      <LazyImage
                        highQualitySrc={item?.avatar}
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
                      {item?.user_name || "-"}
                    </Typography>
                  </div>

                  <div className="md:min-w-[150px]">
                    <Typography
                      isIcon={false}
                      JustifyContentCenter={true}
                      variant="p"
                      className="text-text-primary mobile:truncate mobile:w-[60px]"
                    >
                      { shortenAddress(item?.wallet_address || "", 7) ||"-"}
                    </Typography>
                  </div>

                  <div className="flex gap-2 md:min-w-[150px]">
                    <Typography
                      JustifyContentCenter={true}
                      isIcon={false}
                      variant="p"
                      className="text-text-primary mobile:truncate mobile:w-[60px]"
                    >
                      {item?.totalvalue || 0} SHARDS
                    </Typography>
                  </div>
                </div>
              </div>
            </div>

            {/* mobile card */}
            <div
              className={` bg-background-third p-[1px] mt-5 block md:hidden `}
              style={{
                clipPath:
                  "polygon(2% 0px, 100% 0px, 100% 55%, 98% 100%, 0px 100%, 0px 40%)",
              }}
            >
              <div
                className={` bg-background-blackmain w-full h-36 p-5 `}
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
                      className="text-text-primary uppercase"
                    >
                      Serial No.
                    </Typography>
                    <Typography
                      isIcon={false}
                      variant="p"
                      className="text-text-primary"
                    >
                     {((currentPage - 1) * DEFAULT_QUEST_LIMIT + idx + 1).toString().padStart(2, "0")}
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
                          highQualitySrc={item?.avatar}
                          alt="avatar"
                          imgClassName="w-full h-full rounded-full"
                        />
                      </div>
                      <Typography
                        isIcon={false}
                        variant="p"
                        className="text-text-primary "
                      >
                        {item?.user_name || "-"}
                      </Typography>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Typography
                      isIcon={false}
                      variant="p"
                      className="text-text-primary "
                    >
                      WALLET ADDRESS
                    </Typography>
                    <Typography
                      isIcon={false}
                      variant="p"
                      className="text-text-primary "
                    >
                       { shortenAddress(item?.wallet_address || "", 7) ||"-"}
                    </Typography>
                  </div>

                  <div className="flex justify-between">
                    <Typography
                      isIcon={false}
                      variant="p"
                      className="text-text-primary "
                    >
                      EARNED SHARDS
                    </Typography>
                    <div className="flex ">
                      <Typography
                        isIcon={false}
                        variant="p"
                        className="text-text-primary"
                      >
                        {item?.totalvalue || 0} SHARDS
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* buttons */}
            <div className="flex flex-row justify-between w-[70%] mt-5 absolute bottom-10 mobile:w-[90%]">
          <div className="group ">
            <Button
              bgColor
              onClick={handlePrevPage}
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
                (currentPage * DEFAULT_QUEST_LIMIT) >= referralShards?.total
                  ? ""
                  : "text-text-primary group-hover:text-text-secondary"
              }`}
              onClick={handleNextPage}
              color="white"
              isBorderLabel="Next"
              isBorder={true}
              disable={(currentPage * DEFAULT_QUEST_LIMIT) >= referralShards?.total}
            />
          </div>
            </div>
          </React.Fragment>          
        )) }
        </>       
        }
      </div>
    </div>
  );
};
