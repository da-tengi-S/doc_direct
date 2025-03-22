


// import React, { useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { DoctorContext } from "../../context/DoctorContext";

// const AddDoctor = () => {
    // const { userData, loading, dToken, backendUrl, loadDoctorProfileData } = useContext(DoctorContext);
    // const [isEdit, setIsEdit] = useState(false);
    // const [files, setFiles] = useState({
    //     profileImage: null,
    //     document: null
    // });
    // const [formState, setFormState] = useState({});
    // const [uploading, setUploading] = useState(false);

    // useEffect(() => {
    //     if (userData) {
    //         setFormState({
    //             name: userData.name || "",
    //             phone: userData.phone || "",
    //             speciality: userData.speciality || "",
    //             experience: userData.experience || "",
    //             degree: userData.degree || "",
    //             fees: userData.fees || "",
    //             about: userData.about || ""
    //         });
    //     }
    // }, [userData]);

    // const handleFileChange = (type) => (e) => {
    //     if (e.target.files[0]) {
    //         const file = e.target.files[0];
            
    //         // Validate file type and size
    //         if (type === 'document' && !file.type.match(/(image\/.*|application\/pdf)/)) {
    //             toast.error("Only images and PDF files are allowed!");
    //             return;
    //         }

    //         if (file.size > 15 * 1024 * 1024) {
    //             toast.error("File size must be less than 15MB!");
    //             return;
    //         }

    //         setFiles(prev => ({
    //             ...prev,
    //             [type]: file
    //         }));
    //     }
    // };

    // const handleUpdateProfile = async () => {
    //     try {
    //         setUploading(true);
    //         const formData = new FormData();

    //         // Append updated fields
    //         Object.entries(formState).forEach(([key, value]) => {
    //             if (value !== userData[key]) {
    //                 formData.append(key, value);
    //             }
    //         });

    //         // Append files with proper field names
    //         if (files.profileImage) {
    //             formData.append(
    //                 'profileImage', 
    //                 files.profileImage,
    //                 `profile-${Date.now()}-${files.profileImage.name}`
    //             );
    //         }
            
    //         if (files.document) {
    //             formData.append(
    //                 'document', 
    //                 files.document,
    //                 `doc-${Date.now()}-${files.document.name}`
    //             );
    //         }

    //         const response = await axios.put(
    //             `${backendUrl}/api/doctor/update/${userData._id}`,
    //             formData,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${dToken}`,
    //                     'Content-Type': 'multipart/form-data',
    //                 },
    //             }
    //         );

    //         if (response.data.success) {
    //             await loadDoctorProfileData();
    //             toast.success("Application submitted successfully");
    //             setIsEdit(false);
    //             setFiles({ profileImage: null, document: null });
    //         } else {
    //             toast.error(response.data.message);
    //         }
    //     } catch (error) {
    //         console.error('Update error:', error);
    //         toast.error(
    //             error.response?.data?.message || 
    //             'Update failed. Please check file formats (images/PDF) and try again.'
    //         );
    //     } finally {
    //         setUploading(false);
    //     }
    // };

    // const cancelEdit = () => {
    //     setIsEdit(false);
    //     setFiles({ profileImage: null, document: null });
    //     setFormState({
    //         name: userData.name || "",
    //         phone: userData.phone || "",
    //         speciality: userData.speciality || "",
    //         experience: userData.experience || "",
    //         degree: userData.degree || "",
    //         fees: userData.fees || "",
    //         about: userData.about || ""
    //     });
    // };

    // if (loading) {
    //     return (
    //         <div className="flex justify-center mt-20">
    //             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    //         </div>
    //     );
    // }

    // if (!userData) {
    //     return (
    //         <div className="text-center mt-20">
    //             <p className="text-red-500 text-lg mb-4">⚠️ Profile not found</p>
    //             <button
    //                 onClick={loadDoctorProfileData}
    //                 className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
    //             >
    //                 Retry Loading Profile
    //             </button>
    //         </div>
    //     );
    // }

//     return (
//         <div className="w-[70%] max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
//             <div className="max-w-3xl mx-auto">
//                 <div className="bg-white rounded-xl shadow-lg p-8">
//                     {/* Header Section */}
//                     <div className="flex items-center gap-6 mb-10 border-b pb-8">
//                         <div className="relative">
//                             <label className="cursor-pointer">
//                                 <img
//                                     className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
//                                     src={
//                                         files.profileImage 
//                                             ? URL.createObjectURL(files.profileImage)
//                                             : userData.profileImage || "/default-avatar.png"
//                                     }
//                                     alt="Profile preview"
//                                 />
//                                 {isEdit && (
//                                     <>
//                                         <input
//                                             type="file"
//                                             className="hidden"
//                                             onChange={handleFileChange('profileImage')}
//                                             accept="image/*"
//                                         />
//                                         <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-sm">
//                                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 114.95 0 2.5 2.5 0 01-4.95 0zM12 15v3m0 3h.01M12 21a9 9 0 119-9 9 9 0 01-9 9z" />
//                                             </svg>
//                                         </div>
//                                     </>
//                                 )}
//                             </label>
//                         </div>

//                         <div className="flex-1">
//                             <h1 className="text-3xl font-bold text-gray-900">
//                                 Doctor Application Form
//                             </h1>
//                             <p className="text-gray-600 mt-2">
//                                 {isEdit 
//                                     ? "Update your profile information below"
//                                     : "Review your profile information"}
//                             </p>
//                         </div>
//                     </div>

//                     {/* Form Sections */}
//                     <div className="space-y-10">
//                         {/* Personal Information */}
                        // <section className="space-y-6">
                        //     <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-blue-600 pl-3">
                        //         Personal Information
                        //     </h2>
                        //     <div className="grid md:grid-cols-2 gap-6">
                        //         <DetailItem
                        //             label="Full Name"
                        //             value={formState.name}
                        //             isEdit={isEdit}
                        //             onChange={(value) => setFormState(prev => ({ ...prev, name: value }))}
                        //         />
                        //         <DetailItem
                        //             label="Email"
                        //             value={userData.email}
                        //             isEdit={false}
                        //         />
                        //         <DetailItem
                        //             label="Phone Number"
                        //             value={formState.phone}
                        //             isEdit={isEdit}
                        //             onChange={(value) => setFormState(prev => ({ ...prev, phone: value }))}
                        //         />
                        //     </div>
                        // </section>

//                         {/* Professional Details */}
//                         <section className="space-y-6">
//                             <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-blue-600 pl-3">
//                                 Professional Details
//                             </h2>
//                             <div className="grid md:grid-cols-2 gap-6">
//                                 <DetailItem
//                                     label="Speciality"
//                                     value={formState.speciality}
//                                     isEdit={isEdit}
//                                     onChange={(value) => setFormState(prev => ({ ...prev, speciality: value }))}
//                                 />
//                                 <DetailItem
//                                     label="Experience (years)"
//                                     type="number"
//                                     value={formState.experience}
//                                     isEdit={isEdit}
//                                     onChange={(value) => setFormState(prev => ({ ...prev, experience: value }))}
//                                 />
//                                 <DetailItem
//                                     label="Degree"
//                                     value={formState.degree}
//                                     isEdit={isEdit}
//                                     onChange={(value) => setFormState(prev => ({ ...prev, degree: value }))}
//                                 />
//                                 <DetailItem
//                                     label="Consultation Fee"
//                                     type="number"
//                                     value={formState.fees}
//                                     isEdit={isEdit}
//                                     onChange={(value) => setFormState(prev => ({ ...prev, fees: value }))}
//                                 />
//                             </div>
//                         </section>

//                         {/* About Section */}
//                         <section className="space-y-6">
//                             <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-blue-600 pl-3">
//                                 About You
//                             </h2>
//                             <div className="space-y-4">
//                                 <DetailItem
//                                     label="About"
//                                     value={formState.about}
//                                     isEdit={isEdit}
//                                     type="textarea"
//                                     onChange={(value) => setFormState(prev => ({ ...prev, about: value }))}
//                                 />
//                             </div>
//                         </section>

//                         {/* Document Upload Section */}
//                         <section className="space-y-6">
//                             <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-blue-600 pl-3">
//                                 Professional Documents
//                             </h2>
//                             <div className="space-y-4">
//                                 <div className="flex items-center gap-4">
//                                     {isEdit ? (
//                                         <label className="flex-1 cursor-pointer bg-gray-100 text-gray-700 p-3 rounded-lg border border-gray-300 hover:bg-gray-200 transition">
//                                             <input
//                                                 type="file"
//                                                 className="hidden"
//                                                 onChange={handleFileChange('document')}
//                                                 accept="image/*,application/pdf"
//                                             />
//                                             <span className="flex items-center gap-2">
//                                                 📄 {files.document ? files.document.name : "Upload Document (Image/PDF)"}
//                                             </span>
//                                         </label>
//                                     ) : (
//                                         <div className="flex-1 bg-gray-50 p-3 rounded-lg">
//                                             {userData.document?.url ? (
//                                                 <a
//                                                     href={userData.document.url}
//                                                     target="_blank"
//                                                     rel="noopener noreferrer"
//                                                     className="text-blue-600 hover:underline"
//                                                 >
//                                                     View Current Document
//                                                 </a>
//                                             ) : (
//                                                 <span className="text-gray-500">No document uploaded</span>
//                                             )}
//                                         </div>
//                                     )}
//                                 </div>
//                                 <p className="text-sm text-gray-500">
//                                     Supported formats: JPEG, PNG, PDF (Max 15MB)
//                                 </p>
//                             </div>
//                         </section>
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="mt-12 flex justify-end gap-4 border-t pt-8">
//                         {isEdit ? (
//                             <>
//                                 <button
//                                     onClick={cancelEdit}
//                                     disabled={uploading}
//                                     className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     onClick={handleUpdateProfile}
//                                     disabled={uploading}
//                                     className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
//                                 >
//                                     {uploading ? (
//                                         <span className="flex items-center gap-2">
//                                             <span className="animate-spin">⏳</span>
//                                             Uploading...
//                                         </span>
//                                     ) : (
//                                         "Submit Application"
//                                     )}
//                                 </button>
//                             </>
//                         ) : (
//                             <button
//                                 onClick={() => setIsEdit(true)}
//                                 className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                             >
//                                 Edit Application
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const DetailItem = ({ label, value, isEdit, type = "text", onChange }) => {
//     return (
//         <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700">
//                 {label}
//             </label>
//             {isEdit ? (
//                 type === "textarea" ? (
//                     <textarea
//                         value={value || ""}
//                         onChange={(e) => onChange(e.target.value)}
//                         className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-32 resize-none p-3"
//                         placeholder={`Enter ${label.toLowerCase()}...`}
//                     />
//                 ) : (
//                     <input
//                         type={type}
//                         value={value || ""}
//                         onChange={(e) => onChange(e.target.value)}
//                         className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2.5"
//                         placeholder={`Enter ${label.toLowerCase()}...`}
//                     />
//                 )
//             ) : (
//                 <div className="mt-1 text-gray-900 bg-gray-50 rounded-lg p-3">
//                     {value || <span className="text-gray-400">Not provided</span>}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AddDoctor;

import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
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
        <div className="w-full h-screen bg-gradient-to-r from-gray-700 to-gray-800 text-white flex justify-center p-6">
        <div className="w-[80%] max-w-7xl mx-auto h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-lg p-8">
                    <div className="flex items-center gap-6 mb-10 border-b border-gray-700 pb-8">
                        <div className="relative">
                            <label className="cursor-pointer">
                                <img
                                    className="w-32 text-black h-32 rounded-full border-4 bg-yellow-200 border-blue-800 shadow-lg object-cover"
                                    src={
                                        files.profileImage 
                                            ? URL.createObjectURL(files.profileImage)
                                            : userData.profileImage || "/default-avatar.png"
                                    }
                                    alt=" ..........................                    Uplaod Photo "
                                />
                                {isEdit && (
                                    <>
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={handleFileChange('profileImage')}
                                            accept="image/*"
                                        />
                                        <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-sm">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 114.95 0 2.5 2.5 0 01-4.95 0zM12 15v3m0 3h.01M12 21a9 9 0 119-9 9 9 0 01-9 9z" />
                                            </svg>
                                        </div>
                                    </>
                                )}
                            </label>
                        </div>

                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-white">
                                Doctor Application Form
                            </h1>
                            <p className="text-gray-300 mt-2">
                                {isEdit 
                                    ? "Update your profile information below"
                                    : "Review your profile information"}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-10">
                        <section className="space-y-6">
                            <h2 className="text-xl font-semibold text-white border-l-4 border-blue-600 pl-3">
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

                        <section className="space-y-6">
                            <h2 className="text-xl font-semibold text-white border-l-4 border-blue-600 pl-3">
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

                        <section className="space-y-6">
                            <h2 className="text-xl font-semibold text-white border-l-4 border-blue-600 pl-3">
                                About You
                            </h2>
                            <div className="space-y-4">
                                <DetailItem
                                    label="About"
                                    value={formState.about}
                                    isEdit={isEdit}
                                    type="textarea"
                                    onChange={(value) => setFormState(prev => ({ ...prev, about: value }))}
                                />
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-xl font-semibold text-white border-l-4 border-blue-600 pl-3">
                                Professional Documents
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    {isEdit ? (
                                        <label className="flex-1 cursor-pointer bg-gray-700 text-gray-300 p-3 rounded-lg border border-gray-600 hover:bg-gray-600 transition">
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={handleFileChange('document')}
                                                accept="image/*,application/pdf"
                                            />
                                            <span className="flex items-center gap-2">
                                                📄 {files.document ? files.document.name : "Upload Document (Image/PDF)"}
                                            </span>
                                        </label>
                                    ) : (
                                        <div className="flex-1 bg-gray-700 p-3 rounded-lg">
                                            {userData.document?.url ? (
                                                <a
                                                    href={userData.document.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-400 hover:underline"
                                                >
                                                    View Current Document
                                                </a>
                                            ) : (
                                                <span className="text-gray-400">No document uploaded</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <p className="text-sm text-gray-400">
                                    Supported formats: JPEG, PNG, PDF (Max 15MB)
                                </p>
                            </div>
                        </section>
                    </div>

                    <div className="mt-12 flex justify-end gap-4 border-t border-gray-700 pt-8">
                        {isEdit ? (
                            <>
                                <button
                                    onClick={cancelEdit}
                                    disabled={uploading}
                                    className="px-6 py-2.5 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpdateProfile}
                                    disabled={uploading}
                                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                                >
                                    {uploading ? (
                                        <span className="flex items-center gap-2">
                                            <span className="animate-spin">⏳</span>
                                            Uploading...
                                        </span>
                                    ) : (
                                        "Submit Application"
                                    )}
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setIsEdit(true)}
                                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Make a Application
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
            <label className="block text-sm font-medium text-gray-300">
                {label}
            </label>
            {isEdit ? (
                type === "textarea" ? (
                    <textarea
                        value={value || ""}
                        onChange={(e) => onChange(e.target.value)}
                        className="mt-1 block w-full rounded-lg border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-32 resize-none p-3 bg-gray-700 text-white"
                        placeholder={`Enter ${label.toLowerCase()}...`}
                    />
                ) : (
                    <input
                        type={type}
                        value={value || ""}
                        onChange={(e) => onChange(e.target.value)}
                        className="mt-1 block w-full rounded-lg border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2.5 bg-gray-700 text-white"
                        placeholder={`Enter ${label.toLowerCase()}...`}
                    />
                )
            ) : (
                <div className="mt-1 text-gray-100 bg-gray-700 rounded-lg p-3">
                    {value || <span className="text-gray-400">Not provided</span>}
                </div>
            )}
        </div>
        
    );
};

export default AddDoctor;