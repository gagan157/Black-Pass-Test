import React from "react";
import { Modal } from "../Modal";
import { Card } from "components/Atoms/Card/Card";
import { CancleIcon } from "assets";
import useBlur from "hooks/useBlur";
import { Typography } from "components/Atoms/Typography/Typography";

interface ReferralInfo {
  CloseReferralInfo: () => void;
}

const steps = [
  {
    content: "Follow Astra Nova",
  },
  {
    content: "Follow Deviants",
  },
  { content: "Follow the founder" },
  { content: "Like BP post" },
  { content: "RT BP post" },
];

export const ReferralInfo = ({ CloseReferralInfo }: ReferralInfo) => {
  const ref = useBlur(() => CloseReferralInfo());
  return (
    <div ref={ref}>
      <Modal blurImg>
        <Card pseudoElement="secondary" className="!px-6 ">
          <button
            onClick={() => CloseReferralInfo()}
            className="cursor-pointer absolute top-2 right-2"
          >
            <CancleIcon />
          </button>
          <div className="flex flex-col justify-start items-start mt-6 px-4">
            <Typography
              isIcon={false}
              variant="customh5"
              className="text-text-primary"
            >
              Complete 5 mandatory quests to activate your referral link
            </Typography>
            <ol className="flex flex-col gap-3 text-text-light mt-1">
              {steps.map((step, index) => (
                <li key={index}>
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2">
                      <span className="min-w-max ">{` ${index + 1}`}:</span>
                      <span>{step.content}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Card>
      </Modal>
    </div>
  );
};
