import express from 'express'
import { doctorList, loginDoctor, registerDoctor, getDoctorProfile , updateDoctorProfile} from '../controllers/doctorController.js'
import authDoctor from '../middleware/authDoctor.js'
import upload from '../middleware/multer.js'
const doctorRouter = express.Router()

doctorRouter.get('/list', doctorList)
doctorRouter.post('/login', loginDoctor)

doctorRouter.post("/register", registerDoctor);
// doctorRouter.get("/get/:doctorId", authDoctor, getDoctorProfile);
doctorRouter.get("/get-doc", authDoctor, getDoctorProfile);

// doctorRouter.put("/update/:doctorId", upload.single('image'), authDoctor, updateDoctorProfile);

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