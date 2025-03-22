
// import React from 'react';
// import { Route, Routes } from 'react-router-dom';
// import Home from './pages/Home';
// import Doctors from './pages/Doctors';
// import About from './pages/About';
// import MyAppoiments from './pages/MyAppoiments';
// import Login from './pages/Login';
// import MyProfile from './pages/MyProfile';
// import Contact from './pages/Contact';
// import Appointment from './pages/Appointment';
// import NavBar from './componets/NavBar';
// import MedicalRecord from './pages/MedicalRecord';
// import Footer from './componets/Footer';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'

// const App = () => {
//   return (
//     <div>
//       <div className='mx-4 sm:mx-[10%]'>
//       <ToastContainer/>
//         <NavBar />
        
//         <Routes>
//           <Route path='/' element={<Home />} />
//           <Route path='/doctors' element={<Doctors />} />
//           <Route path='/doctors/:speciality' element={<Doctors />} />
//           <Route path='/contact' element={<Contact />} />
//           <Route path='/about' element={<About />} />
//           <Route path='/MyAppoiments' element={<MyAppoiments />} />
//           <Route path='/appointment/:docId' element={<Appointment />} />
//           <Route path='/login' element={<Login />} />
//           <Route path='/record' element={<MedicalRecord />} />
//           <Route path='/myprofile' element={<MyProfile />} />
//         </Routes>
//       </div>
//       <div className='w-full'>
//         <Footer />
//       </div>
//     </div>
//   );
// };

// // export default App;
// import React, { useState, useEffect } from 'react';
// import { Route, Routes } from 'react-router-dom';
// import Home from './pages/Home';
// import Doctors from './pages/Doctors';
// import About from './pages/About';
// import MyAppointments from './pages/MyAppoiments';
// import Login from './pages/Login';
// import MyProfile from './pages/MyProfile';
// import Contact from './pages/Contact';
// import Appointment from './pages/Appointment';
// import NavBar from './componets/NavBar';
// import MedicalRecord from './pages/MedicalRecord';
// import Footer from './componets/Footer';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './index.css'; // Import global styles

// const App = () => {
//   // Get theme from localStorage or set default to light
//   const getInitialTheme = () => localStorage.getItem("theme") || "light";

//   const [theme, setTheme] = useState(getInitialTheme);

//   // Apply theme to body and store it in localStorage
//   useEffect(() => {
//     document.body.className = theme;
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   return (
//     <div className={`${theme} min-h-screen`}>
//       <div className='mx-4 sm:mx-[10%]'>
//         <ToastContainer />
//         <NavBar theme={theme} setTheme={setTheme} />

//         <Routes>
//           <Route path='/' element={<Home />} />
//           <Route path='/doctors' element={<Doctors />} />
//           <Route path='/doctors/:speciality' element={<Doctors />} />
//           <Route path='/contact' element={<Contact />} />
//           <Route path='/about' element={<About />} />
//           <Route path='/MyAppointments' element={<MyAppointments />} />
//           <Route path='/appointment/:docId' element={<Appointment />} />
//           <Route path='/login' element={<Login />} />
//           <Route path='/record' element={<MedicalRecord />} />
//           <Route path='/myprofile' element={<MyProfile />} />
//         </Routes>
//       </div>
//       <div className='w-full'>
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default App;


import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import About from './pages/About';
import MyAppointments from './pages/MyAppoiments';
import Login from './pages/Login';
import MyProfile from './pages/MyProfile';
import Contact from './pages/Contact';
import Appointment from './pages/Appointment';
import NavBar from './componets/NavBar';
import MedicalRecord from './pages/MedicalRecord';
import Footer from './componets/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'; 
import Setting from './pages/Setting';

const App = () => {
  // List of accessible themes
  const themes = ["light", "dark", "high-contrast", "protanopia", "deuteranopia", "tritanopia"];
  
  // Get theme from localStorage or set default to light
  const getInitialTheme = () => localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(getInitialTheme);

  // Apply theme to body and store it in localStorage
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className={`${theme} min-h-screen`}>
      <div className='mx-4 sm:mx-[10%]'>
        <ToastContainer />
        <NavBar theme={theme} setTheme={setTheme} themes={themes} />

        <Routes>
        <Route path="/" element={<Home theme={theme} />} />
          {/* <Route path='/' element={<Home />} /> */}
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:speciality' element={<Doctors />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
          <Route path='/MyAppointments' element={<MyAppointments />} />
          <Route path='/setting' element={<Setting theme={theme} setTheme={setTheme} themes={themes} />} />
          <Route path='/appointment/:docId' element={<Appointment />} />
          <Route path='/login' element={<Login />} />
          <Route path='/record' element={<MedicalRecord />} />
          <Route path='/myprofile' element={<MyProfile />} />
        </Routes>
      </div>
      <div className='w-full'>
        <Footer />
      </div>
    </div>
  );
};

export default App;
