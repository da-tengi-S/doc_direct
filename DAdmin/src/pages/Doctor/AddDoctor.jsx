

import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets_admin/assets";
import { DoctorContext } from "../../context/DoctorContext";

const AddDoctor = () => {
    const { userData, loading, dToken, backendUrl, loadDoctorProfileData } = useContext(DoctorContext);
    const [isEdit, setIsEdit] = useState(false);
    const [files, setFiles] = useState({
        profileImage: null,
        document: null
    });
    const [formState, setFormState] = useState({});
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (userData) {
            setFormState({
                name: userData.name || "",
                phone: userData.phone || "",
                speciality: userData.speciality || "",
                experience: userData.experience || "",
                degree: userData.degree || "",
                fees: userData.fees || "",
                about: userData.about || ""
            });
        }
    }, [userData]);

    const handleFileChange = (type) => (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];

            if (type === 'document' && !file.type.match(/(image\/.*|application\/pdf)/)) {
                toast.error("Only images and PDF files are allowed!");
                return;
            }

            if (file.size > 15 * 1024 * 1024) {
                toast.error("File size must be less than 15MB!");
                return;
            }

            setFiles(prev => ({
                ...prev,
                [type]: file
            }));
        }
    };

    const handleUpdateProfile = async () => {
        try {
            setUploading(true);
            const formData = new FormData();

            Object.entries(formState).forEach(([key, value]) => {
                if (value !== userData[key]) {
                    formData.append(key, value);
                }
            });

            if (files.profileImage) {
                formData.append(
                    'profileImage',
                    files.profileImage,
                    `profile-${Date.now()}-${files.profileImage.name}`
                );
            }

            if (files.document) {
                formData.append(
                    'document',
                    files.document,
                    `doc-${Date.now()}-${files.document.name}`
                );
            }

            const response = await axios.put(
                `${backendUrl}/api/doctor/update/${userData._id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${dToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.data.success) {
                await loadDoctorProfileData();
                toast.success("Application submitted successfully");
                setIsEdit(false);
                setFiles({ profileImage: null, document: null });
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Update error:', error);
            toast.error(
                error.response?.data?.message ||
                'Update failed. Please check file formats (images/PDF) and try again.'
            );
        } finally {
            setUploading(false);
        }
    };

    const cancelEdit = () => {
        setIsEdit(false);
        setFiles({ profileImage: null, document: null });
        setFormState({
            name: userData.name || "",
            phone: userData.phone || "",
            speciality: userData.speciality || "",
            experience: userData.experience || "",
            degree: userData.degree || "",
            fees: userData.fees || "",
            about: userData.about || ""
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center mt-20">
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
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Retry Loading Profile
                </button>
            </div>
        );
    }
    return (
            <div className="w-full h-screen bg-gray-50 overflow-y-auto p-8">
            <div className="w-full max-w-5xl mx-auto space-y-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <div className="flex items-center gap-6 mb-8">
                        <div className="relative group">
                            <label className="cursor-pointer">
                                <img
                                    className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover group-hover:opacity-90 transition-opacity"
                                    src={
                                        files.profileImage
                                            ? URL.createObjectURL(files.profileImage)
                                            : userData.profileImage || assets.image1 || "/default-avatar.png"
                                    }
                                    alt="Profile preview"
                                />
                                {isEdit && (
                                    <>
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={handleFileChange('profileImage')}
                                            accept="image/*"
                                        />
                                        <div className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-md transform transition-transform group-hover:scale-110">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                    </>
                                )}
                            </label>
                        </div>

                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-gray-800">
                                Doctor Application Form
                            </h1>
                            <p className="text-gray-600 mt-2">
                                {isEdit
                                    ? "Update your professional information below"
                                    : "Review your professional profile"}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <section className="bg-gray-50 rounded-2xl p-6 shadow-sm">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                                <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
                                Personal Information
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <DetailItem
                                    label="Full Name"
                                    value={formState.name}
                                    isEdit={isEdit}
                                    onChange={(value) => setFormState(prev => ({ ...prev, name: value }))}
                                />
                                <DetailItem
                                    label="Email"
                                    value={userData.email}
                                    isEdit={false}
                                />
                                <DetailItem
                                    label="Phone Number"
                                    value={formState.phone}
                                    isEdit={isEdit}
                                    onChange={(value) => setFormState(prev => ({ ...prev, phone: value }))}
                                />
                            </div>
                        </section>

                        <section className="bg-gray-50 rounded-2xl p-6 shadow-sm">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                                <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
                                Professional Details
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <DetailItem
                                    label="Speciality"
                                    value={formState.speciality}
                                    isEdit={isEdit}
                                    onChange={(value) => setFormState(prev => ({ ...prev, speciality: value }))}
                                />
                                <DetailItem
                                    label="Experience (years)"
                                    type="number"
                                    value={formState.experience}
                                    isEdit={isEdit}
                                    onChange={(value) => setFormState(prev => ({ ...prev, experience: value }))}
                                />
                                <DetailItem
                                    label="Degree"
                                    value={formState.degree}
                                    isEdit={isEdit}
                                    onChange={(value) => setFormState(prev => ({ ...prev, degree: value }))}
                                />
                                <DetailItem
                                    label="Consultation Fee"
                                    type="number"
                                    value={formState.fees}
                                    isEdit={isEdit}
                                    onChange={(value) => setFormState(prev => ({ ...prev, fees: value }))}
                                />
                            </div>
                        </section>

                        <section className="bg-gray-50 rounded-2xl p-6 shadow-sm">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                                <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
                                About You
                            </h2>
                            <DetailItem
                                label="Professional Bio"
                                value={formState.about}
                                isEdit={isEdit}
                                type="textarea"
                                onChange={(value) => setFormState(prev => ({ ...prev, about: value }))}
                            />
                        </section>

                        <section className="bg-gray-50 rounded-2xl p-6 shadow-sm">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                                <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
                                Professional Documents
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    {isEdit ? (
                                        <label className="flex-1 cursor-pointer group">
                                            <div className="h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center transition-all hover:border-blue-500 hover:bg-white group-active:scale-95">
                                                <svg className="w-8 h-8 text-gray-400 mb-2 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                                <span className="text-gray-500 group-hover:text-blue-500 text-center">
                                                    {files.document ? files.document.name : "Click to upload documents"}
                                                    <br />
                                                    <span className="text-sm">(PDF, JPG, PNG up to 15MB)</span>
                                                </span>
                                            </div>
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={handleFileChange('document')}
                                                accept="image/*,application/pdf"
                                            />
                                        </label>
                                    ) : (
                                        <div className="flex-1 bg-white p-4 rounded-lg border border-gray-200">
                                            {userData.document?.url ? (
                                                <a
                                                    href={userData.document.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                    View Current Document
                                                </a>
                                            ) : (
                                                <span className="text-gray-500">No document uploaded</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-200 flex justify-end gap-4">
                        {isEdit ? (
                            <>
                                <button
                                    onClick={cancelEdit}
                                    disabled={uploading}
                                    className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all transform hover:scale-105"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpdateProfile}
                                    disabled={uploading}
                                    className="px-6 py-2.5 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105 hover:shadow-xl"
                                >
                                    {uploading ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Submitting...
                                        </span>
                                    ) : (
                                        "Save Changes"
                                    )}
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setIsEdit(true)}
                                className="px-6 py-2.5 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105 hover:shadow-xl"
                            >
                                Make a new Application
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailItem = ({ label, value, isEdit, type = "text", onChange }) => {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            {isEdit ? (
                type === "textarea" ? (
                    <textarea
                        value={value || ""}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800 placeholder-gray-400 transition-all"
                        placeholder={`Enter ${label.toLowerCase()}...`}
                        rows="4"
                    />
                ) : (
                    <input
                        type={type}
                        value={value || ""}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800 placeholder-gray-400 transition-all"
                        placeholder={`Enter ${label.toLowerCase()}...`}
                    />
                )
            ) : (
                <div className="px-4 py-2.5 rounded-lg bg-gray-50 text-gray-700">
                    {value || <span className="text-gray-400">Not provided</span>}
                </div>
            )}
        </div>
    );
};

export default AddDoctor;