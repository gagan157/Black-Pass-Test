// export const ENV = process.env.REACT_APP_ENV || "PROD";
export const ENV =
  window.location.href.includes("astranova.world") ||
  window.location.href.includes("http://localhost:3000") ||
    window.location.href.includes("black-pass-frontend-prod.azurewebsites.net")
    ? "PROD"
    : "DEV";
export const REACT_APP_FRONTEND_URL =
  process.env[`REACT_APP_FRONTEND_URL_${ENV}`];
export const REACT_APP_RECAPTCHA_KEY =
  process.env[`REACT_APP_RECAPTCHA_KEY_${ENV}`];
export const TELEGRAM_BOT = process.env[`REACT_APP_TELEGRAM_BOT_${ENV}`];
export const CONTRACT_ADDRESS =
  process.env[`REACT_APP_CONTRACT_ADDRESS_${ENV}`];
export const SITE_URL = process.env[`REACT_APP_SITE_URL_${ENV}`];
export const EXPLORER_LINK = process.env[`REACT_APP_EXPLORER_LINK_${ENV}`];
export const RPC_LINK = process.env[`REACT_APP_RPC_LINK_${ENV}`];
export const MARKETPLACE_COLLECTION_URL = `${process.env[`REACT_APP_MARKETPLACE_COLLECTION_URL_${ENV}`]}${CONTRACT_ADDRESS}`;
export const RAINBOW_PROJECT_ID = process.env[`REACT_APP_RAINBOW_PID_${ENV}`];
export const MAINTENANCE_MODE = process.env[`REACT_APP_MAINTENANCE_MODE_${ENV}`];

export const DEFAULT_QUEST_LIMIT = 20;
export const FEEDBACK_EMAIL = "mailto:contact@astranova.world";
export const ASTRANOVA_TWITTER_LINK = "https://twitter.com/Astra__Nova";
export const ASTRANOVA_SPHERE_LINK = `https://sphere.market/immutable/collection/${CONTRACT_ADDRESS}`;
export const ASTRANOVA_TOKEN_TROVE_LINK = "https://tokentrove.com/collection/AstraNovaBlackPass";
export const APP_NAME = "Astra Nova Black Pass";
export const APP_DESC = "The Black Pass is a SocialFI platform accessible through a free soulbound NFT, mintable at the time of joining. On this platform, you'll undertake social quests and farm shards (points) to earn the $RVV token airdrop, the official token of the Astra Nova ecosystem. It all begins with Season 1, centered around Astra Nova's upcoming game demo.";
export const APP_ICON = "https://blackpassmetadatapro.blob.core.windows.net/public/avatar/astroLogo-removebg-preview.png";
export const ASTRA_DEVIANTS_URL = "https://opensea.io/collection/deviants-of-astranova";
