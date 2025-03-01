import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import addminRouter from './routes/adminRoute.js'
import conntDB from './config/Mangodb.js'
import connectClodinary from './config/cloudinary.js'
import healthRoute from './routes/healthRoute.js';
import userRouter from './routes/userRoute.js'
import { loginUser } from './controllers/usercontroller.js'
import formRouter from './routes/fromRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import paymentRoute from './routes/paymentRoute.js'


const app = express();
const port = process.env.PORT || 4000;

// Connect to database
conntDB();
connectClodinary();


// Middleware
app.use(express.json());
app.use(cors());

// for health tips api
// app.use('/api/health', healthRoute); // Health tips route
// app.use("/api/payment", paymentRoute);  // <--- Added payment route

app.use('/api/admin', addminRouter)

// API endpoints
app.use('/api/user', userRouter);
app.use('/api/form', formRouter);
app.use('/api/doctor', doctorRouter)
// Base endpoint
app.get('/', (req, res) => {
  res.send('API is working gg!');
});

// Start server
app.listen(port, () => console.log(`Server started on port ${port}`));