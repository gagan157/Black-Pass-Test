import {
  BladeConnector,
  ConnectorStrategy,
  HederaNetwork,
} from "@bladelabs/blade-web3.js";
import { LedgerId } from "@hashgraph/sdk";
import { CancleIcon, RightLogo, SmallLine } from "assets";
import { Images } from "assets/Images";
import { Button } from "components/Atoms/Button/Button";
import { Card } from "components/Atoms/Card/Card";
import { Textfield } from "components/Atoms/Textfield/Textfield";
import { Typography } from "components/Atoms/Typography/Typography";
import { Modal } from "components/Molecules/Modal";
import { AvatarPopup } from "components/Molecules/PopUp/AvatarPopup";
import { isMobileDevice, serialize } from "constants/utils";
import { useFormik } from "formik";
import { HashConnect } from "hashconnect";
import { useCustomError } from "hooks/accessTokenExpire";
import { useGetUserDetails } from "hooks/usegetUserDetails";
import _ from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "components/Loader";
import {
  CREATE_BLADE_WALLET,
  GET_AVATAR_LIST,
  GET_EMAIL_VALIDATION,
  GET_USER_VALIDATION,
  POST_HASHPACK,
  POST_PROFILE_UPDATE_EMAIL,
  POST_TELEGRAM_VERIFY,
  PROFILE_UPDATE,
  PUT_PROFILE_VERIFY_EMAIL,
  PUT_UPDATE_BLADE_WALLET,
} from "services/apiService";
import TelegramLoginButton from "telegram-login-button";
import * as Yup from "yup";
import * as config from "constants/config";
import { useUser } from "context/userContext";
import { BladeWalletModal } from "components/Molecules/PopUp/CustomBladeSelectModal";

// const factions = [
//   {
//     type: "COMBAT",
//     image: Images.COMBAT,
//     bg: Images.COMBAT_BG,
//     label: "COMBAT",
//   },
//   {
//     type: "DIPLOMACY",
//     image: Images.DIPLOMACY,
//     bg: Images.DIPLOMACY_BG,
//     label: "DIPLOMACY",
//   },
//   {
//     type: "CRAFTING",
//     image: Images.CRAFTING,
//     bg: Images.CRAFTING_BG,
//     label: "CRAFTING",
//   },
//   {
//     type: "EXPLORATION",
//     image: Images.EXPLORATION,
//     bg: Images.EXPLORATION_BG,
//     label: "EXPLORATION",
//   },
// ];

// const options = [
//   {
//     value: "option1",
//     label: "Option 1",
//     imgSrc:
//       "https://imgs.search.brave.com/0qNx8s2VUylmrf_ClUpik_ebhMFcRyWkN78VUyn9R9A/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/ZHJlYW1zb2Z0NHUu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIzLzAxL0JvcmVk/LUFwZS1ZYWNodC1D/bHViLTIuanBn",
//   },
//   {
//     value: "option2",
//     label: "Option 2",
//     imgSrc:
//       "https://imgs.search.brave.com/4W1uBsWk2YFx3kVmpfOcj6NMX6l2qjJUZUnLN7XuwVc/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvbmZ0LW1vbmtl/eS1waWN0dXJlcy00/eXM5cmpnOTE3dTk1/amJjLmpwZw",
//   },
//   {
//     value: "option3",
//     label: "Option 3",
//     imgSrc:
//       "https://imgs.search.brave.com/4W1uBsWk2YFx3kVmpfOcj6NMX6l2qjJUZUnLN7XuwVc/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvbmZ0LW1vbmtl/eS1waWN0dXJlcy00/eXM5cmpnOTE3dTk1/amJjLmpwZw",
//   },
// ];

// interface MyProfileProps {
//   onClose: () => void;
// }

export const MyProfile = () => {
  const navigate = useNavigate();
  const { user, autoScroll } = useUser();
  const { userData, getUserDetails, isLoading } = useGetUserDetails();
  const { handleError } = useCustomError();

  const [updateProfileRes, setUpdateProfileRes] = useState({
    status: "idle",
  });

  const [userNameValidation, setUserNameValidation] = useState<number | null>(
    null
  );

  const [avatar, setAvatar] = useState([]);

  const [fraction, setFraction] = useState("");

  const [emailValidation, setEmailValidation] = useState<number | null>(null);

  const [updateProfileEmail, setUpdateProfileEmail] = useState({
    status: "idle",
  });

  const [showEmailVeification, setshowEmailVeification] = useState<
    boolean | null
  >(null);

  const [showEmail, setshowEmail] = useState<boolean | null>(null);

  const [otpValue, setOtpValue] = useState("");

  const [bladeAddress, setBladeAddress] = useState("");

  const [loading, setLoading] = useState<boolean>(true);

  const [hideOtp, setHide] = useState<boolean>(false);

  const [isEditUserName, setIsEditUserName] = useState(false);

  const [isEditEmail, setIsEditEmail] = useState(false);

  const [isEditFaction, setIsEditFaction] = useState(false);

  const [isHedraWallet, setIsHedraWallet] = useState(false);

  const [showAvatar, setShowaAvatar] = useState(false);

  const [isHashpack, setIsHashpack] = useState(false);

  const [bladeSelectModal, setBladeSelectModal] = useState(false);

  const [isEditBlade, setIsEditBlade] = useState(false);

  const [ShowWalletConnectionIntro, setShowWalletConnectionIntro] =
    useState<any>(null);

  const emailScrollRef: any = useRef();
  // const [showEmailModal, setShowEmailModal] = useState(false);


  useEffect(() => {
    if (emailScrollRef.current && autoScroll) {
      emailScrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [autoScroll]);

  const onClose = () => {
    navigate("/dashboard");
  };

  const formik: any = useFormik({
    initialValues: {
      username: userData.user_name ? userData.user_name : "",
      factions: userData.Factions?.factions_type
        ? userData.Factions?.factions_type
        : "",
      avatar: userData.avatar ? userData.avatar : "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .matches(/^\S*$/, "Spaces are not allowed in the username")
        .matches(
          /^[a-zA-Z][a-zA-Z0-9~!@$&_\-&]*$/,
          "Username must start with a letter and can contain numbers, letters, ~, !, @, $, _, -, or &"
        )
        .min(4, "Username must be at least 4 characters")
        .max(20, "Username must not exceed 20 characters")
        .required("Username is required"),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      updateProfile();
    },
  });

  const updateProfile = async () => {
    const toastId = toast.loading("Updating profile...", {theme: "light"});
    try {
      setUpdateProfileRes({
        status: "pending",
      });
      // {
      //   user_name: formik.values.username,
      //   avatar_url: formik.values.avatar,
      //   faction: fraction,
      // }
      const body: any = {};

      body["user_name"] =
        userData.user_name === formik.values.username
          ? ""
          : formik.values.username;

      body["avatar_url"] =
        userData.avatar === formik.values.avatar ? "" : formik.values.avatar;

      body["faction"] =
        userData.Factions?.factions_type === fraction ? "" : fraction;
      if (body.user_name === "") {
        delete body.user_name;
      }
      if (body.avatar_url === "") {
        delete body.avatar_url;
      }
      if (body.faction === "") {
        delete body.faction;
      }
      const res = await PROFILE_UPDATE(body);
      if (res.data?.success) {
        setUpdateProfileRes({
          status: "resolved",
        });

        getUserDetails();
        onClose();
        toast.success(res.data.message);
      }
    } catch (error: any) {
      // toast.error(error.response.data.message);
      handleError(error);
      setUpdateProfileRes({
        status: "rejected",
      });
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleUserValidation = useCallback(
    _.debounce(async (username: string) => {
      try {
        const res = await GET_USER_VALIDATION(
          serialize({
            user_name: username,
          })
        );

        if (username === "") {
          setUserNameValidation(null);
        } else if (res.data.success) {
          setUserNameValidation(200);
        }
      } catch (error: any) {
        if (error.response.status === 409) {
          setUserNameValidation(error.response.status);
        }
        handleError(error);
        // toast.error(error?.response?.data?.message);
      }
    }, 500),
    []
  );

  const getAvatar = async () => {
    try {
      const res = await GET_AVATAR_LIST(
        serialize({
          wallet_address: userData?.WalletsType?.EVM,
        })
      );
      if (res.status === 200) {
        const devientData = res.data;
        const devientlist = devientData.map((devient: any) => ({
          label: devient.name,
          value: devient.name,
          imgSrc: devient?.imageUrl,
        }));
        setAvatar(devientlist);
      }
    } catch (error: any) {
      // toast.error(error);
      handleError(error);
    }
  };

  // useEffect(() => {
  //   getAvatar();
  // }, []);

  const handleFraction = (type: string) => {
    setFraction(type);
    formik.setFieldValue("factions", type);
  };

  const formikEmail: any = useFormik({
    initialValues: {
      email: userData.email ? userData.email : "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        // .matches(
        //   /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+(com|in|co|net|org|info)$/,
        //   "Invalid domain"
        // )
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          'Invalid email address'
        )
        .max(50, "Email must be at most 50 characters")
        .email("Enter valid Email")
        .required("Email is required"),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      SendEMail();
    },
  });

  const SendEMail = async (isResendButton?: boolean) => {
    try {
      setUpdateProfileEmail({
        status: "pending",
      });
      // if (isResendButton === false) setshowEmailVeification(false);
      const res = await POST_PROFILE_UPDATE_EMAIL({
        email: formikEmail.values.email,
      });
      if (res.data?.success) {
        setshowEmailVeification(true);
        setUpdateProfileEmail({
          status: "resolved",
        });
        toast.success(res.data?.message);
      }
    } catch (err: any) {
      // toast.error(err.response.data.message);
      handleError(err);
      setUpdateProfileEmail({
        status: "rejected",
      });
    }
  };

  const checkEmail = useCallback(
    _.debounce(async (email: string) => {
      try {
        const res = await GET_EMAIL_VALIDATION(
          serialize({
            email: email,
          })
        );
        if (email === "") {
          setEmailValidation(null);
        } else if (res.data.success) {
          setEmailValidation(200);
        }
      } catch (error: any) {
        if (error.response.status === 409) {
          setEmailValidation(error.response.status);
        }
      }
    }, 500),
    []
  );

  const Otpformik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object().shape({
      otp: Yup.string()
        .required("OTP is required")
        .matches(/^[0-9]{6}$/, "OTP must be a 6-digit number"),
    }),
    onSubmit: (values) => {
      VerifyEmail();
    },
  });

  const VerifyEmail = async () => {
    try {
      const res = await PUT_PROFILE_VERIFY_EMAIL({
        otp: parseInt(otpValue),
        email: formikEmail.values.email,
      });
      if (res.data?.success) {
        // setshowEmailVeification(null);
        setHide(true);
        onClose();
      }
      toast.success("Email Verified");
    } catch (err: any) {
      // toast.error(err.response.data.message);
      handleError(err);
    }
  };

  const appMetadata = {
    name: config.APP_NAME,
    description: config.APP_DESC,
    icons: [config.APP_ICON],
    url: window.location.href,
  };

  let hashconnect: HashConnect;

  const pairHashpack = async () => {
    hashconnect = new HashConnect(
      LedgerId.MAINNET,
      "00f9bf9e697ca8332a30d4a71f4c7d5e",
      appMetadata,
      true
    );
    hashconnect.pairingEvent.on((newPairing: any) => {
      const accountId = newPairing?.accountIds[0];
      postHashPack({
        wallet_address: accountId,
      });
    });

    // hashconnect.connectionStatusChangeEvent.on((connectionStatus:any) => {
    //   console.log(connectionStatus, ":::::::::::connectionStatus::::::");

    // });

    await hashconnect.init();

    hashconnect.openPairingModal();
  };

  const postHashPack = async (accountId: any) => {
    try {
      const res = await POST_HASHPACK(accountId);
      if (res.data?.success) {
        getUserDetails();
        setIsHashpack(true);
      }
    } catch (error: any) {
      // toast.error(error.response?.data?.message);
      handleError(error);
    }
  };

  // Using hashPackWalletConnect to pass the wallet bladeAddress(hbar address).
  const hashPackWalletConnect = async (bladeAddress: any) => {
    try {
      setLoading(true);
      const response = await CREATE_BLADE_WALLET(bladeAddress);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      // toast.error(error);
      toast.error(error?.response?.data?.message);
      console.log("error:::::::", error);
    }
  };

  async function initBlade(type?: string) {
    try {
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
        setBladeAddress(accountId);
        if (isEditBlade) {
          UpdateBladeWallet(
            serialize({
              wallet_address: accountId,
            }), bladeConnector);
        } else {
          bladeWalletConnect({
            wallet_address: accountId,
          }, bladeConnector);
        }
        getUserDetails();
      } else {
        toast.error("bladeSigner is null.");
      }
    } catch (error: any) {
      toast.error(error);
    }
  }

  // Using bladeWalletConnect to pass the wallet bladeAddress(hbar address).
  const bladeWalletConnect = async (bladeAddress: any, bladeConnector?: any) => {
    try {
      setLoading(true);
      const res = await CREATE_BLADE_WALLET(bladeAddress);
      if (res.data.success) {
        getUserDetails();
        setIsHedraWallet(true);
      }
      toast.success(res?.data?.message);
      bladeConnector.killSession();
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      bladeConnector.killSession();
      handleError(error);
    }
  };

  const UpdateBladeWallet = async (updatedAddress: any, bladeConnector?: any) => {
    try {
      setLoading(true);
      const res = await PUT_UPDATE_BLADE_WALLET(updatedAddress);
      if (res.data.success) {
        setIsEditBlade(false);
        getUserDetails();
      }
      toast.success(res?.data?.message);
      bladeConnector.killSession();
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      handleError(error);
      bladeConnector.killSession();
    }
  }

  const handleEditUserName = () => {
    setIsEditUserName(true);
  };

  const handleEditEmail = () => {
    setIsEditEmail(true);
  };

  const closeEditEmail = () => {
    formikEmail.setFieldValue("email", userData.email);
    setIsEditEmail(false);
    setshowEmailVeification(false);
  };

  const handleEditFaction = () => {
    setIsEditFaction(true);
  };

  const handleSelectAvatar = (avatar: any) => {
    formik.setFieldValue("avatar", avatar.imgSrc);
  };

  const handleTelegramAuth = (user: any) => {
    if (user?.id) {
      postVerifyTelegram(user?.id, user?.username);
    }
  };

  const postVerifyTelegram = async (id: string, userName: string) => {
    try {
      if (userData && userData.accountType.includes("TELEGRAM")) {
        return;
      }
      const res = await POST_TELEGRAM_VERIFY(id, userName);
      if (res.data?.success) {
        getUserDetails();
      }
    } catch (error: any) {
      // toast.error(error.message);
      handleError(error);
    }
  };

  const wallkey = Object.keys(userData.WalletsType);

  // const SendVerifyEMail = async (isResendButton?: boolean) => {
  //   try {
  //     if (!isResendButton) setshowEmail(false);
  //     await POST_SEND_EMAIL();
  //     toast.success("OTP Send Successfully");
  //   } catch (err: any) {
  //     // toast.error(err.response.data.message);
  //     handleError(err);
  //   } finally {
  //     setshowEmail(true);
  //   }
  // };

  let isEditableButton: boolean = false;
  if (!isEditEmail) {
    isEditableButton = userData.isEmailVerified;
  } else {
    // if (!userData.isEmailVerified) {
    //   isEditableButton = true;
    // } else {
    isEditableButton = emailValidation !== 200;
    // }
  }

  const handleWalletConnection = (type: string) => {
    if (isMobileDevice()) {
      setShowWalletConnectionIntro(type);
    } else {
      openConnectionModal(type);
    }
  };
  const openConnectionModal = async (type: string) => {
    if (type === "blade") {
      // if(window?.bladeConnect){
      //   setBladeSelectModal(true);
      // }else{
      //   initBlade();
      // }
      initBlade();
    } else {
      pairHashpack();
    }
    setShowWalletConnectionIntro(null);
  };

  const steps = [
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

  return (
    <div className="flex justify-center items-center h-100vh w-full">
      <Card pseudoElement="secondary">
        <button
          onClick={() => onClose()}
          className="cursor-pointer absolute top-2 right-2"
        >
          <CancleIcon />
        </button>
        <div className={` ${isLoading ? "h-[40vh]" : "h-[56vh] "} `}>
          {isLoading ? <Loader /> :
            <>
              <div className=" flex flex-col gap-3 justify-center items-center ">
                <Typography
                  isIcon={false}
                  variant="h2"
                  className="text-text-primary cursor-default"
                >
                  EDIT PROFILE
                </Typography>
                <SmallLine />
                <form onSubmit={formik.handleSubmit}>
                  <div className="flex flex-col gap-3 justify-center items-center ">
                    <div className="flex flex-row gap-4 items-start justify-between w-[90%]">
                      <Typography isIcon={false} variant="customp" className="cursor-default">
                        AVATAR
                      </Typography>
                      <div className="w-16 h-16 p-[3px] border border-dashed rounded-full border-primary">
                        <img
                          src={!formik?.value?.avatar ? `${user?.avatar}?${Date.now() + "astra"}` : `${formik?.value?.avatar}?${Date.now() + "astra"}`}
                          loading={'lazy'}
                          alt="avatar"
                          className="h-full w-full object-cover rounded-full"
                        />
                      </div>
                      <Typography
                        isIcon={false}
                        className="text-[10px] text-text-light !cursor-pointer hover:text-text-secondary"
                        onClick={() => {
                          if(userData?.WalletsType?.EVM){
                            getAvatar();
                          }
                          setShowaAvatar(true);
                        }}
                      >
                        EDIT
                      </Typography>
                    </div>
                    <SmallLine />
                    <div className="float-start w-[90%] ">
                      <Typography isIcon={false} variant="customp" className="cursor-default">
                        Username
                      </Typography>
                    </div>
                    <div className="flex flex-row justify-between w-[90%] gap-2">
                      {!isEditUserName && (
                        <Typography isIcon={false} variant="p" font="semiBold">
                          {formik.values.username}
                        </Typography>
                      )}
                      {isEditUserName && (
                        <div className="w-full relative ">
                          <Textfield
                            placeHolder=" Username"
                            name="username"
                            value={formik.values.username}
                            onChange={(e: any) => {
                              formik.handleChange(e);
                              handleUserValidation(e.target.value);
                            }}
                            onBlur={formik.handleBlur}
                            className={`${formik.touched.username && formik.errors.username
                              ? "!border-red-600"
                              : "border-none"
                              }`}
                          // disabled={updateProfileRes.status === "resolved"}
                          />
                          <div className="absolute top-0 right-2 bottom-0 flex justify-center items-center text-light-gray-200">
                            {userNameValidation &&
                              userNameValidation === 200 &&
                              !formik.errors.username ? (
                              <RightLogo />
                            ) : (
                              ""
                            )}
                          </div>
                          {formik.touched.username && formik.errors.username && (
                            <Typography
                              isIcon={false}
                              variant="p"
                              font="regular"
                              className="!text-red-600"
                            >
                              {formik.errors.username}
                            </Typography>
                          )}
                        </div>
                      )}
                      {!isEditUserName && (
                        <Typography
                          isIcon={false}
                          className="text-[10px] text-text-light cursor-pointer hover:text-text-secondary"
                          onClick={handleEditUserName}
                        >
                          EDIT
                        </Typography>
                      )}
                    </div>
                    <SmallLine />
                    {userData && userData.accountType.includes("TELEGRAM") ? (
                      <Typography
                        isIcon={false}
                        variant="p"
                        className="!text-text-primary"
                      >
                        Telegram Verified
                      </Typography>
                    ) : (
                      <TelegramLoginButton
                        botName={config.TELEGRAM_BOT || "AstraNovaBlackPassBot"}
                        dataOnauth={handleTelegramAuth}
                        usePic={true}
                        className="custom-class"
                        cornerRadius={5}
                        requestAccess={true}
                        buttonSize="large"
                      // dataAuthUrl={`${SITE_URL}profile`}
                      />
                    )}
                    <div className="py-1">
                      <SmallLine />
                    </div>
                    {/*  */}
                    {/* <div className="float-start w-[90%]">
                  <Typography isIcon={false} variant="customp">
                    Your Faction
                  </Typography>
                </div>
                <div className="flex flex-row justify-between w-[90%] gap-2">
                  {!isEditFaction && (
                    <Typography isIcon={false} variant="p" font="semiBold">
                      {formik.values.factions}
                    </Typography>
                  )}
                  {isEditFaction && (
                    <div className="flex gap-5 m-auto">
                      {factions.map((faction) => (
                        <div
                          key={faction.type}
                          className="flex flex-col items-center gap-[21px] cursor-pointer"
                          onClick={() => handleFraction(faction.type)}
                        >
                          <div
                            className={`w-[40px] h-[40px] flex items-center justify-center ${
                              faction.type === formik.values.factions &&
                              // fraction === faction.type  &&
                              "border-[0.54px] border-green-300 rounded-full bg-img bg-[#141414]"
                            }`}
                          >
                            <img
                              src={faction.image}
                              alt={faction.type}
                              className="w-[44px] h-[44px]"
                            />
                          </div>
                          <p
                            className={`${
                              faction.type === formik.values.factions
                                ? "text-text-secondary "
                                : "text-text-primary"
                            } font-bold text-[8px]`}
                          >
                            {faction.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {!isEditFaction && (
                    <Typography
                      isIcon={false}
                      className="text-[10px] text-text-light cursor-pointer"
                      onClick={handleEditFaction}
                    >
                      EDIT
                    </Typography>
                  )}
                </div>
                <SmallLine /> */}
                    {/*  */}

                    {/* <div className="float-start w-[90%]"> */}
                    <div
                      className={`${wallkey.includes("HEDERA") &&
                        !wallkey.includes("BLADE_WALLET")
                        ? "hidden "
                        : " w-[90%] "
                        }`}
                    >
                      <div
                        className={`float-start w-[90%] pb-2 ${wallkey.includes("HEDERA") &&
                          !wallkey.includes("BLADE_WALLET")
                          ? "hidden "
                          : ""
                          }`}
                      >
                        <Typography isIcon={false} variant="customp" className="cursor-default">
                          Hedera Blade Wallet
                        </Typography>
                      </div>
                      <div className="flex flex-row justify-between w-[100%] gap-2">
                        <Typography
                          isIcon={false}
                          variant="p"
                          font="semiBold"
                          className="uppercase"
                        >
                          {wallkey.includes("BLADE_WALLET")
                            ? userData.WalletsType["BLADE_WALLET"]
                            : "no wallet connected"}
                        </Typography>

                        {/* <Typography
                      isIcon={false}
                      className="text-[10px] text-text-light cursor-pointer"
                      onClick={initBlade}
                    >
                      {wallkey.includes("BLADE_WALLET")
                        ? ""
                        : "Connect"}
                    </Typography> */}
                        <Typography
                          isIcon={false}
                          className="text-[10px] text-text-light cursor-pointer hover:text-text-secondary"
                          //  ${
                          //   wallkey.includes("HEDERA") &&
                          //   !wallkey.includes("BLADE_WALLET")
                          //     ? "opacity-50 pointer-events-none "
                          //     : ""
                          // }`}
                          // onClick={initBlade}
                          // onClick={() => handleWalletConnection("blade")}
                          onClick={() => {
                            if (wallkey.includes("BLADE_WALLET")) {
                              handleWalletConnection("blade");
                              setIsEditBlade(true);
                            } else {
                              handleWalletConnection("blade");
                            }
                          }}
                        >
                          {wallkey.includes("BLADE_WALLET") ? "EDIT" : "Connect"}
                        </Typography>
                      </div>
                    </div>
                    <div
                      className={` ${wallkey.includes("HEDERA") &&
                        !wallkey.includes("BLADE_WALLET")
                        ? "hidden "
                        : ""
                        }`}
                    >
                      <SmallLine />
                    </div>

                    {/* <div
                  className={`${
                    wallkey.includes("BLADE_WALLET") &&
                    !wallkey.includes("HEDERA")
                      ? "hidden "
                      : "w-[90%]"
                  }`}
                >
                  <div
                    className={`float-start w-[90%] pb-2 ${
                      wallkey.includes("BLADE_WALLET") &&
                      !wallkey.includes("HEDERA")
                        ? "hidden "
                        : ""
                    }`}
                  >
                    <Typography isIcon={false} variant="customp">
                      Hedera Hashpack Wallet
                    </Typography>
                  </div>
                  <div className="flex flex-row justify-between w-[90%] gap-2">
                    <Typography
                      isIcon={false}
                      variant="p"
                      font="semiBold"
                      className="uppercase"
                    >
                      {wallkey.includes("HEDERA")
                        ? userData.WalletsType["HEDERA"]
                        : "no wallet connected"}
                    </Typography>

                    <Typography
                      isIcon={false}
                      className="text-[10px] text-text-light cursor-pointer "
                      onClick={() => handleWalletConnection("hashpack")}
                    >
                      {wallkey.includes("HEDERA") ? "" : "Connect"}
                    </Typography>
                  </div>
                </div> */}
                    {/* <div
                  className={` ${
                    wallkey.includes("BLADE_WALLET") &&
                    !wallkey.includes("HEDERA")
                      ? "hidden "
                      : ""
                  }`}
                >
                  <SmallLine />
                </div> */}
                    <div className="flex gap-3">
                      <div className="group">
                        <Button
                          type="submit"
                          CLASSNAME={` ${userNameValidation === 409
                            ? true
                            : false ||
                              ((userData.user_name === formik.values.username ||
                                userNameValidation === 409
                                ? true
                                : false) &&
                                userData.avatar === formik.values.avatar)
                              ? ""
                              : "px-3 text-text-primary group-hover:text-text-secondary mobile:px-2"
                            }`}
                          color="white"
                          isBorderLabel="SAVE CHANGES"
                          isBorder={true}
                          bgColor
                          disable={
                            userNameValidation === 409
                              ? true
                              : false ||
                              ((userData.user_name === formik.values.username ||
                                userNameValidation === 409
                                ? true
                                : false) &&
                                // userData.Factions?.factions_type ===
                                //   formik.values.factions &&
                                userData.avatar === formik.values.avatar)
                          }
                        />
                      </div>
                      <div className="group">
                        <Button
                          type="submit"
                          CLASSNAME="px-3 text-text-primary group-hover:text-text-secondary mobile:px-2"
                          color="white"
                          onClick={() => onClose()}
                          isBorderLabel="BACK TO DASHBOARD"
                          isBorder={true}
                          bgColor
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="flex flex-col gap-3 justify-center items-center my-5">
                {/* <div className="w-[80%]">
              <Link to={`${API_ROUTES.PROFILE_VERIFY_DISCORD}`}>
                <Button
                  disable={userData && userData.accountType.includes("DISCORD")}
                  className="mobile:tracking-tight w-full"
                  label="Verify your account with Discord"
                  size="large"
                  color="secondary"
                />
              </Link>
            </div> */}
                <div
                  className={`  ${wallkey.includes("HEDERA") && !wallkey.includes("BLADE_WALLET")
                    ? "hidden "
                    : ""
                    }`}
                >
                  <SmallLine />
                </div>
                {/* {!userData?.isEmailVerified && (
              <div className="w-[80%]">
                <Button
                  className=" mobile:tracking-tight w-full"
                  disable={
                    (userData && (userData.isEmailVerified ?? false)) ||
                    showEmail === true
                      ? true
                      : false
                  }
                  // loading={showEmail === false ? true : false}
                  label="Verify your account with Email OTP"
                  color="third"
                  onClick={() => {
                    SendVerifyEMail();
                    setShowEmailModal(true);
                  }} */}
                {/* /> */}

                {/* {showEmail && (
                <>
                  <form onSubmit={formik.handleSubmit}>
                    <div className="py-2 grid place-content-center">
                      <SmallLine />
                    </div>
                   <div className="w-full">
                        <Textfield
                          placeHolder="Enter OTP:"
                          name="otp"
                          value={otpValue}
                          onChange={(e: any) => {
                            formik.handleChange(e);
                            setOtpValue(e.target.value);
                          }}
                          onBlur={formik.handleBlur}
                          className={`${
                            formik.touched.otp && formik.errors.otp
                              ? "!border-red-600"
                              : "border-none"
                          }`}
                        />
                        {formik.touched.otp && formik.errors.otp ? (
                          <div className="text-red-500">
                            {formik.errors.otp}
                          </div>
                        ) : null}
                     
                    </div>
                    <div className="py-2 grid place-content-center">
                      <SmallLine />
                    </div>
                    <div className="flex justify-around items-center  w-full">
                      <Button
                        color="white"
                        isBorder={true}
                        isBorderLabel="resend"
                        type="button"
                        onClick={() => SendVerifyEMail(true)}
                        CLASSNAME="pr-5"
                      ></Button>

                      <Button
                        type="submit"
                        isBorderLabel="verify email"
                        color="white"
                        isBorder={true}
                        CLASSNAME="pr-2"
                        // onClick={() => VerifyEmail()}
                        // onClick={formik.handleSubmit}
                      ></Button>
                    </div>
                  </form>
                </>
              )} */}
                {/* </div>
            )} */}
              </div>
              {/* email field */}
              {/* {userData?.isEmailVerified && ( */}
              <div className="flex flex-col gap-3 justify-center items-center ">
                <form
                  onSubmit={formikEmail.handleSubmit}
                  className="flex flex-col justify-center items-center"
                >
                  <Typography
                    isIcon={false}
                    variant="h4"
                    className="text-text-primary cursor-default"
                  >
                    Email Verification
                  </Typography>
                  <div className="float-start w-[85%]">
                    <Typography isIcon={false} variant="customp" className="cursor-default">
                      Email
                    </Typography>
                  </div>
                  <div className="flex flex-row justify-between gap-2 w-[85%]">
                    {!isEditEmail && (
                      <Typography isIcon={false} variant="p" font="semiBold">
                        {formikEmail.values.email}
                      </Typography>
                    )}
                    {isEditEmail && (
                      <div className="w-full relative">
                        <Textfield
                          placeHolder="Enter your email address"
                          name="email"
                          value={formikEmail.values.email}
                          onChange={(e: any) => {
                            formikEmail.handleChange(e);
                            checkEmail(e.target.value);
                            // if (userData.email !== e.target.value) {
                            //   setshowEmailVeification(null);
                            if (hideOtp) setHide(false);
                            // } else {
                            setshowEmailVeification(false);
                            // }
                          }}
                          onBlur={formikEmail.handleBlur}
                          className={` ${formikEmail.touched.email && formikEmail.errors.email
                            ? "!border-red-600"
                            : "border-none"
                            }`}
                        />
                        <div className="absolute top-0 right-2 bottom-0 flex justify-center items-center text-light-gray-200">
                          {emailValidation &&
                            emailValidation === 200 &&
                            !formikEmail.errors.email ? (
                            <RightLogo />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    )}
                    {formikEmail.touched.email && formikEmail.errors.email && (
                      <Typography
                        isIcon={false}
                        variant="p"
                        font="regular"
                        className="!text-red-600"
                      >
                        {formikEmail.errors.email}
                      </Typography>
                    )}

                    {!isEditEmail && (
                      <Typography
                        isIcon={false}
                        className="text-[10px] text-text-light cursor-pointer hover:text-text-secondary"
                        onClick={handleEditEmail}
                      >
                        EDIT
                      </Typography>
                    )}
                    {isEditEmail && (
                      <Typography
                        isIcon={false}
                        className="text-[10px] text-text-light cursor-pointer hover:text-text-secondary"
                        onClick={closeEditEmail}
                      >
                        Cancel
                      </Typography>
                    )}
                  </div>
                  <div className="my-3">
                    <SmallLine />
                  </div>
                  {
                    <>
                      {/* {isEditEmail && (
                      <> */}
                      <div className="my-2 group" ref={emailScrollRef}>
                        <Button
                          type="submit"
                          CLASSNAME={` ${isEditableButton || showEmailVeification === true
                            ? ""
                            : "px-3 text-text-primary group-hover:text-text-secondary mobile:px-2"
                            }`}
                          color="white"
                          isBorderLabel="Send Otp"
                          isBorder={true}
                          disable={
                            isEditableButton || showEmailVeification === true
                          }
                        />
                      </div>
                      <SmallLine />
                      {/* </>
                    )} */}
                    </>
                  }
                </form>
                {/*  */}

                {/* {userData.email !== formikEmail.values.email && */}
                {showEmailVeification && (
                  <form
                    onSubmit={Otpformik.handleSubmit}
                    className="flex flex-col w-[90%]"
                  >
                    <div className="flex flex-row justify-between items-center gap-3">
                      <div className=" w-full ">
                        <Textfield
                          placeHolder=" Enter OTP"
                          name="otp"
                          // value={otpValue}
                          onChange={(e: any) => {
                            Otpformik.handleChange(e);
                            setOtpValue(e.target.value);
                          }}
                          onBlur={Otpformik.handleBlur}
                        // disabled={updateProfileRes.status === "resolved"}
                        />

                        {Otpformik.touched.otp && Otpformik.errors.otp ? (
                          <Typography
                            isIcon={false}
                            variant="p"
                            font="regular"
                            className="!text-red-600"
                          >
                            {Otpformik.errors.otp}
                          </Typography>
                        ) : null}
                      </div>

                      <Typography
                        isIcon={false}
                        className="text-[10px] text-text-light cursor-pointer"
                        onClick={handleEditUserName}
                      >
                        <button
                          onClick={(e: any) => {
                            e.stopPropagation();
                            SendEMail(false);
                          }}
                          type="button"
                        >
                          resend OTP
                        </button>
                      </Typography>
                    </div>
                    <div className="py-2 group grid place-content-center">
                      <SmallLine />
                    </div>
                    <div className="my-2 group grid place-content-center">
                      <Button
                        type="submit"
                        CLASSNAME="px-2 text-text-primary w-[100px] group-hover:text-text-secondary mobile:px-2"
                        color="white"
                        isBorderLabel="Verify Email"
                        isBorder={true}
                      />
                    </div>
                  </form>
                )}

                {/*  */}
              </div>
              {/* )} */}
            </>}
        </div>
      </Card>
      {showAvatar && (
        <AvatarPopup
          avatars={avatar}
          onSelectAvatar={handleSelectAvatar}
          setShowaAvatar={setShowaAvatar}
          getUserDetails={getUserDetails}

        />
      )}
      {/* {showEmailModal && (
        <VerifyEmailPopup
          handleSendEMail={SendVerifyEMail}
          setshowEmailVeification={setshowEmail}
          setShowEmailModal={setShowEmailModal}
        />
      )} */}
      {ShowWalletConnectionIntro && (
        <Modal blurImg={true} style={{ zIndex: 50 }}>
          <Card pseudoElement="secondary" className="!px-5">
            <button
              onClick={() => setShowWalletConnectionIntro(!ShowWalletConnectionIntro)}
              className="cursor-pointer absolute top-2 right-2"
            >
              <CancleIcon />
            </button>
            <div className="max-h-[56vh] mt-2 text-[14px] text-text-light">
              <div className="text-white text-base mb-2">
                Follow Below Steps:
              </div>
              <ol className="flex flex-col gap-3">
                {steps.map((step, index) => (
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
                className="w-[90%] mx-auto"
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

      {bladeSelectModal &&
        <BladeWalletModal
          onClosePopUp={() => setBladeSelectModal(false)}
          onConnect={initBlade}
        />
      }
    </div>
  );
};