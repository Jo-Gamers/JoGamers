// جلب بيانات المستخدم
exports.getProfile = async (req, res) => {
    try {
      const user = await User.findById(req.userId).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };
  
  // تحديث بيانات المستخدم
  exports.updateProfile = async (req, res) => {
    const { username, email, phoneNumber, gamerTag, profileImage } = req.body;
  
    try {
      const user = await User.findByIdAndUpdate(
        req.userId,
        { username, email, phoneNumber, gamerTag, profileImage },
        { new: true }
      ).select("-password");
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "Profile updated", user });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };
  
  