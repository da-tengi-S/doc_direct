

import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';

const MyAppointments = () => {
  const navigate = useNavigate();
  const { backendUrl, token , getDoctorsData} = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const months = ['', 'Jan', 'feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'sep', 'Oct', 'Nov', 'Dec']

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + ' ' + months[Number(dateArray[1])] + ' ' + dateArray[2]
  }

  const getUsersAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/appointment`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('API Response:', data);

      if (data.success && Array.isArray(data.appointment)) {
        setAppointments(data.appointment.reverse());
      } else {
        console.error('Unexpected data structure:', data);
        toast.error('Failed to load appointments.');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Failed to fetch appointments.');
    }
  };

  const cancelledAppoutment = async (appointmentId) => {
    try {

      const {data} = await axios.post(`${backendUrl}/api/user/cancel-appoitment`,{appointmentId}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      } )

      if(data.success){
        toast.success(data.message)
        getUsersAppointments()
        getDoctorsData()


      }
      else{
        toast.error(data.message)
      }
      // console.log(appointmentId)
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }

  }
  useEffect(() => {
    if (token) {
      getUsersAppointments();
    }
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <p className="text-2xl font-semibold text-gray-800 mb-6">My Appointments</p>

      {appointments.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <p className="text-lg font-medium">
            You have no appointments. Click{' '}
            <span
              onClick={() => navigate('/doctors')}
              className="text-blue-500 underline cursor-pointer hover:text-blue-700"
            >
              here
            </span>{' '}
            and find the doctors for appointment.
          </p>

        </div>
      ) : (
        <div className="space-y-8">
          {appointments.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row gap-6 p-4 bg-white rounded-lg shadow-md border border-gray-200"
            >
              {/* Doctor Image */}
              <div className="flex-shrink-0">
                {item.docData?.image ? (
                  <img
                    src={item.docData.image}
                    alt="Doctor"
                    className="w-28 h-28 object-cover rounded-full shadow-lg"
                  />
                ) : (
                  <p className="text-gray-500">Image not available</p>
                )}
              </div>

              {/* Doctor Details */}
              <div className="flex-grow">
                <p className="text-xl font-bold text-gray-800">
                  {item.docData?.name || 'Doctor name not available'}
                </p>
                <p className="text-gray-600 text-sm">
                  {item.docData?.speciality || 'Speciality not available'}
                </p>
                <div className="mt-4">
                  <p className="text-gray-500 font-semibold">Address:</p>
                  <p className="text-gray-700">{item.docData?.address?.line1 || 'Line 1 not available'}</p>
                  <p className="text-gray-700">{item.docData?.address?.line2 || 'Line 2 not available'}</p>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  <span className="font-semibold">Date and Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-4 md:mt-0 md:flex-col">
                {!item.cancelled && <button className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all">
                  Pay Online
                </button>}
               {!item.cancelled  && <button onClick={() =>cancelledAppoutment(item._id)} className="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-all">
                  Cancel Appointment
                </button>} 
                {item.cancelled && <button className='sm:min w-48  py-2 border-red-500 rounded text-red-500' >Appoitment Cancelled</button>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;

