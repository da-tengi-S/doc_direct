import React from 'react';
import ReactDOM from 'react-dom';
import AppContextProvider from './context/AppContext.jsx';
import AdminContextProvider from './context/AdminContext.jsx';
import DoctorContextProvider from './context/DoctorContext.jsx';
import App from './App';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdminContextProvider>
      <DoctorContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </DoctorContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
);
