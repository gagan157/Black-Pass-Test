import { CancleIcon } from 'assets'
import { Button } from 'components/Atoms/Button/Button'
import { Card } from 'components/Atoms/Card/Card'
import { Typography } from 'components/Atoms/Typography/Typography'
import { Modal } from 'components/Molecules/Modal'
import React from 'react'

export const DisconnectConfirm = ({close, WalletAdress,handleDisconnect, loading} : {close:() => void; WalletAdress:string; handleDisconnect:()=>void; loading:boolean}) => {
  return (
    <Modal blurImg>
    <Card
      pseudoElement="third"
      className={`!px-0 !py-2 `}
    >
      <button
        onClick={() => !loading && close()}
      //   disabled={spinnerState.isSpinning && !spinnerState.showReward}
        className="cursor-pointer absolute top-2 right-2"
      >
        <CancleIcon />
      </button>
      <div className='text-text-primary space-y-10 sm:space-y-3 w-full px-3'>
        <Typography isIcon={false} className='text-xl' pclassName='justify-center text-center'>
            Are you sure you want to <br></br> disconnect the wallet<br></br>({WalletAdress})?
        </Typography>
        <div className='flex flex-col sm:flex-row items-center justify-center gap-5'>
        <Button
            onClick={close}
            isBorder={true}
            bgColor={true}
            isBorderLabel="Cancel"
            disable={loading}
            color="white"
            CLASSNAME=" text-text-primary group-hover:text-text-secondary !px-4"
            className='!w-full'
                />
        <Button
            onClick={handleDisconnect}
            isBorder={true}
            bgColor={true}
            isBorderLabel="Confirm"
            color="white"
            disable={loading}
            CLASSNAME=" text-text-primary group-hover:text-text-secondary !px-4"
            className='!w-full'
        />
        </div>
      </div>
      </Card>
  </Modal>
  )
}
