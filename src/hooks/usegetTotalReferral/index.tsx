import { useCustomError } from "hooks/accessTokenExpire";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GET_TOTAL_REFERRALS } from "services/apiService";

export const useGetToatalReferrals = () =>{
    const [totalReferrals, setTotalReferrals] = useState();
    const { handleError } = useCustomError();
    const getTotalReferral = async() =>{
        try {
        const res = await GET_TOTAL_REFERRALS()
            if(res.status === 200){
                setTotalReferrals(res.data?.referralTotal)
            }
        } catch (error:any) {
            // toast.error(error.response?.data?.message);
            handleError(error);
        }
    }

    // useEffect(()=>{
    //     getTotalReferral() 
    // },[])
    return {
        totalReferrals
    }
}