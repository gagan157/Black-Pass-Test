import { useCustomError } from "hooks/accessTokenExpire";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GET_USER_SIGNUP_DETAILS } from "services/apiService";

export const useSignupDetails = () => {
    const [loading, setLoading] = useState(true);
    const [signupData, setSignupData] = useState();
    const { handleError } = useCustomError();
    const navigate = useNavigate();

    const getUserSignupDetail = async () => {
        try {
            setLoading(true);
            const response = await GET_USER_SIGNUP_DETAILS();
            localStorage.setItem("signupUserData", JSON.stringify(response.data));
            if (response?.data && response?.data?.is_active) {
                setSignupData(response?.data);
                navigate("/dashboard")
            }
            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            handleError(error);
        } finally {
            setLoading(false);
        }
    }

    return {
        getUserSignupDetail,
        signupData,
        loading,
    }
}