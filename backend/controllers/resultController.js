const Result = require("../models/Result");

const { uploadToCloudinary } = require("../middleware/upload");

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
        mediaType === "video" ? "video" : "image",
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
    const results = await Result.find().sort({
      createdAt: -1,
    });

    res.status(200).json(results);
  } catch (error) {
    console.error("Get Results Error:", error);

    res.status(500).json({
      message: "Failed to fetch results",
    });
  }
};

// ==========================================
// GET SINGLE RESULT SECTION
// ==========================================

exports.getResult = async (req, res) => {
  try {
    const result = await Result.findById(
      req.params.id
    );

    if (!result) {
      return res.status(404).json({
        message: "Result section not found",
      });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(
      "Get Single Result Error:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch result",
    });
  }
};

// ==========================================
// CREATE SECTION
// ==========================================

exports.createSection = async (req, res) => {
  try {
    const {
      title,
      description,
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Section title is required",
      });
    }

    const existingSection =
      await Result.findOne({
        title: title.trim(),
      });

    if (existingSection) {
      return res.status(409).json({
        message: "A section with this title already exists",
      });
    }

    const result = await Result.create({
      title: title.trim(),
      description: description || "",
      students: [],
    });

    res.status(201).json({
      message: "Section created successfully",
      result,
    });
  } catch (error) {
    console.error(
      "Create Section Error:",
      error
    );

    res.status(500).json({
      message: "Failed to create section",
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
    } = req.body;

    if (!title || !title.trim()) {
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

    section.title = title.trim();
    section.description =
      description || "";

    await section.save();

    res.status(200).json({
      message: "Section updated successfully",
      result: section,
    });
  } catch (error) {
    console.error(
      "Update Section Error:",
      error
    );

    res.status(500).json({
      message: "Failed to update section",
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

    // --------------------------------------
    // DELETE ALL SECTION IMAGES FROM CLOUDINARY
    // --------------------------------------

    for (const student of section.students) {
      if (student.cloudinary_id) {
        await deleteCloudinaryImage(
          student.cloudinary_id,
          student.media_type
        );
      }
    }

    // --------------------------------------
    // DELETE SECTION FROM MONGODB
    // --------------------------------------

    await Result.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message:
        "Section and all associated images deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete Section Error:",
      error
    );

    res.status(500).json({
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

    if (!req.body.studentName) {
      return res.status(400).json({
        message: "Student name is required",
      });
    }

    if (!req.body.className) {
      return res.status(400).json({
        message: "Class / course is required",
      });
    }

    if (!req.body.score) {
      return res.status(400).json({
        message: "Result is required",
      });
    }

    if (!req.body.rank) {
      return res.status(400).json({
        message: "Rank / achievement is required",
      });
    }

    let uploaded = null;

    // --------------------------------------
    // UPLOAD IMAGE
    // --------------------------------------

    if (req.file) {
      uploaded = await uploadImage(req.file);
    }

    // --------------------------------------
    // CREATE STUDENT
    // --------------------------------------

    section.students.push({
      studentName:
        req.body.studentName.trim(),

      className:
        req.body.className.trim(),

      score:
        req.body.score.trim(),

      rank:
        req.body.rank.trim(),

      image:
        uploaded?.url || "",

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

    res.status(201).json({
      message: "Student added successfully",
      student: newStudent,
      result: section,
    });
  } catch (error) {
    console.error(
      "Create Student Error:",
      error
    );

    res.status(500).json({
      message: "Failed to add student",
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

    // --------------------------------------
    // UPDATE TEXT FIELDS
    // --------------------------------------

    if (req.body.studentName !== undefined) {
      student.studentName =
        req.body.studentName.trim();
    }

    if (req.body.className !== undefined) {
      student.className =
        req.body.className.trim();
    }

    if (req.body.score !== undefined) {
      student.score =
        req.body.score.trim();
    }

    if (req.body.rank !== undefined) {
      student.rank =
        req.body.rank.trim();
    }

    // --------------------------------------
    // REPLACE IMAGE
    // --------------------------------------

    if (req.file) {
      // Delete old Cloudinary image first
      if (student.cloudinary_id) {
        await deleteCloudinaryImage(
          student.cloudinary_id,
          student.media_type
        );
      }

      // Upload new image
      const uploaded =
        await uploadImage(req.file);

      student.image =
        uploaded.url;

      student.cloudinary_id =
        uploaded.id;

      student.media_type =
        uploaded.type;
    }

    await section.save();

    res.status(200).json({
      message: "Student updated successfully",
      student,
      result: section,
    });
  } catch (error) {
    console.error(
      "Update Student Error:",
      error
    );

    res.status(500).json({
      message: "Failed to update student",
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

    // --------------------------------------
    // DELETE CLOUDINARY IMAGE
    // --------------------------------------

    if (student.cloudinary_id) {
      await deleteCloudinaryImage(
        student.cloudinary_id,
        student.media_type
      );
    }

    // --------------------------------------
    // DELETE STUDENT FROM MONGODB
    // --------------------------------------

    student.deleteOne();

    await section.save();

    res.status(200).json({
      message:
        "Student and image deleted successfully",
      result: section,
    });
  } catch (error) {
    console.error(
      "Delete Student Error:",
      error
    );

    res.status(500).json({
      message: "Failed to delete student",
    });
  }
};
