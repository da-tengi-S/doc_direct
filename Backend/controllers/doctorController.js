
import doctorModel from "../models/doctorModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { v2 as couldinary } from 'cloudinary'
import { v2 as cloudinary } from 'cloudinary'

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
      available: false,
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
// const doctorList = async (req, res) => {
//   try {
//     const doctors = await doctorModel.find({}).select(["-password", "-email"]);
//     res.status(200).json({ success: true, doctors });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server error. Please try again later." });
//   }
// };

// Get all verified doctors
const doctorList = async (req, res) => {
  try {
    // Fetch only verified doctors and exclude password and email fields
    const doctors = await doctorModel.find({ verified: true }).select(["-password", "-email"]);

    // If no verified doctors are found
    if (doctors.length === 0) {
      return res.status(404).json({ success: false, message: "No verified doctors found" });
    }

    res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};



const getDoctorProfile = async (req, res) => {
  try {
      const doctorId = req.user.id; // Get from middleware

      if (!doctorId) {
          return res.status(400).json({ success: false, message: "Doctor ID is required" });
      }

      const userDocData = await doctorModel.findById(doctorId).select('-password');

      if (!userDocData) {
          return res.status(404).json({ success: false, message: "User not found" });
      }

      res.json({ success: true, data: userDocData });
  } catch (error) {
      console.error("Error in getDoctorProfile:", error);
      res.status(500).json({ success: false, message: "An error occurred. Please try again later." });
  }
};



// controllers/doctorController.js
const updateDoctorProfile = async (req, res) => {
  try {
    const { doctorId } = req.params;
    if (!doctorId) {
      return res.status(400).json({ success: false, message: "Doctor ID is required" });
    }

    const updates = req.body;
    const files = req.files || {};

    let updateData = { ...updates };

    // Handle Profile Image Upload
    if (files.profileImage) {
      try {
        const profileUpload = await cloudinary.uploader.upload(files.profileImage[0].path, {
          resource_type: "image",
          folder: "doctor_profiles",
        });
        updateData.profileImage = profileUpload.secure_url;
      } catch (err) {
        console.error("Profile image upload error:", err);
        return res.status(500).json({ 
          success: false, 
          message: "Profile image upload failed: " + err.message 
        });
      }
    }

    // Handle Document Upload
    if (files.document) {
      try {
        const docUpload = await cloudinary.uploader.upload(files.document[0].path, {
          resource_type: "auto",
          folder: "doctor_documents",
        });
        updateData.document = {
          url: docUpload.secure_url,
          publicId: docUpload.public_id
        };
      } catch (err) {
        console.error("Document upload error:", err);
        return res.status(500).json({ 
          success: false, 
          message: "Document upload failed: " + err.message 
        });
      }
    }

    const doctor = await doctorModel.findByIdAndUpdate(
      doctorId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    res.status(200).json({ 
      success: true, 
      message: "Profile updated successfully",
      data: doctor 
    });

  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message || "Server error during update" 
    });
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



export { registerDoctor, loginDoctor, doctorList, getDoctorProfile, updateDoctorProfile, changeAvaibality };
