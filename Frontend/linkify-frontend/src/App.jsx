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
import { getApps } from './utils/helper'
import { ThemeProvider } from './contextApi/ThemeContext'

function App() {

  const  CurrentApp = getApps();
  return (
    <BrowserRouter>
      <ThemeProvider>
      <CurrentApp />
      </ThemeProvider>
    </BrowserRouter>
    
  )
}

export default App
