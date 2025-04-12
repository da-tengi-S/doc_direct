
import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [dToken, setDtoken] = useState(localStorage.getItem('dToken') || '');
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState([]);
    const [dashbaordData , setDashbaordData] = useState(false);
    const [medicalRecords, setMedicalRecords] = useState([]); // ⬅️ New State
    const [patientRecords, setPatientRecords] = useState([]);


    const getappoitemnts = async () => {
        try {
          const { data } = await axios.get(
            `${backendUrl}/api/doctor/appointment`, 
            {
              headers: { Authorization: `Bearer ${dToken}` }
            }
          );
          if (data.success) {
            setAppointments(data.appointments.reverse());
          }
        } catch (error) {
            console.error("API Error:", error.response?.data || error.message);
        }
    };

    const fetchPatientRecords = useCallback(async () => {
        try {
          if (!userData?._id) return;
          
          const { data } = await axios.post(
            `${backendUrl}/api/doctor/view-records`,
            { doctorId: userData._id },
            { headers: { Authorization: `Bearer ${dToken}` } }
          );
  
          if (data.success) {
            setPatientRecords(data.records);
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error(error.response?.data?.message || "Failed to fetch medical records");
        }
      }, [backendUrl, dToken, userData?._id]);
  
      // Add useEffect to trigger fetch
      useEffect(() => {
        if (userData?._id) {
          fetchPatientRecords();
        }
      }, [userData?._id, fetchPatientRecords]);
  


    
      const DuploadMedicalRecord = async (formData) => {
        try {
          const { data } = await axios.post(`${backendUrl}/api/user/add-DmedRecord`, formData, {
            headers: {
              Authorization: `Bearer ${dToken}`,
              "Content-Type": "multipart/form-data",
            },
          });
          if (data.success) {
            toast.success(data.message);
            return data.medicalRecord;
          } else {
            throw new Error(data.message);
          }
        } catch (error) {
          console.error("Error uploading medical record:", error);
          toast.error(error.response?.data?.message || "An unexpected error occurred.");
          throw error;
        }
      };

    const DcancelAppoitmnet = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/doctor/CancelAP',
                { appointmentId },
                { headers: { Authorization: `Bearer ${dToken}` } }
            );
            if (data.success) {
                toast.success(data.message);
                getappoitemnts();
            } else {
                toast.error(data.message); 
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to cancel appointment");
        }
    };

    const DCompleteAppoitmnet = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/doctor/completeAP',
                { appointmentId },
                { headers: { Authorization: `Bearer ${dToken}` } }
            );
            if (data.success) {
                toast.success(data.message);
                getappoitemnts();
            } else {
                toast.error(data.message); 
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to complete appointment");
        }
    };

    const getDashData = async () => {
        try {
            const { data } = await axios.get(
                backendUrl + '/api/doctor/dashbaordData',
                { headers: { Authorization: `Bearer ${dToken}` } }
            );
            if (data.success) {
                setDashbaordData(data.dashdata);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to get dashboard data");
        }
    };

    const changeVideoAvaialabilty = async (docId) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/doctor/chnageVideo',
                { docId }, 
                { headers: { Authorization: `Bearer ${dToken}` } }
            );
            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const requestMedicalRecordAccess = async (patientId) => {
        try {
            if (!userData?._id) {
                toast.error("Doctor information not loaded.");
                return;
            }

            const { data } = await axios.post(
                `${backendUrl}/api/doctor/request-access`,
                {
                    doctorId: userData._id,
                    patientId: patientId
                },
                { headers: { Authorization: `Bearer ${dToken}` } }
            );

            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to request access");
        }
    };

    const loadDoctorProfileData = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/get-doc`, {
                headers: { Authorization: `Bearer ${dToken}` }
            });

            if (data.success && data.data) {
                setUserData(data.data);
            } else {
                toast.error(data.message || "No doctor data found");
                setUserData(null);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to load profile");
            setUserData(null);
        } finally {
            setLoading(false);
        }
    }, [backendUrl, dToken]);

    useEffect(() => {
        if (dToken) {
            loadDoctorProfileData();
        } else {
            setUserData(null);
            setLoading(false);
        }
    }, [dToken, loadDoctorProfileData]);

    return (
        <DoctorContext.Provider value={{
            userData,
            loading,
            setDtoken,
            appointments, setAppointments,
            getappoitemnts,
            dToken,
            loadDoctorProfileData,
            DcancelAppoitmnet,
            DCompleteAppoitmnet,
            requestMedicalRecordAccess,
            changeVideoAvaialabilty,
            setDashbaordData,
            dashbaordData,
            DuploadMedicalRecord,
            getDashData,
            backendUrl,
            patientRecords,       
            fetchPatientRecords        
        }}>
            {children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider;
