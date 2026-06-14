const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/upload");
const {
  getAbout,
  createAbout,
  updateAbout,
  deleteAbout,
} = require("../controllers/aboutController");

// GET all
router.get("/", getAbout);

// CREATE (image required)
router.post("/", upload.single("image"), createAbout);

// UPDATE (image optional)
router.put("/:id", upload.single("image"), updateAbout);

// DELETE
router.delete("/:id", deleteAbout);

module.exports = router;