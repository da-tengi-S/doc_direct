import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
    return (
        <div className='relative flex flex-col md:flex-row flex-wrap bg-gradient-to-r from-blue-700 via-green-700 to-green-900 rounded-lg px-6 md:px-10 lg:px-20'>
            {/* left side */}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-4 md:py-[10vw] md:mb-[-30px]'>
                <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold lg:leading-tight'>
                    Make an appointment <br />
                    With your Preferred Doctors
                </p>
                <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
                    <img className='w-28' src={assets.group_profiles} alt="" />
                    <p>Lorem ipsum dolor sit amet. Recusandae dolorem saepe cum quidem dolore amet molestiae quam quibusdam error.</p>
                    <br className='hidden sm:block' />
                </div>
                <a href="#speciality" className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>
                    Book appointment <img className='w-3' src={assets.arrow_icon} alt="" />
                </a>
            </div>
            {/* right side */}
            <div className='md:w-1/2 relative'>
                <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.headerdoctors} alt="" />
            </div>
            {/* Light effect in the right corner */}
            <div className='absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-full blur-2xl pointer-events-none'></div>
        </div>
    );
}

export default Header;
