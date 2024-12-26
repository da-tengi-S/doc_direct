import express from 'express'

import { ragisterUser,loginUser } from '../controllers/usercontroller.js'

const userRouter = express.Router()


userRouter.post('/register', ragisterUser);
userRouter.post('/login', loginUser);

export default userRouter