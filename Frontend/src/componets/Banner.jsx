import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const navigate = useNavigate();

    return (
        <div className='flex flex-col-reverse md:flex-row bg-gradient-to-r from-blue-600 via-green-600 to-green-900 rounded-lg p-8 md:p-14 my-20 md:mx-10 relative'>
            {/* Left Side */}
            <div className='flex-1 text-center md:text-left py-8 sm:py-10 md:py-16 lg:py-24'>
                <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight'>
                    <span className='block'>Book Your <span className='text-yellow-300'>Appointment</span></span>
                    <span className='block mt-3'>With Trusted Doctors</span>
                </h1>
                <p className='text-gray-200 text-sm sm:text-base mt-4 leading-6 md:leading-7'>
                    Find experienced specialists near you and book appointments instantly. Your health is our priority.
                </p>
                <div className='mt-6 flex justify-center md:justify-start gap-4'>
                    <button 
                        onClick={() => { navigate('/login'); window.scrollTo(0, 0); }} 
                        className='bg-green-500 text-sm sm:text-base text-gray-800 px-6 py-3 rounded-full hover:scale-105 hover:shadow-lg transition-all'>
                        Create Account
                    </button>
                    <button 
                        onClick={() => { navigate('/about'); window.scrollTo(0, 0); }} 
                        className='bg-transparent border border-white text-sm sm:text-base text-white px-6 py-3 rounded-full hover:bg-white hover:text-blue-600 transition-all'>
                        Learn More
                    </button>
                </div>
            </div>

            {/* Right Side */}
            <div className='flex justify-center md:w-1/2 lg:w-[370px] relative'>
                <div className='relative'>
                    <img 
                        className='w-full max-w-md rounded-lg shadow-lg transform hover:scale-105 transition-all' 
                        src={assets.ladyforMoreremovebgpreview} 
                        alt="Doctor" 
                    />
                    <div 
                        className='absolute top-[-20px] right-[-20px] w-20 h-20 bg-yellow-300 rounded-full opacity-50 blur-xl'>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
