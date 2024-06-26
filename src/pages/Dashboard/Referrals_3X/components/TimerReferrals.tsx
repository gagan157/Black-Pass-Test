import { Typography } from 'components/Atoms/Typography/Typography'
import { useUser } from 'context/userContext';
import React, { useEffect, useState } from 'react'
const { DateTime } = require('luxon');

type Countdown = {
    hours: number;
    minutes: number;
    seconds: number;
};

export const Timer = ({data, isStartTime, setIsStartTime}:{
    data:any;
    isStartTime:boolean;
    setIsStartTime: React.Dispatch<boolean>;
}) => {
    const {setReferral3X} = useUser()
    const [countdown, setCountdown] = useState<Countdown>({
        hours: -1,
        minutes: -1,
        seconds: -1,
      });

      useEffect(() => {
        let intervalId: any;
        const updateCountdown = () => {
          if (isStartTime) {
            const currentTime = Math.floor(Date.now() / 1000);
            if (currentTime < data?.startTime) {
                setCountdown({
                    hours : 0,
                    minutes : 0,
                    seconds : 0
                });
                clearInterval(intervalId);
                setIsStartTime(false);
                setReferral3X && setReferral3X(false);
                return;
            }
            const remainingTime =  data?.endTime - currentTime;

                // Calculate the difference
                if (remainingTime <= 0) {
                    setCountdown({
                        hours : 0,
                        minutes : 0,
                        seconds : 0
                    });
                    clearInterval(intervalId);
                    setIsStartTime(false);
                    setReferral3X && setReferral3X(false);
                    return;
                }
                else{
                    setCountdown({
                        hours : Math.floor(remainingTime / 3600),
                        minutes : Math.floor((remainingTime % 3600) / 60),
                        seconds : remainingTime % 60
                    });
                }

          };
        }
        updateCountdown();
        intervalId = setInterval(updateCountdown, 1000);
        return () => clearInterval(intervalId);
      }, [isStartTime]);

  return (
    <div className='flex flex-row text-white gap-1 items-center justify-between'>
        <div className='flex flex-col items-center'>
            <Typography isIcon={false} variant="p" className='text-text-secondary italic !text-small sm:!text-base'>
                {countdown.hours.toString().padStart(2, "0")}
            </Typography>
            <Typography isIcon={false} variant='customp' className='uppercase text-sm text-text-light !cursor-default'>
                hrs
            </Typography>
        </div>
        <Typography isIcon={false} className='self-start text-text-secondary !cursor-default'>
            :
        </Typography>
        <div className='flex flex-col items-center'>
            <Typography isIcon={false} variant="p" className='text-text-secondary italic !text-small sm:!text-base'>
                {countdown.minutes.toString().padStart(2, "0")}
            </Typography>
            <Typography isIcon={false} variant='customp' className='uppercase text-sm text-text-light !cursor-default'>
                min
            </Typography>
        </div>
        <Typography isIcon={false} className='self-start text-text-secondary !cursor-default'>
            :
        </Typography>
        <div className='flex flex-col items-center'>
            <Typography isIcon={false} variant="p" className='text-text-secondary italic !text-small sm:!text-base'>
                {countdown.seconds.toString().padStart(2, "0")}
            </Typography>
            <Typography isIcon={false} variant='customp' className='uppercase text-sm text-text-light !cursor-default'>
                sec
            </Typography>
        </div>
    </div>
  )
}
