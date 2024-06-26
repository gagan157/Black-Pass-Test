import { ethers } from "ethers";
import nftAbi from "../../assets/nft-contract-data/nft-abi.json";
import nftAddress from "../../assets/nft-contract-data/nft-address.json";
import { GET_OWNER_SIGNATURE } from "services/apiService";
import { string } from "yup";

  declare global {
    interface Window {
      walletClient: any;
      //@ts-ignore
      ethereum: any;
      frontier: any;
      cosmostation: any;
      //@ts-ignore
      bitkeep: any;
    }
  }

  export const getSigner = () => {
    // console.log(window.walletClient , "window")
    let provider = new ethers.BrowserProvider(window.ethereum);
    return provider?.getSigner();
  };


  export const contractMint =  async() => {
    // console.log("contract mint funtion start")
    
    const signer = await getSigner();
    // console.log(signer,"signer")

    const NftContractAddress: string = nftAddress.contract_address;
    const NftContractABI: any = nftAbi.abi;

    const contractAddress = NftContractAddress;
    const contractABI = NftContractABI;

    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    return contract;
  }