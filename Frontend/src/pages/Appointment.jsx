

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../componets/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [docsSlot, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const MAX_REASON_LENGTH = 150;

  const getAvaiableSlot = () => {
    if (!docInfo || !docInfo.slots_booked) {
      console.warn('docInfo or slots_booked is not available');
      return;
    }

    setDocSlots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      currentDate.setHours(10, 0, 0, 0);
      let endTime = new Date(currentDate);
      endTime.setHours(19, 0, 0, 0);

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = `${day}_${month}_${year}`;
        const slotTime = formattedTime;

        const isSlotAvailable = !docInfo.slots_booked[slotDate]?.includes(slotTime);

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setHours(currentDate.getHours() + 1);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    if (docInfo) {
      getAvaiableSlot();
    }
  }, [docInfo]);

  const fetchDocInfo = async () => {
    if (!doctors || doctors.length === 0) {
      console.error('Doctors data is not available yet');
      return;
    }

    const doctor = doctors.find((doc) => doc._id === docId);
    if (!doctor) {
      toast.error('Doctor not found');
      return navigate('/');
    }
    setDocInfo(doctor);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment');
      return navigate('/login');
    }

    const reason = selectedReason === 'Other' ? customReason.trim() : selectedReason;
    if (!reason) {
      toast.warn('Please provide a reason for the appointment');
      return;
    }

    try {
      const date = docsSlot[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = `${day}_${month}_${year}`;

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appoitment`,
        { docId, slotDate, slotTime, reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate('/MyAppoiments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);


  return docInfo && (
    <div className="p-4 sm:p-8 bg-gradient-to-br from-blue-50 to-cyan-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Doctor Profile Section */}
        <div className="flex flex-col sm:flex-row gap-8 items-start">
          {/* Doctor Image */}
          <div className="w-full sm:w-1/3">
            <div className="relative pb-[120%] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <img
                className="absolute w-full h-full object-cover"
                src={docInfo.image}
                alt={docInfo.name}
              />
              {docInfo.available && (
                <div className="absolute bottom-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
                  <img className="w-4" src={assets.verified_icon} alt="Verified" />
                  Available
                </div>
              )}
            </div>
          </div>

          {/* Doctor Info */}
          <div className="flex-1 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {docInfo.name}
            </h1>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {docInfo.speciality}
              </span>
              <span className="text-gray-500 text-sm">•</span>
              <span className="text-gray-600 text-sm">{docInfo.degree}</span>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <img src={assets.info_icon} className="w-5 h-5" alt="About" />
                About
              </h2>
              <p className="text-gray-600 leading-relaxed">{docInfo.about}</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-20">
                  {/* Consultation Fee */}
                  <div>
                    <p className="text-medium text-gray-600">Consultation Fee</p>
                    <p className="text-2xl font-bold text-blue-800">
                      {currencySymbol}{docInfo.fees}
                    </p>
                  </div>

                  {/* Experience */}
                  <div className="flex items-center gap-2">
                    <img src={assets.experience_icon} className="w-6 h-6" alt="Experience" />
                    <span className="text-gray-700">{docInfo.experience} Years Experience</span>
                  </div>
                </div>


                <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Patient Reviews</h2>

                  {docInfo.ratings.length > 0 ? (
                    docInfo.ratings.map((rating, index) => (
                      <div
                        key={index}
                        className="bg-gray-60 p-4 rounded-lg shadow-sm border border-gray-500 mb-4"
                      >

                        <div className="flex items-center justify-between mb-2">
                          {/* Star Ratings */}
                          <div className="flex">
                            {[...Array(rating.rating)].map((_, i) => (
                              <span key={i} className="text-yellow-500 text-lg">★</span>
                            ))}
                            {[...Array(5 - rating.rating)].map((_, i) => (
                              <span key={i} className="text-gray-400 text-lg">★</span>
                            ))}
                          </div>

                          {/* Created Date */}
                          <p className="text-sm text-gray-900">{new Date(rating.createdAt).toLocaleDateString()}</p>
                        </div>

                        <p className="text-gray-800 text-lg font-medium mb-2">{rating.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center">No reviews yet.</p>
                  )}
                </div>


              </div>
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <div className="mt-12 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Book Appointment</h2>

          {/* Date Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Date</h3>
            <div className="grid grid-cols-7 gap-2">
              {docsSlot.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSlotIndex(index)}
                  className={`p-3 rounded-xl transition-all ${slotIndex === index
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 hover:bg-blue-50 text-gray-700'
                    }`}
                >
                  <div className="text-sm font-medium">
                    {item[0]?.datetime && daysOfWeek[item[0].datetime.getDay()]}
                  </div>
                  <div className="text-xs">
                    {item[0]?.datetime && item[0].datetime.getDate()}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Available Time Slots</h3>
            <div className="flex flex-wrap gap-3">
              {docsSlot[slotIndex]?.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSlotTime(item.time)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${item.time === slotTime
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 hover:bg-blue-100 text-gray-700'
                    }`}
                >
                  {item.time}
                </button>
              )) || (
                  <div className="w-full py-4 text-center text-gray-500">
                    No available slots for this date
                  </div>
                )}
            </div>
          </div>

          {/* Reason Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Appointment Reason</h3>
            <div className="space-y-4">
              <select
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                value={selectedReason}
                onChange={(e) => setSelectedReason(e.target.value)}
              >
                <option value="" disabled>Select a reason</option>
                <option value="Consultation">Consultation</option>
                <option value="Follow-up">Follow-up</option>
                <option value="General treatment">General treatment</option>
                <option value="Other">Other</option>

              </select>
              {selectedReason === 'Other' && (
                <div className="mt-3">
                  <textarea
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-600 outline-none"
                    rows="4"
                    placeholder="Specify your reason..."
                    value={customReason}
                    maxLength={MAX_REASON_LENGTH}
                    onChange={(e) => setCustomReason(e.target.value)}
                  ></textarea>
                  <p className="text-sm text-gray-500 mt-1">{customReason.length}/{MAX_REASON_LENGTH} characters</p>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white text-sm font-medium px-8 py-3 rounded-full mt-6"
            >
              Book an Appointment
            </button>
          </div>

          <RelatedDoctors docId={docId} speciality={docInfo.speciality} />

          {showModal && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-20 rounded-lg shadow-lg max-w-medium">
                <h3 className="text-2xl font-bold mb-10">Confirm Appointment</h3>
                <p className="text-medium mb-1">Doctor: {docInfo.name}</p>
                <p className="text-medium mb-1">Date: {docsSlot[slotIndex][0]?.datetime.toDateString()}</p>
                <p className="text-medium mb-1">Time: {slotTime}</p>
                <p className="text-medium mb-1">Reason: {selectedReason === 'Other' ? customReason : selectedReason}</p>
                <div className="mt-6 flex gap-12">
                  <button
                    onClick={bookAppointment}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>



      </div>
    </div>
  );
};

export default Appointment;
