

// import React from 'react';
// import { assets } from '../assets/assets';
// import { useNavigate, NavLink } from 'react-router-dom';

// const Footer = () => {
//     const navigate = useNavigate();

//     return (
//         <footer className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 text-gray-50 py-7">
//             <div className="container mx-auto px-4">
//                 {/* Main content */}
//                 <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr_1fr] gap-8 py-2">
//                     {/* Left Section */}
//                     <div>
//                         <img
//                             className="mb-5 w-40 bg-white/60 rounded-tl-[300px] rounded-tr-[500px] rounded-bl-[300px] rounded-br-[500px]"
//                             src={assets.logo1}
//                             alt="Logo"
//                         />

//                         <p className="text-gray-200 text-medium leading-6">
//                             At Doc-Direct, we provide seamless solutions for <br />managing your appointments and healthcare needs. <br />Stay connected with us for updates and exceptional service.
//                         </p>
//                     </div>

//                     {/* Middle Section */}
//                     <div>
//                         <p className="text-lg font-semibold mb-5">Company</p>
//                         <ul className="flex flex-col gap-3">
//                             <li>
//                                 <NavLink to="/" className="hover:text-yellow-300 transition-colors">
//                                     Home
//                                 </NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/about" className="hover:text-yellow-300 transition-colors">
//                                     About Us
//                                 </NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/contact" className="hover:text-yellow-300 transition-colors">
//                                     Contact Us
//                                 </NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/privacy-policy" className="hover:text-yellow-300 transition-colors">
//                                     Privacy Policy
//                                 </NavLink>
//                             </li>
//                         </ul>
//                     </div>

//                     {/* Right Section */}
//                     <div>
//                         <p className="text-lg font-semibold mb-5">Get in Touch</p>
//                         <ul className="flex flex-col gap-3">
//                             <li>Phone: <span className="text-gray-100">123-456-789</span></li>
//                             <li>Email: <a href="mailto:tenzi77@doc_directgmail.com" className="text-yellow-300 hover:underline">tenzi77@doc_directgmail.com</a></li>
//                         </ul>
//                         <div className="mt-5">
//                             <p className="mb-3">Follow Us:</p>
//                             <div className="flex gap-3">
//                                 <a href="#" aria-label="Facebook" className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-full hover:bg-blue-700">
//                                     F
//                                 </a>
//                                 <a href="#" aria-label="Twitter" className="w-8 h-8 bg-blue-400 text-white flex items-center justify-center rounded-full hover:bg-blue-500">
//                                     T
//                                 </a>
//                                 <a href="#" aria-label="Google" className="w-8 h-8 bg-red-600 text-white flex items-center justify-center rounded-full hover:bg-red-700">
//                                     G
//                                 </a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Bottom Section */}
//                 <div className="mt-10">
//                     <hr className="border-gray-300 opacity-30" />
//                     <p className="text-center py-5 text-sm text-gray-200">
//                         © 2024 Doc-Direct - All Rights Reserved.
//                     </p>
//                 </div>
//             </div>
//         </footer>
//     );
// };

// export default Footer;


import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate, NavLink } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaGoogle } from 'react-icons/fa'; 

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer className="bg-gradient-to-r from-white-800  text-black py-12">
            <hr className="border-green-800 p-5 opacity-100" />
            <div className="container mx-auto px-4">
                {/* Main content */}
                <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr_1fr] gap-8 py-2">
                    {/* Left Section */}
                    <div>
                        <img
                            className="mb-5 w-40 bg-white/60 rounded-tl-[300px] rounded-tr-[500px] rounded-bl-[300px] rounded-br-[500px]"
                            src={assets.logo1}
                            alt="Logo"
                        />

                        <p className="text-black-200 text-base leading-6">
                            At Doc-Direct, we provide seamless solutions for managing your appointments and healthcare needs. Stay connected with us for updates and exceptional service.
                        </p>
                    </div>

                    {/* Middle Section */}
                    <div>
                        <p className="text-lg font-semibold mb-5">Company</p>
                        <ul className="flex flex-col gap-3">
                            <li>
                                <NavLink to="/" className="hover:text-yellow-300 transition-colors duration-300">
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/about" className="hover:text-yellow-300 transition-colors duration-300">
                                    About Us
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact" className="hover:text-yellow-300 transition-colors duration-300">
                                    Contact Us
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/privacy-policy" className="hover:text-yellow-300 transition-colors duration-300">
                                    Privacy Policy
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Right Section */}
                    <div>
                        <p className="text-lg font-semibold mb-5">Get in Touch</p>
                        <ul className="flex flex-col gap-3">
                            <li>Phone: <span className="text-black-100">123-456-789</span></li>
                            <li>Email: <a href="mailto:tenzi77@doc_directgmail.com" className="text-black-300 hover:underline transition-colors duration-300">tenzi77@doc_directgmail.com</a></li>
                        </ul>
                        <div className="mt-5">
                            <p className="mb-3">Follow Us:</p>
                            <div className="flex gap-3">
                                <a href="#" aria-label="Facebook" className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-full hover:bg-blue-700 transition-colors duration-300">
                                    <FaFacebook />
                                </a>
                                <a href="#" aria-label="Twitter" className="w-8 h-8 bg-blue-400 text-white flex items-center justify-center rounded-full hover:bg-blue-500 transition-colors duration-300">
                                    <FaTwitter />
                                </a>
                                <a href="#" aria-label="Google" className="w-8 h-8 bg-red-600 text-white flex items-center justify-center rounded-full hover:bg-red-700 transition-colors duration-300">
                                    <FaGoogle />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-10">
                    <hr className="border-green-800 opacity-100" />
                    <p className="text-center py-5 text-sm text-white-200">
                        © 2024 Doc-Direct - All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
