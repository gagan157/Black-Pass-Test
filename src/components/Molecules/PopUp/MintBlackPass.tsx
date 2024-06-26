import { CancleIcon } from "assets";
import { Button } from "components/Atoms/Button/Button";
import { Typography } from "components/Atoms/Typography/Typography";
import { Modal } from "../Modal";
import { Card } from "components/Atoms/Card/Card";
import { GIFS } from "assets/gifs";

interface MintBLackPassProps {
    onClose: () => void;
    onUpdate: () => void;
}

export const MintBlackPassModal = ({
    onClose,
    onUpdate
}: MintBLackPassProps) => {

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
                        CLAIM YOUR BLACK PASS
                    </Typography>
                    <p
                        className="text-text-primary text-center mobile:text-small cursor-default mt-[10px]"
                    >
                        You have not claimed your Black Pass yet. Claim it to update your Black Pass.
                    </p>
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
                                onClick={() => { onUpdate(); onClose(); }}
                                CLASSNAME="px-3 text-text-primary group-hover:text-text-secondary mobile:px-2"
                                type="submit"
                                color="white"
                                isBorderLabel="Claim Black Pass"
                                isBorder={true}
                            />
                        </div>
                    </div>
                </div>
            </Card>
        </Modal>
    );
};