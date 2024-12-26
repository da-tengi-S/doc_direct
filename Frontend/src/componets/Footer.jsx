import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate, NavLink } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer className='bg-blue-100 y-6 text-gray-900'>
            <div className='container mx-auto px-6 py-1'>
                {/* Main content */}
                <div className='flex flex-col md:grid grid-cols-[3fr_1fr_1fr] gap-10 py-10'>
                    {/* Left Section */}
                    <div>
                        <img className='mb-5 w-40' src={assets.logo1} alt="Logo" />
                        <p className='w-full md:w-3/4 text-gray-600 leading-6'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, rem maiores dolores in voluptates deleniti natus error incidunt exercitationem architecto ipsum, qui eius tempora odit at? Nihil vitae aut totam!
                        </p>
                    </div>

                    {/* Middle Section */}
                    <div>
                        <p className='text-xl font-semibold mb-5'>Company</p>
                        <ul className='flex flex-col gap-3'>
                            <li>
                                <NavLink to='/' className='hover:text-blue-600 transition-colors'>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/about' className='hover:text-blue-600 transition-colors'>
                                    About Us
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/contact' className='hover:text-blue-600 transition-colors'>
                                    Contact Us
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/privacy-policy' className='hover:text-blue-600 transition-colors'>
                                    Privacy Policy
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Right Section */}
                    <div>
                        <p className='text-xl font-semibold mb-5'>Get in Touch</p>
                        <ul className='flex flex-col gap-3'>
                            <li>Phone: <span className='text-gray-900'>123-456-789</span></li>
                            <li>Email: <span className='text-blue-600 hover:underline'>tenzi77@doc_directgmail.com</span></li>
                        </ul>
                        <div className='mt-5'>
                            <p className='mb-3'>Follow Us:</p>
                            <div className='flex gap-3'>
                                <a href="#" className='w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-full hover:bg-blue-700'>
                                    F
                                </a>
                                <a href="#" className='w-8 h-8 bg-blue-400 text-white flex items-center justify-center rounded-full hover:bg-blue-500'>
                                    T
                                </a>
                                <a href="#" className='w-8 h-8 bg-red-600 text-white flex items-center justify-center rounded-full hover:bg-red-700'>
                                    G
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className='mt-10'>
                    <hr />
                    <p className='text-center py-5 text-sm text-gray-600'>
                        © 2024 Doc-Direct - All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;