// import React, { useState, useEffect, useContext } from "react";
// import { motion } from "framer-motion";
// import { AdminContext } from "../../context/AdminContext";
// import { 
//     AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
// } from "recharts";

// const Analytics = () => {
//     const { aToken, appointments, getAllAppointments } = useContext(AdminContext);
//     const [monthlyAppointmentData, setMonthlyAppointmentData] = useState([]);

//     useEffect(() => {
//         if (aToken) {
//             getAllAppointments();
//         }
//     }, [aToken]);

//     // Process appointments when they change
//     useEffect(() => {
//         if (!appointments || appointments.length === 0) return;
//         setMonthlyAppointmentData(processMonthlyData(appointments));
//     }, [appointments]);

//     // Improved date parsing with error handling
//     const processMonthlyData = (appointments) => {
//         const months = [
//             'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//             'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//         ];
    
//         let monthCounts = new Array(12).fill(0);
    
//         appointments.forEach((appointment, index) => {
//             if (!appointment.slotDate) {
//                 console.warn(`⚠ Appointment ${index} missing date`);
//                 return;
//             }
    
//             try {
//                 // Split "25_1_2025, 03:00 PM" into parts
//                 const [datePart] = appointment.slotDate.split(', ');
//                 const [day, monthStr, year] = datePart.split('_');
                
//                 // Convert month to 0-based index
//                 const monthIndex = parseInt(monthStr, 10) - 1;
                
//                 if (isNaN(monthIndex)) {
//                     throw new Error(`Invalid month format: ${monthStr}`);
//                 }
                
//                 if (monthIndex < 0 || monthIndex > 11) {
//                     throw new Error(`Month out of range: ${monthIndex + 1}`);
//                 }
    
//                 monthCounts[monthIndex] += 1;
//             } catch (error) {
//                 console.warn(`⚠ Error processing appointment ${index} (${appointment.slotDate}):`, error.message);
//             }
//         });
    
//         // Create ordered result from January to December
//         return months.map((monthName, index) => ({
//             month: monthName,
//             appointment: monthCounts[index]
//         }));
//     };

//     return (
//         <motion.div
//             className="w-[70%] bg-gray-900 bg-opacity-100 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//         >
//             <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-semibold text-gray-100">Appointment Overview</h2>
//             </div>

//             <div className="w-full h-80">
//                 <ResponsiveContainer>
//                     <AreaChart data={monthlyAppointmentData}>
//                         <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//                         <XAxis 
//                             dataKey="month" 
//                             stroke="#9CA3AF"
//                             tick={{ fill: '#E5E7EB' }}
//                         />
//                         <YAxis 
//                             stroke="#9CA3AF"
//                             tick={{ fill: '#E5E7EB' }}
//                         />
//                         <Tooltip
//                             contentStyle={{ 
//                                 backgroundColor: "rgba(31, 41, 55, 0.9)",
//                                 border: "1px solid #4B5563",
//                                 borderRadius: "0.5rem"
//                             }}
//                             itemStyle={{ color: "#E5E7EB" }}
//                         />
//                         <Area 
//                             type="monotone" 
//                             dataKey="appointment" 
//                             stroke="#8B5CF6" 
//                             fill="#8B5CF6" 
//                             fillOpacity={0.3}
//                             strokeWidth={2}
//                         />
//                     </AreaChart>
//                 </ResponsiveContainer>
//             </div>
//         </motion.div>
//     );
// };

// export default Analytics;



import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const salesByCategory = [
  { name: "Eye", value: 400 },
  { name: "Neurologists", value: 300 },
  { name: "Cardiologists", value: 200 },
  { name: "Dermatologists", value: 100 },
  { name: "Endocrinologists", value: 150 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"];

const Analytics = () => {
  return (
    <motion.div
      className="flex justify-end w-full bg-gray-900 bg-opacity-100 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="w-[50%]">
        <h2 className="text-xl font-semibold text-gray-100 mb-4">Sales by Category</h2>

        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={salesByCategory}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {salesByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(31, 41, 55, 0.8)",
                  borderColor: "#4B5563",
                }}
                itemStyle={{ color: "#E5E7EB" }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default Analytics;
