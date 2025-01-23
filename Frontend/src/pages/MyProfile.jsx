import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  const updateProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      if (image) formData.append("image", image);
  
      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Update Profile Error:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };
  

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    userData && (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-2xl w-full flex flex-col gap-4 p-6 bg-white shadow-md rounded-md text-sm">
          {/* Profile Picture */}
          {isEdit ? (
            <label htmlFor="image" className="cursor-pointer">
              <div className="inline-block relative">
                <img
                  className="w-36 opacity-60 rounded-full"
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt="Profile"
                />
                <img className="w-10" src={assets.upload_icon} alt="Upload" />
              </div>
              <input
                type="file"
                id="image"
                hidden
                onChange={handleFileChange}
              />
            </label>
          ) : (
            <img
              className="w-36 h-36 rounded-full mx-auto"
              src={userData.image}
              alt="User profile"
            />
          )}

          {/* User Information */}
          {isEdit ? (
            <input
              className="bg-gray-200 text-2xl font-medium max-w-xs mt-4 p-2 rounded"
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          ) : (
            <p className="font-medium text-3xl text-neutral-800 mt-4 text-center">
              {userData.name}
            </p>
          )}

          {/* Contact Info */}
          <hr className="bg-zinc-500 h-[1px] border-none my-3" />
          <p className="text-neutral-500 underline mt-3">Contact Info</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p>Email:</p>
            <p>{userData.email}</p>

            <p>Phone:</p>
            {isEdit ? (
              <input
                className="bg-gray-200 p-1 rounded"
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p>{userData.phone}</p>
            )}

            <p>Address:</p>
            <div className="flex flex-col">
              <div className="flex items-center">
                <p>Line 1:</p>
                {isEdit ? (
                  <input
                    className="bg-gray-200 p-1 ml-2 rounded"
                    type="text"
                    value={userData.address?.line1 || ""}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                  />
                ) : (
                  <p className="ml-2">{userData.address?.line1 || "N/A"}</p>
                )}
              </div>
              <div className="flex items-center mt-1">
                <p>Line 2:</p>
                {isEdit ? (
                  <input
                    className="bg-gray-200 p-1 ml-2 rounded"
                    type="text"
                    value={userData.address?.line2 || ""}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                  />
                ) : (
                  <p className="ml-2">{userData.address?.line2 || "N/A"}</p>
                )}
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <p className="text-neutral-500 underline mt-4">Basic Information</p>
          <div className="mt-3">
            <div className="flex items-center">
              <p>Gender:</p>
              {isEdit ? (
                <select
                  className="bg-gray-200 p-1 ml-2 rounded"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      gender: e.target.value,
                    }))
                  }
                  value={userData.gender}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <p className="ml-2">{userData.gender}</p>
              )}
            </div>
            <div className="flex items-center mt-2">
              <p>Birth Date:</p>
              {isEdit ? (
                <input
                  className="bg-gray-200 p-1 ml-2 rounded"
                  type="date"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      dob: e.target.value,
                    }))
                  }
                  value={userData.dob}
                />
              ) : (
                <p className="ml-2">{userData.dob}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 text-center">
            {isEdit ? (
              <button
                className="bg-blue-500 text-white p-2 rounded"
                onClick={updateProfileData}
              >
                Save Information
              </button>
            ) : (
              <button
                className="bg-green-500 text-white p-2 rounded"
                onClick={() => setIsEdit(true)}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default MyProfile;
