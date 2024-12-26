
import { createContext, useState } from "react";
import { doctors } from "../assets/assets";
export const AppContext  = createContext();
import axios  from "axios";


const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [token, setToken] = useState(localStorage.getItem('token') || '')

  const value = {
    doctors,
    token,
    setToken,
    backendUrl,
    currencySymbol: "Rs."
  }
  

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}
 export default AppContextProvider;
