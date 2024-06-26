import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
import {GlobalCanvas, SmoothScrollbar, useScrollbar} from '@14islands/r3f-scroll-rig';
import useMediaQuery from 'hooks/useMediaQuery/useMediaQuery';
import gsap from 'gsap/dist/gsap';
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import {usePageTransition} from '@14islands/react-page-transitions'
import { useStore } from 'store/main';
import { LoaderHome } from 'pages/LoaderHome';

gsap.registerPlugin(ScrollTrigger);
export const Page = ({ children }) => {
    const [setIsMenuOpen, setAnimationGrid, firstLoad, setFirstLoad, isLocked] =
        useStore((state) => [
            state.setIsMenuOpen,
            state.setAnimationGrid,
            state.firstLoad,
            state.setFirstLoad,
            state.isLocked,
        ]);
        const router = useLocation();
        const pageName = router.pathname;
        const isMobile = useMediaQuery('(max-width: 1050px)');
        const [isLoaded, setIsLoaded] = useState(true);
        const { scrollTo } = useScrollbar();
        const smoothScrollbarRef = useRef(null);

        
  return (
    <>
    <GlobalCanvas
        dpr={[1, 1.5]}
        globalRender={false}
        scaleMultiplier={0.01}
        eventPrefix='client'
        style={{ pointerEvents: 'none' }}
    >
        <ambientLight intensity={3.5} />
    </GlobalCanvas>

    {/* <SmoothScrollbar ref={smoothScrollbarRef}> */}
        {/* {(bind) => ( */}
            <div className='relative' >
                {/* Loader */}
                {!isMobile && pageName === '/' && firstLoad && (
                    <>
                    <LoaderHome />
                    </>
                )}

                {children}                
            </div>
        {/* )} */}
    {/* </SmoothScrollbar> */}
</>
  )
}
