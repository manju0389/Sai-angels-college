const express = require("express");
const router = express.Router();

const {
  getBResults,
  getBResult,
  createSection,
  updateSection,
  deleteSection,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/bresultsController");

const { upload } = require("../middleware/upload");

// Section routes
router.get("/", getBResults);
router.post("/", createSection);
router.get("/:id", getBResult);
router.put("/:id", updateSection);
router.delete("/:id", deleteSection);

// Student routes — multer must run before the controller
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