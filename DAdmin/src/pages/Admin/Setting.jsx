import React from "react";

const Setting = () => {
  return (
    <div className="w-full h-screen bg-white text-black flex justify-center p-6">
      <div className="w-full max-w-5xl h-[80vh] overflow-y-auto bg-gray-100 text-black shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-black mb-8">Settings</h1>

        {/* Clinic Information Section */}
        <div className="bg-white rounded-lg p-6 mb-6 border border-gray-300">
          <h2 className="text-xl font-semibold mb-6 border-b border-gray-400 pb-2">Clinic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Clinic Name</label>
              <input type="text" className="w-full p-2 bg-white border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Enter clinic name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
              <input type="tel" className="w-full p-2 bg-white border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Enter contact number" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Clinic Address</label>
              <textarea className="w-full p-2 bg-white border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500" rows={3} placeholder="Enter clinic address" />
            </div>
          </div>
        </div>

        {/* Appointment Settings */}
        <div className="bg-white rounded-lg p-6 mb-6 border border-gray-300">
          <h2 className="text-xl font-semibold mb-6 border-b border-gray-400 pb-2">Appointment Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Slot Duration</label>
              <select className="w-full p-2 bg-white border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500">
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option>45 minutes</option>
                <option>60 minutes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Buffer Time</label>
              <input type="number" className="w-full p-2 bg-white border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Enter buffer time in minutes" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Cancellation Policy</label>
              <textarea className="w-full p-2 bg-white border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500" rows={4} placeholder="Enter cancellation policy" />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="sticky bottom-0 bg-gray-200 p-4 flex justify-end">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
