const Result = require("../models/Result");

const {
  uploadToCloudinary,
} = require("../middleware/upload");

const cloudinary = require("../config/cloudinary");

// ==========================================
// CLOUDINARY UPLOAD HELPER
// ==========================================

const uploadImage = async (file) => {
  if (!file) return null;

  const result = await uploadToCloudinary(
    file.buffer,
    "results",
    file.mimetype
  );

  return {
    id: result.public_id,
    url: result.secure_url,
    type: result.resource_type,
  };
};

// ==========================================
// DELETE CLOUDINARY IMAGE
// ==========================================

const deleteCloudinaryImage = async (
  publicId,
  mediaType = "image"
) => {
  if (!publicId) return;

  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type:
        mediaType === "video"
          ? "video"
          : "image",
    });
  } catch (error) {
    console.error(
      "Cloudinary Delete Error:",
      error
    );
  }
};

// ==========================================
// GET ALL RESULT SECTIONS
// ==========================================

exports.getResults = async (req, res) => {
  try {
    const results = await Result.find()
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json(results);
  } catch (error) {
    console.error(
      "Get Results Error:",
      error
    );

    return res.status(500).json({
      message: "Failed to fetch results",
    });
  }
};

// ==========================================
// GET SINGLE RESULT SECTION
// ==========================================

exports.getResult = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Result.findById(id).lean();

    if (!result) {
      return res.status(404).json({
        message: "Result section not found",
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(
      "Get Single Result Error:",
      error
    );

    return res.status(500).json({
      message: "Failed to fetch result",
    });
  }
};

// ==========================================
// CREATE SECTION
// ==========================================

exports.createSection = async (req, res) => {
  try {
    console.log(
      "CREATE SECTION BODY:",
      req.body
    );

    const {
      title,
      description,
    } = req.body || {};

    // --------------------------------------
    // VALIDATE TITLE
    // --------------------------------------

    if (
      typeof title !== "string" ||
      !title.trim()
    ) {
      return res.status(400).json({
        message: "Section title is required",
      });
    }

    const cleanTitle = title.trim();

    // --------------------------------------
    // CHECK DUPLICATE
    // --------------------------------------

    const existingSection =
      await Result.findOne({
        title: cleanTitle,
      });

    if (existingSection) {
      return res.status(409).json({
        message:
          "A section with this title already exists",
      });
    }

    // --------------------------------------
    // CREATE
    // --------------------------------------

    const result = await Result.create({
      title: cleanTitle,
      description:
        typeof description === "string"
          ? description.trim()
          : "",
      students: [],
    });

    console.log(
      "SECTION CREATED:",
      result._id
    );

    return res.status(201).json({
      message: "Section created successfully",
      result,
    });
  } catch (error) {
    console.error(
      "Create Section Error:",
      error
    );

    return res.status(500).json({
      message: "Failed to create section",
      error: error.message,
    });
  }
};

// ==========================================
// UPDATE SECTION
// ==========================================

exports.updateSection = async (req, res) => {
  try {
    const {
      title,
      description,
    } = req.body || {};

    if (
      typeof title !== "string" ||
      !title.trim()
    ) {
      return res.status(400).json({
        message: "Section title is required",
      });
    }

    const section = await Result.findById(
      req.params.id
    );

    if (!section) {
      return res.status(404).json({
        message: "Section not found",
      });
    }

    // Check duplicate title excluding current section
    const duplicate =
      await Result.findOne({
        title: title.trim(),
        _id: {
          $ne: section._id,
        },
      });

    if (duplicate) {
      return res.status(409).json({
        message:
          "A section with this title already exists",
      });
    }

    section.title = title.trim();

    section.description =
      typeof description === "string"
        ? description.trim()
        : "";

    await section.save();

    return res.status(200).json({
      message: "Section updated successfully",
      result: section,
    });
  } catch (error) {
    console.error(
      "Update Section Error:",
      error
    );

    return res.status(500).json({
      message: "Failed to update section",
      error: error.message,
    });
  }
};

// ==========================================
// DELETE SECTION
// ==========================================

exports.deleteSection = async (req, res) => {
  try {
    const section = await Result.findById(
      req.params.id
    );

    if (!section) {
      return res.status(404).json({
        message: "Section not found",
      });
    }

    // Delete all Cloudinary images
    for (const student of section.students) {
      if (student.cloudinary_id) {
        await deleteCloudinaryImage(
          student.cloudinary_id,
          student.media_type
        );
      }
    }

    await Result.findByIdAndDelete(
      req.params.id
    );

    return res.status(200).json({
      message:
        "Section and all associated images deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete Section Error:",
      error
    );

    return res.status(500).json({
      message: "Failed to delete section",
    });
  }
};

// ==========================================
// ADD STUDENT
// ==========================================

exports.createStudent = async (req, res) => {
  try {
    const section = await Result.findById(
      req.params.sectionId
    );

    if (!section) {
      return res.status(404).json({
        message: "Section not found",
      });
    }

    const {
      studentName,
      className,
      score,
      rank,
    } = req.body || {};

    // --------------------------------------
    // VALIDATION
    // --------------------------------------

    if (
      typeof studentName !== "string" ||
      !studentName.trim()
    ) {
      return res.status(400).json({
        message: "Student name is required",
      });
    }

    if (
      typeof className !== "string" ||
      !className.trim()
    ) {
      return res.status(400).json({
        message: "Class / course is required",
      });
    }

    if (
      typeof score !== "string" ||
      !score.trim()
    ) {
      return res.status(400).json({
        message: "Result is required",
      });
    }

    if (
      typeof rank !== "string" ||
      !rank.trim()
    ) {
      return res.status(400).json({
        message:
          "Rank / achievement is required",
      });
    }

    // --------------------------------------
    // UPLOAD IMAGE
    // --------------------------------------

    let uploaded = null;

    if (req.file) {
      uploaded = await uploadImage(req.file);
    }

    // --------------------------------------
    // ADD STUDENT
    // --------------------------------------

    section.students.push({
      studentName: studentName.trim(),
      className: className.trim(),
      score: score.trim(),
      rank: rank.trim(),

      image: uploaded?.url || "",

      cloudinary_id:
        uploaded?.id || "",

      media_type:
        uploaded?.type || "image",
    });

    await section.save();

    const newStudent =
      section.students[
        section.students.length - 1
      ];

    return res.status(201).json({
      message: "Student added successfully",
      student: newStudent,
      result: section,
    });
  } catch (error) {
    console.error(
      "Create Student Error:",
      error
    );

    return res.status(500).json({
      message: "Failed to add student",
      error: error.message,
    });
  }
};

// ==========================================
// UPDATE STUDENT
// ==========================================

exports.updateStudent = async (req, res) => {
  try {
    const section = await Result.findById(
      req.params.sectionId
    );

    if (!section) {
      return res.status(404).json({
        message: "Section not found",
      });
    }

    const student =
      section.students.id(
        req.params.studentId
      );

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    const {
      studentName,
      className,
      score,
      rank,
    } = req.body || {};

    if (studentName !== undefined) {
      student.studentName =
        studentName.trim();
    }

    if (className !== undefined) {
      student.className =
        className.trim();
    }

    if (score !== undefined) {
      student.score = score.trim();
    }

    if (rank !== undefined) {
      student.rank = rank.trim();
    }

    // --------------------------------------
    // REPLACE IMAGE
    // --------------------------------------

    if (req.file) {
      if (student.cloudinary_id) {
        await deleteCloudinaryImage(
          student.cloudinary_id,
          student.media_type
        );
      }

      const uploaded =
        await uploadImage(req.file);

      student.image = uploaded.url;
      student.cloudinary_id =
        uploaded.id;
      student.media_type =
        uploaded.type;
    }

    await section.save();

    return res.status(200).json({
      message:
        "Student updated successfully",
      student,
      result: section,
    });
  } catch (error) {
    console.error(
      "Update Student Error:",
      error
    );

    return res.status(500).json({
      message: "Failed to update student",
      error: error.message,
    });
  }
};

// ==========================================
// DELETE STUDENT
// ==========================================

exports.deleteStudent = async (req, res) => {
  try {
    const section = await Result.findById(
      req.params.sectionId
    );

    if (!section) {
      return res.status(404).json({
        message: "Section not found",
      });
    }

    const student =
      section.students.id(
        req.params.studentId
      );

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    if (student.cloudinary_id) {
      await deleteCloudinaryImage(
        student.cloudinary_id,
        student.media_type
      );
    }

    student.deleteOne();

    await section.save();

    return res.status(200).json({
      message:
        "Student and image deleted successfully",
      result: section,
    });
  } catch (error) {
    console.error(
      "Delete Student Error:",
      error
    );

    return res.status(500).json({
      message: "Failed to delete student",
      error: error.message,
    });
  }
};
