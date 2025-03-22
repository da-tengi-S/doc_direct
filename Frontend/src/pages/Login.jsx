

// import React, { useContext, useEffect, useState } from 'react';
// import { AppContext } from '../context/AppContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { assets } from '../assets/assets';
// import { FaFacebook, FaTwitter, FaGoogle } from 'react-icons/fa';

// const Login = () => {
//   const [state, setState] = useState('Sign Up');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [verificationCode, setVerificationCode] = useState('');
//   const [isVerifying, setIsVerifying] = useState(false);
//   const navigate = useNavigate();

//   // ... existing state variables ...
//   const [isLoading, setIsLoading] = useState(false);
//   const [view, setView] = useState(state === 'Sign Up' ? 'signup' : 'login');

//   const { backendUrl, token, setToken } = useContext(AppContext);

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();

//     if (!email || !password || (state === 'Sign Up' && !name)) {
//       return toast.error('All fields are required');
//     }

//     try {
//       if (state === 'Sign Up') {
//         const { data } = await axios.post(`${backendUrl}/api/user/register`, {
//           name,
//           password,
//           email,
//         });

//         if (data.success) {
//           toast.success('Verification email sent! Please check your inbox.');
//           setIsVerifying(true);
//         } else {
//           toast.error(data.message);
//         }
//       } else {
//         const { data } = await axios.post(`${backendUrl}/api/user/login`, {
//           password,
//           email,
//         });

//         if (data.success) {
//           localStorage.setItem('token', data.token);
//           setToken(data.token);
//           toast.success('Logged In Successfully!');
//           navigate('/');
//         } else {
//           toast.error(data.message);
//         }
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     }
//   };

//   const onVerifyHandler = async (event) => {
//     event.preventDefault();

//     if (!email || !verificationCode) {
//       return toast.error('Please enter your email and verification code');
//     }

//     try {
//       const { data } = await axios.post(`${backendUrl}/api/user/verify-email`, {
//         email,
//         code: verificationCode,
//       });

//       if (data.success) {
//         toast.success('Email verified successfully! You can now log in.');
//         setIsVerifying(false);
//         setState('Login');
//         setView('login');
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       navigate('/');
//     }
//   }, [token, navigate]);

//   // Add these animations
//   const containerVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//     exit: { opacity: 0, y: -20 }
//   };

//   const switchView = (newView) => {
//     setView(newView);
//     setState(newView === 'signup' ? 'Sign Up' : 'Login');
//   };

//   return (
//     <div className=" w-90 min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-green-900 to-green-800 relative overflow-hidden">
//       {/* Animated background elements */}
//       <motion.div
//         className="absolute w-80 h-80 bg-purple-300 rounded-full -top-40 -right-40 opacity-20 blur-xl"
//         animate={{ scale: [1, 1.2, 1] }}
//         transition={{ duration: 8, repeat: Infinity }}
//       />
//       <motion.div
//         className="absolute w-80 h-80 bg-pink-300 rounded-full -bottom-40 -left-40 opacity-20 blur-xl"
//         animate={{ scale: [1, 1.2, 1] }}
//         transition={{ duration: 8, repeat: Infinity, delay: 2 }}
//       />

//       <motion.div
//         className="glass-container bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden w-full max-w-md mx-4"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         exit="exit"
//       >
//         <div className="p-8">
//           <div className="flex justify-center mb-8">
//             <motion.img
//               src={assets.logo1}
//               alt="Logo"
//               className="w-32 cursor-pointer"
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => navigate('/')}
//             />
//           </div>

//           {!isVerifying ? (
//             <>
//               <div className="flex justify-center mb-8">
//                 <div className="bg-white bg-opacity-20 rounded-full p-1">
//                   <button
//                     className={`px-6 py-2 rounded-full transition-colors ${view === 'login' ? 'bg-white text-purple-600 shadow-md' : 'bg-transparent text-white'
//                       }`}
//                     onClick={() => switchView('login')}
//                   >
//                     Login
//                   </button>
//                   <button
//                     className={`px-6 py-2 rounded-full transition-colors ${view === 'signup' ? 'bg-white text-purple-600 shadow-md' : 'bg-transparent text-white'
//                       }`}
//                     onClick={() => switchView('signup')}
//                   >
//                     Sign Up
//                   </button>
//                 </div>
//               </div>

//               <AnimatePresence mode='wait'>
//                 <motion.div
//                   key={view}
//                   initial={{ opacity: 0, x: view === 'login' ? -50 : 50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: view === 'login' ? 50 : -50 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <form onSubmit={onSubmitHandler} className="space-y-6">
//                     {view === 'signup' && (
//                       <div className="relative">
//                         <input
//                           type="text"
//                           className="w-full px-4 py-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg border border-white border-opacity-20 focus:border-opacity-40 focus:outline-none text-white placeholder-white placeholder-opacity-60"
//                           placeholder="Full Name"
//                           value={name}
//                           onChange={(e) => setName(e.target.value)}
//                         />
//                       </div>
//                     )}

//                     <div className="relative">
//                       <input
//                         type="email"
//                         className="w-full px-4 py-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg border border-white border-opacity-20 focus:border-opacity-40 focus:outline-none text-white placeholder-white placeholder-opacity-60"
//                         placeholder="Email Address"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                       />
//                     </div>

//                     <div className="relative">
//                       <input
//                         type="password"
//                         className="w-full px-4 py-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg border border-white border-opacity-20 focus:border-opacity-40 focus:outline-none text-white placeholder-white placeholder-opacity-60"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                       />
//                     </div>

//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       className="w-full bg-white text-purple-600 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
//                       type="submit"
//                       disabled={isLoading}
//                     >
//                       {isLoading ? (
//                         <div className="flex justify-center items-center">
//                           <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
//                         </div>
//                       ) : view === 'login' ? (
//                         'Login'
//                       ) : (
//                         'Create Account'
//                       )}
//                     </motion.button>
//                   </form>

//                   <div className="mt-6 text-center">
//                     <p className="text-white text-opacity-80">
//                       {view === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
//                       <button
//                         className="text-white font-semibold underline hover:text-opacity-80 transition-opacity"
//                         onClick={() => switchView(view === 'login' ? 'signup' : 'login')}
//                       >
//                         {view === 'login' ? 'Sign Up' : 'Login'}
//                       </button>
//                     </p>
//                   </div>

//                   <div className="mt-8">
//                     <div className="relative">
//                       <div className="absolute inset-0 flex items-center">
//                         <div className="w-full border-t border-white border-opacity-20"></div>
//                       </div>
//                       <div className="relative flex justify-center text-sm">
//                         <span className="px-2 bg-transparent text-white text-opacity-60">Or continue with</span>
//                       </div>
//                     </div>
//                     <div className="mt-6 flex justify-center space-x-4">
//                       <button className="p-3 border rounded-full hover:bg-gray-200 flex items-center justify-center"><FaGoogle size={24} /></button>
//                       <button className="p-3 border rounded-full hover:bg-gray-200 flex items-center justify-center"><FaFacebook size={24} /></button>
//                       <button className="p-3 border rounded-full hover:bg-gray-200 flex items-center justify-center"><FaTwitter size={24} /></button>
//                     </div>
//                   </div>
//                 </motion.div>
//               </AnimatePresence>
//             </>
//           ) : (
//             <form onSubmit={onVerifyHandler} className="space-y-6">
//               <div className="relative">
//                 <input
//                   type="email"
//                   className="w-full px-4 py-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg border border-white border-opacity-20 focus:border-opacity-40 focus:outline-none text-white placeholder-white placeholder-opacity-60"
//                   placeholder="Email Address"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>

//               <div className="relative">
//                 <input
//                   type="text"
//                   className="w-full px-4 py-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg border border-white border-opacity-20 focus:border-opacity-40 focus:outline-none text-white placeholder-white placeholder-opacity-60"
//                   placeholder="Verification Code"
//                   value={verificationCode}
//                   onChange={(e) => setVerificationCode(e.target.value)}
//                 />
//               </div>

//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="w-full bg-white text-purple-600 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
//                 type="submit"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <div className="flex justify-center items-center">
//                     <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
//                   </div>
//                 ) : (
//                   'Verify Email'
//                 )}
//               </motion.button>
//             </form>
//           )}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;

import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { assets } from '../assets/assets';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState(state === 'Sign Up' ? 'signup' : 'login');
  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AppContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!email || !password || (state === 'Sign Up' && !name)) {
      return toast.error('All fields are required');
    }

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          password,
          email,
        });
        data.success ? (toast.success('Verification email sent!'), setIsVerifying(true)) : toast.error(data.message);
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, { password, email });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          toast.success('Logged In Successfully!');
          navigate('/');
        } else toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/google-auth`, {
        tokenId: credentialResponse.credential,
      });
      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        toast.success('Google login successful!');
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Google login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => toast.error('Google login failed');

  const onVerifyHandler = async (event) => {
    event.preventDefault();
    if (!email || !verificationCode) return toast.error('Please enter email and verification code');

    try {
      const { data } = await axios.post(`${backendUrl}/api/user/verify-email`, { email, code: verificationCode });
      if (data.success) {
        toast.success('Email verified!');
        setIsVerifying(false);
        setState('Login');
        setView('login');
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => { token && navigate('/') }, [token, navigate]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const switchView = (newView) => {
    setView(newView);
    setState(newView === 'signup' ? 'Sign Up' : 'Login');
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>

      <div className="w-90 min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-green-900 to-green-800 relative overflow-hidden">
        <motion.div
          className="absolute w-80 h-80 bg-purple-300 rounded-full -top-40 -right-40 opacity-20 blur-xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-pink-300 rounded-full -bottom-40 -left-40 opacity-20 blur-xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />

        <motion.div
          className="glass-container bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden w-full max-w-md mx-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="p-8">
            <div className="flex justify-center mb-8">
              <motion.img
                src={assets.logo1}
                alt="Logo"
                className="w-32 cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
              />
            </div>

            {!isVerifying ? (
              <>
                <div className="flex justify-center mb-8">
                  <div className="bg-white bg-opacity-20 rounded-full p-1">
                    <button
                      className={`px-6 py-2 rounded-full transition-colors ${view === 'login' ? 'bg-white text-purple-600 shadow-md' : 'bg-transparent text-white'}`}
                      onClick={() => switchView('login')}
                    >
                      Login
                    </button>
                    <button
                      className={`px-6 py-2 rounded-full transition-colors ${view === 'signup' ? 'bg-white text-purple-600 shadow-md' : 'bg-transparent text-white'}`}
                      onClick={() => switchView('signup')}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>

                <AnimatePresence mode='wait'>
                  <motion.div
                    key={view}
                    initial={{ opacity: 0, x: view === 'login' ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: view === 'login' ? 50 : -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <form onSubmit={onSubmitHandler} className="space-y-6">
                      {view === 'signup' && (
                        <div className="relative">
                          <input
                            type="text"
                            className="w-full px-4 py-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg border border-white border-opacity-20 focus:border-opacity-40 focus:outline-none text-white placeholder-white placeholder-opacity-60"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      )}

                      <div className="relative">
                        <input
                          type="email"
                          className="w-full px-4 py-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg border border-white border-opacity-20 focus:border-opacity-40 focus:outline-none text-white placeholder-white placeholder-opacity-60"
                          placeholder="Email Address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="relative">
                        <input
                          type="password"
                          className="w-full px-4 py-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg border border-white border-opacity-20 focus:border-opacity-40 focus:outline-none text-white placeholder-white placeholder-opacity-60"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-white text-purple-600 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex justify-center items-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                          </div>
                        ) : view === 'login' ? 'Login' : 'Create Account'}
                      </motion.button>
                    </form>

                    <div className="mt-6 text-center">
                      <p className="text-white text-opacity-80">
                        {view === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
                        <button
                          className="text-white font-semibold underline hover:text-opacity-80 transition-opacity"
                          onClick={() => switchView(view === 'login' ? 'signup' : 'login')}
                        >
                          {view === 'login' ? 'Sign Up' : 'Login'}
                        </button>
                      </p>
                    </div>

                    <div className="mt-8">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-white border-opacity-20"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-transparent text-white text-opacity-60">Or continue with</span>
                        </div>
                      </div>
                      <div className="mt-6 flex justify-center space-x-4">
                        <GoogleLogin
                          onSuccess={handleGoogleSuccess}
                          onError={handleGoogleError}
                          useOneTap
                          theme="filled_blue"
                          shape="circle"
                          text="continue_with"
                          size="medium"
                          logo_alignment="left"
                        />
                        <button className="p-3 border rounded-full hover:bg-gray-200 flex items-center justify-center">
                          <FaFacebook size={24} />
                        </button>
                        <button className="p-3 border rounded-full hover:bg-gray-200 flex items-center justify-center">
                          <FaTwitter size={24} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </>
            ) : (
              <form onSubmit={onVerifyHandler} className="space-y-6">
                <div className="relative">
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg border border-white border-opacity-20 focus:border-opacity-40 focus:outline-none text-white placeholder-white placeholder-opacity-60"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg border border-white border-opacity-20 focus:border-opacity-40 focus:outline-none text-white placeholder-white placeholder-opacity-60"
                    placeholder="Verification Code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white text-purple-600 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                    </div>
                  ) : 'Verify Email'}
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;