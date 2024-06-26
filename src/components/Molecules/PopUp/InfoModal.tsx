import { CancleIcon, Line } from "assets";
import { Typography } from "components/Atoms/Typography/Typography";
import { Modal } from "../Modal";
import { Card } from "components/Atoms/Card/Card";

interface InfoModal {
    onClose: () => void;
}

export const InfoModal = ({
    onClose,
}: InfoModal) => {

  return (
    <Modal blurImg>
      <Card pseudoElement="third" >
        <button onClick={() => onClose()} className="cursor-pointer absolute top-2 right-2">
            <CancleIcon />
        </button>
        <div className="flex flex-col justify-center items-center text-center mt-6">
            <p
                className="text-text-light text-left mobile:text-large mb-1 !text-medium px-5"
            >
                <b>Every quest is on-chain, meaning there are fees associated with claiming shards </b> (a few cents as it’s Immutable zk-EVM). 
                <b>We are providing 20 free transactions on the platform so you don’t need to worry about it.</b> You don’t need to use them all, 
                we recommend “updating the Black Pass” only sometime near the end of Season 1 (we will announce it) or to see yourself in 
                the leaderboard. <b>You don’t need to keep updating it for every single quest and wasting the free transactions, there is no need 
                for it.</b>
            </p>
        </div>
      </Card>
    </Modal>
  );
};
