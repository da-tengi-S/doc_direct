import React, { useContext } from 'react';
import { assets } from '../assets/assets_admin/assets';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';

const Navbar = () => {
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
        <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
            <div className='flex items-center gap-2 text-xs'>
                <img className='w-20 sm:w-30 cursor-pointer' src={assets.logo1} alt="Admin Logo" />
                <p className='border px-2.5 py-0.5 rounded-full border-green-800 text-purple-700'>{aToken ? 'Admin' : 'Doctor'}</p>
            </div>
            <button onClick={logout} className='bg-primary text-white text-sm px-10 py-2 rounded-full'>Logout</button>
        </div>
    );
};

export default Navbar;
