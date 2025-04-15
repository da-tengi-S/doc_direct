

import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';

const DoctorAppointment = () => {
  const {
    userData,
    dToken,
    backendUrl,
    appointments,
    patientRecords,
    getappoitemnts,
    requestMedicalRecordAccess,
    DcancelAppoitmnet,
    DCompleteAppoitmnet,
  } = useContext(DoctorContext);

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAddRecordForm, setShowAddRecordForm] = useState(false);
  const [newMedicalRecord, setNewMedicalRecord] = useState({
    userId: '',
    year: '',
    medicine: '',
    notes: '',
    chronicIllnesses: '',
    pastSurgeries: '',
    vaccinations: '',
    labResults: '',
    doctor: userData?.name || '',
    image: null
  });
  const [filePreview, setFilePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (dToken && userData?._id) {
      getappoitemnts();
    }
  }, [dToken, userData]);

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('_');
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getPatientRecords = (userId) => {
    return patientRecords.filter(record => record.userId === userId);
  };

  const openMedicalRecords = (userId) => {
    setSelectedPatient(userId);
    setNewMedicalRecord(prev => ({
      ...prev,
      userId
    }));
  };

  const closeMedicalRecords = () => {
    setSelectedPatient(null);
    setShowAddRecordForm(false);
    resetForm();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMedicalRecord(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewMedicalRecord(prev => ({
        ...prev,
        image: file
      }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setNewMedicalRecord({
      userId: '',
      year: '',
      medicine: '',
      notes: '',
      chronicIllnesses: '',
      pastSurgeries: '',
      vaccinations: '',
      labResults: '',
      doctor: userData?.name || '',
      image: null
    });
    setFilePreview(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('userId', newMedicalRecord.userId);
      formData.append('year', newMedicalRecord.year);
      formData.append('medicine', newMedicalRecord.medicine);
      formData.append('notes', newMedicalRecord.notes);
      formData.append('chronicIllnesses', newMedicalRecord.chronicIllnesses);
      formData.append('pastSurgeries', newMedicalRecord.pastSurgeries);
      formData.append('vaccinations', newMedicalRecord.vaccinations);
      formData.append('labResults', newMedicalRecord.labResults);
      formData.append('doctor', newMedicalRecord.doctor);
      formData.append('doctorId', userData._id);
      formData.append('doctorName', userData.name);
      if (newMedicalRecord.image) {
        formData.append('file', newMedicalRecord.image);
      }


      const response = await fetch(`${backendUrl}/api/doctor/add-DmedRecord`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${dToken}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to add medical record');
      }

      const data = await response.json();
      alert('Medical record added successfully!');
      setShowAddRecordForm(false);
      resetForm();

      // Refresh patient records
      if (selectedPatient) {
        getPatientRecords(selectedPatient);
      }
    } catch (error) {
      console.error('Error adding medical record:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Appointments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.map((appointment) => (
          <div
            key={appointment._id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-4">
              <img
                src={appointment.userData.image}
                alt={appointment.userData.name}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {appointment.userData.name}
                </h2>
                <p className="text-gray-600 text-sm">
                  {appointment.userData.email}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="text-gray-800 font-medium">
                  {formatDate(appointment.slotDate)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="text-gray-800 font-medium">
                  {appointment.slotTime}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Reason:</span>
                <span className="text-blue-600 font-medium">
                  {appointment.reason}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Payment:</span>
                <span className={`font-medium ${appointment.payment ? 'text-green-600' : 'text-red-600'}`}>
                  {appointment.payment ? 'Paid' : 'Pending'}
                </span>
              </div>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method:</span>
              <span className="text-gray-800 font-medium">
                {appointment.paymentMethod || 'Not Specified'}
              </span>
            </div>


            <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col gap-2">
              {!appointment.isCompleted && !appointment.cancelled && (
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => DCompleteAppoitmnet(appointment._id)}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => DcancelAppoitmnet(appointment._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}

              <button
                onClick={() => requestMedicalRecordAccess(appointment.userData._id)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Request Medical Record


              </button>
              {appointment.cancelled || appointment.isCompleted ? (
                <div className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md text-center">
                  Medical record access expired
                </div>
              ) : (
                <button
                  onClick={() => openMedicalRecords(appointment.userData._id)}
                  className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
                >
                  View Medical Records
                </button>
              )}



              {appointment.isCompleted && (
                <span className="text-green-600 font-medium text-right">Completed</span>
              )}
              {appointment.cancelled && (
                <span className="text-red-600 font-medium text-right">Cancelled</span>
              )}
            </div>
          </div>
        ))}
      </div>
      {selectedPatient && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-semibold">Medical History</h3>
              <button
                onClick={closeMedicalRecords}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="overflow-auto p-4">
              {!showAddRecordForm ? (
                <>
                  <div className="flex justify-end mb-4">
                    <button
                      onClick={() => setShowAddRecordForm(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Add New Record
                    </button>
                  </div>

                  {getPatientRecords(selectedPatient).length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Year</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Medicine</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Chronic Illnesses</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Past Surgeries</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vaccinations</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lab Results</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {getPatientRecords(selectedPatient).map(record => (
                            <tr key={record._id}>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{record.year}</td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{record.medicine}</td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{record.notes}</td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{record.doctor}</td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                {record.chronicIllnesses || 'N/A'}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                {record.pastSurgeries || 'N/A'}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                {record.vaccinations || 'N/A'}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                {record.labResults || 'N/A'}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                {record.image ? (
                                  <img
                                    src={record.image}
                                    alt="Medical"
                                    className="w-16 h-16 rounded object-cover cursor-pointer hover:opacity-75"
                                    onClick={() => window.open(record.image, '_blank')}
                                  />
                                ) : (
                                  'No Image'
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No medical records available for this patient, Request Pending</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Add Medical Record</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                        <input
                          type="text"
                          name="year"
                          value={newMedicalRecord.year}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Medicine</label>
                        <input
                          type="text"
                          name="medicine"
                          value={newMedicalRecord.medicine}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                        <textarea
                          name="notes"
                          value={newMedicalRecord.notes}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          rows="2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
                        <input
                          type="text"
                          name="doctor"
                          value={newMedicalRecord.doctor}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Chronic Illnesses</label>
                        <input
                          type="text"
                          name="chronicIllnesses"
                          value={newMedicalRecord.chronicIllnesses}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Past Surgeries</label>
                        <input
                          type="text"
                          name="pastSurgeries"
                          value={newMedicalRecord.pastSurgeries}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Vaccinations</label>
                        <input
                          type="text"
                          name="vaccinations"
                          value={newMedicalRecord.vaccinations}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lab Results</label>
                        <input
                          type="text"
                          name="labResults"
                          value={newMedicalRecord.labResults}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Medical Report (Image)</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {filePreview && (
                          <div className="mt-2">
                            <img
                              src={filePreview}
                              alt="Preview"
                              className="h-32 object-contain border rounded"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddRecordForm(false);
                          resetForm();
                        }}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            <div className="p-4 border-t flex justify-end">
              <button
                onClick={closeMedicalRecords}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {appointments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No appointments found</p>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointment;