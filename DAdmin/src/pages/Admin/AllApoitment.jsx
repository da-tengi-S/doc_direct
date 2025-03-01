// import React, { useEffect, useContext } from "react";
// import { AdminContext } from "../../context/AdminContext";
// import { AppContext } from "../../context/AppContext";

// const AllAppointment = () => {
//   const { aToken, appointments, getAllAppointments, cancelAppoitmnet } = useContext(AdminContext);
//   const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

//   useEffect(() => {
//     if (aToken) {
//       getAllAppointments();
//     }
//   }, [aToken]);

//   return (
//     <div className="w-full mx-auto p-5 bg-gray-900 text-white min-h-screen">
//       <h1 className="text-2xl font-bold text-center mb-5">All Appointments</h1>

//       {/* Appointments Table */}
//       <div className="w-full">
//         {/* Table Header */}
//         <div className="grid grid-cols-[40px_1fr_60px_180px_120px_80px_100px] gap-2 font-bold p-3 bg-gray-800 rounded-md">
//           <p>S/N</p>
//           <p>Patient</p>
//           <p>Age</p>
//           <p>Date and Time</p>
//           <p>Doctor</p>
//           <p>Fees</p>
//           <p>Actions</p>
//         </div>

//         {/* Table Rows */}
//         {appointments.map((item, index) => (
//           <div
//             key={index}
//             className="grid grid-cols-[40px_1fr_60px_180px_120px_80px_100px] gap-2 items-center p-3 border-b border-gray-700"
//           >
//             <p>{index + 1}</p>
//             <div className="flex items-center gap-2">
//               <img
//                 src={item.userData.image}
//                 alt="Patient"
//                 className="w-10 h-10 rounded-full object-cover"
//               />
//               <p>{item.userData.name}</p>
//             </div>
//             <p>{calculateAge(item.userData.dob)}</p>
            
//             <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
//             <p>{item.docData.name}</p>
//             <p>{currency}{item.amount}</p>
//             {item.cancelled ? <p className="text-red-400 text-xs">Cancelled</p> :   <button onClick={() => cancelAppoitmnet(item._id)} className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600">Delete</button> }
          
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllAppointment;

import React, { useEffect, useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const AllAppointment = () => {
  const { aToken, appointments, getAllAppointments, cancelAppoitmnet } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full mx-auto p-5 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-5">All Appointments</h1>

      {/* Appointments Table */}
      <div className="w-full">
        {/* Table Header */}
        <div className="grid grid-cols-[40px_1fr_60px_180px_120px_80px_100px_200px] gap-2 font-bold p-3 bg-gray-800 rounded-md">
          <p>S/N</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date and Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Reason</p>
          <p>Actions</p>
          
        </div>

        {/* Table Rows */}
        {appointments.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[40px_1fr_60px_180px_120px_80px_100px_200px] gap-2 items-center p-3 border-b border-gray-700"
          >
            <p>{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                src={item.userData.image}
                alt="Patient"
                className="w-10 h-10 rounded-full object-cover"
              />
              <p>{item.userData.name}</p>
            </div>
            <p>{calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <p>{item.docData.name}</p>
            <p>{currency}{item.amount}</p>
            <p className="text-gray-300 text-medium">{item.reason}</p>
            {item.cancelled ? (
              <p className="text-red-400 text-sm">Cancelled</p>
            ) : (
              <button 
                onClick={() => cancelAppoitmnet(item._id)} 
                className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            )}
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointment;
