

import mongoose from 'mongoose';

const accessRequestSchema = new mongoose.Schema({
 
  doctorId: { type: String, required: true },
  patientId: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const AccessRequest = mongoose.model('AccessRequest', accessRequestSchema);

export default AccessRequest;

