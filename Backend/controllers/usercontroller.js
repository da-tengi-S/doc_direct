


///] api for ragister user 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import validator from 'validator';
import { v2 as couldinary } from 'cloudinary'
import { v2 as cloudinary } from 'cloudinary'
import MedicalRecord from '../models/medicalRecordModel.js';
import doctorModel from '../models/doctorModels.js';
import appointmentModel from '../models/appoitmentModels.js';
import { sendVerificationEmail } from '../utils/emailService.js';
// import notificationModel from '../models/notificationModel.js';
import AccessRequest from '../models/AccessRequest.js';


const ragisterUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Missing required fields." });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email address." });
        }

        if (password.length < 5) {
            return res.status(400).json({ success: false, message: "Password must be at least 5 characters long." });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already registered." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate a 6-digit verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Create a new user with "verified" set to false
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            verified: false,
            verificationCode
        });
        await newUser.save();

        // Send verification email
        await sendVerificationEmail(email, verificationCode);

        res.status(201).json({ success: true, message: "Verification email sent. Please check your inbox." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred." });
    }
};
const verifyEmail = async (req, res) => {
    try {
        const { email, code } = req.body;

        if (!email || !code) {
            return res.status(400).json({ success: false, message: "Email and verification code required." });
        }

        // Find the user in the database
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        if (user.verificationCode !== code) {
            return res.status(400).json({ success: false, message: "Invalid verification code." });
        }

        // Mark user as verified and remove the verification code
        user.verified = true;
        user.verificationCode = null;
        await user.save();

        res.status(200).json({ success: true, message: "Email verified successfully. You can now log in." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred." });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Missing email or password." });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        if (!user.verified) {
            return res.status(403).json({ success: false, message: "Please verify your email first." });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid password." });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '10h' });

        res.status(200).json({ success: true, token, message: "Login successful." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred." });
    }
};


// api for user data 
const getProfile = async (req, res) => {
    try {
        const { userId } = req.body; // From middleware
        const userData = await userModel.findById(userId).select('-password');

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, userData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred. catch Please try again later." });
    }
};

// for update of profile 
const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.file
        if (!name || !phone || !dob || !gender) {
            return res.json({ successLfalse, message: "data messing" })
        }
        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })
        if (imageFile) {
            // upload image to couldinary 

            const imageUpalod = await couldinary.uploader.upload(imageFile.path, { resource_type: "image" })
            const imageURL = imageUpalod.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageURL })
        }
        res.json({ success: true, message: "Profile uploaded " })

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred. catch Please try again later." });
    }
}

// for appoitment book 

const bookappointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime, reason } = req.body; // Accept reason
        const docData = await doctorModel.findById(docId).select('-password');
        if (!docData.available) {
            return res.json({ success: false, message: "Doctor not available" });
        }
        let slots_booked = docData.slots_booked;

        // Check for slot availability
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Slot not available" });
            } else {
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);
        }

        const userData = await userModel.findById(userId).select('-password');
        delete docData.slots_booked;

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotDate,
            slotTime,
            reason,
            date: Date.now()
        };

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        // Save new slot data in docData
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.json({ success: true, message: "Appointment Booked" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred. Please try again later." });
    }
};

// api to get user appoitmnet 
const listAppoitmnet = async (req, res) => {
    try {
        const { userId } = req.body
        const appointment = await appointmentModel.find({ userId })

        res.json({ success: true, appointment })

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred. catch Please try again later." });
    }
}

//api to cancel appoitment 
const cancelAppoitment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        // verify appoitment user
        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: 'unathorized Attempt ' })
        }
        else {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

            //relasing doctor slot 
            const { docId, slotDate, slotTime } = appointmentData
            const doctorData = await doctorModel.findById(docId)

            let slots_booked = doctorData.slots_booked

            slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
            await doctorModel.findByIdAndUpdate(docId, { slots_booked })
            res.json({ success: true, message: "appoitment Cancelled" })

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred. catch Please try again later." });
    }
}



const addMedicalRecord = async (req, res) => {
    try {
        const { userId, year, medicine, notes, chronicIllnesses, pastSurgeries, vaccinations, labResults, doctor } = req.body;
        const imageFile = req.file;

        // Check if user is authorized
        if (!userId) {
            return res.status(401).json({ success: false, message: "User ID is required for authentication." });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Validate required fields
        if (!year || !medicine || !doctor) {
            return res.status(400).json({ success: false, message: "Year, medicine, and doctor are required." });
        }

        // Handle optional file upload if present
        let fileUrl = null;
        if (imageFile) {
            try {
                const fileUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
                fileUrl = fileUpload.secure_url;
            } catch (uploadError) {
                console.error("Error uploading file to Cloudinary:", uploadError);
                return res.status(500).json({ success: false, message: "File upload failed. Please try again." });
            }
        }

        // Create a new medical record
        const medicalRecordData = {
            userId,
            year,
            medicine,
            notes: notes || "", // Optional fields
            chronicIllnesses: chronicIllnesses || "",
            pastSurgeries: pastSurgeries || "",
            vaccinations: vaccinations || "",
            labResults: labResults || "",
            doctor,
            image: fileUrl,
            date: Date.now()
        };

        const newMedicalRecord = new MedicalRecord(medicalRecordData);
        await newMedicalRecord.save();

        res.status(201).json({
            success: true,
            message: "Medical record added successfully.",
            medicalRecord: newMedicalRecord
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while adding the medical record.",
            error: error.message
        });
    }
};

const fetchMedicalRecordsByUser = async (req, res) => {
    try {
        // Same approach as appointments
        const { userId } = req.body;

        const medicalRecords = await MedicalRecord.find({ userId })
            .sort({ date: -1 }); // Add sorting like appointments

        if (!medicalRecords?.length) {
            return res.status(404).json({
                success: false,
                message: "No medical records found"
            });
        }

        res.status(200).json({
            success: true,
            medicalRecords
        });

    } catch (error) {
        console.error("Medical records error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};


const addRatingAndComment = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const patientId = req.body.userId;
        const doctorId = req.params.doctorId;

        if (!patientId) {
            return res.status(401).json({ success: false, message: "Unauthorized: No user found" });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ success: false, message: "Rating must be between 1 and 5." });
        }

        const doctor = await doctorModel.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found." });
        }


        doctor.ratings.push({
            patientId,
            rating,
            comment,
            createdAt: new Date(),
        });

        await doctor.save();

        res.status(200).json({ success: true, message: "Rating and comment added successfully." });
    } catch (error) {
        console.error("Error adding rating:", error);
        res.status(500).json({ success: false, message: "An error occurred. Please try again later." });
    }
};



const getAccessRequests = async (req, res) => {
    console.log('Received request to view access requests');
    console.log('User ID:', req.user?.id); 
    
    try {
        const requests = await AccessRequest.find({ 
            patientId: req.body.userId,
            status: 'pending'
        });

        const results = await Promise.all(requests.map(async (request) => {
            const doctor = await doctorModel.findById(request.doctorId).select('name speciality');
            
            return {
                _id: request._id,
                doctorId: request.doctorId,
                doctorName: doctor?.name || 'Unknown',
                specialization: doctor?.speciality || 'N/A',
                requestedAt: request.createdAt
            };
        }));

        res.status(200).json({ 
            success: true, 
            requests: results
        });
    } catch (err) {
        console.error('Error in getAccessRequests:', err);
        res.status(500).json({ 
            success: false, 
            message: 'Server error', 
            error: err.message 
        });
    }
};

const respondToRequest = async (req, res) => {
    const { requestId } = req.params;
    const { status } = req.body;
    const patientId = req.body.userId; 

    try {
        const request = await AccessRequest.findOne({
            _id: requestId,
            patientId: patientId
        });

        if (!request) {
            return res.status(404).json({ 
                success: false, 
                message: 'Request not found or unauthorized' 
            });
        }

        // Update the request status
        request.status = status;
        await request.save();

        // If accepted, you might want to create access permission here
        if (status === 'accepted') {
            // Add logic to grant access
        }

        return res.status(200).json({ 
            success: true, 
            message: `Request ${status} successfully` 
        });
    } catch (err) {
        console.error('Error responding to request:', err);
        return res.status(500).json({ 
            success: false, 
            message: 'Server error', 
            error: err.message 
        });
    }
};
export { ragisterUser, getAccessRequests, respondToRequest, loginUser, getProfile, updateProfile, bookappointment, listAppoitmnet, cancelAppoitment, addMedicalRecord, fetchMedicalRecordsByUser, addRatingAndComment, verifyEmail };
