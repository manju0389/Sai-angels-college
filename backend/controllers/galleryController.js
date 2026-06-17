const cloudinary = require("../config/cloudinary");
const { uploadToCloudinary } = require("../middleware/upload");

const Gallery = require("../models/Gallery");

// ================= UPLOAD =================
exports.uploadGallery = async (req, res) => {
  try {
    const { caption } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const uploadedItems = [];

    for (const file of files) {
      const result = await uploadToCloudinary(
        file.buffer,
        "gallery",
        file.mimetype
      );

      const item = await Gallery.create({
        url: result.secure_url,
        caption: caption || "",
        public_id: result.public_id,
        type: result.resource_type,
      });

      uploadedItems.push(item);
    }

    res.json({
      message: "Uploaded successfully",
      data: uploadedItems,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// ================= GET =================
exports.getGallery = async (req, res) => {
  try {
    const data = await Gallery.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= UPDATE CAPTION =================
exports.updateCaption = async (req, res) => {
  try {
    const { id } = req.params;
    const { caption } = req.body;

    if (!caption) {
      return res.status(400).json({ error: "New caption required" });
    }

    const updated = await Gallery.findByIdAndUpdate(
      id,
      { caption },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json({ message: "Caption updated", item: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= DELETE =================
exports.deleteByCaption = async (req, res) => {
  try {
    const { caption } = req.params;

    const items = await Gallery.find({ caption });

    if (!items.length) {
      return res.status(404).json({ error: "Not found" });
    }

    for (const item of items) {
      if (item.public_id) {
        await cloudinary.uploader.destroy(item.public_id, {
          resource_type: item.type === "video" ? "video" : "image",
        });
      }

      await Gallery.findByIdAndDelete(item._id);
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};