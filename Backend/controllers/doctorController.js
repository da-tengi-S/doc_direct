
// import doctorModel from "../models/doctorModels.js"
// import bcrypt from 'bcrypt'
// import jwt from "jsonwebtoken"

// const registerDoctor = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
    
//     const existingDoctor = await doctorModel.findOne({ email });
//     if (existingDoctor) {
//       return res.json({ success: false, message: "Email already registered" });
//     }
    
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newDoctor = new doctorModel({
//       name,
//       email,
//       password: hashedPassword,
//       available: true,
//     });

//     await newDoctor.save();
//     const token = jwt.sign({ id: newDoctor._id }, process.env.JWT_SECRET);
//     res.json({ success: true, token });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };


// const changeAvaibality = async (req , res)=> {
//     try {
//         const {docId} = req.body
//         const docData = await doctorModel.findById(docId)
//         await doctorModel.findByIdAndUpdate(docId,{available : !docData.available})
//         res.json({success:true, message:'Availablity changed  '})
//     } catch (error) {
//         console.log(error)
//         res.json({success:false, message:error.message})
//     }


// }

// const doctorList = async (req, res) => {
//     try {
//       const doctors = await doctorModel.find({}).select(['-password', '-email']);
//       res.json({ success: true, doctors }); // Ensure key matches frontend expectation
//     } catch (error) {
//       console.log(error);
//       res.json({ success: false, message: error.message });
//     }
//   };

//   const loginDoctor = async (req, res) =>{
//     try {
//       const {email, password} = req.body
//       const doctor = await doctorModel.findOne({email})
//       if(!doctor){
//         return res.json({success:false, message:'Invalid input'})
//       }

//       const isMatch = await bcrypt.compare(password, doctor.password )
//       if(isMatch){
//         const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET )

//         res.json({success:true, token})
//       }
//       else{
//         res.json({success:false, message:'invalid input'})
//       }

//     } catch (error) {
//       console.log(error);
//       res.json({ success: false, message: error.message });
//     }
//   }


  
// export {changeAvaibality, doctorList, loginDoctor, registerDoctor}

import doctorModel from "../models/doctorModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register a new doctor
const registerDoctor = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if email already exists
    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newDoctor = new doctorModel({
      name,
      email,
      password: hashedPassword,
      available: true,
    });

    await newDoctor.save();

    // Generate JWT token
    const token = jwt.sign({ id: newDoctor._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ success: true, token, doctorId: newDoctor._id, name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

// Doctor login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ success: true, token, doctorId: doctor._id, name: doctor.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

// Get all doctors
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

// Fetch a single doctor's details
const getDoctorProfile = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const doctor = await doctorModel.findById(doctorId).select("-password");
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    res.status(200).json({ success: true, doctor });
  } catch (error) {
    console.error("Error fetching doctor profile:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};


// Update doctor's details (excluding password)
const updateDoctorProfile = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { name, email, available, experience, fees, about, speciality, degree, address } = req.body;

    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    // Update only provided fields
    if (name) doctor.name = name;
    if (email) doctor.email = email;
    if (available !== undefined) doctor.available = available;
    if (experience) doctor.experience = experience;
    if (fees) doctor.fees = fees;
    if (about) doctor.about = about;
    if (speciality) doctor.speciality = speciality;
    if (degree) doctor.degree = degree;
    if (address) doctor.address = address;

    await doctor.save();

    res.status(200).json({ success: true, message: "Doctor profile updated successfully", doctor });
  } catch (error) {
    console.error("Error updating doctor profile:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};


const changeAvaibality = async (req , res)=> {
  try {
      const {docId} = req.body
      const docData = await doctorModel.findById(docId)
      await doctorModel.findByIdAndUpdate(docId,{available : !docData.available})
      res.json({success:true, message:'Availablity changed  '})
  } catch (error) {
      console.log(error)
      res.json({success:false, message:error.message})
  }
}

// // Change doctor's availability
// const changeAvailability = async (req, res) => {
//   try {
//     const { docId } = req.body;

//     const doctor = await doctorModel.findById(docId);
//     if (!doctor) {
//       return res.status(404).json({ success: false, message: "Doctor not found" });
//     }

//     // Toggle availability
//     doctor.available = !doctor.available;
//     await doctor.save();

//     res.status(200).json({ success: true, message: "Availability updated", available: doctor.available });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server error. Please try again later." });
//   }
// };

export { registerDoctor, loginDoctor, doctorList, getDoctorProfile, updateDoctorProfile, changeAvaibality };
