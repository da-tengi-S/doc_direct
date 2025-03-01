import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AdminContext } from '../../context/AdminContext';

const DoctorApproval = () => {
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const { backendUrl, aToken } = useContext(AdminContext);

  useEffect(() => {
    const fetchPendingDoctors = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/admin/pending-doctors`, {
          headers: { Authorization: `Bearer ${aToken}` },
        });
        setPendingDoctors(data.doctors);
      } catch (error) {
        toast.error('Failed to fetch pending doctors');
      }
    };
    fetchPendingDoctors();
  }, [backendUrl, aToken]);

  const handleApproval = async (doctorId, status) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/admin/update-doctor-status/${doctorId}`,
        { status },
        { headers: { Authorization: `Bearer ${aToken}` } }
      );
      toast.success(data.message);
      setPendingDoctors(pendingDoctors.filter((doc) => doc._id !== doctorId));
    } catch (error) {
      toast.error('Failed to update doctor status');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 text-center">Doctor Approvals</h2>
      {pendingDoctors.length === 0 ? (
        <p className="text-center mt-4">No pending doctor applications</p>
      ) : (
        <ul className="mt-4 space-y-4">
          {pendingDoctors.map((doctor) => (
            <li key={doctor._id} className="p-4 border rounded-md flex justify-between items-center">
              <div>
                <p className="font-semibold">{doctor.name}</p>
                <p className="text-sm text-gray-600">{doctor.speciality}</p>
              </div>
              <div className="space-x-2">
                <button onClick={() => handleApproval(doctor._id, 'approved')} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                  Approve
                </button>
                <button onClick={() => handleApproval(doctor._id, 'disqualified')} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                  Disqualify
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DoctorApproval;
