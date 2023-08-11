import React, { useRef } from 'react'
import './style.css'
export const RulesVertical = ({ size, pointX, pointY }) => {
  const rulerRefV = useRef(null)
  const mmRef = useRef(null)
  if (rulerRefV.current) {
    rulerRefV.current.style.transform = `translate(${pointX}px, ${pointY}px) `
  }
  return (
    <div class="ruler" ref={rulerRefV}>
      {[...Array(20)].map((_, index) => {
        return (
          <div className="cm" key={index}>
            {(index - 5) * 400}
            {[...Array(10)].map((_, index1) => {
              return <div className="mm" ref={mmRef} key={index1}></div>
            })}
          </div>
        )
      })}
    </div>
  )
}
