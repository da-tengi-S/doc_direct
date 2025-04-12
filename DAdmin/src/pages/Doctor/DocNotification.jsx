import React, { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DocNotification = () => {
  const { userData, loading } = useContext(DoctorContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="text-center mt-20">
        <p className="text-red-500 text-lg mb-4">⚠️ Profile not found</p>
        <p className="text-gray-600">Try reloading or check your login status.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Notifications</h2>

      {userData.reject === true ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          ❌ Your application has been <strong>rejected</strong> by the admin.
        </div>
      ) : userData.verified === true ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          ✅ Congratulations! Your application has been <strong>approved</strong>.
        </div>
      ) : (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative">
          ⏳ Your application is currently under review.
        </div>
      )}
    </div>
  );
};

export default DocNotification;
