import { Images } from 'assets/Images';
import { Button } from 'components/Atoms/Button/Button';
import { Typography } from 'components/Atoms/Typography/Typography';
import { shortenAddress } from 'constants/function';
import React, { useEffect, useState } from 'react'
import { ScanQR } from './popup/scanQr';
import { DisconnectConfirm } from './popup/Disconnect';
import {
    useConnectModal,
    useAccountModal,
    WalletButton
  } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect , useSignMessage } from 'wagmi';
import { POST_CONNECT_WALLET_ETH, WALLET_DISCONNECT } from 'services/apiService';
import { useGetDevients } from 'hooks/useGetDevients';
import { Loader } from 'components/Loader';
import { toast } from 'react-toastify';
import { useCustomError } from 'hooks/accessTokenExpire';
const { DateTime } = require('luxon');

const tablehead = ["Serial No.","date", "wallet type","wallet address","devient", "action"];

interface listInterface {
    wallet_address: string;
    wallet_type: string;
    updated_at: string;
    user_id: string;
    count: string;
}

export const DevientWallets = () => {
    const  {address,isConnected} = useAccount()
    const { signMessageAsync } = useSignMessage();
    const {disconnect} = useDisconnect()
    const { openConnectModal } = useConnectModal();
    const { openAccountModal } = useAccountModal();
    const [isScanModal , setIsScanModal] = useState<boolean>(false);
    const [isDisconnectModal , setIsDisconnectModal] = useState<boolean>(false);
    const [selectData, setSelectData] = useState<listInterface | null>(null)
    const [loading, setloading] = useState<boolean>(false);
    const {handleError} = useCustomError();

    const {data ,isLoading , handleGetDevients} = useGetDevients()

  const handleScanQRToggal = ()=> {
    setIsScanModal(!isScanModal)
  }
  const handleDisconnectToggal = ()=>{
    setIsDisconnectModal(!isDisconnectModal)
  }

  const handleConnectWalletWithETH = async(address:string) => {
    let tostId;
    try{
        setloading(true)
        tostId = toast.loading('Wallet Connecting...')
        const signature = await signMessageAsync({ message: "I3WjCEHiLEAax0jlGpfCdJCkoxc6bjwWzPKPB0WYlsTlG5fh6PXU5Uu79KFjOF6I" })
        const body = {
            wallet_address: address,
            signature: signature
        }
        await POST_CONNECT_WALLET_ETH(body)
        handleGetDevients();
        toast.success('Wallet Connected Successfully!')
    }
    catch(error:any){
        handleError(error)
    }
    finally{
        disconnect()
        setloading(false)
        toast.dismiss(tostId)
    }
  }

  const handleDisconnectWallet = async() => {
    let tostId;
    try{
        tostId = toast.loading('Wallet Disconnecting...')
        setloading(true)
        const params = {
            wallet_address: selectData?.wallet_address,
            wallet_type: selectData?.wallet_type
        }
        const res = await WALLET_DISCONNECT(params)
        handleDisconnectToggal()
        handleGetDevients()
        toast.success('Wallet Disconnected Successfully!')
    }
    catch(error:any){
        handleError(error)
    }
    finally{
        setloading(false)
        toast.dismiss(tostId)
    }
  }


  useEffect(()=>{
    if(isConnected && address){
        console.log("first")
        handleConnectWalletWithETH(address)
    }
    return () => {isConnected && disconnect()}
  },[isConnected])

  return (
    <div className='relative min-h-[90vh] pb-14 text-white'>
        <div className="h-full w-full absolute -z-10 ">
            <img
            className="object-cover w-full h-full"
            src={Images.LEADERBOARD}
            alt="leaderboard"
            />
        </div>
        <div className='container max-w-[70%] mx-auto py-10 mobile:max-w-[92%] '>
            <div className='flex flex-col lg:flex-row items-center justify-between gap-y-3'>
                <Typography isIcon={false} variant='h1' pclassName='self-start' className='uppercase leading-none'>
                    devient wallet
                </Typography>
                <div className='flex items-center gap-5 w-full lg:w-3/5 sm:justify-end'>
                <Button
                    onClick={handleScanQRToggal}
                    isBorder={true}
                    bgColor={true}
                    isBorderLabel="connect cdc"
                    disable={loading}
                    color="white"
                    CLASSNAME=" text-text-primary group-hover:text-text-secondary !px-2"
                    className='!w-full lg:!max-w-[200px]'
                />
                <Button
                    onClick={openConnectModal}
                    isBorder={true}
                    bgColor={true}
                    isBorderLabel="connect wallet"
                    disable={loading}
                    color="white"
                    CLASSNAME=" text-text-primary group-hover:text-text-secondary !px-2"
                    className='!w-full lg:!max-w-[200px]'
                />                
                
                {/* {openAccountModal && (
                    <button onClick={openAccountModal} type="button">
                      Open Account Modal
                    </button>
                  )} */}
                </div>
            </div>

            <div className='my-5 sm:mt-8'>
              {isLoading ? <Loader /> : 
                data?.list.length === 0 ? 
                <>
                    <div className="h-[50vh] flex flex-col gap-y-10 justify-center items-center px-5">
                    <Typography
                        isIcon={false}
                        variant="h5"
                        className="text-text-primary text-center"
                    >
                    No Data
                    </Typography>

                    {/* <ReferralLinkBtn Btnname=" Start referring now!" /> */}
                    </div>
                </> 
                :
                <>
                {/* table headers */}
                <div className="hidden md:block">
                    <div className="grid grid-cols-6 place-items-center p-4 border-t border-b border-dashed border-lightprimary pl-9">
                        {tablehead.map((headName,idx)=>(
                            <div key={headName} className="md:min-w-[150px] w-full flex items-center justify-center">
                            <Typography
                                isIcon={false}
                                variant="customp"
                                className="text-text-primary cursor-default uppercase"
                            >
                                {headName}
                            </Typography>
                            </div>
                        ))}                    
                    </div>
                </div>
                {/* table body  web */}
                {data?.list.map((item, idx)=>(
                <React.Fragment key={item?.user_id + idx}>            
                    <div                    
                    className={`bg-background-third 
                        p-[1px] mt-5 hidden md:block `}
                    style={{
                        clipPath:
                        "polygon(2% 0px, 100% 0px, 100% 55%, 98% 100%, 0px 100%, 0px 40%)",
                    }}
                    >
                    <div
                        className="bg-background-blackmain w-full min-h-11 pl-5 mobile:pl-0"
                        style={{
                        clipPath:
                            "polygon(2% 0px, 100% 0px, 100% 55%, 98% 100%, 0px 100%, 0px 40%)",
                        }}
                    >
                        <div className="grid grid-cols-6 place-content-center p-3 ">
                        <div className="md:min-w-[150px] flex items-center justify-center">
                            <Typography
                            isIcon={false}
                            variant="customp"
                            className="text-text-primary "
                            JustifyContentCenter={true}
                            >
                                {(idx+1).toString().padStart(2, "0")}
                            {/* {((currentPage - 1) * DEFAULT_QUEST_LIMIT + idx + 1).toString().padStart(2, "0")} */}
                            </Typography>
                        </div>

                        <div className="md:min-w-[150px] flex items-center justify-center">
                            
                            <Typography
                            JustifyContentCenter={true}
                            isIcon={false}
                            variant="customp"
                            className="text-text-primary mobile:truncate mobile:w-[60px]"
                            >
                            {DateTime.fromISO(item?.updated_at).toFormat("dd-MMM-yyyy") || "-"}
                            </Typography>
                        </div>

                        <div className="md:min-w-[150px] flex items-center justify-center">
                            <Typography
                            isIcon={false}
                            JustifyContentCenter={true}
                            variant="customp"
                            className="text-text-primary mobile:truncate mobile:w-[60px]"
                            >
                            {item?.wallet_type}
                            </Typography>
                        </div>
                        <div className="md:min-w-[150px] flex items-center justify-center">
                            <Typography
                            isIcon={false}
                            JustifyContentCenter={true}
                            variant="customp"
                            className="text-text-primary mobile:truncate mobile:w-[60px]"
                            >
                            { shortenAddress(item?.wallet_address || "", 7) ||"-"}
                            </Typography>
                        </div>

                        <div className="md:min-w-[150px] flex items-center justify-center">
                            <Typography
                            JustifyContentCenter={true}
                            isIcon={false}
                            variant="customp"
                            className="text-text-primary mobile:truncate mobile:w-[60px]"
                            >
                            {item?.count || 0}
                            </Typography>
                        </div>
                        <div className="md:min-w-[150px] flex items-center justify-center">                    
                            <Button
                            onClick={()=>{
                                setSelectData(item)
                                handleDisconnectToggal()
                            }}
                            isBorder={true}
                            isBorderLabel="Disconnect"
                            disable={item?.wallet_type === "EVM" || loading}
                            color="white"
                            CLASSNAME=" text-text-primary group-hover:text-text-secondary px-10"                            
                            className={` !h-7 ${item?.wallet_type === "EVM"? '':'bg-text-secondary'}`}
                        />
                        
                        </div>
                        </div>
                    </div>
                    </div>

                    {/* mobile card */}
                    <div
                    className={` bg-background-third p-[1px] mt-5 block md:hidden `}
                    style={{
                        clipPath:
                        "polygon(2% 0px, 100% 0px, 100% 55%, 98% 100%, 0px 100%, 0px 40%)",
                    }}
                    >
                    <div
                        className={` bg-background-blackmain w-full min-h-36 p-5 `}
                        style={{
                        clipPath:
                            "polygon(2% 0px, 100% 0px, 100% 55%, 98% 100%, 0px 100%, 0px 40%)",
                        }}
                    >
                        <div className="flex flex-col justify-between gap-y-2">
                        <div className="flex justify-between">
                            <Typography
                            isIcon={false}
                            variant="p"
                            className="text-text-primary uppercase"
                            >
                            Serial No.
                            </Typography>
                            <Typography
                            isIcon={false}
                            variant="p"
                            className="text-text-primary"
                            >
                                {(idx+1).toString().padStart(2, "0")}              
                            </Typography>
                        </div>

                        <div className="flex justify-between">
                            <Typography
                            isIcon={false}
                            variant="p"
                            className="text-text-primary uppercase"
                            >
                            date
                            </Typography>
                            <div className="flex gap-2">
                            {/* <div
                                className={`w-5 h-5 relative overflow-hidden rounded-full`}
                            >
                                <LazyImage
                                highQualitySrc={item?.date}
                                alt="avatar"
                                imgClassName="w-full h-full rounded-full"
                                />
                            </div> */}
                            <Typography
                                isIcon={false}
                                variant="p"
                                className="text-text-primary "
                            >
                                {DateTime.fromISO(item?.updated_at).toFormat("dd-MMM-yyyy") || "-"}
                            </Typography>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <Typography
                            isIcon={false}
                            variant="p"
                            className="text-text-primary uppercase"
                            >
                            WALLET Type
                            </Typography>
                            <Typography
                            isIcon={false}
                            variant="p"
                            className="text-text-primary "
                            >
                            {item?.wallet_type}
                            </Typography>
                        </div>

                        <div className="flex justify-between">
                            <Typography
                            isIcon={false}
                            variant="p"
                            className="text-text-primary uppercase"
                            >
                            WALLET address
                            </Typography>
                            <div className="flex ">
                            <Typography
                                isIcon={false}
                                variant="p"
                                className="text-text-primary"
                            >
                                {shortenAddress(item?.wallet_address || "") || "-"}
                            </Typography>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <Typography
                            isIcon={false}
                            variant="p"
                            className="text-text-primary uppercase"
                            >
                            devients
                            </Typography>
                            <div className="flex ">
                            <Typography
                                isIcon={false}
                                variant="p"
                                className="text-text-primary"
                            >
                                {item?.count || "-"}
                            </Typography>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <Typography
                            isIcon={false}
                            variant="p"
                            className="text-text-primary uppercase"
                            >
                            action
                            </Typography>
                            <div className="flex ">
                            <Button
                            onClick={()=>{
                                setSelectData(item)
                                handleDisconnectToggal()
                            }}
                            isBorder={true}
                            bgColor={true}
                            isBorderLabel="Disconnect"
                            disable={item?.wallet_type === "EVM" || loading}
                            color="white"
                            CLASSNAME=" text-text-primary group-hover:text-text-secondary px-2"
                            className={` ${item?.wallet_type === "EVM"? '':'bg-text-secondary'}`}
                        />
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>

                    {/* buttons */}
                    {/* <div className="flex flex-row justify-between w-[70%] mt-5 absolute bottom-10 mobile:w-[90%]">
                <div className="group ">
                    <Button
                    bgColor
                    onClick={handlePrevPage}
                    disable={currentPage === 1}
                    color="white"
                    isBorderLabel="Prev"
                    isBorder={true}
                    CLASSNAME={`w-[150px] ${
                        currentPage === 1
                        ? ""
                        : "text-text-primary group-hover:text-text-secondary"
                    }`}
                    />
                </div>

                <div className="group">
                    <Button
                    CLASSNAME={`w-[150px] ${
                        (currentPage * DEFAULT_QUEST_LIMIT) >= referralShards?.total
                        ? ""
                        : "text-text-primary group-hover:text-text-secondary"
                    }`}
                    onClick={handleNextPage}
                    color="white"
                    isBorderLabel="Next"
                    isBorder={true}
                    disable={(currentPage * DEFAULT_QUEST_LIMIT) >= referralShards?.total}
                    />
                </div>
                    </div> */}
                </React.Fragment>          
                ))}
                </>
                }
            </div>
        </div>
        {isScanModal && <ScanQR close={handleScanQRToggal} />}
        {isDisconnectModal && <DisconnectConfirm close={()=>{
            setSelectData(null)
            handleDisconnectToggal()
            }} WalletAdress={selectData?.wallet_address || ""} handleDisconnect={handleDisconnectWallet} loading={loading} />}
    </div>
  )
}
