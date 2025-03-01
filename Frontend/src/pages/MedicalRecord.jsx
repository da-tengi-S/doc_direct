

import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const MedicalRecord = () => {
  const navigate = useNavigate();
  const { backendUrl, token, doctors } = useContext(AppContext);
  const [records, setRecords] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleImageIndex, setVisibleImageIndex] = useState(null);

  const [newRecord, setNewRecord] = useState({
    year: "",
    medicine: "",
    notes: "",
    chronicIllnesses: "",
    pastSurgeries: "",
    vaccinations: "",
    labResults: "",
    doctor: "",
    file: null,
  });

  // Fetch medical records from backend
  const fetchMedicalRecords = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${backendUrl}/api/user/medical-records`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );

      if (data.success) {
        const sortedRecords = data.medicalRecords.sort((a, b) => b.year - a.year);
        setRecords(sortedRecords);
        if (sortedRecords.length > 0 && !selectedYear) {
          setSelectedYear(sortedRecords[0].year);
        }
      }
    } catch (error) {
      console.error("Error fetching medical records:", error);
      toast.error(error.response?.data?.message || "Failed to load medical records");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchMedicalRecords();
    }
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecord(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewRecord(prev => ({ ...prev, file: e.target.files[0] }));
  };

  const handleAddRecord = async (e) => {
    e.preventDefault();
    if (!newRecord.year || !newRecord.medicine || !newRecord.doctor) {
      toast.error("Year, Medicine, and Doctor are required fields");
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(newRecord).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      const { data } = await axios.post(
        `${backendUrl}/api/user/add-medRecord`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success("Record added successfully");
        setRecords(prev => [data.medicalRecord, ...prev]);
        setSelectedYear(data.medicalRecord.year);
        setShowForm(false);
        setNewRecord({
          year: "",
          medicine: "",
          notes: "",
          chronicIllnesses: "",
          pastSurgeries: "",
          vaccinations: "",
          labResults: "",
          doctor: "",
          file: null,
        });
      }
    } catch (error) {
      console.error("Add record error:", error);
      toast.error(error.response?.data?.message || "Failed to add record");
    }
  };

  const uniqueYears = [...new Set(records.map(record => record.year))].sort((a, b) => b - a);
  const selectedRecords = records.filter(record => record.year === selectedYear);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <ToastContainer position="top-center" autoClose={3000} />
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">
        Medical History
      </h1>

      <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
        {/* Year Selection Panel */}
        <div className="md:w-1/4 bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Select Year
          </h2>
          {isLoading ? (
            <div className="animate-pulse space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-8 bg-gray-200 rounded-md"></div>
              ))}
            </div>
          ) : (
            <ul className="space-y-2">
              {uniqueYears.map(year => (
                <li
                  key={year}
                  className={`cursor-pointer p-2 text-center rounded-md transition-colors
                    ${selectedYear === year
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200"}`}
                  onClick={() => setSelectedYear(year)}
                >
                  {year}
                </li>
              ))}
            </ul>
          )}
        </div>


        {/* Records Display */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
          {isLoading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 w-1/2 rounded"></div>
              <div className="h-4 bg-gray-200 w-full rounded"></div>
              <div className="h-4 bg-gray-200 w-3/4 rounded"></div>
            </div>
          ) : selectedYear ? (
            <>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                Records for {selectedYear}
              </h2>
              {selectedRecords.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-3 px-4 border-b text-left">Year</th>
                        <th className="py-3 px-4 border-b text-left">Medicine</th>
                        <th className="py-3 px-4 border-b text-left">Doctor</th>
                        <th className="py-3 px-4 border-b text-left">Chronic Illnesses</th>
                        <th className="py-3 px-4 border-b text-left">Vaccinations</th>
                        <th className="py-3 px-4 border-b text-left">PastSurgeries</th>
                        <th className="py-3 px-4 border-b text-left">LabResults</th>
                        <th className="py-3 px-4 border-b text-left">Notes</th>
                        <th className="py-3 px-4 border-b text-left">Attachment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedRecords.map((record, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{record.year}</td>
                          <td className="py-3 px-4">{record.medicine}</td>
                          <td className="py-3 px-4">{record.doctor}</td>
                          <td className="py-3 px-4">{record.chronicIllnesses || "N/A"}</td>
                          <td className="py-3 px-4">{record.vaccinations || "N/A"}</td>
                          <td className="py-3 px-4">{record.pastSurgeries || "N/A"}</td>
                          <td className="py-3 px-4">{record.labResults || "N/A"}</td>
                          <td className="py-3 px-4 whitespace-pre-wrap">{record.notes || "-"}</td>
                          <td className="py-3 px-4">
                            {record.image && (
                              <button
                                onClick={() => setVisibleImageIndex(visibleImageIndex === index ? null : index)}
                                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors"
                              >
                                {visibleImageIndex === index ? 'Hide' : 'View'}
                              </button>
                            )}
                            {visibleImageIndex === index && record.image && (
                              record.image.match(/\.(jpeg|jpg|png|gif)(\?.*)?$/i) ? (
                                <img
                                  src={record.image}
                                  alt="Medical record"
                                  className="max-w-xs h-auto rounded-lg shadow-md mt-2"
                                />
                              ) : (
                                <a
                                  href={record.image}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-500 hover:underline block mt-2"
                                >
                                  View File
                                </a>
                              )
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500">No records found for this year</p>
              )}
            </>
          ) : (
            <p className="text-gray-500">Select a year to view records</p>
          )}

          <button
            onClick={() => setShowForm(true)}
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Add New Record
          </button>
        </div>
      </div>

      {/* Add Record Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Add New Record</h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddRecord} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-medium">Year <span className="text-red-600">*</span></label>
                    <select
                      name="year"
                      value={newRecord.year}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                      required
                    >
                      <option value="">Select Year</option>
                      {Array.from({ length: 30 }, (_, i) => {
                        const year = new Date().getFullYear() - i;
                        return (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  {['medicine', 'chronicIllnesses', 'pastSurgeries',
                    'vaccinations', 'labResults'].map((field) => (
                      <div key={field}>
                        <label className="block mb-1 font-medium">
                          {field.replace(/([A-Z])/g, ' $1')} {['medicine', 'doctor'].includes(field) && <span style={{ color: 'red' }}> *</span>}

                        </label>
                        <input
                          type="text"
                          name={field}
                          value={newRecord[field]}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-md"
                          required={['medicine', 'doctor'].includes(field)}
                        />
                      </div>
                    ))}
                  <div>
                    <label className="block mb-1 font-medium">Doctor <span className="text-red-600">*</span></label>
                    <select
                      name="doctor"
                      value={newRecord.doctor}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                      required
                    >
                      <option value="">Select Doctor</option>
                      {doctors.map((doc) => (
                        <option key={doc._id} value={doc.name}>
                          {doc.name}
                        </option>
                      ))}
                    </select>
                  </div>


                  <div className="col-span-2">
                    <label className="block mb-2 font-medium text-gray-700">Notes</label>
                    <textarea
                      name="notes"
                      value={newRecord.notes}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>


                  <div className="col-span-2">
                    <label className="block mb-1 font-medium">Upload File</label>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="w-full p-2 border rounded-md"
                      accept="image/*, .pdf, .doc, .docx"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Supported formats:  PNG, PDF
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 border rounded-md hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Save Record
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalRecord;

