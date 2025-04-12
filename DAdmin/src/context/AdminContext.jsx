import { createContext, useContext, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [aToken, setaToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors, setDoctors] = useState('')
    const [issues, setIssues] = useState('')
    const [appointments, setAppointments] = useState([])
    const [dashData, setdashData] = useState(false)

    const getAlldoctors = async () => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/admin/all-doctors',
                {}, // Request body is empty
                {
                    headers: {
                        Authorization: `Bearer ${aToken}`, // passing the token
                    },
                }
            );
            if (data.success) {
                setDoctors(data.doctors);
                console.log(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const getIssues = async (aToken) => {
        try {
            const { data } = await axios.get(
              `${backendUrl}/api/admin/issue`,
              { 
                headers: { 
                  Authorization: `Bearer ${aToken}` 
                } 
              }
            );
            
            if (!data) throw new Error('No response from server');
            
            return {
              success: data.success,
              data: data.data,
              message: data.message
            };
            
          } catch (error) {
            console.error("API Error:", error);
            const message = error.response?.data?.message 
              || error.message 
              || 'Network error occurred';
              
            toast.error(message);
            return { 
              success: false, 
              message 
            };
          }
    };

   
    const changeAvaialabilty = async (docId) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/admin/change-availablity',
                { docId },
                { headers: { Authorization: `Bearer ${aToken}` } } // Use Authorization header
            );
            if (data.success) {
                toast.success(data.message);
                getAlldoctors();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };



    
   
    const rejectApplication = async (docId) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/admin/reject',
                { docId },
                { headers: { Authorization: `Bearer ${aToken}` } } 
            );
            if (data.success) {
                toast.success(data.message);
                getAlldoctors();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };


    const varifyDoctor = async (docId) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/admin/varify',
                { docId },
                { headers: { Authorization: `Bearer ${aToken}` } } 
            );
            if (data.success) {
                toast.success(data.message);
                getAlldoctors();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const cancelAppoitmnet = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/admin/cancelAppoitmnet',
                {appointmentId},
                { headers: { Authorization: `Bearer ${aToken}` } } // Use Authorization header
            );
            if(data.success){
                toast.success(data.message)
                getAllAppointments()

            }
            else{
                toast.error(error.message)
            }
          
        } catch (error) {
            
        }
    }

    const getDashData = async () =>{
        try {
            const { data } = await axios.get(
                backendUrl + '/api/admin/dashboard',
                {}, // Request body is empty
                {
                    headers: {
                        Authorization: `Bearer ${aToken}`, // passing the token
                    },
                }
            );
            if (data.success) {
                setDoctors(data.doctors);
                console.log(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            
        }
    }

    
    const getDashData1 = async () =>{
        try {
            const { data } = await axios.get(
                backendUrl + '/api/admin/dashboard',
             
                { headers: { Authorization: `Bearer ${aToken}` } } 
            );
            if (data.success) {
                setdashData(data.dashData);
                console.log(data.dashData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            
        }
    }

    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(
                backendUrl + '/api/admin/appointments',
                {
                    headers: {
                        Authorization: `Bearer ${aToken}`, // passing the token
                    },
                }
            );
    
            if (data.success) {
                setAppointments(data.appointments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };
    
    const value = {
        aToken, setaToken,dashData, getIssues, backendUrl,   issues, setIssues,  varifyDoctor, doctors, getAlldoctors, rejectApplication ,changeAvaialabilty, appointments, setAppointments, getAllAppointments, cancelAppoitmnet, getDashData, getDashData1
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
