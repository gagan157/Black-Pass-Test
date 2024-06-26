import { Card } from "components/Atoms/Card/Card";
import { Typography } from "components/Atoms/Typography/Typography";
import { Modal } from "../Modal";
import { Button } from "components/Atoms/Button/Button";
import { GIFS } from "assets/gifs";
import { EXPLORER_LINK } from "constants/config";
import { CancleIcon } from "assets";
import { useGetUserDetails } from "hooks/usegetUserDetails";

interface ClaimBlackPassProps {
  onClose: () => void;
}

export const ClaimBlackPass = ({ onClose }: ClaimBlackPassProps) => {
  const { userData } = useGetUserDetails();

  return (
    <Modal blurImg>
      <Card pseudoElement="default" className=" !p-0">
        <button onClick={() => onClose()} className="cursor-pointer absolute top-2 right-2">
          <CancleIcon />
        </button>
        <div className="flex flex-col justify-center items-center text-center">
          <Typography
            isIcon={false}
            className=" text-text-secondary text-xxxxl leading-10 
              mobile:text-xxl mobile:leading-6 mobile:tracking-tight  "
          >
            CONGRATULATIONS!
            <br />
            <span className="text-text-primary px-4">
              YOU CLAIMED YOUR BLACK PASS
            </span>
          </Typography>
          <div className="h-80 w-full mobile:h-[280px] ">
            <img
              src={GIFS.ASTRO_GIF2}
              alt="astraNova"
              className="m-auto max-w-[300px] min-w-[100px] w-full"
            />
          </div>
          <div className="flex items-center justify-center gap-3 mobile:flex-col mobile:gap-2">
            <div className="group">
              <Button
                bgColor={true}
                CLASSNAME="px-3 text-text-primary group-hover:text-text-secondary mobile:px-2"
                type="submit"
                color="white"
                isBorderLabel="CHECK OUT THE COLLECTION"
                isBorder={true}
                onClick={() => {
                  if (userData?.WalletsType?.EVM) {
                    window.open(
                      `${EXPLORER_LINK}/address/${userData?.WalletsType?.EVM}`,
                      "_blank"
                    );
                    onClose();
                  }
                }}
              />
            </div>
          </div>
        </div>
      </Card>
    </Modal>
  );
};