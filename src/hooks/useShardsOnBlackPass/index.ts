import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { GET_SHARDS_ON_BLACKPASS } from "services/apiService"

export const useShardsOnBlackPass = () => {
    const [shardsOnBlackPass , setShowShardsOnBlackPass] = useState()
    const getShardsOnBlackPass = async() =>{
        try {
            const res = await GET_SHARDS_ON_BLACKPASS()
            if(res.status === 200){
                setShowShardsOnBlackPass(res.data?.totalShards?._sum?.value)
            }
        } catch (error:any) {
            toast.error(error)
        }
    }
    // useEffect(()=>{
    //     getShardsOnBlackPass()
    // },[])
  return {
    shardsOnBlackPass ,
    getShardsOnBlackPass
  }
}
