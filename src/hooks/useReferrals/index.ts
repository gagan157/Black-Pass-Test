
import { DEFAULT_QUEST_LIMIT } from "constants/config";
import { serialize } from "constants/utils";
import { useCustomError } from "hooks/accessTokenExpire";
import { useGetDashboardMatrics } from "hooks/usegetDashboardMatrics";
import { useGetUserDetails } from "hooks/usegetUserDetails";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GET_REFERRAL_SHARDS } from "services/apiService";

interface listInterface{
    id: string;
    user_name: string;
    email: string;
    referal_code: string;
    refered_by: string;
    avatar: string;
    is_minted: boolean;
    is_email_verified: boolean;
    otp: null | number;
    otp_expiry: null | number;
    role: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    is_deactivated: boolean;
    wallet_address: string;
    totalvalue: null | number;
}
interface Initialstate {
    list : listInterface[];
    total: number;
    totalReferrals: number;
    totalShards: number;
}

export const useGetReferralShards = () => {
    const [referralShards, setReferralShards] = useState<Initialstate>();
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const {getUserDetails} = useGetUserDetails(false)
    const {getDashboardMarics} = useGetDashboardMatrics(false)

    const { handleError } = useCustomError();

    const getReferralShards = async () => {
        try {
            setIsLoading(true)
            const res = await GET_REFERRAL_SHARDS(serialize({
                limit: DEFAULT_QUEST_LIMIT,
                offset: (currentPage - 1) * DEFAULT_QUEST_LIMIT,
            }))
            
            if (res.status === 200) {
                setReferralShards(res.data);                
            }
        } catch (error: any) {
            handleError(error);
        }
        finally {
            setIsLoading(false)
        }
    }

    const handlePrevPage= () => {
        if(currentPage > 1){
            setCurrentPage(prev => prev - 1)
        }
    }

    const handleNextPage= () => {
        if(referralShards?.total || 0 > (currentPage * DEFAULT_QUEST_LIMIT)){
            setCurrentPage(prev => prev + 1)
        }
    }

    useEffect(() => {
        getReferralShards();
        getUserDetails();  
        getDashboardMarics();
    }, [currentPage]);

    return {
        referralShards,
        currentPage,
        isLoading,
        handleNextPage,
        handlePrevPage
    }
}