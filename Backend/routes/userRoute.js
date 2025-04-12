

import express from 'express'
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import googleAuth from '../controllers/authController.js';


import { ragisterUser,loginUser, getProfile, updateProfile , bookappointment, listAppoitmnet,getAccessRequests, respondToRequest, cancelAppoitment, addMedicalRecord, fetchMedicalRecordsByUser, addRatingAndComment, verifyEmail} from '../controllers/usercontroller.js'
import authUser from '../middleware/authUser.js';
import upload from '../middleware/multer.js';

const userRouter = express.Router()


userRouter.post('/register', ragisterUser);
userRouter.post('/login', loginUser);
userRouter.post("/verify-email", verifyEmail);
userRouter.post('/google-auth', googleAuth);

//for profile 
userRouter.get('/get-profile', authUser, getProfile)
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile)
userRouter.get('/appointment', authUser,listAppoitmnet)
userRouter.post('/cancel-appoitment', authUser, cancelAppoitment)
userRouter.post('/book-appoitment', authUser, bookappointment)

// userRouter.put('/respond-access/:requestId', authUser, respondToAccessRequest);
// userRouter.get('/pending-requests', authUser, getPendingRequests);

userRouter.post('/view-access-requests',authUser, getAccessRequests);
userRouter.put('/respond-access-request/:requestId', authUser, respondToRequest);



//for adding the health record 
userRouter.post('/add-medRecord', upload.single('file'), authUser, addMedicalRecord);
userRouter.get("/medical-records", authUser, fetchMedicalRecordsByUser);


//for adding rating and comment
userRouter.post('/doctors/:doctorId/rate', authUser, addRatingAndComment);


export default userRouter