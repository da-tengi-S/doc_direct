
import doctorModel from "../models/doctorModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as couldinary } from 'cloudinary'
import { v2 as cloudinary } from 'cloudinary'
import appointmentModel from "../models/appoitmentModels.js";
import AccessRequest from "../models/AccessRequest.js";
import userModel from '../models/userModel.js';
import MedicalRecord from '../models/medicalRecordModel.js';
import mongoose from "mongoose";

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
      const doctorId = req.user.id; 

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
          resource_type: "raw",
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
      res.json({success:true, message:' '})
  } catch (error) {
      console.log(error)
      res.json({success:false, message:error.message})
  }
}

const changeVideoCall = async (req, res) => {
  try {
      const { docId } = req.body;
      console.log("Received docId:", docId);

      if (!docId) {
          return res.status(400).json({ success: false, message: "Doctor ID is required" });
      }

      const docData = await doctorModel.findById(docId);

      if (!docData) {
          return res.status(404).json({ success: false, message: "Doctor not found" });
      }

      await doctorModel.findByIdAndUpdate(docId, { videocall: !docData.videocall });

      res.json({ success: true, message: "Video call availability changed" });
  } catch (error) {
      console.error("Error changing video call availability:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Updated backend API
const doctorappoitemnt = async (req, res) => {
  try {
    // console.log("Authenticated doctor ID:", req.user.id); // Add this
    const appointments = await appointmentModel.find({ docId: req.user.id });
    // console.log("Database query results:", appointments); 
    res.json({ success: true, appointments });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};


const appoitmentComplete = async (req, res)=>{
  try {
    const { appointmentId } = req.body;
    const docId = req.user.id; 

    const appoitmentData = await appointmentModel.findById(appointmentId)

    if(appoitmentData && appoitmentData.docId === docId){
      await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted: true})
      return res.json({success:true, message:"Appointment completed "})
    }
    else{
      return res.json({success:false, message:"failed   "})

    }
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
}

const DcancelAppoitment = async (req, res) => {
  try {
      const { appointmentId } = req.body;
      const docId = req.user.id; 

      const appointmentData = await appointmentModel.findById(appointmentId);

      if (!appointmentData) {
          return res.status(404).json({ success: false, message: 'Appointment not found' });
      }

      // Verify the appointment belongs to the authenticated doctor
      if (appointmentData.docId.toString() !== docId.toString()) {
          return res.status(401).json({ success: false, message: 'Unauthorized Attempt' });
      }

      await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
      res.json({ success: true, message: "Appointment Cancelled by Doctor" });

  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "An error occurred. Please try again later." });
  }
}


const doctorDashbaord = async (req, res) => {
  try {
    const docId = req.user.id; 

    const appointment = await appointmentModel.find({ docId });

    let earning = 0;
    appointment.forEach((items) => {
      if (items.isCompleted || items.payment) {
        earning += items.amount;
      }
    });

    let patients = new Set();
    appointment.forEach((items) => {
      patients.add(items.userId);
    });
    patients = [...patients];

    const dashdata = {
      earning,
      appointment: appointment.length,
      patients: patients.length,
      latestAppointment: [...appointment].reverse().slice(0, 5),
    };


    res.json({ success: true, dashdata });

  } catch (error) {
    console.error("Dashboard API Error:", error);
    res.status(500).json({ success: false, message: "An error occurred. Please try again later." });
  }
};



const requestMedicalAccess = async (req, res) => {
  const { doctorId, patientId } = req.body;

  try {
    // Check if request already exists
    const existing = await AccessRequest.findOne({ doctorId, patientId });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Request already exists' });
    }

    // Fetch doctor's name
    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    const doctorName = doctor.name;

    // Create new request
    const newRequest = new AccessRequest({ doctorId, doctorName, patientId });
    await newRequest.save();

    res.status(201).json({ success: true, message: 'Access request sent.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// Doctor views accepted records
const getAccessibleRecords = async (req, res) => {
  const { doctorId } = req.body;
 
  try {
    const acceptedRequests = await AccessRequest.find({ doctorId, status: 'accepted' });

    const patientIds = acceptedRequests.map(req => req.patientId);

    const records = await MedicalRecord.find({
      userId: { $in: patientIds }
    });

    res.status(200).json({ success: true, records });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


const addMedicalRecordbyDoctor = async (req, res) => {
  try {
    // Destructure the request body to get necessary fields
    const { userId, year, medicine, notes, chronicIllnesses, doctor,  pastSurgeries, vaccinations, labResults, doctorId, doctorName } = req.body;
    const imageFile = req.file;

    // Check if patient ID exists
    if (!userId) {
      return res.status(400).json({ success: false, message: "Patient ID is required." });
    }

    // Find the patient in the database
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "Patient not found." });
    }

    // Check if doctor has access to this patient (access control)
    const access = await AccessRequest.findOne({ doctorId, patientId: userId, status: 'accepted' });
 

    // Validate essential fields
    if (!year || !medicine) {
      return res.status(400).json({ success: false, message: "Year and medicine are required." });
    }

    // Handle optional file upload for medical report (image)
    let fileUrl = null;
    if (imageFile) {
      try {
        const fileUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        fileUrl = fileUpload.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res.status(500).json({ success: false, message: "File upload failed." });
      }
    }

    // Create a new medical record object
    const medicalRecordData = {
      userId,
      year,
      medicine,
      notes: notes || "",
      chronicIllnesses: chronicIllnesses || "",
      pastSurgeries: pastSurgeries || "",
      vaccinations: vaccinations || "",
      labResults: labResults || "",
     
      doctor,
      image: fileUrl,
      date: new Date()
    };

    // Create and save the new medical record
    const newMedicalRecord = new MedicalRecord(medicalRecordData);
    await newMedicalRecord.save();

    // Send success response
    res.status(201).json({
      success: true,
      message: "Medical record added successfully.",
      medicalRecord: newMedicalRecord
    });
  } catch (error) {
    // Log and return server error if something goes wrong
    console.error("Error adding medical record:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding medical record.",
      error: error.message
    });
  }
};

export { registerDoctor,addMedicalRecordbyDoctor, requestMedicalAccess,getAccessibleRecords, changeVideoCall,  loginDoctor, doctorList, getDoctorProfile, updateDoctorProfile, changeAvaibality, doctorappoitemnt, appoitmentComplete, DcancelAppoitment, doctorDashbaord };
