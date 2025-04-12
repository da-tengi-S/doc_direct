


import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);

    const firstHalf = doctors?.slice(0, 4);
    const secondHalf = doctors?.slice(4, 8);

    return (
        <div className="w-full bg-gray-100 py-16 px-6 sm:px-8 lg:px-12">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800">Our Top Doctors</h1>
                    <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
                        Meet our highly skilled and experienced doctors dedicated to providing you with the best care.
                    </p>
                </div>

                {/* First 4 Doctors */}
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {firstHalf?.map((doctor) => (
                        <DoctorCard key={doctor._id} doctor={doctor} navigate={navigate} />
                    ))}
                </div>

                {/* Horizontal Line */}
                <hr className="my-14 border-t-4 border-blue-400 w-3/4 mx-auto" />

                {/* Next 4 Doctors */}
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {secondHalf?.map((doctor) => (
                        <DoctorCard key={doctor._id} doctor={doctor} navigate={navigate} />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button
                        onClick={() => navigate("/doctors")}
                        className="px-6 py-3 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
                    >
                        View All Doctors
                    </button>
                </div>
            </div>
        </div>
    );
};

const DoctorCard = ({ doctor, navigate }) => {
    const totalRatings = doctor.ratings?.length || 0;
    const averageRating =
        totalRatings > 0
            ? doctor.ratings.reduce((acc, r) => acc + r.rating, 0) / totalRatings
            : 0;

    return (
        <div className="bg-white rounded-lg shadow-md p-8 text-center transition-transform transform hover:scale-105">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-blue-500">
                <img className="w-full h-full object-cover" src={doctor.image} alt={`${doctor.name}`} />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-800">{doctor.name}</h3>
            <p className="text-gray-600 text-sm">{doctor.speciality}</p>

            {totalRatings > 0 ? (
                <div className="mt-2 flex justify-center items-center">
                    <span className="text-yellow-500 text-lg">
                        {Array.from({ length: Math.round(averageRating) }).map((_, i) => "⭐")}
                    </span>
                    <span className="ml-2 text-sm text-gray-600">({averageRating.toFixed(1)})</span>
                    <span className="mx-1 text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{totalRatings} reviews</span>
                </div>
            ) : (
                <p className="text-gray-400 mt-3 text-sm">No ratings yet</p>
            )}

            <button
                onClick={() => navigate(`/appointment/${doctor._id}`)}
                disabled={!doctor.available}
                className={`mt-6 w-full py-2 rounded-lg font-medium transition-colors ${doctor.available
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
            >
                {doctor.available ? "Book Appointment" : "Not Available"}
            </button>
        </div>
    );
};

export default TopDoctors;
