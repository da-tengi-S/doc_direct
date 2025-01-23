

// import React, { useContext, useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { AppContext } from '../context/AppContext'
// import { assets } from '../assets/assets'
// import RelatedDoctors from '../componets/RelatedDoctors'

// const Appointment = () => {
//   const { docId } = useParams()
//   const { doctors, currencySymbol } = useContext(AppContext)
//   const [docInfo, setDocInfo] = useState(null)
//   const [docsSlot, setDocSlots] = useState([])
//   const [slotIndex, setSlotIndex] = useState(0)  
//   const [slotTime, setSlotTime] = useState('')

//   const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", 'Fri', "Sat"]

//   const getAvaiableSlot = () => {
//     setDocSlots([])

//     // getting current date 
//     let today = new Date()
//     for (let i = 0; i < 7; i++) {
//       //getting date with index
//       let currentDate = new Date(today)
//       currentDate.setDate(today.getDate() + i)

//       //setting end time and date 
//       let endTime = new Date()
//       endTime.setDate(today.getDate() + i)
//       endTime.setHours(21, 0, 0, 0)

//       if (today.getDate() === currentDate.getDate()) {
//         currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
//         currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
//       } else {
//         currentDate.setHours(10)
//         currentDate.setMinutes(0)
//       }

//       let timeSlots = []
//       while (currentDate < endTime) {
//         let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 

//         // add slot to array
//         timeSlots.push({
//           datetime: new Date(currentDate),
//           time: formattedTime
//         })

//         currentDate.setMinutes(currentDate.getMinutes() + 30)
//       }
//       setDocSlots(prev => ([...prev, timeSlots]))
//     }
//   }

//   useEffect(() => {
//     getAvaiableSlot()
//   }, [docInfo])

//   useEffect(() => {
//     console.log(docsSlot)
//   }, [docsSlot])

//   const fetchDocInfo = async () => {
//     const docInfo = doctors.find(doc => doc._id === docId)
//     setDocInfo(docInfo)
//   }

//   useEffect(() => {
//     fetchDocInfo()
//   }, [doctors, docId])

//   useEffect(() => {
//     console.log(docInfo)
//   }, [docInfo])
//   return docInfo && (
//     <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
//       <div className="flex flex-col sm:flex-row gap-6 items-start">
//         <div className="flex-shrink-0">
//           <img 
//             className="w-full sm:max-w-xs rounded-lg shadow-lg object-cover" 
//             src={docInfo.image} 
//             alt={docInfo.name} 
//           />
//         </div>
//         <div className="flex-1 border border-gray-300 rounded-lg p-6 bg-white shadow-md">
//           <p className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//             {docInfo.name}
//             <img className="w-5" src={assets.verified_icon} alt="Verified" />
//           </p>
//           <p className="text-gray-600 text-sm mt-1">{docInfo.degree} - {docInfo.speciality}</p>
//           <div className="mt-2 flex items-center gap-2">
//             <span className="px-3 py-1 text-xs border rounded-full">{docInfo.experience}</span>
//           </div>
//           <div className="mt-4">
//             <p className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//               About
//               <img src={assets.info_icon} alt="Info" />
//             </p>
//             <p className="text-sm text-gray-600 mt-1 leading-6">{docInfo.about}</p>
//           </div>
//           <p className="text-gray-500 font-medium mt-4">
//             Appointment fee: <span className="text-gray-700">{currencySymbol}{docInfo.fees}</span>
//           </p>
//         </div>
//       </div>
  
//       {/* Booking Slot in Grid/Table Form */}
//       <div className="mt-8">
//         <p className="text-xl font-semibold text-gray-800">Booking Slots</p>
  
//         {/* Days of the Week (Header Row) */}
//         <div className="grid grid-cols-7 gap-4 text-center mt-6">
//           {docsSlot.length > 0 && docsSlot.map((item, index) => (
//             <div 
//               onClick={() => setSlotIndex(index)}  
//               key={index} 
//               className={`py-4 px-6 cursor-pointer rounded-lg transition-colors duration-200 ${slotIndex === index ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
//             >
//               <p className="text-lg font-bold">{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
//               <p className="text-sm">{item[0] && item[0].datetime.getDate()}</p>
//             </div>
//           ))}
//         </div>
  
//         {/* Time Slots for Selected Day (Grid Layout) */}
//         <div className="grid grid-cols-4 gap-4 mt-6">
//           {docsSlot.length && docsSlot[slotIndex].map((item, index) => (
//             <p 
//               onClick={() => setSlotTime(item.time)} 
//               className={`text-sm px-4 py-2 text-center cursor-pointer rounded-lg transition-colors duration-200 ${item.time === slotTime ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
//               key={index}
//             >
//               {item.time}
//             </p>
//           ))}
//         </div>
  
//         <button className="bg-blue-600 text-white text-sm font-medium px-8 py-3 rounded-full mt-6 hover:bg-blue-700 transition-colors">
//           Book an Appointment
//         </button>
//       </div>
// <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
//     </div>
//   )
  
// }

// export default Appointment



import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../componets/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'


const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [docsSlot, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const navigate = useNavigate();

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

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

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    if (docInfo) {
      getAvaiableSlot();
    }
  }, [docInfo]);

  useEffect(() => {
    console.log(docsSlot);
  }, [docsSlot]);

  // const fetchDocInfo = async () => {
  //   const doctor = doctors.find((doc) => doc._id === docId);
  //   if (!doctor) {
  //     console.error(`Doctor with ID ${docId} not found`);
  //     toast.error("Doctor not found");
  //     return navigate('/');
  //   }
  //   setDocInfo(doctor);
  // };
  const fetchDocInfo = async () => {
    console.log("Doctors:", doctors);
    if (!doctors || doctors.length === 0) {
      console.error("Doctors data is not available yet");
      return;
    }

    const doctor = doctors.find((doc) => doc._id === docId);
    if (!doctor) {
      console.error(`Doctor with ID ${docId} not found`);
      toast.error("Doctor not found");
      return navigate('/');
    }
    setDocInfo(doctor);
  };


  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate('/login');
    }
    try {
      const date = docsSlot[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = `${day}_${month}_${year}`;
      console.log(slotDate);

      // const { data } = await axios.post(
      //   `${backendUrl}/api/user/book-appointment`,
      //   { docId, slotDate, slotTime },
      //   { headers: { Authorization: `Bearer ${token}` } }
      // );

      const { data } = await axios.post(`${backendUrl}/api/user/book-appoitment`, {
        docId, slotDate, slotTime
      },
        { headers: { Authorization: `Bearer ${token}` } },)

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate('/MyAppointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    console.log(docInfo);
  }, [docInfo]);

  return docInfo && (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <div className="flex-shrink-0">
          <img
            className="w-full sm:max-w-xs rounded-lg shadow-lg object-cover"
            src={docInfo.image}
            alt={docInfo.name}
          />
        </div>
        <div className="flex-1 border border-gray-300 rounded-lg p-6 bg-white shadow-md">
          <p className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            {docInfo.name}
            <img className="w-5" src={assets.verified_icon} alt="Verified" />
          </p>
          <p className="text-gray-600 text-sm mt-1">{docInfo.degree} - {docInfo.speciality}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="px-3 py-1 text-xs border rounded-full">{docInfo.experience}</span>
          </div>
          <div className="mt-4">
            <p className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              About
              <img src={assets.info_icon} alt="Info" />
            </p>
            <p className="text-sm text-gray-600 mt-1 leading-6">{docInfo.about}</p>
          </div>
          <p className="text-gray-500 font-medium mt-4">
            Appointment fee: <span className="text-gray-700">{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      <div className="mt-8">
        <p className="text-xl font-semibold text-gray-800">Booking Slots</p>
        <div className="grid grid-cols-7 gap-4 text-center mt-6">
          {docsSlot.length > 0 && docsSlot.map((item, index) => (
            <div
              onClick={() => setSlotIndex(index)}
              key={index}
              className={`py-4 px-6 cursor-pointer rounded-lg transition-colors duration-200 ${slotIndex === index ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              <p className="text-lg font-bold">{item[0]?.datetime && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p className="text-sm">{item[0]?.datetime && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-4 mt-6">
          {docsSlot.length && docsSlot[slotIndex]?.map((item, index) => (
            <p
              onClick={() => setSlotTime(item.time)}
              className={`text-sm px-4 py-2 text-center cursor-pointer rounded-lg transition-colors duration-200 ${item.time === slotTime ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              key={index}
            >
              {item.time}
            </p>
          )) || <p className="text-sm text-gray-500 col-span-4">No slots available</p>}
        </div>

        <button onClick={bookAppointment} className="bg-blue-600 text-white text-sm font-medium px-8 py-3 rounded-full mt-6 hover:bg-blue-700 transition-colors">
          Book an Appointment
        </button>
      </div>
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointment;


