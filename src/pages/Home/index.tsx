import {
  IDENTITY,
  REWARDS,
  FEATURES,
  SHARDSRVV,
  ASTRONOVO,
  LargeLine,
  LeftGlowArrow,
} from "assets";
import { Images } from "assets/Images";
import Accordion from "components/Accordion/accordion";
import { Button } from "components/Atoms/Button/Button";
import { Card } from "components/Atoms/Card/Card";
import { Typography } from "components/Atoms/Typography/Typography";
import { VIDEOS } from "assets/videos";
import checkBrowser from "hooks/chackBrowser";
import { GIFS } from "assets/gifs";
import { API_ROUTES } from "constants/API_ROUTES";
import { Link, Navigate } from "react-router-dom";
import { Footer } from "components/Footer";

const ImgList = [
  { IMG: Images.PARTNER1 },
  { IMG: Images.PARTNER2 },
  { IMG: Images.PARTNER3 },
  { IMG: Images.PARTNER4 },
  { IMG: Images.PARTNER5 },
  { IMG: Images.PARTNER6 },
  { IMG: Images.PARTNER7 },
  { IMG: Images.PARTNER8 },
  { IMG: Images.PARTNER9 },
  { IMG: Images.PARTNER10 },
  { IMG: Images.PARTNER11 },
  { IMG: Images.PARTNER12 },
  { IMG: Images.PARTNER13 },
  { IMG: Images.PARTNER14, height :10},
  { IMG: Images.PARTNER15, height :10},
  { IMG: Images.PARTNER16, height :10},
  { IMG: Images.PARTNER17, height :10},
  { IMG: Images.PARTNER18, height :10},
  { IMG: Images.PARTNER19, height :10},
  { IMG: Images.PARTNER20, height :10},
  { IMG: Images.PARTNER21, height :10},
  { IMG: Images.PARTNER22, height :10},
  { IMG: Images.PARTNER23, height :10},
  { IMG: Images.PARTNER24, height :10},
  { IMG: Images.PARTNER25 },
  { IMG: Images.PARTNER26 },
  { IMG: Images.PARTNER27 },
  { IMG: Images.PARTNER28 },
  { IMG: Images.PARTNER29 },
  { IMG: Images.PARTNER30 },
  { IMG: Images.PARTNER31 },
  { IMG: Images.PARTNER32 },
  { IMG: Images.PARTNER33 },
  { IMG: Images.PARTNER34 },
  { IMG: Images.PARTNER35 },
  { IMG: Images.PARTNER36 },
  { IMG: Images.PARTNER37 },
  { IMG: Images.PARTNER38 },
  { IMG: Images.PARTNER39 },
  { IMG: Images.PARTNER40 },
  { IMG: Images.PARTNER41 , height :10},
  { IMG: Images.PARTNER42 , height :10},
  { IMG: Images.PARTNER43 , height :10},
  { IMG: Images.PARTNER44 , height :10},
  { IMG: Images.PARTNER45 , height :10},
  { IMG: Images.PARTNER46 , height :10},
  { IMG: Images.PARTNER47 , height :10},
  { IMG: Images.PARTNER48 , height :10},
  { IMG: Images.PARTNER49 , height :10},
  { IMG: Images.PARTNER50 , height :10},
  { IMG: Images.PARTNER51 , height :10},
  { IMG: Images.PARTNER52 , height :10},
  { IMG: Images.PARTNER53 , height :10},
  { IMG: Images.PARTNER54 , height :10},
  { IMG: Images.PARTNER55 , height :10},
  { IMG: Images.PARTNER56 , height :10},
  { IMG: Images.PARTNER57 , height :10},
  { IMG: Images.PARTNER58 , height :10},
  { IMG: Images.PARTNER59 , height :10},
  { IMG: Images.PARTNER60 , height :10},
  { IMG: Images.PARTNER61 },
  { IMG: Images.PARTNER62 },
  { IMG: Images.PARTNER63 },
  { IMG: Images.PARTNER64 },
  { IMG: Images.PARTNER65 },
];

const MobImgList = [
  { IMG: Images.MOBPARTNER1 },
  { IMG: Images.MOBPARTNER2 },
  { IMG: Images.MOBPARTNER3 },
  { IMG: Images.MOBPARTNER4 },
  { IMG: Images.MOBPARTNER5 },
  { IMG: Images.MOBPARTNER6 },
  { IMG: Images.MOBPARTNER7 },
  { IMG: Images.MOBPARTNER8 },
  { IMG: Images.MOBPARTNER9 },
  { IMG: Images.MOBPARTNER10 },
  { IMG: Images.MOBPARTNER11 },
  { IMG: Images.MOBPARTNER12 },
  { IMG: Images.MOBPARTNER13 , height :10},
  { IMG: Images.MOBPARTNER14 , height :10},
  { IMG: Images.MOBPARTNER15 , height :10},
  { IMG: Images.MOBPARTNER16 , height :10},
  { IMG: Images.MOBPARTNER17 },
  { IMG: Images.MOBPARTNER18 },
  { IMG: Images.MOBPARTNER19 },
  { IMG: Images.MOBPARTNER20 },
  { IMG: Images.MOBPARTNER21 },
  { IMG: Images.MOBPARTNER22 },
  { IMG: Images.MOBPARTNER23 },
  { IMG: Images.MOBPARTNER24 },
  { IMG: Images.MOBPARTNER25 },
  { IMG: Images.MOBPARTNER26 },
  { IMG: Images.MOBPARTNER27 },
  { IMG: Images.MOBPARTNER28 },
  { IMG: Images.MOBPARTNER29, height :10},
  { IMG: Images.MOBPARTNER30, height :10},
  { IMG: Images.MOBPARTNER31, height :10},
  { IMG: Images.MOBPARTNER32, height :10},
  { IMG: Images.MOBPARTNER33 },
  { IMG: Images.MOBPARTNER34 },
  { IMG: Images.MOBPARTNER35 },
  { IMG: Images.MOBPARTNER36 },
  { IMG: Images.MOBPARTNER37 , height :10},
  { IMG: Images.MOBPARTNER38 , height :10},
  { IMG: Images.MOBPARTNER39 , height :10},
  { IMG: Images.MOBPARTNER40 , height :10},
  { IMG: Images.MOBPARTNER41 },
  { IMG: Images.MOBPARTNER42 },
  { IMG: Images.MOBPARTNER43 },
  { IMG: Images.MOBPARTNER44 },
  { IMG: Images.MOBPARTNER45 , height :10},
  { IMG: Images.MOBPARTNER46 , height :10},
  { IMG: Images.MOBPARTNER47 , height :10},
  { IMG: Images.MOBPARTNER48 , height :10},
  { IMG: Images.MOBPARTNER49 , height :10},
  { IMG: Images.MOBPARTNER50 , height :10},
  { IMG: Images.MOBPARTNER51 , height :10},
  { IMG: Images.MOBPARTNER52 , height :10},
  { IMG: Images.MOBPARTNER53 , height :10},
  { IMG: Images.MOBPARTNER54 , height :10},
  { IMG: Images.MOBPARTNER55 , height :10},
  { IMG: Images.MOBPARTNER56 , height :10},
  { IMG: Images.MOBPARTNER57 , height :10},
  { IMG: Images.MOBPARTNER58 , height :10},
  { IMG: Images.MOBPARTNER59 , height :10},
  { IMG: Images.MOBPARTNER60 , height :10},
  { IMG: Images.MOBPARTNER61 , height :10},
  { IMG: Images.MOBPARTNER62 , height :10},
  { IMG: Images.MOBPARTNER63 , height :10},
  { IMG: Images.MOBPARTNER64 },
  { IMG: Images.MOBPARTNER65 },
];

const CardData = [
  {
    icon: <IDENTITY />,
    title: "One Passport to the Astra Nova Universe",
    description:
      "Black Pass, through the free mint non-transferable Soulbound Token (SBT), stores all your information within the Astra Nova gaming ecosystem.",
    },
  {
    icon: <REWARDS />,
    title: "Earn Rewards at Every Turn",
    description:
      "Earn Shards for every quest in the portal! Your achievements are tracked and recorded on the Black Pass, unlocking exclusive benefits and rewards.",
    },
  {
    icon: <FEATURES />,
    title: " One Platform, Endless Features",
    description:
      "With your Black Pass, you can collect Shards, and gain exclusive access to upcoming digital collectable drops, IRL events, merchandise, and more! Plus, earn passive income with NFT staking opportunities and much more in store.",
  },
  {
    icon: <SHARDSRVV />,
    title: "More Shards, More $RVV!",
    description:
      "Ready to elevate your game? Collect more Shards and unlock a treasure trove of $RVV tokens! Transform your Shards into Astra Nova tokens ($RVV) on the big day of TGE. The more Shards you gather, the bigger your $RVV haul.",
  },
];

export const Home = () => {
  const search = window.location.search;
  const refferalCode = new URLSearchParams(search).get("referral_code");
  let token = localStorage.getItem("accessToken") as string;
  const signupUserData = (localStorage.getItem("signupUserData")) ? JSON.parse(localStorage.getItem("signupUserData") as string) : "";
  if (refferalCode !== null && refferalCode) {
    sessionStorage.setItem(
      "refferalCode",
      refferalCode
    );
  }
  const { isChrome } = checkBrowser();
  if (token && (!signupUserData?.user_name || !signupUserData?.email)) {
    return (
      <Navigate to={`/signup?accessToken=${token}`} />
    )
  } else if (token && signupUserData?.user_name) {
    return <Navigate to={"dashboard"} />;
  }

  return (
    <div className="h-full bg-background-mainWhite ">
      <div className="bg-landingGroup bg-center bg-cover relative md:h-[900px] mobile:h-[858px] h-[933px] lg:h-auto z-10">
        <div>
          <Typography
            isIcon={false}
            font="bold"
            // className="text-[73px] leading-[73px] text-text-primary mt-14 mx-auto"
            className="text-text-primary mx-auto text-[30px] sm:text-[40px] pt-[30px] sm:pt-[56px] sm:pb-[44px] pb-[20px] md:text-[60px] text-center"
          >
            ASTRA NOVA’S IDENTITY <br /> AND LOYALTY PROGRAM
          </Typography>
          <div className="flex justify-center items-center gap-5">
            <img
              src={Images.LANDING_LEFT_LINE}
              alt="left"
              className="h-[1.5px] md:h-[2px]"
            />
            <p
              className="font-bold text-[24px] text-[#52F9DA] whitespace-nowrap"
              style={{ textShadow: "#52F9DA 1px 0 10px" }}
            >
              Season 1
            </p>
            <img
              src={Images.LANDING_R_LINE}
              alt="rignt"
              className="h-[1.5px] md:h-[2px]"
            />
          </div>
        </div>
        <div className="AstroWrapper px-0 md:flex justify-between w-[85%] mx-auto items-center mt-[10px] sm:mt-[31px] lg:pb-[121px] absolute md:static bottom-0 left-0 right-0 mobile:w-4/5">
          <div>
            <Card pseudoElement="primary" className="py-1 px-5">
              <Typography
                isIcon={false}
                variant="p"
                className="text-xxs whitespace-nowrap"
              >
                THE BLACK PASS
              </Typography>
            </Card>
            <Typography
              isIcon={false}
              variant="p"
              className="text-text-secondary font-bold py-5 max-w-[330px] line-clamp-3 lg:line-clamp-2 "
            >
              The Black Pass{" "}
              <span className="text-text-primary font-normal text-[12px] leading-5">
                {" "}
                is a SocialFI platform accessible through a free soulbound NFT,
                mintable at the time of joining.
              </span>
            </Typography>
            
          </div>
          <div className="h-[430px] md:-translate-x-7 mobile:h-[304px] flex flex-col justify-center items-center mr-2 md:mr-0">
            {!isChrome ? (
              <img
                src={GIFS.ASTRO_GIF2}
                alt="astraNova"
                className="mx-auto max-w-[500px] min-w-[100px] w-full"
              />
            ) : (
              <video
                className=" h-full"
                autoPlay
                playsInline
                muted
                loop
                controls={false}
              >
                <source
                  type="video/webm; codecs=vp9"
                  src={VIDEOS.ASTRO_WIN}
                  className=""
                />
              </video>
            )}
            <div className="group">
              <Link
                to={`${API_ROUTES.TWITTER_VERIFICATION}`}
                className="mx-auto"
              >
                {/* <Button
                  isBorder={true}
                  isBorderLabel="Login with x"
                  CLASSNAME="px-5 text-text-primary group-hover:text-text-secondary !text-small mobile:px-3"
                  color="white"
                  size="medium"
                /> */}
                <button type="button" className="btn px-7 py-3 font-bold md:px-10 !text-sm">LOGIN WITH X</button>
              </Link>
            </div>
          </div>
          
          <div className=" group flex flex-col justify-center items-start md:items-center  pb-5 md:pb-0 mobile:mt-7 md:-translate-y-10">
            <img src={Images.LANDING_RVV} alt=""/>
          </div>
        </div>
      </div>
      <div className="relative translate-y-[-113px] mobile:translate-y-[-26px] z-[1] bg-background-blackmain ">
        <div className="h-full w-full max-w-[1744px] mx-auto">
          <img
            src={Images.BLACK_PASS_LAUNCH}
            alt="blackpasslaunch"
            className="h-full w-full object-fill"
          />
        </div>
      </div>
      <div className="w-full h-20 mobile:h-10 translate-y-[-113px] mobile:translate-y-[-26px] ">
        <img
          src={Images.VECTOR_V}
          alt="vImage"
          className="w-full h-[inherit]"
        />
      </div>
      <div className="h-full ">
        <div className=" relative top-5 ">
          <img
            src={Images.RIGHTROCK}
            alt=""
            className="float-end w-[64px] md:w-auto"
          />
        </div>

        <div className=" relative top-[612px] md:top-60 ">
          <img
            src={Images.LEFTROCK}
            alt=""
            className="float-start w-[40px] md:w-[auto]"
          />
        </div>
        <div className="AstroWrapper w-auto flex flex-col translate-y-[-113px] mobile:translate-y-[-26px] ">
          
          <Card
            pseudoElement="white"
            className="mt-20 mobile:mb-0 sm:mb-6 lg:mt-32 lg:mb-0 mobile:mt-10"            
          >
            <Typography
              isIcon={false}
              font="bold"
              className="text-text-black75 text-xxs"
              pclassName="justify-center pt-[0.15rem]"
            >
              BUSINESS PARTNERS
            </Typography>
          </Card>
          <div className="mt-5 mb-10 flex gap-1 mobile:my-5 ">
            <div className="leading-10 ">
              <div className="flex gap-1 md:items-center">
                <LeftGlowArrow />

                <p className="text-text-black uppercase font-bold lg:text-[35px] md:text-[29px] sm:text-[25px] leading-[27px] md:hidden">
                  EXTENDING OUR INFLUENCE WITH THE SUPPORT OF PREMIUM PARTNERS
                </p>

                <p className="text-text-black uppercase font-bold lg:text-[35px] md:text-[29px] sm:text-[25px] hidden md:block">
                  EXTENDING OUR INFLUENCE WITH
                </p>
              </div>
              <p className="text-text-black uppercase font-bold lg:text-[35px] md:text-[29px] sm:text-[25px] hidden md:block">
                THE SUPPORT OF PREMIUM
                <br />
                PARTNERS
              </p>
            </div>
          </div>
          <div>
            <div className=" md:grid hidden place-content-center place-items-center md:gap-5 w-full min-h-fit md:grid-cols-8 ">
              {ImgList.map((item, index) => (
                <img
                  src={item?.IMG}
                  alt="img"
                  key={index}
                  className= {`object-contain md:w-full ${item?.height ? "  aspect-[4/2] my-1 " : "aspect-[4/3] "}`}
                />
              ))}
            </div>
            <div className="md:hidden grid grid-cols-4 place-content-center place-items-center gap-4 w-full min-h-fit  ">
              {MobImgList.map((item, index) => (
                <img
                  src={item?.IMG}
                  alt="img"
                  key={index}
                  className= {`object-contain md:w-full ${item?.height ? "  aspect-[5/3] my-1 " : "aspect-[3/2] "}`}
                  // className= {`object-contain md:w-full aspect-[3/3]`}
                />
              ))}
            </div>
            {/* <div className=" grid grid-cols-4 place-content-center place-items-center gap-1 w-full min-h-fit md:hidden">
              {MobImgList.map((item, index) => (
                <>
                  {index <= 39 &&
                    <img
                      src={item.IMG}
                      alt="img"
                      key={index}
                      className="aspect-[3/2] object-contain w-12 "
                    />
                  }
                </>
              ))}
            </div>
            <div className=" grid grid-cols-3 place-content-center place-items-center w-full min-h-fit px-6 md:hidden">
              {MobImgList.map((item, index) => (
                <>
                  {index > 39 &&
                    <img
                      src={item.IMG}
                      alt="img"
                      key={index}
                      className="aspect-[3/2] object-contain w-12 "
                    />
                  }
                </>
              ))}
            </div> */}
          </div>
        </div>
        <div className="AstroWrapper mobile:w-[75%] sm:w-auto flex flex-col translate-y-[-113px] mobile:translate-y-[-26px]">
          <div className="">
            
            <div className="flex flex-col">
              <div className="leading-10 lg:translate-y-[113px]">              
              <Card
              pseudoElement="white"
              className="mb-5 mobile:mt-8"
            >
              <Typography
                isIcon={false}
                font="bold"
                className="text-text-black75 text-xxs leading-tight"
                pclassName="justify-center pt-[0.25rem]"
              >
                QUEST AND SHARDS
              </Typography>
            </Card>
                <div className="flex gap-1 md:items-center">
                  <LeftGlowArrow />
                  <p className="text-text-black uppercase font-bold lg:text-[35px] md:text-[29px] sm:text-[25px] leading-[27px] md:hidden">
                    Complete multiple quests and collect as many shards as you
                    can.
                  </p>
                  <p className="text-text-black uppercase font-bold lg:text-[35px] md:text-[29px] sm:text-[25px] hidden md:block">
                    Complete multiple quests
                  </p>
                </div>
                <p className="text-text-black uppercase font-bold lg:text-[35px] md:text-[29px] sm:text-[25px] hidden md:block">
                  and collect as many shards
                  <br />
                  as you can.
                </p>
              </div>
              <div className="lg:h-[300px] hidden md:block">
                <img src={Images.QUESTS} alt="" />
              </div>
              <div className="relative md:hidden h-[230px] mt-[10px]">
                <img src={Images.RVV} alt="" className="w-[100%]" />
                <img
                  src={Images.RVV_LOGO}
                  alt=""
                  className="absolute top-[30px] right-0 w-[190px]"
                />
              </div>
              <div className="bottom-20 left-0 w-full lg:translate-y-[-113px]">
                <Typography
                  isIcon={false}
                  font="regular"
                  className="text-text-black text-xs hidden md:block"
                >
                  This pass serves as a platform to store and redeem rewards,
                  such as <br />
                  Shards through task completion and social quests. During the
                  game <br />
                  demo stage, you can accumulate Shards to later convert them
                  into <br />
                  <span className="text-[#00a8e5] font-bold">
                    $RVV (Revive Token)
                  </span>
                  Think of the Black Pass as a digital profile within <br />
                  Astra Nova, preserving a player's on-chain achievements
                  indefinitely.
                </Typography>

                <Typography
                  isIcon={false}
                  font="regular"
                  className="text-text-black text-xs md:hidden"
                >
                  This pass serves as a platform to store and redeem rewards,
                  such as Shards through task completion and social quests.
                  During the game demo stage, you can accumulate Shards to later
                  convert them into {""}
                  <span className="text-[#00a8e5] font-semibold">
                    $RVV (Revive Token)
                  </span>
                  . Think of the Black Pass as a digital profile within Astra
                  Nova, preserving a player's on-chain achievements
                  indefinitely.
                </Typography>

                <Typography
                  isIcon={false}
                  font="bold"
                  className="text-[#00a8e5] my-5 text-[12px]"
                >
                  Only Black Pass holders will have access to claim the upcoming
                  $RVV Airdrop.
                </Typography>
              </div>
            </div>
          </div>          
        </div>
      </div>
      <div className="AstroWrapper">
      <div className="lg:mb-10 mobile:translate-y-[-26px] mobile:ml-11 sm:translate-y-[-245%]">
            <Card pseudoElement="white" className="mt-10 lg:mt-32 lg:mb-5">
              <Typography
                isIcon={false}
                font="bold"
                className="text-text-black75 text-xxs"
                pclassName="justify-center pt-[0.15rem]"
              >
                STEP BY STEP
              </Typography>
            </Card>
            
            <div className="flex gap-1 md:items-center mobile:my-5">              
              
              <p className="text-text-black uppercase font-bold lg:text-[35px] md:text-[29px] sm:text-[25px] block">
                how to get the black pass
              </p>
            </div>
            <div>
            </div>
      </div>
      <div className="grid lg:flex justify-around mb-[20px] grid-cols-1 translate-y-[-200px] mobile:translate-y-[-26px]">
        {/* first */}
        <div className="flex items-center lg:items-start flex-col lg:flex-row">
          <img
            src={Images.GROUP_Line}
            alt="line"
            className="h-[2px] w-[200px] relative top-6 hidden lg:block"
          />
          <div className="flex flex-col items-center text-center gap-4">
            <img
              src={Images.GROUP_ONE}
              alt="G-ONE"
              className="w-[63px] h-[63px]"
            />
            <p className="uppercase font-bold text-[18px] text-text-black leading-5">
              <span className="text-[#00a8e5] pr-[2px]">1.</span>Connect an EVM
              Wallet
            </p>
            <p className="text-[12px] text-text-black leading-5 opacity-[75%] font-sans">
              If you don’t have one, create it{" "}
              <span className="text-[#00a8e5] underline cursor-pointer font-semibold">
                <a
                  href="https://metamask.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>{" "}
              </span>
              .
            </p>
          </div>
        </div>
        {/* second */}
        <div className="flex items-center lg:items-start flex-col lg:flex-row">
          <div className="h-[100px] lg:h-0 flex items-center">
            <img
              src={Images.GROUP_Line}
              alt="line"
              className="h-[2px] w-[100px] lg:w-[200px] relative lg:top-6 rotate-90 lg:rotate-0"
            />
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <img
              src={Images.GROUP_TWO}
              alt="G-ONE"
              className="w-[63px] h-[63px]"
            />
            <p className="uppercase font-bold text-[18px] text-text-black leading-5">
              <span className="text-[#00a8e5] pr-[2px]">2.</span>Mint the Black
              pass
            </p>
            <p className="text-[12px] text-text-black leading-5 opacity-[75%] font-sans">
              Black Pass is a non-transferable Soulbound <br />
              Token (SBT) associated with your wallet and <br />
              will be forever in your wallet.
            </p>
          </div>
        </div>
        {/* third */}
        <div className="flex items-center lg:items-start flex-col lg:flex-row">
          <div className="h-[100px] lg:h-0 flex items-center">
            <img
              src={Images.GROUP_Line}
              alt="line"
              className="h-[2px] w-[100px] lg:w-[200px] relative lg:top-6 rotate-90 lg:rotate-0"
            />
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <img
              src={Images.Shards}
              alt="G-ONE"
              className="w-[63px] h-[63px]"
            />
            <p className="uppercase font-bold text-[18px] text-text-black leading-5">
              <span className="text-[#00a8e5] pr-[2px]">3.</span>Begin your
              journey
            </p>
            <p className="text-[12px] text-text-black leading-5 opacity-[75%] font-sans">
              Start participating in the quests and collecting <br /> your
              rewards.
            </p>
          </div>
          <img
            src={Images.GROUP_Line}
            alt="line"
            className="h-[2px] w-[200px] relative top-6 hidden lg:block"
          />
        </div>
        </div>
      </div>
      <div className="bg-homeBg bg-cover h-full -mt-[150px] mobile:mt-0">
        <div className="h-10 md:h-20 w-full bg-background-mainWhite  " style={{ clipPath: " polygon(50% 100%, 0 0, 100% 0)" }}></div>
        <div className="AstroWrapper">
          <div className="flex flex-col md:ml-20 pt-36 mobile:pt-24">
            <Card
              pseudoElement="primary"
              className="pl-6 mobile:ml-5 mobile:my-10"
            >
              <Typography
                isIcon={false}
                font="bold"
                className="text-text-primary text-xxs"
              >
                THE BENEFITS
              </Typography>
            </Card>
            <div className="mt-4 mobile:mt-0 mb-5 mobile:ml-5 ">
              <Typography
                isIcon={false}
                variant="h2"
                font="bold"
                className="text-text-primary uppercase mobile:text-[25px]"
              >
                bENEFITS OF HAVING THE BLACK PASS
              </Typography>
            </div>
            <div
              className={`mt-[61px] md:mt-4 mb-8 flex w-full md:grid flex-col items-center sm:grid-cols-1 gap-4 md:grid-cols-2 md:gap-14 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4`}
            >
              {CardData.map((item, index) => (
                <Card
                  key={index}
                  pseudoElement="default"
                  className="!min-h-[380px] !w-[280px] px-5 text-center justify-center items-center"
                >
                  <div className="w-full h-44 flex items-center justify-center px-2 ">
                    {item.icon}
                  </div>
                  <div className="h-44 ">
                    <Typography
                      isIcon={false}
                      font="bold"
                      className="text-text-primary text-large uppercase"
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      isIcon={false}
                      font="regular"
                      className="text-text-primary text-xs mt-1"
                    >
                      {item.description}
                    </Typography>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          <div className="mt-20 w-[90%] ml-5 md:ml-20">
            <p className="uppercase font-bold md:text-[35px] sm:text-[25px] text-[20px] leading-10 text-text-primary mb-[30px] md:mb-[65px]">
              FREQUENTLY ASKED QUESTIONS
            </p>
            <Accordion />
          </div>
          <div className="flex justify-center items-center flex-col">
            <div className="mt-14 md:mt-32 md:w-[80%]">
              <ASTRONOVO />
            </div>
            <div className="my-5">
              <LargeLine />
            </div>
          </div>
        </div>
          <Footer />
      </div>
    </div>
  );
};