const express = require("express");
const router = express.Router();

const { upload } = require("../middleware/upload");
const {
  uploadGallery,
  getGallery,
  deleteByCaption,
  updateCaption
} = require("../controllers/galleryController");

// Upload multiple files
router.post("/upload", upload.array("files"), uploadGallery);

// Get all images
router.get("/", getGallery);

// Update caption
router.put("/:caption", updateCaption);

// Delete by caption
router.delete("/:caption", deleteByCaption);

module.exports = router;