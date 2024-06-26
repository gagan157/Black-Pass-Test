import { Header } from "components/Header";
import { Loader } from "components/Loader";
import Grain from "components/Noise";
import { Page } from "components/Page/Page";
import useMediaQuery from "hooks/useMediaQuery/useMediaQuery";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useStore } from "store/main";
import cn from 'classnames';
import { Home } from "pages/Home";
import Cursor from "components/Atoms/Cursor/Cursor";

const Layout = ({ children }: any) => {

  const [firstClick, setFirstClick, startAudioHome] = useStore((state) => [
    state.firstClick,
    state.setFirstClick,
    state.startAudioHome,
]);

const router = useLocation();
const pageName = router.pathname;

useEffect(() => {
    if (pageName === '/') {
        window.addEventListener(
            'click',
            () => {
                setFirstClick(true);
            },
            {
                once: true,
            }
        );
    } 
}, [startAudioHome]);

  return (
    <div>
     
    <Cursor />
    <Header />      
     {pageName === '/' && (
       <Page>
          <div className="characterImageAll">
            <Home />
          </div>
        </Page>
      )}
     {children}
      <Grain/> 
      
    </div>
  );
};

export default Layout;
