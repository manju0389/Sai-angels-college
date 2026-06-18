const express = require("express");
const router = express.Router();

const { upload } = require("../middleware/upload");

const {
  uploadGallery,
  getGallery,
  updateCaption,
  deleteGalleryById
} = require("../controllers/galleryController");

// Upload multiple files
router.post("/upload", upload.array("files"), uploadGallery);

// Get all images
router.get("/", getGallery);

// ✅ FIXED: use ID not caption
router.put("/:id", updateCaption);

// ✅ FIXED: use ID not caption
router.delete("/:id", deleteGalleryById);

module.exports = router;
