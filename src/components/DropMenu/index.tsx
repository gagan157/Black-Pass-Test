import React from 'react'

function DropMenu({actions, toggleMenu}: any) {
  return (
    <div className="absolute bg-[#181818] rounded-lg  text-text-primary p-3 w-[200px] mt-3 z-30 right-32">
        {actions.map(({action, key}: any, index: any) => (
            <p 
                key={index} 
                className="border-b-[0.75px] border-b-lightprimary py-2 hover:cursor-pointer"
                onClick={(e) => {
                    e.stopPropagation();
                    toggleMenu(key);
                }}
            >
                {action}
            </p>
        ) )}
    </div>
  )
}

export default DropMenu;