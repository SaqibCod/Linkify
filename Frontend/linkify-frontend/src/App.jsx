import { useState } from 'react'
import './App.css'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Register from './components/Register'
import About from './components/About'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Login from './components/Login'
import DashboadLayout from './components/dashboad/DashboadLayout'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
      <BrowserRouter>
      <Navbar />
      <Toaster/>
      <Routes>
        <Route path='' element={<LandingPage/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboad' element={<DashboadLayout/>}/>

        <Route />
      </Routes>
      <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
