import { Images } from "assets/Images";
import { Button } from "components/Atoms/Button/Button";
import { Card } from "components/Atoms/Card/Card";
import { Typography } from "components/Atoms/Typography/Typography";
import { HeroSection } from "components/Molecules/HeroSection";
import { ClaimBlackPass } from "components/Molecules/PopUp/ClaimBlackPass";
import { VerifyEmailPopup } from "components/Molecules/PopUp/VerifyEmailPopup";
import { API_ROUTES } from "constants/API_ROUTES";
import { contractMint } from "constants/NFTContract";
import { useUser } from "context/userContext";
import { useCustomError } from "hooks/accessTokenExpire";
import { useGetUserDetails } from "hooks/usegetUserDetails";
import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  GET_OWNER_SIGNATURE,
  GET_USER_DETAILS,
  POST_BLOCKCHAIN_TRANSACTION,
  POST_DISCORD_VERIFY,
  POST_SEND_EMAIL,
  POST_TWITTER_VERIFY,
  POST_VERIFY_CAPTCHA,
} from "services/apiService";
import { useAccount, useWriteContract } from "wagmi";
import nftAbi from "../../assets/nft-contract-data/nft-abi.json";
import * as config from "constants/config";
import { ethers } from "ethers";
import { GIFS } from "assets/gifs";
import { delay } from "constants/utils";

export const Verify = () => {
  const [loading, setLoading] = useState(false);
  const [getSigner, setGetSigner] = useState<any>();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [claimButtonVisible, setClaimButtonVisible] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showEmailVeification, setshowEmailVeification] = useState<
    boolean | null
  >(null);

  const { isConnected } = useAccount();
  const { updateUser }: any = useUser();
  const { writeContractAsync } = useWriteContract();
  const { handleError } = useCustomError();

  const { userData, setUserData, setIsRender, getUserDetails } =
    useGetUserDetails();

  const navigate = useNavigate();

  const SendEMail = async (isResendButton?: boolean) => {
    try {
      if (!isResendButton) setshowEmailVeification(false);
      await POST_SEND_EMAIL();
      toast.success("OTP Send Successfully");
    } catch (err: any) {
      // toast.error(err.response.data.message);
      handleError(err);
    } finally {
      setshowEmailVeification(true);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };
  // Using getUserSignature to obtain the signature and pass it to the safeMint contract function
  const getUserSignature = async () => {
    try {
      setLoading(true);
      const response = await GET_OWNER_SIGNATURE();
      setGetSigner(response?.data?.signature);
      return response?.data?.success;
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      // console.log("error::::::::::", error.response.data["message"]);
      // toast.error(error.response.data["message"]);
      handleError(error);
    }
  };

  const postBlockChainTransaction = async (result: string, toastId: any) => {
    try {
      const response = await POST_BLOCKCHAIN_TRANSACTION(result);

      const checkMintStatus = async () => {
        const res: any = await GET_USER_DETAILS();
        if (res?.data?.is_minted) {
          toast.dismiss(toastId);
          setShowSuccessModal(true);
          setLoading(false);
          updateUser(res.data);
        } else {
          setTimeout(checkMintStatus, 800);
        }
      };

      checkMintStatus();
    } catch (error: any) {
      handleError(error);
    }
  };

  // handleMint is used to mint the NFT and call the contractMint function for contract instance
  const handleMint = async () => {
    const toastId = toast.loading("Minting NFT...");
    let contract, signer;
    try {
      let ownerSignature = await getUserSignature();
      setLoading(true);
      await delay(5000);
      // contract = await contractMint();
      // let nft = await contract.safeMint(ownerSignature);
      // const receipt = await nft.wait(); // Wait for the transaction to be mined
      // console.log('receipt',receipt);

      // let result = await writeContractAsync({
      //   abi: nftAbi.abi,
      //   address: CONTRACT_ADDRESS,
      //   functionName: "safeMint",
      //   args: [ownerSignature],
      // });
      // console.log("result", result);

      // const PROVIDER_URL = "https://rpc.testnet.immutable.com";
      // const provider = new ethers.JsonRpcProvider(PROVIDER_URL);
      // await provider.waitForTransaction(result);
      // const check = await provider.waitForTransaction(result, 5);
      // console.log('check',check);
      // await postBlockChainTransaction(result, toastId);
      const pollUserDetails = async () => {
        const res = await GET_USER_DETAILS();
        if (res?.data?.is_minted) {
          toast.dismiss(toastId);
          setShowSuccessModal(true);
          setLoading(false);
          updateUser(res.data);
        } else {
          setTimeout(pollUserDetails, 2000);
        }
      };
      if (ownerSignature) {
        pollUserDetails(); // Start polling
      }
    } catch (error: any) {
      // console.log(error, "mint");
      setLoading(false);
      toast.error(error?.reason || error?.shortMessage || "Error in minting");
      handleError(error);
    } finally {
      toast.dismiss(toastId);
      // console.log("toast dismiss");
    }
  };

  // handleCheckWallet checks the wallect connect or not before mint NFT.
  const handleCheckWallet = async () => {
    getUserDetails();
    if (isConnected && !userData.isMinted) {
      await handleMint();
    }
    // else if (isConnected && userData.isMinted) {
    //   await sleep(2000);
    //   navigate("/fraction");
    // }
    else {
      toast.error("Please Connect your wallet");
    }
  };

  const search = useLocation().search;

  const tokens = new URLSearchParams(search).get("twitterToken");
  const twitterUsername = new URLSearchParams(search).get("twitterUsername");

  const discordToken = new URLSearchParams(search).get("discordToken");
  const discordUsername = new URLSearchParams(search).get("discordUsername");

  const verifyTwitterToken = async (tokens: any, username: string | null) => {
    try {
      await POST_TWITTER_VERIFY(tokens, username);
      setUserData({
        ...userData,
        accountType: [...userData.accountType, "TWIITER"],
      });
      toast.success("Twitter Verified");
    } catch (err: any) {
      // toast.error(err.response.data.message);
      handleError(err);
    }
  };

  useEffect(() => {
    if (tokens) {
      verifyTwitterToken(tokens, twitterUsername);
      // navigate(`?${""}`, {
      //   replace: true,
      // });
      // navigate(`?${""}`);
      // setIsRender((prev) => !prev);
    }
  }, [tokens]);

  const verifyDiscortToken = async (discordToken: any, username: string | null) => {
    try {
      await POST_DISCORD_VERIFY(discordToken, username);
      setUserData({
        ...userData,
        accountType: [...userData.accountType, "DISCORD"],
      });
      toast.success("Discord Verified");
    } catch (err: any) {
      // toast.error(err.response.data.message);
      handleError(err);
    }
  };

  useEffect(() => {
    if (discordToken) {
      verifyDiscortToken(discordToken, discordUsername);
      // navigate(`?${""}`, {
      //   replace: true,
      // });
      // navigate(`?${""}`);
      // setIsRender((prev) => !prev);
    }
  }, [discordToken]);

  const recaptchaRef = useRef<any>(null);

  const verifyCaptcha = async (value: string) => {
    try {
      const res = await POST_VERIFY_CAPTCHA({ recaptcha_response: value });
      if (res.data.success === true) {
        setClaimButtonVisible(true);
      }
    } catch (err: any) {
      // toast.error(err.response.data.message);
      handleError(err);
    }
  };

  const handleRecaptchaChange = (value: string | null) => {
    if (value) {
      verifyCaptcha(value);
    }
  };

  const handleRecaptchaExpired = () => {
    recaptchaRef.current.reset();
  };

  // useEffect(() => {
  // if(user && user.is_minted){
  //   navigate("/fraction")
  // }
  // },[user])

  return (
    <div>
      {!showSuccessModal && !showEmailModal && (
        <HeroSection bgSrc={Images.BG}>
          <Card
            pseudoElement="default"
            className="!py-3 !h-[550px]  mobile:!w-[315px] mobile:!h-[450px] !px-0"
          >
            <div className="flex justify-center items-center text-center">
              <Typography
                variant="h3"
                isIcon={false}
                className="text-text-primary mobile:text-xl mobile:leading-[32px] mobile:tracking-tight "
              >
                VERIFY YOUR ACCOUNT
              </Typography>
            </div>
            <div className="py-3 mobile:py-2">
              <img src={Images.LINE} alt="line" />
            </div>
            <div className="flex flex-col justify-center items-center gap-3 mobile:gap-2">
              <div className="flex flex-col sm:flex-row items-center justify-center w-full gap-y-2">
                <Typography
                  variant="h3"
                  isIcon={false}
                  className="text-text-primary !text-sm mobile:text-xl mobile:leading-[32px] mobile:tracking-tight"
                  pclassName="px-5 sm:px-2"
                >
                  Step 1 :
                </Typography>
                <Link
                  to={`${API_ROUTES.TWITTER_VERIFICATION}`}
                  className="mx-auto"
                >
                  <Button
                    className=" mobile:tracking-tight w-[353px] mobile:w-[200px]"
                    disable={
                      userData &&
                      userData.accountType &&
                      userData.accountType.includes("TWIITER")
                    }
                    label="Verify your account with X"
                  />
                </Link>
              </div>
              {/* <Link to={`${API_ROUTES.DISCORD_VERIFICATION}`}>
                <Button
                  disable={userData && userData.accountType.includes("DISCORD")}
                  className=" mobile:tracking-tight w-full"
                  label="Verify your account with Discord"
                  
                  color="secondary"
                />
              </Link>
              <Button
                className=" mobile:tracking-tight"
                disable={
                  (userData && (userData.isEmailVerified ?? false))
                   ||
                  showEmailVeification === true
                    ? true
                    : false
                }
                // loading={showEmailVeification === false ? true : false}
                label="Verify your account with Email OTP"
                
                color="third"
                onClick={() =>{ 
                  SendEMail()
                  setShowEmailModal(true)
                }}
              /> */}
              {/* {showEmailVeification && (
                <>
                  <form onSubmit={formik.handleSubmit}>
                    <div className=" space-x-4 text-white flex justify-center items-center">
                      <label htmlFor="otp">Enter OTP:</label>
                      <div className="flex flex-col gap-1">
                        <input
                          type="text"
                          id="otp"
                          name="otp"
                          className="text-black"
                          value={otpValue}
                          onChange={(e: any) => {
                            formik.handleChange(e);
                            setOtpValue(e.target.value);
                          }}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.otp && formik.errors.otp ? (
                          <div className="text-red-500">
                            {formik.errors.otp}
                          </div>
                        ) : null}
                      </div>

                      <Button
                        type="button"
                        onClick={() => SendEMail(true)}
                        label="resend"
                      ></Button>
                    </div>

                    <Button
                      type="submit"
                      label="verify email"
                      color="default"
                      // onClick={() => VerifyEmail()}
                      // onClick={formik.handleSubmit}
                    ></Button>
                  </form>
                </>
              )} */}
              <div className="flex flex-col sm:flex-row items-center justify-center w-full gap-y-2">
                <Typography
                  variant="h3"
                  isIcon={false}
                  className="text-text-primary !text-sm mobile:text-xl mobile:leading-[32px] mobile:tracking-tight "
                  pclassName="px-5 sm:px-2"
                >
                  Step 2 :
                </Typography>
                <div className="sm:hidden max-w-[160px] !mx-auto">
                  <ReCAPTCHA
                    onExpired={handleRecaptchaExpired}
                    onChange={handleRecaptchaChange}
                    sitekey={config.REACT_APP_RECAPTCHA_KEY as string}
                    theme="dark"
                    size="compact"
                  />
                </div>

                <div className="hidden sm:block !mx-auto">
                  <ReCAPTCHA
                    onExpired={handleRecaptchaExpired}
                    onChange={handleRecaptchaChange}
                    sitekey={config.REACT_APP_RECAPTCHA_KEY as string}
                    theme="dark"
                    size="normal"
                  />
                </div>
              </div>

              <div className=" h-full flex flex-col sm:flex-row justify-center items-center w-full gap-y-2 ">
              <Typography
                variant="h3"
                isIcon={false}
                className="text-text-primary !text-sm mobile:text-xl mobile:leading-[32px] mobile:tracking-tight "  
                pclassName="px-5 sm:px-2 invisible"             
              >
              step 3 :
              </Typography>
                <img
                  src={GIFS.ASTRO_GIF}
                  alt="ASTRO_GIF"
                  className="max-w-[250px] mx-auto w-full object-contain flex-shrink-0"
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-center items-center w-full gap-y-2 ">
              <Typography
                variant="h3"
                isIcon={false}
                className="text-text-primary !text-sm mobile:text-xl mobile:leading-[32px] mobile:tracking-tight "  
                pclassName="px-5 sm:px-2"             
              >
                Step 3 :
              </Typography>
                <Button
                  size="extraSmall"
                  bgColor={true}
                  className="flex-0 mx-auto"
                  CLASSNAME="pr-2 text-text-primary group-hover:text-text-secondary "
                  type="submit"
                  color="white"
                  isBorderLabel="Claim Black Pass"
                  isBorder={true}
                  isBorderLoading={loading}
                  disable={
                    (userData &&
                      (!userData.accountType.includes("TWIITER") ||
                        !claimButtonVisible)) ||
                    loading
                  }
                  onClick={handleCheckWallet}
                />
              </div>
            </div>
          </Card>
        </HeroSection>
      )}
      {/* {showSuccessModal && <ClaimBlackPass />} */}
      {showEmailModal && (
        <VerifyEmailPopup
          handleSendEMail={SendEMail}
          setshowEmailVeification={setshowEmailVeification}
          setShowEmailModal={setShowEmailModal}
        />
      )}
    </div>
  );
};
