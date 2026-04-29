import { useState } from 'react'
import './App.css'

function App() {
  const [text, setText] = useState("hello CGU!!")

  const handleClick = () => {
    setText(prev => prev + " 被點了")
  }

  return (
    <div className="App">
      <h1 
        onClick={handleClick}
        style={{
          fontSize: '80px',
          color: 'red',
          textAlign: 'left',
          cursor: 'pointer',
          lineHeight:'1.2',
          wordBreak:'break-all'
        }}
      >
        {text}
      </h1>
    </div>
  )
}

export default App