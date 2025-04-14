import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <Routes>
        <Route path="/" element={<HomePage darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/dashboard" element={<Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />} />
      </Routes>
    </div>
  )
}

export default App 