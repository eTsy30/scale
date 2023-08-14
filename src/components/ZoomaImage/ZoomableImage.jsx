import React, { useState, useEffect, useRef } from 'react'
import './style.css'
import Image from '../../img/i.webp'
import { RulesVertical } from '../Rules/RulesVertical'
import { RulesHorisontal } from '../Rules/RulesHorisontal'

export const ZoomableImage = () => {
  const SCALE_STEP = 0.02
  const MIN_SCALE = 0.05
  const [scale, setScale] = useState(1)
  const [panning, setPanning] = useState(false)
  const [pointX, setPointX] = useState(0)
  const [pointY, setPointY] = useState(0)
  const [start, setStart] = useState({ x: 0, y: 0 })
  const [mousePos, setMousePos] = useState({})
  const [touchPos, setTouchPos] = useState({})
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

  useEffect(() => {
    const handleTouchMove = (event) => {
      if (event.touches.length === 2) {
        const touch1 = event.touches[0]
        const touch2 = event.touches[1]
        const touchPos = {
          x: (touch1.clientX + touch2.clientX) / 2,
          y: (touch1.clientY + touch2.clientY) / 2,
        }
        setTouchPos(touchPos)
      }
    }

    window.addEventListener('touchmove', handleTouchMove)

    return () => {
      window.removeEventListener('touchmove', handleTouchMove)
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
    if (scale < MIN_SCALE) {
      setScale(MIN_SCALE)
    }
    const xs = (e.clientX - pointX) / scale
    const ys = (e.clientY - pointY) / scale
    const delta = e.wheelDelta ? e.wheelDelta : -e.deltaY
    setScale((prevScale) =>
      delta > 0 ? prevScale + SCALE_STEP : prevScale - SCALE_STEP
    )
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
  const handleTouchStart = (e) => {
    e.preventDefault()
    if (e.touches.length === 2) {
      setStart({
        x: (e.touches[0].clientX + e.touches[1].clientX) / 2 - pointX,
        y: (e.touches[0].clientY + e.touches[1].clientY) / 2 - pointY,
      })
      setPanning(true)
    }
  }

  const handleTouchEnd = () => {
    setPanning(false)
  }

  const handleTouchMove = (e) => {
    console.log(e)
    if (!panning) {
      return
    }
    e.preventDefault()
    if (scale < MIN_SCALE) {
      setScale(MIN_SCALE)
    }

    if (e.touches.length === 2) {
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const touchDistance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      )
      const scaleFactor = touchDistance.toString()[0]

      setScale((prevScale) =>
        scaleFactor > 1 ? prevScale + SCALE_STEP : prevScale - SCALE_STEP
      )

      const touchPos = {
        x: (touch1.clientX + touch2.clientX) / 2,
        y: (touch1.clientY + touch2.clientY) / 2,
      }

      setPointX(touchPos.x - start.x * SCALE_STEP)
      setPointY(touchPos.y - start.y * SCALE_STEP)
      setTransform(touchPos.x, touchPos.y)
    }

    const touchPos = {
      x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
      y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
    }

    setPointX(touchPos.x - start.x)
    setPointY(touchPos.y - start.y)
    setTransform(touchPos.x, touchPos.y)
  }
  return (
    <div className="zoom-outer">
      <div className="containerRules">
        <RulesHorisontal size={scale} pointY={pointY} pointX={-1970} />
        <RulesVertical size={scale} pointX={-2150 + pointX} pointY={0} />
        <div
          id="zoom"
          ref={zoomRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
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
