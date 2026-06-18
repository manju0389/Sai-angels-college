const express = require("express");
const router = express.Router();

const { upload } = require("../middleware/upload");

const {
  uploadGallery,
  getGallery,
  updateCaption,
  deleteByCaption,
} = require("../controllers/galleryController");

router.post("/upload", upload.array("files"), uploadGallery);

router.get("/", getGallery);

// IMPORTANT: must match controller name exactly
router.put("/:id", updateCaption);

router.delete("/:id", deleteByCaption);

module.exports = router;
