// import { createContext, useContext, useEffect, useRef, useState } from 'react';
// import { io } from 'socket.io-client';
// import Peer from 'simple-peer';

// const VideoContext = createContext();
// const socket = io(process.env.REACT_APP_API_URL);

// export const VideoProvider = ({ children }) => {
//   const [doctorStream, setDoctorStream] = useState(null);
//   const [myStream, setMyStream] = useState(null);
//   const [roomId, setRoomId] = useState(null);
//   const peerRef = useRef();

//   useEffect(() => {
//     const initMedia = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//         setMyStream(stream);
//       } catch (error) {
//         console.error('Error accessing media devices:', error);
//       }
//     };
//     initMedia();
//   }, []);

//   // Join existing room
//   const joinRoom = (roomId) => {
//     setRoomId(roomId);
//     socket.emit('join-room', roomId);

//     socket.on('doctor-call', ({ signal }) => {
//       const peer = new Peer({ initiator: false, stream: myStream });
      
//       peer.on('signal', (answerSignal) => {
//         socket.emit('call-accepted', { roomId, signal: answerSignal });
//       });

//       peer.on('stream', (remoteStream) => {
//         setDoctorStream(remoteStream);
//       });

//       peer.signal(signal);
//       peerRef.current = peer;
//     });

//     socket.on('end-call', () => {
//       if (peerRef.current) peerRef.current.destroy();
//       setDoctorStream(null);
//     });
//   };

//   return (
//     <VideoContext.Provider value={{ 
//       joinRoom, 
//       doctorStream, 
//       myStream, 
//       roomId 
//     }}>
//       {children}
//     </VideoContext.Provider>
//   );
// };

// export const useVideo = () => useContext(VideoContext);

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const VideoContext = createContext();
const socket = io(import.meta.env.VITE_BACKEND_URL, {
  transports: ['websocket'] // Explicitly use WebSocket transport
});

export const VideoProvider = ({ children }) => {
  const [doctorStream, setDoctorStream] = useState(null);
  const [myStream, setMyStream] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const peerRef = useRef();

  useEffect(() => {
    const initMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        setMyStream(stream);
      } catch (error) {
        console.error('Error accessing media devices:', error);
        // Handle error state if needed
      }
    };
    initMedia();
  }, []);

  // Join existing room
  const joinRoom = (roomId) => {
    setRoomId(roomId);
    socket.emit('join-room', roomId);

    socket.on('doctor-call', ({ signal }) => {
      const peer = new Peer({ 
        initiator: false, 
        stream: myStream,
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' } // Add STUN server
          ]
        }
      });
      
      peer.on('signal', (answerSignal) => {
        socket.emit('call-accepted', { 
          roomId, 
          signal: answerSignal 
        });
      });

      peer.on('stream', (remoteStream) => {
        setDoctorStream(remoteStream);
      });

      peer.on('error', (err) => {
        console.error('Peer connection error:', err);
      });

      peer.signal(signal);
      peerRef.current = peer;
    });

    socket.on('end-call', () => {
      if (peerRef.current) {
        peerRef.current.destroy();
      }
      setDoctorStream(null);
    });

    // Cleanup on unmount
    return () => {
      socket.off('doctor-call');
      socket.off('end-call');
    };
  };

  return (
    <VideoContext.Provider value={{ 
      joinRoom, 
      doctorStream, 
      myStream, 
      roomId 
    }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => useContext(VideoContext);