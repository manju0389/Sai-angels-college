const mongoose = require("mongoose");

// ==========================================
// STUDENT RESULT SCHEMA
// ==========================================

const studentBResultSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
      trim: true,
    },

    className: {
      type: String,
      required: true,
      trim: true,
    },

    score: {
      type: String,
      required: true,
      trim: true,
    },

    rank: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    cloudinary_id: {
      type: String,
      default: "",
    },

    media_type: {
      type: String,
      default: "image",
    },
  },
  {
    timestamps: true,
  }
);

// ==========================================
// RESULT SECTION SCHEMA
// ==========================================

const bresultSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    students: {
      type: [studentBResultSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "BResult",
  bresultSchema
);
