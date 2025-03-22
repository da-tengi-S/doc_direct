
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorProfile = () => {
    const { userData, loading, dToken, backendUrl, loadDoctorProfileData } = useContext(DoctorContext);
    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(null);
    const [formState, setFormState] = useState({});

    useEffect(() => {
        if (!isEdit && image) {
            URL.revokeObjectURL(image);
            setImage(null);
        }
    }, [isEdit]);

    useEffect(() => {
        userData && setFormState(userData);
    }, [userData]);

    const handleUpdateProfile = async () => {
        try {
            const formData = new FormData();
            Object.keys(formState).forEach(key => {
                if (formState[key] !== userData[key]) {
                    formData.append(key, formState[key]);
                }
            });
            if (image) formData.append("image", image);

            const response = await axios.put(
                `${backendUrl}/api/doctor/update/${userData._id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${dToken}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.data.success) {
                await loadDoctorProfileData();
                toast.success("Profile updated successfully");
                setIsEdit(false);
                setImage(null);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Update failed");
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    };

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
                <button
                    onClick={loadDoctorProfileData}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow-md"
                >
                    Retry Loading Profile
                </button>
            </div>
        );
    }

    return (
        <div className="w-full h-screen bg-gradient-to-r from-gray-800 to-gray-700 text-white flex justify-center p-6">
        <div className="w-[80%] max-w-7xl mx-auto p-6  text-white  rounded-lg mt-5">
            <div className="flex flex-col items-center gap-4">
                <label className="relative cursor-pointer">
                    <img
                        className="w-32 h-32 rounded-full border-4 border-gray-200 shadow-md object-cover"
                        src={image ? URL.createObjectURL(image) : userData.image}
                        alt="Profile preview"
                    />
                    {isEdit && (
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    )}
                </label>
                {isEdit ? (
                    <input
                        className="text-2xl font-bold text-center bg-gray-100 p-2 rounded w-full max-w-sm text-gray-900"
                        value={formState.name || ""}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    />
                ) : (
                    <h1 className="text-2xl font-bold">{userData.name}</h1>
                )}
                <p className="text-gray-300">{userData.speciality}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6 bg-gray-700 rounded-lg p-6 shadow-md">
                <DetailItem label="Email" value={userData.email} isEdit={false} />
                <DetailItem label="Phone" value={formState.phone} isEdit={isEdit} onChange={(value) => setFormState({ ...formState, phone: value })} />
                <DetailItem label="Consultation Fee" value={formState.fees} isEdit={isEdit} type="number" onChange={(value) => setFormState({ ...formState, fees: value })} />
                <DetailItem label="Experience" value={formState.experience} isEdit={isEdit} type="number" onChange={(value) => setFormState({ ...formState, experience: value })} />
                <DetailStatus label="Verified" status={userData.verified} />
                <DetailStatus label="Availability" status={userData.available} />
            </div>

            <div className="mt-8 flex justify-center gap-4">
                {isEdit ? (
                    <>
                        <button className="px-6 py-2 bg-gray-300 text-gray-900 rounded hover:bg-gray-400" onClick={() => setIsEdit(false)}>Cancel</button>
                        <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={handleUpdateProfile}>Save Changes</button>
                    </>
                ) : (
                    <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={() => setIsEdit(true)}>Edit Profile</button>
                )}
            </div>
        </div>
        </div>
    );
};

const DetailItem = ({ label, value, isEdit, type = "text", onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-300">{label}</label>
        {isEdit ? (
            <input
                type={type}
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 p-2 w-full border rounded focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
        ) : (
            <p className="mt-1 p-2 bg-gray-600 rounded">{value || "N/A"}</p>
        )}
    </div>
);

const DetailStatus = ({ label, status }) => (
    <div className="flex items-center gap-2">
        <span className="font-medium text-gray-300">{label}:</span>
        <span className={`px-3 py-1 rounded-full text-sm ${status ? 'bg-green-400 text-green-900' : 'bg-red-400 text-red-900'}`}>{status ? 'Yes' : 'No'}</span>
    </div>
);

export default DoctorProfile;
