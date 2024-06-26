import { useState } from "react";
import { Images } from "../../assets/Images";
import YouTubeVideo from "components/YoutubeVideo";

function Accordion() {
  const sectionsData = [
    {
      title: "What is the Black Pass?",
      content:
        "The Black Pass is a SocialFI platform accessible through a free soulbound NFT, mintable at the time of joining. On this platform, you'll undertake  social quests and farm shards (points) to earn the $RVV token airdrop, the official token of the Astra Nova ecosystem. It all begins with Season 1, centered around Astra Nova's upcoming game demo.",
    },
    {
      title: "How to navigate blackpass",
      video: "KMWKQOeZUqY",
    },
    {
      title: "What is $RVV and when will it be launched?",
      content:
        "$RVV iis the token of the Astra Nova Ecosystem. It will be launched between Q2 and Q3 of 2024. More info on",
    },
    {
      title: "What are Shards and how can I collect them?",
      content:
        "Shards are rewards you earn by completing tasks on our SocialFi platform. These are on-chain points reflecting your activity and engagement within our ecosystem. The more Shards you collect, the higher your loyalty points, leading to greater airdrop opportunities and exclusive benefits. Engage actively on the platform to maximize your Shard collection and unlock valuable rewards!",
    },
    {
      title: "How do I claim the shards? ",
      content:
        "You can claim Shards after completing each quest. However, as we aim for full transparency, all the Shards are on-chain. We recommend that you only claim and update the Black Pass when necessary, as each update incurs fees (cents in Immutable zkEVM). We are providing you with 20 free transactions on the Black Pass, that should be more than enough.",
    },
    {
      title: "CAN I receive the Airdrop if I don’t claim the shards",
      content:
        "If you don’t claim the Shards, there's no way to measure your contribution to Astra Nova. Therefore, we can't reward you with $RVV.",
    },
    {
      title: " What happens after Season 1? When does it end?",
      content:
        "Season 1 will be brief and will conclude with the $RVV Token Generation Event (TGE). However, the journey doesn't stop there. The Black Pass continues beyond Season 1, offering multiple seasons, each with unique rewards. Think of the Black Pass as your ongoing passport to the Astra Nova universe, providing endless opportunities and never-ending rewards.",
    },
    {
      title: "What is Astra Nova?",
      content:
        "Astra Nova is a pioneering Web3 RPG originating from Saudi Arabia, set in a universe on the brink of destruction. It offers immersive storytelling, strategic gameplay, and next-gen rewards. Leveraging Unreal Engine 5, it provides unparalleled graphics and gameplay. Powered by Hedera Hashgraph & IMX zkEVM, it's incubated by the Hashgraph Association, to redefine Web3 gaming with immersive experiences and cutting-edge technology.",
    },
  ];

  const [openSectionIndex, setOpenSectionIndex] = useState(null);

  const handleOpenSection = (index: any) => {
    setOpenSectionIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className=" w-auto m-auto md:[40px]">
      {sectionsData.map((section, index) => (
        <div
          key={index}
          className="flex flex-col gap-[10px]"
          style={{
            borderTop: "0.75px dashed rgb(250, 250, 250, 0.4)",
            borderBottom:
              openSectionIndex === index
                ? "0.75px dashed rgb(250, 250, 250, 0.4)"
                : "",
          }}
        >
          <div
            className={`flex items-center justify-between mt-5 ${openSectionIndex === index ? "mb-1" : "mb-5"
              } `}
            onClick={() => handleOpenSection(index)}
          >
            <div className="flex items-center gap-2">
              <img
                src={
                  openSectionIndex === index
                    ? Images.ACCORDIAN_GARROW
                    : Images.ACCORDIAN_ARROW
                }
                alt="arrow"
                className="w-[14px] h-[14px]"
              />
              <p
                className={`font-bold text-[12px] sm:text-[14px] md:text-[18px] ${openSectionIndex === index
                  ? "text-text-secondary"
                  : "text-text-primary"
                  }  opacity-[75%] uppercase`}
              >
                {section?.title}
              </p>
            </div>
            <img
              src={openSectionIndex === index ? Images.SUB : Images.ADD}
              alt="subtract"
              className={` w-[16px] md:w-[22px] ${openSectionIndex === index ? "h-[2px]" : "w-[16px] md:h-[22px]"
                } cursor-pointer`}
            />
          </div>
          {openSectionIndex === index && (
            <>
              <div className="flex flex-col">
                <p className="text-[12px] text-text-primary opacity-[75%] w-auto max-w-[1100px] mb-5 font-sans ml-5">
                  {section?.content}

                  {section?.title ===
                    "What is $RVV and when will it be launched?" && (
                      <a
                        href="https://whitepaper.astranova.world/economics/token"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-secondary font-medium hover:underline ml-1"
                      >
                        our gitbook .
                      </a>
                    )}
                </p>
              </div>
              {
                // <iframe src={section?.video} height={500} />
                section?.video &&
                <div className="lg:ml-20 lg:mr-20">
                  <YouTubeVideo videoId={section.video} />
                </div>
              }
            </>
          )}
        </div>
      ))}

    </div>
  );
}

export default Accordion;