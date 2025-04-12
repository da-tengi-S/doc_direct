

import React, { useContext, useState } from 'react';
import axios from 'axios';
import { assets } from '../assets/assets_admin/assets';
import { AdminContext } from '../context/AdminContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';

const Login = () => {
  const [userType, setUserType] = useState('admin');
  const [doctorAction, setDoctorAction] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { setaToken, backendUrl } = useContext(AdminContext);
  const {  setDtoken } = useContext(DoctorContext);

  const navigate = useNavigate();

  const clearForm = () => {
    setEmail('');
    setPassword('');
    setName('');
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Validation
    if (userType === 'doctor' && doctorAction === 'signup' && !name) {
      toast.error('Name is required');
      return;
    }
    if (!email || !password) {
      toast.error('All fields are required');
      return;
    }

    try {
      if (userType === 'admin') {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password });
        if (data.success) {
          localStorage.setItem('aToken', data.token);
          setaToken(data.token);
          toast.success('Admin Login Successful');
          navigate('/admin-dashboard');
        }
      } else if (userType === 'doctor') {
        if (doctorAction === 'login') {
          const { data } = await axios.post(`${backendUrl}/api/doctor/login`, { email, password });
          if (data.success) {
            localStorage.setItem('dToken', data.token);
            setDtoken(data.token);
            toast.success('Doctor Login Successful');
            navigate('/DocDashbaord');
          }
        } else {
          const { data } = await axios.post(`${backendUrl}/api/doctor/register`, {
            name,
            email,
            password,
          });
          if (data.success) {
            localStorage.setItem("dToken", data.token);
            setDtoken(data.token);
            toast.success("Doctor Account Created!");
            navigate("/doctor/dashboard");
          }
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500 to-green-500">
      
      <form onSubmit={onSubmitHandler} className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-4 transition-all">
        
        <h2 className="text-2xl  text-center text-gray-800 mb-6">
        <h1 className='text-3xl font-bold text-blue-900 mb-3'>Doc Direct </h1>< hr />
       
          {userType === 'admin' ? 'Admin Portal' : `Doctor ${doctorAction === 'login' ? 'Portal' : 'Registration'}`}
        </h2>

        {userType === 'doctor' && doctorAction === 'signup' && (
          <div className="space-y-2">
            <label className="block text-gray-700 text-sm font-semibold">Full Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              type="text"
              required
              placeholder=""
            />
          </div>
        )}

        <div className="space-y-2">
          <label className="block text-gray-700 text-sm font-semibold">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            type="email"
            required
            placeholder=""
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700 text-sm font-semibold">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            type="password"
            required
            placeholder=""
          />
        </div>

        <button className="w-full p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md">
          {userType === 'admin' ? 'Login' : doctorAction === 'login' ? 'Login' : 'Create Account'}
        </button>

        <div className="text-center space-y-2 pt-4">
          <p className="text-gray-600 text-sm">
            {userType === 'admin' ? 'Are you a doctor?' : 'Admin access?'}{' '}
            <button
              type="button"
              onClick={() => {
                setUserType(userType === 'admin' ? 'doctor' : 'admin');
                clearForm();
                if (userType === 'admin') setDoctorAction('login');
              }}
              className="text-blue-600 hover:text-blue-800 font-medium underline transition-colors"
            >
              Switch here
            </button>
          </p>

          {userType === 'doctor' && (
            <p className="text-gray-600 text-sm">
              {doctorAction === 'login' ? 'New to our platform?' : 'Already have an account?'}{' '}
              <button
                type="button"
                onClick={() => {
                  setDoctorAction(doctorAction === 'login' ? 'signup' : 'login');
                  clearForm();
                }}
                className="text-blue-600 hover:text-blue-800 font-medium underline transition-colors"
              >
                {doctorAction === 'login' ? 'Register now' : 'Login instead'}
              </button>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;