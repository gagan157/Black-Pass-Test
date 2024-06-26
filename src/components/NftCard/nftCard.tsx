import React from 'react'
import { Images } from '../../assets/Images'

export default function NftCard({text, des}: any) {
    return (
      <div className="relative w-[267px] lg:w-[267px] md:w-[230px] sm:w-[230px] h-[326px] cursor-pointer hover:text-[#1cf9cf] bg-img">
          <div className="top left"></div>
          <div className="bottom right"></div>
          <div className="relative lg:w-[267px] md:w-[230px] sm:w-[230px] h-[326px] flex flex-col items-center justify-around " 
          style={{
              background: `linear-gradient(
                0deg,
                rgba(24, 24, 24, 0.75),
                rgba(24, 24, 24, 0.75)
              ),
              linear-gradient(0deg, rgba(250, 250, 250, 0.3), rgba(250, 250, 250, 0.3))`,
              border: '0.75px dashed #fafafa4d',
            }}
          >
            <img src={Images.MARKGROUP} alt="image" className="sm:w-[214px] lg:w-[235px] md:w-[214px] h-[108px]" />
            <p className="font-bold text-[18px] leading-5 text-text-primary uppercase text-center hover:text-text-secondary">
              One platform,
              <br /> Multiple features
            </p>
            <p className="w-[205px] text-[12px] font-normal text-center leading-5 text-text-primary opacity-[75%]">
              Black Pass is a dynamic non-transferable Soulbound Token (SBT)
              associated with your wallet that gathers all your information inside
              the Astra Nova RPG.
            </p>
          </div>
      </div>
    )
}