const express = require("express");
const router = express.Router();

const { upload } = require("../middleware/upload");

const {
  uploadBanner,
  getBanners,
  updateBanner,
  deleteBanner,
  uploadStudent,
  getStudents,
  updateStudent,
  deleteStudent,
} = require("../controllers/homeController");

// BANNER
router.post("/banner", upload.single("image"), uploadBanner);
router.get("/banner", getBanners);
router.put("/banner/:id", upload.single("image"), updateBanner);
router.delete("/banner/:id", deleteBanner);

// STUDENT
router.post("/student", upload.single("image"), uploadStudent);
router.get("/student", getStudents);
router.put("/student/:id", upload.single("image"), updateStudent);
router.delete("/student/:id", deleteStudent);

module.exports = router;
