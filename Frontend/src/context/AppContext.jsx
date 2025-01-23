

// import { createContext, useEffect, useState } from "react";
// import { toast } from 'react-toastify';
// import axios from "axios";

// export const AppContext = createContext();

// const AppContextProvider = (props) => {
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
//   const [token, setToken] = useState(localStorage.getItem('token') || '');
//   const [userData, setUserData] = useState(false); // Fixed destructuring
//   const [doctors, setDoctors] = useState();

//   const getDoctorsData = async () => {
//     if (!backendUrl) {
//       toast.error("Backend URL is not configured.");
//       return;
//     }
//     try {
//       const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
//       if (data.success) {
//         setDoctors(data.doctors); // Ensure key matches backend response
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Error fetching doctors.");
//     }
//   };
//   const loadUserProfileData = async () => {
//     try {
//       const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (data.success) {
//         setUserData(data.userData);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Error fetching user profile.");
//     }
//   };
  
//   useEffect(() => {
//     getDoctorsData();
//   }, []);

//   useEffect(() => {
//     if (token) {
//       loadUserProfileData();
//     } else {
//       setUserData(false);
//     }
//   }, [token]);

//   const value = {
//     doctors,
//    ...(token && { token, setToken }), // Include token only when it exists
//     setToken,
//     backendUrl,
//     userData,
//     setUserData,
//     loadUserProfileData,
//     currencySymbol: "Rs.",
//   };

//   return (
//     <AppContext.Provider value={value}>
//       {props.children}
//     </AppContext.Provider>
//   );
// };

// export default AppContextProvider;



import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { doctors } from "../assets/assets";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userData, setUserData] = useState(false); // Fixed destructuring
  const [doctors, setDoctors] = useState();

  const getDoctorsData = async () => {
    if (!backendUrl) {
      toast.error("Backend URL is not configured.");
      return;
    }
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
      if (data.success) {
        setDoctors(data.doctors); // Ensure key matches backend response
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching doctors.");
    }
  };
  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching user profile.");
    }
  };
  
  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  const value = {
    doctors,
    getDoctorsData,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
    currencySymbol: "Rs.",
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

