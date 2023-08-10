import React, { useRef } from 'react'
import './style.css'
export const RulesVertical = ({ size, pointX, pointY }) => {
  const rulerRefV = useRef(null)
  if (rulerRefV.current) {
    rulerRefV.current.style.transform = `translate(${pointX}px, ${pointY}px) `
    rulerRefV.current.style.background = 'red'
  }
  return (
    <div class="ruler" ref={rulerRefV}>
      {[...Array(20)].map((item, index) => {
        return (
          <div class="cm" key={index}>
            {(index - 5) * 400}
            {/* {Math.round(((index - 10) * 30) / size)} */}
            {[...Array(10)].map(() => {
              return <div class="mm"></div>
            })}
          </div>
        )
      })}
    </div>
  )
}
