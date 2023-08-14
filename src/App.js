import './App.css'
import ZoomableImage from './components/ZoomaImage/ZoomableImage'

function App() {
  window.addEventListener('wheel', function (e) {
    e.preventDefault()
  })
  return (
    <div className="App">
      <ZoomableImage></ZoomableImage>
    </div>
  )
}

export default App
