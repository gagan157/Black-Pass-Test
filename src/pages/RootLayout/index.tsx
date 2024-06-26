import Layout from "pages/App/Layout";
import { Outlet } from "react-router-dom";


const RootLayout = ({ render = "outlet" }) => {

  return (
    <>
        <Layout>
            {render === "outlet" && <Outlet />}
        </Layout>
    </>
  );
};

export default RootLayout;
