import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx'


const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showfilter , setShowFilter] = useState(false)
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality]);

  return (
    <div>
      <p className="text-gray-600">Choose by doctor's speciality.</p>
      <div className="flex flex-cols sm:flex-row items-start gap-5 mt-5">
        <button className={`py-1 px-3 border rounded  text-sm transition-all sm:hiddden ${showfilter ? 'bg-primary text-white ' : ''}`} onClick={() => setShowFilter(prev => !prev)}>Filter</button>
      <div className={` flex-col gap-4 text-sm text-gray-600 ${showfilter ?  'flex' : 'hidden sm:flex' }`}>
          <p onClick={()=> speciality ==='General Physician (सामान्य चिकित्सक)'? navigate('/doctors'):navigate('/doctors/General Physician (सामान्य चिकित्सक)') }  className={`w-[94vw] md:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality=='General physician' ? "bg-indigo-200 text-black": "" }`}> Physician
          </p>
          <p onClick={() => speciality ==='Gynecologist (प्रसूति एवं स्त्रीरोग विशेषज्ञ)' ? navigate('/doctors'):navigate('/doctors/Gynecologist (प्रसूति एवं स्त्रीरोग विशेषज्ञ)')}  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality=='Gynecologist' ? "bg-indigo-100 text-black": ""}`}>
            Gynecologist
          </p>
          <p onClick={() => speciality ==='Dermatologist (छालारोग विशेषज्ञ)' ? navigate('/doctors'):navigate('/doctors/Dermatologist (छालारोग विशेषज्ञ)')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality=='Dermatologist' ? "bg-indigo-100 text-black": ""}`}>
            Dermatologist
          </p>
          <p onClick={() => speciality ==='Pediatrician (बालरोग विशेषज्ञ)' ? navigate('/doctors'):navigate('/doctors/Pediatrician (बालरोग विशेषज्ञ)')}className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality=='Pediatricians' ? "bg-indigo-100 text-black": ""}`}>
            Pediatricians
          </p>
          <p onClick={() => speciality ==='Neurologist (मस्तिष्क तथा स्नायु विशेषज्ञ)' ? navigate('/doctors'):navigate('/doctors/Neurologist (मस्तिष्क तथा स्नायु विशेषज्ञ)')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality=='Neurologist' ? "bg-indigo-100 text-black": ""}`}>
            Neurologist
          </p>
          <p onClick={() => speciality ==='Gastroenterologist (आन्द्रा तथा पेट विशेषज्ञ)' ? navigate('/doctors'):navigate('/doctors/Gastroenterologist (आन्द्रा तथा पेट विशेषज्ञ)')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality=='Neurologist' ? "bg-indigo-100 text-black": ""}`}>
          Gastroenterologist
          </p>
        </div>

        <div className='w-full grid grid-cols-auto gap-4 gapy-6'>
          {
            filterDoc.map((item, index) => (
              <div
                onClick={() => navigate(`/appointment/${item._id}`)} key={index} className='border border-blue-200 rounded-x overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500'>
                <img className='bg-gray-300' src={item.image} alt="" />
                <div className='p-4'>
                  <div className='flex item-center gap-2 text-sm text-center text-green-500'>
                    <p className='w-2 h-2 bg-green-500 rounded-full'></p> <p>Available</p>
                  </div>
                  <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                  <p className='text-gray-600 text-sm'>{item.speciality}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;


