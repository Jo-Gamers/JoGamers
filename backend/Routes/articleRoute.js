const express = require("express");
const router = express.Router();
const multer = require("multer");
const articleController = require("../controllers/articleController");
const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorizeMiddleware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage }).array("images", 10);

router.get("/", authorize('publisher'), (req, res, next) => {
  console.log("GET /api/news/dash route is being hit");
  next();  // Continue to the next middleware
}, articleController.getAllArticle);
router.get("/:id", articleController.getArticleById);
router.post("/create", protect, authorize('publisher'), upload, articleController.createArticle);
router.put("/:id", protect, authorize('publisher'), upload, articleController.updateArticle);
router.delete("/:id", protect, authorize('publisher'), articleController.deleteArticle);
router.put("/:id/approve", protect, authorize('publisher'), articleController.approveArticle);


module.exports = router;
