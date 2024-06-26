
export const EventButtonNames = {
  REFERRAL_LINK: 'REFERRAL_LINK',
  UPDATE_BLACK_PASS: 'UPDATE_BLACK_PASS',
  OPEN_X: 'OPEN_X',
  LEADERBOARD: 'LEADERBOARD',
  WALLET_CONNECT: 'WALLET_CONNECT',
  SPIN_THE_WHEEL: 'SPIN_THE_WHEEL',
}

export const trackButtonClick = async (eventName, eventValue) => {
  if (window && window.cookie3) {
    await window.cookie3.trackEvent({
      category: 'Button',
      action: 'Click',
      name: eventName
    });
  }
};