import { Button } from "components/Atoms/Button/Button";
import { Modal } from "../Modal";
import { Card } from "components/Atoms/Card/Card";

import { CancleIcon } from "assets";

interface BladeWalletProps {
  onClosePopUp: () => void;
  onConnect: (type: string) => void;
}

export const BladeWalletModal = ({
  onClosePopUp,
  onConnect
}: BladeWalletProps) => {

    const handleConnect = (type: any) => {
        onConnect(type);
        onClosePopUp();
    };

  return (
    <Modal blurImg>
    <Card pseudoElement="secondary" className="mobile:h-[200px]">
        <button onClick={() => onClosePopUp()} className="cursor-pointer absolute top-2 right-2">
            <CancleIcon />
        </button>
        <div className="flex flex-col items-center justify-around gap-3 mt-2 sm:mt-0">
            <div className="group flex justify-around items-center">
                <Button
                    bgColor={true}
                    CLASSNAME="pr-2 text-text-primary group-hover:text-text-secondary"
                    className="w-[200px]"
                    size="extraSmall"
                    color="white"
                    isBorderLabel="Connect with Extension"
                    isBorder={true}
                    onClick={() => handleConnect('EXTENSION')}
                />
            </div>

            <div className="group flex justify-around items-center">
                <Button
                    bgColor={true}
                    CLASSNAME="pr-2 text-text-primary group-hover:text-text-secondary"
                    className="w-[200px]"
                    size="extraSmall"
                    color="white"
                    isBorderLabel="Connect with QR"
                    isBorder={true}
                    onClick={() => {
                        handleConnect('WALLET_CONNECT')
                    }}
                />
            </div>

        </div>
      </Card>
    </Modal>
  );
};





