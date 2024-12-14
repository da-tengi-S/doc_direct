import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <div className='flex flex-col items-center gap-6 py-12 text-gray-700 bg-gray-50' id='speciality'>
            <h1 className='text-4xl font-semibold text-green-800'>Get Doctors by Speciality</h1>
            <p className='sm:w-2/5 text-center text-sm leading-relaxed'>Discover expert doctors for all your healthcare needs. Choose your specialty and get started!</p>
            <div className='flex sm:justify-center gap-7 pt-8 w-full overflow-x-auto scrollbar-hide'>
                {specialityData.map((items, index) => (
                    <Link 
                        onClick={() => scrollTo(0, 0)} 
                        className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-transform duration-300 ease-in-out' 
                        key={index} 
                        to={`/doctors/${items.speciality}`}
                    >
                        <img className='w-18 sm:w-20 lg:w-24 mb-2 rounded-md shadow-md hover:shadow-lg' src={items.image} alt={items.speciality} />
                        <p className='font-medium'>{items.speciality}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu
