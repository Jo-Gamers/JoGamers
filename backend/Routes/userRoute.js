const express = require("express");
const auth = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware")
const router = express.Router();

router.post("/register", auth.register);
router.post("/login", auth.login);
router.get("/", auth.getAllUsers); // Get all users
router.put("/:userId", auth.updateUser); // Update user
router.delete("/:userId", auth.deleteUser); // Delete user
router.get('/profile', auth.profile);// Profile (Protected Route)
router.get("/profile", authMiddleware.protect, auth.getProfile);
router.put("/:userId", authMiddleware.protect, auth.updateProfile);
// router.put('/:userId',authMiddleware.protect, auth.upload.single('profileImage'), auth.updateProfile);
// Update profile with image upload
// router.put(
//     "/:userId",
//     authMiddleware.protect,
//     auth.upload.single("profileImage"), // استخدام multer لتحميل صورة واحدة
//     auth.updateProfile
//   );
module.exports = router;
