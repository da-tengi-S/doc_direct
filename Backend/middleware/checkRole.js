// middleware/checkRole.js
const checkRole = (allowedRoles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ 
          success: false, 
          message: 'Unauthorized: No user information found' 
        });
      }
  
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ 
          success: false, 
          message: `Forbidden: ${req.user.role} role not allowed` 
        });
      }
  
      next();
    };
  };
  
  export default checkRole;