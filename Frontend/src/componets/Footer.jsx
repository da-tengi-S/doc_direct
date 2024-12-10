import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate , NavLink} from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                <div>
                    {/* left */}
                    <img className='mb-5 w-40' src={assets.logo1} alt="" />
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, rem maiores dolores in voluptates deleniti natus error incidunt exercitationem architecto ipsum, qui eius tempora odit at? Nihil vitae aut totam!
                    </p>
                </div>

                <div>
                    {/* middle */}
                    <p className='text-xl font-medium mb-5'>Company</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>

                        <NavLink to='/'>
                        <li className='curser-pointer' >Home</li>
                        </NavLink>
                        
                        <NavLink to='/about'>
                        <li >About us</li>
                        </NavLink>

                        <NavLink to='/contact'>
                        <li >Contact us</li>

                        </NavLink>
                        <li>Privacy policy</li>
                    </ul>
                </div>

                <div>
                    {/* right */}
                    <p className='text-xl font-medium mb-5'>Get in Touch</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>123456789</li>
                        <li>tenzi77@doc_directgmail.com</li>
                    </ul>
                </div>
            </div>
            {/* copy right */}
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2024 @ Doc-Direct - All Rights Reserved.</p>
            </div>
        </div>
    );
};

export default Footer;
