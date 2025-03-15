const express = require("express");
<<<<<<< HEAD
const auth = require("../controllers/userController");

const router = express.Router();

router.post("/register", auth.register);
router.post("/login", auth.login);


module.exports = router;
=======
const { getProfile, updateProfile } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// جلب بيانات المستخدم (يتطلب مصادقة)
router.get("/profile", authMiddleware, getProfile);

// تحديث بيانات المستخدم (يتطلب مصادقة)
router.put("/profile", authMiddleware, updateProfile);

module.exports = router;
>>>>>>> bf672c1e409d1645fff773f7adb6b92546d1f13c
