const express = require("express");
const { addComment, deleteComment, reportComment, getComments , getReportedComments} = require("../controllers/commentController");
const protect = require("../middlewares/authMiddleware");
const adminAuth = require("../middlewares/adminMiddleware");

const router = express.Router();

// Public routes
router.get("/:articleId", getComments);

// Protected routes (require authentication)
router.post("/add", protect, addComment);
router.post("/report/:commentId", protect, reportComment);

router.get("/admin/reported", protect, adminAuth, getReportedComments);
router.delete("/admin/delete/:commentId", protect, adminAuth, deleteComment);

module.exports = router;
