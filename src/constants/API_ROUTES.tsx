import * as config from "constants/config";
const BASE_URL = config.REACT_APP_FRONTEND_URL;

export const API_ROUTES = {
  WALLET_CONNECT: `${BASE_URL}/user-module/wallet-connect`,
  GET_USER_DETAILS: `${BASE_URL}/user-module`,
  AUTH_SIGNUP: `${BASE_URL}/user-module/registration`,
  USER_VALIDATION: `${BASE_URL}/user-module/check-username`,
  AVATAR_LIST: `${BASE_URL}/user-module/deviants-list`,
  GET_OWNER_SIGNATURE: `${BASE_URL}/black-pass/owner-signature`,
  FRACTION: `${BASE_URL}/user-module/faction`,
  TWITTER_VERIFICATION: `${BASE_URL}/account-verification/twitter`,
  TWITTER_VERIFY: `${BASE_URL}/account-verification/twitter/verify`,
  DISCORD_VERIFICATION: `${BASE_URL}/account-verification/discord`,
  DISCORD_VERIFY: `${BASE_URL}/account-verification/discord/verify`,
  SEND_EMAIL: `${BASE_URL}/account-verification/send-email`,
  VERIFY_EMAIL: `${BASE_URL}/account-verification/verify-email`,
  VERIFY_CAPTCHA: `${BASE_URL}/account-verification/verify-captcha`,
  CREATE_BLADE_WALLET: `${BASE_URL}/user-module/create-blade-wallet`,
  BLADE_WALLET: `${BASE_URL}/user-module/blade-wallet`,
  EMAIL_VALIDATION: `${BASE_URL}/user-module/check-email`,
  REFERRAL_LINK: `${BASE_URL}/user-module/referral-link`,
  VALID_REFERRAL: `${BASE_URL}/user-module/valid-referral`,
  PROFILE_UPDATE: `${BASE_URL}/user-module/profile-update`,
  PROFILE_UPDATE_EMAIL: `${BASE_URL}/user-module/profile/update-email`,
  PROFILE_VERIFY_EMAIL: `${BASE_URL}/user-module/profile/verify-email`,
  PROFILE_VERIFY_DISCORD: `${BASE_URL}/account-verification/profile/discord`,
  TOTAL_REFERRALS: `${BASE_URL}/dashboard/total-referrals`,
  TOTAL_SHARDS: `${BASE_URL}/dashboard/total-shards`,
  RANK: `${BASE_URL}/dashboard/rank`,
  SOCIAL_ALL_MISSIONS: `${BASE_URL}/dashboard/social-all-missions`,
  RECURRING_ALL_MISSION: `${BASE_URL}/dashboard/recurring-all-missions`,
  SHARDS_ON_BLACK_PASS: `${BASE_URL}/dashboard/shards-on-black-pass`,
  CLAIM_SHARDS: `${BASE_URL}/dashboard/claim-shards`,
  UPDATE_BLACKPASS: `${BASE_URL}/dashboard/shard-post-signature-batch`,
  CREDITED: `${BASE_URL}/dashboard/credited`,
  LEADERBOARD: `${BASE_URL}/dashboard/leaderboard`,
  DASHBOARD_DISCORD: `${BASE_URL}/dashboard/discord`,
  TELEGRAM_VERIFY: `${BASE_URL}/account-verification/telegram/verify`,
  HASHPACK: `${BASE_URL}/user-module/hashpack`,
  FREE_TRANSACTION_COUNT: `${BASE_URL}/dashboard/free-transaction-count`,
  TWITTER_FOLLOW: `${BASE_URL}/dashboard/twitter-follow`,
  TWITTER_COMMENT: `${BASE_URL}/dashboard/twitter-comment`,
  TWITTER_FOLLOW_VERIFY: `${BASE_URL}/dashboard/twitter-follow-verify`,
  DASHBOARD_MATRICS: `${BASE_URL}/dashboard/matrics`,
  LEADERBOARD_USER_COUNT: `${BASE_URL}/dashboard/leaderboard/user-list`,
  BLOCKCHAIN_TRANSACTION: `${BASE_URL}/black-pass/update-blockchain-transaction`,
  DASHBOARD_CLAIM_ALL_SHARDS: `${BASE_URL}/dashboard/claim-all-shards`,
  DASHBOARD_MISSIONS_TABS: `${BASE_URL}/dashboard/quests`,
  UPLOAD_AVATAR: `${BASE_URL}/user-module/upload-avatar`,
  UPDATE_BLADE_WALLET: `${BASE_URL}/user-module/update/blade-wallet`,
  SIGNUP_ME: `${BASE_URL}/user-module/signup-me`,
  WALLET_CONNECT_EVM: `${BASE_URL}/user-module/connect-wallet-evm`,
  DAILY_SPIN : `${BASE_URL}/dashboard/daily-spin`,
  GET_TWITTER_QUEST: `${BASE_URL}/dashboard/verify-hashtag-tweet`,
  REFERRAL_SHARDS : `${BASE_URL}/dashboard/refferal-shards`,
  DAILY_SPIN_REWARD : `${BASE_URL}/dashboard/daily-spin-rewards`,
  CREATOR_QUEST: `${BASE_URL}/dashboard/creator-quest` ,
  REFERRALS_3X : `${BASE_URL}/blackpass-config`,
  CONNECT_WALLET_ETH: `${BASE_URL}/user-module/connect-wallet-eth`,
  DEVIENT_WALLETS: `${BASE_URL}/user-module/deviants`,
  WALLET_DISCONNECT: `${BASE_URL}/user-module/disconnect-wallet`,
  CDC_QR: `${BASE_URL}/cdc/qr`,
  CDC_QR_STATUS: `${BASE_URL}/cdc/qr-status`,
};
