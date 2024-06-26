import { ReferralLogo, SpeedTimer } from 'assets'
import { Button } from 'components/Atoms/Button/Button'
import { Typography } from 'components/Atoms/Typography/Typography';
import { useGet3XReferrals } from 'hooks/useGet3XReferrals';
import { Timer } from './components/TimerReferrals';

export const Referrals = ({totalReferrals}: {totalReferrals:number;}) => {
  const {data,isStartTime,setIsStartTime} = useGet3XReferrals(true)

  return (
    <div className='w-full'>
        {isStartTime && <div className='flex flex-row items-center justify-between gap-2 pb-4 pl-1'>
          <div className='flex flex-row items-center gap-4 sm:gap-[1.80rem] pl-3 sm:pl-6'>
            <div className='flex-shrink-0'>
              <SpeedTimer />
            </div>
          
          <div className='flex flex-col text-white sm:gap-1'>
            <Typography isIcon={false} className='uppercase !text-[10px] !cursor-default'>
              limited time 3x referral multiplier active
            </Typography>
            <Typography isIcon={false} className='capitalize text-[#E8A106] !text-xxs mobile:!text-[8px] !cursor-default'>
              earn 60 shards per referral
            </Typography>
          </div>
       
          </div>
          <div className='flex flex-row item-center gap-3 justify-between'>
          <Timer data={data} isStartTime={isStartTime} setIsStartTime={setIsStartTime} />
          <Typography isIcon={false} className='text-text-secondary uppercase text-lg italic !cursor-default'>Left</Typography>
          </div>
        </div>}
        <div className='relative w-full'>
          {isStartTime && <div className='absolute top-[25%] sm:top-[28%] -left-2 sm:-left-5 text-text-secondary z-20 text-lg sm:text-4xl drop-shadow-primary font-extrabold italic !cursor-default'>3X</div>}
        <Button
            color="graylight"
            bgColor
            size="extraLarge"
            isBorder={true}
            logo={<ReferralLogo />}
            isBorderLabel="referrals"
            className="!cursor-default "
            value={totalReferrals}
            editButton="mobile:px-2 mobile:pr-5"
        />
        </div>
    </div>
  )
}
