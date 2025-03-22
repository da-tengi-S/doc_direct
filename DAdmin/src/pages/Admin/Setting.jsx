// import React from 'react';

// const Setting = () => {
//   return (
//     <div className="w-full bg-gradient-to-r from-gray-800 to-gray-800 text-white flex justify-center p-6">
//       <div className="w-full max-w-5xl bg-gray-900 shadow-lg rounded-xl p-8">
//         <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>
        
//         {/* Clinic Information Section */}
//         <div className="bg-gray-700 rounded-lg p-6 mb-6">
//           <h2 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-2">Clinic Information</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-2">Clinic Name</label>
//               <input type="text" className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Enter clinic name" />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-2">Contact Number</label>
//               <input type="tel" className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Enter contact number" />
//             </div>
//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-300 mb-2">Clinic Address</label>
//               <textarea className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500" rows={3} placeholder="Enter clinic address" />
//             </div>
//           </div>
//         </div>

//         {/* Appointment Settings */}
//         <div className="bg-gray-800 rounded-lg p-6 mb-6">
//           <h2 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-2">Appointment Settings</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-2">Slot Duration</label>
//               <select className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500">
//                 <option>15 minutes</option>
//                 <option>30 minutes</option>
//                 <option>45 minutes</option>
//                 <option>60 minutes</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-2">Buffer Time</label>
//               <input type="number" className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Enter buffer time in minutes" />
//             </div>
//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-300 mb-2">Cancellation Policy</label>
//               <textarea className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500" rows={4} placeholder="Enter cancellation policy" />
//             </div>
//           </div>
//         </div>

//         {/* Security Settings */}
//         <div className="bg-gray-800 rounded-lg p-6 mb-6">
//           <h2 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-2">Security</h2>
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="text-sm font-medium text-gray-300">Two-Factor Authentication</h3>
//                 <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
//               </div>
//               <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600">
//                 <span className="sr-only">Enable two-factor authentication</span>
//                 <span className="inline-block h-4 w-4 translate-x-1 transform rounded-full bg-white transition"></span>
//               </button>
//             </div>
//             <div className="pt-4">
//               <button className="text-blue-400 hover:text-blue-600 text-sm font-medium">Change Password</button>
//             </div>
//           </div>
//         </div>

//         {/* Notification Settings */}
//         <div className="bg-gray-800 rounded-lg p-6 mb-6">
//           <h2 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-2">Notifications</h2>
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="text-sm font-medium text-gray-300">Email Notifications</h3>
//                 <p className="text-sm text-gray-500">Receive important updates via email</p>
//               </div>
//               <input type="checkbox" className="h-4 w-4 text-blue-400" defaultChecked />
//             </div>
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="text-sm font-medium text-gray-300">SMS Alerts</h3>
//                 <p className="text-sm text-gray-500">Get instant SMS notifications</p>
//               </div>
//               <input type="checkbox" className="h-4 w-4 text-blue-400" />
//             </div>
//           </div>
//         </div>

//         {/* Save Button */}
//         <div className="mt-8 flex justify-end">
//           <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">Save Changes</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Setting;


import React from "react";

const Setting = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-r from-gray-800 to-gray-800 text-white flex justify-center p-6">
      <div className="w-full max-w-5xl h-[80vh] overflow-y-auto bg-gray-900 shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

        {/* Clinic Information Section */}
        <div className="bg-gray-700 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-2">Clinic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Clinic Name</label>
              <input type="text" className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Enter clinic name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Contact Number</label>
              <input type="tel" className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Enter contact number" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Clinic Address</label>
              <textarea className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500" rows={3} placeholder="Enter clinic address" />
            </div>
          </div>
        </div>

        {/* Appointment Settings */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-2">Appointment Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Slot Duration</label>
              <select className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500">
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option>45 minutes</option>
                <option>60 minutes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Buffer Time</label>
              <input type="number" className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Enter buffer time in minutes" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Cancellation Policy</label>
              <textarea className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500" rows={4} placeholder="Enter cancellation policy" />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-2">Security</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-300">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600">
                <span className="sr-only">Enable two-factor authentication</span>
                <span className="inline-block h-4 w-4 translate-x-1 transform rounded-full bg-white transition"></span>
              </button>
            </div>
            <div className="pt-4">
              <button className="text-blue-400 hover:text-blue-600 text-sm font-medium">Change Password</button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-2">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-300">Email Notifications</h3>
                <p className="text-sm text-gray-500">Receive important updates via email</p>
              </div>
              <input type="checkbox" className="h-4 w-4 text-blue-400" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-300">SMS Alerts</h3>
                <p className="text-sm text-gray-500">Get instant SMS notifications</p>
              </div>
              <input type="checkbox" className="h-4 w-4 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="sticky bottom bg-gray-900 p-4 flex justify-end">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
