import Axios from "axios";
import { API_ROUTES } from "constants/API_ROUTES";

const axios = Axios.create();

axios.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('accessToken');
    // if (token) {
      config.withCredentials = true;
      config.headers.Authorization = `Bearer ${token}`;
    // }
    config.headers["Access-Control-Allow-Origin"] = "*";
    config.headers["ngrok-skip-browser-warning"] = "69420";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const queryParams = (paramsObj: any) =>
    "?" + new URLSearchParams(paramsObj).toString();

    export const WALLET_CONNECT = async (payload: any) => {
      return await axios.post(API_ROUTES.WALLET_CONNECT, payload);
    }

    export const GET_USER_DETAILS = async () => {
      return await axios.get(API_ROUTES.GET_USER_DETAILS);
    }

export const POST_AUTH_SIGNUP = (body: any) => axios.post(API_ROUTES.AUTH_SIGNUP, body);
export const GET_USER_VALIDATION = (params: any) => axios.get(`${API_ROUTES.USER_VALIDATION}?${params}`);
export const GET_AVATAR_LIST =(params:any) => axios.get(`${API_ROUTES.AVATAR_LIST}?${params}`);

    export const GET_OWNER_SIGNATURE = async () => {
      return await axios.get(API_ROUTES.GET_OWNER_SIGNATURE);
    }

    export const FRACTION = async (payload: any) => {
      return await axios.post(API_ROUTES.FRACTION, payload);
    }    

    export const CREATE_BLADE_WALLET = async (payload: any) => {
      return await axios.post(API_ROUTES.CREATE_BLADE_WALLET, payload);
    }

    export const BLADE_WALLET = async() => {
      return await axios.get(API_ROUTES.BLADE_WALLET);
    }

    export const POST_TWITTER_VERIFY = ( twitterToken:any, param: string | null) => axios.post(`${API_ROUTES.TWITTER_VERIFY}?twitterUsername=${param}` , {}, {
      headers:  { 
          "twitterToken": twitterToken
      },
    });
    
    export const POST_DISCORD_VERIFY = (discordToken : any, param: string | null ) => axios.post(`${API_ROUTES.DISCORD_VERIFY}?discordUsername=${param}` , {} , {
      headers : {
        "discordToken" : discordToken
      },
    });
    export const POST_SEND_EMAIL = () => axios.post(API_ROUTES.SEND_EMAIL , {});
    export const PUT_VERIFY_EMAIL = (body:any) => axios.put( API_ROUTES.VERIFY_EMAIL  , body);
    export const POST_VERIFY_CAPTCHA = (body:any) => axios.post(API_ROUTES.VERIFY_CAPTCHA , body);
    export const GET_EMAIL_VALIDATION = (params: any) => axios.get(`${API_ROUTES.EMAIL_VALIDATION}?${params}`);
    export const GET_REFEREAL_LINK = () => axios.get(`${API_ROUTES.REFERRAL_LINK}`);
    export const GET_VALID_REFERRAL = (params:any) => axios.get(`${API_ROUTES.VALID_REFERRAL}?${params}`);

    export const PROFILE_UPDATE = async (payload: any) => {
      return await axios.put(API_ROUTES.PROFILE_UPDATE, payload);
    }
    export const POST_PROFILE_UPDATE_EMAIL = (body: any) => axios.post(`${API_ROUTES.PROFILE_UPDATE_EMAIL}`, body);
    export const PUT_PROFILE_VERIFY_EMAIL = (body : any) => axios.put(`${API_ROUTES.PROFILE_VERIFY_EMAIL}`, body);
    export const GET_TOTAL_REFERRALS = () => axios.get(`${API_ROUTES.TOTAL_REFERRALS}`);
    export const GET_TOTAL_SHARDS = () => axios.get(`${API_ROUTES.TOTAL_SHARDS}`);
    export const GET_RANK = () => axios.get(`${API_ROUTES.RANK}`);
    export const GET_SOCIAL_ALL_MISSIONS = (params:any) => axios.get(`${API_ROUTES.SOCIAL_ALL_MISSIONS}?${params}`);
    export const GET_RECURRING_ALL_MISSION = (params:any) => axios.get(`${API_ROUTES.RECURRING_ALL_MISSION}?${params}`);
    export const GET_SHARDS_ON_BLACKPASS = () => axios.get(`${API_ROUTES.SHARDS_ON_BLACK_PASS}`);
    export const PUT_CLAIM_SHARDS = (body : any) => axios.put(`${API_ROUTES.CLAIM_SHARDS}`, body);
    export const GET_UPDATE_BLACKPASS = () => axios.get(`${API_ROUTES.UPDATE_BLACKPASS}`);
    export const GET_CREDITED = () => axios.get(`${API_ROUTES.CREDITED}`);
    export const GET_LEADERBOARD = (params:any, source:any) => axios.get(`${API_ROUTES.LEADERBOARD}?${params}`,{cancelToken: source.token});
    export const GET_DASHBOARD_DISCORD = () => axios.get(`${API_ROUTES.DASHBOARD_DISCORD}`);
    export const POST_TELEGRAM_VERIFY = (telegram_id:any, params: string) => axios.post(`${API_ROUTES.TELEGRAM_VERIFY}?telegramUsername=${params}`,{} ,{
      headers : {
        "telegram_id" : telegram_id
      },
    });
    export const POST_HASHPACK = (body: string) => axios.post(`${API_ROUTES.HASHPACK}`, body);
    export const GET_FREE_TRANSACTION_COUNT = () => axios.get(`${API_ROUTES.FREE_TRANSACTION_COUNT}`);
    export const POST_TWITTER_FOLLOW = (body:any) => axios.post(`${API_ROUTES.TWITTER_FOLLOW}`, body);
    export const POST_TWITTER_COMMENT = (body:any) => axios.post(`${API_ROUTES.TWITTER_COMMENT}`, body);
    export const GET_TWITTER_FOLLOW_VERIFY = (params:any) => axios.get(`${API_ROUTES.TWITTER_FOLLOW_VERIFY}?${params}`);

    export const GET_DASHBOARD_MATRICS = async() => {
      return await axios.get(API_ROUTES.DASHBOARD_MATRICS);
    }

    export const GET_LEADERBOARD_USER_COUNT = async () => {
      return await axios.get(API_ROUTES.LEADERBOARD_USER_COUNT);
    }

    export const POST_BLOCKCHAIN_TRANSACTION = async (param: any) => {
      return await axios.post(`${API_ROUTES.BLOCKCHAIN_TRANSACTION}?txHash=${param}`);
    }

    export const PUT_DASHBOARD_CLAIM_ALL_SHARDS = () => axios.put(`${API_ROUTES.DASHBOARD_CLAIM_ALL_SHARDS}`);

    export const GET_DASHBOARD_MISSIONS_TABS = async (params: any) => {
      return await axios.get(`${API_ROUTES.DASHBOARD_MISSIONS_TABS}?${params}`);
    }

    export const UPLOAD_AVATAR = async (body: any) => {
      return await axios.post(`${API_ROUTES.UPLOAD_AVATAR}` , body);
    }

    export const PUT_UPDATE_BLADE_WALLET = async (body: any) => {
      return await axios.put(`${API_ROUTES.UPDATE_BLADE_WALLET}`, body);
    }

    export const GET_USER_SIGNUP_DETAILS = async () => {
      return await axios.get(API_ROUTES.SIGNUP_ME);
    }

    export const WALLET_CONNECT_EVM = async (payload: any) => {
      return await axios.post(API_ROUTES.WALLET_CONNECT_EVM, payload);
    }

    export const POST_DAILY_SPIN = async () => axios.post(`${API_ROUTES.DAILY_SPIN}`);
    export const GET_REFERRAL_SHARDS = (params:any) => axios.get(`${API_ROUTES.REFERRAL_SHARDS}?${params}`);

    export const GET_TWITTER_QUEST = (params:any) => axios.post(`${API_ROUTES.GET_TWITTER_QUEST}?${params}` , {});
    
    export const DAILY_SPIN_REWARD = (params:any) => axios.get(`${API_ROUTES.DAILY_SPIN_REWARD}?${params}`);

    export const POST_CREATOR_QUEST = (params:any) => axios.post(`${API_ROUTES.CREATOR_QUEST}?${params}`, {});
    
    export const GET_REFERRALS_3X = () => axios.get(`${API_ROUTES.REFERRALS_3X}`);
    
    export const POST_CONNECT_WALLET_ETH = (body:any) => axios.post(`${API_ROUTES.CONNECT_WALLET_ETH}` , body);
    
    export const GET_DEVIENT_WALLETS = (params:any) => axios.get(`${API_ROUTES.DEVIENT_WALLETS}` ,{params});

    export const WALLET_DISCONNECT = (params:any) => axios.put(`${API_ROUTES.WALLET_DISCONNECT}` , {}, {params});