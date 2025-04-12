// models/notificationModel.js
import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  userType: { type: String, enum: ['Doctor', 'Patient', 'Admin'], required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const notificationModel = mongoose.models.Notification || mongoose.model("Notification", notificationSchema);

export default notificationModel;
