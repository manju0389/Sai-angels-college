const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/upload");

const {
  uploadAchievements,
  getAchievements,
  deleteAchievementById,
  updateAchievementYear,
} = require("../controllers/achievementsController");

// safe multer wrapper
const handleUploadMiddleware = (req, res, next) => {
  upload.array("files")(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        message:
          err.code === "LIMIT_FILE_SIZE"
            ? "File too large (max 5 MB)"
            : err.message,
      });
    }
    next();
  });
};

router.get("/", getAchievements);
router.post("/upload", handleUploadMiddleware, uploadAchievements);

// ✅ IMPORTANT: single image delete
router.delete("/:id", deleteAchievementById);

// update year
router.put("/:id", updateAchievementYear);

module.exports = router;