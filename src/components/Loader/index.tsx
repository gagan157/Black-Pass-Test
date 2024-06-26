import { Images } from "assets/Images";
import React from "react";

export const Loader = () => {
    return (
      <div className="w-full h-full fixed inset-0 flex items-center justify-center">
        <div className="animate-spin rounded-full border-t-4 border-[#FAFAFA] border-solid h-12 w-12"></div>
      </div>
    );
  };

  export const FullLoader = () => {
    return (
      <div className=" w-full h-full fixed inset-0 flex items-center justify-center">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  };

  export const Smallloader = () => {
    return (
      <div className="h-12 w-12 absolute m-auto inset-0 flex items-center justify-center">
        <div className="animate-spin rounded-full border-t-4 border-[#FAFAFA] border-solid h-12 w-12"></div>
      </div>
    );
  };

  export const ShardsLoader = () => {
    return (
      <img src={Images.LOADER} alt="" className="animate-spin w-8 ease-linear"/> 
    );
  };


