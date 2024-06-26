import { DEFAULT_QUEST_LIMIT } from "constants/config";
import { useCustomError } from "hooks/accessTokenExpire";
import { useEffect, useState } from "react"
import { GET_DEVIENT_WALLETS } from "services/apiService";

interface listInterface {
    wallet_address: string;
    wallet_type: string;
    updated_at: string;
    user_id: string;
    count: string;
}

interface DataInterface{
    list: listInterface[];
    total:number;
}

export const useGetDevients = () => {
    const {handleError} = useCustomError()
    const [data, setData] = useState<DataInterface>();
    const [isLoading, setIsloading] = useState(false);
    let [params, setParams] = useState({
        limit: DEFAULT_QUEST_LIMIT,
        offset: 0
    })
    const handleGetDevients = async()=> {
        try{
            setIsloading(true)
            let res = await GET_DEVIENT_WALLETS(params)
            setData(res?.data)
        }
        catch(error: any){
            handleError(error)
        }
        finally{
            setIsloading(false)
        }
    }

    useEffect(()=>{
        handleGetDevients()
    },[])

    return {data, isLoading, handleGetDevients};
}