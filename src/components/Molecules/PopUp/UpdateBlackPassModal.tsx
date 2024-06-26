import { CancleIcon, Line } from "assets";
import { Button } from "components/Atoms/Button/Button";
import { Typography } from "components/Atoms/Typography/Typography";
import React, { useEffect, useState } from "react";
import { Modal } from "../Modal";
import { Card } from "components/Atoms/Card/Card";
import { Images } from "assets/Images";
import { InfoModal } from "./InfoModal";

interface UpdateBLackPassProps {
  onClose: () => void;
  onUpdate: () => void;
  totalShards: any;
  blackPassDataRes: any;
  freeTxCount?: any;
}

export const UpdateBlackPassModal = ({
  onClose,
  onUpdate,
  totalShards,
  blackPassDataRes,
  freeTxCount,
}: UpdateBLackPassProps) => {
  const [openInfoModal, setOpenInfoModal] = useState(false);

  return (
    <Modal blurImg>
      <Card pseudoElement="third" >
      <button onClick={() => onClose()} className="cursor-pointer absolute top-2 right-2">
              <CancleIcon />
            </button>
        <div className="flex flex-col justify-center items-center text-center ">
          <Typography
            isIcon={false}
            variant="h2"
            className="text-text-primary mobile:text-3xl cursor-default"
          >
            UPDATE BLACK PASS
          </Typography>
          <div className="py-2">
             <img src={Images.LINE} alt="line" />
            </div>
          <Typography
            isIcon={false}
            variant="customh5"
            className="text-text-primary text-center mobile:text-large mb-1 cursor-default"
          >
            <span className="text-text-secondary">{totalShards}</span> SHARDS
            WILL BE ADDED TO YOUR BLACK PASS
          </Typography>{" "}
          <Typography
            isIcon={false}
            variant="h6"
            className="text-text-primary text-center mobile:text-large mb-4 flex mobile:line-clamp-2 "
          >
            {freeTxCount?.userTransactionCount?.transaction_count  >= freeTxCount?.maxFreeTransaction?.free_transaction_count ? "" : "FREE TRANSACTIONS USED : "}
            <span className="text-text-secondary flex items-center justify-center gap-2">
              {freeTxCount?.userTransactionCount?.transaction_count  >= freeTxCount?.maxFreeTransaction?.free_transaction_count  ?
              "GAS TRANSACTION WILL CHARGE"
              :
              <span className="ml-1 flex items-center justify-center gap-1">
              {" "}
              {freeTxCount?.userTransactionCount?.transaction_count}
              {" / "}
              {freeTxCount?.maxFreeTransaction?.free_transaction_count}
              <img src={Images.InfoLogo} alt="info" 
                className="w-5 h-5" 
                onClick={() => setOpenInfoModal(true)}
                title="Info"
              />
              </span>
                }
            </span>
          </Typography>
          <div className="flex  py-3 gap-10 mobile:flex-col mobile:gap-6 mobile:mt-3">
            <div className="group hover:drop-shadow-primary  ">
              <Button
                onClick={onClose}
                isBorder={true}
                bgColor={true}
                isBorderLabel="GO BACK"
                color="white"
                CLASSNAME=" text-text-primary group-hover:text-text-secondary px-10 mobile:px-12"
              />
            </div>
            <div className="group hover:drop-shadow-primary w-[155px] ">
              <Button
                isBorderLoading={blackPassDataRes}
                disable={totalShards === null || blackPassDataRes}
                onClick={onUpdate}
                isBorder={true}
                bgColor={true}
                isBorderLabel="UPDATE BLACK PASS"
                color="white"
                className="w-[150px]"
                CLASSNAME=" text-text-primary group-hover:text-text-secondary px-2 "
              />
            </div>
          </div>
        </div>

        {openInfoModal && 
          <InfoModal onClose={() => setOpenInfoModal(false)}/>
        }
      </Card>
    </Modal>
  );
};
