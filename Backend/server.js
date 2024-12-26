import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import conntDB from './config/Mangodb.js'
import connectClodinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import { loginUser } from './controllers/usercontroller.js'

const app = express()
const port = process.env.PORT || 4000
conntDB()
connectClodinary()

//middleware 
app.use(express.json())
app.use(cors());

// api endpoints
app.use('/api/user', userRouter);


app.get('/' , (req, res)=>{
    res.send("api gg working")

})

app.listen(port, ()=> console.log("server started", port))