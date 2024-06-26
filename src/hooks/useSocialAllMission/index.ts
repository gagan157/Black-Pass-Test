import { serialize } from "constants/utils";
import { useCustomError } from "hooks/accessTokenExpire";
import { useEffect, useState } from "react";
import { GET_SOCIAL_ALL_MISSIONS } from "services/apiService";

export const useGetSocialAllMission = () =>{
    const [socialAllMissions, setSocialAllMissions] = useState([]);
    const [socialAllMissionsType , setSocialAllMissionsType] = useState("ALL_MISSIONS");
    const { handleError } = useCustomError();
    const getSocialAllMission = async() => {
        try {
            const res = await GET_SOCIAL_ALL_MISSIONS(serialize({
                filter : socialAllMissionsType ,
                limit : 20 ,
                offset : 0 ,
            }))
            if(res.status === 200){
                setSocialAllMissions(res.data?.Tasks)
            }
        } catch (error: any) {
            // console.log(error);
            handleError(error);
        }
    }

    // useEffect(()=>{
    //     getSocialAllMission()
    // },[socialAllMissionsType])
    return {
        socialAllMissions ,
        setSocialAllMissionsType ,
        socialAllMissionsType ,
        getSocialAllMission
    }
}