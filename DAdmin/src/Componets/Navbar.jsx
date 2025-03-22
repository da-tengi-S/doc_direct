// import React, { useContext } from 'react';
// import { assets } from '../assets/assets_admin/assets';
// import { AdminContext } from '../context/AdminContext';
// import { useNavigate } from 'react-router-dom';
// import { DoctorContext } from '../context/DoctorContext';

// const Navbar = () => {
//     const { aToken, setaToken } = useContext(AdminContext);
//     const { dToken, setDtoken } = useContext(DoctorContext);
    
//     const navigate = useNavigate()

//     const logout = ()  =>{
//         navigate('/')
//         aToken && setaToken('')
//         dToken && setDtoken('')
//         aToken && localStorage.removeItem('aToken')
//         dToken && localStorage.removeItem('dToken')
//     }

//     return (
//         <div className='flex justify-between items-center px-4 sm:px-10 py-6 border-b bg-gradient-to-r from-gray-400 to-gray-500'>
//             <div className='flex items-center gap-2 text-xs'>
//                 <img className='w-20 sm:w-30 cursor-pointer' src={assets.logo1} alt="Admin Logo" />
//                 {/* <p className='border px-2.5 py-0.5 rounded-full border-green-800 text-purple-700'>{aToken ? 'Admin' : 'Doctor'}</p> */}
//             </div>
//             {/* <button onClick={logout} className='bg-primary text-white text-sm px-10 py-2 rounded-full'>Logout</button> */}
//             <p className='bg-green-500 border px-10 py-2 rounded-full border-green-900 text-black-700'>{aToken ? 'Admin' : 'Doctor'}</p>
//         </div>
//     );
// };

// export default Navbar;

import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets_admin/assets';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';
import { Search, Bell, User } from 'lucide-react';

const Navbar = () => {
    const { aToken, setaToken  } = useContext(AdminContext);
    const { dToken, setDtoken } = useContext(DoctorContext);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const userData = dToken ? { name:"" } : null;

    const logout = () => {
        navigate('/');
        aToken && setaToken('');
        dToken && setDtoken('');
        aToken && localStorage.removeItem('aToken');
        dToken && localStorage.removeItem('dToken');
    };

    return (
        <div className='flex justify-between items-center px-4 sm:px-10 py-6 border-b bg-gradient-to-r from-gray-400 to-gray-500'>
            <div className='flex items-center gap-2 text-xs'>
                <img className='w-20 sm:w-30 cursor-pointer' src={assets.logo1} alt="Admin Logo" />
            </div>
            
            {/* Search Bar */}
           
            
            {/* Icons */}
            <div className='flex items-center gap-5'>
            <div className='flex items-start bg-white px-10 py-2 rounded-full shadow-md'>
                <Search className='w-5 h-5 text-gray-600 mr-2' />
                <input 
                    type='text' 
                    placeholder='Search...' 
                    className='outline-none text-gray-700 w-48 sm:w-64'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            
                <Bell className='w-6 h-6 text-white cursor-pointer' />
                {/* <User  className='w-6 h-6 text-white cursor-pointer' /> */}
                {dToken && userData && (
                    <div className='flex items-center gap-2 cursor-pointer'>
                        <User className='w-6 h-6 text-white' />
                        <span className='text-white text-sm'>{userData.name}</span>
                    </div>
                )}
                {/* <p className='bg-green-500 border px-10 py-2 rounded-full border-green-900 text-black-700'>{aToken ? 'Admin' : 'Doctor '}</p> */}
                <p className='bg-green-500 border px-10 py-2 rounded-full border-green-900 text-black-700'>
  {aToken ? 'Admin' : `Doctor ${userData.name}`}
</p>

            </div>
        </div>
    );
};

export default Navbar;

