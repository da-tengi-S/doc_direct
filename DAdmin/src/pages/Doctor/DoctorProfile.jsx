



import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorProfile = () => {
    const { userData, loading, dToken, backendUrl, loadDoctorProfileData , changeVideoAvaialabilty} = useContext(DoctorContext);
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
                    className="bg-white text-black px-4 py-2 rounded hover:bg-blue-700 shadow-md"
                >
                    Retry Loading Profile
                </button>
            </div>
        );
    }
    return (
        <div className="w-full min-h-screen bg-gray-50 flex justify-center p-6">
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8">
                <div className="flex flex-col items-center gap-4 mb-8">
                    <label className="relative cursor-pointer group">
                        <img
                            className="w-40 h-40 rounded-full border-4 border-gray-100 shadow-lg object-cover transition-transform group-hover:scale-105"
                            src={image ? URL.createObjectURL(image) : userData.image}
                            alt="Profile preview"
                        />
                        {isEdit && (
                            <div className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                            </div>
                        )}
                    </label>
                    {isEdit ? (
                        <input
                            className="text-3xl font-bold text-center bg-white p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-md"
                            value={formState.name || ""}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        />
                    ) : (
                        <h1 className="text-3xl font-bold text-gray-800">{userData.name}</h1>
                    )}
                    <p className="text-gray-600 text-lg">{userData.speciality}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <DetailItem label="Email" value={userData.email} isEdit={false} />
                    <DetailItem label="Phone" value={formState.phone} isEdit={isEdit} onChange={(value) => setFormState({ ...formState, phone: value })} />
                    <DetailItem label="Consultation Fee" value={formState.fees} isEdit={isEdit} type="number" onChange={(value) => setFormState({ ...formState, fees: value })} />
                    <DetailItem label="Experience" value={formState.experience} isEdit={isEdit} type="number" suffix="years" onChange={(value) => setFormState({ ...formState, experience: value })} />
                </div>

                {/* New Description Section */}
                <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    {isEdit ? (
                        <textarea
                            value={formState.about || ""}
                            onChange={(e) => setFormState({ ...formState, about: e.target.value })}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                            placeholder="Add your professional description..."
                        />
                    ) : (
                        <p className="p-3 bg-gray-50 rounded-lg text-gray-700">
                            {userData.description || "No description provided"}
                        </p>
                    )}
                </div>

                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <DetailStatus label="Verified" status={userData.verified} />
                    <DetailStatus label="Availability" status={userData.available} />
                    <DetailStatus label="Video call " status={userData.videocall} />
                </div>
                <div>
                    <button
                        onClick={() => changeVideoAvaialabilty(userData._id)}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                    >
                        Toggle video call 
                    </button>
                </div>

                <div className="flex justify-center gap-4">
                    {isEdit ? (
                        <>
                            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors shadow-sm" onClick={() => setIsEdit(false)}>
                                Cancel
                            </button>
                            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm" onClick={handleUpdateProfile}>
                                Save Changes
                            </button>
                        </>
                    ) : (
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm" onClick={() => setIsEdit(true)}>
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const DetailItem = ({ label, value, isEdit, type = "text", suffix, onChange }) => (
    <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        {isEdit ? (
            <div className="flex items-center gap-2">
                <input
                    type={type}
                    value={value || ""}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {suffix && <span className="text-gray-500">{suffix}</span>}
            </div>
        ) : (
            <p className="p-2 bg-gray-50 rounded-lg text-gray-700">{value || "N/A"} {suffix && ` ${suffix}`}</p>
        )}
    </div>
);

const DetailStatus = ({ label, status }) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <span className="font-medium text-gray-700">{label}</span>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {status ? 'Active' : 'Inactive'}
        </span>
    </div>
);

export default DoctorProfile;