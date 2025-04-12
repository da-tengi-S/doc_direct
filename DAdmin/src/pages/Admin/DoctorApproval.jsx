

import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorApproval = () => {
  const { doctors, aToken, getAlldoctors, changeAvaialabilty, rejectApplication,  varifyDoctor } = useContext(AdminContext);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);

  useEffect(() => {
    if (aToken) {
      getAlldoctors();
    }
  }, [aToken]);

  useEffect(() => {
    if (doctors) {
      const filtered = doctors.filter((doctor) => !doctor.verified || !doctor.available);
      setFilteredDoctors(filtered);
      if (filtered.length > 0) {
        setSelectedDoctor(filtered[0]);
      }
    }
  }, [doctors]);

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setSelectedDocument(null); // Reset document view when switching doctors
  };

  const handleDocumentClose = () => {
    setSelectedDocument(null);
  };

  return (
    <div className="min-h-screen bg-white text-black p-8 relative">
      <h1 className="text-4xl font-bold text-center mb-8">Doctor Approval Requests</h1>

      {/* Document Viewer Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-semibold">Document Viewer</h3>
              <button
                onClick={handleDocumentClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4">
              {selectedDocument.url.includes('.pdf') ? (
                <iframe
                  src={selectedDocument.url}
                  className="w-full h-[500px]"
                  title="Document Viewer"
                />
              ) : (
                <img
                  src={selectedDocument.url}
                  alt="Document"
                  className="w-full h-auto object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side: Doctor List */}
        <div className="lg:w-1/3 bg-gray-100 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Pending Approvals</h2>
          {Array.isArray(filteredDoctors) && filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor, index) => (
              <div
                key={index}
                onClick={() => handleSelectDoctor(doctor)}
                className={`p-4 mb-4 rounded-lg cursor-pointer transition-all ${selectedDoctor?._id === doctor._id
                    ? 'bg-gradient-to-r from-blue-200 to-purple-200'
                    : 'bg-white hover:bg-gray-200'
                  }`}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={doctor.image || '/path/to/placeholder.jpg'}
                    alt={doctor.name}
                    className="w-12 h-12 rounded-full border-2 border-gray-400"
                  />
                  <div>
                    <p className="font-medium">{doctor.name}</p>
                    <p className="text-sm text-gray-600">{doctor.speciality}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No pending approval requests.</p>
          )}
        </div>

        {/* Right Side: Doctor Details */}
        <div className="lg:w-2/3 w-full bg-gray-100 rounded-lg shadow-lg p-6">
          {selectedDoctor ? (
            <>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <img
                  src={selectedDoctor.image || '/path/to/placeholder.jpg'}
                  alt={selectedDoctor.name}
                  className="w-32 h-32 rounded-full border-4 border-gray-400"
                />
                <div className="text-center md:text-left">
                  <h2 className="text-3xl font-bold mb-2">{selectedDoctor.name}</h2>
                  <p className="text-gray-700 text-lg">{selectedDoctor.speciality}</p>
                  <p className="text-gray-600 text-sm">{selectedDoctor.degree}</p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Details</h3>
                  <p className="text-gray-700">
                    <span className="font-bold">Experience:</span> {selectedDoctor.experience} years
                  </p>
                  <p className="text-gray-700">
                    <span className="font-bold">Fees: </span> Rs{selectedDoctor.fees}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-bold">Phone: </span> {selectedDoctor.phone}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-bold">Email: </span> {selectedDoctor.email}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-bold">Address: </span> {selectedDoctor.address?.street}, {selectedDoctor.address?.city}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">About</h3>
                  <p className="text-gray-600">{selectedDoctor.about}</p>
                </div>
              </div>

              {/* Documents Section */}
              {selectedDoctor.document.map((doc, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => setSelectedDocument({
                      ...doc,
                      url: doc.url.replace('image/upload', 'raw/upload')
                    })}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                  >
                    View Document {idx + 1}
                  </button>
                </li>
              ))}

              <div className="mt-8 flex justify-center gap-4">
                <button
                  onClick={() => varifyDoctor(selectedDoctor._id)}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                >
                  Approve
                </button>
                <button
                  onClick={() => rejectApplication(selectedDoctor._id, false)}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                >
                  Reject
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">Select a doctor to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorApproval;
