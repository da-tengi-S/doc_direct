
import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets_admin/assets';
import { useNavigate } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';

const Sidebar = () => {
  // const { aToken } = useContext(AdminContext);
  // const { dToken } = useContext(DoctorContext);

  const { aToken, setaToken } = useContext(AdminContext);
  const { dToken, setDtoken } = useContext(DoctorContext);
  
  const navigate = useNavigate()

  const logout = ()  =>{
      navigate('/')
      aToken && setaToken('')
      dToken && setDtoken('')
      aToken && localStorage.removeItem('aToken')
      dToken && localStorage.removeItem('dToken')
  }


  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-500 to-gray-500 text-white shadow-lg border-r-4 border-l-4 border-green-500">

      {aToken && (
        <ul className="mt-7 space-y-4 ">
          {[
            { to: "admin-dashboard", icon: assets.home_icon, label: "Dashboard" },
            { to: "AllApoitment", icon: assets.appointment_icon, label: "Appointments" },
            { to: "DoctorApproval", icon: assets.add_icon, label: "Varify Doctor" },
            { to: "doctor-list", icon: assets.people_icon, label: "Doctor List" },
            { to: "setting", icon: assets.setting, label: "Setting" },
            { to: "notification", icon: assets.Mnotification, label: "Notification " },
            // { to: "analytics", icon: assets.Mnotification, label: "Analytics " },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 mx-4 rounded-lg transition-all duration-300 transform ${
                  isActive
                    ? 'bg-green-500 text-black scale-105 shadow-md'
                    : 'hover:bg-white/20 hover:scale-105'
                }`
              }
            >
              <img src={item.icon} alt={`${item.label} Icon`} className="w-6 h-6" />
              <span className="font-semibold">{item.label}</span>
            </NavLink>
          ))}
        </ul>
      )}

{dToken && (
        <ul className="mt-7 space-y-4">
          {[
            { to: "DocDashbaord", icon: assets.home_icon, label: "Dashboard" },
            { to: "DoctorAppointment", icon: assets.appointment_icon, label: "Appointments" },
            { to: "addDoctor", icon: assets.add_icon, label: "Add Request" },
            { to: "setting", icon: assets.setting, label: "Setting " },
            { to: "doctor-profile", icon: assets.prifileIcon, label: "Profile " },
            { to: "notification", icon: assets.Mnotification, label: "Notification " },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 mx-4 rounded-lg transition-all duration-300 transform ${
                  isActive
                  ? 'bg-green-500 text-black scale-105 shadow-md'
                    : 'hover:bg-white/20 hover:scale-105'
                }`
              }
            >
              <img src={item.icon} alt={`${item.label} Icon`} className="w-6 h-6" />
              <span className="font-semibold">{item.label}</span>
            </NavLink>
          ))}
        </ul>
      )}

      <div className='p-10 h-5 mt-20'>
      <button onClick={logout} className='bg-red-500 text-white text-sm px-10 py-2 rounded-full'>Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
