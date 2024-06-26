import { ASTRONOVO, LargeLine } from "assets";
import { Images } from "assets/Images";
import Accordion from "components/Accordion/accordion";
import { Card } from "components/Atoms/Card/Card";
import { Typography } from "components/Atoms/Typography/Typography";
import { Footer } from "components/Footer";
import { useGetDashboardMatrics } from "hooks/usegetDashboardMatrics";
import { useGetUserDetails } from "hooks/usegetUserDetails";
import React, { useEffect } from "react";

export const Faq = () => {
  const { getUserDetails } = useGetUserDetails(false);
  const { getDashboardMarics } = useGetDashboardMatrics(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if(accessToken){
      getDashboardMarics();
      getUserDetails();
    }
  }, []);
  return (
    <div className="bg-black justify-center items-center flex flex-col">
      <div className="mt-20 w-[80%]">
          <Card pseudoElement="primary" className="py-1 px-4">
            <Typography isIcon={false} variant="p" className="text-xxs">
              BLACK PASS FAQ
            </Typography>
          </Card>
        <p className="uppercase font-bold md:text-[52px] text-[35px] lg:text-[73px] leading-10 text-text-primary mb-[30px] md:mb-[65px] mt-7">
          FAQ<span className="text-[18px] sm:text-[18px] md:text-[34px]">s</span>
        </p>
        <Accordion />
      </div>
      <div className="mt-14 md:mt-32 w-[80%]">
        <ASTRONOVO />
         
      </div>

      <Footer />
    </div>
  );
};
