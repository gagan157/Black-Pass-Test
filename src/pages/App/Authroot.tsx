import { Loader } from "components/Loader";
import { useUser } from "context/userContext";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const AuthRoot = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const search = useLocation().search;
  const tokens: any = new URLSearchParams(search).get("twitterToken");
  const discordToken = new URLSearchParams(search).get("discordToken");

  useEffect(() => {
    setLoading(true)
    if (user) {
      if (!user?.user_name || !user?.email) {
        navigate("/signup");
      }
      // else if (!user.is_minted) {
      //   navigate("/verify");
      // } 
      // else if (user.Factions === null) {
      // navigate("/fraction");
      // } 
      // else {
      //   navigate("/dashboard")
      // }
      // else if (user.is_minted) {
      //   navigate("/dashboard");
      // }
      setLoading(false)
    }
    setLoading(false)
  }, [user]);
  let token = localStorage.getItem('accessToken');

  return (
    <>
      {loading
        && !tokens && !discordToken && token ?
        <Loader />
        :
        <Outlet />
      }
    </>
  );
};

export default AuthRoot;