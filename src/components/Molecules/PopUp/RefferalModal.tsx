import React, { useCallback, useEffect } from "react";
import { Modal } from "../Modal";
import { CancleIcon, SpeedTimer, TelegramLogo, TwitterLogo } from "assets";
import { Typography } from "components/Atoms/Typography/Typography";
import useBlur from "hooks/useBlur";
import { Button } from "components/Atoms/Button/Button";
import { Card } from "components/Atoms/Card/Card";
import { Images } from "assets/Images";
import { Link } from "react-router-dom";
import { copyHandler } from "constants/utils";
import { useUser } from "context/userContext";
const { DateTime } = require('luxon');

interface RefferalModalProps {
  onClose: () => void;
  refferalLink: string | undefined;
}

export const RefferalModal = ({
  onClose,
  refferalLink,
}: RefferalModalProps) => {
  const {referral3X ,setReferral3X, data3X} = useUser()
 
  useEffect(()=>{    
    const timeid = setInterval(()=>{
      const currentTimestampSeconds = DateTime.now().toSeconds();
      if(currentTimestampSeconds >= (data3X?.endTime || 0)){
        setReferral3X && setReferral3X(false)
        clearInterval(timeid)
        return;
      }
    },1000)
    return () => clearInterval(timeid)
  },[])

  const ref = useBlur(() => onClose());
  const textTwitter =
    "I'm joining @Astra__Nova Black Pass! The SocialFI platform of the first ever Saudi triple A game where you can farm points to get the $RVV airdrop 😊 https://pic.twitter.com/6vOi7GI9hd";
  const textTelegram =
    "I'm joining @Astra__Nova Black Pass! The SocialFI platform of the first ever Saudi triple A game where you can farm points to get the $RVV airdrop 😊 ";
  const handleOpenRefferal = useCallback(
    (socialName: string) => {
      if (socialName === "twitter") {
        window.open(
          `https://twitter.com/intent/tweet?text=${textTwitter}&url=${refferalLink}`,
          "_blank"
        );
      } else if (socialName === "telegram") {
        window.open(
          `https://telegram.me/share/url?url=${refferalLink}&text=${textTelegram}`,
          "_blank"
        );
      }
      //  else if (socialName === "discord") {
      //   window.open(
      //     `https://discord.com/channels/@me?url=${refferalLink}&text=${text}`,
      //     "_blank"
      //   );
      // }
    },
    [refferalLink]
  );


  return (
    <Modal blurImg>
      <Card pseudoElement="third">
        <button
          onClick={() => onClose()}
          className="cursor-pointer absolute top-2 right-2"
        >
          <CancleIcon />
        </button>
        {referral3X && <div className="flex items-center justify-center gap-2">
          <SpeedTimer />
       
        <Typography
            isIcon={false}
            variant="customh5"
            className="text-text-primary text-xs mobile:leading-7 cursor-default uppercase" 
          >
            Limited time offer
        </Typography>  </div>}
        <div className="grid place-items-center text-center">
          <Typography
            isIcon={false}
            variant="h3"
            className="text-text-secondary mobile:text-2xl mobile:leading-7 cursor-default" 
          >
            INVITE YOUR FRIENDS AND GET {referral3X ? "60" : "20"} BONUS SHARDS!
          </Typography>
        </div>
        <div className="py-2 flex justify-center items-center">
          <img src={Images.LINE} alt="line" />
        </div>
        <div className="flex justify-center items-center py-3 px-4 gap-8 mobile:flex-col mobile:gap-6 ">
          <div className="group w-[155px] hover:drop-shadow-primary ">
            <Link
              to={`https://telegram.me/share/url?url=${refferalLink}&text=${textTelegram}`}
              target="_blank"
            >
              <Button
                // onClick={() => handleOpenRefferal("telegram")}
                isBorder={true}
                bgColor={true}
                logo={<TelegramLogo />}
                isBorderLabel="SHARE ON TELEGRAM"
                color="white"
                CLASSNAME=" text-text-primary group-hover:text-text-secondary"
              />
            </Link>
          </div>

          <div className="group hover:drop-shadow-primary ">
            <Link
              to={`https://twitter.com/intent/tweet?text=${textTwitter}&url=${refferalLink}`}
              target="_blank"
            >
              <Button
                // onClick={() => { handleOpenRefferal("twitter") }}
                isBorder={true}
                bgColor={true}
                logo={<TwitterLogo />}
                isBorderLabel="SHARE ON X"
                color="white"
                CLASSNAME=" text-text-primary group-hover:text-text-secondary pr-2 mobile:px-3"
              />
            </Link>
          </div>
          <div className="group hover:drop-shadow-primary  ">
            <Button
              onClick={onClose}
              isBorder={true}
              bgColor={true}
              isBorderLabel="BACK TO DASHBOARD"
              color="white"
              CLASSNAME=" text-text-primary group-hover:text-text-secondary px-2 mobile:px-4"
            />
          </div>
        </div>
        <div className="flex justify-center items-center flex-col text-center pt-2">
          <Typography
            isIcon={false}
            variant="customh5"
            className="text-text-primary cursor-default"
          >
            Share the invite code to access blackpass.astranova.world :{" "}
          </Typography>
          </div>
          <div className="flex justify-center items-start gap-1 md:px-2 ">
            <p className="text-text-primary text-small break-all max-w-64 md:max-w-md ">
            {/* {!refferalLink 
              ? "Referral URL will be generated after completing mandatory X task" 
              : refferalLink} */}
              {refferalLink}
            </p>
            {refferalLink &&
              <div
                className="w-5 h-5 cursor-pointer "
                onClick={() => {
                  copyHandler({
                    data: refferalLink,
                    label: "REFERRAL LINK",
                  });
                }}
              >
                <img src={Images.COPY} alt="copyicon" className="h-full w-full object-contain" />
              </div>
            }
          </div>
        
      </Card>
    </Modal>
  );
};
