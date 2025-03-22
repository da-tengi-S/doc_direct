
// import React from 'react';
// import { assets } from '../assets/assets';

// const Header = ({ theme }) => { 
//     return (
//         <div className={`relative py-12 md:py-24 px-8 md:px-20 lg:px-28 rounded-2xl shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105
//             ${theme === "dark" ? "bg-black text-white" : "bg-gradient-to-br from-gray-800 via-blue-500 to-gray-800 text-white"}`}>

//             {/* Container */}
//             <div className="flex flex-col-reverse md:flex-row items-center gap-8">
//                 {/* Image Section */}
//                 <div className="md:w-1/2 flex justify-center relative">
//                     <img 
//                         className="w-3/5 p-10 md:w-full rounded-xl transform hover:scale-105 transition-transform duration-300 shadow-lg" 
//                         src={assets.header_img} 
//                         alt="Doctors" 
//                     />
//                     {/* Decorative Glow */}
//                     <div className="absolute w-48 h-48 bg-gradient-to-r from-pink-500 to-purple-500 opacity-30 blur-3xl rounded-full top-10 right-10 pointer-events-none"></div>
//                 </div>
                
//                 {/* Text Section */}
//                 <div className="md:w-1/2 text-center md:text-left space-y-6">
//                     <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
//                         Your Health, <span className="text-yellow-400">Your Choice</span>
//                     </h1>
//                     <p className={`text-lg md:text-xl font-light ${theme === "dark" ? "text-gray-300" : "text-gray-200"}`}>
//                         Connect with expert doctors and book your appointments easily. 
//                         Experience hassle-free healthcare tailored to your needs.
//                     </p>
//                     <div className="flex justify-center md:justify-start gap-4 items-center">
//                         <img className="w-20 md:w-24 rounded-full border-4 border-yellow-400" src={assets.group_profiles} alt="Group Profiles" />
//                         <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-300"} text-sm md:text-base`}>
//                             Trusted by thousands. Offering professional care for every patient.
//                         </p>
//                     </div>
//                     <a 
//                         href="#speciality" 
//                         className={`inline-block ${theme === "dark" ? "bg-gray-700 text-white" : "bg-green-400 text-gray-800"} 
//                         px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300`}
//                     >
//                         Book Appointment
//                     </a>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Header;


import React from 'react';
import { assets } from '../assets/assets';

const Header = ({ theme }) => {
  return (
    <div className={`relative min-h-screen flex items-center justify-center overflow-hidden 
      ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-indigo-200 via-blue-50 to-purple-100'}`}>

      {/* Floating Geometric Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute w-96 h-96 rounded-full blur-3xl opacity-30
          ${theme === 'dark' ? 'bg-purple-600' : 'bg-blue-200'} -top-48 -left-48 animate-float`}></div>
        <div className={`absolute w-64 h-64 rotate-45 blur-2xl opacity-40
          ${theme === 'dark' ? 'bg-teal-600' : 'bg-purple-200'} top-1/2 right-0 animate-float-delayed`}></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              <span className={`${theme === 'dark' ? 'text-blue-400' : 'text-indigo-600'}`}>Modern</span> 
              <span className="mx-4">Healthcare</span>
              <br />
              <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>
            
            <p className={`text-xl md:text-2xl max-w-2xl mx-auto 
              ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Connect instantly with certified healthcare professionals and take control of your wellness journey.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button className={`px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all
                ${theme === 'dark' 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'}
                hover:scale-105 hover:shadow-xl`}>
                Book Virtual Consultation
              </button>
              
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((item) => (
                    <img 
                      key={item}
                      src={assets.group_profiles} 
                      className="w-10 h-10 rounded-full border-2 border-white"
                      alt="Patient profile"
                    />
                  ))}
                </div>
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  5,000+ Happy Patients
                </span>
              </div>
            </div>
          </div>

          {/* Graphic Section */}
          <div className="lg:w-1/2 relative">
            <div className={`p-8 rounded-3xl backdrop-blur-lg 
              ${theme === 'dark' ? 'bg-gray-800/30' : 'bg-white/30'} border 
              ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="grid grid-cols-2 gap-6">
                {['Virtual Consult', 'Lab Tests', 'Health Plans', 'Emergency Care'].map((service, index) => (
                  <div 
                    key={index}
                    className={`p-6 rounded-xl transition-all cursor-pointer
                      ${theme === 'dark' 
                        ? 'bg-gray-700/50 hover:bg-gray-700' 
                        : 'bg-white hover:bg-gray-50'}
                      border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}
                  >
                    <div className={`text-2xl mb-2 
                      ${theme === 'dark' ? 'text-blue-400' : 'text-indigo-600'}`}>
                      {service}
                    </div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Learn more →
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-16 flex flex-wrap justify-center gap-8">
          {[
            { value: '100%', label: 'Secure' },
            { value: '24/7', label: 'Support' },
            { value: '500+', label: 'Specialists' },
            { value: '1M+', label: 'Consultations' }
          ].map((stat, index) => (
            <div 
              key={index}
              className={`p-4 text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
            >
              <div className={`text-3xl font-bold mb-1 
                ${theme === 'dark' ? 'text-teal-400' : 'text-blue-600'}`}>
                {stat.value}
              </div>
              <div className="text-sm uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;