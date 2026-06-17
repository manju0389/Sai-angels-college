const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
  {
    year: String,
    url: String,
    public_id: String,
    type: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Achievement", achievementSchema);