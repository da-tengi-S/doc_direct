

import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorApproval = () => {
  const { doctors, aToken, getAlldoctors, changeAvaialabilty, varifyDoctor } = useContext(AdminContext);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
    if (aToken) {
      getAlldoctors();
    }
  }, [aToken]);

  useEffect(() => {
    if (doctors) {
      const filtered = doctors.filter((doctor) => !doctor.verified || !doctor.available);
      setFilteredDoctors(filtered);

      // Select the first doctor by default
      if (filtered.length > 0) {
        setSelectedDoctor(filtered[0]);
      }
    }
  }, [doctors]);

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Doctor Approval Requests</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side: Doctor List */}
        <div className="lg:w-1/3 bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Pending Approvals</h2>
          {Array.isArray(filteredDoctors) && filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor, index) => (
              <div
                key={index}
                onClick={() => handleSelectDoctor(doctor)}
                className={`p-4 mb-4 rounded-lg cursor-pointer transition-all ${
                  selectedDoctor?._id === doctor._id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={doctor.image || '/path/to/placeholder.jpg'}
                    alt={doctor.name}
                    className="w-12 h-12 rounded-full border-2 border-gray-500"
                  />
                  <div>
                    <p className="font-medium">{doctor.name}</p>
                    <p className="text-sm text-gray-300">{doctor.speciality}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No pending approval requests.</p>
          )}
        </div>

        {/* Right Side: Doctor Details */}
        <div className="lg:w-2/3 bg-gray-800 rounded-lg shadow-lg p-6">
          {selectedDoctor ? (
            <>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <img
                  src={selectedDoctor.image || '/path/to/placeholder.jpg'}
                  alt={selectedDoctor.name}
                  className="w-32 h-32 rounded-full border-4 border-gray-500"
                />
                <div className="text-center md:text-left">
                  <h2 className="text-3xl font-bold mb-2">{selectedDoctor.name}</h2>
                  <p className="text-gray-300 text-lg">{selectedDoctor.speciality}</p>
                  <p className="text-gray-400 text-sm">{selectedDoctor.degree}</p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Details</h3>
                  <p className="text-gray-300">
                    <span className="font-bold">Experience:</span> {selectedDoctor.experience} years
                  </p>
                  <p className="text-gray-300">
                    <span className="font-bold">Fees: </span> Rs{selectedDoctor.fees}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-bold">Phone: </span> {selectedDoctor.phone}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-bold">Email: </span> {selectedDoctor.email}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-bold">Address: </span> {selectedDoctor.address?.street}, {selectedDoctor.address?.city}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">About</h3>
                  <p className="text-gray-400">{selectedDoctor.about}</p>
                </div>
              </div>

              {/* Approve & Reject Buttons */}
              <div className="mt-8 flex justify-center gap-4">
                <button
                  onClick={() => varifyDoctor(selectedDoctor._id)}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                >
                  Approve
                </button>
                <button
                  onClick={() => changeAvaialabilty(selectedDoctor._id, false)}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                >
                  Reject
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-400">Select a doctor to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorApproval;
