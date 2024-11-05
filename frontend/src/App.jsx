import { useState } from 'react'
import AudioRecorder from './components/AudioRecorder.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
      <AudioRecorder />
    </div>
    </>
  )
}

export default App
