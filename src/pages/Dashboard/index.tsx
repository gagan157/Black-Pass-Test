import {
  CancleIcon,
  ColorArrow,
  CyanAstroLogo,
  DashboardAstroLogo,
  DeviantsLogo,
  GoldArrow,
  GolderAstro,
  GrayAstroLogo,
  GrayColorArrow,
  InfiniteIcon,
  InfoIcon,
  RankLogo,
  ReferralLogo,
  RefreshIcon,
  Shards,
  ShardsLogo,
  Spinner,
  WalletIcon,
  WhiteAstroLogo,
} from "assets";
import { Images } from "assets/Images";
import { Button } from "components/Atoms/Button/Button";
import { Card } from "components/Atoms/Card/Card";
import { Typography } from "components/Atoms/Typography/Typography";
import { TwitterFollowPopup } from "components/Molecules/PopUp/TwitterFollowPopup";
import { UpdateBlackPassModal } from "components/Molecules/PopUp/UpdateBlackPassModal";
import {
  serialize,
  isDevices,
  isMobileDevice,
  formatNumber,
} from "constants/utils";
import { useUser } from "context/userContext";
import { useCustomError } from "hooks/accessTokenExpire";
import { useGetUserDetails } from "hooks/usegetUserDetails";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  CREATE_BLADE_WALLET,
  GET_DASHBOARD_DISCORD,
  GET_DASHBOARD_MISSIONS_TABS,
  GET_FREE_TRANSACTION_COUNT,
  GET_TWITTER_FOLLOW_VERIFY,
  GET_UPDATE_BLACKPASS,
  POST_BLOCKCHAIN_TRANSACTION,
  POST_DISCORD_VERIFY,
  PUT_CLAIM_SHARDS,
  PUT_DASHBOARD_CLAIM_ALL_SHARDS,
  WALLET_CONNECT_EVM,
  GET_USER_DETAILS,
  GET_TWITTER_QUEST
} from "services/apiService";
import { useAccount, useDisconnect, useWriteContract, useSignMessage, useSwitchChain } from "wagmi";
import nftAbi from "../../assets/nft-contract-data/nft-abi.json";
import {
  ASTRANOVA_SPHERE_LINK,
  ASTRANOVA_TOKEN_TROVE_LINK,
  ASTRANOVA_TWITTER_LINK,
  CONTRACT_ADDRESS,
  DEFAULT_QUEST_LIMIT,
  RPC_LINK,
  EXPLORER_LINK
} from "constants/config";
import { Loader, Smallloader } from "components/Loader";
import { useGetDashboardMatrics } from "hooks/usegetDashboardMatrics";
import { ethers } from "ethers";
import { API_ROUTES } from "constants/API_ROUTES";
import { Address } from "viem";
import {
  BladeConnector,
  ConnectorStrategy,
  HederaNetwork,
} from "@bladelabs/blade-web3.js";
import { Modal } from "components/Molecules/Modal";
import InfiniteScroll from "react-infinite-scroll-component";
import { HowToPlayModal } from "components/Molecules/PopUp/HowToPlay";
import { BladeWalletModal } from "components/Molecules/PopUp/CustomBladeSelectModal";
import { ReferralInfo } from "components/Molecules/PopUp/ReferralInfo";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import CustomWalletModal from "components/ConnectWallet";
import { SpinnerModal } from "components/Molecules/PopUp/Spinner";
import { ShowWalletAddress } from "components/Molecules/PopUp/ShowWalletAddress";
import { ClaimBlackPass } from "components/Molecules/PopUp/ClaimBlackPass";
import { MintBlackPassModal } from "components/Molecules/PopUp/MintBlackPass";
import { EventButtonNames, trackButtonClick } from "constants/cookie3";
import { Timer } from "./Timer";
import * as config from "constants/config";
import { SevenDaysInfo } from "components/Molecules/PopUp/SevenDaysInfo";
import { Footer } from "components/Footer";
import { ReferralLinkBtn } from "components/ReferralLinkBtn";
import { TwitterQuestPopup } from "components/Molecules/PopUp/VerifyPopup";
import { useDailySpinReward } from "hooks/useDailySpinRewards";
import { DailySpinReward } from "./DailySpinRewad.tsx";
import { CreatorQuest } from "components/Molecules/PopUp/CreatorQuest";
import { Referrals } from "./Referrals_3X";
import { DevientWallets } from "./DevientWallets";

// import { useSDK } from "@metamask/sdk-react";

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

export const Dashboard = () => {
  //hooks
  // const metamaskSdk = useSDK();
  // const { connected, account, chainId: sdkChainId } = useSDK();
  // const { connect, connectors } = useConnect();
  const { isConnected, address, chainId } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { disconnectAsync } = useDisconnect();
  const { getDashboardMarics } = useGetDashboardMatrics();
  const { writeContractAsync } = useWriteContract();
  const navigate = useNavigate();
  const { signMessageAsync } = useSignMessage();
  const { switchChain } = useSwitchChain();
  const {
    user,
    updateUser,
    dashboardMetrics,
    questPagination,
    setQuestPagination,
    setAutoScroll
  } = useUser();
  const { handleError } = useCustomError();

  //state 

  const [showBlackPass, setShowBlackPass] = useState(false);
  const [showCredited, setShowCredited] = useState(false);
  const [BlackPassResponse, setBlackPassResponse] = useState({ status: "idle" });
  const [validDiscord, setValidDiscord] = useState<boolean | undefined>(undefined);
  const [freeTx, setFreeTx] = useState();
  const [showFollow, setShowFollow] = useState(false);
  const [twitterMissionId, setTwitterMissionId] = useState(null);
  const [showStats, setShowStats] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questsData, setQuestsData] = useState<any>([]);
  const [socialAllMissions, setSocialAllMissions] = useState<any[]>([]);
  const [recurringAllMissions, setRecurringAllMissions] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState({
    credited: true,
    ongoingQuests: true,
    oneTimeQuests: true,
  });
  const [recurringAllMissionsType, setRecurringAllMissionsType] = useState("ALL_MISSIONS");
  const [socialAllMissionsType, setSocialAllMissionsType] = useState("ALL_MISSIONS");
  const [credicted, setShowCredicted] = useState<any[]>([]);
  const [ShowWalletConnectionIntro, setShowWalletConnectionIntro] = useState<any>(null);
  const { userData, setUserData, getUserDetails } = useGetUserDetails();
  const search = useLocation().search;
  const discordToken = new URLSearchParams(search).get("discordToken");
  const discordUsername = new URLSearchParams(search).get("discordUsername");
  const intent = new URLSearchParams(search).get("intent");
  let discordLink: string | null = null;
  const [bladeSelectModal, setBladeSelectModal] = useState(false);
  const [referralInfo, setReferralInfo] = useState(false);
  const [showCustomWalletModal, setShowCustomWalletModal] = useState(false);
  const [showWalletErrorModal, setShowWalletErrorModal] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [walletListsen, setWalletListen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [updateBlackPass, setUpdateBlackPass] = useState(false);
  const [updateBPValues, setUpdateBPValues] = useState({
    signature: '',
    shardsIdsArray: [],
    userAddress: '',
    userId: '',
  });
  // Modal to show after Black Pass is minted
  const [bpMintedModal, setBPMintedModal] = useState(false);
  // Modal to show if user tries to update Balck Pass without minting
  const [showMintBPModal, setShowMintBPModal] = useState(false);
  const [twitterQuest, setTwitterQuest] = useState<boolean>(false);
  const [signature, setSignature] = useState(undefined);
  const [mmSdk, setMMSdk] = useState(false);
  const [mmBpUpdate, setMmBpUpdate] = useState(undefined);
  const [isTwitterVerifying, setIsTwitterVerifying] = useState(false);
  const [sevenDaysInfo, setSevenDaysInfo] = useState(false);
  const [creatorQuestModal, setCreatorQuestModal] = useState(false);

  const {dailySpinRewardsData , handleLoadMoreData, hasMoreData, isloading:spinHinstoryLoading, handleresetState, handleDailyReward} = useDailySpinReward(showCredited)

  let refferalLink: string;
  if (window.location.href.includes("astranova.world")) {
    refferalLink = `https://blackpass.astranova.world?referral_code=${userData.referralCode}`;
  } else if (window.location.href.includes("black-pass-frontend-prod.azurewebsites.net")) {
    refferalLink = `https://black-pass-frontend-prod.azurewebsites.net?referral_code=${userData.referralCode}`;
  } else if (window.location.href.includes("black-pass-staging.azurewebsites.net")) {
    refferalLink = `https://black-pass-staging.azurewebsites.net?referral_code=${userData.referralCode}`;
  } else if (window.location.href.includes("localhost")) {
    refferalLink = `http://localhost:3000?referral_code=${userData.referralCode}`;
  } else if (window.location.href.includes("127.0.0.1")) {
    refferalLink = `http://127.0.0.1:3000?referral_code=${userData.referralCode}`;
  } else {
    refferalLink = `https://blackpass.astranova.world?referral_code=${userData.referralCode}`;
  }


  const verifyDiscortToken = async (discordToken: any, username: string | null) => {
    try {
      await POST_DISCORD_VERIFY(discordToken, username);
      setUserData({
        ...userData,
        accountType: [...userData.accountType, "DISCORD"],
      });
      toast.success("Discord Verified");
      // openLink(discordLink!);
    } catch (err: any) {
      // toast.error(err.response.data.message);
      handleError(err);
    }
  };

  useEffect(() => {
    if (discordToken) {
      verifyDiscortToken(discordToken, discordUsername);
    }
  }, [discordToken]);

  // useEffect(() => {
  //   console.log("Intent: ", intent);
  //   if (intent) {
  //     if (intent === "wc") {
  //       handleConnectWallet();
  //     } else if (intent === "ubp") {
  //       getUpdateBlackPass();
  //     }
  //   }
  // }, [intent]);

  const handleItemClick = (itemName: any) => {
    setSocialAllMissionsType(itemName);
    setRecurringAllMissionsType(itemName);
    setShowCredited(false);
    handleMissionsTabs(itemName);
  };

  const putClaimShard = async (id: any) => {
    try {
      setLoading(true);
      const res = await PUT_CLAIM_SHARDS({
        shard_id: id,
      });
      if (res.data.success) {
        const newQuestPagination = {
          ...questPagination,
        };
        newQuestPagination.oneTimeQuests = {
          limit: DEFAULT_QUEST_LIMIT,
          offset: 0,
        };
        newQuestPagination.ongoingQuests = {
          limit: DEFAULT_QUEST_LIMIT,
          offset: 0,
        };
        newQuestPagination.credited = {
          limit: DEFAULT_QUEST_LIMIT,
          offset: 0,
        };
        await setQuestPagination(newQuestPagination);
        const newHasMore = hasMore;
        newHasMore.ongoingQuests = true;
        newHasMore.oneTimeQuests = true;
        newHasMore.credited = true;
        await setHasMore(newHasMore);
        getMissionsTabs(undefined, newQuestPagination, newHasMore);
        getDashboardMarics();        
      }
    } catch (err: any) {      
      handleError(err);
    }
    finally{
      setLoading(false);
    }
  };

  const getDashBoardDiscord = async () => {
    try {
      const res = await GET_DASHBOARD_DISCORD();
      if (res.data.success === true) {
        setValidDiscord(res.data.success);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const getFreeTransactionCount = async () => {
    try {
      const res = await GET_FREE_TRANSACTION_COUNT();
      if (res.status === 200) {
        setFreeTx(res.data);
      }
    } catch (error: any) {
      handleError(error);
    }
  };

  const handleStatsClick = () => {
    setShowStats(true);
  };

  const handleMissionsClick = () => {
    setShowStats(false);
  };

  const getTwitterFollow = async (taskId: string | null) => {
    try {
      setIsTwitterVerifying(true);
      const res = await GET_TWITTER_FOLLOW_VERIFY(
        serialize({
          task_id: taskId,
        })
      );
      if (res.data?.success) {
        handleRemoveTwitterQuestLocalStorage("follow_twitter")
        setShowFollow(false);
        setTwitterMissionId(null);
        getMissionsTabs();
        toast.success(res?.data?.message);
      }
      setIsTwitterVerifying(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      setIsTwitterVerifying(false);
    }
  };

  const getTwitterTagsQuest = async (taskId: string | null) => {
    try {
      setIsTwitterVerifying(true);
      const res = await GET_TWITTER_QUEST(
        serialize({
          task_id: taskId,
        })
      );

      if (res.data?.success) {
        handleRemoveTwitterQuestLocalStorage("twitterQuest")
        setTwitterQuest(false);
        setTwitterMissionId(null);
        getMissionsTabs();
        toast.success(res?.data?.message);
      }
      setIsTwitterVerifying(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      setIsTwitterVerifying(false);
    }
  }

  const wallkey = Object.keys(userData.WalletsType);

  const handleApiReload = async () => {
    setIsLoading(true);
    try {
      const newQuestPagination = {
        ...questPagination,
      };
      newQuestPagination.oneTimeQuests = {
        limit: DEFAULT_QUEST_LIMIT,
        offset: 0,
      };
      newQuestPagination.ongoingQuests = {
        limit: DEFAULT_QUEST_LIMIT,
        offset: 0,
      };
      newQuestPagination.credited = {
        limit: DEFAULT_QUEST_LIMIT,
        offset: 0,
      };
      await setQuestPagination(newQuestPagination);
      const newHasMore = hasMore;
      newHasMore.ongoingQuests = true;
      newHasMore.oneTimeQuests = true;
      newHasMore.credited = true;
      await setHasMore(newHasMore);
      await Promise.all([
        getMissionsTabs(undefined, newQuestPagination, newHasMore),
        getDashboardMarics(),
      ]);
      setRecurringAllMissionsType("ALL_MISSIONS");
      setSocialAllMissionsType("ALL_MISSIONS");
      if (showCredited) {
        setShowCredited(false);
      }
      handleresetState();
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const putClaimAll = async () => {
    try {
      const res = await PUT_DASHBOARD_CLAIM_ALL_SHARDS();
      if (res.data.success) {
        const newQuestPagination = {
          ...questPagination,
        };
        newQuestPagination.oneTimeQuests = {
          limit: DEFAULT_QUEST_LIMIT,
          offset: 0,
        };
        newQuestPagination.ongoingQuests = {
          limit: DEFAULT_QUEST_LIMIT,
          offset: 0,
        };
        newQuestPagination.credited = {
          limit: DEFAULT_QUEST_LIMIT,
          offset: 0,
        };
        await setQuestPagination(newQuestPagination);
        const newHasMore = hasMore;
        newHasMore.ongoingQuests = true;
        newHasMore.oneTimeQuests = true;
        newHasMore.credited = true;
        await setHasMore(newHasMore);
        getMissionsTabs(undefined, newQuestPagination, newHasMore)
        getDashboardMarics();
      }
    } catch (err: any) {
      handleError(err);
    }
  };

  const showClaimAllText =
    socialAllMissionsType === "ALL_MISSIONS" ||
    recurringAllMissionsType === "ALL_MISSIONS" ||
    (socialAllMissionsType === "FINISHED" &&
      recurringAllMissionsType === "FINISHED") ||
    showCredited;

  const arr1: any = questsData?.ongoingQuests?.Tasks.find((item: any) => {
    return item?.is_claimed === false;
  });
  const arr2: any = questsData?.oneTimeQuests?.Tasks.find((item: any) => {
    return item?.is_claimed === false;
  });
  const credictedArr: any = credicted?.find((item: any) => {
    return item?.is_claimed === false;
  });

  type KEY = string | undefined;
  interface PARAMS {
    limit: number;
    offset: number;
    key?: string;
  }

  const getCreditedData = () => {
    // console.log("HasMore Credited:", hasMore.credited);
    getMissionsTabs("credited");
  };

  const getOnGoingQuestsData = () => {
    // console.log("HasMore OnGoing:", hasMore.ongoingQuests);
    getMissionsTabs("ongoingQuests");
  };

  const getOneTimeQuestsData = () => {
    // console.log("HasMore OneTime:", hasMore.oneTimeQuests);
    getMissionsTabs("oneTimeQuests");
  };

  // DASHBOARD MISSION TABS API
  const getMissionsTabs = async (key: KEY = undefined, _questPagination = questPagination, _hasMore = hasMore) => {
    try {
      const myQuestPagination = _questPagination ? _questPagination : questPagination;
      const myHasMore = _hasMore ? _hasMore : hasMore;

      let params: PARAMS =
        key === "credited"
          ? {
            limit: myQuestPagination.credited.limit,
            offset: myQuestPagination.credited.offset,
          }
          : key === "ongoingQuests"
            ? {
              limit: myQuestPagination.ongoingQuests.limit,
              offset: myQuestPagination.ongoingQuests.offset,
            }
            : key === "oneTimeQuests"
              ? {
                limit: myQuestPagination.oneTimeQuests.limit,
                offset: myQuestPagination.oneTimeQuests.offset,
              }
              : {
                limit: DEFAULT_QUEST_LIMIT,
                offset: 0,
              };
      if (!!key) {
        params.key = key;
      } else {
        setLoading(true);
      }

      const response = await GET_DASHBOARD_MISSIONS_TABS(
        serialize({ ...params })
      );
      const { oneTimeQuests, ongoingQuests, credited } = response.data;
      const allSocialMissions = oneTimeQuests.Tasks;
      const allRecurringMissions = ongoingQuests.Tasks;
      const allCredited = credited.history;

      // update the limit and offset of the quest pagination
      const newQuestPagination = {
        ...myQuestPagination
      };
      const newHasMore = myHasMore;
      if (
        oneTimeQuests.total &&
        oneTimeQuests.total - oneTimeQuests.remainingQuests >
        newQuestPagination.oneTimeQuests.offset + DEFAULT_QUEST_LIMIT
      ) {
        newQuestPagination.oneTimeQuests = {
          limit: DEFAULT_QUEST_LIMIT,
          offset: newQuestPagination.oneTimeQuests.offset + DEFAULT_QUEST_LIMIT,
        };
      } else {
        newHasMore.oneTimeQuests = false;
      }
      if (
        ongoingQuests.total &&
        ongoingQuests.total - ongoingQuests.remainingQuests >
        newQuestPagination.ongoingQuests.offset + DEFAULT_QUEST_LIMIT
      ) {
        newQuestPagination.ongoingQuests = {
          limit: DEFAULT_QUEST_LIMIT,
          offset: newQuestPagination.ongoingQuests.offset + DEFAULT_QUEST_LIMIT,
        };
      } else {
        newHasMore.ongoingQuests = false;
      }
      if (
        credited.total &&
        credited.total - (credited.remainingQuests ?? 0) >
        newQuestPagination.credited.offset + DEFAULT_QUEST_LIMIT
      ) {
        newQuestPagination.credited = {
          limit: DEFAULT_QUEST_LIMIT,
          offset: newQuestPagination.credited.offset + DEFAULT_QUEST_LIMIT,
        };
      } else {
        newHasMore.credited = false;
      }
      setHasMore(newHasMore);
      // console.log("newQuestPagination::", newQuestPagination);

      setQuestPagination(newQuestPagination);

      let newQuestsData = { ...questsData };

      switch (key) {
        case "credited":
          setShowCredicted([...credicted, ...allCredited]);
          newQuestsData.credited.history = [
            ...newQuestsData.credited.history,
            ...allCredited,
          ];
          break;
        case "ongoingQuests":
          setRecurringAllMissions([
            ...recurringAllMissions,
            ...allRecurringMissions,
          ]);
          newQuestsData.ongoingQuests.Tasks = [
            ...newQuestsData.ongoingQuests.Tasks,
            ...allRecurringMissions,
          ];

          break;
        case "oneTimeQuests":
          setSocialAllMissions([...socialAllMissions, ...allSocialMissions]);
          newQuestsData.oneTimeQuests.Tasks = [
            ...newQuestsData.oneTimeQuests.Tasks,
            ...allSocialMissions,
          ];
          break;
        default:
          setSocialAllMissions(allSocialMissions);
          setRecurringAllMissions(allRecurringMissions);
          setShowCredicted(allCredited);
          newQuestsData = response.data;
      }
      setQuestsData(newQuestsData);
      
    } catch (error: any) {      
      handleError(error);
    }
    finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    getMissionsTabs();
  }, []);

  useEffect(() => {
    // console.log("mmBpUpdate,address,chainId::", mmBpUpdate);
    if (mmBpUpdate && mmBpUpdate !== "") {
      callUpdateBlackPass("", [], mmBpUpdate);
    } else if (mmBpUpdate === "") {
      setBlackPassResponse({
        status: "resolved",
      });
      // setShowBlackPass(false);
      setUpdateBlackPass(false);
      setMmBpUpdate(undefined);
    }
  }, [mmBpUpdate]);

  useEffect(() => {
    const asyncEffect = async () => {
      // console.log("isConnected,walletListsen,address,chainId::", isConnected, walletListsen, address, chainId);
      // console.log("connected,account,signature,sdkChainId::", connected, account, signature, sdkChainId);
      // const _isConnected = isConnected ? isConnected : connected;
      const _isConnected = isConnected;
      const sdkRequiredChainId = RPC_LINK?.includes("testnet") ? '0x34a1' : '0x343b';
      if (walletListsen && _isConnected) {
        let _userWallet = undefined;
        let _connectedWallet = undefined;
        if (userData?.WalletsType?.EVM) {
          _userWallet = JSON.parse(JSON.stringify(userData?.WalletsType?.EVM));
        }
        if (address) {
          _connectedWallet = JSON.parse(JSON.stringify(address))
        }
        // if (account) {
        //   _connectedWallet = JSON.parse(JSON.stringify(account))
        // }
        // console.log("userWallet,connectedWallet::", _userWallet, _connectedWallet);
        if (_userWallet && _connectedWallet && _userWallet.toLowerCase() !== _connectedWallet.toLowerCase()) {
          // console.log("userWallet != connectedWallet::", _userWallet != _connectedWallet);
          setWalletListen(false);
          // mmSdk && metamaskSdk.sdk?.terminate();
          await disconnectAsync();
          setShowWalletErrorModal(true);
        } else if (chainId && chainId != requiredChainID) {
          handleSwitchChain();
        } else if (updateBlackPass) {
          setWalletListen(false);
          callUpdateBlackPass(updateBPValues?.signature, updateBPValues?.shardsIdsArray);
        } else {
          setWalletListen(false);
          setMMSdk(false);
          onWallectConnected();
        }

        // else if (!mmSdk && updateBlackPass) {
        //   setWalletListen(false);
        //   callUpdateBlackPass(updateBPValues?.signature, updateBPValues?.shardsIdsArray);
        // } else if (!mmSdk || (mmSdk && signature && sdkChainId === sdkRequiredChainId)) {
        //   setWalletListen(false);
        //   setMMSdk(false);
        //   onWallectConnected();
        // }
      }
    }
    asyncEffect();
  }, [isConnected, walletListsen, chainId, address, updateBlackPass, signature, mmSdk]);
  // }, [isConnected, walletListsen, chainId, address, updateBlackPass, connected, account, signature, mmSdk]);

  const handleSwitchChain = async () => {
    try {
      await switchChain({
        chainId: requiredChainID,
      });
    } catch (error) {
      console.log("handleSwitchChain error");
    }
  };

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const onWallectConnected = async () => {
    // console.log("onWallectConnected::", signature)
    let mintingToastId: any;
    const toastId = toast.loading("Signing...Please wait..", { theme: "light" });
    try {
      setLoading(true);
      isDevices() && await delay(2000);
      let _signature;
      if (!signature) {
        _signature = await signMessageAsync({
          message:
            "I3WjCEHiLEAax0jlGpfCdJCkoxc6bjwWzPKPB0WYlsTlG5fh6PXU5Uu79KFjOF6I",
        });
        // console.log("1.signature:::", signature);
        toastId && toast.dismiss(toastId);
        mintingToastId = toast.loading("Minting NFT...", { theme: "light" });
      }
      const response = await WALLET_CONNECT_EVM({
        // wallet_address: address ? address : account,
        wallet_address: address,
        signature: signature ? signature : _signature,
      });
      // console.log("onWallectConnected response:::", response);
      if (response) {
        pollUserDetails(mintingToastId);
      }      
    } catch (error: any) {
      // console.log("onWallectConnected Error:::", error);     
      if (error?.code === 4902) {
        toast.error(error?.shortMessage);
        setShowInfo(true);
      } else {
        handleError(error);
      }
      toastId && toast.dismiss(toastId);
      mintingToastId && toast.dismiss(mintingToastId);
    } finally {
      setLoading(false);
      // toastId && toast.dismiss(toastId);
      // mintingToastId && toast.dismiss(mintingToastId);
    }
  };

  const pollUserDetails = async (mintingToastId: any) => {
    const userDetails = await GET_USER_DETAILS();
    if (userDetails?.data?.is_minted) {
      mintingToastId && toast.dismiss(mintingToastId);
      setLoading(false);
      setBPMintedModal(true);
      updateUser(userDetails.data);
      setSignature(undefined);
      getMissionsTabs();
      getDashboardMarics()
    } else {
      setTimeout(() => {
        pollUserDetails(mintingToastId);
      }, 5000);
    }
  };

  const getTxReceipt = async (txHash: string) => {
    const provider = new ethers.JsonRpcProvider(RPC_LINK);
    const txReceipt = await provider.waitForTransaction(txHash, 5);
    // console.log('txReceipt:', txReceipt);
    return txReceipt;
  };

  const callUpdateBlackPass = async (signature: any, shardsIdsArray: Array<string>, transactionHash = undefined) => {
    const toastId = toast.loading("Updating Black Pass...", { theme: "light" });
    try {
      let txHash;
      if (!transactionHash) {
        // const userAddress = address ? address : account;
        txHash = await writeContractAsync({
          abi: nftAbi.abi,
          address: CONTRACT_ADDRESS as Address,
          functionName: "bathcShardPosting",
          args: [userData.id, shardsIdsArray, address, signature],
          // args: [userData.id, shardsIdsArray, userAddress, signature],
        });
      } else {
        txHash = transactionHash;
      }
      const txReceipt = await getTxReceipt(txHash);
      if (txReceipt?.status === 0) {
        toast.error('Transaction was reverted');
      } else {
        await POST_BLOCKCHAIN_TRANSACTION(txHash);
        toast.success("Black Pass updated successfully");
      }
      setBlackPassResponse({
        status: "resolved",
      });
      // setShowBlackPass(false);
      setUpdateBlackPass(false);
      toast.dismiss(toastId);
      getDashboardMarics();
    } catch (error: any) {
      toast.dismiss(toastId);
      handleError(error);
      setUpdateBlackPass(false);
    }
  }

  const getUpdateBlackPass = async () => {
    setUpdateBlackPass(false);
    setShowBlackPass(false);
    const toastId = toast.loading("Updating Black Pass...", { theme: "light" });
    try {
      setBlackPassResponse({
        status: "pending",
      });
      const res = await GET_UPDATE_BLACKPASS();
      if (res.status === 200) {
        // FREE transactions are over
        if (res.data.success === true) {
          let _userWallet = undefined;
          let _connectedWallet = undefined;
          if (userData?.WalletsType?.EVM) {
            _userWallet = JSON.parse(JSON.stringify(userData?.WalletsType?.EVM));
          }
          if (address) {
            _connectedWallet = JSON.parse(JSON.stringify(address))
          }
          // if (account) {
          //   _connectedWallet = JSON.parse(JSON.stringify(account))
          // }
          // const _isConnected = isConnected ? isConnected : connected;
          const _isConnected = isConnected;
          // First check if user is connected to wallet 
          toast.dismiss(toastId);
          if (!_isConnected) {
            setUpdateBlackPass(true);
            setUpdateBPValues({
              signature: res.data.signature,
              shardsIdsArray: res.data.shardsIdsArray,
              userAddress: userData?.WalletsType?.EVM,
              userId: userData.id,
            });
            await handleConnectWallet();
          } else if (_userWallet && _connectedWallet && _userWallet.toLowerCase() !== _connectedWallet.toLowerCase()) {
            // Second check if user is connected to correct wallet
            setUpdateBlackPass(true);
            setUpdateBPValues({
              signature: res.data.signature,
              shardsIdsArray: res.data.shardsIdsArray,
              userAddress: userData?.WalletsType?.EVM,
              userId: userData.id,
            })
            await disconnectAsync()
            setShowWalletErrorModal(true);
            // setShowBlackPass(false);
          } else {
            const { signature, shardsIdsArray } = res.data;
            await callUpdateBlackPass(signature, shardsIdsArray);
          }
        } else {
          // Used FREE transactions 
          // await sleep(5000);
          // toast.success("Black Pass updated successfully");
          // getFreeTransactionCount();
          toast.success('Transaction submitted successfully. It may take up to 15-20 minutes for the shards to reflect in Black Pass.', {
            position: "top-right",
            autoClose: 10000, // 10 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          getDashboardMarics();
          setBlackPassResponse({
            status: "resolved",
          });
          // setShowBlackPass(false);
        }
      } else {
        //TODO show error toast message received from API
      }
    } catch (error: any) {
      setBlackPassResponse({
        status: "rejected",
      });
      handleError(error);
    } finally {
      toast.dismiss(toastId);
      setBlackPassResponse({
        status: "rejected",
      });
    }
  };

  const handleMissionsTabs = (itemName: string) => {
    const social = questsData?.oneTimeQuests?.Tasks;
    const recurring = questsData?.ongoingQuests?.Tasks;
    switch (itemName) {
      case "ALL_MISSIONS":
        setSocialAllMissions(social);
        setRecurringAllMissions(recurring);
        break;
      case "UNFINISHED":
        const unfinishedMissions = social?.filter(
          (mission: any) => !mission.hasOwnProperty("is_claimed")
        );
        const unfinisRecurringhedMissions = recurring?.filter(
          (mission: any) => !mission.hasOwnProperty("is_claimed")
        );
        setSocialAllMissions(unfinishedMissions);
        setRecurringAllMissions(unfinisRecurringhedMissions);
        break;
      case "FINISHED":
        const finishedMissions = social?.filter(
          (mission: any) => mission.is_claimed === false
        );
        const finishedRecurringMissions = recurring?.filter(
          (mission: any) => mission.is_claimed === false
        );
        setSocialAllMissions(finishedMissions);
        setRecurringAllMissions(finishedRecurringMissions);
        break;
      case "CLAIMED":
        const claimedMissions = social?.filter(
          (mission: any) => mission.is_claimed === true
        );
        const claimedRecurringMissions = recurring?.filter(
          (mission: any) => mission.is_claimed === true
        );
        setSocialAllMissions(claimedMissions);
        setRecurringAllMissions(claimedRecurringMissions);
        break;
      case "CREDITED":
        setShowCredited(true);
        setShowCredicted(credicted);
        break;
      default:
        break;
    }
  };

  const handleWalletConnection = (type: string) => {
    if (isMobileDevice()) {
      setShowWalletConnectionIntro(type);
    } else {
      openConnectionModal(type);
    }
  };
  const openConnectionModal = async (type: string) => {
    if (type === "blade") {
      initBlade();
    }
    setShowWalletConnectionIntro(null);
  };

  const bladeSteps = [
    {
      text: "Click on QR icon from wallet connect modal",
      imageUrl: [Images.STEP1],
    },
    {
      text: `Copy the Pairing String Or Scan this QR Code with your other device having ${ShowWalletConnectionIntro === "blade" ? "Blade" : "Hashpack"
        } Wallet `,
      imageUrl: [Images.STEP2],
    },
    {
      text: `Visit the ${ShowWalletConnectionIntro === "blade" ? "Blade" : "Hashpack"
        } Wallet.`,
    },
    {
      text: `Follow below process inside wallet.`,
      imageUrl:
        ShowWalletConnectionIntro === "blade"
          ? [Images.BladeStep3, Images.BladeStep4]
          : [Images.HashpackStep3, Images.HashpackStep4],
    },
    {
      text: "Paste Pairing string here and connect",
      imageUrl:
        ShowWalletConnectionIntro === "blade"
          ? [Images.BladeStep5]
          : [Images.HashpackStep5],
    },
  ];

  async function initBlade(type?: string) {
    try {
      const appMetadata = {
        name: config.APP_NAME,
        description: config.APP_DESC,
        icons: [config.APP_ICON],
        url: window.location.href,
      };
      const bladeConnector = await BladeConnector.init(
        ConnectorStrategy.WALLET_CONNECT,
        appMetadata
      );
      const params = {
        network: config.ENV === "PROD" ? HederaNetwork.Mainnet : HederaNetwork.Testnet,
        dAppCode: "AstraNova BlackPass Dapp",
      };
      await bladeConnector.createSession(params);
      // retrieving the currently active signer to perform all the Hedera operations
      const bladeSigner = await bladeConnector?.getSigner();
      if (bladeSigner) {
        const accountId = await bladeSigner?.getAccountId().toString();
        bladeWalletConnect({
          wallet_address: accountId,
        }, bladeConnector);
      } else {
        toast.error("bladeSigner is null.");
      }
    } catch (error: any) {
      toast.error(error);
    }
  }

  const bladeWalletConnect = async (
    bladeAddress: any,
    bladeConnector?: any
  ) => {
    try {
      const res = await CREATE_BLADE_WALLET(bladeAddress);
      if (res.data.success) {
        getUserDetails();
      }
      getMissionsTabs();
      toast.success(res?.data?.message);
      bladeConnector.killSession();
    } catch (error: any) {
      handleError(error);
      bladeConnector.killSession();
    }
  };

  const handleConnectWallet = async () => {
    if (!updateBlackPass) {
      await disconnectAsync();
    }
    if (isDevices()) {
      const isCoinbase = localStorage.getItem("isCoinbase");
      if (/MetaMask/i.test(navigator.userAgent) || isCoinbase) {
        setWalletListen(true);
      }
      setShowCustomWalletModal(true)
      trackButtonClick(EventButtonNames.WALLET_CONNECT, "mobile");
    } else {
      setWalletListen(true);
      openConnectModal && openConnectModal();
      trackButtonClick(EventButtonNames.WALLET_CONNECT, "desktop");
    }
  };

  const handleRemoveTwitterQuestLocalStorage = (ActivityType: string) => {    
    localStorage.removeItem(ActivityType)    
  }

  useEffect(()=>{
    const isFollowTwitter = localStorage.getItem('follow_twitter') ? JSON.parse(localStorage.getItem('follow_twitter') || "") : ""
    const isTwitterQuest = localStorage.getItem('twitterQuest') ? JSON.parse(localStorage.getItem('twitterQuest') || "") : ""
    if(isFollowTwitter){
      setTwitterMissionId(isFollowTwitter)
      setShowFollow(true)
      }
    else if(isTwitterQuest){
      setTwitterMissionId(isTwitterQuest)
      setTwitterQuest(true)
    }
  },[])

  return (
    <>
      {isLoading ? <Loader /> : null}
      {!isLoading && (
        <div className="">
          <div className="flex flex-col gap-24 justify-center items-center  bg-dashboardBg bg-cover bg-center w-full mobile:flex-col mobile:gap-0 mobile:h-full md:flex-col md:h-full py-5 md:py-14 lg:flex-col lg:py-5 xl:flex-row">
            <div className="flex flex-col gap-3 ">
              <div
                className="flex gap-5 mobile:justify-between mobile:px-5"
              >
                <Card
                  pseudoElement="primary"
                  bgColor
                  className="py-1 pl-9 !text-center"
                >
                  <Typography
                    isIcon={false}
                    variant="p"
                    font="bold"
                    className="text-xxs mobile:text-[8px] uppercase"
                  >
                    SEASON 1
                  </Typography>
                </Card>
                <div
                  className="cursor-pointer text-text-primary hover:text-text-secondary"
                  onClick={() => handleApiReload()}
                >
                  <RefreshIcon />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-y-4 gap-x-3 justify-between mobile:text-center">
                <Typography
                  isIcon={false}
                  variant="h2"
                  className={` flex items-start gap-1 text-text-primary mobile:text-3xl max-w-[400px] break-words break-all ml-5 sm:ml-0 !cursor-default  ${user?.user_name && user.user_name.length >= 12 ? "flex-col" : "flex-row"}`}
                >
                  <>
                  WELCOME, 
                  <span> {user?.user_name === undefined ? "" : user?.user_name}</span> 
                  </>
                </Typography>
                {user?.Factions?.faction_url && (
                  <div className="w-[44px] h-[45px] rounded-full mobile:hidden">
                    <img
                      className="h-full w-full object-cover"
                      src={user.Factions?.faction_url}
                      alt="combat"
                    />
                  </div>
                )}
               
                <div className="relative flex flex-row item-center justify-between sm:flex-col sm:items-end border-2 outline outline-1 outline-text-secondary sm:shadow-primary-button rounded-md p-3 mx-8 sm:mx-0">
                  <div className="absolute -top-4 -left-4 w-8 h-8 border rounded-full bg-black flex justify-center items-center shadow-primary-button sm:shadow-none">
                    <div className="-translate-y-[.15rem]">
                      <CyanAstroLogo />
                    </div>
                  </div>
                <Typography
                  isIcon={false}
                  variant="p"
                  className="text-text-primary whitespace-nowrap uppercase !cursor-default tracking-wider"
                >
                  {"claimed shards"}
                </Typography>
                <Typography
                  isIcon={false}
                  variant="h3"
                  className="text-text-secondary !cursor-default"
                  pclassName="!bg-transparent"
                >
                  {
                    dashboardMetrics?.totalShards?._sum?.value
                    ? formatNumber(dashboardMetrics?.totalShards?._sum?.value)
                    : "0"
                  } s
                  {/* <ShardsLogo /> */}
                </Typography>
                </div>
               
              </div>
              <div className="flex-col justify-between sm:flex-row hidden mobile:flex">
                <Typography
                  variant="p"
                  font="semiBold"
                  isIcon={false}
                  className="text-text-primary !text-[12px] w-[334px] ml-5 sm:ml-0"
                >
                  Continuously engage with{" "}
                  <span className="font-bold text-[14px]">@Astra__Nova</span>{" "}
                  official <br />
                  tweets to earn a higher share of Shards
                </Typography>
                <div className="self-start flex items-center ml-5 sm:ml-0 justify-around gap-3 mt-2 sm:mt-0">
                  <div className="group flex justify-around items-center">
                    <Link to={ASTRANOVA_TWITTER_LINK} target="_blank">
                      <Button
                        bgColor={true}
                        CLASSNAME="text-text-primary group-hover:text-text-secondary"
                        size="extraSmall"
                        color="white"
                        isBorderLabel="Open X"
                        isBorder={true}
                      />
                    </Link>
                  </div>
                  
                </div>
              </div>
              <img
                src={Images.LINE}
                alt="line"
                className="sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden"
              />
              <div className=" flex justify-center items-center sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden">
                <Typography
                  isIcon={false}
                  variant="customp"
                  font="bold"
                  className={
                    !showStats
                      ? "!text-text-secondary cursor-pointer"
                      : "cursor-pointer text-text-lightgray"
                  }
                  onClick={handleMissionsClick}
                >
                  MY MISSIONS
                </Typography>
                <span className="text-text-primary opacity-[30%] mx-12">|</span>
                <Typography
                  isIcon={false}
                  variant="customp"
                  font="bold"
                  className={
                    showStats
                      ? "!text-text-secondary cursor-pointer"
                      : "cursor-pointer text-text-lightgray"
                  }
                  onClick={handleStatsClick}
                >
                  MY STATS
                </Typography>
              </div>
              <img
                src={Images.LINE}
                alt="line"
                className=" md:hidden lg:hidden xl:hidden 2xl:hidden"
              />
              <div
                className={`flex gap-5 flex-col  ${showStats
                  ? "  mobile:justify-center mobile:items-center mobile:gap-3 mobile:mt-6 mobile:mx-5"
                  : "mobile:hidden"
                  }`}
              >
                <Button
                  color="graylight"
                  bgColor
                  size="extraLarge"
                  isBorder={true}
                  logo={<Spinner />}
                  isBorderLabel="daily spin"
                  BorderLabelsubText="Spin daily and stand a chance to win more shards!"
                  isBorderLabelsubText={true}
                  value={<Timer isBonusRewardTab={showCredited} handleDailyReward={handleDailyReward} />}
                  className="!cursor-default"                  
                  editButton="mobile:px-2 mobile:pr-5"
                />
                <Button
                  color="graylight"
                  bgColor
                  size="extraLarge"
                  isBorder={true}
                  logo={<RankLogo />}
                  isBorderLabel="position"
                  BorderLabelsubText="Update Black Pass to see position"
                  isBorderLabelsubText={true}
                  value={
                    dashboardMetrics?.rank == "NA" ? (
                      <InfiniteIcon />
                    ) : (
                      dashboardMetrics?.rank
                    )
                  }
                  className="!cursor-default"
                  editButton="mobile:px-2 mobile:pr-5"
                />
                <img src={Images.LINE} alt="line" />

                <Button
                  className="!cursor-default"
                  color="graylight"
                  bgColor
                  size="extraLarge"
                  isBorder={true}
                  logo={<DeviantsLogo />}
                  isBorderLabel="Deviants Owned"
                  CLASSNAME="text-left"
                  editButton="mobile:px-2 mobile:pr-5"
                  value={
                    <div className="flex gap-3 items-center">
                      <div className="group hover:drop-shadow-primary mobile:ml-2 ">
                        <Button
                          onClick={() => window.open(`${config.ASTRA_DEVIANTS_URL}`, "_blank")}
                          isBorder={true}
                          bgColor={true}
                          isBorderLabel="Get Deviants"
                          color="white"
                          CLASSNAME=" text-text-primary group-hover:text-text-secondary px-2"
                        />
                      </div>
                      <div>
                        {dashboardMetrics?.total_deviants
                          ? dashboardMetrics?.total_deviants
                          : "0"}
                      </div>
                    </div>
                  }
                />
                
                <Button
                  className="!cursor-default"
                  color="graylight"
                  bgColor
                  size="extraLarge"
                  isBorder={true}
                  logo={<Shards />}
                  isBorderLabel="shards ON YOUR BLACK PASS"
                  CLASSNAME="text-left mobile:pl-2"
                  valueClassName="mobile:ml-24"
                  editButton="mobile:pl-2"
                  value={
                    dashboardMetrics?.shardOnBlackPass?._sum?.value
                      ? formatNumber(dashboardMetrics?.shardOnBlackPass?._sum?.value)
                      : "0"
                  }
                />
                <div className="group flex justify-center items-center">
                  <Button
                    size="doubleExtraLarge"
                    color="white"
                    bgColor
                    isBorder={true}
                    isBorderLabel="UPDATE BLACK PASS"
                    CLASSNAME={` ${dashboardMetrics?.totalShards?._sum?.value === null
                      ? ""
                      : "text-text-primary group-hover:text-text-secondary"
                      }`}
                    onClick={() => {
                      if (!user?.is_minted) {
                        setShowMintBPModal(true);
                      } else {
                        getFreeTransactionCount();
                        setShowBlackPass(true);
                      }
                      trackButtonClick(EventButtonNames.UPDATE_BLACK_PASS, user?.id);
                    }}
                    disable={
                      dashboardMetrics?.totalShards?._sum?.value === null
                    }
                  />
                </div>
                <img src={Images.LINE} alt="line" />               
                 <Button
                    onClick={()=>navigate('/devients')}
                    className="!cursor-pointer"
                    color="graylight"
                    bgColor
                    size="extraLarge"
                    isBorder={true}
                    logo={<WalletIcon />}
                    isBorderLabel="Devient Wallet"
                    CLASSNAME="text-left uppercase"
                    valueClassName="mobile:ml-24"
                    editButton="mobile:pl-2"
                    value={<ColorArrow />}
                />
                <img src={Images.LINE} alt="line" />
                <Referrals totalReferrals={dashboardMetrics?.toal_referral || 0} />
                {/* <Button
                  color="graylight"
                  bgColor
                  size="extraLarge"
                  isBorder={true}
                  logo={<ReferralLogo />}
                  isBorderLabel="referrals"
                  className="!cursor-default "
                  value={dashboardMetrics?.toal_referral}
                  editButton="mobile:px-2 mobile:pr-5"
                /> */}
                <div className="flex flex-row gap-5 text-center pb-5 items-center justify-center">
                <ReferralLinkBtn Btnname="Referral Link" />
                </div>
                <div className="flex items-center justify-between gap-3 m-auto w-full max-w-[500px] mobile:w-[300px]">
                  <div
                    className="group flex justify-around items-center cursor-pointer"
                    title="Check out the collection on Sphere"
                    onClick={() => {
                      window.open(`${ASTRANOVA_SPHERE_LINK}`, "_blank");
                    }}
                  >
                    <img
                      src={Images.SPHERE}
                      alt="sphere"
                      style={{
                        width: "24px",
                        height: "24px",
                      }}
                    />
                  </div>
                  <div
                    className="group flex justify-around items-center cursor-pointer"
                    title="Check out the collection on Token Trove"
                    onClick={() => {
                      window.open(`${ASTRANOVA_TOKEN_TROVE_LINK}`, "_blank");
                    }}
                  >
                    <img
                      src={Images.TOKENTROVE}
                      alt="sphere"
                      style={{
                        width: "24px",
                        height: "18px",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`flex flex-col gap-7 mobile:h-full ${!showStats ? "mobile:block" : "mobile:hidden"
                }`}
            >
              <div
                className={`flex flex-col justify-between sm:flex-row mobile:hidden`}
              >
                <Typography
                  variant="p"
                  font="semiBold"
                  isIcon={false}
                  className="text-text-primary !text-[12px] w-[334px] ml-5 sm:ml-0"
                >
                  Continuously engage with{" "}
                  <span className="font-bold text-[14px]">@Astra__Nova</span>{" "}
                  official <br />
                  tweets to earn a higher share of Shards
                </Typography>

                <div className="self-start flex items-center justify-around gap-3 mt-2 sm:mt-0">
                  <div className="group flex justify-around items-center">
                    <Link to={ASTRANOVA_TWITTER_LINK} target="_blank">
                      <Button
                        bgColor={true}
                        CLASSNAME="text-text-primary group-hover:text-text-secondary"
                        size="extraSmall"
                        color="white"
                        isBorderLabel="Open X"
                        isBorder={true}
                        onClick={() => trackButtonClick(EventButtonNames.OPEN_X, user?.id)}
                      />
                    </Link>
                  </div>                  
                </div>
              </div>

              <div className="flex flex-row gap-4 justify-center items-center mobile:w-[340px] mobile:gap-3 mobile:mt-6 mobile:overflow-x-auto mobile:justify-start mobile:mb-3">
                <Typography
                  isIcon={false}
                  variant="p"
                  onClick={() => handleItemClick("ALL_MISSIONS")}
                  className={`${(socialAllMissionsType || recurringAllMissionsType) !==
                    "ALL_MISSIONS" || showCredited
                    ? "text-text-lightgray cursor-pointer"
                    : ""
                    } ${loading ? "pointer-events-none " : ""}`}
                >
                  ALL MISSIONS
                </Typography>
                <div className=" h-5 w-[2px] bg-background-lightgray "></div>
                <Typography
                  isIcon={false}
                  variant="p"
                  onClick={() => handleItemClick("UNFINISHED")}
                  className={`${(socialAllMissionsType || recurringAllMissionsType) !==
                    "UNFINISHED" || showCredited
                    ? "text-text-lightgray cursor-pointer"
                    : ""
                    } ${loading ? "pointer-events-none" : ""}`}
                >
                  PENDING
                </Typography>
                <div className=" h-5 w-[2px] bg-background-lightgray "></div>
                <Typography
                  isIcon={false}
                  variant="p"
                  onClick={() => handleItemClick("FINISHED")}
                  className={`${(socialAllMissionsType || recurringAllMissionsType) !==
                    "FINISHED" || showCredited
                    ? "text-text-lightgray cursor-pointer"
                    : ""
                    } ${loading ? "pointer-events-none " : ""}`}
                >
                  UNCLAIMED
                </Typography>
                <div className=" h-5 w-[2px] bg-background-lightgray "></div>
                <Typography
                  isIcon={false}
                  variant="p"
                  onClick={() => handleItemClick("CLAIMED")}
                  className={`${(socialAllMissionsType || recurringAllMissionsType) !==
                    "CLAIMED" || showCredited
                    ? "text-text-lightgray cursor-pointer"
                    : ""
                    } ${loading ? "pointer-events-none " : ""}`}
                >
                  CLAIMED
                </Typography>
                <div className=" h-5 w-[2px] bg-background-lightgray "></div>
                <Typography
                  isIcon={false}
                  variant="p"
                  onClick={() => handleItemClick("CREDITED")}
                  className={
                    (socialAllMissionsType || recurringAllMissionsType) !==
                      "CREDITED" || !showCredited
                      ? "text-text-lightgray cursor-pointer"
                      : ""
                  }
                >
                  BONUS REWARDS
                </Typography>
              </div>

              <Card
                className={`!h-[700px] !px-8 !py-0 w-full mobile:!h-[565px] mobile:w-[340px] `}
                borderStyle={true}
                pseudoElement="default"
              >
                {loading ? (
                  <Smallloader />
                ) : (
                  <>
                    {showCredited && (
                      <div className=" mobile:w-[310px] w-[450px]  ">
                        <div className="flex w-full gap-4 mobile:gap-1">
                          <div className="flex justify-between w-4/5 mobile:w-[75%] ">
                            <Typography
                              isIcon={true}
                              isIconColor={true}
                              font="regular"
                              className="text-text-dark text-xs py-5 uppercase !cursor-default"
                            >
                              Daily Spin
                            </Typography>
                            <Typography
                              isIcon={false}
                              isIconColor={true}
                              font="regular"
                              className={` text-text-dark text-xs py-5 uppercase !cursor-default  `}
                            >
                              shards
                            </Typography>
                          </div>
                          {showClaimAllText ? (
                            <div className="flex items-center justify-center ">
                              <Typography
                                isIcon={false}
                                isIconColor={true}
                                font="regular"
                                className={`${
                                  credictedArr?.is_claimed === false
                                    ? "text-text-secondary cursor-pointer"
                                    : "text-text-lightgray pointer-events-none"
                                }  text-xs py-5 uppercase  `}
                                onClick={() => putClaimAll()}
                              >
                                CLAIM ALL
                              </Typography>
                              {credictedArr?.is_claimed === false && (
                                <ColorArrow />
                              )}
                            </div>
                          ) : (
                            <Typography isIcon={false} isIconColor={true}>
                              {"  "}
                            </Typography>
                          )}
                        </div>
                        <DailySpinReward                        
                        dailySpinRewardsData={dailySpinRewardsData}
                        handleLoadMoreData={handleLoadMoreData}
                         hasMoreData={hasMoreData} 
                         isloading={spinHinstoryLoading}
                        />
                        
                        <div className="flex justify-between">
                          <Typography
                            isIcon={true}
                            isIconColor={true}
                            font="regular"
                            className="text-text-dark text-xs py-5 uppercase !cursor-default"
                          >
                            Air Drop
                          </Typography>
                        </div>
                        
                        <div
                          className={`h-[250px] overflow-y-auto mobile:h-[160px] pr-2 ${
                            socialAllMissions?.length <= 0 &&
                            "grid place-content-center place-items-center text-text-primary "
                          } `}
                        >
                          <InfiniteScroll
                            dataLength={credicted.length}
                            next={getCreditedData}
                            hasMore={hasMore.credited}
                            loader={loading ? <Smallloader />: ""}
                            scrollThreshold={0.8}
                            height={isDevices() ? "160px" : "250px"}
                          >
                            {credicted?.length <= 0 ? (
                              <Typography isIcon={false} variant="h3" pclassName="h-full w-full justify-center" className="cursor-default">
                                No Data{" "}
                              </Typography>
                            ) : (
                              credicted &&
                              credicted.map((data: any, index: number) => {
                                const cursor_style = `${
                                  data?.is_claimed === true
                                    ? "cursor-not-allowed"
                                    : "cursor-pointer"
                                }`;

                                const colorShow = `${
                                  data?.is_claimed === true
                                    ? "text-text-lightgray"
                                    : data?.is_claimed === false
                                    ? "text-text-secondary"
                                    : data?.is_greyout
                                    ? "text-text-lightgray"
                                    : "text-text-primary"
                                }`;
                                return (
                                  <>
                                    <div
                                      className={` pr-1 min-h-[10vh] py-3 flex items-center justify-between border-b-xs border-t-xs border-t-lightprimary border-b-lightprimary border-dashed mobile:gap-2 ${cursor_style} `}
                                      onClick={() => {
                                        if (data?.is_claimed === false) {
                                          putClaimShard(data.id);
                                        }
                                      }}
                                    >
                                      <div className="flex gap-10 items-center mobile:gap-4">
                                        <div className="w-full h-full flex justify-center items-center gap-1">
                                          <span className={`${colorShow}`}>
                                            {(index + 1)
                                              .toString()
                                              .padStart(2, "0")}
                                          </span>
                                          {data?.icon ? (
                                            <img
                                              src={data?.icon}
                                              className="h-8 w-9 object-contain"
                                              alt={data?.name}
                                            />
                                          ) : data.is_claimed === true ? (
                                            <div className="h-8 w-9 flex justify-center items-center">
                                              <GrayAstroLogo />
                                            </div>
                                          ) : data.is_claimed === false ? (
                                            <div className="h-8 w-9 flex justify-center items-center">
                                              <CyanAstroLogo />
                                            </div>
                                          ) : (
                                            <div className="h-8 w-9 flex justify-center items-center">
                                              <WhiteAstroLogo />
                                            </div>
                                          )}
                                        </div>
                                        <div className="flex flex-col">
                                          <div className="flex gap-5 mobile:gap-2">
                                            <Typography
                                              variant="p"
                                              isIcon={false}
                                              font="bold"
                                              className={` text-text-lightgray tracking-widest text-xs w-[200px] line-clamp-3 mobile:w-[110px]  mobile:tracking-normal break-words 
                                                  ${data.is_claimed === true
                                                  ? "text-text-lightgray"
                                                  : data.is_claimed ===
                                                    false
                                                    ? "text-text-secondary"
                                                    : "text-text-primary"
                                                } ${cursor_style} `}
                                              title={data?.description}
                                            >
                                              {data?.description + " "}
                                            </Typography>
                                            <Typography
                                              variant="p"
                                              isIcon={false}
                                              font="bold"
                                              className={`
                                        ${
                                          data.is_claimed === true
                                            ? "bg-background-lightgray !text-black px-1 tracking-widest text-xs min-w-[40px] text-center truncate mobile:tracking-normal  "
                                            : data.is_claimed === false
                                            ? "bg-background-third !text-black px-1 tracking-widest text-xs min-w-[40px] text-center truncate mobile:tracking-normal "
                                            : "bg-background-mainWhite !text-black px-1 tracking-widest text-xs min-w-[40px] text-center truncate mobile:tracking-normal "
                                        } ${cursor_style}`}
                                            >
                                              {data.value}
                                            </Typography>
                                          </div>
                                        </div>
                                      </div>
                                      {data?.is_claimed === true ? (
                                        <Typography
                                          variant="p"
                                          isIcon={false}
                                          className="text-text-lightgray cursor-not-allowed tracking-widest text-xs"
                                        >
                                          CLAIMED
                                        </Typography>
                                      ) : data?.is_claimed === false ? (
                                        <Typography
                                          variant="p"
                                          isIcon={false}
                                          className="text-text-secondary cursor-pointer tracking-widest text-xs"
                                        >
                                          CLAIM
                                        </Typography>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </>
                                );
                              })
                            )}
                          </InfiniteScroll>
                        </div>
                      </div>

                      // <div className=" mobile:w-[310px] w-[450px]  ">
                      //   <div className="flex w-full gap-4 mobile:gap-1">
                      //     <div className="flex justify-between w-4/5 mobile:w-[75%] ">
                      //       <Typography
                      //         isIcon={true}
                      //         isIconColor={true}
                      //         font="regular"
                      //         className="text-text-dark text-xs py-5 uppercase !cursor-default"
                      //       >
                      //         Descriptions
                      //       </Typography>
                      //       <Typography
                      //         isIcon={false}
                      //         isIconColor={true}
                      //         font="regular"
                      //         className={` text-text-dark text-xs py-5 uppercase !cursor-default  `}
                      //       >
                      //         shards
                      //       </Typography>
                      //     </div>
                      //     {showClaimAllText ? (
                      //       <div className="flex items-center justify-center ">
                      //         <Typography
                      //           isIcon={false}
                      //           isIconColor={true}
                      //           font="regular"
                      //           className={`${credictedArr?.is_claimed === false
                      //             ? "text-text-secondary cursor-pointer"
                      //             : "text-text-lightgray pointer-events-none"
                      //             }  text-xs py-5 uppercase  `}
                      //           onClick={() => putClaimAll()}
                      //         >
                      //           CLAIM ALL
                      //         </Typography>
                      //         {credictedArr?.is_claimed === false && (
                      //           <ColorArrow />
                      //         )}
                      //       </div>
                      //     ) : (
                      //       <Typography isIcon={false} isIconColor={true}>
                      //         {"  "}
                      //       </Typography>
                      //     )}
                      //   </div>
                      //   <div id="CredictedScroll"
                      //     className={`h-[500px] overflow-y-auto mobile:h-[400px] pr-2 ${credicted?.length <= 0 &&
                      //       "grid place-content-center place-items-center text-text-primary "
                      //       } `}
                      //   >
                      //     <InfiniteScroll
                      //       dataLength={credicted.length}
                      //       next={getCreditedData}
                      //       hasMore={hasMore.credited}
                      //       loader={<Smallloader />}
                      //       scrollableTarget="CredictedScroll"
                      //     >
                      //       {credicted?.length <= 0 ? (
                      //         <div className="flex justify-center items-center h-[300px] ">
                      //           <Typography isIcon={false} variant="h3">
                      //             No Data{" "}
                      //           </Typography>
                      //         </div>
                      //       ) : (
                      //         credicted &&
                      //         credicted.map((data: any, index: number) => {
                      //           const cursor_style = `${data?.is_claimed === true ?
                      //             "cursor-not-allowed"
                      //             : "cursor-pointer"
                      //             }`;

                      //           const colorShow = `${data?.is_claimed === true
                      //             ? "text-text-lightgray"
                      //             : data?.is_claimed === false
                      //               ? "text-text-secondary"
                      //               : data?.is_greyout
                      //                 ? "text-text-lightgray"
                      //                 : "text-text-primary"
                      //             }`;
                      //           return (
                      //             <React.Fragment key={index}>
                      //               <div
                      //                 className={` pr-1 min-h-[10vh] py-3 flex items-center justify-between border-b-xs border-t-xs border-t-lightprimary border-b-lightprimary border-dashed mobile:gap-2 ${cursor_style} `}
                      //                 onClick={() => {
                      //                   if (data?.is_claimed === false) {
                      //                     putClaimShard(data.id);
                      //                   }
                      //                 }}
                      //               >
                      //                 <div className="flex gap-10 items-center mobile:gap-4">
                      //                   <div className="w-full h-full flex justify-center items-center gap-1">
                      //                     <span className={`${colorShow}`}>
                      //                       {(index + 1)
                      //                         .toString()
                      //                         .padStart(2, "0")}
                      //                     </span>
                      //                     {data?.icon ? (
                      //                       <img
                      //                         src={data?.icon}
                      //                         className="h-8 w-9 object-contain"
                      //                         alt={data?.name}
                      //                       />
                      //                     ) : data.is_claimed === true ? (
                      //                       <div className="h-8 w-9 flex justify-center items-center">
                      //                         <GrayAstroLogo />
                      //                       </div>
                      //                     ) : data.is_claimed === false ? (
                      //                       <div className="h-8 w-9 flex justify-center items-center">
                      //                         <CyanAstroLogo />
                      //                       </div>
                      //                     ) : (
                      //                       <div className="h-8 w-9 flex justify-center items-center">
                      //                         <WhiteAstroLogo />
                      //                       </div>
                      //                     )}
                      //                   </div>
                      //                   <div className="flex flex-col">
                      //                     <div className="flex gap-5 mobile:gap-2">
                      //                       <Typography
                      //                         variant="p"
                      //                         isIcon={false}
                      //                         font="bold"
                      //                         className={` text-text-lightgray tracking-widest text-xs w-[200px] line-clamp-3 mobile:w-[110px]  mobile:tracking-normal break-words
                      //                             ${data.is_claimed === true
                      //                             ? "text-text-lightgray"
                      //                             : data.is_claimed ===
                      //                               false
                      //                               ? "text-text-secondary"
                      //                               : "text-text-primary"
                      //                           } ${cursor_style} `}
                      //                         title={data?.description}
                      //                       >
                      //                         {data?.description + " "}
                      //                       </Typography>
                      //                       <Typography
                      //                         variant="p"
                      //                         isIcon={false}
                      //                         font="bold"
                      //                         className={`
                      //                   ${data.is_claimed === true
                      //                             ? "bg-background-lightgray !text-black px-1 tracking-widest text-xs min-w-[40px] text-center truncate mobile:tracking-normal  "
                      //                             : data.is_claimed === false
                      //                               ? "bg-background-third !text-black px-1 tracking-widest text-xs min-w-[40px] text-center truncate mobile:tracking-normal "
                      //                               : "bg-background-mainWhite !text-black px-1 tracking-widest text-xs min-w-[40px] text-center truncate mobile:tracking-normal "
                      //                           } ${cursor_style}`}
                      //                       >
                      //                         {data.value}
                      //                       </Typography>
                      //                     </div>
                      //                   </div>
                      //                 </div>
                      //                 {data?.is_claimed === true ? (
                      //                   <Typography
                      //                     variant="p"
                      //                     isIcon={false}
                      //                     className="text-text-lightgray cursor-not-allowed tracking-widest text-xs"
                      //                   >
                      //                     CLAIMED
                      //                   </Typography>
                      //                 ) : data?.is_claimed === false ? (
                      //                   <Typography
                      //                     variant="p"
                      //                     isIcon={false}
                      //                     className="text-text-secondary cursor-pointer tracking-widest text-xs"
                      //                   >
                      //                     CLAIM
                      //                   </Typography>
                      //                 ) : (
                      //                   ""
                      //                 )}
                      //               </div>
                      //             </React.Fragment>
                      //           )
                      //         })
                      //       )}
                      //     </InfiniteScroll>
                      //   </div>
                      // </div>
                    )}
                    {(socialAllMissionsType || recurringAllMissionsType) &&
                      !showCredited ? (
                      <div className=" mobile:w-[310px] w-[450px] ">
                        <Button
                          color="graylight"
                          bgColor
                          className="min-h-16 w-full !cursor-default mobile:h-full"
                          CLASSNAME="!mt-2"
                          isBorder={true}
                          logo={<InfoIcon />}
                          isBorderLabel="Note: it takes 3-4 hours during peak demand time for the shards to be made available for claiming on certain quests. "
                          isBorderLabelsubText={true}
                        />
                        {/* <img src={Images.LINE} alt="line" /> */}
                        <div className="flex w-full gap-4 mobile:gap-1">
                          <div className="flex justify-between w-4/5 mobile:w-[75%] ">
                            <Typography
                              isIcon={true}
                              isIconColor={true}
                              font="regular"
                              className="text-text-dark text-xs py-5 uppercase !cursor-default"
                            >
                              One-time Quests
                            </Typography>
                            <Typography
                              isIcon={false}
                              isIconColor={true}
                              font="regular"
                              className={` text-text-dark text-xs py-5 uppercase !cursor-default  `}
                            >
                              shards
                            </Typography>
                          </div>
                          {showClaimAllText ? (
                            <div className="flex justify-center items-center">
                              <Typography
                                isIcon={false}
                                isIconColor={true}
                                font="regular"
                                className={` ${arr1?.is_claimed === false ||
                                  arr2?.is_claimed === false
                                  ? "text-text-secondary cursor-pointer"
                                  : "text-text-lightgray pointer-events-none"
                                  }  text-xs py-5 uppercase  `}
                                onClick={() => putClaimAll()}
                              >
                                CLAIM ALL
                              </Typography>
                              {(arr1?.is_claimed === false ||
                                arr2?.is_claimed === false) && <ColorArrow />}
                            </div>
                          ) : (
                            <Typography
                              isIcon={false}
                              isIconColor={true}
                              font="regular"
                            >
                              {"  "}
                            </Typography>
                          )}
                        </div>
                        <div
                          className={`h-[250px] overflow-y-auto mobile:h-[160px] pr-2 ${socialAllMissions?.length <= 0 &&
                            "grid place-content-center place-items-center text-text-primary "
                            } `}
                        >
                          <InfiniteScroll
                            dataLength={socialAllMissions.length}
                            next={getOneTimeQuestsData}
                            hasMore={hasMore.oneTimeQuests}
                            loader={loading? <Smallloader />: ""}
                            scrollThreshold={0.8}
                            height={isDevices() ? "160px" : "250px"}
                          >
                            {socialAllMissions?.length <= 0 ? (
                              <Typography isIcon={false} variant="h3" className="cursor-default">
                                No Data{" "}
                              </Typography>
                            ) : (
                              socialAllMissions &&
                              socialAllMissions?.map(
                                (data: any, index: number) => {
                                  const _link =
                                    data?.is_claimed === false
                                      ? "#"
                                      : (data?.social_taks_type === "EMAIL" &&
                                        userData.isEmailVerified === false) ||
                                        (!userData.accountType.includes(
                                          "TELEGRAM"
                                        ) &&
                                          data?.social_taks_type === "TELEGRAM")
                                        ? "/profile"
                                        : !wallkey.includes("BLADE_WALLET") &&
                                          data?.social_taks_type ===
                                          "BLADE_WALLET"
                                          ? "#"
                                          : !userData.accountType.includes(
                                            "DISCORD"
                                          ) &&
                                            data?.social_taks_type === "DISCORD" &&
                                            (discordLink = data?.link)
                                            ? API_ROUTES.PROFILE_VERIFY_DISCORD
                                            : (userData.accountType.includes(
                                              "DISCORD"
                                            ) &&
                                              data?.social_taks_type ===
                                              "DISCORD") ||
                                              data?.name === "Twitter Follow" ||
                                              (data?.is_claimed === undefined &&
                                                data.link !== null)
                                              ? data.link
                                              : "#";

                                  const cursor_style = `${data?.is_claimed === true ?
                                    "cursor-not-allowed"
                                    : "cursor-pointer"
                                    }`;

                                  const colorShow = `${data?.is_claimed === true
                                    ? "text-text-lightgray"
                                    : data?.is_claimed === false
                                      ? "text-text-secondary"
                                      : "text-text-primary"
                                    }`;

                                  return (
                                    <>
                                      <Link
                                        to={_link}
                                        target={
                                          _link === "#" || _link === "/profile"
                                            ? "_self"
                                            : "_blank"
                                        }
                                      >
                                        <div
                                          className={` pr-1 min-h-[10vh] py-3 flex items-center justify-between border-b-xs border-t-xs border-t-lightprimary border-b-lightprimary border-dashed mobile:gap-2 ${cursor_style}`}
                                          onClick={() => {
                                            if (data?.is_claimed === false) {
                                              putClaimShard(data.id);
                                            } else if (
                                              userData.accountType.includes(
                                                "DISCORD"
                                              ) &&
                                              data?.social_taks_type ===
                                              "DISCORD"
                                            ) {
                                              // Check the Discord API silently and redirect to the link.
                                              getDashBoardDiscord();
                                            } else if (
                                              data?.social_taks_type ===
                                              "TWITTER" &&
                                              data?.social_task_activity_type ===
                                              "FOLLOW"
                                            ) {                                             
                                              localStorage.setItem('follow_twitter', JSON.stringify(data.id))
                                              setShowFollow(true);
                                              setTwitterMissionId(data.id);
                                            }else if(data?.social_taks_type === "TWITTER" && 
                                              (data?.social_task_activity_type === "COMMENT" || 
                                                data?.social_task_activity_type === "LIKE" || 
                                                data?.social_task_activity_type === "USERNAME" ||
                                                data?.social_task_activity_type === "TWITTER_HASHTAGS")
                                              ){
                                                localStorage.setItem('twitterQuest', JSON.stringify(data.id))
                                                setTwitterMissionId(data.id);
                                                setTwitterQuest(true)
                                            } else if (
                                              !userData.accountType.includes(
                                                "DISCORD"
                                              ) &&
                                              data?.social_taks_type ===
                                              "DISCORD"
                                            ) {
                                              // openLink(API_ROUTES.PROFILE_VERIFY_DISCORD);
                                            } else if (
                                              !userData.accountType.includes(
                                                "TELEGRAM"
                                              ) &&
                                              data?.social_taks_type ===
                                              "TELEGRAM"
                                            ) {
                                              navigate("/profile");
                                              setAutoScroll(false);
                                            } else if (
                                              !wallkey.includes(
                                                "BLADE_WALLET"
                                              ) &&
                                              data?.social_taks_type ===
                                              "BLADE_WALLET"
                                            ) {
                                              handleWalletConnection("blade");
                                            } else if (data?.social_taks_type ===
                                              "CLAIM_BLACK_PASS") {
                                              if (user && !user?.is_minted) {
                                                handleConnectWallet()
                                              } else {
                                                toast.success("You already claimed your Black Pass!");
                                              }
                                            } else if (
                                              !wallkey.includes("HEDERA") &&
                                              data?.social_taks_type ===
                                              "HEDERA"
                                            ) {
                                              return;
                                            } else if (
                                              data?.social_taks_type ===
                                              "EMAIL" &&
                                              userData.isEmailVerified === false
                                            ) {
                                              setAutoScroll(true);
                                            } else if (
                                              data?.is_claimed === undefined &&
                                              data.link !== null
                                            ) {
                                              // openLink(data.link);
                                            }
                                          }}
                                        >
                                          <div className="flex gap-10 items-center mobile:gap-4">
                                            <div className="w-full h-full flex justify-center items-center gap-1">
                                              <span className={`${colorShow}`}>
                                                {(index + 1)
                                                  .toString()
                                                  .padStart(2, "0")}
                                              </span>
                                              {data?.icon ? (
                                                <img
                                                  src={data?.icon}
                                                  className="h-8 w-9 object-contain"
                                                  alt={data?.name}
                                                />
                                              ) : data.is_claimed === true ? (
                                                <div className="h-8 w-9 flex justify-center items-center">
                                                  <GrayAstroLogo />
                                                </div>
                                              ) : data.is_claimed === false ? (
                                                <div className="h-8 w-9 flex justify-center items-center">
                                                  <CyanAstroLogo />
                                                </div>
                                              ) : (
                                                <div className="h-8 w-9 flex justify-center items-center">
                                                  <WhiteAstroLogo />
                                                </div>
                                              )}
                                            </div>
                                            <div className="flex flex-col">
                                              <div className="flex gap-5 mobile:gap-2">
                                                <Typography
                                                  variant="p"
                                                  isIcon={false}
                                                  font="bold"
                                                  className={` text-text-lightgray tracking-widest text-xs w-[200px] line-clamp-3 mobile:w-[110px]  mobile:tracking-normal break-words 
                                                  ${data.is_claimed === true
                                                      ? "text-text-lightgray"
                                                      : data.is_claimed ===
                                                        false
                                                        ? "text-text-secondary"
                                                        : "text-text-primary"
                                                    } ${cursor_style} `}
                                                  title={data?.description}
                                                >
                                                  {data?.description + " "}
                                                </Typography>
                                                <Typography
                                                  variant="p"
                                                  isIcon={false}
                                                  font="bold"
                                                  title={data?.description}
                                                  className={`
                                        ${data.is_claimed === true
                                                      ? "bg-background-lightgray !text-black px-1 tracking-widest text-xs w-[40px] text-center truncate mobile:tracking-normal  "
                                                      : data.is_claimed === false
                                                        ? "bg-background-third !text-black px-1 tracking-widest text-xs w-[40px] text-center truncate mobile:tracking-normal "
                                                        : "bg-background-mainWhite !text-black px-1 tracking-widest text-xs w-[40px] text-center truncate mobile:tracking-normal "
                                                    } ${cursor_style}`}
                                                >
                                                  {data.value}
                                                </Typography>
                                              </div>
                                              {(data?.necessary ===
                                                "MANDATORY" &&
                                                data?.social_taks_type ===
                                                "CLAIM_BLACK_PASS") && (
                                                  <div className="max-w-24 border-2 border-[#FF6060] p-1 rounded-sm ">
                                                    <div className="bg-[#FF0000] flex items-center justify-center rounded-sm">
                                                      <Typography
                                                        variant="p"
                                                        isIcon={false}
                                                        font="bold"
                                                        className="text-[#FFFFFFCC] tracking-widest text-xxs "
                                                      >
                                                        {data?.necessary}
                                                      </Typography>
                                                    </div>
                                                  </div>
                                                )}
                                              {/* <Typography
                                    variant="p"
                                    isIcon={false}
                                    className={`flex text-xxs justify-center items-center text-text-lightgray gap-1 !cursor-pointer `}
                                    
                                  >
                                    <TimerLogo />{" "}
                                    {DateTime.fromISO(data.updated_at).toFormat(
                                      "yyyy-MM-dd  h:mm:ss"
                                    )}
                                  </Typography> */}
                                            </div>
                                          </div>
                                          {data?.is_claimed === true ? (
                                            <Typography
                                              variant="p"
                                              isIcon={false}
                                              className="text-text-lightgray cursor-not-allowed tracking-widest text-xs"
                                            >
                                              CLAIMED
                                            </Typography>
                                          ) : data?.is_claimed === false ? (
                                            <Typography
                                              variant="p"
                                              isIcon={false}
                                              className="text-text-secondary cursor-pointer tracking-widest text-xs"
                                            >
                                              CLAIM
                                            </Typography>
                                          ) : !userData.accountType.includes(
                                            "DISCORD"
                                          ) &&
                                            data?.social_taks_type ===
                                            "DISCORD" ? (                                             
                                            <ColorArrow />                                                                                      
                                          ) :
                                            userData.accountType.includes(
                                              "DISCORD"
                                            ) &&
                                              data?.social_taks_type ===
                                              "DISCORD" ? (
                                              <div
                                                className="cursor-pointer"
                                              >
                                                <ColorArrow />
                                              </div>
                                            ) : !wallkey.includes("BLADE_WALLET") &&
                                              data?.social_taks_type ===
                                              "BLADE_WALLET" ? (
                                              <ColorArrow />
                                            ) : !wallkey.includes("HEDERA") &&
                                              data?.social_taks_type ===
                                              "HEDERA" ? (
                                              <div
                                                className="cursor-not-allowed"
                                                onClick={(e) =>
                                                  e.preventDefault()
                                                }
                                              >
                                                <ColorArrow />
                                              </div>
                                            ) : data?.social_task_type ===
                                              "EMAIL" &&
                                              userData.isEmailVerified ===
                                              true ? (
                                              <div
                                                className="cursor-not-allowed"
                                                onClick={(e) =>
                                                  e.preventDefault()
                                                }
                                              >
                                                <ColorArrow />
                                              </div>
                                            ) :
                                              data?.social_taks_type ===
                                                "TWITTER" &&
                                                data?.social_task_activity_type ===
                                                "FOLLOW" ? (
                                                <div
                                                  className="cursor-pointer"
                                                  // onClick={(e) => {                                                    
                                                  //   e.stopPropagation();
                                                  // }}
                                                >
                                                  <ColorArrow />
                                                  
                                                </div>
                                              ) : (
                                                <div
                                                  className={
                                                    data.social_task_type ===
                                                      "DISCORD"
                                                      ? validDiscord
                                                        ? "cursor-pointer"
                                                        : "cursor-not-allowed"
                                                      : "cursor-pointer"
                                                  }
                                                >
                                                  <ColorArrow />
                                                </div>
                                              )}
                                        </div>
                                      </Link>
                                    </>
                                  );
                                }
                              )
                            )}
                          </InfiniteScroll>
                        </div>
                        <div className="flex justify-between">
                          <Typography
                            isIcon={true}
                            isIconColor={true}
                            font="regular"
                            className="text-text-dark text-xs py-5 uppercase !cursor-default"
                          >
                            Ongoing Quests
                          </Typography>
                        </div>
                        <div
                          className={`h-[250px] overflow-y-auto mobile:h-[160px] pr-2 ${recurringAllMissions.length <= 0 &&
                            "grid place-content-center place-items-center text-text-primary "
                            } `}
                        >
                          <InfiniteScroll
                            dataLength={recurringAllMissions.length}
                            next={getOnGoingQuestsData}
                            hasMore={hasMore.ongoingQuests}
                            loader={loading? <Smallloader />: ""}
                            scrollThreshold={0.8}
                            height={isDevices() ? "160px" : "250px"}
                          >
                            {recurringAllMissions.length <= 0 ? (
                              <Typography isIcon={false} variant="h3" className="cursor-default">
                                No Data{" "}
                              </Typography>
                            ) : (
                              recurringAllMissions &&
                              recurringAllMissions.map(
                                (data: any, index: number) => {
                                  let _link;
                                  // if (
                                  //   data?.recurring_task_type ===
                                  //   "SEVEN_DAYS_CONSECUTIVE_LOGIN"
                                  // ) {
                                  //   setSevenDaysInfo(true)
                                  // } 
                                  // else
                                   if (
                                    data?.recurring_task_type ===
                                    "DEVIANTS_HOLD"
                                  ) {
                                    _link = data.link;
                                  } else if (
                                    data?.recurring_task_type ===
                                    "TWITTER_HASHTAGS"
                                  ) {
                                    const _regex = /\#\w+/g;
                                    let hashtags =
                                      data.description.match(_regex);
                                    hashtags = hashtags
                                      ? hashtags.map((hashtag: any[]) =>
                                        hashtag.slice(1)
                                      )
                                      : [];
                                    // create a regex expression to parse the data.description and get the words starting with @ or $ or other special characters excluding #.
                                    const regex = /\$\w+|\@\w+/g;
                                    const words = data.description.match(regex);
                                    _link = `https://twitter.com/compose/post?text=${words.join(
                                      " "
                                    )}&hashtags=${hashtags.join(" ")}`;
                                  } else if (
                                    data?.is_claimed === undefined &&
                                    data.link !== null
                                  ) {
                                    _link = data.link;
                                  } else {
                                    _link = "#";
                                  }

                                  const colorShow = `${data?.is_claimed === true
                                    ? "text-text-lightgray"
                                    : data?.is_claimed === false
                                      ? "text-text-secondary"
                                      : data?.is_greyout
                                        ? "text-text-lightgray"
                                        : "text-text-golden"
                                    }`;

                                  const cursor_style = `${data?.is_claimed === true ?
                                    "cursor-not-allowed"
                                    : data?.is_greyout ?
                                      "cursor-not-allowed"
                                      :
                                      data?.recurring_task_type ===
                                                "DEMO_COMPLETED" ||
                                                data?.recurring_task_type ===
                                                "REFERRAL_DEMO_COMPLETED" ?
                                                "cursor-not-allowed"
                                      :
                                      "cursor-pointer"
                                    }`;

                                  return (
                                    <>
                                      <Link
                                        to={_link}
                                        target={
                                          _link === "#" || _link === "/faq"
                                            ? "_self"
                                            : "_blank"
                                        }
                                      >
                                        <div
                                          className={` min-h-[10vh] pr-1 flex justify-between items-center py-3 border-t-xs border-b-xs border-t-lightprimary border-b-lightprimary border-dashed mobile:gap-2 ${(data?.recurring_task_type ===
                                            "DEMO_COMPLETED" ||
                                            data?.recurring_task_type ===
                                            "REFERRAL_DEMO_COMPLETED") &&
                                            "cursor-not-allowed"
                                            } ${cursor_style} `}
                                          onClick={() => {
                                            if (data?.is_claimed === false) {
                                              putClaimShard(data.id);
                                            }
                                            if (
                                              data?.recurring_task_type ===
                                              "SEVEN_DAYS_CONSECUTIVE_LOGIN" && data?.is_claimed !== false && data?.is_claimed !== true
                                            ) {
                                              setSevenDaysInfo(true)
                                            }
                                            else if( 
                                              (data?.recurring_task_type === "COMMENT" || 
                                                data?.recurring_task_type === "USERNAME" ||
                                                data?.recurring_task_type === "TWITTER_HASHTAGS")
                                              ){
                                                localStorage.setItem('twitterQuest', JSON.stringify(data.id))
                                                setTwitterMissionId(data.id);
                                                setTwitterQuest(true)
                                            }
                                            else if(data?.recurring_task_type === "CREATOR_QUEST" && data?.is_greyout !== true) {
                                             setCreatorQuestModal(true)
                                            }
                                            }}
                                        >
                                          <div className=" flex gap-10 items-center mobile:gap-4">
                                            <div className="w-full h-full flex justify-center items-center gap-1">
                                              <span className={`${colorShow}`}>
                                                {(index + 1)
                                                  .toString()
                                                  .padStart(2, "0")}
                                              </span>
                                              {data?.icon ? (
                                                <img
                                                  src={data?.icon}
                                                  className="h-8 w-9 object-contain"
                                                  alt={data?.name}
                                                />
                                              ) : data.is_claimed === true ? (
                                                <div className="h-8 w-9 flex justify-center items-center">
                                                  <GrayAstroLogo />
                                                </div>
                                              ) : data.is_claimed === false ? (
                                                <div className="h-8 w-9 flex justify-center items-center">
                                                  <CyanAstroLogo />
                                                </div>
                                              ) : (
                                                <div className="h-8 w-9 flex justify-center items-center">
                                                  <GolderAstro />
                                                </div>
                                              )}
                                            </div>
                                            <div className="flex flex-col">
                                              <div className="flex gap-5 mobile:gap-2">
                                                <Typography
                                                  variant="p"
                                                  isIcon={false}
                                                  font="bold"
                                                  className={` tracking-widest text-xs w-[200px] line-clamp-3 mobile:w-[110px]  mobile:tracking-normal break-words ${(data?.recurring_task_type ===
                                                    "DEMO_COMPLETED" ||
                                                    data?.recurring_task_type ===
                                                    "REFERRAL_DEMO_COMPLETED") &&
                                                    "!cursor-not-allowed"
                                                    }
                                                  ${colorShow}  ${cursor_style}`}
                                                  title={data?.description}
                                                >
                                                  {data?.description + " "}
                                                </Typography>
                                                <Typography
                                                  variant="p"
                                                  isIcon={false}
                                                  font="bold"
                                                  title={data?.description}
                                                  className={
                                                    data.is_claimed === true
                                                      ? `bg-background-lightgray !text-black px-1 tracking-widest text-xs w-[40px] text-center truncate mobile:tracking-normal cursor-not-allowed ${(data?.recurring_task_type ===
                                                        "DEMO_COMPLETED" ||
                                                        data?.recurring_task_type ===
                                                        "REFERRAL_DEMO_COMPLETED") &&
                                                      "!cursor-not-allowed"
                                                      }`
                                                      : data.is_claimed ===
                                                        false
                                                        ? `bg-background-third !text-black px-1 tracking-widest text-xs w-[40px] text-center truncate cursor-pointer mobile:tracking-normal ${(data?.recurring_task_type ===
                                                          "DEMO_COMPLETED" ||
                                                          data?.recurring_task_type ===
                                                          "REFERRAL_DEMO_COMPLETED") &&
                                                        "!cursor-not-allowed"
                                                        }`
                                                        : data.is_greyout
                                                          ? `bg-background-lightgray !text-black px-1 tracking-widest text-xs w-[40px] text-center truncate mobile:tracking-normal !cursor-not-allowed
                                                          }`
                                                          : `bg-background-golden !text-black px-1 tracking-widest text-xs w-[40px] text-center truncate cursor-pointer mobile:tracking-normal ${(data?.recurring_task_type ===
                                                            "DEMO_COMPLETED" ||
                                                            data?.recurring_task_type ===
                                                            "REFERRAL_DEMO_COMPLETED") &&
                                                          "!cursor-not-allowed"
                                                          } ` 
                                                  }
                                                >
                                                  {data.value}
                                                </Typography>
                                              </div>
                                            </div>
                                          </div>
                                          {data?.is_claimed === true ? (
                                            <Typography
                                              variant="p"
                                              isIcon={false}
                                              className="text-text-lightgray cursor-not-allowed tracking-widest text-xs"
                                            >
                                              CLAIMED
                                            </Typography>
                                          ) : data?.is_claimed === false ? (
                                            <Typography
                                              onClick={() => {
                                                // putClaimShard(data.id);
                                              }}
                                              variant="p"
                                              isIcon={false}
                                              className="text-text-secondary cursor-pointer tracking-widest text-xs"
                                            >
                                              CLAIM
                                            </Typography>
                                          ) : data?.recurring_task_type ===
                                            "DEVIANTS_HOLD" ||
                                            data?.recurring_task_type ===
                                            "SEVEN_DAYS_CONSECUTIVE_LOGIN" ? (
                                            <div
                                              className="cursor-pointer"
                                            >
                                              <GoldArrow />
                                            </div>
                                          ) : data?.recurring_task_type ===
                                            "TWITTER_HASHTAGS" ? (
                                            <div className="cursor-pointer">
                                              <GoldArrow />
                                            </div>
                                          ) 
                                          : (data?.recurring_task_type === "CREATOR_QUEST" && data?.is_greyout === true) ?
                                          <GrayColorArrow />
                                          : (
                                            
                                            <GoldArrow />
                                          )}
                                        </div>
                                      </Link>
                                    </>
                                  );
                                }
                              )
                            )}
                          </InfiniteScroll>
                        </div>
                      </div>
                    ) : null}
                  </>
                )}
              </Card>
            </div>
            {/* )} */}
          </div>
          <Footer />
        </div>
      )}
      
      {showBlackPass && (
        <UpdateBlackPassModal
          onClose={() => setShowBlackPass(false)}
          onUpdate={() => getUpdateBlackPass()}
          totalShards={dashboardMetrics?.totalShards?._sum?.value}
          blackPassDataRes={BlackPassResponse.status === "pending"}
          freeTxCount={freeTx}
        />
      )}
      {ShowWalletConnectionIntro && (
        <Modal blurImg={true} style={{ zIndex: 50 }}>
          <Card pseudoElement="secondary" className="!px-5">
            <button
              onClick={() =>
                setShowWalletConnectionIntro(!ShowWalletConnectionIntro)
              }
              className="cursor-pointer absolute top-2 right-2"
            >
              <CancleIcon />
            </button>
            <div className="max-h-[56vh] mt-2 text-[14px] text-text-light">
              <div className="text-white text-base mb-2">
                Follow Below Steps:
              </div>
              <ol className="flex flex-col gap-3">
                {bladeSteps.map((step, index) => (
                  <li key={index}>
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-2">
                        <span className="min-w-max">
                          {`Step ${index + 1}`}:
                        </span>
                        <span>{step.text}</span>
                      </div>
                      {step.imageUrl &&
                        step.imageUrl.map((url, idx) => (
                          <img
                            key={idx}
                            className="px-6"
                            src={url}
                            alt={`Step ${index + 1}`}
                          />
                        ))}
                    </div>
                  </li>
                ))}
              </ol>
              <br />
              <br />
              <Button
                type="submit"
                className="w-[90%] mx-auto "
                CLASSNAME="px-3 text-text-primary group-hover:text-text-secondary mobile:px-2"
                color="white"
                onClick={() => openConnectionModal(ShowWalletConnectionIntro)}
                isBorderLabel="Continue"
                isBorder={true}
                bgColor
              />
            </div>
          </Card>
        </Modal>
      )}

      {bladeSelectModal && (
        <BladeWalletModal
          onClosePopUp={() => setBladeSelectModal(false)}
          onConnect={initBlade}
        />
      )}

      {referralInfo && (
        <ReferralInfo CloseReferralInfo={() => setReferralInfo(false)} />
      )}

      {showCustomWalletModal && (
        <CustomWalletModal
          setShowCustomWalletModal={setShowCustomWalletModal}
          setWalletListen={setWalletListen}
          // metamaskSdk={metamaskSdk}
          // setSignature={setSignature}
          // connect={connect}
          // connectors={connectors}
          // setMMSdk={setMMSdk}
          updateBlackPass={updateBlackPass}

        // updateBPValues={updateBPValues}
        // setMmBpUpdate={setMmBpUpdate}
        />
      )}

      {showWalletErrorModal && (
        <ShowWalletAddress
          onClose={() => setShowWalletErrorModal(false)}
          onUpdate={() => {
            handleConnectWallet();
            setShowWalletErrorModal(false);
          }}
          conectedAddress={userData?.WalletsType?.EVM}
        />
      )}

      {bpMintedModal &&
        <ClaimBlackPass
          onClose={() => setBPMintedModal(false)}
        />
      }

      {showMintBPModal &&
        <MintBlackPassModal
          onClose={() => setShowMintBPModal(false)}
          onUpdate={() => {
            handleConnectWallet();
          }}
        />
      }

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
      {showFollow && (
        <TwitterFollowPopup
          onFollow={() => {
            getTwitterFollow(
              twitterMissionId
            );            
          }}
          loading={isTwitterVerifying}
          onClosePopUp={() => {
            handleRemoveTwitterQuestLocalStorage("follow_twitter")
            setShowFollow(false);
            setTwitterMissionId(null);
          }}
          text={isTwitterVerifying ? "Verifying..." : "Verify Twitter Follow"}
        />
      )}
      {sevenDaysInfo && (
        <SevenDaysInfo onClose={()=> setSevenDaysInfo(false)}/>
      )}

      {/* Twitter quest modal */}
      {twitterQuest && (
        <TwitterQuestPopup
          onFollow={() => {
            getTwitterTagsQuest(
              twitterMissionId
            );            
          }}
          loading={isTwitterVerifying}
          onClosePopUp={() => {    
            handleRemoveTwitterQuestLocalStorage("twitterQuest")   
            setTwitterQuest(false);
            setTwitterMissionId(null);
          }}
          text={isTwitterVerifying ? "Verifying..." : "Verify Twitter Quest"}
        />
      )}    

      {creatorQuestModal && <CreatorQuest onClose={()=> setCreatorQuestModal(false)} questMission={ ()=> getMissionsTabs()} />}  
    </>
  );
};