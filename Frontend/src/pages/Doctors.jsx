

import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
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
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div className="p-6 text-gray-800 bg-gray-50">
      <p className="text-lg font-medium mb-4">Find Doctors by Speciality</p>
      <div className="flex flex-col sm:flex-row items-start gap-6">
        <button
          className={`py-2 px-4 border rounded-lg text-sm transition-all sm:hidden ${
            showFilter ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'
          }`}
          onClick={() => setShowFilter(prev => !prev)}
        >
          {showFilter ? 'Hide Filters' : 'Show Filters'}
        </button>

        <div className={`flex-col gap-4 text-sm ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          {[
            { label: 'General physician', value: 'General physician' },
            { label: 'Gynecologist', value: 'Gynecologist' },
            { label: 'Dermatologist', value: 'Dermatologist' },
            { label: 'Pediatricians', value: 'Pediatricians' },
            { label: 'Neurologist', value: 'Neurologist' },
            { label: 'Gastroenterologist', value: 'Gastroenterologist' },
          ].map(({ label, value }, index) => (
            <p
              key={index}
              onClick={() =>
                speciality === value ? navigate('/doctors') : navigate(`/doctors/${value}`)
              }
              className={`pl-4 py-2 pr-16 border rounded-lg transition-all cursor-pointer ${
                speciality === value ? 'bg-blue-200 text-blue-800' : 'bg-white text-gray-800'
              }`}
            >
              {label}
            </p>
          ))}
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border rounded-lg overflow-hidden cursor-pointer shadow hover:shadow-lg transition-transform hover:scale-105"
            >
              <img
                className="w-full h-48 object-top object-cover bg-gray-300"
                src={item.image}
                alt={`${item.name}`}
              />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  <p>Available</p>
                </div>
                <p className="text-lg font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-600">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
