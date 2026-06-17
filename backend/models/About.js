const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  {
    name: String,
    designation: String,
    message: [String],
    image: String,
    public_id: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("About", aboutSchema);