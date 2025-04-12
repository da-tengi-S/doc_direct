// import express from 'express'
// import cors from 'cors'
// import http from "http";
// import 'dotenv/config'
// import addminRouter from './routes/adminRoute.js'
// import conntDB from './config/Mangodb.js'
// import connectClodinary from './config/cloudinary.js'
// import healthRoute from './routes/healthRoute.js';
// import userRouter from './routes/userRoute.js'
// import { loginUser } from './controllers/usercontroller.js'
// import formRouter from './routes/fromRoute.js'
// import doctorRouter from './routes/doctorRoute.js'
// import paymentRoute from './routes/paymentRoute.js'


// const app = express();
// const port = process.env.PORT || 4000;

// // Connect to database
// conntDB();
// connectClodinary();



// // Middleware
// app.use(express.json());
// app.use(cors());


// app.use('/api/admin', addminRouter)

// // API endpoints
// app.use('/api/user', userRouter);
// app.use('/api/form', formRouter);
// app.use('/api/doctor', doctorRouter)
// // Base endpoint
// app.get('/', (req, res) => {
//   res.send('API is working gg!');
// });

// // Start server
// app.listen(port, () => console.log(`Server started on port ${port}`));


import express from 'express'
import cors from 'cors'
import http from "http";
import { Server } from "socket.io";
import 'dotenv/config'

import { v4 as uuidv4 } from 'uuid';


import addminRouter from './routes/adminRoute.js'
import conntDB from './config/Mangodb.js'
import connectClodinary from './config/cloudinary.js'
import healthRoute from './routes/healthRoute.js';
import userRouter from './routes/userRoute.js'
import { loginUser } from './controllers/usercontroller.js'
import formRouter from './routes/fromRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import paymentRoute from './routes/paymentRoute.js'
import notificationRoutes from './routes/notificationRoutes.js';

const app = express();
const port = process.env.PORT || 4000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Connect to database
conntDB();
connectClodinary();

// Middleware
app.use(express.json());
app.use(cors());

// Generate Room ID endpoint
app.post('/api/create-room', (req, res) => {
  const roomId = uuidv4();
  res.json({ roomId });
});

// Existing routes
app.use('/api/admin', addminRouter)
app.use('/api/user', userRouter);
app.use('/api/form', formRouter);

app.use("/api/notifications", notificationRoutes);

app.use('/api/patient', userRouter);

app.use('/api/doctor', doctorRouter)
app.get('/', (req, res) => {
  res.send('API is working gg!');
});

// WebSocket Signaling
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-connected', userId);
    
    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-disconnected', userId);
    });
  });

  socket.on('signal', (data) => {
    io.to(data.room).emit('signal', data);
  });
});

server.listen(port, () => console.log(`Server started on port ${port}`));


// import express from 'express'
// import cors from 'cors'
// import http from "http";
// import { Server } from "socket.io";
// import 'dotenv/config'

// import { v4 as uuidv4 } from 'uuid';

// import addminRouter from './routes/adminRoute.js'
// import conntDB from './config/Mangodb.js'
// import connectClodinary from './config/cloudinary.js'
// import healthRoute from './routes/healthRoute.js';
// import userRouter from './routes/userRoute.js'
// import { loginUser } from './controllers/usercontroller.js'
// import formRouter from './routes/fromRoute.js'
// import doctorRouter from './routes/doctorRoute.js'
// import paymentRoute from './routes/paymentRoute.js'
// import videoRouter from './routes/videoRoute.js';

// const app = express();
// const port = process.env.PORT || 4000;

// // Database connections
// conntDB();
// connectClodinary();

// // Middleware
// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:3000',
//   credentials: true
// }));
// app.use(express.json());

// // Routes
// app.use('/api/admin', addminRouter);
// app.use('/api/user', userRouter);
// app.use('/api/form', formRouter);
// app.use('/api/doctor', doctorRouter);
// app.use('/api/video', videoRouter);
// app.use('/api/payment', paymentRoute);
// app.use('/health', healthRoute);

// app.get('/', (req, res) => {
//   res.send('API is running successfully');
// });

// // WebSocket Server Setup
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: process.env.FRONTEND_URL || 'http://localhost:3000',
//     methods: ['GET', 'POST'],
//     credentials: true
//   }
// });

// // Room Management
// const activeRooms = new Map();

// io.on('connection', (socket) => {
//   console.log(`User connected: ${socket.id}`);

//   // Room joining handler
//   socket.on('join-room', (roomId, userId) => {
//     if (!validateRoomId(roomId)) {
//       socket.emit('error', 'Invalid room ID format');
//       return;
//     }

//     socket.join(roomId);
//     updateRoomParticipants(roomId, userId, 'join');
    
//     // Notify others in the room
//     socket.to(roomId).emit('user-connected', userId);
    
//     // Send existing participants to new user
//     const participants = getRoomParticipants(roomId).filter(id => id !== userId);
//     socket.emit('existing-participants', participants);
//   });

// // WebRTC signaling handler
// socket.on('signal', ({ roomId, userId, signal }) => {
//   if (validateRoomId(roomId)) {
//     socket.to(roomId).emit('signal', { userId, signal });
//   }
// });

//   // Disconnection handler
//   socket.on('disconnect', () => {
//     activeRooms.forEach((participants, roomId) => {
//       if (participants.has(socket.id)) {
//         updateRoomParticipants(roomId, socket.id, 'leave');
//         socket.to(roomId).emit('user-disconnected', socket.id);
//       }
//     });
//   });

//   // Error handler
//   socket.on('error', (error) => {
//     console.error(`Socket error: ${error}`);
//     socket.emit('error', 'Connection error occurred');
//   });
// });

// // Helper functions
// function validateRoomId(roomId) {
//   return typeof roomId === 'string' && /^[\w-]{36}$/.test(roomId);
// }

// function updateRoomParticipants(roomId, userId, action) {
//   if (!activeRooms.has(roomId)) {
//     activeRooms.set(roomId, new Set());
//   }
//   const participants = activeRooms.get(roomId);
//   action === 'join' ? participants.add(userId) : participants.delete(userId);
  
//   if (participants.size === 0) {
//     activeRooms.delete(roomId);
//   }
// }

// function getRoomParticipants(roomId) {
//   return activeRooms.has(roomId) 
//     ? Array.from(activeRooms.get(roomId)) 
//     : [];
// }

// // Start server
// server.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });