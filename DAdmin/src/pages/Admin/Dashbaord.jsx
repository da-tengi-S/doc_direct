

import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AdminContext } from '../../context/AdminContext';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { PieChart, Pie, Cell, Legend } from "recharts";

const Dashboard = () => {
  const { aToken, getDashData1, cancelAppoitmnet, dashData, appointments, getAllAppointments } = useContext(AdminContext);
  const [monthlyAppointmentData, setMonthlyAppointmentData] = useState([]);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
      getDashData1();
    }
  }, [aToken]);

  useEffect(() => {
    if (!appointments || appointments.length === 0) return;
    setMonthlyAppointmentData(processMonthlyData(appointments));
  }, [appointments]);

  const processMonthlyData = (appointments) => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    let monthCounts = new Array(12).fill(0);

    appointments.forEach((appointment, index) => {
      if (!appointment.slotDate) {
        console.warn(`⚠ Appointment ${index} missing date`);
        return;
      }

      try {
        const [datePart] = appointment.slotDate.split(', ');
        const [day, monthStr, year] = datePart.split('_');
        const monthIndex = parseInt(monthStr, 10) - 1;

        if (isNaN(monthIndex)) {
          throw new Error(`Invalid month format: ${monthStr}`);
        }

        if (monthIndex < 0 || monthIndex > 11) {
          throw new Error(`Month out of range: ${monthIndex + 1}`);
        }

        monthCounts[monthIndex] += 1;
      } catch (error) {
        console.warn(`⚠ Error processing appointment ${index} (${appointment.slotDate}):`, error.message);
      }
    });

    return months.map((monthName, index) => ({
      month: monthName,
      appointment: monthCounts[index]
    }));
  };

  const formatDate = (dateStr) => {
    const [day, month, year] = dateStr.split('_');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${day} ${months[parseInt(month) - 1]} ${year}`;
  };

  const appointmentbyfield = [
    { name: "Eye", value: 400 },
    { name: "Neurologists", value: 300 },
    { name: "Cardiologists", value: 200 },
    { name: "Dermatologists", value: 100 },
    { name: "Endocrinologists", value: 150 },
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"];

  return (
    <div className="w-full h-screen overflow-y-scroll p-6 bg-white text-gray-800">


      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Stats Grid - kept existing styles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Doctors Card */}
        <div className="bg-purple-200 p-6 rounded-xl shadow-sm flex items-center border border-gray-200">
          <div className="bg-blue-100 p-4 rounded-lg">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-2xl font-bold text-gray-700">{dashData?.doctors || 0}</h3>
            <p className="text-gray-500">Total Doctors</p>
          </div>
        </div>

        <div className="bg-purple-200 p-6 rounded-xl shadow-sm flex items-center">
          <div className="bg-green-100 p-4 rounded-lg">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-2xl font-bold text-gray-700">{dashData?.appoitment || 0}</h3>
            <p className="text-gray-500">Total Appointments</p>
          </div>
        </div>

        {/* Patients Card */}
        <div className="bg-purple-200 p-6 rounded-xl shadow-sm flex items-center">
          <div className="bg-purple-100 p-4 rounded-lg">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-2xl font-bold text-gray-700">{dashData?.patients || 0}</h3>
            <p className="text-gray-500">Total Patients</p>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="flex gap-6 w-full mb-8">
        {/* Appointment Chart */}
        <motion.div
          className="w-[50%] bg-white backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Appointment Overview</h2>
          <div className="w-full h-80">
            <ResponsiveContainer>
              <AreaChart data={monthlyAppointmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="month"
                  stroke="#4b5563"
                  tick={{ fill: '#6b7280' }}
                />
                <YAxis
                  stroke="#4b5563"
                  tick={{ fill: '#6b7280' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solidrgb(71, 74, 82)",
                    borderRadius: "0.5rem",
                    color: "#1f2937"
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="appointment"
                  stroke="#FF5733"  
                  fill="#10B981"    
                  fillOpacity={0.3}
                  strokeWidth={2}
                />


              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          className="w-[50%] bg-white backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Appointment by Types(Field)</h2>
          <div className="w-full h-80">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={appointmentbyfield}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {appointmentbyfield.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    borderColor: "#e5e7eb",
                    color: "#1f2937"
                  }}
                />
                <Legend wrapperStyle={{ color: '#1f2937' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Latest Appointments Table */}
      <div className="bg-white text-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Latest Appointments</h2>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Table Header */}
            <div className="grid grid-cols-5 px-6 py-3 bg-gray-50 text-gray-600 font-medium text-sm border-b border-gray-200">
              <div>Date</div>
              <div>Time</div>
              <div>Patient</div>
              <div>Doctor</div>
              <div>Action</div>
            </div>

            {/* Table Body */}
            {dashData?.lastestAppoitments?.map((appointment) => (
              <div key={appointment._id} className="grid grid-cols-5 px-6 py-4 border-b border-gray-200 hover:bg-gray-50">
                <div className="text-gray-900">{formatDate(appointment.slotDate)}</div>
                <div className="text-gray-900">{appointment.slotTime}</div>
                <div className="text-gray-900">{appointment.userData.name}</div>
                <div className="text-gray-900">{appointment.docData.name}</div>
                <div>
                  <button
                    onClick={() => cancelAppoitmnet(appointment._id)}
                    className="px-3 py-1.5 text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;