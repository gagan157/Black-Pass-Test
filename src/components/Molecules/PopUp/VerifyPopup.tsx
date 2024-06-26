import { Button } from "components/Atoms/Button/Button";
import { Card } from "components/Atoms/Card/Card";
import { Modal } from "../Modal";
import { CancleIcon } from "assets";

interface TwitterQuestPopupProps {
  onClosePopUp: () => void;
  onFollow: () => void;
  text: string;
  loading:boolean;
}

export const TwitterQuestPopup = ({
  onFollow,
  onClosePopUp,
  text,
  loading,
}: TwitterQuestPopupProps) => {

  return (
    <Modal blurImg>
      <Card pseudoElement="secondary" className="mobile:h-[200px]">
        <button onClick={() => {
          if(!loading){
            onClosePopUp()
          }
          }} className="cursor-pointer absolute top-2 right-2">
          <CancleIcon />
        </button>
        <div className="flex flex-col justify-center items-center text-center">
          <p
            className="text-text-light text-left mobile:text-large mb-1 !text-medium"
          >
            To complete this quest please verify twitter Quest.
          </p>
        </div>
        <div className="flex gap-2 mobile:flex-col">
          <div className="group hover:drop-shadow-primary w-[200px] mobile:w-[155px] h-[60px] mt-1 flex justify-center items-center">
            <Button
              type="button"
              color="white"
              isBorder
              disable={loading}
              isBorderLabel={text}
              CLASSNAME="px-3 text-text-primary group-hover:text-text-secondary"
              onClick={() => onFollow()}
            />
          </div>
          <div className="group hover:drop-shadow-primary w-[180px] mobile:w-[155px] mt-1 flex justify-center items-center">

            <Button
              type="button"
              color="white"
              isBorder
              disable={loading}
              isBorderLabel="BACK TO DASHBOARD"
              CLASSNAME="px-3 text-text-primary group-hover:text-text-secondary mobile:px-3"
              onClick={onClosePopUp}
            />
          </div>
        </div>
      </Card>
    </Modal>
  );
};





