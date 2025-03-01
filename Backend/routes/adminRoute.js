import express from 'express';
import { addDoctor, alldoctors, loginAdmin, appoemntSAdmin, appoitmnetCancel, adminDashboard } from '../controllers/adminController.js';
import upload from '../middleware/multer.js';
import authAdmin from '../middleware/authAdmin.js';
import { changeAvaibality } from '../controllers/doctorController.js';

const adminRouter = express.Router();

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-doctors',authAdmin, alldoctors)
adminRouter.post('/change-availablity',authAdmin, changeAvaibality)
adminRouter.get('/appointments', authAdmin, appoemntSAdmin)
adminRouter.post('/cancelAppoitmnet', authAdmin, appoitmnetCancel)

adminRouter.get('/dashboard', authAdmin, adminDashboard)

export default adminRouter;