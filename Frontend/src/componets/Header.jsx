


import React from 'react';
import { assets } from '../assets/assets';

const Header = ({ theme }) => {
  return (
    <div className={`relative py-15 md:py-24 px-10 md:px-20 lg:px-22 rounded-2xl shadow-2xl transition-all duration-300 ease-in-out
            ${theme === "dark" ?
        "bg-black/20 border border-white/20" :
        "bg-white/10 border border-gray-200"} backdrop-blur-lg`}>

      {/* Container */}
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-20">
        {/* Text Section */}
        <div className="md:w-1/2 text-center md:text-left space-y-6 lg:space-y-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Your Health,
            </span>
            <span className="text-yellow-400"> Your Choice</span>
          </h1>
          <p className={`text-lg md:text-medium lg:text-medium italic text-gray-900 leading-relaxed 
                        ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            Connect with expert doctors and book your appointments easily.
            Experience hassle-free healthcare tailored to your needs.
          </p>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative group">
              <img
                className="w-full h-auto rounded-full border-2 border-yellow-400 hover:border-purple-500 
                                transition-all duration-300 cursor-pointer shadow-lg"
                src={assets.group_profiles}
                alt="Group Profiles"
              />
              <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <p className={`text-sm md:text-base ${theme === "dark" ? "text-gray-400" : "text-gray-900"}`}>
              Trusted by thousands worldwide. Offering professional care with 99% patient satisfaction rate.
            </p>
          </div>

          <a
            href="#speciality"
            className="inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-600 text-white 
                        px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] 
                        transition-all duration-300 group mt-2"
          >
            Book Appointment
            <svg
              className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 
                            transition-all duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>



        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center relative">
          <div className="relative flex items-start gap-6  duration-500">

            {/* First Image - Taller and Positioned Higher */}
            <div className="relative w-2/3 p-1 rounded-[3rem]  hover:shadow-2xl 
      transition-all duration-500 animate-float z-10">

              <div className="pl-12">
                <img
                  className="w-full h-70 rounded-[2.5rem] transform hover:scale-105 transition-transform duration-300 
    border-4 border-gray-300/50 hover:border-green-900 object-cover"
                  src={assets.header2}
                  alt=""
                />
              </div>

              {/* Image Badge */}
              <div className="absolute -top-5 -right-5 bg-yellow-500 text-gray-900 px-3 py-1 rounded-full 
        text-sm font-bold shadow-md animate-bounce flex items-center gap-1">
                <span>🔥 </span>
              </div>
            </div>

            {/* Second Image - Shorter & Overlapping */}
            <div className="relative w-2/5 bg-gradient-to-br from-yellow-400 to-green-500 p-1 rounded-3xl shadow-lg 
      hover:shadow-2xl transition-all duration-500 group perspective-1000 -mt-20 -ml-10">
              <div className="preserve-3d group-hover:rotate-y-6 transition-transform duration-500">
                <img
                  className="w-full h-52 rounded-2xl transform hover:scale-105 transition-transform duration-300 bg-white 
          border-4 border-gray-200/50 hover:border-white/50 object-cover"
                  src={assets.calender}
                  alt="Patient Care"
                />
              </div>
              {/* Floating Elements */}
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-pink-500/20 rounded-full blur-2xl animate-pulse"></div>
            </div>
          </div>

          {/* Decorative Glows */}
          <div className="absolute w-64 h-64 bg-gradient-to-r from-pink-400/20 to-purple-600/20 opacity-30 
    blur-3xl rounded-full -top-24 -right-24 pointer-events-none animate-pulse"></div>
          <div className="absolute w-48 h-48 bg-gradient-to-br from-yellow-400/20 to-green-400/20 opacity-30 
    blur-2xl rounded-full -bottom-20 -left-20 pointer-events-none"></div>
        </div>


        {/* Floating Elements */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl translate-y-1/2"></div>
      </div>
    </div>
  );
}

export default Header;