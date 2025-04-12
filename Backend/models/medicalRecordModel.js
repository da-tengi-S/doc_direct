// import mongoose from 'mongoose';

// const medicalRecordSchema = new mongoose.Schema({
//   userId: { type: String, required: true },
//   year: {type: String,required: true,},
  
//   medicine: {
//     type: String,
//     required: true,
//   },
//   notes: {
//     type: String,
//   },
//   chronicIllnesses: {
//     type: String,
//   },
//   pastSurgeries: {
//     type: String,
//   },
//   vaccinations: {
//     type: String,
//   },
//   labResults: {
//     type: String,
//   },
//   doctor: {
//     type: String,
//     required: true,
//   },
//   image: { type: String },
 
// });

// const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);

// export default MedicalRecord;


import mongoose from 'mongoose';

const medicalRecordSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  year: { type: String, required: true },
  medicine: { type: String, required: true },
  notes: { type: String },
  chronicIllnesses: { type: String },
  pastSurgeries: { type: String },
  vaccinations: { type: String },
  labResults: { type: String },
  doctor: { type: String, required: true },
  image: { type: String },
  accessList: [{
    doctorId: { type: String, required: true },
    status: { 
      type: String, 
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending'
    },
    requestedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date }
  }]
});


const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);

export default MedicalRecord;




// import mongoose from 'mongoose';

// const medicalRecordSchema = new mongoose.Schema({
//   userId: { type: String, required: true },
//   year: { type: String, required: true },
//   medicine: { type: String, required: true },
//   notes: { type: String },
//   chronicIllnesses: { type: String },
//   pastSurgeries: { type: String },
//   vaccinations: { type: String },
//   labResults: { type: String },
//   doctor: { 
//     id: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: false }, // Make doctor id optional
//     name: { type: String, required: true } // doctor's name is still required
//   },
//   image: { type: String },
//   accessList: [{
//     doctorId: { type: String, required: true },
//     status: { 
//       type: String, 
//       enum: ['pending', 'accepted', 'rejected'],
//       default: 'pending'
//     },
//     requestedAt: { type: Date, default: Date.now },
//     expiresAt: { type: Date }
//   }]
// });

// const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);

// export default MedicalRecord;
