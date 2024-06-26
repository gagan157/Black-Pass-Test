import React, { useEffect } from 'react'
import { createPortal } from 'react-dom';

interface ModalProps{
blurImg ?: boolean;
children: React.ReactNode | any;
style?: React.CSSProperties;
}


export const Modal = ({ children , blurImg = false , style }: ModalProps) => {
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
          document.body.style.overflow = "unset";
        };
      }, []);
    return createPortal(
        <div
        className="fixed left-0 top-0 z-[9999] flex h-full w-full items-center justify-center "
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" , ...style}}
      >
        <div className={`max-h-[80%] overflow-y-auto rounded-xxl bg-background-blackmain ${blurImg ? "p-1" : " p-6"}  max-sm:w-4/5 `}>
          {children}
        </div>
      </div>,
      document.body
    )
}
