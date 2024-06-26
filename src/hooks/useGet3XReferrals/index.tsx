import { useUser } from "context/userContext";
import { useCustomError } from "hooks/accessTokenExpire"
import { useEffect, useState } from "react"
import { GET_REFERRALS_3X } from "services/apiService"
const { DateTime } = require('luxon');

interface TimmerInterface{
    startTime: number;
    endTime: number;
}

export const useGet3XReferrals = (isDepend?:boolean)=>{
    const {setReferral3X,setData3X} = useUser()
    const [data, setData] = useState<TimmerInterface>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isStartTime , setIsStartTime] = useState<boolean>(false)
    

    const {handleError} = useCustomError()

    const handleGet3XReferrals = async() => {
        try{
            setIsLoading(true)
            let res = await GET_REFERRALS_3X()
            let {bonus_referral_start_time, bonus_referral_end_time} = res?.data

            const currentTimestampSeconds = DateTime.now().toSeconds();

            // Check if current time is between start time and end time
            if(currentTimestampSeconds <= bonus_referral_start_time){
                handleCheckTimmer(bonus_referral_start_time)                
            }
            else if (currentTimestampSeconds >= bonus_referral_start_time && currentTimestampSeconds <= bonus_referral_end_time) {                
                setIsStartTime(true)
                setReferral3X && setReferral3X(true)
            } else {                
                setIsStartTime(false)
                setReferral3X && setReferral3X(false)
            }

            setData({
                startTime : +bonus_referral_start_time,
                endTime: +bonus_referral_end_time
            })
            setData3X && setData3X({
                startTime : +bonus_referral_start_time,
                endTime: +bonus_referral_end_time
            })
        }
        catch(error:any){
            handleError(error)
        }
        finally{
            setIsLoading(false)
        }
    }

    const handleCheckTimmer = (startTime:number)=> {
        let timeout: any;
        if(timeout){
            clearInterval(timeout)
            }
            
        timeout = setInterval(() => {
        const currentTimestampSeconds = DateTime.now().toSeconds();       
        if(currentTimestampSeconds >= startTime){
            setIsStartTime(true)
            setReferral3X && setReferral3X(true)
            clearInterval(timeout)
            return;
        }
            
        }, 1000);
    }

    useEffect(()=>{      
        if(isDepend){
            handleGet3XReferrals()        
        } 
    },[isDepend])

    return {
        data,
        handleGet3XReferrals,
        isLoading,
        isStartTime,
        setIsStartTime
    }
}