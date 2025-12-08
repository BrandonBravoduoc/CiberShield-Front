import { useState } from 'react'
import {Routes, Route, useLocation} from 'react-router-dom'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (<div className="App">
    <h1>Welcome to CiberShield</h1>
  </div>
  )
}

export default App
