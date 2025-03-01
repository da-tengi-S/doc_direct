import mongoose from 'mongoose';

const medicalRecordSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  year: {type: String,required: true,},
  
  medicine: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  chronicIllnesses: {
    type: String,
  },
  pastSurgeries: {
    type: String,
  },
  vaccinations: {
    type: String,
  },
  labResults: {
    type: String,
  },
  doctor: {
    type: String,
    required: true,
  },
  image: { type: String },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
});

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);

export default MedicalRecord;
