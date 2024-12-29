import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  issue: { type: String, required: true },
  message: { type: String, required: true },
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

const formModel = mongoose.models.form || mongoose.model('form', formSchema);

export default formModel;
