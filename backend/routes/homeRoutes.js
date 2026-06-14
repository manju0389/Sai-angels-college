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


// =============================
// BANNER ROUTES
// =============================

// Create banner
router.post(
  "/banner",
  upload.single("image"),
  uploadBanner
);

// Get all banners
router.get(
  "/banner",
  getBanners
);

// Update banner
router.put(
  "/banner/:id",
  upload.single("image"),
  updateBanner
);

// Delete banner
router.delete(
  "/banner/:id",
  deleteBanner
);


// =============================
// STUDENT ROUTES
// =============================

// Create student
router.post(
  "/student",
  upload.single("image"),
  uploadStudent
);

// Get all students
router.get(
  "/student",
  getStudents
);

// Update student
router.put(
  "/student/:id",
  upload.single("image"),
  updateStudent
);

// Delete student
router.delete(
  "/student/:id",
  deleteStudent
);


module.exports = router;