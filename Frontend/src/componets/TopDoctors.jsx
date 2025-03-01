
// import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';

// const TopDoctors = () => {
//     const navigate = useNavigate();
//     const { doctors } = useContext(AppContext);
//     return (
//         <div className="flex flex-col items-center my-24 px-4 sm:px-6 lg:px-8 text-gray-800">
//           <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-gray-900">
//             Our Top Doctors
//           </h1>
//           <p className="max-w-2xl text-center text-lg text-gray-600 mb-12">
//             Meet our highly skilled and experienced doctors dedicated to providing you with the best care.
//           </p>
    
//           <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//             {doctors?.slice(0, 10).map((doctor) => {
//               // Calculate average rating
//               const totalRatings = doctor.ratings?.length || 0;
//               const averageRating =
//                 totalRatings > 0
//                   ? doctor.ratings.reduce((acc, r) => acc + r.rating, 0) / totalRatings
//                   : 0;
    
//               // Get latest comment
//               const latestComment =
//                 totalRatings > 0 ? doctor.ratings[doctor.ratings.length - 1].comment : null;
    
//               return (
//                 <div
//                   key={doctor._id}
//                   onClick={() => {
//                     navigate(`/appointment/${doctor._id}`);
//                     scrollTo(0, 0);
//                   }}
//                   className="group border border-gray-100 rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 ease-in-out"
//                 >
//                   <div className="relative h-60 overflow-hidden">
//                     <img
//                       className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
//                       src={doctor.image}
//                       alt={`${doctor.name}`}
//                     />
//                     <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-medium text-green-700">
//                       Available Today
//                     </div>
//                   </div>
//                   <div className="p-6 bg-white">
//                     <p className="text-2xl font-bold text-gray-900 mb-2">{doctor.name}</p>
//                     <p className="text-gray-600 text-lg">{doctor.speciality}</p>
    
//                     {/* Display Average Rating */}
//                     {totalRatings > 0 ? (
//                       <div className="mt-2 flex items-center">
//                         <span className="text-yellow-500 text-lg">
//                           {Array.from({ length: Math.round(averageRating) }).map((_, i) => "⭐")}
//                         </span>
//                         <span className="ml-2 text-gray-600 text-sm">({totalRatings} reviews)</span>
//                       </div>
//                     ) : (
//                       <p className="text-gray-500 text-sm">No ratings yet</p>
//                     )}
    
//                     {/* Display Latest Comment */}
//                     {/* {latestComment && (
//                       <p className="text-gray-500 text-sm mt-1">"{latestComment}"</p>
//                     )} */}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
    
//           <button
//             onClick={() => {
//               navigate("/doctors");
//               scrollTo(0, 0);
//             }}
//             className="mt-14 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out text-lg font-semibold hover:shadow-md"
//           >
//             Explore All Doctors
//           </button>
//         </div>
//       );
//     };
    
//     export default TopDoctors;


import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);

    return (
        <div className="flex flex-col items-center my-24 px-4 sm:px-6 lg:px-8 text-gray-800">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-gray-900">
                Our Top Doctors
            </h1>
            <p className="max-w-2xl text-center text-lg text-gray-600 mb-12">
                Meet our highly skilled and experienced doctors dedicated to providing you with the best care.
            </p>

            <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {doctors?.slice(0, 10).map((doctor) => {
                    // Calculate average rating
                    const totalRatings = doctor.ratings?.length || 0;
                    const averageRating =
                        totalRatings > 0
                            ? doctor.ratings.reduce((acc, r) => acc + r.rating, 0) / totalRatings
                            : 0;

                    return (
                        <div
                            key={doctor._id}
                            onClick={() => {
                                navigate(`/appointment/${doctor._id}`);
                                scrollTo(0, 0);
                            }}
                            className="group border border-gray-100 rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 ease-in-out"
                        >
                            <div className="relative h-60 overflow-hidden">
                                <img
                                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                                    src={doctor.image}
                                    alt={`${doctor.name}`}
                                />
                                {/* Availability Badge */}
                                <div
                                    className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${
                                        doctor.available
                                            ? "bg-green-500 text-black-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                                >
                                    {doctor.available ? "Available Today" : "Not Available"}
                                </div>
                            </div>
                            <div className="p-6 bg-white">
                                <p className="text-2xl font-bold text-gray-900 mb-2">{doctor.name}</p>
                                <p className="text-gray-600 text-lg">{doctor.speciality}</p>

                                {/* Display Average Rating */}
                                {totalRatings > 0 ? (
                                    <div className="mt-2 flex items-center">
                                        <span className="text-yellow-500 text-lg">
                                            {Array.from({ length: Math.round(averageRating) }).map((_, i) => "⭐")}
                                        </span>
                                        <span className="ml-2 text-gray-600 text-sm">({totalRatings} reviews)</span>
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-sm">No ratings yet</p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <button
                onClick={() => {
                    navigate("/doctors");
                    scrollTo(0, 0);
                }}
                className="mt-14 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out text-lg font-semibold hover:shadow-md"
            >
                Explore All Doctors
            </button>
        </div>
    );
};

export default TopDoctors;
