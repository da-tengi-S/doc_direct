import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const NavBar = ({ theme, setTheme }) => {
    const navigate = useNavigate();
    const [showMenu, setShowmenu] = useState(false);
    const { token, setToken, userData } = useContext(AppContext);

    const logout = () => {
        setToken(false);
        localStorage.removeItem('token');
    };

    return (
        <div className='flex items-center justify-between text-medium gap-5 py-5 border-b border-b-gray-400 px-5'>
            {/* Logo */}
            <img onClick={() => navigate('/')} src={assets.logo1} alt="Logo" className="w-30 h-20 cursor-pointer transition-transform duration-200 hover:scale-110 hover:opacity-90 active:scale-95" />
            
            {/* Navigation Links Centered */}
            <ul className='hidden md:flex flex-1 justify-center gap-6 font-medium'>
                <NavLink to='/'><li className='py-1'>Home</li></NavLink>
                <NavLink to='/doctors'><li className='py-1'>All Doctors</li></NavLink>
                <NavLink to='/about'><li className='py-1'>About</li></NavLink>
                <NavLink to='/contact'><li className='py-1'>Contact</li></NavLink>
                <NavLink to='/record'><li className='py-1'>Health Log</li></NavLink>
            </ul>
            
            {/* Right Section with Search, Notification, and Profile */}
            <div className='flex items-center gap-2'>
                {/* Search Bar */}
                <div className='hidden md:flex items-center border border-gray-400 rounded-full px-2 py-2 bg-white min-w-[250px]'>
                    <input 
                        type='text' 
                        placeholder='Search...' 
                        className='w-full bg-transparent outline-none text-black' 
                    />
                    <img src={assets.Search} alt='Search' className='w-5 cursor-pointer' />
                </div>
                
                {/* Notification Icon */}
                <img src={assets.Mnotification} alt='Notifications' className='w-10 cursor-pointer p-1 rounded-full hover:bg-gray-200 transition-all' />
                
                {/* Profile Section */}
                {token && userData ? (
                    <div className="flex items-center gap-2 group relative cursor-pointer">
                        <img className="w-8 rounded-full" src={userData.image} alt="User" />
                        <img className='w-2.5' src={assets.dropdown_icon} alt="Dropdown" />
                        <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                            <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                                <p onClick={() => navigate('/myprofile')} className='hover:text-black cursor-pointer'>My Profile</p>
                                <p onClick={() => navigate('/MyAppointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                                <p onClick={() => navigate('/setting')} className='hover:text-black cursor-pointer'>Setting</p>
                                <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button onClick={() => navigate("/login")} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create account</button>
                )}
            </div>
        </div>
    );
};

export default NavBar;
