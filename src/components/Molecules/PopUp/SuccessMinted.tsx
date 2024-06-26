import { Images } from 'assets/Images'
import { Typography } from 'components/Atoms/Typography/Typography'
import React, { useEffect } from 'react'
import { Modal } from '../Modal'

interface SuccessPopUpProps {
    onClose: () => void;
    label : any;
  }
  
  export const SuccessPopUp = ({ onClose ,label }:SuccessPopUpProps) => {
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        onClose(); 
      }, 2000);
  
      return () => clearTimeout(timeoutId);
    }, [onClose]);
  return (
    <Modal>
      <div className="flex flex-col w-[30vw] h-[25vh] justify-center items-center p-2 gap-y-2 max-sm:w-auto">
        <img src={Images.DOWNLOAD} alt="" />
        <Typography isIcon={false} variant="h4" font="bold" className="max-sm:text-base text-text-primary">
       {label}
        </Typography>
      </div>
    </Modal>
  )
}
