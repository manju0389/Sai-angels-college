const express = require("express");
const router = express.Router();

const { upload } = require("../middleware/upload");

// ✅ Import controller
const {
  getVideos,
  addVideo,
  deleteVideo,
  updateVideoTitle, // ⭐ ADD THIS
} = require("../controllers/videoController");

// ---------- ROUTES ----------
router.get("/", getVideos);

router.post("/", upload.single("image"), addVideo);

// ⭐ ADD THIS ROUTE (IMPORTANT)
router.put("/:id", updateVideoTitle);

router.delete("/:id", deleteVideo);

module.exports = router;