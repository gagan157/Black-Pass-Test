import { serialize } from "constants/utils";
import { useCustomError } from "hooks/accessTokenExpire";
import { useEffect, useState } from "react";
import { GET_RECURRING_ALL_MISSION } from "services/apiService";

export const useGetRecurringAllMission = () =>{
    const [recurringAllMissions, setRecurringAllMissions] = useState([]);
    const [recurringAllMissionsType , setRecurringAllMissionsType] = useState("ALL_MISSIONS");
    const { handleError } = useCustomError();
    const getRecurringAllMission = async() => {
        try {
            const res = await GET_RECURRING_ALL_MISSION(serialize({
                filter : recurringAllMissionsType ,
                limit : 20 ,
                offset : 0 ,
            }))
            if(res.status === 200){
                setRecurringAllMissions(res.data?.Tasks)
            }
        } catch (error:any) {
            // console.log(error);
            handleError(error);
        }
    }

    // useEffect(()=>{
    //     getRecurringAllMission()
    // },[recurringAllMissionsType])
    return {
        recurringAllMissions ,
        setRecurringAllMissionsType ,
        recurringAllMissionsType,
        getRecurringAllMission
    }
}