import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import conntDB from './config/Mangodb.js'
import connectClodinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import { loginUser } from './controllers/usercontroller.js'
import formRouter from './routes/fromRoute.js'


const app = express();
const port = process.env.PORT || 4000;

// Connect to database
conntDB();
connectClodinary();

// Middleware
app.use(express.json());
app.use(cors());

// API endpoints
app.use('/api/user', userRouter);
app.use('/api/form', formRouter);

// Base endpoint
app.get('/', (req, res) => {
  res.send('API is working!');
});

// Start server
app.listen(port, () => console.log(`Server started on port ${port}`));