import React, { useState, useEffect, useRef } from 'react'
import './style.css'
import Image from '../../img/test.avif'
import { RulesVertical } from '../Rules/RulesVertical'
import { RulesHorisontal } from '../Rules/RulesHorisontal'
export const ZoomableImage = () => {
  const [scale, setScale] = useState(1)
  const [panning, setPanning] = useState(false)
  const [pointX, setPointX] = useState(0)
  const [pointY, setPointY] = useState(0)
  const [start, setStart] = useState({ x: 0, y: 0 })
  const [mousePos, setMousePos] = useState({})
  const zoomRef = useRef(null)
  const infoRef = useRef(null)
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const handleMouseDown = (e) => {
    e.preventDefault()
    setStart({ x: e.clientX - pointX, y: e.clientY - pointY })
    setPanning(true)
  }

  const handleMouseUp = () => {
    setPanning(false)
  }

  const handleMouseMove = (e) => {
    if (!panning) {
      return
    }
    setPointX(e.clientX - start.x)
    setPointY(e.clientY - start.y)
    setTransform(e.clientX, e.clientY)
  }

  const handleWheel = (e) => {
    e.preventDefault()
    if (scale < 0.05) {
      setScale(0.05)
    }
    const xs = (e.clientX - pointX) / scale
    const ys = (e.clientY - pointY) / scale
    const delta = e.wheelDelta ? e.wheelDelta : -e.deltaY
    setScale((prevScale) => (delta > 0 ? prevScale + 0.02 : prevScale - 0.02))
    setPointX(e.clientX - xs * scale)
    setPointY(e.clientY - ys * scale)
    setTransform(e.clientX, e.clientY)
  }

  const setTransform = () => {
    if (zoomRef.current) {
      zoomRef.current.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`
    }

    if (infoRef.current) {
      infoRef.current.innerHTML = `Scale: ${scale.toFixed(2)}`
    }
  }

  return (
    <div className="zoom-outer">
      <div className="containerRules">
        <RulesHorisontal size={scale} pointY={pointY} pointX={0} />
        <RulesVertical size={scale} pointX={-2150 + pointX} pointY={0} />
        <div
          id="zoom"
          ref={zoomRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onWheel={handleWheel}
          style={{ cursor: panning ? 'grabbing' : 'grab' }}
        >
          <img src={Image} alt="zoom" className="image" />
        </div>
        <div id="info" ref={infoRef}></div>
      </div>
    </div>
  )
}

export default ZoomableImage
