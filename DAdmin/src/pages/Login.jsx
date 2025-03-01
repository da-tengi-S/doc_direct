// import React, { useContext, useState } from 'react';
// import axios from 'axios';
// import { assets } from '../assets/assets_admin/assets'
// import { AdminContext } from '../context/AdminContext';
// import { toast } from 'react-toastify';

// const Login = () => {
//   const [state, setState] = useState("admin");
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { setaToken, backendUrl } = useContext(AdminContext);

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();

//     // Validation for empty fields
//     if (!email || !password) {
//       toast.error("Please fill in all fields");
//       return;
//     }

//     try {
//       if (state === "admin") {
//         const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password });

//         if (data.success) {
//           localStorage.setItem('aToken', data.token);
//           setaToken(data.token);
//           toast.success('Login Successful');
//         } else {
//           toast.error(data.message || 'Something went wrong');
//         }
//       } else {
//         toast.error('Only Admin login is allowed');
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       toast.error(error.response?.data?.message || "An unexpected error occurred");
//     }
//   };

//   return (
//     <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
//       <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-black-600 text-sm shadow-lg'>
//         <p className='text-2xl font-semibold m-auto'>
//           <span className='text-primary'>{state}</span> Login
//         </p>
//         <div className='w-full'>
//           <p>Email</p>
//           <input
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             className='border border-[#DADADA] rounded w-full p-2 mt-1'
//             type="email"
//             required
//           />
//         </div>
//         <div className='w-full'>
//           <p>Password</p>
//           <input
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//             className='border border-[#DADADA] rounded w-full p-2 mt-1'
//             type="password"
//             required
//           />
//         </div>
//         <button className='bg-primary text-black w-full py-2 rounded-md text-base'>Login</button>
//         {state === "admin" ? (
//           <p>
//             Doctor Login{' '}
//             <span className='text-primary underline cursor-pointer' onClick={() => setState('doctor')}>
//               Click here
//             </span>
//           </p>
//         ) : (
//           <p>
//             Admin Login{' '}
//             <span className='text-primary underline cursor-pointer' onClick={() => setState('admin')}>
//               Click here
//             </span>
//           </p>
//         )}
//       </div>
//     </form>
//   );
// };

// export default Login;

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
          navigate('/admin/dashboard');
        }
      } else if (userType === 'doctor') {
        if (doctorAction === 'login') {
          const { data } = await axios.post(`${backendUrl}/api/doctor/login`, { email, password });
          if (data.success) {
            localStorage.setItem('dToken', data.token);
            setDtoken(data.token);
            toast.success('Doctor Login Successful');
            navigate('/doctor/dashboard');
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
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-black-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'>
          {userType === 'admin' 
            ? 'Admin Login'
            : `Doctor ${doctorAction === 'login' ? 'Login' : 'Sign Up'}`}
        </p>

        {/* Name Field for Doctor Signup */}
        {userType === 'doctor' && doctorAction === 'signup' && (
          <div className='w-full'>
            <p>Full Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className='border border-[#DADADA] rounded w-full p-2 mt-1'
              type="text"
              required
            />
          </div>
        )}

        {/* Email Field */}
        <div className='w-full'>
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='border border-[#DADADA] rounded w-full p-2 mt-1'
            type="email"
            required
          />
        </div>

        {/* Password Field */}
        <div className='w-full'>
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className='border border-[#DADADA] rounded w-full p-2 mt-1'
            type="password"
            required
          />
        </div>

        <button className='bg-primary text-black w-full py-2 rounded-md text-base'>
          {userType === 'admin' 
            ? 'Login' 
            : doctorAction === 'login' ? 'Login' : 'Create Account'}
        </button>

        {/* Toggle between Admin/Doctor */}
        {userType === 'admin' ? (
          <p>
            Doctor Login{' '}
            <span className='text-primary underline cursor-pointer' onClick={() => {
              setUserType('doctor');
              clearForm();
              setDoctorAction('login');
            }}>
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login{' '}
            <span className='text-primary underline cursor-pointer' onClick={() => {
              setUserType('admin');
              clearForm();
            }}>
              Click here
            </span>
          </p>
        )}

        {/* Toggle between Doctor Login/Signup */}
        {userType === 'doctor' && (
          <p>
            {doctorAction === 'login' 
              ? 'Need an account? ' 
              : 'Already have an account? '}
            <span
              className='text-primary underline cursor-pointer'
              onClick={() => {
                setDoctorAction(doctorAction === 'login' ? 'signup' : 'login');
                clearForm();
              }}
            >
              {doctorAction === 'login' ? 'Sign Up' : 'Login'}
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;