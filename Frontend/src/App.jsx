import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import About from './pages/About'
import MyAppoiments from './pages/MyAppoiments'
import Login from './pages/Login'
import MyProfile from './pages/MyProfile'
import Contact from './pages/Contact'
import Appointment from './pages/Appointment'
import NavBar from './componets/NavBar'
import Footer from './componets/Footer'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]' >
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/MyAppoiments' element={<MyAppoiments />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/login' element={<Login />} />
        <Route path='/myprofile' element={<MyProfile />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App