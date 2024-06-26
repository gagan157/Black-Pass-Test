import React from "react";
import { Typography } from "../Typography/Typography";
import clsx from "clsx";

interface ButtonProps {
  color?:
    | "primary"
    | "secondary"
    | "third"
    | "fourth"
    | "default"
    | "graylight"
    | "white";
  size?: "extraSmall" | "small" | "medium" | "large" | "extraLarge" | "doubleExtraLarge";
  disable?: boolean;
  label?: string;
  onClick?: (param?: any) => void;
  onSubmit?: () => void;
  style?: object;
  className?: string;
  loading?: boolean;
  type?: "submit" | "button" | "reset" | undefined;
  variant?: "standard" | "line";
  icon?: string | any;
  children?: React.ReactNode | any;
  isBorder?: boolean;
  isBorderLabel?: string;
  isBorderLoading?: boolean;
  logo?: any;
  value?: number | string | React.ReactNode;
  bgColor?: boolean;
  CLASSNAME?: string;
  isBorderLabelsubText?: boolean;
  BorderLabelsubText?: string;
  hoverText?: string;
  valueClassName?: string;
  editButton?: string;
  showOnlyisBorderLoadingText?: boolean;
}

export const Button = ({
  color = "primary",
  variant = "standard",
  size = "medium",
  disable = false,
  label,
  style,
  icon,
  className = "",
  loading = false,
  type = "button",
  children,
  isBorder = false,
  isBorderLabel,
  isBorderLoading = false,
  logo,
  value,
  bgColor = false,
  CLASSNAME = "",
  isBorderLabelsubText = false,
  BorderLabelsubText ,
  hoverText,
  valueClassName,
  editButton,
  showOnlyisBorderLoadingText = false,
  ...props
}: ButtonProps) => {
  const sizeValues = {
    extraSmall : "h-8 w-[136px]" ,
    small: "h-7 max-w-[353px]",
    medium: "h-9 max-w-[468px]",
    large: "h-9 max-w-[353px]",
    extraLarge: "h-20 w-full mobile:h-14",
    doubleExtraLarge: "h-8 w-[500px] max-w-[549px] mobile:w-[300px] ",
  };

  const colorValues = {
    primary:
      variant === "standard" &&
      "bg-background-primary text-text-primary font-semibold",
    secondary:
      variant === "standard" &&
      "bg-background-secondary text-text-primary font-semibold",
    default:
      variant === "standard" &&
      "bg-background-default text-text-primary font-semibold",
    third:
      variant === "standard" &&
      "bg-background-third text-text-primary font-semibold",
    fourth:
      variant === "standard" &&
      "bg-background-gray text-text-primary font-semibold",
    graylight:
      variant === "standard" &&
      "bg-background-graylight text-text-primary font-semibold",
    white:
    variant === "standard" &&
    "bg-background-mainWhite text-text-primary font-semibold hover:bg-background-third",
  };

  const variantValues = {
    standard: `justify-center border border-transparent
    ${
      disable || loading
        ? "bg-background-light text-text-light"
        : colorValues[color] +
          `${
            color === "default" ? " hover:bg-danger-500 hover:text-white" : " "
          }
          `
    } ${sizeValues[size]}`,
    line: `${
      disable || loading ? "text-dark-secondary-300" : colorValues[color]
    } h-8 min-w-max justify-start`,
  };

  return (
    <button 
      type={type}
      className={`flex items-center relative text-xs  ${
        variantValues[variant]
      } ${sizeValues[size]} ${
        disable || loading ? "cursor-not-allowed" : "cursor-pointer"
      } ${icon ? "gap-1" : ""} ${className} `}
      disabled={loading ? true : disable}
      style={{
        ...style,
        clipPath: "polygon(4% 0, 100% 0, 100% 63%, 96% 100%, 0 100%, 0 40%)",
      }}
      title={hoverText}
      {...props}
    >
      {loading ? (
        <div className="flex min-w-min justify-center gap-2">
          <div
            className={`h-6 w-6 animate-spin border ${
              disable ? "border-white" : "border-gray-600"
            }`}
          ></div>
          loading...
        </div>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          {label}
        </>
      )}
      <>
        {isBorder ? (
          <div
          className={`w-full h-full flex items-center ${bgColor ? 'bg-background-black95' : 'bg-background-blacklight'} ${logo ? 'px-5 justify-between' : 'px-0 justify-center'} ${editButton}`}
            style={{
              clipPath:
                "polygon(4% 0, 100% 0, 100% 63%, 96% 100%, 0 100%, 0 40%)",
            }}
          >
            {isBorderLoading ? (
              <div className="flex min-w-min justify-center gap-2">
                
                {showOnlyisBorderLoadingText ? (
                    
                    "Loading..."
                  ) : (
                    <>
                    <div className={`h-4 w-4 animate-spin border`}></div>
                    <div>Loading...</div>
                    </>
                  )}
              </div>
            ) : (
              <>
                <div className="flex items-center gap-4 w-auto mobile:gap-1">
                  {logo && 
                  <div className="shrink-0">
                    
                  {logo}
                  </div>}
                  <div className="flex flex-col gap-1">
                  <Typography
                    className={clsx("text-xxs tracking-widest !font-bold leading-3 uppercase text-text-light " , CLASSNAME)}
                    isIcon={false}
                  >
                    {isBorderLabel}
                  </Typography>
                    {isBorderLabelsubText && 
                    <Typography
                      isIcon={false}
                      font="bold"
                      className=" text-text-secondary text-xxs mobile:text-[8px] tracking-widest mobile:text-start pr-2 sm:pr-4"
                    >
                      {BorderLabelsubText}
                      </Typography>
                    }
                    </div>
                </div>
                <Typography
                  isIcon={false}
                  variant="customh5"
                  className={`text-text-primary uppercase ${valueClassName}`}
                >
                  {value}
                </Typography>
              </>
            )}
          </div>
        ) : (
          ""
        )}
        {children}
      </>
    </button>
  );
};
