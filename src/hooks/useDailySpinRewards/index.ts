import { DEFAULT_QUEST_LIMIT } from "constants/config";
import { serialize } from "constants/utils";
import { useCustomError } from "hooks/accessTokenExpire";
import { useEffect, useState } from "react"
import { DAILY_SPIN_REWARD } from "services/apiService";

interface DailyReward{
    reward_type: string;
    shards: number;
    created_at: string;
}
interface DailySpinInterface{
    history: DailyReward[];
    total: number;
}

export const useDailySpinReward = (isDepend?:boolean) => {
    const [dailySpinRewardsData, setDailySpinRewardData] = useState<DailySpinInterface>()
    const [dataLimit, setDataLimit] = useState(DEFAULT_QUEST_LIMIT)
    const [hasMoreData, setHashMoreDate] = useState(true);
    const [isloading, setIsLoading] = useState<boolean>(false);

    const {handleError} = useCustomError()

    const handleDailyReward = async()=> {
        try{
            setIsLoading(true)            
            const param = serialize({
                limit: dataLimit,
                offset: 0
            })
            const res = await DAILY_SPIN_REWARD(param)
            setDailySpinRewardData(res.data)
            if(dataLimit >= res.data?.total){
                setHashMoreDate(false)
            }
        }
        catch(error:any){
            handleError(error);
        }
        finally{
            setIsLoading(false)
        }
    }

    const handleLoadMoreData = ()=> {
        setDataLimit(prev => prev + DEFAULT_QUEST_LIMIT)
    }

    const handleresetState = ()=> {
        setDataLimit(DEFAULT_QUEST_LIMIT)
        setHashMoreDate(true)
    }

    useEffect(()=>{    
        if(isDepend){
            handleDailyReward()        
        }    
    },[isDepend, dataLimit])

    return {
        dailySpinRewardsData,
        handleDailyReward,
        handleLoadMoreData,
        hasMoreData,
        handleresetState,
        isloading
    }
}