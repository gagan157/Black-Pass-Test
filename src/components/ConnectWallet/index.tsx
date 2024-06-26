import { WalletButton } from "@rainbow-me/rainbowkit";
import { ENV } from "constants/config";
import { Link } from "react-router-dom";

const DAPP_URL = ENV === "PROD" ? "blackpass.astranova.world/dashboard" : "black-pass-staging.azurewebsites.net/dashboard";

const getWalletRedirectLink = (accessToken: string) => {
  const WALLET_BASE_URL = 'https://go.cb-w.com/dapp';
  const queryParams = `mt=${accessToken}&coinbase=true`;
  const encodedQueryParams = encodeURIComponent(`https://${DAPP_URL}?${queryParams}`);
  return `${WALLET_BASE_URL}?cb_url=${encodedQueryParams}`;
};

const CustomWalletModal = ({ setShowCustomWalletModal, setWalletListen, updateBlackPass }: any) => {
  const accessToken = localStorage.getItem("accessToken") || "";
  const isCoinbase = localStorage.getItem("isCoinbase");

  const handleDrawerHide = () => {
    setShowCustomWalletModal(false);
  };
  // toast.info(navigator.userAgent);
  // let intent = "wc";
  // if (updateBlackPass) {
  //   intent = "ubp"
  // }
  // `https://go.cb-w.com/mtUDhEZPy1?cb_url=${SITE_URL}/dashboard?mt=${accessToken}&coinbase=true`
  const WalletList = [
    {
      name: "metamask",
      url: `https://metamask.app.link/dapp/${DAPP_URL}?mt=${accessToken}`,
      custom: true,
      isWalletBrowser: /MetaMask/i.test(navigator.userAgent),
    },
    {
      name: "coinbase",
      url: getWalletRedirectLink(accessToken),
      custom: true,
      isWalletBrowser: isCoinbase,
    },
    {
      name: "walletconnect"
    },
  ];

  return (
    <div>
      <div
        id="drawer-bottom-example"
        className="fixed bottom-0 left-0 right-0 z-40 w-full p-4 overflow-y-auto transition-transform bg-white dark:bg-gray-800 transform-none"
        aria-labelledby="drawer-bottom-label"
      >
        <h5
          id="drawer-bottom-label"
          className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
        >
          Connect a Wallet
        </h5>
        <button
          type="button"
          data-drawer-hide="drawer-bottom-example"
          aria-controls="drawer-bottom-example"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={handleDrawerHide}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="flex flex-wrap gap-3">
          {WalletList.map((wallet) => (
            <div className="relative min-h-12 max-w-max" key={wallet.name}>
              <WalletButton wallet={wallet.name} />
              {wallet?.custom && !wallet?.isWalletBrowser && (
                <Link
                  to={wallet.url}
                  target="_blank"
                >
                  <div
                    className="absolute top-0 left-0 w-full h-full bg-transparent z-50 cursor-pointer"
                    onClick={() => {
                      handleDrawerHide();
                      // window.open(wallet.url, "_blank");
                    }}
                  />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomWalletModal;