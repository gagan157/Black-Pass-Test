import { CameraIcon, SmallLine } from "assets";
import { Card } from "components/Atoms/Card/Card";
import { Typography } from "components/Atoms/Typography/Typography";
import React, { useState } from "react";
import { Modal } from "../Modal";
import { CircleButton } from "components/Atoms/CircleButton/CircleButton";
import { Images } from "assets/Images";
import { Button } from "components/Atoms/Button/Button";
import { UPLOAD_AVATAR } from "services/apiService";
import { User, useUser } from "context/userContext";
import { Loader, Smallloader } from "components/Loader";
import { useCustomError } from "hooks/accessTokenExpire";

interface AvatarOption {
  value: string;
  imgSrc: string;
}

interface AvatarPopupProps {
  avatars: AvatarOption[];
  onSelectAvatar: (avatar: AvatarOption) => void;
  setShowaAvatar: any;
  getUserDetails: () => void;
}

export const AvatarPopup = ({
  avatars,
  onSelectAvatar,
  setShowaAvatar,
  getUserDetails,
}: AvatarPopupProps) => {
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarOption | null>(
    null
  );
  const [uploadedAvatar, setUploadedAvatar] = useState<string>("");

  const [avatarLoader, setAvatarLoader] = useState<boolean>(false);
  const [blobFile, setBlobFIle] = useState<any>();
  const { handleError } = useCustomError();
  const { user, updateUser } = useUser();

  const handleSelectAvatar = (avatar: AvatarOption) => {
    setSelectedAvatar(avatar);
  };

  const handleUploadAvatar = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      setAvatarLoader(true);
      const file = event.currentTarget.files?.[0];
      if (file) {
        setBlobFIle(file);
        const reqBody = new FormData();
        reqBody.append("file", file);
        // const response = await UPLOAD_AVATAR(reqBody);
        const blobURL = URL.createObjectURL(file);
        // onSelectAvatar({ imgSrc: blobURL, value: "" });
        setUploadedAvatar(blobURL);
        // getUserDetails();
        // console.log(user);
        // if (user) {
        //   updateUser({ ...user, avatar: blobURL });
        // }
        // setShowaAvatar(false);
        // console.log(response)
      }
    } catch (error: any) {
      handleError(error);
      console.log(error);
    } finally {
      setAvatarLoader(false);
    }
  };

  const UploadSelectAvatar = async (UploadImg: string) => {
    try {
      const reqBody = new FormData();
      reqBody.append("file", blobFile);
      await UPLOAD_AVATAR(reqBody);
    } catch (error: any) {
      handleError(error);
    }
  };

  const handleConfirmSelection = () => {
    if (selectedAvatar) {
      onSelectAvatar(selectedAvatar);
      setShowaAvatar(false);
      getUserDetails();
    } else if (uploadedAvatar) {
      UploadSelectAvatar(uploadedAvatar);
      setShowaAvatar(false);
      getUserDetails();
    }
  };

  return (
    <Modal blurImg>
      <Card pseudoElement="secondary" className="mobile:py-0">
        <div className="grid place-items-center">
          <Typography
            variant="customh5"
            isIcon={false}
            className="text-text-primary"
          >
            CHOOSE AN AVATAR
          </Typography>
        </div>
        <div className="py-2">
          <SmallLine />
        </div>
        <div className=" flex justify-center items-center w-full">
          <div className="relative top-1 w-16 h-16 p-[3px] border border-dashed rounded-full border-primary">
            <img
              className="h-full w-full rounded-full object-fill"
              src={
                uploadedAvatar
                  ? uploadedAvatar
                  : `${user?.avatar}?${Date.now() + "astra"}`
              }
              alt="Logo"
            />
            <label htmlFor="pictureInput">
              <input
                id="pictureInput"
                type="file"
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={(e) => {
                  handleUploadAvatar(e);
                }}
              />
              <div className="flex cursor-pointer justify-center items-center absolute bottom-0 right-0 rounded-full bg-dark-primary-500 p-1">
                <CameraIcon />
              </div>
            </label>
          </div>
        </div>
        {avatars.length > 0 ? (
          <div className=" my-5 h-[40vh] overflow-y-auto flex justify-center items-start flex-wrap gap-5 mobile:h-[200px] mobile:gap-3 mobile:my-3 ">
            {avatars.map((avatar) => (
              <div
                key={avatar.value}
                className={`h-16 w-16 p-[3px] border border-dashed rounded-full cursor-pointer ${
                  selectedAvatar === avatar
                    ? "border-secondary"
                    : "border-white"
                }`}
                onClick={() => handleSelectAvatar(avatar)}
              >
                <img
                  className="w-full h-full object-fill rounded-full "
                  src={avatar.imgSrc}
                  alt={avatar.value}
                />
              </div>
            ))}
          </div>
        ) : (
          <Typography
            variant="customh5"
            isIcon={false}
            className="text-text-primary h-[30vh] m-auto flex items-center"
          >
            No avatars found
          </Typography>
        )}
        <div className="flex justify-center items-center gap-3">
          <div className="group">
            <Button
              size="medium"
              color="white"
              isBorder={true}
              isBorderLabel="CHANGE AVATAR"
              CLASSNAME="text-text-primary px-3 group-hover:text-text-secondary mobile:px-3"
              onClick={() => {
                handleConfirmSelection();
              }}
              // disable={selectedAvatar === null}
              disable={blobFile === undefined && avatars.length <= 0}
            />
          </div>
          <div className="group">
            <Button
              size="medium"
              color="white"
              isBorder={true}
              isBorderLabel="GO BACK"
              CLASSNAME="text-text-primary px-3 group-hover:text-text-secondary"
              className="w-[120px]"
              onClick={() => {
                setShowaAvatar(false);
              }}
            />
          </div>
        </div>
      </Card>
    </Modal>
  );
};
