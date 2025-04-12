import { useEffect, useRef } from 'react';
import { useVideo } from '../context/videoContext';
import { useParams } from 'react-router-dom';

const PatientVideoCall = () => {
  const { joinRoom, myStream, doctorStream } = useVideo();
  const { roomId } = useParams();
  const myVideoRef = useRef();
  const doctorVideoRef = useRef();

  useEffect(() => {
    if (roomId) joinRoom(roomId);
  }, [roomId]);

  useEffect(() => {
    if (myStream) myVideoRef.current.srcObject = myStream;
  }, [myStream]);

  useEffect(() => {
    if (doctorStream) doctorVideoRef.current.srcObject = doctorStream;
  }, [doctorStream]);

  return (
    <div className="call-container">
      <div className="video-grid">
        <video muted ref={myVideoRef} autoPlay playsInline />
        {doctorStream && <video ref={doctorVideoRef} autoPlay playsInline />}
      </div>
    </div>
  );
};
export default PatientVideoCall