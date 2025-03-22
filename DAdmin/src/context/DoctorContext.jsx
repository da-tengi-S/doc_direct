

import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [dToken, setDtoken] = useState(localStorage.getItem('dToken') || '');
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadDoctorProfileData = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/get-doc`, {
                headers: { Authorization: `Bearer ${dToken}` }
            });
            
            // Changed from data.doctor to data.data
            if (data.success && data.data) {
                setUserData(data.data);
            } else {
                toast.error(data.message || "No doctor data found");
                setUserData(null);
            }
        } catch (error) {
            console.error("API Error:", error.response?.data || error.message);
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
            dToken, 
            loadDoctorProfileData, 
            backendUrl 
        }}>
            {children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider;