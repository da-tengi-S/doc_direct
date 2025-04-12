import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MyAppointments = () => {
  const navigate = useNavigate();
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [modalMessage, setModalMessage] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Sep', 'Oct', 'Nov', 'Dec'];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return dateArray[0] + ' ' + months[Number(dateArray[1])] + ' ' + dateArray[2];
  };

  const getUsersAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointment`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success && Array.isArray(data.appointment)) {
        setAppointments(data.appointment.reverse());
      } else {
        toast.error('Failed to load appointments.');
      }
    } catch (error) {
      toast.error('Failed to fetch appointments.');
    }
  };

  const cancelledAppointment = async (appointment) => {
    const [day, month, year] = appointment.slotDate.split('_');
    const formattedMonth = month.padStart(2, '0');
  
    const [time, period] = appointment.slotTime.split(' ');
    let [hours, minutes] = time.split(':');
  
    // Convert hours to integer for calculations
    hours = parseInt(hours);
  
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }
  
    // Pad hours and minutes to two digits
    const paddedHours = hours.toString().padStart(2, '0');
    const paddedMinutes = minutes.padStart(2, '0');

    const formattedDay = day.padStart(2, '0');
const formattedDateTime = `${year}-${formattedMonth}-${formattedDay}T${paddedHours}:${paddedMinutes}:00`;


    const appointmentDateTime = new Date(formattedDateTime);
  
    if (isNaN(appointmentDateTime.getTime())) {
      setModalMessage('Invalid appointment date/time format.');
      setShowModal(true);
      console.log(formattedDateTime,appointmentDateTime)
      return;
    }
  // const cancelledAppointment = async (appointment) => {
  //   const [day, month, year] = appointment.slotDate.split('_');
  //   const formattedMonth = month.padStart(2, '0');

  //   const [time, period] = appointment.slotTime.split(' ');
  //   let [hours, minutes] = time.split(':');

  //   if (period === 'PM' && hours !== '12') {
  //     hours = parseInt(hours) + 12;
  //   } else if (period === 'AM' && hours === '12') {
  //     hours = '00';
  //   }

  //   const formattedDateTime = `${year}-${formattedMonth}-${day}T${hours}:${minutes}:00`;
  //   const appointmentDateTime = new Date(formattedDateTime);

  //   if (isNaN(appointmentDateTime.getTime())) {
  //     setModalMessage('Invalid appointment date/time format.');
  //     setShowModal(true);
  //     return;
  //   }

    const currentTime = new Date();
    const timeDifference = (appointmentDateTime - currentTime) / (1000 * 60 * 60);

    if (timeDifference < 2) {
      setModalMessage("You are not allowed to cancel the appointment within 2 hours of the scheduled time. Your cancel appointment feature is disabled.");
      setShowModal(true);
      return;
    }

    try {
      const { data } = await axios.post(`${backendUrl}/api/user/cancel-appoitment`, { appointmentId: appointment._id }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        toast.success(data.message);
        getUsersAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const submitRating = async (doctorId) => {
    if (rating < 1 || rating > 5) {
      toast.error('Please select a rating between 1 and 5.');
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/doctors/${doctorId}/rate`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success('Rating and comment submitted successfully.');
        setRating(0);
        setComment('');
        setSelectedDoctor(null);
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred.');
    }
  };

  useEffect(() => {
    if (token) {
      getUsersAppointments();
    }
  }, [token]);
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b-2 border-blue-100 pb-4">My Appointments</h1>

      {appointments.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="inline-block bg-blue-100 p-4 rounded-full mb-4">
            <span className="text-4xl">📅</span>
          </div>
          <p className="text-lg text-gray-600 mb-4">No appointments found. Start by booking with a doctor!</p>
          <button
            onClick={() => navigate('/doctors')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Find Doctors
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {appointments.map((item, index) => (
            <div key={index} className="group p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0 relative">
                  {item.docData?.image ? (
                    <img
                      src={item.docData.image}
                      alt="Doctor"
                      className="w-32 h-32 object-cover rounded-xl shadow-lg border-4 border-white"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center">
                      <span className="text-gray-400 text-sm">No Image</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 w-full">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                        {item.docData?.name || 'Unknown Doctor'}
                      </h2>
                      <p className="text-blue-600 font-medium">{item.docData?.speciality || 'General Practitioner'}</p>
                    </div>

                    <span
                      className={`mt-2 md:mt-0 px-3 py-1 rounded-full text-sm font-medium ${item.cancelled ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                        }`}
                    >
                      {item.cancelled ? 'Cancelled' : 'Confirmed'}
                    </span>
                  </div>

                  <div className="space-y-2 mb-6">
                    <p className="text-gray-600">
                      <span className="font-medium">Date:</span> {slotDateFormat(item.slotDate)}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Time:</span> {item.slotTime}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {!item.cancelled && (
                      <>
                        <button
                          className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
                        >
                          Pay Online
                        </button>
                        <button
                          onClick={() => cancelledAppointment(item)}
                          className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
                        >
                          Cancel Appointment
                        </button>
                      </>
                    )}
                  </div>

                  {/* Ratings Section */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Rate Your Experience</h3>
                    <div className="flex items-center gap-2 mb-4">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          onClick={() => setRating(num)}
                          className={`text-3xl transition-all ${rating >= num ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'}`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                    <textarea
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                      placeholder="Share your experience (optional)..."
                      rows="3"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                      onClick={() => submitRating(item.docData?._id)}
                      className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-all duration-200"
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full animate-pop-in">
            <p className="text-lg font-semibold text-gray-800 mb-4 text-center">{modalMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;