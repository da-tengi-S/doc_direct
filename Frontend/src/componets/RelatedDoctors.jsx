import React, { useContext, useEffect, useState } from 'react'
//import { doctors } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext)
  const [relDoc, setRelDoc] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsdata = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
      setRelDoc(doctorsdata)
    }
  }, [doctors, speciality, docId])
  return (
    <div>
      <div className='flex flex-col items-center  gap-4 my-16 text-gary-900 md:mx-10'>
        <h1 className='text-3xl font-medium'> All top doctors</h1>
        <p className='sm:w-1/3 text-center text-sm'>Luia eius quam iure nihil tempore cum quod at tur, amet suscipit debitis numquam ab!</p>

        <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
          {relDoc.slice(0, 5).map((item, index) => (
            <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} key={index} className='border border-blue-200 rounded-x overflow-hidden cursor-pointer  hover:-translate-y-2 transition-all duration-500'  >
              <img className='bg-blue-50' src={item.image} alt="" />
              <div className='p-4' >
                <div className='flex item-center gap-2 text-sm text-center text-green-500'>
                  <p className='w-2 h-2 bg-green-500 rounded-full' ></p><p>Avialable</p>
                </div>
                <p className='text-gary-900 text-lg font-medium'>{item.name}</p>
                <p className='text-gary-600 text-sm'>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'>More</button>
      </div>
    </div>
  )
}

export default RelatedDoctors