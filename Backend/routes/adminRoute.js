import express from 'express';
import { addDoctor, alldoctors, loginAdmin, appoemntSAdmin, appoitmnetCancel, adminDashboard , varifydoctor} from '../controllers/adminController.js';
import upload from '../middleware/multer.js';
import authAdmin from '../middleware/authAdmin.js';
import { changeAvaibality } from '../controllers/doctorController.js';
import authDoctor from '../middleware/authDoctor.js';

const adminRouter = express.Router();

// adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
adminRouter.post('/add-doctor', authDoctor, upload.single('image'), addDoctor);
adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-doctors',authAdmin, alldoctors)
adminRouter.post('/change-availablity',authAdmin, changeAvaibality)
adminRouter.get('/appointments', authAdmin, appoemntSAdmin)
adminRouter.post('/cancelAppoitmnet', authAdmin, appoitmnetCancel)
adminRouter.post('/varify',authAdmin, varifydoctor)



adminRouter.get('/dashboard', authAdmin, adminDashboard)

export default adminRouter;