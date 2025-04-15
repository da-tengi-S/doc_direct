


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
  const [searchTerm, setSearchTerm] = useState("");
  const [accessRequests, setAccessRequests] = useState([]);
  const [isFetchingRequests, setIsFetchingRequests] = useState(false);
  const [isRequestLoading, setIsRequestLoading] = useState(false);

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

  useEffect(() => {
    const fetchAccessRequests = async () => {
      try {
        setIsRequestLoading(true);
        // Remove the empty body from the POST request
        const { data } = await axios.post(
          `${backendUrl}/api/user/view-access-requests`,
          null, // Send null instead of empty object
          { headers: { Authorization: `Bearer ${token}` } }
        );
    
        console.log("Access requests data:", data);
    
        if (data.success) {
          setAccessRequests(data.requests);
        }
      } catch (err) {
        console.error('Fetch requests error:', err);
        toast.error(err.response?.data?.message || "Failed to fetch requests");
      } finally {
        setIsRequestLoading(false);
      }
    };

    if (token) fetchAccessRequests();
  }, [token, backendUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecord(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewRecord(prev => ({ ...prev, file: e.target.files[0] }));
  };
  const respondToAccessRequest = async (requestId, status) => {
    try {
        const { data } = await axios.put(
            `${backendUrl}/api/user/respond-access-request/${requestId}`,
            { status },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        if (data.success) {
            toast.success(`Request ${status} `);
            setAccessRequests(prev => prev.filter(req => req._id !== requestId));
        }
    } catch (err) {
        console.error('Error responding to request:', err);
        toast.error(err.response?.data?.message || "Failed to respond to request");
    }
};


  const handleAddRecord = async (e) => {
    if (!token) {
      toast.error('Login to book appointment');
      return navigate('/login');
    }

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
  const selectedRecords = records.filter(record =>
    record.year === selectedYear &&
    (record.medicine.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-blue-50 to-gray-50 min-h-screen">
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Medical History</h1>
            <p className="text-gray-600">View and manage your medical records</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New Record
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Year Selection Sidebar */}
          <div className="lg:w-1/4 bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              Filter by Year
            </h2>
            {isLoading ? (
              <div className="animate-pulse space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-8 bg-gray-200 rounded-md"></div>
                ))}
              </div>
            ) : (
              <ul className="space-y-2 max-h-96 overflow-y-auto">
                {uniqueYears.map(year => (
                  <li
                    key={year}
                    className={`cursor-pointer p-3 text-center rounded-lg transition-all
                      ${selectedYear === year
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-50 hover:bg-gray-100 border border-gray-200"}`}
                    onClick={() => setSelectedYear(year)}
                  >
                    <span className="font-medium">{year}</span>
                    <span className="block text-xs mt-1">
                      {records.filter(r => r.year === year).length} records
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Records Display */}
          <div className="flex-1 bg-white p-6 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2 md:mb-0">
                {selectedYear ? `Records for ${selectedYear}` : "Select a year to view records"}
              </h2>

              {selectedYear && (
                <div className="relative w-full md:w-64">
                  <input
                    type="text"
                    placeholder="Search records..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>

            {isLoading ? (
              <div className="animate-pulse space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-4">
                    <div className="h-6 bg-gray-200 w-1/3 rounded mb-4"></div>
                    <div className="grid grid-cols-2 gap-4">
                      {[...Array(6)].map((_, j) => (
                        <div key={j}>
                          <div className="h-4 bg-gray-200 w-1/2 rounded mb-1"></div>
                          <div className="h-4 bg-gray-200 rounded"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : selectedYear ? (
              selectedRecords.length > 0 ? (
                <div className="space-y-6">
                  {selectedRecords.map((record, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-blue-600 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          Record #{index + 1}
                        </h3>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          {record.year}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">Medicine</label>
                          <p className="text-gray-800 font-medium">{record.medicine}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">Doctor</label>
                          <p className="text-gray-800 font-medium">{record.doctor}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">Chronic Illnesses</label>
                          <p className="text-gray-800">{record.chronicIllnesses || "N/A"}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">Vaccinations</label>
                          <p className="text-gray-800">{record.vaccinations || "N/A"}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">Past Surgeries</label>
                          <p className="text-gray-800">{record.pastSurgeries || "N/A"}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">Lab Results</label>
                          <p className="text-gray-800">{record.labResults || "N/A"}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-500 mb-1">Notes</label>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-gray-800 whitespace-pre-wrap">{record.notes || "No notes available"}</p>
                        </div>
                      </div>

                      {record.image && (
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-2">Attachment</label>
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => setVisibleImageIndex(visibleImageIndex === index ? null : index)}
                              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                              {visibleImageIndex === index ? (
                                <>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                  </svg>
                                  Hide
                                </>
                              ) : (
                                <>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                  </svg>
                                  View
                                </>
                              )}
                            </button>
                            <span className="text-sm text-gray-500">
                              {record.image.split('/').pop()}
                            </span>
                          </div>

                          {visibleImageIndex === index && (
                            <div className="mt-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
                              {record.image.match(/\.(jpeg|jpg|png|gif)(\?.*)?$/i) ? (
                                <div className="flex justify-center">
                                  <img
                                    src={record.image}
                                    alt="Medical record"
                                    className="max-w-full h-auto rounded-lg shadow-sm border border-gray-200"
                                  />
                                </div>
                              ) : (
                                <div className="flex flex-col items-center p-4">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                  </svg>
                                  <p className="text-gray-600 mb-4">This document cannot be previewed</p>
                                  <a
                                    href={record.image}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    Download File
                                  </a>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-700 mb-1">No records found</h3>
                  <p className="text-gray-500 mb-4">
                    {searchTerm
                      ? "No records match your search criteria"
                      : "No records available for the selected year"}
                  </p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                  >
                    Add New Record
                  </button>
                </div>
              )
            ) : (
              <div className="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-700 mb-1">Select a year to view records</h3>
                <p className="text-gray-500">Choose from the available years on the left</p>
              </div>
            )}
          </div>
        </div>
      </div>



      {/* Always show the requests panel, but change content based on requests */}
      <div className="mb-6 bg-yellow-50 p-4 rounded-lg shadow-md border border-yellow-300">
        <h3 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 1l7.997 4.884v8.232L10 19l-7.997-4.884V5.884z" />
          </svg>
          Doctor Access Requests
        </h3>

        {accessRequests.length > 0 ? (
          <ul className="space-y-4">
            {accessRequests.map(request => (
              <li key={request._id} className="bg-white rounded-md p-4 border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-gray-800">{request.doctorName}</span> is requesting access to your medical records.
                    </p>
                    <p className="text-xs text-gray-500">Request ID: {request._id}</p>
                  </div>
                </div>
                <div className="flex space-x-3 mt-2">
                  <button
                    onClick={() => respondToAccessRequest(request._id, "accepted")}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => respondToAccessRequest(request._id, "rejected")}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg"
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-600">No pending access requests</p>
          </div>
        )}
      </div>


      {isRequestLoading && (
        <div className="mb-8 p-4 bg-white rounded-xl shadow-md">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 w-1/4 rounded mb-4"></div>
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-100 rounded-lg"></div>
            ))}
          </div>
        </div>
      )}

      {/* Add Record Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4 pb-2 border-b">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Add New Medical Record
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleAddRecord} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      Year <span className="text-red-600">*</span>
                    </label>
                    <select
                      name="year"
                      value={newRecord.year}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        <label className="block mb-2 font-medium text-gray-700">
                          {field.replace(/([A-Z])/g, ' $1')}
                          {['medicine', 'doctor'].includes(field) && <span className="text-red-600"> *</span>}
                        </label>
                        <input
                          type="text"
                          name={field}
                          value={newRecord[field]}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required={['medicine', 'doctor'].includes(field)}
                        />
                      </div>
                    ))}

                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      Doctor <span className="text-red-600">*</span>
                    </label>
                    <select
                      name="doctor"
                      value={newRecord.doctor}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Doctor</option>
                      {doctors.map((doc) => (
                        <option key={doc._id} value={doc.name}>
                          {doc.name} ({doc.specialization})
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
                      className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter any additional notes about this medical record..."
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block mb-2 font-medium text-gray-700">Upload File</label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col w-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, PDF (MAX. 5MB)
                          </p>
                        </div>
                        <input
                          type="file"
                          onChange={handleFileChange}
                          className="hidden"
                          accept="image/*, .pdf"
                        />
                      </label>
                    </div>
                    {newRecord.file && (
                      <div className="mt-2 flex items-center text-sm text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        {newRecord.file.name}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t mt-6">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
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