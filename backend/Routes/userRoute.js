const express = require("express");
const { getProfile, updateProfile } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// جلب بيانات المستخدم (يتطلب مصادقة)
router.get("/profile", authMiddleware, getProfile);

// تحديث بيانات المستخدم (يتطلب مصادقة)
router.put("/profile", authMiddleware, updateProfile);

module.exports = router;