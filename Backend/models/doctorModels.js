

// import mongoose from "mongoose";

// const ratingSchema = new mongoose.Schema({
//     patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
//     rating: { type: Number, required: true, min: 1, max: 5 }, 
//     comment: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now },
// });

// const doctorSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true }, 
//     password: { type: String, required: true },
//     image: { type: String, default: "" }, 
//     speciality: { type: String, default: "" }, 
//     degree: { type: String, default: "" }, 
//     phone : {type: String, default: ""},
//     experience: { type: String, default: "" }, 
//     about: { type: String, default: "" }, 
//     available: { type: Boolean, default: false }, 
//     fees: { type: Number, default: 0 }, 
//     address: { type: Object, default: {} }, 
//     date: { type: Number, default: Date.now() }, 
//     verified:{ type: Boolean, default: false },
//     slots_booked: { type: Object, default: {} }, 
//     ratings: [ratingSchema], 

// }, { minimize: false });

// const doctorModel = mongoose.models.doctor || mongoose.model("doctor", doctorSchema);

// export default doctorModel;


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
   
    image: { type: String, default: "" }, 
    speciality: { type: String, default: "" }, 
    degree: { type: String, default: "" }, 
    phone: { type: String, default: "" },
    experience: { type: String, default: "" }, 
    about: { type: String, default: "" }, 
    available: { type: Boolean, default: false }, 
    fees: { type: Number, default: 0 }, 
    address: { type: Object, default: {} }, 
    date: { type: Number, default: Date.now() }, 
    verified: { type: Boolean, default: false },
    slots_booked: { type: Object, default: {} }, 
    ratings: [ratingSchema], 
    document: [{ type: String, default: [] }]  
}, { minimize: false });

const doctorModel = mongoose.models.doctor || mongoose.model("doctor", doctorSchema);

export default doctorModel;
