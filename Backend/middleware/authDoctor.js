


import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
    try {
        console.log("Headers received:", req.headers); 

        const authHeader = req.headers.authorization;
        console.log("Authorization Header:", authHeader); 

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Not authorized, login token missing" });
        }

        const dToken = authHeader.split(' ')[1];
        const tokenDecode = jwt.verify(dToken, process.env.JWT_SECRET);

        if (!tokenDecode || !tokenDecode.id) {
            return res.status(403).json({ success: false, message: "Invalid or expired token" });
        }

        req.user = tokenDecode; 
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        res.status(500).json({ success: false, message: "Authentication failed" });
    }
};

export default authDoctor;


// // authDoctor.js
// const authDoctor = async (req, res, next) => {
//     try {
//         const authHeader = req.headers.authorization;
//         if (!authHeader?.startsWith("Bearer ")) {
//             return res.status(401).json({ success: false, message: "Not authorized" });
//         }

//         const dToken = authHeader.split(' ')[1];
//         const tokenDecode = jwt.verify(dToken, process.env.JWT_SECRET);

//         // Set to req.doctor instead of req.user
//         req.doctor = tokenDecode; 
//         next();
//     } catch (error) {
//         console.error("Auth Error:", error);
//         res.status(401).json({ success: false, message: "Invalid/Expired token" });
//     }
// };

// export default authDoctor;

