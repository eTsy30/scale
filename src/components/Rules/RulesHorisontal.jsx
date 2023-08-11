import React, { useRef } from 'react'
import './style.css'
export const RulesHorisontal = ({ size, pointX, pointY }) => {
  const rulerRefH = useRef(null)
  if (rulerRefH.current) {
    rulerRefH.current.style.transform = `translate(${pointX}px, ${pointY}px) rotate(-90deg) scale(-1, -1) `
  }
  return (
    <div class="ruler" ref={rulerRefH}>
      {[...Array(20)].map((_, index) => {
        return (
          <div class="cm" key={index}>
            {(index - 5) * 400}
            {[...Array(10)].map(() => {
              return <div class="mm"></div>
            })}
          </div>
        )
      })}
    </div>
  )
}
