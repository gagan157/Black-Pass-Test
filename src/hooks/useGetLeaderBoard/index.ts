import { serialize } from "constants/utils";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GET_LEADERBOARD } from "services/apiService";
import Axios from "axios";

export const useGetLeaderboard = () => {

    const [leaderboard,setLeaderboard] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalEntries, setTotalEntries] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [myLeaderboardData, setMyLeaderboardData] = useState<any>()
    const getLeaderboard = async(source:any) =>{        
        try {
            setIsLoading(true)
            const res = await GET_LEADERBOARD(serialize({
                limit: 20,
                offset: (currentPage - 1) * 20,
            }), source)
            if(res.status === 200){
                setLeaderboard(res.data?.list)
                setTotalEntries(res.data?.total);
                setMyLeaderboardData(res.data?.user)
                setIsLoading(false)
            }
        } catch (error:any) {
            toast.error(error.response?.data?.message);
        } 
    }

    useEffect(() => {
        const CancelToken = Axios.CancelToken;
        const source = CancelToken.source();

        getLeaderboard(source);

        return () => {
            source.cancel('Request canceled due to component unmounting');
        }
      }, [currentPage]);

return{
    leaderboard ,
    setCurrentPage ,
    totalEntries ,
    currentPage ,
    isLoading ,
    myLeaderboardData
}
}