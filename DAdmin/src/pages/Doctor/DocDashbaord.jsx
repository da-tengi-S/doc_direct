


import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { FaDollarSign, FaCalendarCheck, FaUserInjured, FaStethoscope } from 'react-icons/fa'

const DocDashboard = () => {
  const { dToken, dashbaordData, getDashData } = useContext(DoctorContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])

  const formatEarnings = (amount) => {
    return parseInt(amount).toLocaleString('ne-NP', {
      style: 'currency',
      currency: 'NPR',
      maximumFractionDigits: 0
    });
  };


  return (
    <div className=" w-full p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Doctor Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Earnings Card */}
        <div className="bg-blue-100 rounded-2xl p-6 shadow-lg transition-transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Earnings</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {dashbaordData?.earning ? formatEarnings(dashbaordData.earning) : 'Rs0'}
              </p>
            </div>
            <div className="bg-blue-100 p-4 rounded-xl">
              <FaDollarSign className="text-blue-600 text-2xl" />
            </div>
          </div>
        </div>

        {/* Appointments Card */}
        <div className="bg-blue-100 rounded-2xl p-6 shadow-lg transition-transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Upcoming Appointments</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {dashbaordData?.appointment || 0}
              </p>
            </div>
            <div className="bg-green-100 p-4 rounded-xl">
              <FaCalendarCheck className="text-green-600 text-2xl" />
            </div>
          </div>
        </div>

        {/* Patients Card */}
        <div className="bg-blue-100 rounded-2xl p-6 shadow-lg transition-transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Patients</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {dashbaordData?.patients || 0}
              </p>
            </div>
            <div className="bg-purple-100 p-4 rounded-xl">
              <FaUserInjured className="text-purple-600 text-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Latest Appointments Table */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FaStethoscope className="text-blue-500" /> Latest Appointments
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-800 border-b">
                <th className="pb-4">Patient Name</th>
                <th className="pb-4">Date</th>
                <th className="pb-4">Time</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Reason</th>
              </tr>
            </thead>
            <tbody>
              {dashbaordData?.latestAppointment?.map((appointment, index) => (
                <tr key={index} className="border-b last:border-b-0">
                  <td className="py-4">{appointment.userData.name}</td>
                  <td className="py-4">{appointment.slotDate}</td>
                  <td className="py-4">{appointment.slotTime}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium 
    ${appointment.isCompleted
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                      }`}>
                      {appointment.isCompleted ? 'Completed' : 'Pending'}
                    </span>

                  </td>
                  <td className="py-4">{appointment.reason}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!dashbaordData?.latestAppointment?.length && (
          <div className="text-center py-8 text-gray-500">
            No recent appointments found
          </div>
        )}
      </div>
    </div>
  )
}

export default DocDashboard