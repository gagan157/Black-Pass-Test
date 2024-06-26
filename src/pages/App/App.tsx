import { DisclaimerComponent, RainbowKitProvider, getDefaultConfig, darkTheme  } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SignUp } from "pages/Authentication/SignUp";
import { Dashboard } from "pages/Dashboard";
import RootLayout from "pages/RootLayout";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WagmiProvider } from 'wagmi';
import "../../../src/App.css";
import AuthRoot from "./Authroot";
import PrivateRoute from './PrivateRoute';
import { UserProvider } from 'context/userContext';
import { Leaderboard } from 'pages/LeaderBoard';
import { Faq } from 'pages/Faq';
import { isMobileDevice } from 'constants/utils';
import { MyProfile } from 'components/EditProfile';
import { EXPLORER_LINK, RPC_LINK, APP_NAME, RAINBOW_PROJECT_ID, MAINTENANCE_MODE } from 'constants/config';
import Maintenance from 'components/Maintenance';
import { Referrals } from 'pages/Referrals';
import { DevientWallets } from 'pages/Dashboard/DevientWallets';

function App() {
  const queryClient = new QueryClient();

  const immutableZKevm = {
    id: RPC_LINK?.includes("testnet") ? 13473 : 13371,
    name: 'zkEVM',
    nativeCurrency: { name: RPC_LINK?.includes("testnet") ? 'Immutable zkEVM Testnet' : 'immutableZKevm', symbol: RPC_LINK?.includes("testnet") ? 'tIMX' : 'IMX', decimals: 18 },
    rpcUrls: {
      default: { http: [`${RPC_LINK}`] }
    },
    blockExplorers: {
      default: { name: 'Etherscan', url: `${EXPLORER_LINK}` },
    },
  }

  const config = getDefaultConfig({
    appName: APP_NAME,
    projectId: RAINBOW_PROJECT_ID || '',
    chains: [immutableZKevm],
  });

  const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
    <Text>
      {isMobileDevice() && <div className='text-red-700 text-base'>
        Note: Please use Wallet Browser for an enhanced user experience on mobile devices.
      </div>}
    </Text>
  );

  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={darkTheme({
            accentColor: '#1CF9CF',
            accentColorForeground: 'white',
            borderRadius: 'small',
            fontStack: 'system',
            overlayBlur: 'small',
            })} 
            initialChain={immutableZKevm} 
            modalSize="compact" 
            coolMode 
            appInfo={{ disclaimer: Disclaimer }}
            >
            <UserProvider>
              <RouterOutlet />
            </UserProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>

      <ToastContainer pauseOnFocusLoss={false} theme="dark" style={{ zIndex: 999999 }} autoClose={3000} />
    </>
  );
}

export default App;

console.log("Maintenance Mode::", MAINTENANCE_MODE);

const RouterOutlet = () => {
  return MAINTENANCE_MODE === 'true' ?
    <Router>
      <Routes>
        <Route path="/" element={<Maintenance />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
    :
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route element={<AuthRoot />}>
            {/* <Route index element={<LandingPage />} /> */}
            {/* <Route index element={<Home />} /> */}
            <Route path="/faq" element={<Faq />} />
            {/* <Route path="/faction" element={<Fraction/>} /> */}
            {/* <Route path="/signup" element={<PrivateRoute Component={SignUp} />} /> */}
            <Route path="/signup" element={<SignUp />} />
            {/* <Route path="/verify" element={<PrivateRoute Component={Verify} />} /> */}
            <Route path="/dashboard" element={<PrivateRoute Component={Dashboard} />} />
            <Route path="/leaderboard" element={<PrivateRoute Component={Leaderboard} />} />
            <Route path="/devients" element={<PrivateRoute Component={DevientWallets} />} />
            <Route path="/referrals" element={<PrivateRoute Component={Referrals} />} />
            <Route path="/profile" element={<PrivateRoute Component={MyProfile} />} />
          </Route>
        </Route>
      </Routes>
    </Router>
}