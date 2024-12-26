

// // authAdmin.js
import jwt from "jsonwebtoken";


const authAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from 'Bearer <token>'
    if (!token) {
      return res.json({ success: false, message: "Not authorized, login token missing" });
    }

    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: "Not authorized, invalid login token" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


export default authAdmin;
