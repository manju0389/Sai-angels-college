const mongoose = require("mongoose");

// ==========================================
// STUDENT RESULT SCHEMA
// ==========================================

const studentResultSchema = new mongoose.Schema(
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

const resultSchema = new mongoose.Schema(
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
      type: [studentResultSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Result",
  resultSchema
);
