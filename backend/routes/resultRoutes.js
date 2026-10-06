const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  getResults,
  getResult,
  createSection,
  updateSection,
  deleteSection,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/resultsController");

// ==========================================
// SECTION ROUTES
// ==========================================

// GET ALL RESULT SECTIONS
router.get("/", getResults);

// GET SINGLE RESULT SECTION
router.get("/:id", getResult);

// CREATE SECTION
router.post("/", createSection);

// UPDATE SECTION
router.put("/:id", updateSection);

// DELETE SECTION
router.delete("/:id", deleteSection);

// ==========================================
// STUDENT ROUTES
// ==========================================

// ADD STUDENT
router.post(
  "/:sectionId/students",
  upload.single("image"),
  createStudent
);

// UPDATE STUDENT
router.put(
  "/:sectionId/students/:studentId",
  upload.single("image"),
  updateStudent
);

// DELETE STUDENT
router.delete(
  "/:sectionId/students/:studentId",
  deleteStudent
);

module.exports = router;
