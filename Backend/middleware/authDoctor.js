

// // // authAdmin.js
import jwt from "jsonwebtoken";


// const authDoctor = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1]; // Extract token from 'Bearer <token>'
//     if (!token) {
//       return res.json({ success: false, message: "Not authorized, login token missing 11" });
//     }

//     const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
//     if (tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
//       return res.json({ success: false, message: "Not authorized, invalid login token" });
//     }
//     next();
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };


// export default authDoctor;



// //  authDoctor 
// import jwt from "jsonwebtoken";

// const authDoctor = async (req, res, next) => {
//     try {
//         const authHeader = req.headers.authorization;
//         console.log("Authorization Header:", authHeader);

//         if (!authHeader) {
//             return res.status(401).json({ success: false, message: "Not authorized, login token missing" });
//         }
//         // Support for tokens without "Bearer" prefix
//         const dToken = authHeader.startsWith("Bearer ") ? authHeader.split(' ')[1] : authHeader;

//         const tokenDecode = jwt.verify(dToken, process.env.JWT_SECRET);

//         if (!tokenDecode || !tokenDecode.id) {
//             return res.status(403).json({ success: false, message: "Invalid or expired token" });
//         }

        
//         req.body.userId = tokenDecode.id;
//         next();
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Authentication failed" });
//     }
// };

// export default authDoctor;

// const authDoctor = async (req, res, next) => {
//     try {
//         console.log("Headers received:", req.headers); // Debugging

//         const authHeader = req.headers.authorization;
//         console.log("Authorization Header:", authHeader); // Debugging

//         if (!authHeader || !authHeader.startsWith("Bearer ")) {
//             return res.status(401).json({ success: false, message: "Not authorized, login token missing" });
//         }

//         const dToken = authHeader.split(' ')[1];
//         const tokenDecode = jwt.verify(dToken, process.env.JWT_SECRET);

//         if (!tokenDecode || !tokenDecode.id) {
//             return res.status(403).json({ success: false, message: "Invalid or expired token" });
//         }

//         req.userId = tokenDecode.id;
//         next();
//     } catch (error) {
//         console.error("Auth Middleware Error:", error);
//         res.status(500).json({ success: false, message: "Authentication failed" });
//     }
// };

// export default authDoctor;


const authDoctor = async (req, res, next) => {
    try {
        console.log("Headers received:", req.headers); // Debugging

        const authHeader = req.headers.authorization;
        console.log("Authorization Header:", authHeader); // Debugging

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Not authorized, login token missing" });
        }

        const dToken = authHeader.split(' ')[1];
        const tokenDecode = jwt.verify(dToken, process.env.JWT_SECRET);

        if (!tokenDecode || !tokenDecode.id) {
            return res.status(403).json({ success: false, message: "Invalid or expired token" });
        }

        req.user = tokenDecode; // Corrected: Store the decoded token in `req.user`
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        res.status(500).json({ success: false, message: "Authentication failed" });
    }
};

export default authDoctor;
