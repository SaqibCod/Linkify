import Login from './components/Login'
import DashboadLayout from './components/dashboad/DashboadLayout'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import About from './components/About'
import Register from './components/Register'
import LandingPage from './components/LandingPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ShortenPage from './components/ShortenPage'
import PrivateRoute from './PrivateRoute'
import ErrorPage from './components/ErrorPage'

const AppRouter = () => {
    return (
        <>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path='' element={<LandingPage/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/register' element={<PrivateRoute publicPage={true} ><Register /></PrivateRoute>}/>
        <Route path='/login' element={<PrivateRoute publicPage={true} ><Login /></PrivateRoute>}/>
        <Route path='/dashboard' element={<PrivateRoute publicPage={false} ><DashboadLayout /></PrivateRoute>}/>
        <Route path='/error' element={<ErrorPage/>}/>
        <Route path='/*' element={<ErrorPage/>}/>


      </Routes>
      <Footer />
    </>
    )
}

export default AppRouter

export const SubDomainRouter = () => {
    return (
      <Routes>
         <Route path='/:url' element={<ShortenPage/>} />
      </Routes>
    )
}
