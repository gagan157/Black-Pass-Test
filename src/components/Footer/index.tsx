import {
  DiscordVector,
  LinkedinVector,
  MediumVector,
  TelegramVector,
  Xvector,
} from "assets";
import { Images } from "assets/Images";
import { Typography } from "components/Atoms/Typography/Typography";
import React from "react";
import { Link } from "react-router-dom";

const data = [
  {
    text: "COPYRIGHT 2024",
    className: "text-xs leading-xl cursor-default text-text-lightgray",
    link: "",
  },
  {
    text: "TERMS AND CONDITIONS",
    className:
      "text-xs leading-xl cursor-pointer text-text-light hover:text-text-secondary",
    link: "https://astranova.world/termsOfUse.pdf",
  },
  {
    text: "PRIVACY POLICY",
    className:
      "text-xs leading-xl cursor-pointer text-text-light hover:text-text-secondary",
    link: "https://astranova.world/privacyPolicy.pdf",
  },
  {
    text: "",
    className:
      "text-xs leading-xl cursor-default h-5 w-[2px] bg-text-lightgray hidden md:flex",
    link: "",
  },
  {
    text: "WHITEPAPER",
    className:
      "text-xs leading-xl cursor-pointer text-text-light hover:text-text-secondary",
    link: "https://whitepaper.astranova.world/",
  },
  {
    text: "VISIT ASTRANOVA",
    className:
      "text-xs leading-xl cursor-pointer text-text-light hover:text-text-secondary",
    link: "https://astranova.world/",
  },
];

const socialLinks = [
  {
    link: "https://astranovaofficial.medium.com/",
    image: <MediumVector />,
  },
  {
    link: "https://twitter.com/Astra__Nova",
    image: <Xvector />,
  },
  {
    link: "https://t.me/astranovaofficial",
    image: <TelegramVector />,
  },
  {
    link: "https://discord.com/invite/YQusFqaf6c",
    image: <DiscordVector />,
  },
  {
    link: "https://www.linkedin.com/company/astra-nova",
    image: <LinkedinVector />,
  },
];

export const Footer = () => {
  return (
    <div className="flex justify-center items-center max-w-[90%] md:max-w-[70%] gap-x-10 gap-y-3 mx-auto flex-wrap py-5 flex-col-reverse md:flex-row ">
      <div className="flex justify-center items-center text-center flex-col-reverse md:flex-row gap-x-10 gap-y-2">
        <div className="flex gap-x-2 md:gap-x-10  flex-row-reverse md:flex-row items-center justify-center">
          {data.slice(0, 3).map((item: any) => {
            return (
              <>
                <div
                  onClick={() => {
                    if (item.link) {
                      window.open(item.link, "_blank");
                    }
                  }}
                  className={item.className}
                >
                  <div className="flex items-center">{item.text}</div>
                </div>
              </>
            );
          })}
        </div>
        <div className="py-1 md:hidden">
          <img src={Images.LINE} alt="" />
        </div>
        <div className="flex gap-x-10 gap-y-2 flex-row-reverse md:flex-row items-center justify-center">
          {data.slice(3).map((item: any, index: any) => {
            return (
              <>
                <div
                  onClick={() => {
                    if (item.link) {
                      window.open(item.link, "_blank");
                    }
                  }}
                  className={item.className}
                >
                  <div className="flex items-center">{item.text}</div>
                </div>
                {index === 1 && (
                  <div className="h-3 w-[1px] bg-text-lightgray md:hidden">
                    {" "}
                  </div>
                )}
              </>
            );
          })}
        </div>
        <div className="py-1 md:hidden">
          <img src={Images.LINE} alt="" />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-y-1">
        <div className="py-3 md:hidden">
          <img src={Images.LINE} alt="" />
        </div>

        <div className="flex gap-x-10 gap-y-2 md:gap-x-5 flex-row items-center ">
          {socialLinks.map((item, index) => {
            return (
              <div>
                <Link to={item.link} target="_blank" key={index}>
                  <div
                    className={` opacity-[75%] cursor-pointer text-text-primary hover:text-text-secondary`}
                  >
                    {item.image}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
