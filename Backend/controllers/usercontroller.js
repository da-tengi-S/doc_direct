// api for ragister user 
import bcrypt from 'bcrypt'; // Correct import
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import validator from 'validator';

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
        res.status(500).json({ success: false, message: "An error . try with new email address later." });
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


export { ragisterUser,loginUser };
