import clsx from "clsx";
import React from "react";

interface CardPros {
  children: React.ReactNode | any;
  className?: string;
  pseudoElement: "default" | "primary" | "white" | "secondary" | "third" ;
  borderStyle?: boolean;
  bgColor?: boolean;
  showContent?: boolean;
  fullWidth?: boolean;
}

export const Card = ({
  children,
  className,
  pseudoElement,
  borderStyle = false,
  bgColor = false,
  showContent = false,
  fullWidth = false,
}: CardPros) => {
  const pseudoElementSize =
    pseudoElement === "default"
      ? `relative py-9 px-20 flex justify-center items-center flex-col border-2  ${
          borderStyle ? "border" : "border-dashed"
        } border-lightprimary bg-background-black95 before:content-[''] before:bg-transparent before:absolute before:-top-[2px] before:-left-[2px] before:w-[30px] before:h-[30px] before:border-t-[2px] before:border-t-primary before:border-r-transparent before:border-l-[2px] before:border-l-primary  after:content-[''] after:bg-transparent after:absolute after:-bottom-[2px] after:-right-[2px] after:w-[30px] after:h-[30px] after:border-b-[2px] after:border-b-primary after:border-l-transparent after:border-r-[2px] after:border-r-primary md:w-[600px] md:h-[500px] mobile:w-[300px] mobile:h-[450px]`
      : pseudoElement === "primary"
      ? ` relative min-h-[18px] w-[120px] border-none ${
          bgColor ? "bg-background-white5" : "bg-background-blacklight"
        }  before:content-[''] before:bg-transparent before:absolute before:-top-[2px] before:-left-[2px] before:w-[10px] before:h-[10px] before:border-t-[2px] before:border-t-primary before:border-r-transparent before:border-l-[2px] before:border-l-primary  after:content-[''] after:bg-transparent after:absolute after:-bottom-[2px] after:-right-[2px] after:w-[10px] after:h-[10px] after:border-b-[2px] after:border-b-primary after:border-l-transparent after:border-r-[2px] after:border-r-primary mobile:w-[120px] mobile:h-[20px]`
      : pseudoElement === "secondary"
      ? `relative py-9 px-20 flex justify-center items-center flex-col border-2  ${
          borderStyle ? "border" : "border-dashed"
        } border-lightprimary bg-background-black95 before:content-[''] before:bg-transparent before:absolute before:-top-[2px] before:-left-[2px] before:w-[30px] before:h-[30px] before:border-t-[2px] before:border-t-primary before:border-r-transparent before:border-l-[2px] before:border-l-primary  after:content-[''] after:bg-transparent after:absolute after:-bottom-[2px] after:-right-[2px] after:w-[30px] after:h-[30px] after:border-b-[2px] after:border-b-primary after:border-l-transparent after:border-r-[2px] after:border-r-primary md:w-[396px] mobile:w-[330px] mobile:h-[450px]`
      : pseudoElement === "third"
      ? `relative flex justify-center items-center flex-col border-2  ${
          borderStyle ? "border" : "border-dashed"
        } border-lightprimary bg-background-black95 before:content-[''] before:bg-transparent before:absolute before:-top-[2px] before:-left-[2px] before:w-[30px] before:h-[30px] before:border-t-[2px] before:border-t-primary before:border-r-transparent before:border-l-[2px] before:border-l-primary  after:content-[''] after:bg-transparent after:absolute after:-bottom-[2px] after:-right-[2px] after:w-[30px] after:h-[30px] after:border-b-[2px] after:border-b-primary after:border-l-transparent after:border-r-[2px] after:border-r-primary md:w-[630px] md:h-[262px] mobile:w-[330px] mobile:h-[450px]`
      : pseudoElement === "white"
      ? ` relative min-h-[18px] w-[136px] bg-background-black5 ${
          showContent
            ? "border-dashed border-2 border-black75 before:content-[''] before:bg-transparent before:absolute before:-top-[1.5px] before:-left-[2px] before:w-[35px] before:h-[35px] before:border-t-[2px] before:border-t-black before:border-r-transparent before:border-l-[2px] before:border-l-black after:content-[''] after:bg-transparent after:absolute after:-bottom-[2px] after:-right-[2px] after:w-[35px] after:h-[35px] after:border-b-[2px] after:border-b-black after:border-l-transparent after:border-r-[2px] after:border-r-black  mobile:before:-left-[2px] mobile:before:-top-[2px] mobile:after:-right-[2px]"
            : "border-none before:content-[''] before:bg-transparent before:absolute before:-top-[2px] before:-left-[2px] before:w-[10px] before:h-[10px] before:border-t-[2px] before:border-t-black75 before:border-r-transparent before:border-l-[2px] before:border-l-black75  after:content-[''] after:bg-transparent after:absolute after:-bottom-[2px] after:-right-[2px] after:w-[10px] after:h-[10px] after:border-b-[2px] after:border-b-black75 after:border-l-transparent after:border-r-[2px] after:border-r-black75"
        }`
      :"";

  return (
    <div className={clsx(pseudoElementSize, className)}>
      <div className={`overflow-y-auto pr-1 ${fullWidth ? "w-full" : ""}` }>{children}</div>
    </div>
  );
};
