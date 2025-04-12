// import { useEffect, useRef, useState } from 'react';
// import { useVideo } from '../context/VideoContext';

// const DoctorVideoCall = () => {
//   const { createRoom, startCall, myStream, patientStream, endCall } = useVideo();
//   const myVideoRef = useRef();
//   const patientVideoRef = useRef();
//   const [patientId, setPatientId] = useState('');

//   useEffect(() => {
//     if (myStream) myVideoRef.current.srcObject = myStream;
//   }, [myStream]);

//   useEffect(() => {
//     if (patientStream) patientVideoRef.current.srcObject = patientStream;
//   }, [patientStream]);

//   const handleStartCall = async () => {
//     const roomId = await createRoom();
//     startCall(patientId); // Patient ID from appointment data
//   };

//   return (
//     <div className="call-container">
//       <div className="video-grid">
//         <video muted ref={myVideoRef} autoPlay playsInline />
//         {patientStream && <video ref={patientVideoRef} autoPlay playsInline />}
//       </div>
      
//       <div className="call-controls">
//         <button onClick={handleStartCall}>Start Call</button>
//         <button onClick={endCall}>End Call</button>
//         <input
//           type="text"
//           value={patientId}
//           onChange={(e) => setPatientId(e.target.value)}
//           placeholder="Enter Patient ID"
//         />
//       </div>
//     </div>
//   );
// };

// export default DoctorVideoCall