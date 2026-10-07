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
// RESULT SECTIONS
// ==========================================

router.get("/", getResults);

router.post("/", createSection);

router.get("/:id", getResult);

router.put("/:id", updateSection);

router.delete("/:id", deleteSection);

// ==========================================
// STUDENTS
// ==========================================

router.post(
  "/:sectionId/students",
  upload.single("image"),
  createStudent
);

router.put(
  "/:sectionId/students/:studentId",
  upload.single("image"),
  updateStudent
);

router.delete(
  "/:sectionId/students/:studentId",
  deleteStudent
);

module.exports = router;
