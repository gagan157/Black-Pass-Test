import { Images } from 'assets/Images'
import card from '../../assets/resources/Card.svg'
import vImage from '../../assets/resources/Line.svg'
import bottomLIcon from '../../assets/resources/bottimCurve.svg'
import lIcon from '../../assets/resources/lImage.svg'
import leftArrow from '../../assets/resources/leftArrow.svg'
import leftGlowArrow from '../../assets/resources/leftGlowArror.svg'
import rightArrow from '../../assets/resources/rightArrow.svg'
import Accordion from '../../components/Accordion/accordion.tsx'
import MainButton from '../../components/MainButton'
import NftCard from '../../components/NftCard/nftCard.tsx'
import './landingPahe.css'

export default function LandingPage() {
    

  return (
    <div className='landing_page'>
        <p className='welcome_text text-[30px] sm:text-[40px] pt-[90px] sm:pt-[130px] sm:pb-[44px] pb-[20px] md:text-[60px] '>
        WELCOME TO ASTRA NOVA’S <br/> 
        IDENTITY AND LOYALTY PROGRAM
        </p>

        <div className='vImages_div'>
            <img src={vImage} alt="vImage" style={{width:"100%"}}/>
            {/* <VIMAGE style={{width:"100%"}}/> */}
        </div>

        {/* Card */}
        <div className='flex items-center justify-around px-[25px]'>
            <div className='flex flex-col items-start gap-8'>
                <p className='text-text-primary opacity-[75%] font-bold text-[12px] leading-5 font-sans'>
                    <span className='text-text-secondary'>The Black Pass</span> is a free platform that <br/>
                        gathers all your information within the <br/> 
                        Astra Nova RPG universe.
                </p>
                <MainButton text="claim yours" className="align-start"/>
            </div>

            <div>
                <img src={card} alt="card" className='m-auto -translate-y-[137px]'/>
            </div>

            <div className='text-text-primary flex font-bold text-[10px] opacity-[30%] gap-2'>
                <img src={leftArrow} alt="arrow"/>
                <p>SCROLL TO LEARN MORE</p>
                <img src={rightArrow} alt="arrow"/>
            </div>
        </div>
        
        {/* Questions */}
        <div className='flex items-center justify-center h-[395px] px-[25px]'>
            <div className='leading-10'>
                <div className='flex items-center'>
                    <img src={leftGlowArrow} alt="img" className='w-[22px] h-[17px]'/>
                    <p className='text-text-primary uppercase font-bold md:text-[35px] sm:text-[25px]'>
                        Complete multiple quests
                    </p>
                </div>
                <p className='text-text-primary uppercase font-bold md:text-[35px] sm:text-[25px]'>
                    and collect as many shards as <br/>
                    you can.
                </p>
                <img src={lIcon} alt="img"/>
            </div>

            <div className='leading-5 flex flex-col items-center translate-y-[70px]'>
                <div className=''>
                    <p className='text-text-primary text-[12px] opacity-[75%] font-sans'>
                        This pass serves as a platform to store and redeem rewards, such as <br/>
                        Shards through task completion and social quests. During the game  <br/>
                        demo stage, you can accumulate Shards to later convert them into <br/>
                        $RVV (Revive Token).
                    </p>
                    <p className='text-text-primary text-[12px] opacity-[75%] font-sans translate-y-[44px]'>
                        Think of the Black Pass as a digital profile within Astra Nova, <br/>
                        preserving a player's on-chain achievements indefinitely.<span className='text-text-secondary font-bold'> Only Black <br/>
                        Pass holders will have access to claim the upcoming $RVV Airdrop. </span>
                    </p>
                </div>
                    
                    <img src={bottomLIcon} alt="img" className='-translate-y-[2px]'/>
            </div>
        </div>
        
        {/* Steps */}
        <div className='flex flex-col gap-[78px] my-[95px]'>
            <div className='relative w-[110px] h-[16px] ml-[40px] md:ml-[40px]  lg:ml-[162px] flex text-center'>
                <div className="top left"></div>
                <div className="bottom right"></div>
                <p className='uppercase text-[#FAFAFABF] text-[10px] bg-[#FAFAFA0D] w-[110px]'>step by step</p>
            </div>
            <p className='uppercase font-bold md:text-[35px] leading-10 text-text-primary ml-[40px] md:ml-[40px] lg:ml-[162px] sm:text-[25px] text-[20px]'>how to get the black pass</p>
            <div>
                <img src={Images.HLINE} alt="img" className='w-full'/>

                <div className='flex justify-around -mt-8'>
                    {/* first */}
                    <div className='flex flex-col items-center text-center gap-4'>
                            <div className='w-[63px] h-[63px] border-[0.54px] border-green-300 rounded-full flex items-center justify-center bg-img bg-[#141414]'>
                                <p className='font-bold text-[18px] text-text-primary leading-5'>01</p>
                            </div>
                        
                        <p className='uppercase font-bold text-[18px] text-text-primary leading-5'>Connect a <br/> Wallet</p>
                        <p className='text-[12px] text-text-primary leading-5 opacity-[75%] font-sans'>If you don’t have one, create it <span className='text-text-secondary underline cursor-pointer'><a href='https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn' target="_blank" rel="noopener noreferrer">here</a> </span>.</p>
                    </div>
    
                    {/* second */}
                    <div className='flex flex-col items-center text-center gap-4'>
                        <div className='w-[63px] h-[63px] border-[0.54px] border-green-300 rounded-full flex items-center justify-center bg-img bg-[#141414]'>
                            <p className='font-bold text-[18px] text-text-primary leading-5'>02</p>
                        </div>
                        <p className='uppercase font-bold text-[18px] text-text-primary leading-5'>Mint the <br/> Black pass</p>
                        <p className='text-[12px] text-text-primary leading-5 opacity-[75%] font-sans'>
                            Black Pass is a non-transferable Soulbound <br/>
                            Token (SBT) associated with your wallet and <br/>
                            will be forever in your wallet.To ensure a <br/>
                            smooth onboarding experience to the Hedera <br/>
                            Ecosystem, we are gifting you 1 HBAR.
                        </p>
                    </div>
    
                    {/* third */}
                    <div className='flex flex-col items-center text-center gap-4'>
                        <div className='w-[63px] h-[63px] border-[0.54px] border-green-300 rounded-full flex items-center justify-center bg-img bg-[#141414]'>
                            <p className='font-bold text-[18px] text-text-primary leading-5'>03</p>
                        </div>
                        <p className='uppercase font-bold text-[18px] text-text-primary leading-5'>Begin <br/> your journey</p>
                        <p className='text-[12px] text-text-primary leading-5 opacity-[75%] font-sans'>Start participating in the quests and collecting <br/> your rewards.</p>
                    </div>
                </div>
            </div>
            
        </div>

        {/* NftCards */}
        <div className='flex flex-col gap-8 md:gap-[58px] my-[95px]'>
            <div className='relative w-[110px] h-[16px] ml-[40px] md:ml-[40px]  lg:ml-[162px] flex text-center'>
                <div className="top left"></div>
                <div className="bottom right"></div>
                <p className='uppercase text-[#FAFAFABF] text-[10px] bg-[#FAFAFA0D] w-[110px]'>THE BENEFITS</p>
            </div>
            <p className='uppercase font-bold md:text-[35px] sm:text-[25px] text-[20px] leading-10 text-text-primary ml-[40px] md:ml-[40px]  lg:ml-[162px]'>BENEFITS OF HAVING THE BLACK PASS</p>

            <div className='grid grid-cols-1 m-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ml-[40px] md:ml-[40px] lg:ml-[162px] gap-5'>
                <NftCard/>
                <NftCard/>
                <NftCard/>
                <NftCard/>
            </div>
        </div>

        <div>
            <p className='uppercase font-bold md:text-[35px] sm:text-[25px] text-[20px] leading-10 text-text-primary ml-[40px] sm:ml-[40px] lg:ml-[162px] mb-[30px] md:mb-[65px]'>FREQUENTLY ASKED QUESTIONS</p>
            <Accordion/>
        </div>

        {/* footer */}
        <div className='flex flex-col sm:flex-row items-center justify-around mt-[83px] gap-4'>
            <div className='flex gap-[20px] sm:gap-[20px] md:gap-[30px] lg:gap-[70px]'>
                <p className='text-[#FAFAFA4D] font-bold text-[10px]'>COPYRIGHT 2023</p>
                <p className='text-[#FAFAFA80] font-bold text-[10px] cursor-pointer'>TERMS AND CONDITIONS</p>
                <p className='text-[#FAFAFA80] font-bold text-[10px] cursor-pointer'>PRIVACY POLICY</p>
            </div>
            <div className='flex items-center sm:gap-[10px] md:gap-[15px] lg:gap-[23px] gap-[23px]'>
                <img src={Images.SOCIAL} alt="img" className='w-[13px] h-[7px] opacity-[75%] cursor-pointer'/>
                <img src={Images.TWITTER} alt="img" className='w-[17px] h-[14px] opacity-[75%] cursor-pointer'/>
                <img src={Images.INSTA} alt="img" className='w-[16px] h-[16px] opacity-[75%] cursor-pointer'/>
                <img src={Images.TELIGRAM} alt="img" className='w-[16px] h-[16px] opacity-[75%] cursor-pointer'/>
                <img src={Images.DISCORD} alt="img" className='w-[17px] h-[13px] opacity-[75%] cursor-pointer'/>
                <img src={Images.RADDIT} alt="img" className='w-[16px] h-[16px] opacity-[75%] cursor-pointer'/>
                <img src={Images.LINKEDIN} alt="img" className='w-[15px] h-[15px] opacity-[75%] cursor-pointer'/>
                <img src={Images.FACEBOOK} alt="img" className='w-[16px] h-[16px] opacity-[75%] cursor-pointer'/>
            </div>
        </div>

    </div>
  )
}
