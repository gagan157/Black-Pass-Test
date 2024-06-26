import { useUser } from "context/userContext";
import { useCustomError } from "hooks/accessTokenExpire";
import { useEffect } from "react";
import { GET_DASHBOARD_MATRICS } from "services/apiService";

export const useGetDashboardMatrics = (isDepend?:boolean) => {
    isDepend ??= true;
    const { handleError } = useCustomError();
    const { user, setDashboardMetrics } = useUser()

    const getDashboardMarics = async () => {
        try {
            const response = await GET_DASHBOARD_MATRICS();
            if (response?.status === 200) {
                setDashboardMetrics(response.data);
            }
        } catch (error: any) {
            handleError(error);
        }
    }

    useEffect(() => {
        if(isDepend){
            getDashboardMarics();
        }
    }, [isDepend]);

    return {
        getDashboardMarics
    }
}