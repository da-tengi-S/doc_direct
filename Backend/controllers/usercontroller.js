// // api for ragister user 
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import userModel from '../models/userModel.js';
// import validator from 'validator';
// import {v2 as couldinary} from 'cloudinary'

// const ragisterUser = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         // Validate required fields
//         if (!name || !email || !password) {
//             return res.status(400).json({ success: false, message: "Missing required fields: name, email, or password." });
//         }
    
//         // Validate email
//         if (!validator.isEmail(email)) {
//             return res.status(400).json({ success: false, message: "Invalid email address." });
//         }

//         // Validate password length
//         if (password.length < 5) {
//             return res.status(400).json({ success: false, message: "Password must be at least 5 characters long." });
//         }

//         // Hash password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Create user object
//         const userData = { name, email, password: hashedPassword };
//         const newUser = new userModel(userData);
//         const user = await newUser.save();

//         // Generate JWT token
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'defaultSecret', { expiresIn: '1h' });

//         res.status(201).json({ success: true, token });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "An error . try with new email address later." });
//     }
// };
// const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Validate required fields
//         if (!email || !password) {
//             return res.status(400).json({ success: false, message: "Missing email or password." });
//         }

//         // Find user in database
//         const user = await userModel.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found." });
//         }

//         // Compare passwords
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ success: false, message: "Invalid password." });
//         }

//         // Generate JWT token
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET );

//         res.status(200).json({ success: true, token, message: "Login successful." });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "An error occurred.  try with new email later." });
//     }
// };

// // api for user data 
// const getProfile = async (req, res) => {
//     try {
//       const { userId } = req.body; // From middleware
//       const userData = await userModel.findById(userId).select('-password');
  
//       if (!userData) {
//         return res.status(404).json({ success: false, message: "User not found" });
//       }
  
//       res.json({ success: true, userData });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ success: false, message: "An error occurred. catch Please try again later." });
//     }
//   };
  
// // for update of profile 
// const updateProfile = async (req, res ) => {
//     try {
//         const {userId, name, phone, address, dob , gender} = req.body
//         const imageFile = req.file 
//         if (!name || !phone || !dob  || !gender){
//             return res.json({successLfalse, message:"data messing"})
//         }
//         await userModel.findByIdAndUpdate(userId, {name, phone, address:JSON.parse(address), dob, gender})
//         if(imageFile){
//             // upload image to couldinary 
            
//             const imageUpalod = await couldinary.uploader.upload(imageFile.path, {resource_type :"image"})
//             const imageURL = imageUpalod.secure_url

//             await userModel.findByIdAndUpdate(userId, {image:imageURL} )
//         }
//         res.json({success:true, message:"Profile uploaded "})
        
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "An error occurred. catch Please try again later." });
//       }
// }


// export { ragisterUser,loginUser , getProfile, updateProfile};




///] api for ragister user 
import bcrypt from 'bcrypt'; // Correct import
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import validator from 'validator';
import {v2 as couldinary} from 'cloudinary'
import doctorModel from '../models/doctorModels.js';
import appointmentModel from '../models/appoitmentModels.js';

const ragisterUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Missing required fields: name, email, or password." });
        }
    
        // Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email address." });
        }

        // Validate password length
        if (password.length < 5) {
            return res.status(400).json({ success: false, message: "Password must be at least 5 characters long." });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user object
        const userData = { name, email, password: hashedPassword };
        const newUser = new userModel(userData);
        const user = await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'defaultSecret', { expiresIn: '1h' });

        res.status(201).json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred. try with new email address later." });
    }
};
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Missing email or password." });
        }

        // Find user in database
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid password." });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET );

        res.status(200).json({ success: true, token, message: "Login successful." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred.  try with new email later." });
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
const updateProfile = async (req, res ) => {
    try {
        const {userId, name, phone, address, dob , gender} = req.body
        const imageFile = req.file 
        if (!name || !phone || !dob  || !gender){
            return res.json({successLfalse, message:"data messing"})
        }
        await userModel.findByIdAndUpdate(userId, {name, phone, address:JSON.parse(address), dob, gender})
        if(imageFile){
            // upload image to couldinary 
            
            const imageUpalod = await couldinary.uploader.upload(imageFile.path, {resource_type :"image"})
            const imageURL = imageUpalod.secure_url

            await userModel.findByIdAndUpdate(userId, {image:imageURL} )
        }
        res.json({success:true, message:"Profile uploaded "})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred. catch Please try again later." });
      }
}

// for appoitment book 
const bookappointment = async (req, res ) =>{
    try {
        const {userId, docId, slotDate, slotTime} = req.body
        const docData = await doctorModel.findById(docId).select('-password')
        if(!docData.available){
            return res.json({success:false, message:"Doctor not avaibale"})
        }
        let slots_booked = docData.slots_booked
        // checking for slot aaiabalility
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes[slotTime]){
                return res.json({success:false, message:"slot not avaibale"})
            }
            else{
                slots_booked[slotDate].push(slotTime)
            }
        }else{
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }
        const userData = await userModel.findById(userId).select('-password')

        delete docData.slots_booked

        const appoitmentData = {
            userId, docId, userData, docData, amount:docData.fees,
            slotDate, slotTime, date: Date.now()
        }
        const newAppointment = new appointmentModel(appoitmentData)
        await newAppointment.save()

        //save new slotdata in docData
        await doctorModel.findByIdAndUpdate(docId, {slots_booked})

        res.json({success:true, message:"appoitment Booked"})

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred. catch Please try again later." });
      }
}

// const bookappointment = async (req, res) => {
//     try {
//         const { userId, docId, slotDate, slotTime } = req.body;

//         // Validate input
//         if (!userId || !docId || !slotDate || !slotTime) {
//             return res.status(400).json({ success: false, message: "Missing required fields" });
//         }

//         // Check if doctor is available
//         const doctor = await doctorModel.findById(docId).select('available slots_booked fees');
//         if (!doctor || !doctor.available) {
//             return res.status(404).json({ success: false, message: "Doctor not available" });
//         }

//         // Ensure slot availability
//         const slotExists = doctor.slots_booked[slotDate]?.includes(slotTime);
//         if (slotExists) {
//             return res.status(409).json({ success: false, message: "Slot already booked" });
//         }

//         // Book the slot
//         await doctorModel.findOneAndUpdate(
//             { _id: docId },
//             { $push: { [`slots_booked.${slotDate}`]: slotTime } }
//         );

//         // Get user data
//         const user = await userModel.findById(userId).select('name email');
//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         // Save appointment
//         const appointmentData = {
//             userId,
//             docId,
//             userData: user,
//             docData: { fees: doctor.fees },
//             slotDate,
//             slotTime,
//             date: Date.now(),
//         };

//         const newAppointment = new appoitmentModel(appointmentData);
//         await newAppointment.save();

//         res.status(201).json({ success: true, message: "Appointment booked successfully" });
//     } catch (error) {
//         console.error("Error booking appointment:", error);
//         res.status(500).json({ success: false, message: "An error occurred. Please try again later." });
//     }
// };


// api to get user appoitmnet 
const listAppoitmnet = async (req, res) =>{
    try {
        const {userId} = req.body
        const appointment = await appointmentModel.find({userId})

        res.json({success:true, appointment})

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred. catch Please try again later." });
      }
}

//api to cancel appoitment 
const cancelAppoitment = async(req, res) => {
    try {
        const {userId, appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        // verify appoitment user
        if(appointmentData.userId !==userId){
            return res.json({success:false, message:'unathorized Attempt '})
        }
        else{
            await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

            //relasing doctor slot 
            const {docId, slotDate, slotTime} = appointmentData
            const doctorData = await doctorModel.findById(docId)

            let slots_booked = doctorData.slots_booked

            slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
            await doctorModel.findByIdAndUpdate(docId, {slots_booked})
            res.json({success:true, message:"appoitment Cancelled"})

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred. catch Please try again later." });
      }
}






export { ragisterUser,loginUser , getProfile, updateProfile, bookappointment, listAppoitmnet, cancelAppoitment};
