import { useState } from 'react'
import './App.css'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Register from './components/Register'
import About from './components/About'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='' element={<LandingPage/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/Register' element={<Register/>}/>
        <Route />
      </Routes>
      <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
