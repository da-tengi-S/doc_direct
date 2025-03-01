

import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 }, 
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true },
    image: { type: String, default: "" }, // Optional, default empty
    speciality: { type: String, default: "" }, 
    degree: { type: String, default: "" }, 
    experience: { type: String, default: "" }, 
    about: { type: String, default: "" }, 
    available: { type: Boolean, default: true }, 
    fees: { type: Number, default: 0 }, 
    address: { type: Object, default: {} }, 
    date: { type: Number, default: Date.now() }, 
    slots_booked: { type: Object, default: {} }, 
    ratings: [ratingSchema], 

}, { minimize: false });

const doctorModel = mongoose.models.doctor || mongoose.model("doctor", doctorSchema);

export default doctorModel;

