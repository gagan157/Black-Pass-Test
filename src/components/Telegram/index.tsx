import { Typography } from "components/Atoms/Typography/Typography";
import { Modal } from "components/Molecules/Modal";
import { useCustomError } from "hooks/accessTokenExpire";
import { useGetUserDetails } from "hooks/usegetUserDetails";
import { useState } from "react";
import { POST_TELEGRAM_VERIFY } from "services/apiService";
import TelegramLoginButton from "telegram-login-button";
import * as config from "constants/config";

const TelegramBtn = () => {
  const { userData, getUserDetails } = useGetUserDetails();
  const { handleError } = useCustomError();

  const handleTelegramAuth = (user: any) => {
    alert(user?.id);
    if (user?.id) {
      postVerifyTelegram(user?.id, user?.username);
    }
  };

  const postVerifyTelegram = async (id: string, userName: string) => {
    try {
      if (userData && userData.accountType.includes("TELEGRAM")) {
        return;
      }
      const res = await POST_TELEGRAM_VERIFY(id, userName);
      if (res.data?.success) {
        getUserDetails();
      }
    } catch (error: any) {
      // toast.error(error.message);
      handleError(error);
    }
  };

  const [open, setOpen] = useState(false);

  const openPop = () => {
    setOpen(true);
  };
  return (
    <div className="bg-gray-100 flex justify-center">
      <button className="h-16 w-80 bg-red-200" onClick={openPop}>
        openPop
      </button>
      <br />
      <br />
      <div className="bg-white h-3 ">
        {open && <ProfileModal handleTelegramAuth={handleTelegramAuth} />}
      </div>
    </div>
  );
};

export default TelegramBtn;

const ProfileModal = ({ handleTelegramAuth }: any) => {
  const { userData, getUserDetails } = useGetUserDetails();

  return (
    <Modal>
      <div className="text-white">Telegram Modal</div>
      <div className="bg-white flex justify-center items-center">
        {userData && userData.accountType.includes("TELEGRAM") ? (
          <Typography isIcon={false} variant="p" className="!text-text-primary">
            Telegram Verfied
          </Typography>
        ) : (
          <TelegramLoginButton
            botName={config.TELEGRAM_BOT || "AstraNovaBlackPassBot"}
            dataOnauth={handleTelegramAuth}
            usePic={true}
            className="custom-class"
            cornerRadius={5}
            requestAccess={true}
            buttonSize="large"
          />
        )}
      </div>
    </Modal>
  );
};
