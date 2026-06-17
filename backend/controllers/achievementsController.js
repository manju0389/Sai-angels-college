const cloudinary = require("../config/cloudinary");
const { uploadToCloudinary } = require("../middleware/upload");

const Achievement = require("../models/Achievement");

// ================= CLOUDINARY UPLOAD =================
const uploadImage = async (file, folder) => {
  if (!file) return null;

  const result = await uploadToCloudinary(
    file.buffer,
    folder,
    file.mimetype
  );

  return {
    id: result.public_id,
    url: result.secure_url,
    type: result.resource_type,
  };
};

// ================= UPLOAD =================
exports.uploadAchievements = async (req, res) => {
  try {
    const { year } = req.body;

    if (!year) {
      return res.status(400).json({ message: "Year required" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const uploadedItems = [];

    for (const file of req.files) {
      const uploaded = await uploadImage(
        file,
        `achievements/${year}`
      );

      const item = await Achievement.create({
        year,
        url: uploaded.url,
        public_id: uploaded.id,
        type: uploaded.type,
      });

      uploadedItems.push(item);
    }

    res.json({
      message: "Uploaded successfully",
      uploaded: uploadedItems,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// ================= GET =================
exports.getAchievements = async (req, res) => {
  try {
    const data = await Achievement.find().sort({ createdAt: -1 });

    const grouped = {};

    data.forEach((item) => {
      if (!grouped[item.year]) grouped[item.year] = [];
      grouped[item.year].push(item);
    });

    const sorted = Object.keys(grouped)
      .sort((a, b) => b - a)
      .reduce((acc, key) => {
        acc[key] = grouped[key];
        return acc;
      }, {});

    res.json(sorted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= DELETE =================
exports.deleteAchievementById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Achievement.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Not found" });
    }

    if (item.public_id) {
      await cloudinary.uploader.destroy(item.public_id, {
        resource_type: "image",
      });
    }

    await Achievement.findByIdAndDelete(id);

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= UPDATE YEAR =================
exports.updateAchievementYear = async (req, res) => {
  try {
    const { id } = req.params;
    const { year } = req.body;

    if (!year) {
      return res.status(400).json({ message: "Year required" });
    }

    const updated = await Achievement.findByIdAndUpdate(
      id,
      { year },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ message: "Updated", item: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};