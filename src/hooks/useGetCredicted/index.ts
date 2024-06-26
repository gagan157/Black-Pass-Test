import { useCustomError } from "hooks/accessTokenExpire";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { GET_CREDITED } from "services/apiService";

export const useGetCredicted = () =>{
    const [credicted , setShowCredicted] = useState([])
    const { handleError } = useCustomError();

    const getCredicted = async() => {
        try {
            const res = await GET_CREDITED()
           if(res.status === 200) {
                setShowCredicted(res.data?.history)
           }
        } catch (error:any) {
            // toast.error(error.response?.data?.message);
            handleError(error);
        }
    }

    // useEffect (()=>{
    //     getCredicted()     
    // },[])
    return{
        credicted ,
        getCredicted
    }
}