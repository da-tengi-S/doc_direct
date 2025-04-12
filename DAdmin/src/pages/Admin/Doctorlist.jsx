


import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';

const Doctorlist = () => {
  const { doctors, aToken, getAlldoctors, changeAvaialabilty } = useContext(AdminContext);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
    if (aToken) {
      getAlldoctors();
    }
  }, [aToken]);

  useEffect(() => {
    if (doctors) {
      const filtered = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDoctors(filtered);
    }
  }, [searchTerm, doctors]);

  const toggleExpand = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const total = ratings.reduce((acc, curr) => acc + curr.rating, 0);
    return (total / ratings.length).toFixed(1);
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
  };
  return (
    <div className="container mx-auto p-6 lg:px-12 bg-white min-h-screen text-black font-bold">

      {/* Fixed Header Section */}
      <div className="sticky top-0 bg-green-500 z-15 p-3 shadow-md">
        <h1 className="text-3xl text-center mb-4">Doctors Directory</h1>
        <div className="max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search doctors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 rounded-xl bg-gray-200 border border-gray-400 shadow-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Scrollable Doctor List */}
      <div className="h-[70vh] overflow-y-auto p-3 space-y-10">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((item, index) => (
            <div
              key={index}
              className="group bg-gray-100 rounded-2xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
            >
              {/* Doctor Info */}
              <div
                className="flex items-center justify-between p-10 cursor-pointer"
                onClick={() => toggleExpand(index)}
              >
                <div className="flex items-center space-x-15">
                  <img
                    src={item.image || '/placeholder-doctor.jpg'}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-full border-2 border-blue-500 shadow-lg"
                  />
                  <div>
                    <h2 className="text-2xl text-black">{item.name}</h2>
                    <p className="text-gray-600">{item.speciality}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-lg text-yellow-500">
                      {item.ratings.length > 0 ? item.ratings.reduce((a, b) => a + b.rating, 0) / item.ratings.length : "No Ratings"}/5
                    </div>
                    <div className="text-sm text-gray-600">
                      {item.ratings?.length || 0} reviews
                    </div>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm ${item.available ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {item.available ? 'Available' : 'Busy'}
                  </span>
                </div>
              </div>

              {/* Expandable Section */}
              {expandedIndex === index && (
                <div className="px-8 pb-10 bg-white-200">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
                    <div className="space-y-8">
                      <div className="flex justify-between items-center bg-green-100 p-4 rounded-xl">
                        <span className="text-gray-600">Availability Status:</span>
                        <button
                          onClick={() => changeAvaialabilty(item._id)}
                          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                        >
                          Toggle Availability
                        </button>
                      </div>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-80 object-cover object-top rounded-xl border-2 border-gray-400"
                      />

                    </div>

                    <div className="bg-gray-100 p-6 rounded-xl">
                      <h3 className="text-xl mb-4 text-purple-700">
                        Patient Reviews ({item.ratings?.length || 0})
                      </h3>
                      <div className="h-64 overflow-y-auto space-y-4 pr-3">
                        {item.ratings?.length > 0 ? (
                          item.ratings.map((rating, idx) => (
                            <div key={idx} className="bg-gray-300 p-4 rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <span className="font-medium text-blue-700">
                                    {rating.patientId?.name || 'Anonymous'}
                                  </span>
                                  <div className="text-yellow-500 text-sm">
                                    {'⭐'.repeat(rating.rating)}
                                  </div>
                                </div>
                                <span className="text-xs text-gray-600">
                                  {new Date(rating.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-gray-700 text-sm">{rating.comment}</p>
                            </div>
                          ))
                        ) : (
                          <div className="text-center text-gray-600 p-4">
                            No reviews yet
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-2xl text-gray-500 py-12">
            No doctors found matching your search
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctorlist;