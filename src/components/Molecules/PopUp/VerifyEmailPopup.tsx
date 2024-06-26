import React, { useState } from "react";
import { HeroSection } from "../HeroSection";
import { Images } from "assets/Images";
import { Card } from "components/Atoms/Card/Card";
import { Typography } from "components/Atoms/Typography/Typography";
import { Line } from "assets";
import { useFormik } from "formik";
import * as Yup from "yup";
import { POST_SEND_EMAIL, PUT_VERIFY_EMAIL } from "services/apiService";
import { toast } from "react-toastify";
import { Textfield } from "components/Atoms/Textfield/Textfield";
import { Button } from "components/Atoms/Button/Button";
import { useCustomError } from "hooks/accessTokenExpire";
import { Modal } from "../Modal";
import { useGetUserDetails } from "hooks/usegetUserDetails";

interface VerifyEmailPopupProps {
  handleSendEMail: (isResendButton?: boolean) => void;
  setshowEmailVeification: React.Dispatch<React.SetStateAction<boolean | null>>;
  setShowEmailModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const VerifyEmailPopup = ({
  handleSendEMail,
  setshowEmailVeification,
  setShowEmailModal,
}: VerifyEmailPopupProps) => {
  const [otpValue, setOtpValue] = useState("");
  const { handleError } = useCustomError();
  const {
    getUserDetails
  } = useGetUserDetails()

  const validationSchema = Yup.object().shape({
    otp: Yup.string()
      .required("OTP is required")
      .matches(/^[0-9]{6}$/, "OTP must be a 6-digit number"),
  });

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema,
    onSubmit: (values) => {
      VerifyEmail();
    },
  });

  const VerifyEmail = async () => {
    try {
      const res = await PUT_VERIFY_EMAIL({ otp: parseInt(otpValue) });
      setshowEmailVeification(null);
      //   setIsRender((prev) => !prev);
      toast.success("Email Verified");
      if (res.data?.success) {
        setShowEmailModal(false);
        getUserDetails()
      }
    } catch (err: any) {
      // toast.error(err.response.data.message);
      handleError(err);
    }
  };

  return (
    // <HeroSection bgSrc={Images.BG} className="h-100vh">
    // <Card pseudoElement="default" className="w-[630px] h-[534px] ">
    <Modal blurImg>
      <Card pseudoElement="default">
        <div className="flex flex-col justify-center items-center">
          <Typography
            variant="h2"
            isIcon={false}
            className="pt-3 text-text-primary mobile:text-xl mobile:leading-[32px] mobile:tracking-tight"
          >
            EMAIL VERIFICATION
          </Typography>
          <div className="my-6 mobile:my-2">
             <img src={Images.LINE} alt="line" />
            </div>
          <Typography variant="p" font="regular" isIcon={false}>
            Almost there! We've sent an OTP code to your email. Please check{" "}
            <br /> your inbox and enter the code here to complete your
            registration.
          </Typography>

          <div className="w-4/5 my-8 mobile:my-4">
            <form onSubmit={formik.handleSubmit}>
              <Typography
                isIcon={true}
                variant="p"
                font="regular"
                className="my-2"
              >
                OTP Code
              </Typography>
              <Textfield
                placeHolder="OTP Code"
                name="otp"
                value={otpValue}
                onChange={(e: any) => {
                  formik.handleChange(e);
                  setOtpValue(e.target.value);
                }}
                onBlur={formik.handleBlur}
              />
              {formik.touched.otp && formik.errors.otp ? (
                <div className="text-red-500">{formik.errors.otp}</div>
              ) : null}
              <div className="my-5">
                <Typography isIcon={false} variant="customp" font="regular">
                  Didn’t received the code ?{" "}
                  <button type="button">
                    {" "}
                    <span
                      className="text-text-secondary underline cursor-pointer"
                      onClick={() => {
                        handleSendEMail(true);
                      }}
                    >
                      Resend OTP
                    </span>
                  </button>
                </Typography>
              </div>
              <div className="flex justify-around w-full mobile:flex-col mobile:gap-1">
                <div className="mt-8 group flex justify-center items-center mobile:mt-5">
                  <Button
                    color="white"
                    isBorder={true}
                    isBorderLabel="VERIFY ACCOUNT"
                    CLASSNAME="pr-5 text-text-primary group-hover:text-text-secondary"
                    type="submit"
                    // onClick={()=>setShowEmailModal(false)}
                  />
                </div>
                <div className="mt-8 group flex justify-center items-center mobile:mt-2">
                  <Button
                    color="white"
                    isBorder={true}
                    isBorderLabel="GO BACK"
                    CLASSNAME="pl-6 pr-10 text-text-primary group-hover:text-text-secondary"
                    type="submit"
                    onClick={() => setShowEmailModal(false)}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </Card>
    </Modal>

    // </HeroSection>
  );
};
