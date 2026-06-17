const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: String,
    stream: String,
    rank: String,
    image: String,
    cloudinary_id: String,
    media_type: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);