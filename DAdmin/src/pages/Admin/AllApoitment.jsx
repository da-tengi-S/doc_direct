
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
    <div className="w-full min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="w-full max-w-7xl bg-white shadow-lg rounded-xl">
        
        {/* Fixed Header Section */}
        <div className="sticky top-0 bg-white z-20 p-6">
          <h1 className="text-2xl font-bold text-center mb-2">All Appointments</h1>
          
          {/* Table Header (Fixed) */}
          <div className="grid grid-cols-[40px_1fr_60px_180px_120px_80px_100px] gap-2 font-bold bg-green-300 p-3 rounded-md border border-gray-900">
            <p>S/N</p>
            <p>Patient</p>
            <p>Age</p>
            <p>Date and Time</p>
            <p>Doctor</p>
            <p>Fees</p>
            <p>Actions</p>
          </div>
        </div>

        {/* Scrollable Table Body */}
        <div className="h-[80vh] overflow-y-auto p-3">
          {appointments.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[40px_1fr_60px_180px_120px_80px_100px] gap-2 items-center p-3 border-b border-gray-300"
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
              {item.cancelled ? (
                <p className="text-red-400 text-xs">Cancelled</p>
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
    </div>
  );
};

export default AllAppointment;
