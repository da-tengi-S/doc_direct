
import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets_admin/assets';
import { DoctorContext } from '../context/DoctorContext';

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-purple-600 text-white shadow-lg">
      {aToken && (
        <ul className="mt-7 space-y-4">
          {[
            { to: "admin-dashboard", icon: assets.home_icon, label: "Dashboard" },
            { to: "AllApoitment", icon: assets.appointment_icon, label: "Appointments" },
            { to: "DoctorApproval", icon: assets.add_icon, label: "Varify Doctor" },
            { to: "doctor-list", icon: assets.people_icon, label: "Doctor List" },
            { to: "setting", icon: assets.setting, label: "Setting " },
            { to: "notification", icon: assets.Mnotification, label: "Notification " },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 mx-4 rounded-lg transition-all duration-300 transform ${
                  isActive
                    ? 'bg-white text-blue-500 scale-105 shadow-md'
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
            { to: "DoctorProfile", icon: assets.setting, label: "Profile " },
            { to: "notification", icon: assets.Mnotification, label: "Notification " },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 mx-4 rounded-lg transition-all duration-300 transform ${
                  isActive
                    ? 'bg-white text-blue-500 scale-105 shadow-md'
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
    </div>
  );
};

export default Sidebar;
