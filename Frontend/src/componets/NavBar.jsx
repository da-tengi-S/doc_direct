import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
const NavBar = () => {
    const navigate = useNavigate();
    const [showMenu, setShowmenu] = useState(false)
    // const [token, setToken] = useState(true)
    const {token, setToken} = useContext(AppContext)

    const logout = () =>{
        setToken(false)
        localStorage.removeItem('token')
    }

    return (
        <div className='flex item-center justify-between text-sm py-4 border-b border-b-gray-400'>
            <img onClick={() => navigate('/')} src={assets.logo1} alt="" className="w-30 h-20 cursor-pointer bg-white-300 transition-transform duration-200 hover:scale-110 hover:opacity-90 active:scale-95" />
            <ul className='hidden md:flex items-start gap-5 font-medium'>
                <NavLink to='/'>
                    <li className='py-1'>Home</li>
                    <hr className='boder-none outline-non h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/doctors'>
                    <li className='py-1'>All Doctors</li>
                    <hr className='boder-none outline-non h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/about'>
                    <li className='py-1'>About</li>
                    <hr className='boder-none outline-non h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/contact'>
                    <li className='py-1'> Contact</li>
                    <hr className='boder-none outline-non h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
            </ul>
            <div className='flext item-center gap-4'>
                {
                    token
                        ? <div className='flex item-center  gap-2 group relative curser-pointer'>
                            <img className='w-8 rounded-full' src={assets.profile_pic} alt="" />
                            <img className='w-2.5' src={assets.dropdown_icon} alt="" />
                            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                                    <p onClick={() => navigate('/myprofile')} className='hover:text-black curser-pointer '>My Profile</p>
                                    <p onClick={() => navigate('/MyAppoiments')} className='hover:text-black curser-pointer  '>My Appointment</p>
                                    <p onClick={logout} className='hover:text-black curser-pointer '>Logout</p>
                                </div>
                            </div>
                        </div>
                        : <button onClick={() => navigate("/login")} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create account </button>
                }
                <img onClick={() => setShowmenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
                {/* mobile menu */}
                <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>

                    <div className='flex items-center justify-between px-5 py-6 '>
                        <img className='mb-3 w-40' src={assets.logo1} alt="" />
                        <img className='w-7' onClick={() => setShowmenu(false)} src={assets.cross_icon} alt="" />
                    </div>
                    <ul className='flex flex-col items-center gap-2 mt-5 text-lg font-medium '>
                        <NavLink
                            className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-all"
                            onClick={() => setShowmenu(false)}
                            to="/"
                        ><p>Home</p>

                        </NavLink>
                        <NavLink
                            className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-all"
                            onClick={() => setShowmenu(false)}
                            to="/doctors"
                        >
                            <p>Doctors</p>

                        </NavLink>
                        <NavLink
                            className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-all"
                            onClick={() => setShowmenu(false)}
                            to="/about"
                        >
                            <p>About</p>

                        </NavLink>
                        <NavLink
                            className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-all"
                            onClick={() => setShowmenu(false)}
                            to="/contact"
                        ><p>Contact</p>

                        </NavLink>

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavBar