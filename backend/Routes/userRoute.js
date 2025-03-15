const express = require("express");
const auth = require("../controllers/userController");

const router = express.Router();

router.post("/register", auth.register);
router.post("/login", auth.login);
router.get("/", auth.getAllUsers); // Get all users
router.put("/:userId", auth.updateUser); // Update user
router.delete("/:userId", auth.deleteUser); // Delete user

module.exports = router;
