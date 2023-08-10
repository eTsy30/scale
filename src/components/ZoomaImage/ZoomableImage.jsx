import React, { useState, useEffect, useRef } from 'react'
import './style.css'
import Image from '../../img/test.avif'
import { Rules, RulesVertical } from '../Rules/RulesVertical'
import { RulesHorisontal } from '../Rules/RulesHorisontal'
export const ZoomableImage = () => {
  const [scale, setScale] = useState(1)
  const [panning, setPanning] = useState(false)
  const [pointX, setPointX] = useState(0)
  const [pointY, setPointY] = useState(0)
  const [start, setStart] = useState({ x: 0, y: 0 })
  const [mousePos, setMousePos] = useState({})
  const whdth = window.innerWidth
  const height = window.innerHeight

  //////

  const imageRef = useRef(null)

  const handleButtonClick = () => {
    const scaledWidth = imageRef.current.offsetWidth
    const scaledHeight = imageRef.current.offsetHeight

    console.log(`Scaled Width: ${scaledWidth}px`)
    console.log(`Scaled Height: ${scaledHeight}px`)
  }

  //////
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

  const setTransform = (cursorX, cursorY) => {
    handleButtonClick()

    const zoom = document.getElementById('zoom')
    zoom.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`
    console.log(zoom, 'zoom')
    const info = document.getElementById('info')
    info.innerHTML = `Scale: ${scale.toFixed(
      2
    )}, Cursor: (${cursorX}, ${cursorY}), translate: (${pointX}, ${pointY}),mouse position (${
      mousePos.x
    }, ${mousePos.y})`

    // const cursorRange = document.getElementById('cursor-range')
    // cursorRange.value = cursorX
  }

  return (
    <div className="zoom-outer">
      <div className="containerRules">
        <RulesHorisontal size={scale} pointY={0} pointX={0} />
        <RulesVertical size={scale} pointX={-2200 + pointX} pointY={0} />
        {/* -3307 +  */}
        {/* 
        <input
          className="horisontal"
          id="cursor-range"
          type="range"
          min={whdth * -1}
          max={whdth}
          value={pointX}
          step="3"

          // onChange={handleRangeChangeX}
        />
        <input
          className="vertical"
          id="cursor-range"
          type="range"
          min={0}
          max={height}
          step="1"
          value={pointY}

          // onChange={handleRangeChangeY}
        /> */}
        <div
          id="zoom"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onWheel={handleWheel}
          style={{ cursor: panning ? 'grabbing' : 'grab' }}
        >
          <img src={Image} alt="zoom" className="image" ref={imageRef} />
        </div>
        <div
          id="info"
          style={{
            position: 'fixed',
            top: '10px',
            left: '10px',
            background: 'white',
            padding: '5px',
            border: '1px solid black',
          }}
        ></div>
      </div>
    </div>
  )
}

export default ZoomableImage
