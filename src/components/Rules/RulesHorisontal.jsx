import React, { useRef, useEffect } from 'react'
import './style.css'
export const RulesHorisontal = ({ size, pointX, pointY }) => {
  const rulerRefH = useRef(null)
  const INTERVAL_SIZE = 400
  useEffect(() => {
    if (rulerRefH.current) {
      rulerRefH.current.style.transform = `translate(${pointX}px, ${pointY}px) rotate(-90deg) scale(-1, -1) `
    }
  }, [pointX, pointY])

  return (
    <div class="ruler" ref={rulerRefH}>
      {[...Array(20)].map((_, index) => {
        return (
          <div class="ruler-cantimetr" key={index}>
            {(index - 5) * INTERVAL_SIZE}
            {[...Array(10)].map(() => {
              return <div class="ruler-milimetr"></div>
            })}
          </div>
        )
      })}
    </div>
  )
}
