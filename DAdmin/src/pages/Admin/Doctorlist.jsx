

// import React, { useContext, useEffect, useState } from 'react';
// import { AdminContext } from '../../context/AdminContext';

// const Doctorlist = () => {
//   const { doctors, aToken, getAlldoctors, changeAvaialabilty } = useContext(AdminContext);
//   const [expandedIndex, setExpandedIndex] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredDoctors, setFilteredDoctors] = useState([]);

//   useEffect(() => {
//     if (aToken) {
//       getAlldoctors();
//     }
//   }, [aToken]);

//   useEffect(() => {
//     if (doctors) {
//       const filtered = doctors.filter((doctor) =>
//         doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredDoctors(filtered);
//     }
//   }, [searchTerm, doctors]);

//   const toggleExpand = (index) => {
//     setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
//   };

//   return (
//     <div className="container mx-auto p-6 lg:px-12 bg-gradient-to-r from-gray-900 to-gray-800 min-h-screen text-white">
//       <h1 className="text-3xl font-bold text-center mb-6">All Doctors</h1>

//       {/* Search Input */}
//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Search doctors by name..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//       </div>

//       {/* Doctors List Container */}
//       <div className="bg-gray-800 shadow-lg rounded-lg p-6 divide-y divide-gray-700">
//         {Array.isArray(filteredDoctors) && filteredDoctors.length > 0 ? (
//           filteredDoctors.map((item, index) => (
//             <details
//               key={index}
//               open={expandedIndex === index}
//               className="group"
//               onClick={() => toggleExpand(index)}
//             >
//               <summary className="flex items-center justify-between p-4 cursor-pointer bg-gray-700 rounded-lg hover:bg-gray-600 transition">
//                 <div className="flex items-center space-x-4">
//                   <img
//                     src={item.image || '/path/to/placeholder.jpg'}
//                     alt={item.name}
//                     className="w-12 h-12 object-cover rounded-full transition-transform duration-300 ease-in-out group-hover:scale-110"
//                   />
//                   <span className="font-medium text-white">{item.name}</span>
//                 </div>
//                 <div > <p>Rating and commnets</p>
//                 <p></p>
//                 </div>
//                 <span
//                   className={`text-sm font-semibold ${
//                     item.available ? 'text-green-400' : 'text-red-400'
//                   }`}
//                 >
//                   {item.available ? 'Available' : 'Unavailable'}
//                 </span>
//               </summary>
//               <div className="p-4 bg-gray-900 rounded-lg mt-2">
//                 <img
//                   src={item.image || '/path/to/placeholder.jpg'}
//                   alt={item.name}
//                   className="w-24 h-24 object-cover rounded-lg mb-4 mx-auto transition-transform duration-300 ease-in-out hover:scale-110"
//                 />
//                 <p className="text-gray-300 mb-2">
//                   <span className="font-bold">Speciality:</span> {item.speciality}
//                 </p>
//                 <div className="flex items-center justify-between mt-4">
//                   <span
//                     className={`text-sm font-semibold ${
//                       item.available ? 'text-green-400' : 'text-red-400'
//                     }`}
//                   >
//                     {item.available ? 'Currently Available' : 'Currently Unavailable'}
//                   </span>
//                   <button
//                     onClick={() => changeAvaialabilty(item._id)}
//                     className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//                   >
//                     Toggle Availability
//                   </button>
//                 </div>
//               </div>
//             </details>
//           ))
//         ) : (
//           <p className="text-center text-gray-400">No doctors found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Doctorlist;



import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';

const Doctorlist = () => {
  const { doctors, aToken, getAlldoctors, changeAvaialabilty } = useContext(AdminContext);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
    if (aToken) {
      getAlldoctors();
    }
  }, [aToken]);

  useEffect(() => {
    if (doctors) {
      const filtered = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDoctors(filtered);
    }
  }, [searchTerm, doctors]);

  const toggleExpand = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const total = ratings.reduce((acc, curr) => acc + curr.rating, 0);
    return (total / ratings.length).toFixed(1);
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
  };

  return (
    <div className="container mx-auto p-6 lg:px-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        Doctors Directory
      </h1>

      <div className="mb-8 max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search doctors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 rounded-xl bg-gray-700 border-2 border-gray-600 shadow-xl text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition-all"
        />
      </div>

      <div className="space-y-6">
        {Array.isArray(filteredDoctors) && filteredDoctors.length > 0 ? (
          filteredDoctors.map((item, index) => (
            <div 
              key={index}
              className="group bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
            >
              <div 
                className="flex items-center justify-between p-6 cursor-pointer"
                onClick={() => toggleExpand(index)}
              >
                <div className="flex items-center space-x-6">
                  <img
                    src={item.image || '/placeholder-doctor.jpg'}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-full border-2 border-blue-400 shadow-lg"
                  />
                  <div>
                    <h2 className="text-2xl font-semibold text-blue-400">{item.name}</h2>
                    <p className="text-gray-400">{item.speciality}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-yellow-400">
                      {calculateAverageRating(item.ratings)}/5
                    </div>
                    <div className="text-sm text-gray-400">
                      {item.ratings?.length || 0} reviews
                    </div>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-bold ${item.available ? 'bg-green-600/30 text-green-400' : 'bg-red-600/30 text-red-400'}`}>
                    {item.available ? 'Available' : 'Busy'}
                  </span>
                </div>
              </div>

              {expandedIndex === index && (
                <div className="px-6 pb-6 bg-gray-900/50">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center bg-gray-700 p-4 rounded-xl">
                        <span className="text-gray-400">Availability Status:</span>
                        <button
                          onClick={() => changeAvaialabilty(item._id)}
                          className="px-4 py-2 bg-blue-500/30 hover:bg-blue-600/40 text-blue-400 rounded-lg transition-colors"
                        >
                          Toggle Availability
                        </button>
                      </div>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-cover rounded-xl border-2 border-gray-700"
                      />
                    </div>

                    <div className="bg-gray-800 p-6 rounded-xl">
                      <h3 className="text-xl font-semibold mb-4 text-purple-400">
                        Patient Reviews ({item.ratings?.length || 0})
                      </h3>
                      <div className="h-64 overflow-y-auto space-y-4 pr-3">
                        {item.ratings?.length > 0 ? (
                          item.ratings.map((rating, idx) => (
                            <div key={idx} className="bg-gray-700 p-4 rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <span className="font-medium text-blue-300">
                                    {rating.patientId?.name || 'Anonymous'}
                                  </span>
                                  <div className="text-yellow-400 text-sm">
                                    {renderStars(rating.rating)}
                                  </div>
                                </div>
                                <span className="text-xs text-gray-400">
                                  {new Date(rating.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-gray-300 text-sm">{rating.comment}</p>
                            </div>
                          ))
                        ) : (
                          <div className="text-center text-gray-500 p-4">
                            No reviews yet
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-2xl text-gray-500 py-12">
            No doctors found matching your search
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctorlist;