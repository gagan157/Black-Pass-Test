export function shortenAddress(address: string, chars = 8): string {
    if (typeof address !== 'string') {
        throw new Error('Address must be a string');
    }

    return address ? `${address?.substring(0, chars + 2)}...${address?.substring(address.length - chars)}` : "";
}

export const getUserData = () => {
    const data = localStorage.getItem("userData");
    if (data) {
      return JSON.parse(data);
    }
  };

  export const logout = () => {
    localStorage.clear();
  };

  export function shortenLink(address: any, chars = 8) {
    if (typeof address !== 'string') {
        throw new Error('Address must be a string');
    }
    return `${address?.substring(0, chars + 2)}...${address?.substring(address.length - chars)}`;
}