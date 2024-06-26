import React from "react";

export const ShowSwitchPopUp = ({handleSwitchChain}: any) => {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-[#0B0B0B] p-8 rounded shadow-lg w-[500px] h-[80vh] flex text-center items-center justify-center flex-col gap-7">
          {/* <div className="flex text-center justify-center flex-col gap-7"> */}
        <p className='text-text-primary font-bold text-center text-[18px] w-[400px]'>Black Pass is currently only available on Immutable zkEVM. Change networks to continue.</p>
          <div 
                className={`w-[200px] py-1 px-2 whitespace-nowrap text-[14px] 
                leading-7 font-semibold flex items-center justify-center
                text-text-primary bg-[rgba(0, 0, 0, 0.25)] border 
                border-solid border-white border-opacity-40 cursor-pointer rounded-3xl bg-background-third`}
                onClick={() => handleSwitchChain()}
                >
                  Switch Network
          </div>
        {/* </div> */}
        </div>
      </div>
    )
  }