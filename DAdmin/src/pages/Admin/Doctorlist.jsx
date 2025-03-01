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

//   // Update filtered doctors whenever searchTerm or doctors change
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
//     <div className="container mx-auto p-6 lg:px-12">
//       <h1 className="text-3xl font-bold text-center mb-6">All Doctors</h1>

//       {/* Search Input */}
//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Search doctors by name..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//       </div>

//       {/* Doctors List Container */}
//       <div className="bg-white shadow-lg rounded-lg p-6 divide-y divide-gray-200">
//         {Array.isArray(filteredDoctors) && filteredDoctors.length > 0 ? (
//           filteredDoctors.map((item, index) => (
//             <details
//               key={index}
//               open={expandedIndex === index}
//               className="group"
//               onClick={() => toggleExpand(index)}
//             >
//               <summary className="flex items-center justify-between p-4 cursor-pointer group-hover:bg-gray-100">
//                 <div className="flex items-center space-x-4">
//                   <img
//                     src={item.image || '/path/to/placeholder.jpg'}
//                     alt={item.name}
//                     className="w-12 h-12 object-cover rounded-full transition-transform duration-300 ease-in-out group-hover:scale-110"
//                   />
//                   <span className="font-medium text-gray-900">{item.name}</span>
//                 </div>
//                 <span
//                   className={`text-sm ${
//                     item.available ? 'text-green-600' : 'text-red-600'
//                   }`}
//                 >
//                   {item.available ? 'Available' : 'Unavailable'}
//                 </span>
//               </summary>
//               <div className="p-4 bg-gray-50">
//                 <img
//                   src={item.image || '/path/to/placeholder.jpg'}
//                   alt={item.name}
//                   className="w-24 h-24 object-cover rounded-lg mb-4 mx-auto transition-transform duration-300 ease-in-out hover:scale-110"
//                 />
//                 <p className="text-gray-700 mb-2">
//                   <span className="font-bold">Speciality:</span> {item.speciality}
//                 </p>
//                 <div className="flex items-center justify-between mt-4">
//                   <span
//                     className={`text-sm ${
//                       item.available ? 'text-green-600' : 'text-red-600'
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
//           <p className="text-center text-gray-500">No doctors found.</p>
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

  return (
    <div className="container mx-auto p-6 lg:px-12 bg-[#121212] min-h-screen text-white">
      <h1 className="text-3xl font-bold text-center mb-6">All Doctors</h1>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search doctors by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#1E1E1E] border border-gray-700 shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Doctors List Container */}
      <div className="bg-[#1E1E1E] shadow-lg rounded-lg p-6 divide-y divide-gray-700">
        {Array.isArray(filteredDoctors) && filteredDoctors.length > 0 ? (
          filteredDoctors.map((item, index) => (
            <details
              key={index}
              open={expandedIndex === index}
              className="group"
              onClick={() => toggleExpand(index)}
            >
              <summary className="flex items-center justify-between p-4 cursor-pointer bg-[#2A2A2A] rounded-lg hover:bg-[#333] transition">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image || '/path/to/placeholder.jpg'}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-full transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
                  <span className="font-medium text-white">{item.name}</span>
                </div>
                <span
                  className={`text-sm font-semibold ${
                    item.available ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {item.available ? 'Available' : 'Unavailable'}
                </span>
              </summary>
              <div className="p-4 bg-[#252525] rounded-lg mt-2">
                <img
                  src={item.image || '/path/to/placeholder.jpg'}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg mb-4 mx-auto transition-transform duration-300 ease-in-out hover:scale-110"
                />
                <p className="text-gray-300 mb-2">
                  <span className="font-bold">Speciality:</span> {item.speciality}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span
                    className={`text-sm font-semibold ${
                      item.available ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {item.available ? 'Currently Available' : 'Currently Unavailable'}
                  </span>
                  <button
                    onClick={() => changeAvaialabilty(item._id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    Toggle Availability
                  </button>
                </div>
              </div>
            </details>
          ))
        ) : (
          <p className="text-center text-gray-400">No doctors found.</p>
        )}
      </div>
    </div>
  );
};

export default Doctorlist;
