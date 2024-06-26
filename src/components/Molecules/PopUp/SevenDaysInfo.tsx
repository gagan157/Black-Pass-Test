import React from "react";
import { Modal } from "../Modal";
import { Card } from "components/Atoms/Card/Card";
import { CancleIcon } from "assets";
import { Typography } from "components/Atoms/Typography/Typography";
import { Images } from "assets/Images";
import { Button } from "components/Atoms/Button/Button";
import useBlur from "hooks/useBlur";

interface SevenDaysInfoProps {
  onClose: () => void;
}

export const SevenDaysInfo = ({ onClose }: SevenDaysInfoProps) => {
  const ref = useBlur(()=> onClose())
  return (
    <Modal blurImg>
      <Card pseudoElement="third" className="mobile:!h-[400px]">
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-2 right-2"
        >
          <CancleIcon />
        </button>

        <div className="grid place-items-center text-center" ref={ref}>
          <Typography
            isIcon={false}
            variant="h2"
            className="text-text-primary mobile:text-xxl cursor-default"
          >
            INFO
          </Typography>
        </div>
        <div className="py-5 flex justify-center items-center">
          <img src={Images.LINE} alt="line" />
        </div>
        <div className="grid place-items-center text-center  px-5">
          <Typography
            isIcon={false}
            variant="h3"
            className="text-text-primary uppercase mobile:text-2xl mobile:leading-7 cursor-default"
          >
            You will receive your shards after completing seven consecutive days
            of login.
          </Typography>
        </div>
        <div className=" group hover:drop-shadow-primary flex justify-center items-center py-5 mx-auto ">
          <Button
            onClick={onClose}
            isBorder={true}
            bgColor={true}
            isBorderLabel="BACK TO DASHBOARD"
            color="white"
            CLASSNAME=" text-text-primary group-hover:text-text-secondary px-2 mobile:px-3"
          />
        </div>
      </Card>
    </Modal>
  );
};
