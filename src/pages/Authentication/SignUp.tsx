import { Line, RightLogo, WrongLogo } from "assets";
import { Images } from "assets/Images";
import { Button } from "components/Atoms/Button/Button";
import { Card } from "components/Atoms/Card/Card";
import { CircleButton } from "components/Atoms/CircleButton/CircleButton";
import { Textfield } from "components/Atoms/Textfield/Textfield";
import { Typography } from "components/Atoms/Typography/Typography";
import { DropdownSelect } from "components/Molecules/Dropdown/Dropdown";
import { HeroSection } from "components/Molecules/HeroSection";
import { getSigner } from "constants/NFTContract";
import { serialize } from "constants/utils";
import { useUser } from "context/userContext";
import { useFormik } from "formik";
import { useCustomError } from "hooks/accessTokenExpire";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  GET_AVATAR_LIST,
  GET_EMAIL_VALIDATION,
  GET_USER_VALIDATION,
  GET_VALID_REFERRAL,
  POST_AUTH_SIGNUP,
} from "services/apiService";
import { useAccount } from "wagmi";
import * as Yup from "yup";
import { useSignupDetails } from "hooks/useSignupDetails";
import { Loader } from "components/Loader";

const validationSchema = Yup.object({
  username: Yup.string()
    .matches(/^\S*$/, "Spaces are not allowed in the username")
    .matches(
      /^[a-zA-Z][a-zA-Z0-9~!@$&_\-&]*$/,
      "Username must start with a letter and can contain numbers, letters, ~, !, @, $, _, -, or &"
    )
    .min(4, "Username must be at least 4 characters")
    .max(20, "Username must not exceed 20 characters")
    .required("Username is required"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email address'
    )
    .max(50, "Email must be at most 50 characters")
    .email("Enter valid Email")
    .required("Email is required"),
});

export const SignUp = () => {
  const navigate = useNavigate();
  const {  address } = useAccount();
  const { user }: any = useUser();
  const search = useLocation().search;
  const {getUserSignupDetail, signupData, loading} = useSignupDetails()

  const accessToken = new URLSearchParams(search).get("accessToken");
  
  const getRefferalCode = sessionStorage.getItem('refferalCode')

  const [signUpResponse, setSignUpResponse] = useState({
    status: "idle",
  });
  const [avatar, setAvatar] = useState([]);

  const [userNameValidation, setUserNameValidation] = useState<number | null>(
    null
  );

  const [emailValidation, setEmailValidation] = useState<number | null>(null);
  const { handleError } = useCustomError();

  const checkValidRefferal = async () => { 
    try {
        const response = await GET_VALID_REFERRAL(serialize({
            referral_code : getRefferalCode
        }))
        if(response.data.sucess === true){
          toast.success("Referral Code is valid")
        }
    } catch (error:any) {
        // toast.error(error.response?.data?.message);
        handleError(error);
    }
}

  useEffect(() => {
    if(getRefferalCode ){
      checkValidRefferal()
    } 
  },[getRefferalCode])

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      avatar: "",
      refferal: getRefferalCode ? getRefferalCode : "" ,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSignUp();
      // handleUserValidation();
    },
  });

  const handleSignUp = async () => {
    const toastId = toast.loading("Processing...", {theme: "light"});
    try {
      setSignUpResponse({
        status: "pending",
      });
      
      const body: any = {};

      body["user_name"] =  formik.values.username ? formik.values.username : "";
      body["email"] =  formik.values.email ? formik.values.email : "";
      body["avatar"] =  formik.values.avatar ? formik.values.avatar : "";
      body["refered_by"] =  formik.values.refferal ? formik.values.refferal : "";

      if(body.user_name === ""){
        delete body.user_name;
      }
      if(body.email === ""){
        delete body.email;
      }
      if(body.avatar === ""){
        delete body.avatar;
      }
      if(body.refered_by === ""){
        delete body.refered_by;
      }

      const response = await POST_AUTH_SIGNUP(body);
      getUserSignupDetail()
      if (response.data?.success) {
        setSignUpResponse({
          status: "resolved",
        });
        toast.success(response.data?.message);
        sessionStorage.removeItem('refferalCode');
        // navigate("/verify", {
        //   replace: true,
        // });
        // navigate("/verify");
        navigate("/dashboard");
      }
    } catch (error: any) {
      // toast.error(error.response.data.message);
      handleError(error);
      setSignUpResponse({
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
        // handleError(error);
      }
    }, 500),
    []
  );

  const getAvatar = async () => {
    try {
      const res = await GET_AVATAR_LIST(
        serialize({
          wallet_address: address,
        })
      );
      if (res.status === 200) {
        const devientData = res?.data;
        const devientlist = devientData.map((devient:any)=>({
          label: devient.name,
              value: devient.name,
              imgSrc : devient?.imageUrl,
        }))
        setAvatar(devientlist);
      }
    } catch (error:any) {
      toast.error(error?.response?.data?.message)
    }
  };

  // useEffect(()=>{
  //   getAvatar()
  // },[])

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

  // useEffect(() => {
  //   if(user && user.user_name){
  //     navigate("/verify");
  //   }
  // },[user])

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }
  }, [accessToken]);

  useEffect(() => {
    getUserSignupDetail();
  },[])

  if(!accessToken){
    navigate("/");
  }

  return (
    <>
      {loading ? <Loader/> : null}
      {!loading && 
    <HeroSection bgSrc={Images.BG}>
      <Card pseudoElement="default" >
        <form onSubmit={formik.handleSubmit}>
          <div className="flex justify-center items-center text-center">
            <Typography
              variant="h2"
              isIcon={false}
              className="text-text-primary mobile:text-xl mobile:leading-[32px]"
            >
               BLACK PASS SIGN UP
            </Typography>
          </div>
          <div className="py-5 mobile:py-3">
             <img src={Images.LINE} alt="line" />
            </div>
          <div className="flex flex-col gap-3 mobile:gap-2">
            <Typography isIcon={true} font="regular" variant="p">
              Choose Username
            </Typography>
            <div className="w-full relative mobile:w-[220px]">
              <Textfield
                placeHolder="Choose Username"
                name="username"
                value={formik.values.username}
                // onChange={formik.handleChange}
                onChange={(e: any) => {
                  formik.handleChange(e);
                  handleUserValidation(e.target.value);
                }}
                onBlur={formik.handleBlur}
                className={`${
                  formik.touched.username && formik.errors.username
                    ? "!border-red-600"
                    : "border-none"
                }`}
              />
              <div className="absolute top-0 right-2 bottom-0 flex justify-center items-center text-light-gray-200">
                {userNameValidation &&
                userNameValidation === 200 &&
                !formik.errors.username ? (
                  <RightLogo />
                ) : userNameValidation === 409 &&
                  formik.values.username !== "" ? (
                  <WrongLogo />
                ) : (
                  ""
                )}
              </div>
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
            <Typography isIcon={true} font="regular" variant="p">
              Email
            </Typography>
            <div className="w-full relative mobile:w-[220px]">
              <Textfield
                placeHolder="Email"
                name="email"
                value={formik.values.email}
                // onChange={formik.handleChange}
                onChange={(e: any) => {
                  formik.handleChange(e);
                  checkEmail(e.target.value);
                }}
                onBlur={formik.handleBlur}
                className={`${
                  formik.touched.email && formik.errors.email
                    ? "!border-red-600"
                    : "border-none"
                }`}
              />
              <div className="absolute top-0 right-2 bottom-0 flex justify-center items-center text-light-gray-200">
                {emailValidation &&
                emailValidation === 200 &&
                !formik.errors.email ? (
                  <RightLogo />
                ) : emailValidation === 409 && formik.values.email !== "" ? (
                  <WrongLogo />
                ) : (
                  ""
                )}
              </div>
            </div>
            {formik.touched.email && formik.errors.email && (
              <Typography
                isIcon={false}
                variant="p"
                font="regular"
                className="!text-red-600"
              >
                {formik.errors.email}
              </Typography>
            )}
             <Typography isIcon={true} font="regular" variant="p">
              Referral (Optional)
            </Typography>
            <div className="w-full relative mobile:w-[220px]">

            <Textfield  
            className="cursor-default"
            name="refferal"
            value={formik.values.refferal}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeHolder="Enter Referral Code" />
            </div>
            {/*
            <Typography isIcon={true} font="regular" variant="p">
              Avatar (Optional)
            </Typography>
            <DropdownSelect 
            placeHolder="Select NFT from Hedera wallet"
            valueProps={avatar}
            value={formik.values.avatar}            
            onChange={(val:any)=> {
              formik.handleChange(val.value)
              formik.setFieldValue('avatar',val.imageUrl)
              }
            }
            /> */}
            <div className="group flex justify-center items-center mt-10">
              <Button
              bgColor={true}
              CLASSNAME="px-2 text-text-primary group-hover:text-text-secondary"
              type="submit"
              size="extraSmall"
              color="white"
              isBorderLabel="CONTINUE"
              isBorder={true}
              isBorderLoading={signUpResponse.status === "pending"}
              disable={
                signUpResponse.status === "pending" ||
                (userNameValidation === 409
                  ? true
                  : false || emailValidation === 409
                  ? true
                  : false)
              }
              />
            </div>
          </div>
        </form>
      </Card>
    </HeroSection>
      }
    </>
  );
};
