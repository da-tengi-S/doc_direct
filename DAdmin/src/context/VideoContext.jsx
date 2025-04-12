// // import { createContext, useContext, useEffect, useRef, useState } from 'react';
// // import { io } from 'socket.io-client';
// // import Peer from 'simple-peer';
// // import axios from 'axios';

// // const VideoContext = createContext();
// // const socket = io(import.meta.env.VITE_WS_URL, {
// //   transports: ['websocket'],
// //   withCredentials: true
// // });

// // export const VideoProvider = ({ children }) => {
// //   const [roomId, setRoomId] = useState(null);
// //   const [isCallActive, setIsCallActive] = useState(false);
// //   const [patientStream, setPatientStream] = useState(null);
// //   const [myStream, setMyStream] = useState(null);
// //   const peerRef = useRef();

// //   // Initialize doctor's media
// //   useEffect(() => {
// //     const initMedia = async () => {
// //       try {
// //         const stream = await navigator.mediaDevices.getUserMedia({ 
// //           video: true, 
// //           audio: true 
// //         });
// //         setMyStream(stream);
// //       } catch (error) {
// //         console.error('Error accessing media devices:', error);
// //       }
// //     };
    
// //     initMedia();
    
// //     return () => {
// //       if (myStream) {
// //         myStream.getTracks().forEach(track => track.stop());
// //       }
// //     };
// //   }, []);

// //   // Create new room
// //   const createRoom = async () => {
// //     try {
// //       const response = await axios.post(
// //         `${import.meta.env.VITE_BACKEND_URL}/api/create-room`
// //       );
// //       setRoomId(response.data.roomId);
// //       return response.data.roomId;
// //     } catch (error) {
// //       console.error('Error creating room:', error);
// //       throw error;
// //     }
// //   };

// //   // Start call with patient
// //   const startCall = (patientId) => {
// //     const peer = new Peer({
// //       initiator: true,
// //       stream: myStream,
// //       config: {
// //         iceServers: [
// //           { urls: import.meta.env.VITE_STUN_SERVER || 'stun:stun.l.google.com:19302' }
// //         ]
// //       }
// //     });

// //     peer.on('signal', (signal) => {
// //       socket.emit('doctor-call', { 
// //         patientId, 
// //         signal, 
// //         roomId 
// //       });
// //     });

// //     peer.on('stream', (remoteStream) => {
// //       setPatientStream(remoteStream);
// //     });

// //     peer.on('error', (error) => {
// //       console.error('Peer connection error:', error);
// //     });

// //     socket.on('call-accepted', (signal) => {
// //       setIsCallActive(true);
// //       peer.signal(signal);
// //     });

// //     peerRef.current = peer;
// //   };

// //   // End call
// //   const endCall = () => {
// //     if (peerRef.current) {
// //       peerRef.current.destroy();
// //     }
// //     setPatientStream(null);
// //     setIsCallActive(false);
// //     socket.emit('end-call', roomId);
// //   };

// //   // Cleanup socket listeners
// //   useEffect(() => {
// //     return () => {
// //       socket.off('call-accepted');
// //     };
// //   }, []);

// //   return (
// //     <VideoContext.Provider value={{ 
// //       createRoom, 
// //       startCall, 
// //       endCall, 
// //       myStream, 
// //       patientStream, 
// //       isCallActive,
// //       roomId
// //     }}>
// //       {children}
// //     </VideoContext.Provider>
// //   );
// // };

// // export const useVideo = () => useContext(VideoContext);

// import { createContext, useContext, useEffect, useRef, useState } from 'react';
// import { io } from 'socket.io-client';
// import Peer from 'simple-peer';
// import axios from 'axios';

// const VideoContext = createContext();
// const socket = io(import.meta.env.VITE_WS_URL, {
//   transports: ['websocket']
// });

// export const VideoProvider = ({ children }) => {
//   const [roomId, setRoomId] = useState(null);
//   const [isCallActive, setIsCallActive] = useState(false);
//   const [patientStream, setPatientStream] = useState(null);
//   const [myStream, setMyStream] = useState(null);
//   const peerRef = useRef(null);

//   // Initialize doctor's media with proper cleanup
//   useEffect(() => {
//     let stream = null;
    
//     const initMedia = async () => {
//       try {
//         stream = await navigator.mediaDevices.getUserMedia({ 
//           video: true, 
//           audio: true 
//         });
//         setMyStream(stream);
//       } catch (error) {
//         console.error('Error accessing media devices:', error);
//       }
//     };

//     initMedia();

//     return () => {
//       if (stream) {
//         stream.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, []);

//   // Create new room with error handling
//   const createRoom = async () => {
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/create-room`
//       );
//       setRoomId(response.data.roomId);
//       return response.data.roomId;
//     } catch (error) {
//       console.error('Room creation failed:', error);
//       throw error;
//     }
//   };

//   // Modified startCall with safety checks
//   const startCall = (patientId) => {
//     if (!myStream) {
//       console.error('Local media stream not available');
//       return;
//     }

//     try {
//       const peer = new Peer({
//         initiator: true,
//         stream: myStream,
//         config: {
//           iceServers: [
//             { urls: import.meta.env.VITE_STUN_SERVER }
//           ]
//         }
//       });

//       peer.on('signal', (signal) => {
//         socket.emit('doctor-call', { 
//           patientId, 
//           signal, 
//           roomId 
//         });
//       });

//       peer.on('stream', (remoteStream) => {
//         setPatientStream(remoteStream);
//       });

//       peer.on('error', (error) => {
//         console.error('Peer connection error:', error);
//       });

//       socket.on('call-accepted', (signal) => {
//         setIsCallActive(true);
//         peer.signal(signal);
//       });

//       peerRef.current = peer;

//     } catch (error) {
//       console.error('Peer initialization failed:', error);
//     }
//   };

//   // End call with cleanup
//   const endCall = () => {
//     if (peerRef.current) {
//       peerRef.current.destroy();
//       peerRef.current = null;
//     }
//     setPatientStream(null);
//     setIsCallActive(false);
//     socket.emit('end-call', roomId);
//   };

//   // Cleanup socket listeners
//   useEffect(() => {
//     return () => {
//       socket.off('call-accepted');
//       if (peerRef.current) {
//         peerRef.current.destroy();
//       }
//     };
//   }, []);

//   return (
//     <VideoContext.Provider value={{ 
//       createRoom, 
//       startCall, 
//       endCall, 
//       myStream, 
//       patientStream, 
//       isCallActive,
//       roomId
//     }}>
//       {children}
//     </VideoContext.Provider>
//   );
// };

// export const useVideo = () => useContext(VideoContext);