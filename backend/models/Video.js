const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: String,
    videoId: String,
    date: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);