import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MedicalRecord = () => {
  const navigate = useNavigate(); 
  const [records, setRecords] = useState([
    {
      year: '2023',
      medicine: 'Paracetamol',
      notes: 'For fever',
      chronicIllnesses: 'Heart problems',
      vaccinations: 'COVID-19 Vaccine',
      labResults: 'MRI Report',
      doctor: 'Dr. Haru Lal',
      file: null,
    },
    { year: '2024', medicine: 'Ibuprofen', notes: 'For headache', file: null },
  ]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [newRecord, setNewRecord] = useState({
    year: '',
    medicine: '',
    notes: '',
    chronicIllnesses: '',
    pastSurgeries: '',
    vaccinations: '',
    labResults: '',
    doctor: '',
    file: null,
  });
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecord({ ...newRecord, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewRecord({ ...newRecord, file: e.target.files[0] });
  };

  const addRecord = () => {
    if (newRecord.year && newRecord.medicine) {
      setRecords([...records, newRecord]);
      setNewRecord({
        year: '',
        medicine: '',
        notes: '',
        chronicIllnesses: '',
        pastSurgeries: '',
        vaccinations: '',
        labResults: '',
        doctor: '',
        file: null,
      });
      setShowForm(false);
    } else {
      alert('Year and Medicine are required fields.');
    }
  };

  const handleAddRecordClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setShowForm(true);
    } else {
      toast.error('Please log in to add your health record.'); 
      setTimeout(() => {
        navigate("/login"); 
      }, 2000); 
    }
  };

  const selectedRecord = records.find((record) => record.year === selectedYear);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <ToastContainer position="top-center" autoClose={3000} />
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">
        Medical History
      </h1>

      <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
        {/* Sidebar */}
        <div className="md:w-1/4 bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Select Year
          </h2>
          <ul className="space-y-2">
            {records.map((record, index) => (
              <li
                key={index}
                className={`cursor-pointer p-2 text-center rounded-md ${
                  selectedYear === record.year
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedYear(record.year)}
              >
                {record.year}
              </li>
            ))}
          </ul>
        </div>

        {/* Record Details */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
          {selectedRecord ? (
            <>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                Details for {selectedRecord.year}
              </h2>
              <table className="table-auto w-full border-collapse border border-gray-300 text-left">
                <tbody>
                  {Object.entries(selectedRecord).map(
                    ([key, value], index) =>
                      key !== 'file' && (
                        <tr key={index}>
                          <td className="p-2 font-medium border border-gray-300 capitalize">
                            {key.replace(/([A-Z])/g, ' $1')}:
                          </td>
                          <td className="p-2 border border-gray-300">
                            {value || 'N/A'}
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
              {selectedRecord.file && (
                <div className="mt-4">
                  <a
                    href={URL.createObjectURL(selectedRecord.file)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 underline"
                  >
                    View Attached File
                  </a>
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-500">Select a year to view details.</p>
          )}
          <button
            onClick={handleAddRecordClick}
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add New Record
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Add New Record
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(newRecord).map(
                (key) =>
                  key !== 'file' && (
                    <div key={key} className="col-span-1">
                      <label
                        htmlFor={key}
                        className="block text-sm font-medium text-gray-700"
                      >
                        {key.replace(/([A-Z])/g, ' $1')}
                      </label>
                      <input
                        type={key === 'notes' ? 'textarea' : 'text'}
                        name={key}
                        value={newRecord[key]}
                        onChange={handleInputChange}
                        id={key}
                        placeholder={`Enter ${key}`}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  )
              )}
              <div className="col-span-2">
                <label
                  htmlFor="file"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload File/Image
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={addRecord}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Save Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalRecord;
