const express = require("express");
const router = express.Router();
const multer = require("multer");
const articleController = require("../controllers/articleController");
const protect = require("../middlewares/authMiddleware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage }).array("images", 10);

router.get("/", articleController.getAllArticle);
router.post("/create", protect, upload, articleController.createArticle);
router.get("/:id", articleController.getArticleById);
router.put("/:id", protect, upload, articleController.updateArticle);
router.delete("/:id", protect, articleController.deleteArticle);
router.put("/:id/approve", protect, articleController.approveArticle);

module.exports = router;
