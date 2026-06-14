const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/upload");
const {
  uploadAchievements,
  getAchievements,
  deleteAchievementsByYear,
  updateAchievementYear
} = require("../controllers/achievementsController");

// Wrap Multer to catch file size errors
const handleUploadMiddleware = (req, res, next) => {
  upload.array("files")(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "File too large (max 5 MB)" });
      }
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

router.get("/", getAchievements);
router.post("/upload", handleUploadMiddleware, uploadAchievements);
router.delete("/:year", deleteAchievementsByYear);
router.put("/:id/year", updateAchievementYear);

module.exports = router;