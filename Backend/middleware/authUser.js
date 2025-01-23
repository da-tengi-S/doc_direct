

// //  authuser 
import jwt from "jsonwebtoken";


const authUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log("Authorization Header:", authHeader);

        if (!authHeader) {
            return res.status(401).json({ success: false, message: "Not authorized, login token missing" });
        }

        // Support for tokens without "Bearer" prefix
        const token = authHeader.startsWith("Bearer ") ? authHeader.split(' ')[1] : authHeader;

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (!tokenDecode || !tokenDecode.id) {
            return res.status(403).json({ success: false, message: "Invalid or expired token" });
        }

        req.body.userId = tokenDecode.id;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Authentication failed" });
    }
};

export default authUser;