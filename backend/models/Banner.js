const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    image: String,
    cloudinary_id: String,
    media_type: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Banner", bannerSchema);