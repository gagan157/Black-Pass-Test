import { Button } from "components/Atoms/Button/Button";
import { RefferalModal } from "components/Molecules/PopUp/RefferalModal";
import { EventButtonNames, trackButtonClick } from "constants/cookie3";
import { copyHandler } from "constants/utils";
import { useUser } from "context/userContext";
import React, { useState } from "react";

interface ReferralLinkBtnProps {
    Btnname: string;
  }

export const ReferralLinkBtn = ({Btnname}:ReferralLinkBtnProps) => {
  const [showRefferal, setShowRefferal] = useState(false);
  const { user } = useUser();
  let refferalLink: string;
  if (window.location.href.includes("astranova.world")) {
    refferalLink = `https://blackpass.astranova.world?referral_code=${user?.referal_code}`;
  } else if (
    window.location.href.includes("black-pass-frontend-prod.azurewebsites.net")
  ) {
    refferalLink = `https://black-pass-frontend-prod.azurewebsites.net?referral_code=${user?.referal_code}`;
  } else if (
    window.location.href.includes("black-pass-staging.azurewebsites.net")
  ) {
    refferalLink = `https://black-pass-staging.azurewebsites.net?referral_code=${user?.referal_code}`;
  } else if (window.location.href.includes("localhost")) {
    refferalLink = `http://localhost:3000?referral_code=${user?.referal_code}`;
  } else if (window.location.href.includes("127.0.0.1")) {
    refferalLink = `http://127.0.0.1:3000?referral_code=${user?.referal_code}`;
  } else {
    refferalLink = `https://blackpass.astranova.world?referral_code=${user?.referal_code}`;
  }

  return (
    <>
      <div className="group">
        <Button
          color="white"
          size="doubleExtraLarge"
          bgColor
          isBorder={true}
          isBorderLabel={Btnname}
          CLASSNAME="text-text-primary group-hover:text-text-secondary w-[150px] "
          onClick={() => {
            copyHandler({
              data: refferalLink,
              label: "REFERRAL LINK",
            });
            setShowRefferal(true);
            trackButtonClick(EventButtonNames.REFERRAL_LINK, user?.id);
          }}
        />
      </div>
      {showRefferal && (
        <RefferalModal
          onClose={() => setShowRefferal(false)}
          refferalLink={refferalLink}
        />
      )}
    </>
  );
};
