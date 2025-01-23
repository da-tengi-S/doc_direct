

// import express from 'express'

// import { ragisterUser,loginUser, getProfile, updateProfile } from '../controllers/usercontroller.js'
// import authUser from '../middleware/authUser.js';
// import upload  from '../middleware/multer.js';

// const userRouter = express.Router()


// userRouter.post('/register', ragisterUser);
// userRouter.post('/login', loginUser);



// //for profile 
// userRouter.get('/get-profile', authUser, getProfile)
// userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile)

// export default userRouter


import express from 'express'

import { ragisterUser,loginUser, getProfile, updateProfile , bookappointment, listAppoitmnet, cancelAppoitment} from '../controllers/usercontroller.js'
import authUser from '../middleware/authuser.js';
import upload from '../middleware/multer.js';

const userRouter = express.Router()


userRouter.post('/register', ragisterUser);
userRouter.post('/login', loginUser);
userRouter.post('/book-appoitment', authUser, bookappointment)



//for profile 
userRouter.get('/get-profile', authUser, getProfile)
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile)
userRouter.get('/appointment', authUser,listAppoitmnet)
userRouter.post('/cancel-appoitment', authUser, cancelAppoitment)

export default userRouter