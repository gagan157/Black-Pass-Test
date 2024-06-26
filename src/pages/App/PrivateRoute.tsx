// ProtectedRoute.tsx
import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
  Component: FC;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ Component }) => {
  let accessToken = localStorage.getItem('accessToken');
  const search = useLocation().search;
  const urlAccessToken = new URLSearchParams(search).get("mt");
  const isCoinbase = new URLSearchParams(search).get("coinbase");
  if (urlAccessToken) {
    localStorage.setItem('accessToken', urlAccessToken);
    localStorage.setItem('isCoinbase', 'true');
    return <Navigate to={`/dashboard`} />;
  } else if (accessToken) {
    return <Component />;
  } else {
    return <Navigate to="/" />;
  }
};
export default PrivateRoute;