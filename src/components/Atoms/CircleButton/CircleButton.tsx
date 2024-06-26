import { CircleButtonHover, CircleButtonIcon } from "assets";
import { Typography } from "../Typography/Typography";
import LazyImage from "components/LazyImage";

interface CircleButtonProps {
  disable?: boolean;
  onClick?: () => void;
  style?: object;
  className?: string;
  loading?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  label: string;
  labelPosition?: string;
  avatar?: any;
  labelColor ?: boolean;
  cursorStyle ?: boolean;
}

export const CircleButton = ({
  disable = false,
  style,
  className = "",
  loading = false,
  type = "button",
  label,
  labelPosition,
  avatar,
  onClick,
  labelColor = false,
  cursorStyle = false,
  ...props
}: CircleButtonProps) => {
  return (
    <>
      {labelPosition === "left" ? (
        <div
          className="flex !flex-row items-center gap-3 cursor-pointer group"
          onClick={onClick}
        >
          <Typography
            className="group-hover:!text-text-secondary transition-['color'] ease-out text-xxs text-text-primary uppercase"
            font="bold"
            isIcon={false}
          >
            {label}
          </Typography>

          <button>
            <div className="relative">
              <div className="group-hover:invisible transition-all duration-100 ease-out ">
                <CircleButtonIcon />
              </div>

              <div className="absolute inset-0 scale-0 group-hover:scale-100 transition-all duration-400 ease-out">
                <CircleButtonHover />
              </div>
            </div>
          </button>
        </div>
      ) : (
        <button
          onClick={onClick}
          disabled={loading || disable}
          className={` flex !flex-row items-center gap-3 group focus:outline-none ${
            disable ? "cursor-not-allowed opacity-20" : ""
          } ${cursorStyle ? "!cursor-default" : "cursor-pointer "} 
          `}
        >
          {loading ? (
            <div className="flex min-w-min justify-center gap-2 text-text-primary">
              <div
                className={`h-6 w-6 animate-spin border  ${
                  disable ? "border-white" : "border-gray-600"
                }`}
              ></div>
              loading...
            </div>
          ) : (
            <>
              {avatar ? (
                <>
                  <Typography
                    variant="p"
                    font="bold"
                    isIcon={false}
                    className={`group-hover:!text-text-secondary transition-['color'] ease-out uppercase text-text-primary cursor-pointer mobile:hidden ${labelColor ? "text-text-secondary !cursor-default" : ""} `}
                  >
                    {label}
                  </Typography>
                  <div className=" flex items-center justify-center">
                    <div className="relative">
                      <CircleButtonIcon />
                    </div>

                    <LazyImage highQualitySrc={avatar} alt="avatar" className={` !absolute transition-all duration-400 mt-[1px] w-10 h-10  ${labelColor ? "!cursor-default" : ""} `}  imgClassName="w-full h-full rounded-full border border-custom-color"/>
                    {/* <div className="absolute transition-all duration-400 mt-[1px] w-10 h-10 ">
                      <img
                        src={avatar}
                        alt="avatar"
                        className="w-full h-full rounded-full border border-custom-color"
                      />
                    </div> */}
                  </div>
                </>
              ) : (
                <>
                  <div className="relative">
                    <div className=" group-hover:invisible transition-all duration-100 ease-out ">
                      <CircleButtonIcon />
                    </div>

                    <div className="absolute inset-0 scale-0 group-hover:scale-100 transition-all duration-400 ease-out ">
                      <CircleButtonHover />
                    </div>
                  </div>

                  <Typography
                    variant="p"
                    font="bold"
                    isIcon={false}
                    className="group-hover:!text-text-secondary transition-['color'] ease-out uppercase"
                  >
                    {label}
                  </Typography>
                </>
              )}
            </>
          )}
        </button>
      )}
    </>
  );
};
