


import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets_admin/assets';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const { aToken, setaToken } = useContext(AdminContext);
  const { dToken, setDtoken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate('/');
    aToken && setaToken('');
    dToken && setDtoken('');
    aToken && localStorage.removeItem('aToken');
    dToken && localStorage.removeItem('dToken');
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-r from-gray-500 to-gray-500 text-white shadow-lg border-r-4 border-l-4 border-green-500 transition-all duration-300 ${isOpen ? 'w-64' : 'w-26'}`}>

      
      <div className="flex justify-end p-2">
        <button onClick={toggleSidebar} className="text-white hover:opacity-80">
          <img
            src={assets.menu}
            alt="Menu"
            className="w-6 h-6"
          />
        </button>
      </div>


      {/* Menu */}
      {(aToken || dToken) && (
        <ul className="mt-7 space-y-4">
          {(aToken ? [
            { to: "admin-dashboard", icon: assets.home_icon, label: "Dashboard" },
            { to: "AllApoitment", icon: assets.appointment_icon, label: "Appointments" },
            { to: "DoctorApproval", icon: assets.add_icon, label: "Verify Doctor" },
            { to: "doctor-list", icon: assets.people_icon, label: "Doctor List" },
            { to: "setting", icon: assets.setting, label: "Setting" },
            { to: "issue", icon: assets.Mnotification, label: "Issues " },
          ] : [
            { to: "DocDashbaord", icon: assets.home_icon, label: "Dashboard" },
            { to: "DoctorAppointment", icon: assets.appointment_icon, label: "Appointments" },
            { to: "addDoctor", icon: assets.add_icon, label: "Add Request" },
            { to: "setting", icon: assets.setting, label: "Setting" },
            { to: "doctor-profile", icon: assets.prifileIcon, label: "Profile" },
            { to: "doctornoti", icon: assets.Mnotification, label: "Notification" },
          ]).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-all duration-300 transform ${isActive ? 'bg-green-500 text-black scale-105 shadow-md' : 'hover:bg-white/40 hover:scale-105'
                }`
              }
            >
              <img src={item.icon} alt={`${item.label} Icon`} className="w-8 h-auto" />
              {isOpen && <span className="font-semibold">{item.label}</span>}
            </NavLink>
          ))}
        </ul>
      )}

      {/* Logout Button */}
      {isOpen && (
        <div className="p-10 mt-20">
          <button onClick={logout} className="bg-red-500 text-white text-sm px-10 py-2 rounded-full">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
