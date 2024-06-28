import { CancleIcon, RefreshIcon } from 'assets'
import { Card } from 'components/Atoms/Card/Card'
import { Typography } from 'components/Atoms/Typography/Typography'
import { Modal } from 'components/Molecules/Modal'
import React, { useEffect, useState } from 'react'
import { GET_CDC_QR, GET_CDC_QR_STATUS } from 'services/apiService'
import QRCode from "react-qr-code";
import { Loader, Smallloader } from 'components/Loader'
import { toast } from 'react-toastify'
import { useCustomError } from 'hooks/accessTokenExpire'

interface QRInterface{
  message: string;
  qr:string;
  session_id:string;
}
interface QRStatusInterface{
    id:string;
    user_id:string;
    status:string;
    session_id:string;
}

export const ScanQR = ({close} : {close:() => void}) => {
  const {handleError} = useCustomError()
  const [qrVal , setQRVal] = useState<QRInterface | null>(null);
  const [qrStatus,setQRStatus] = useState <'initialized' |
  'claimed' |
  'confirmed' |
  'expired'> ('initialized')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleGetCDCQR = async()=> {
    try{
      setIsLoading(true)
      let re = await GET_CDC_QR()
      setQRVal(re?.data)
    }
    catch(error:any){
      handleError(error)
    }
    finally{
      setIsLoading(false)
    }
  }
  const handleGetQRStatus = async(session_id:string)=> {
    try{
      const params = {session_id}
      let re = await GET_CDC_QR_STATUS(params)
      if(re?.data?.status === "confirmed"){       
        toast.success('CDC Wallet successfully connected!')
        close();
      }      
      if(re?.data?.status !== qrStatus){
        setQRStatus(re?.data?.status)
      }
    }
    catch(error){

    }
  }
  useEffect(()=>{
    handleGetCDCQR()
  },[])

  useEffect(()=>{
    let timeout:NodeJS.Timeout;
    if(qrVal){
      timeout = setInterval(()=>{ 
            
        if(qrStatus === "expired" || qrStatus === "confirmed"){
          clearInterval(timeout)
          return;
        }                           
        handleGetQRStatus(qrVal.session_id)
        
      },5000)
    } 
    return () => clearInterval(timeout)
  },[qrVal,qrStatus])

  return (
    <Modal blurImg>
      <Card
        pseudoElement="secondary"
        className={`!p-10`}
      >
        <button
          onClick={() => close()}
          disabled={qrStatus === "claimed"}
          className="cursor-pointer absolute top-2 right-2"
        >
          <CancleIcon />
        </button>
        <div className='text-text-primary space-y-5 '>
          <div className={`${qrStatus === "expired" ? 'flex items-center justify-between':''}`}>
          <Typography isIcon={false} className='uppercase text-3xl' pclassName='justify-center'>
              scan qr
          </Typography>
          {qrStatus === "expired" && <div
            className="cursor-pointer text-text-primary hover:text-text-secondary"
            onClick={() => {
              setQRStatus('initialized')
              handleGetCDCQR()
            }}
            >
            <RefreshIcon />
          </div>}
            </div>
          <div className='h-60 w-60 bg-white rounded-md p-5 relative'>
            {qrStatus === "expired" && <div className='absolute top-0 left-0 flex items-center justify-center w-full h-full bg-slate-600/80'>
              <Typography isIcon={false} className='text-text-primary !font-extrabold text-2xl tracking-wide'>QR Expired</Typography>
            </div>}
            {(isLoading || qrStatus === "claimed") && <div className='absolute top-0 left-0 flex items-center justify-center w-full h-full bg-slate-600/80'>
              <Smallloader />
            </div>}
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={`data:image/png;base64,${qrVal?.qr || ""}`}
              viewBox={`0 0 256 256`}
            />
            <img
              className="h-full w-full object-fill mt-10"
              src={`data:image/png;base64,${qrVal?.qr || ""}`}
              alt=""
            />
          </div>
        </div>
        </Card>
    </Modal>
  )
}
