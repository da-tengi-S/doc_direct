import express from 'express'
import { doctorList, loginDoctor, registerDoctor, getDoctorProfile , updateDoctorProfile} from '../controllers/doctorController.js'
const doctorRouter = express.Router()

doctorRouter.get('/list', doctorList)
doctorRouter.post('/login', loginDoctor)

doctorRouter.post("/register", registerDoctor);

doctorRouter.get("/get", getDoctorProfile);
doctorRouter.post("/update", updateDoctorProfile);



export default doctorRouter