import {
  AstroLogo,
  CancleIcon,
  CloseIcon,
  HamburgerIcon,
  InfiniteIcon,
  SmallLine,
  SmallRankIcon,
  SmallShardIcon,
  UpArrow,
} from "assets";
import { Images } from "assets/Images";
import { Button } from "components/Atoms/Button/Button";
import { CircleButton } from "components/Atoms/CircleButton/CircleButton";
import { Typography } from "components/Atoms/Typography/Typography";
import { shortenAddress } from "constants/function";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDisconnect } from "wagmi";
import { useUser } from "../../context/userContext";
import { EXPLORER_LINK, RPC_LINK } from "constants/config";
import useBlur from "hooks/useBlur";
import { Modal } from "components/Molecules/Modal";
import { Card } from "components/Atoms/Card/Card";
import { ReportBugModal } from "components/Molecules/PopUp/ReportBug";
import { API_ROUTES } from "constants/API_ROUTES";
import { EventButtonNames, trackButtonClick } from "constants/cookie3";
import { HowToPlayModal } from "components/Molecules/PopUp/HowToPlay";
import { formatNumber } from "constants/utils";
import { ScanQR } from "pages/Dashboard/DevientWallets/popup/scanQr";

export const requiredChainID = RPC_LINK?.includes("testnet") ? 13473 : 13371;

const steps = [
  {
    content: "Open Metamask Wallet App",
  },
  {
    content: (
      <>
        Go to Metamask Browser Tab and Open
        <br />
        <Link
          to={"https://metamask.app.link/dapp/chainlist.org/chain/13371"}
          className="break-all"
          target="_blank"
        >
          https://metamask.app.link/dapp/chainlist.org/chain/13371
        </Link>
      </>
    ),
  },
  {
    content: "Click on the Connect Wallet button on the top right.",
  },
  {
    content: "Once connected, click the Add to MetaMask button.",
  },
  {
    content:
      "Confirm the MetaMask prompt that appears to add the network details.",
  },
  {
    content:
      "After successfully adding the network, switch to Immutable zkEVM from the network dropdown in MetaMask.",
  },
];

const networkDetails = [
  { label: "Network Name", value: "Immutable zkEVM" },
  { label: "RPC URL", value: RPC_LINK },
  { label: "Chain ID", value: requiredChainID },
  { label: "Symbol", value: "IMX" },
  { label: "Block Explorer URL", value: EXPLORER_LINK },
];

const addingSteps = [
  "Open MetaMask and click the network dropdown at the top.",
  "Click Add Network.",
  "Fill in the network details as above.",
  "Save and switch to the Immutable zkEVM chain.",
];

export const Header = () => {
  const { disconnectAsync } = useDisconnect();
  const navigate = useNavigate();
  const [openPopup, setOpenPopup] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const { pathname } = useLocation();
  const [reportBug, setReportBug] = useState(false);
  const {
    user,
    updateUser,
    dashboardMetrics,
    setAutoScroll,
    showHowToPlay,
    setShowHowToPlay,
  }: any = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useBlur(()=>setReportBug(false));
  const [isScanModal , setIsScanModal] = useState<boolean>(false);

  const HeaderList = [
    {
      text: "HOME",
      enabledPaths: user ? [] : ["/","/faq"],
      path: "/",
    },
    {
      text: "FAQ",
      enabledPaths: user? ["/faq", "/dashboard", "/leaderboard","/referrals","/devients"] : ["/","/faq", "/dashboard", "/leaderboard","/referrals","/devients"],
      path: "/faq",
    },
    {
      text: "DASHBOARD",
      enabledPaths: user
        ? ["/dashboard", "/leaderboard", "/faq","/referrals","/devients"]
        : ["/dashboard", "/leaderboard","/referrals","/devients"],
      path: "/dashboard",
    },
    {
      text: "LEADERBOARD",
      enabledPaths: user
        ? ["/dashboard", "/leaderboard", "/faq","/referrals","/devients"]
        : ["/dashboard", "/leaderboard","/referrals","/devients"],
      path: "/leaderboard",
    },
    {
      text: "REFERRALS",
      enabledPaths: user
       ? ["/dashboard", "/leaderboard", "/faq" , "/referrals","/devients"]
        : ["/dashboard", "/leaderboard","/referrals","/devients"],
      path: "/referrals",
    }
    // { text: 'SWAP' },
  ];

  const handleOpenPopup = () => {
    setOpenPopup(!openPopup);
    setIsMenuOpen(false);
  };

  const handlefunctions = async (key: any) => {
    handleOpenPopup();
    switch (key) {
      case "profile":
        navigate("/profile");
        setAutoScroll(false);
        break;
      case "lout":
        localStorage.clear();
        setOpenPopup(false);
        updateUser(null);
        await disconnectAsync();
        navigate("/");
    }
  };

  const handleCopy = (content: any) => {
    toast.success("Copied!");
    navigator.clipboard.writeText(content);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setOpenPopup(false);
  };

  const handleNavigation = (path: any) => {
    navigate(path);
    if (path === "/leaderboard") {
      trackButtonClick(EventButtonNames.LEADERBOARD, user?.id)
    }
  };

  const handleScanQRToggal = ()=> {
    setIsScanModal(!isScanModal)
  }

  const handleAstroLogoClick = () => {
    const accessToken = localStorage.getItem('accessToken') 
    if (!accessToken && pathname === "/faq") {
      navigate("/");
    }
    else if (accessToken && (pathname === "/leaderboard" || pathname === "/faq" || pathname === "/referrals"|| pathname === "/devients")) {
      navigate("/dashboard");
    }
  };

  const profileref = useBlur(() => {
    setOpenPopup(false);
  });

  const Hamburgerref = useBlur(() => {
    setIsMenuOpen(false);
  });

  const handlePathNavigate = (path: string) => {
    navigate(path);
    toggleMenu();
    if (path) {
      setIsMenuOpen(false);
    }
  };
  const WalletsType = user && user.Wallets ? user.Wallets.reduce((acc: any, curr: any) => {
    return { ...acc, [curr.wallet_type]: curr.wallet_address }
  }, {}) : '';

  return (
    <div className="relative w-full h-[76px] flex  border-b-[0.75px] border-b-lightprimary bg-background-blackmain">
      <div className="AstroWrapper flex w-full justify-between place-items-center">
        <div
          ref={Hamburgerref}
          onClick={toggleMenu}
          className={`items-center gap-2 cursor-pointer flex md:hidden ${isMenuOpen
            ? "h-full pr-5 mobile:pr-2"
            : ""
            } ${pathname === "/profile" && "invisible"} `}
        >
          {!isMenuOpen ? <HamburgerIcon /> : <CloseIcon />}
        </div>
        <div className="cursor-pointer flex-row gap-10 hidden md:flex ">
          <div className="hidden md:block" onClick={handleAstroLogoClick}>
            <AstroLogo />
          </div>
          {HeaderList.filter((item) =>
            item.enabledPaths.includes(pathname)
          ).map((item: any, index: number) => {
            return (
              <div key={index} className="flex flex-row ">
                {item.enabledPaths.includes(pathname) ? (
                  <Typography
                    variant="p"
                    font="bold"
                    isIcon={false}
                    className={` hidden md:flex ${item.enabledPaths.includes(pathname)
                      ? pathname === item.path
                        ? "text-text-secondary !cursor-pointer"
                        : "text-text-primary !cursor-pointer"
                      : ""
                      }`}
                    onClick={() => {
                      item.enabledPaths.includes(pathname);
                      handleNavigation(item.path);
                    }}
                  >
                    {item.text}
                  </Typography>
                ) : (
                  <div className="hidden md:flex ">
                    <Typography
                      variant="p"
                      font="bold"
                      isIcon={false}
                      className="text-text-lightgray !cursor-not-allowed "
                    >
                      {item.text}
                    </Typography>
                  </div>
                )}
                {user && index === 0 && (
                  <div className="ml-8 h-5 w-[2px] bg-background-lightgray mobile:hidden ">
                    {""}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="relative flex items-center gap-3 mobile:gap-1 md:w-[50%] " ref={profileref}>
          <div className="flex items-center gap-3 mobile:gap-2 md:w-full md:justify-end">
            <div
              className="flex item-center justify-center"
              onClick={() =>{ 
                setOpenPopup(false)
                setShowHowToPlay && setShowHowToPlay(true)
              }}
            >
              <Typography
                variant="p"
                font="semiBold"
                isIcon={false}
                className="text-text-secondary leading-tight !text-[12px] text-center sm:!text-[16px] cursor-pointer"
              >
                How to play?
              </Typography>
            </div>
            <div className="group hover:drop-shadow-primary flex justify-around items-center " >
              <Button
                bgColor={true}
                CLASSNAME="px-3 text-text-primary group-hover:text-text-secondary mobile:px-3"
                size="small"
                color="white"
                isBorderLabel="Alpha"
                isBorder={true}
                onClick={() => {
                  setOpenPopup(false)
                  setReportBug(true)
                }}
                className="h-7"
              />
            </div>
            
            {pathname === "/" &&
              <div className=" flex justify-around items-center">
                <Link
                  to={`${API_ROUTES.TWITTER_VERIFICATION}`}
                  className="mx-auto"
                >
                  <button type="button" className="btn px-4 py-2 font-bold">LOGIN WITH X</button>               
                </Link>
              </div>
            }
            

            <Button
                onClick={handleScanQRToggal}
                isBorder={true}
                bgColor={true}
                isBorderLabel="connect cdc"                
                color="white"
                CLASSNAME=" text-text-primary group-hover:text-text-secondary !px-2"
                className='!w-full lg:!max-w-[200px]'
                />

          </div>
          <div className="flex items-center gap-3 mobile:gap-1">
            {(pathname === "/dashboard" ||
              pathname === "/leaderboard" ||
              pathname === "/referrals" ||
              pathname === "/devients" ||
              (pathname === "/faq" && user)) && (
                <>
                  <div className="flex items-center gap-3 mobile:gap-1">
                    <div className="flex items-center gap-3 !cursor-default mobile:gap-1">
                      <SmallRankIcon />
                      <Typography
                        variant="customp"
                        font="bold"
                        isIcon={false}
                        className=" md:flex uppercase text-text-primary !cursor-default"
                      >
                        {dashboardMetrics?.rank === "NA" ? (
                          <InfiniteIcon />
                        ) : (
                          dashboardMetrics?.rank
                        )}
                      </Typography>
                      <span className="text-text-primary opacity-[30%] ml-1 ">
                        {" "}
                        |{" "}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 !cursor-default mobile:gap-1">
                      <SmallShardIcon />
                      {/* <div className="w-5 h-5 ">
                      <img src={Images.Shards} alt="" className="w-full h-full object-contain" />
                      </div> */}
                      <Typography
                        variant="customp"
                        font="bold"
                        isIcon={false}
                        className=" md:flex uppercase text-text-primary !cursor-default"
                      >
                        {dashboardMetrics?.shardOnBlackPass?._sum?.value
                          ? formatNumber(dashboardMetrics?.shardOnBlackPass?._sum?.value)
                          : "0"}
                      </Typography>
                    </div>
                  </div>
                </>
              )}
            {(pathname === "/dashboard" ||
              pathname === "/leaderboard" ||
              pathname === "/referrals" ||
              pathname === "/devients" ||
              pathname === "/faq") && WalletsType["EVM"]
              && (
                <>
                  <span className="text-text-primary opacity-[30%] hidden sm:block cursor-default">
                    |
                  </span>
                  <div
                    className="items-center gap-1 cursor-pointer hidden sm:flex"
                    onClick={() => {
                      setOpenPopup(false)
                      handleCopy(WalletsType["EVM"])}}
                  >
                    <img
                      src={Images.COPY}
                      alt="copy"
                      className="w-[12px] h-[12px] mr-1 cursor-pointer white-copy"
                    />
                    <Typography
                      variant="customp"
                      font="bold"
                      isIcon={false}
                      className=" md:flex text-text-primary uppercase"
                    >
                      {shortenAddress(WalletsType["EVM"] ?? "", 5)}
                    </Typography>
                  </div>
                </>
              )}
          </div>
          {pathname !== '/' &&
            <div className="flex items-center gap-3 mobile:gap-1">
              {pathname === '/signup' && (
                <CircleButton
                  label={"logout"}
                  avatar={`${user?.avatar}?${Date.now() + "astra"}`}
                  onClick={handleOpenPopup}
                />
              )}
              {!(
                pathname === "/" ||
                pathname === "/signup" ||
                (pathname === "/faq" && !user)
              ) && (                                     
                  <CircleButton
                    label={user && user?.user_name}
                    avatar={`${user?.avatar}?${Date.now() + "astra"}`}
                    onClick={handleOpenPopup}
                    labelColor={pathname === "/profile"? true : false}
                    cursorStyle={pathname === "/profile"? true : false}
                  />                  
                )}
            </div>
          }
          {(openPopup && pathname === "/dashboard") ||
            (openPopup && pathname === "/leaderboard") ||
            (openPopup && pathname === "/referrals") ||
            (openPopup && pathname === "/devients") ||
            (openPopup && pathname === "/faq") ? (
            <div className={`absolute top-16 right-0 p-3 z-30 bg-background-black95 w-[270px] ${WalletsType["EVM"] ? 'h-[263px]' : 'h-[163px]'} flex justify-center items-center flex-col gap-2`}>
              <Typography
                isIcon={false}
                variant="customh5"
                font="medium"
                className="text-text-primary cursor-default"
              >
                YOUR PROFILE
              </Typography>
              {WalletsType["EVM"] && (
                <>
                  <div className="">
                    <SmallLine />
                  </div>
                  <div className="flex flex-row gap-3 mobile:gap-2">
                    <div className="w-6 h-6 ">
                      <img
                        className="h-full w-full object-cover rounded-full"
                        src={`${user?.avatar}?${Date.now() + "astra"}`}
                        alt="avatar"
                      />
                    </div>
                    <Typography isIcon={false} variant="p" font="bold">
                      {shortenAddress(WalletsType["EVM"] ?? "", 8)}
                    </Typography>
                  </div>
                  <div className="flex gap-4">
                    <div
                      className="flex justify-center items-center gap-1 cursor-pointer py-2"
                      onClick={() => handleCopy(WalletsType["EVM"])}
                    >
                      <img
                        src={Images.COPY}
                        alt="copy"
                        className="w-[10px] h-[10px] cursor-pointer "
                      />
                      <Typography
                        font="bold"
                        isIcon={false}
                        className=" md:flex uppercase text-text-light text-[9px] tracking-wider"
                      >
                        COPY ADDRESS
                      </Typography>
                    </div>
                    <div
                      className="flex justify-center items-center gap-[2px] cursor-pointer "
                      onClick={() => {
                        window.open(
                          `${EXPLORER_LINK}/address/${WalletsType["EVM"]}`,
                          "_blank"
                        );
                      }}
                    >
                      <Typography
                        font="bold"
                        isIcon={false}
                        className=" md:flex uppercase text-text-light text-[9px] tracking-wider"
                      >
                        view on explorer
                      </Typography>
                      <UpArrow />
                    </div>
                  </div>
                </>
              )}

              <SmallLine />

              <div className="group flex justify-center items-center gap-2">
                <Button
                  size="medium"
                  color="white"
                  bgColor
                  isBorder={true}
                  isBorderLabel="EDIT PROFILE"
                  CLASSNAME=" text-text-primary group-hover:text-text-secondary px-5 w-full mx-5"
                  onClick={() => handlefunctions("profile")}
                />
              </div>
              <div className="group flex justify-center items-center">
                <Button
                  size="medium"
                  color="white"
                  bgColor
                  isBorder={true}
                  isBorderLabel="LOGOUT"
                  CLASSNAME=" text-text-primary group-hover:text-text-secondary w-full px-5 mx-5"
                  onClick={() => handlefunctions("lout")}
                />
              </div>
            </div>
          ) : (
            openPopup &&
            pathname !== "/profile" && (
              <div className="absolute top-11 right-0 p-5 mt-4 z-30 bg-background-black95 w-[270px] h-[70px] flex justify-center items-center flex-col gap-2">
                <div className="group flex justify-center items-center">
                  <Button
                    size="medium"
                    color="white"
                    bgColor
                    isBorder={true}
                    isBorderLabel="LOGOUT"
                    CLASSNAME=" text-text-primary group-hover:text-text-secondary px-5 mx-5"
                    onClick={() => handlefunctions("lout")}
                  />
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <div
        className={`flex flex-col items-center absolute left-0 top-[72px] z-50 w-screen bg-background-blackmain border-t border-solid border-white border-opacity-25
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-all duration-700 md:-translate-x-full md:transition-none`}
      >
        {HeaderList.filter((item) => item.enabledPaths.includes(pathname)).map(
          (item: any, index: number) => {
            return (
              <div
                key={index}
                className="border-b border-solid border-white border-opacity-25 w-full py-4"
                onClick={() => {
                  handlePathNavigate(item.path);
                }}
              >
                {item.enabledPaths.includes(pathname) ? (
                  <Typography
                    variant="p"
                    font="bold"
                    isIcon={false}
                    className={` md:flex ${item.enabledPaths.includes(pathname)
                      ? pathname === item.path
                        ? "text-text-secondary !cursor-pointer"
                        : "text-text-primary "
                      : ""
                      }  hover:text-text-secondary mx-auto `}
                  >
                    {item.text}
                  </Typography>
                ) : (
                  <Typography
                    variant="p"
                    font="bold"
                    isIcon={false}
                    className=" md:flex mx-auto !cursor-not-allowed "
                  >
                    {item.text}
                  </Typography>
                )}
              </div>
            );
          }
        )}
      </div>
      {showInfo && (
        <Modal blurImg={true} style={{ zIndex: 50 }}>
          <Card pseudoElement="secondary" className="!px-5">
            <button
              onClick={() => setShowInfo(false)}
              className="cursor-pointer absolute top-2 right-2"
            >
              <CancleIcon />
            </button>
            <div className="max-h-[56vh] mt-2 ">
              <Typography
                isIcon={false}
                variant="h5"
                font="semiBold"
                className=" text-text-primary"
              >
                Add the Immutable zkEVM <br /> Chain (chainId `$
                {requiredChainID}`) <br /> to your wallet
              </Typography>
              <ul className="flex flex-col gap-3 text-text-light break-words">
                {steps.map((step, index) => (
                  <li key={index}>
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-2">
                        <span className="min-w-max ">{` ${index + 1}`}:</span>
                        <span>{step.content}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <Typography
                isIcon={false}
                variant="h5"
                font="semiBold"
                className=" text-text-primary"
              >
                Manually Adding the Chain:
              </Typography>
              <dl className="text-text-light space-y-1">
                {networkDetails.map((item, index) => (
                  <React.Fragment key={index}>
                    <dt className="text-lg font-semibold">{item.label}:</dt>
                    <dd className="before:content-['-']">{item.value}</dd>
                  </React.Fragment>
                ))}
                <dt className="text-lg font-semibold pt-3">
                  Adding to MetaMask:
                </dt>
                {addingSteps.map((step, index) => (
                  <dd key={index} className="before:content-['-']">
                    {step}
                  </dd>
                ))}
              </dl>
              <div className="m-auto flex justify-center items-center group">
                <Button
                  onClick={() => setShowInfo(false)}
                  type="button"
                  CLASSNAME={`!max-w-80 w-20 pr-3 text-lg text-text-primary group-hover:text-text-secondary
                       mobile:px-2
                      `}
                  color="white"
                  isBorderLabel="OK"
                  isBorder={true}
                  bgColor
                />
              </div>
            </div>
          </Card>
        </Modal>
      )}
      
      {showHowToPlay && (
        <HowToPlayModal
          onClose={() => setShowHowToPlay && setShowHowToPlay(false)}
        />
      )}
      {reportBug && <ReportBugModal onClose={() => setReportBug(false)} />}
      {isScanModal && <ScanQR close={handleScanQRToggal} />}   
    </div>
  );
};