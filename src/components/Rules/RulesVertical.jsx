import React, { useRef, useEffect } from 'react'
import './style.css'
export const RulesVertical = ({ size, pointX, pointY }) => {
  const INTERVAL_SIZE = 400
  const rulerRefV = useRef(null)
  const mmRef = useRef(null)
  useEffect(() => {
    if (rulerRefV.current) {
      rulerRefV.current.style.transform = `translate(${pointX}px, ${pointY}px) `
    }
  }, [pointX, pointY])

  return (
    <div class="ruler" ref={rulerRefV}>
      {[...Array(20)].map((_, index) => {
        return (
          <div className="ruler-cantimetr" key={index}>
            {(index - 5) * INTERVAL_SIZE}
            {[...Array(10)].map((_, index1) => {
              return (
                <div className="ruler-milimetr" ref={mmRef} key={index1}></div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
