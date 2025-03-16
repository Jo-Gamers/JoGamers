const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const authorize = (role) => {
  return async (req, res, next) => {
    // Check for the token in the Authorization header (Bearer Token)
    const token = req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer ') 
                  ? req.headers['authorization'].split(' ')[1] // Get token from header
                  : req.cookies.token;  // Fallback to cookies if no token in header

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;

      // Fetch user from the database using the decoded userId
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the user has the required role
      if (user.role !== role) {
        return res.status(403).json({ message: `Access denied. ${role} role required.` });
      }

      next(); // User has the correct role, proceed with the request
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  };
};

module.exports = authorize;
