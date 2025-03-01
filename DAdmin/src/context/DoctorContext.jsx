import { createContext, useState } from "react";

export const DoctorContext = createContext(); // Named export for context

const DoctorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [dToken, setDtoken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '')
    const value = {
        dToken, setDtoken
        ,backendUrl
    };

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider; // Default export for the provider
