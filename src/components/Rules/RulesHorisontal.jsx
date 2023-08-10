import React, { useRef } from 'react'
import './style.css'
export const RulesHorisontal = ({ size, pointX, pointY }) => {
  const rulerRefH = useRef(null)
  console.log(pointX, pointY)
  if (rulerRefH.current) {
    rulerRefH.current.style.transform = `translate(${pointX}px, ${pointY} px)rotate(-90deg) scale(-1, -1) `
  }
  return (
    <div class="ruler" ref={rulerRefH}>
      {[...Array(10)].map((item, index) => {
        return (
          <div class="cm" key={index}>
            {Math.round((size / 10) * (index + 1))}
            {[...Array(10)].map(() => {
              return <div class="mm"></div>
            })}
          </div>
        )
      })}
    </div>
  )
}
