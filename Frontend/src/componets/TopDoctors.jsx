import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);

    return (
        <div className="flex flex-col items-center my-16 px-6 text-gray-800">
            <h1 className="text-4xl font-bold mb-4">Top Doctors</h1>
            <p className="max-w-md text-center text-base text-gray-600 mb-8">
                Meet our top-rated doctors, ready to provide you with exceptional care and expertise.
            </p>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {doctors?.slice(0, 10).map((doctor, index) => (
                    <div
                        key={index}
                        onClick={() => { navigate(`/appointment/${doctor._id}`); scrollTo(0, 0); }}
                        className="border border-gray-300 shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
                    >
                        <img
                            className="w-full h-48 object-top object-cover"
                            src={doctor.image}
                            alt={`${doctor.name}`}
                        />
                        <div className="p-4">
                            <div className="flex items-center text-green-500 mb-2">
                                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                                <span>Available</span>
                            </div>
                            <p className="text-xl font-semibold text-gray-900 mb-1">{doctor.name}</p>
                            <p className="text-gray-600">{doctor.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => { navigate('/doctors'); scrollTo(0, 0); }}
                className="mt-10 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all"
            >
                View All Doctors
            </button>
        </div>
    );
};

export default TopDoctors;
