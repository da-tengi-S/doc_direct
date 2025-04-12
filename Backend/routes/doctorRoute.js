import express from 'express'
import { doctorList, loginDoctor, registerDoctor, getDoctorProfile , updateDoctorProfile,addMedicalRecordbyDoctor,  doctorappoitemnt,changeVideoCall,requestMedicalAccess , getAccessibleRecords,  appoitmentComplete, DcancelAppoitment, doctorDashbaord} from '../controllers/doctorController.js'
import authDoctor from '../middleware/authDoctor.js'
import upload from '../middleware/multer.js'
const doctorRouter = express.Router()

doctorRouter.get('/list', doctorList)
doctorRouter.post('/login', loginDoctor)

doctorRouter.post("/register", registerDoctor);
// doctorRouter.get("/get/:doctorId", authDoctor, getDoctorProfile);
doctorRouter.get("/get-doc", authDoctor, getDoctorProfile);

doctorRouter.get('/appointment', authDoctor, doctorappoitemnt);
doctorRouter.post('/completeAP', authDoctor, appoitmentComplete)
doctorRouter.post('/CancelAP', authDoctor, DcancelAppoitment)
doctorRouter.post('/chnageVideo', authDoctor, changeVideoCall)

doctorRouter.post('/add-DmedRecord', upload.single('file'), authDoctor, addMedicalRecordbyDoctor);
// doctorRouter.post('/add-DmedRecord', upload.single('file'), authDoctor, addMedicalRecordbyDoctor);


doctorRouter.post('/request-access', requestMedicalAccess);
doctorRouter.post('/view-records', getAccessibleRecords);


doctorRouter.get('/dashbaordData', authDoctor, doctorDashbaord)
doctorRouter.put(
    '/update/:doctorId',
    upload.fields([
      { name: 'profileImage', maxCount: 1 },
      { name: 'document', maxCount: 1 }
    ]),
    authDoctor,
    updateDoctorProfile
  );
  


export default doctorRouter