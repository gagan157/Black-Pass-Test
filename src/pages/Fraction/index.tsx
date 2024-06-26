import { Images } from 'assets/Images';
import { Loader } from 'components/Loader';
import { HeroSection } from 'components/Molecules/HeroSection';
import { useUser } from 'context/userContext';
import { useCustomError } from 'hooks/accessTokenExpire';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FRACTION } from 'services/apiService';

const factions = [
    { type: "COMBAT", image: Images.COMBAT, bg: Images.COMBAT_BG, label: "COMBAT" },
    { type: "DIPLOMACY", image: Images.DIPLOMACY, bg: Images.DIPLOMACY_BG, label: "DIPLOMACY" },
    { type: "CRAFTING", image: Images.CRAFTING, bg: Images.CRAFTING_BG, label: "CRAFTING" },
    { type: "EXPLORATION", image: Images.EXPLORATION, bg: Images.EXPLORATION_BG, label: "EXPLORATION" },
  ];
  

function Fraction() {
    const [fraction, setFraction] = useState("");
    const [loading, setLoading] = useState(false);
    const { user }: any = useUser();

    const navigate = useNavigate();
    const { handleError } = useCustomError();


    // Using handleFraction to set the faction type.
    const handleFraction = async (type: string) => {
        setFraction(type);
    };

  // Using handleSetFraction to pass the fraction to backend.
  const handleSetFraction = async () => {
    try {
      setLoading(true);
      const response = await FRACTION({
        faction_type: fraction,
      });
      toast.success(`${fraction} Faction Selected`);
      setLoading(false);
      // setTimeout(() => {
      //   navigate("/dashboard", {
      //     state: { fraction: factions.filter((f) => f.type === fraction)},
      //   });
      // }, 1000);
    } catch (error: any) {
      setLoading(false);
      console.error("error:", error);
      // toast.error(error?.response?.data?.message)
      handleError(error);
    }
  };

    // useEffect(() => {
    //   if(user && user.Factions){
    //     // navigate("/dashboard");
    //   }
    // },[user])

  return (
    <div>
        {loading ? <Loader/> : 
        <HeroSection bgSrc={fraction ? factions.find((f) => f.type === fraction)?.bg : Images.COMBAT_BG} end={true}>
          <div className=''>
          <p className='text-text-primary font-bold text-center text-[18px]'>CHOOSE YOUR FACTION</p>
          <div className='flex gap-[32px] mt-6 pb-9' >
                {factions.map((faction) => (
                  <>
                  <div key={faction.type} 
                    className='flex flex-col items-center gap-[21px] cursor-pointer' 
                    onClick={() => handleFraction(faction.type)}
                  >
                    <div className={`w-[63px] h-[63px] flex items-center justify-center ${fraction === faction.type && 'border-[0.54px] border-green-300 rounded-full bg-img bg-[#141414]'}`}>
                      <img src={faction.image} alt={faction.type} className='w-[44px] h-[44px]' />
                    </div>
                    <p className={`${fraction === faction.type ? 'text-text-secondary ' : 'text-text-primary'} font-bold text-[8px]`}>{faction.label}</p>
                  </div>
                  </>
                ))}
            </div>
          </div>
            <div 
              className={`w-[134px] py-1 px-2 whitespace-nowrap text-[14px] 
              leading-7 font-semibold flex items-center justify-center
              text-text-primary bg-[rgba(0, 0, 0, 0.25)] border 
              border-solid border-white border-opacity-40 cursor-pointer rounded-3xl absolute bottom-10 right-[152px] bg-background-third ${!fraction ? 'opacity-50 pointer-events-none' : ''}`}
              onClick={() => (handleSetFraction())}
              >
                Confirm
              </div>
        </HeroSection>
        }
    </div>
  )
}

export default Fraction