import { CancleIcon } from 'assets'
import { Card } from 'components/Atoms/Card/Card'
import { Typography } from 'components/Atoms/Typography/Typography'
import { Modal } from 'components/Molecules/Modal'
import React from 'react'

export const ScanQR = ({close} : {close:() => void}) => {
  return (
    <Modal blurImg>
      <Card
        pseudoElement="default"
        className={`!px-0 !py-2 `}
      >
        <button
          onClick={() => close()}
        //   disabled={spinnerState.isSpinning && !spinnerState.showReward}
          className="cursor-pointer absolute top-2 right-2"
        >
          <CancleIcon />
        </button>
        <div className='text-text-primary space-y-5'>
          <Typography isIcon={false} className='uppercase text-3xl' pclassName='justify-center'>
              scan qr
          </Typography>
          <div className='h-60 w-60 bg-white rounded-md'></div>
        </div>
        </Card>
    </Modal>
  )
}
