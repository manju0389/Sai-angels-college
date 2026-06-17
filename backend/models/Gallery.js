const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    url: String,
    caption: String,
    public_id: String,
    type: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", gallerySchema);