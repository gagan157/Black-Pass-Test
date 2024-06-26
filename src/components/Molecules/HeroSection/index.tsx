import { Images } from "assets/Images";
import clsx from "clsx";
import React from "react";

interface HeroSectionProps {
  bgSrc: string;
  children?: React.ReactNode | any;
  end?: boolean;
  className?: string;
  childrenContent?: boolean;
}

export const HeroSection = ({ bgSrc, children, end,className , childrenContent=false}: HeroSectionProps) => {
  const additionalStyles = `before:content-[''] before:absolute before:left-0 before:top-15 before:w-0 before:h-0 before:border-t-[120px] before:border-t-[#0B0B0B] before:border-r-transparent before:border-r-[120px] after:content-['']  after:absolute after:right-0 after:bottom-0 after:w-0 after:h-0 after:border-t-[150px] after:border-t-transparent after:border-r-[120px] after:border-r-[#0B0B0B] after:border-r-[120px] mobile:before:border-t-[80px] mobile:before:border-r-[60px] mobile:after:border-t-[80px] mobile:after:border-r-[60px] `;

  return (
    <div>
      <div className="h-100vh w-full absolute ">
        <img
          className="h-full w-full object-fill relative z-10"
          src={Images.BLUR}
          alt=""
        />
      </div>
      <div className={`${additionalStyles} `}>
      {childrenContent ?  

      
        <div className={clsx (`absolute bg-background-darken z-20 h-[90vh] w-full` , className)}>
          {children}
        </div>
      :
        <div className={clsx (`absolute z-20 flex justify-center ${end ?'items-end' : 'items-center' } h-[87vh] w-full` , className)}>
          {children}
        </div>
        }

        <div className=" h-100vh p-5 mobile:p-3">
          <img className="h-full w-full object-fill" src={bgSrc} alt="" />
        </div>
      </div>
    </div>
  );
};
