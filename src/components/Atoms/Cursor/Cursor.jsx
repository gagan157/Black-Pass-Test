import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import cn from 'classnames';
import { useLocation } from 'react-router-dom';
import { useStore } from 'store/main';

const Cursor = () => {
    const [
        isDragAvailable,
        isVideoAvailable,
        isVideoPlaying,
        loaderAnimationComplete,
        firstLoad,
        setStartAudioHome,
    ] = useStore((state) => [
        state.isDragAvailable,
        state.isVideoAvailable,
        state.isVideoPlaying,
        state.loaderAnimationComplete,
        state.firstLoad,
        state.setStartAudioHome,
    ]);
    const root = useRef(null);
    const router = useLocation();
    const cursorContainer = useRef(null);
    const outer = useRef(null);
    const inner = useRef(null);
    const ringPath = useRef(null);
    const dragText = useRef(null);
    const videoIcons = useRef(null);
    const clickToEnter = useRef(null);
    const clickToEnterText = useRef(null);

    const _isDragAvailable = useRef(false);
    const _isVideoAvailable = useRef(false);
    const _isLoaderAnimationComplete = useRef(false);

    const onPress = () => {
        if (_isDragAvailable.current || _isVideoAvailable.current) return;

        gsap.to([outer.current, inner.current], {
            scale: 0.7,
            duration: 0.9,
            ease: 'expo.out',
        });
    };

    const onRelease = () => {
        if (_isDragAvailable.current || _isVideoAvailable.current) return;

        gsap.to([outer.current, inner.current], {
            scale: 1,
            duration: 1,
            ease: 'elastic.out',
        });
    };

    useEffect(() => {
        if (window.innerWidth < 1050) return;

        gsap.set(root.current, { xPercent: -50, yPercent: -50 });

        const posOuter = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
        };
        const posInner = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
        };
        const posDragText = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
        };
        const posVideoIcons = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
        };
        const posClickToEnter = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
        };

        const mouseOuter = { x: posOuter.x, y: posOuter.y };
        const mouseInner = { x: posInner.x, y: posInner.y };
        const mouseDragText = { x: posDragText.x, y: posDragText.y };
        const mouseVideoIcons = { x: posVideoIcons.x, y: posVideoIcons.y };
        const mouseClickToEnter = {
            x: posClickToEnter.x,
            y: posClickToEnter.y,
        };

        const speed = {
            outer: 0.12,
            inner: 0.1,
        };

        const xSetOuter = gsap.quickSetter(outer.current, 'x', 'px');
        const ySetOuter = gsap.quickSetter(outer.current, 'y', 'px');
        const xSetInner = gsap.quickSetter(inner.current, 'x', 'px');
        const ySetInner = gsap.quickSetter(inner.current, 'y', 'px');
        const xSetDragText = gsap.quickSetter(dragText.current, 'x', 'px');
        const ySetDragText = gsap.quickSetter(dragText.current, 'y', 'px');
        const xSetVideoIcons = gsap.quickSetter(videoIcons.current, 'x', 'px');
        const ySetVideoIcons = gsap.quickSetter(videoIcons.current, 'y', 'px');
        const xSetClickToEnter = gsap.quickSetter(
            clickToEnter.current,
            'x',
            'px'
        );
        const ySetClickToEnter = gsap.quickSetter(
            clickToEnter.current,
            'y',
            'px'
        );

        window.addEventListener('mousemove', (e) => {
            mouseOuter.x = e.x;
            mouseOuter.y = e.y;

            mouseInner.x = e.x;
            mouseInner.y = e.y;

            mouseDragText.x = e.x;
            mouseDragText.y = e.y;

            mouseVideoIcons.x = e.x;
            mouseVideoIcons.y = e.y;

            mouseClickToEnter.x = e.x;
            mouseClickToEnter.y = e.y;
        });

        window.addEventListener('mousedown', onPress);
        window.addEventListener('mouseup', onRelease);

        gsap.ticker.add(() => {
            const dtOuter =
                1.0 - Math.pow(1.0 - speed.outer, gsap.ticker.deltaRatio());
            const dtInner =
                1.0 - Math.pow(1.0 - speed.inner, gsap.ticker.deltaRatio());

            posOuter.x += (mouseOuter.x - posOuter.x) * dtOuter;
            posOuter.y += (mouseOuter.y - posOuter.y) * dtOuter;

            posInner.x += (mouseInner.x - posInner.x) * dtInner;
            posInner.y += (mouseInner.y - posInner.y) * dtInner;

            posDragText.x += (mouseDragText.x - posDragText.x) * dtInner;
            posDragText.y += (mouseDragText.y - posDragText.y) * dtInner;

            posVideoIcons.x += (mouseVideoIcons.x - posVideoIcons.x) * dtInner;

            posVideoIcons.y += (mouseVideoIcons.y - posVideoIcons.y) * dtInner;

            posClickToEnter.x +=
                (mouseClickToEnter.x - posClickToEnter.x) * dtInner;

            posClickToEnter.y +=
                (mouseClickToEnter.y - posClickToEnter.y) * dtInner;

            xSetOuter(posOuter.x);
            ySetOuter(posOuter.y);
            xSetInner(posInner.x);
            ySetInner(posInner.y);
            xSetDragText(posDragText.x);
            ySetDragText(posDragText.y);
            xSetVideoIcons(posVideoIcons.x);
            ySetVideoIcons(posVideoIcons.y);
            xSetClickToEnter(posClickToEnter.x);
            ySetClickToEnter(posClickToEnter.y);
        });

        return () => {
            window.removeEventListener('mousedown', onPress);
            window.removeEventListener('mouseup', onRelease);
        };
    }, []);

    useEffect(() => {
        if (router.pathname === '/the-game') return;

        _isDragAvailable.current = isDragAvailable;

        if (isDragAvailable) {
            gsap.killTweensOf([outer.current, inner.current, dragText.current]);
            gsap.to(outer.current, {
                scale: 2.5,
                duration: 1,
                ease: 'power3.out',
            });
            gsap.to(inner.current, {
                autoAlpha: 0,
                duration: 0.75,
                ease: 'power1.out',
            });
            gsap.to(dragText.current, {
                autoAlpha: 1,
                duration: 0.75,
                ease: 'power1.out',
            });
        } else {
            gsap.killTweensOf([outer.current, inner.current, dragText.current]);
            gsap.to(outer.current, {
                scale: 1,
                duration: 1,
                ease: 'power3.out',
            });
            gsap.to(inner.current, {
                autoAlpha: 1,
                duration: 0.75,
                ease: 'power1.out',
            });
            gsap.to(dragText.current, {
                autoAlpha: 0,
                duration: 0.75,
                ease: 'power1.out',
            });
        }
    }, [isDragAvailable]);

    useEffect(() => {
        if (router.pathname === '/the-game') return;

        _isVideoAvailable.current = isVideoAvailable;

        if (isVideoAvailable) {
            gsap.killTweensOf([outer.current, inner.current, dragText.current]);
            gsap.to(outer.current, {
                scale: 2.5,
                duration: 0.3,
                ease: 'power1.out',
            });
            gsap.to(inner.current, {
                autoAlpha: 0,
                duration: 0.3,
                ease: 'power1.out',
            });
            gsap.to(ringPath.current, {
                stroke: '#1CF9CF',
                duration: 0.3,
                ease: 'power1.out',
            });
            gsap.to(videoIcons.current, {
                autoAlpha: 1,
                duration: 0.3,
                ease: 'power1.out',
            });
        } else {
            gsap.killTweensOf([outer.current, inner.current, dragText.current]);
            gsap.to(outer.current, {
                scale: 1,
                duration: 0.3,
                ease: 'power1.out',
            });
            gsap.to(inner.current, {
                autoAlpha: 1,
                duration: 0.3,
                ease: 'power1.out',
            });
            gsap.to(ringPath.current, {
                stroke: '#181818',
                duration: 0.3,
                ease: 'power1.out',
            });
            gsap.to(videoIcons.current, {
                autoAlpha: 0,
                duration: 0.3,
                ease: 'power1.out',
            });
        }
    }, [isVideoAvailable]);

    useEffect(() => {
        if (router.pathname === '/') {
            _isLoaderAnimationComplete.current = loaderAnimationComplete;

            if (loaderAnimationComplete) {
                gsap.fromTo(
                    root.current,
                    {
                        autoAlpha: 0,
                    },
                    {
                        autoAlpha: 1,
                        duration: 0.5,
                        ease: 'power1.out',
                        onStart: () => setStartAudioHome(true),
                    }
                );
                gsap.fromTo(
                    clickToEnterText.current,
                    {
                        autoAlpha: 0,
                        scale: 0,
                    },
                    {
                        autoAlpha: 1,
                        scale: 1,
                        duration: 0.5,
                        ease: 'power1.out',
                    }
                );
            } else {
                gsap.to(clickToEnterText.current, {
                    autoAlpha: 0,
                    scale: 0,
                    duration: 0.5,
                    ease: 'power1.out',
                });
            }
        }
    }, [loaderAnimationComplete]);

    return (
        <div
            ref={root}
            className={cn(
                'cursor hidden s:flex pointer-events-none !z-[1000000]',
                {
                    invisible: router.pathname === '/' && firstLoad,
                }
            )}
        >
            <div ref={cursorContainer} className='relative origin-center'>
                <div ref={outer} className='cursor__outer relative'>
                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                        <svg
                            className='w-8 h-auto'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                        >
                            <circle
                                cx='12'
                                cy='12'
                                r='11'
                                fill='#181818'
                                fillOpacity='0.01'
                                stroke='#A0A0A0'
                                strokeWidth='0.75'
                            ></circle>
                            <g className='rotate-ring relative'>
                                <path
                                    ref={ringPath}
                                    className='rotate-ring-path'
                                    stroke='#181818'
                                    d='M6.501 2.474a11 11 0 0111 0M23.002 12a11 11 0 01-5.5 9.526m-10.998 0A11 11 0 011.004 12'
                                ></path>
                            </g>
                        </svg>
                    </div>
                </div>

                <div ref={inner} className='cursor__inner'></div>

                <div
                    ref={dragText}
                    className='cursor__dragText chakra font-bold text-white text-10 leading-none tracking-[2px] uppercase invisible'
                >
                    <div className='relative top-[-0.4rem] left-[0.1rem]'>
                        Drag
                    </div>
                </div>

                <div
                    ref={videoIcons}
                    className='cursor__videoIcons flex items-center justify-center invisible'
                >
                    <div
                        className={cn('relative w-[2.2rem]', {
                            'is-video-playing': isVideoPlaying,
                        })}
                    >
                        <svg
                            className='play-btn relative top-[0.25rem] left-[0.25rem] w-full h-auto'
                            viewBox='0 0 22 21'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                d='M20.5413 12.2932L3.77405 20.5747C2.44484 21.2312 0.888365 20.264 0.888365 18.7815L0.888364 2.21847C0.888364 0.735972 2.44483 -0.23124 3.77404 0.425271L20.5413 8.7068C22.027 9.44063 22.027 11.5594 20.5413 12.2932Z'
                                fill='#FAFAFA'
                            />
                        </svg>

                        <svg
                            className='play-pause absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1.2rem] h-auto'
                            viewBox='0 0 12 27'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <rect
                                width='3'
                                height='27'
                                rx='1.5'
                                fill='#FAFAFA'
                            />
                            <rect
                                x='9'
                                width='3'
                                height='27'
                                rx='1.5'
                                fill='#FAFAFA'
                            />
                        </svg>
                    </div>
                </div>

                <div ref={clickToEnter} className='cursor__clickToEnter'>
                    <div
                        ref={clickToEnterText}
                        className='invisible relative top-1/2 left-[7.5rem] whitespace-nowrap text-sm font-semibold tracking-[1.5px] text-[#FAFAFA]'
                    >
                        CLICK TO ENTER
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cursor;
