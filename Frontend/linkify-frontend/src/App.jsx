import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import About from './components/About'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='' element={<LandingPage/>}/>
        <Route path='/About' element={<About/>}/>
        <Route />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
