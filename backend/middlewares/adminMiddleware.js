const User = require("../Models/User");

const adminAuth = async (req, res, next) => {
    try {
        // Get user from database using userId set by auth middleware
        const user = await User.findById(req.userId);
        
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ 
                message: "Access denied. Admin privileges required." 
            });
        }

        // Attach the full user object to the request for later use
        req.user = user;
        next();
    } catch (error) {
        console.error('Admin auth error:', error);
        return res.status(500).json({ 
            message: "Server error during authorization" 
        });
    }
};

module.exports = adminAuth; 