import { CancleIcon } from "assets";
import { Button } from "components/Atoms/Button/Button";
import { Typography } from "components/Atoms/Typography/Typography";
import { useState } from "react";
import { Modal } from "../Modal";
import { Card } from "components/Atoms/Card/Card";

interface ShowWalletAddressProps {
  onClose: () => void;
  onUpdate: () => void;
  conectedAddress: any;
}

export const ShowWalletAddress = ({
  onClose,
  onUpdate,
  conectedAddress
}: ShowWalletAddressProps) => {

  return (
    <Modal blurImg>
      <Card pseudoElement="third" >
        <button onClick={() => onClose()} className="cursor-pointer absolute top-2 right-2">
          <CancleIcon />
        </button>
        <div className="flex flex-col justify-center items-center text-center ">
          <Typography
            isIcon={false}
            variant="customh5"
            className="text-text-primary text-center mobile:text-large mb-1 cursor-default text-[18px] break-all"
          >
            Your Minted Wallet Address is : <br/> {conectedAddress}.<br/>
            Please switch to this wallet address.
          </Typography>
          <div className="flex  py-3 gap-10 mobile:flex-col mobile:gap-6 mobile:mt-10">
            <div className="group hover:drop-shadow-primary w-[155px] ">
              <Button
                // isBorderLoading={blackPassDataRes}
                onClick={onUpdate}
                isBorder={true}
                bgColor={true}
                isBorderLabel="CONNECT WALLET"
                color="white"
                className="w-[150px]"
                CLASSNAME=" text-text-primary group-hover:text-text-secondary px-2 "
              />
            </div>
          </div>
        </div>
      </Card>
    </Modal>
  );
};
