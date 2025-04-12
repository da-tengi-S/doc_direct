import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const DoctorsWithVideo = () => {
    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);
    const videoDoctors = doctors?.filter(doctor => doctor.videocall === true);

    return (
        <div className="w-full bg-gray-100 py-16 px-6 sm:px-8 lg:px-12">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800">Online Video Consultations</h2>
                    <p className="mt-3 text-lg text-gray-600">Connect with experienced specialists from the comfort of your home.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

                    {videoDoctors?.slice(0, 3).map((doctor) => (
                      <div key={doctor._id} className="bg-white rounded-lg shadow-md p-8 text-center transition-transform transform hover:scale-105">

                            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-blue-500">
                                <img className="w-full h-full object-cover" src={doctor.image} alt={doctor.name} />
                            </div>
                            <h3 className="mt-4 text-xl font-semibold text-gray-800">{doctor.name}</h3>
                            <p className="text-gray-600 text-sm">{doctor.speciality}</p>
                            <p className="text-gray-500 text-sm mt-2">{doctor.bio || "Experienced and certified specialist."}</p>
                            <button 
                                onClick={() => navigate(`/appointment/${doctor._id}`)}
                                disabled={!doctor.available}
                                className={`mt-4 w-full py-2 rounded-lg font-medium transition-colors ${doctor.available 
                                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                            >
                                {doctor.available ? "Book Video Call" : "Not Available"}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button 
                        onClick={() => navigate("/doctors")} 
                        className="px-6 py-3 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition">
                        View All Doctors
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DoctorsWithVideo;
