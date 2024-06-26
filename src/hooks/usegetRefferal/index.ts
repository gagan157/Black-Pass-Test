import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GET_REFEREAL_LINK } from "services/apiService";

export const useGetRefferal = () =>{

    const [refferalLink, setRefferalLink] = useState();

    const getRefferalLink = async() =>{
        try {
            const res = await GET_REFEREAL_LINK()
            if(res.status === 200){
                const refferalLink = res.data?.referal_link ;
                setRefferalLink(refferalLink);
            }
        } catch (error:any) {
            // toast.error(error)
            toast.error(error?.response?.data?.message);
        }
    }

    // useEffect(()=>{
    //     getRefferalLink()
    // },[])

    return {
        refferalLink,
        getRefferalLink
    }
}