const cloudinary = require("../config/cloudinary");
const { uploadToCloudinary } = require("../middleware/upload");

const About = require("../models/About");

// ================= UPLOAD HELPER =================
const uploadImage = async (file) => {
  if (!file) return null;

  const result = await uploadToCloudinary(
    file.buffer,
    "faculty",
    file.mimetype,
    false
  );

  return {
    url: result.secure_url,
    id: result.public_id,
  };
};

// ================= CREATE =================
exports.createAbout = async (req, res) => {
  try {
    const { name, designation, message } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Image required" });
    }

    const uploaded = await uploadImage(req.file);

    const about = await About.create({
      name,
      designation,
      message:
        typeof message === "string"
          ? JSON.parse(message || "[]")
          : message || [],
      image: uploaded.url,
      public_id: uploaded.id,
    });

    res.json({ message: "Added", data: about });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= GET =================
exports.getAbout = async (req, res) => {
  try {
    const data = await About.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= UPDATE =================
exports.updateAbout = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, designation, message } = req.body;

    const about = await About.findById(id);

    if (!about) {
      return res.status(404).json({ error: "Not found" });
    }

    let image = about.image;
    let public_id = about.public_id;

    // update image if new file uploaded
    if (req.file) {
      if (about.public_id) {
        await cloudinary.uploader.destroy(about.public_id, {
          resource_type: "image",
        });
      }

      const uploaded = await uploadImage(req.file);
      image = uploaded.url;
      public_id = uploaded.id;
    }

    const updated = await About.findByIdAndUpdate(
      id,
      {
        name: name || about.name,
        designation: designation || about.designation,
        message:
          typeof message === "string"
            ? JSON.parse(message || "[]")
            : message || about.message,
        image,
        public_id,
      },
      { new: true }
    );

    res.json({ message: "Updated", data: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= DELETE =================
exports.deleteAbout = async (req, res) => {
  try {
    const { id } = req.params;

    const about = await About.findById(id);

    if (!about) {
      return res.status(404).json({ error: "Not found" });
    }

    if (about.public_id) {
      await cloudinary.uploader.destroy(about.public_id, {
        resource_type: "image",
      });
    }

    await About.findByIdAndDelete(id);

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};