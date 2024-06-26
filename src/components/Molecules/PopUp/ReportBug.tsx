import { Modal } from "../Modal";
import { CancleIcon } from "assets";
import { Card } from "components/Atoms/Card/Card";
import { Button } from "components/Atoms/Button/Button";
import { FEEDBACK_EMAIL } from "constants/config";

interface ReportBugModal {
    onClose: () => void;
}

const steps = [
    {
      content: "This is an early version of the platform, that may not be fully functional, may contain bugs and is still being actively developed!",
    },
    {
      content: "Your feedback is extremely valuable to us, as we’re building the next-gen gaming experience! Your contributions will be rewarded appropriately!",
    },
  ];

export const ReportBugModal = ({ onClose }: ReportBugModal) => {
  return (
    <Modal blurImg={true} style={{ zIndex: 50 }}>
    <Card pseudoElement="secondary" className="!px-5">
      <button
        onClick={() => onClose()}
        className="cursor-pointer absolute top-2 right-2"
      >
        <CancleIcon />
      </button>
      <div className="max-h-[56vh] mt-2 ">
        <ul className="flex flex-col gap-3 text-text-light break-words">
          {steps.map((step, index) => (
            <li key={index}>
              <div className="flex flex-col gap-3 !cursor-default">
                <div className="flex gap-2">
                  <span className="min-w-max ">&#8226;</span>
                  <span>{step.content}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    <div className="m-auto mt-5 flex justify-center items-center group">    
        <Button
            color="white"
            size="large"
            bgColor
            isBorder={true}
            isBorderLabel="Share Feedback"
            CLASSNAME="w-[150px] text-text-primary group-hover:text-text-secondary"
            onClick={() => window.location.href=`${FEEDBACK_EMAIL}`}
        />
    </div>
    </Card>
  </Modal>
  );
};