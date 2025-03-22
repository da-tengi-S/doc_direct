
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken'; 
import userModel from '../models/userModel.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleAuth = async (req, res) => {
  try {
    const { tokenId } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    let user = await userModel.findOne({ email });

    if (user) {
      if (user.password) {
        return res.status(400).json({
          success: false,
          message: "Account exists with email/password. Please use password login.",
        });
      }
    } else {
      user = new userModel({
        name,
        email,
        verified: true,
        isGoogleUser: true,
      });
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({
      success: true,
      token,
      message: "Google authentication successful.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Google authentication failed.",
    });
  }
};

export default googleAuth;
