import { useUser } from "context/userContext";
import { useCustomError } from "hooks/accessTokenExpire";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GET_TOTAL_SHARDS } from "services/apiService";

export const useGetTotalShards = (isConnected?:boolean) =>{
    const {user  } = useUser()
    const { handleError } = useCustomError();
    const getTotalShards = async() =>{
            try {
            const res = await GET_TOTAL_SHARDS()
                if(res.status === 200){
                    const shards = res.data.totalShards?._sum?.value;
                    // setShowShards(shards)
                }
            } catch (error:any) {
                // toast.error(error.response?.data?.message);
                handleError(error);
            }
        }
    
        // useEffect(()=>{
        //     if (isConnected && user?.is_minted ) {
        //         getTotalShards();
        //     }
        // }, [isConnected , user?.is_minted]);
        
        return {
            getTotalShards
        }
}