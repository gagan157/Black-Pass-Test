import { useUser } from "context/userContext";
import { useCustomError } from "hooks/accessTokenExpire";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { GET_RANK } from "services/apiService";

export const useGetRank = (isConnected?:boolean) =>{
    const {user } = useUser()
    const { handleError } = useCustomError();
     const getRank = async()=>{
        try {
            const res = await GET_RANK()
                if(res.status === 200){
                    // setShowRank(res.data?.rank)
                } 
        } catch (error:any) {
            // toast.error(error.response?.data?.message);
            handleError(error);
        }
    }
    // useEffect(()=>{
    //     if (isConnected && user?.is_minted ) {
    //         getRank();
    //     }
    // }, [isConnected , user?.is_minted ]);
    return{
        getRank
    }
}