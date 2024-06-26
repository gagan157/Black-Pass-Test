import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { GET_USER_DETAILS } from "services/apiService";
import { useUser } from '../../context/userContext' 
import { useCustomError } from "hooks/accessTokenExpire";

export const useGetUserDetails = (isDepend?:boolean) => {
  isDepend ??= true;
  const [userData, setUserData] = useState<{
    accountType: string[];
    isEmailVerified: boolean;
    isMinted: boolean | null;
    user_name: any;
    avatar:any;
    email:any;
    Factions:any;
    id:string;
    WalletsType : { [key: string]: string};
    referralCode:any;
  }>({
    accountType: [],
    isEmailVerified: false,
    isMinted:null,
    user_name: null,
    avatar:null,
    email:null,
    Factions:null,
    id:"",
    WalletsType: {},
    referralCode:null
  });
  const [isRender, setIsRender] = useState<boolean | null>(null);
  const { updateUser} = useUser();
  const { handleError } = useCustomError();
  const [isLoading, setIsLoading] = useState(false);

  const getUserDetails = async () => {
    try {
      setIsLoading(true);
      const response = await GET_USER_DETAILS();
      updateUser(response.data);
      const { SocialAccount, is_email_verified ,is_minted, user_name, avatar, email, Factions ,id , Wallets, referal_code } = response.data;
      // let accountType: string[] = [];
      //   SocialAccount.forEach((account:any) => {
      //   return accountType.push(account.account_type)
      // })
      const accountType = SocialAccount.map((acc: any) => acc.account_type);
      // const WalletsType = Wallets.map((acc: any) => ({
      //   [acc.wallet_type] : acc.wallet_address,        
      // }));
      const WalletsType = Wallets.reduce((acc:any , curr:any)=>{
        return {...acc, [curr.wallet_type] : curr.wallet_address}
      } , {})
      setUserData((prev) => {
        return {
          accountType: [...prev.accountType, ...accountType],
          isEmailVerified: is_email_verified,
          isMinted : is_minted,
          user_name: user_name,
          avatar: avatar,
          email: email,
          Factions: Factions,
          id : id ,
          WalletsType : WalletsType,
          referralCode: referal_code,
        };
      });     
      // setUserData({
      //   ...userData,
      //   accountType: [...userData.accountType , ...accountType],
      //   isEmailVerified: is_email_verified,
      // });
    } catch (error: any) {
      // toast.error(error);
      // toast.error(error?.response?.data?.message);      
      handleError(error);
    }
    finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if(isDepend){
      getUserDetails();
    }
  }, [isDepend]);

  return {
    getUserDetails,
    userData,
    setUserData,
    setIsRender,
    isLoading,
  };
};
