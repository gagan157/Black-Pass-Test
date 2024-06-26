import { create } from 'zustand';

export const useStore = create((set, get) => ({
    isPageTransitionEnded: false,
    setIsPageTransitionEnded: (isPageTransitionEnded) =>
        set({ isPageTransitionEnded }),

    firstLoad: true,
    setFirstLoad: (firstLoad) => set({ firstLoad }),

    isLocked: false,
    setIsLocked: (isLocked) => set({ isLocked }),

    isMenuOpen: false,
    setIsMenuOpen: (isMenuOpen) => set({ isMenuOpen }),

    isLoaded: false,
    setIsLoaded: (isLoaded) => set({ isLoaded }),

    lenis: undefined,
    setLenis: (lenis) => set({ lenis }),

    isDragAvailable: false,
    setIsDragAvailable: (isDragAvailable) => set({ isDragAvailable }),

    isVideoAvailable: false,
    setIsVideoAvailable: (isVideoAvailable) => set({ isVideoAvailable }),

    isVideoPlaying: false,
    setIsVideoPlaying: (isVideoPlaying) => set({ isVideoPlaying }),

    isAncientPortalModalOpen: false,
    setIsAncientPortalModalOpen: (isAncientPortalModalOpen) =>
        set({ isAncientPortalModalOpen }),

    isTheFinalBlowModal: false,
    setIsTheFinalBlowModal: (isTheFinalBlowModal) =>
        set({ isTheFinalBlowModal }),

    isGalaxyModalOpen: false,
    setIsGalaxyModalOpen: (isGalaxyModalOpen) => set({ isGalaxyModalOpen }),

    galaxyModalId: null,
    setGalaxyModalId: (galaxyModalId) => set({ galaxyModalId }),

    tokenomicsModalOpen: null,
    setTokenomicsModalOpen: (tokenomicsModalOpen) =>
        set({ tokenomicsModalOpen }),

    peopleBehindModalOpen: null,
    setPeopleBehindModalOpen: (peopleBehindModalOpen) =>
        set({ peopleBehindModalOpen }),

    peopleBehindModalInfo: null,
    setPeopleBehindModalInfo: (peopleBehindModalInfo) =>
        set({ peopleBehindModalInfo }),

    peopleBehindModalContent: null,
    setPeopleBehindModalContent: (peopleBehindModalContent) =>
        set({ peopleBehindModalContent }),

    memberModalId: null,
    setMemberModalId: (memberModalId) => set({ memberModalId }),

    memberInfo: null,
    setMemberInfo: (memberInfo) => set({ memberInfo }),

    partnersModalOpen: null,
    setPartnersModalOpen: (partnersModalOpen) => set({ partnersModalOpen }),

    teamMemberModalOpen: null,
    setTeamMemberModalOpen: (teamMemberModalOpen) =>
        set({ teamMemberModalOpen }),

    animationGrid: false,
    setAnimationGrid: (animationGrid) => set({ animationGrid }),

    gridModalOpen: null,
    setGridModalOpen: (gridModalOpen) => set({ gridModalOpen }),

    gridModalId: null,
    setGridModalId: (gridModalId) => set({ gridModalId }),

    loaderAnimationComplete: false,
    setLoaderAnimationComplete: (loaderAnimationComplete) =>
        set({ loaderAnimationComplete }),

    firstClick: false,
    setFirstClick: (firstClick) => set({ firstClick }),

    startAudioHome: false,
    setStartAudioHome: (startAudioHome) => set({ startAudioHome }),

    isAudioPagePlaying: false,
    setIsAudioPagePlaying: (isAudioPagePlaying) => set({ isAudioPagePlaying }),

    sequencesPlaying: [],
    playSequence: (id) => {
        const current = get().sequencesPlaying;
        if (current.includes(id)) return;

        set({ sequencesPlaying: [...current, id] });
    },
    pauseSequence: (id) => {
        set({
            sequencesPlaying: get().sequencesPlaying.filter((s) => s !== id),
        });
    },
}));
