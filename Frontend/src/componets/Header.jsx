import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
    return (
        <div className="relative bg-gradient-to-b from-purple-800 via-indigo-700 to-purple-900 text-white py-10 md:py-20 px-6 md:px-16 lg:px-24 rounded-xl shadow-lg">
            {/* Container */}
            <div className="flex flex-col-reverse md:flex-row items-center gap-8">
                {/* Image Section */}
                <div className="md:w-1/2 flex justify-center relative">
                    <img 
                        className="w-3/4 md:w-full rounded-xl transform hover:scale-105 transition-transform duration-300 shadow-lg" 
                        src={assets.headerdoctors} 
                        alt="Doctors" 
                    />
                    {/* Decorative Glow */}
                    <div className="absolute w-48 h-48 bg-gradient-to-r from-pink-500 to-purple-500 opacity-30 blur-3xl rounded-full top-10 right-10 pointer-events-none"></div>
                </div>
                
                {/* Text Section */}
                <div className="md:w-1/2 text-center md:text-left space-y-6">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                        Your Health, <span className="text-yellow-400">Your Choice</span>
                    </h1>
                    <p className="text-lg md:text-xl font-light text-gray-200">
                        Connect with expert doctors and book your appointments easily. 
                        Experience hassle-free healthcare tailored to your needs.
                    </p>
                    <div className="flex justify-center md:justify-start gap-4 items-center">
                        <img className="w-20 md:w-24 rounded-full border-4 border-yellow-400" src={assets.group_profiles} alt="Group Profiles" />
                        <p className="text-gray-300 text-sm md:text-base">
                            Trusted by thousands. Offering professional care for every patient.
                        </p>
                    </div>
                    <a 
                        href="#speciality" 
                        className="inline-block bg-green-400 text-gray-800 px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                        Book Appointment
                        <img 
                            className="inline-block ml-2 w-4 h-4" 
                            src={assets.arrow_icon} 
                            alt="Arrow Icon" 
                        />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Header;
