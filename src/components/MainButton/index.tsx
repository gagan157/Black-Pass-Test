import React from 'react'
import './mainBtn.css'

export default function MainButton({text}:any) {
  return (
    <div className="wallet_div_t center">
      <div className="outer_circle center">
        <div className="inner_circle center">
          <div className="center_circle"></div>
        </div>
      </div>
      <p className="center_txt">{text}</p>
    </div>
  )
}
