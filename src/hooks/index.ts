import { useUser } from 'context/userContext';
import { useDisconnect } from 'wagmi';

export const useNavigationAction = () => {
  const { disconnect } = useDisconnect();
  const { updateUser }: any = useUser();
  const handleAction = (label: string) => {
    switch (label) {
      case 'Logout':
        disconnect();
        localStorage.clear();
        updateUser(null);
        window.location.href = '/';
        break;
      default:
        break;
    }
  };
  return { handleAction };
};
