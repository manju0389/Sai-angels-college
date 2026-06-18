const { uploadToCloudinary } = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");

const Banner = require("../models/Banner");
const Student = require("../models/Student");

// ================= CLOUD UPLOAD =================
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

// ================= BANNER =================

// CREATE
exports.uploadBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image required" });
    }

    const uploaded = await uploadImage(req.file, "banners");

    if (!uploaded) {
      return res.status(500).json({ error: "Upload failed" });
    }

    const banner = await Banner.create({
      title: req.body.title,
      description: req.body.description,
      image: uploaded.url,
      cloudinary_id: uploaded.id,
      media_type: uploaded.type,
    });

    res.json(banner);
  } catch (err) {
    console.error("Banner Upload Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// GET
exports.getBanners = async (req, res) => {
  try {
    const data = await Banner.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({ error: "Not found" });

    let image = banner.image;
    let cloudinary_id = banner.cloudinary_id;
    let media_type = banner.media_type;

    if (req.file) {
      if (banner.cloudinary_id) {
        await cloudinary.uploader.destroy(banner.cloudinary_id, {
          resource_type: banner.media_type === "video" ? "video" : "image",
        });
      }

      const uploaded = await uploadImage(req.file, "banners");

      image = uploaded.url;
      cloudinary_id = uploaded.id;
      media_type = uploaded.type;
    }

    const updated = await Banner.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        image,
        cloudinary_id,
        media_type,
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({ error: "Not found" });

    if (banner.cloudinary_id) {
      await cloudinary.uploader.destroy(banner.cloudinary_id, {
        resource_type: banner.media_type === "video" ? "video" : "image",
      });
    }

    await Banner.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= STUDENTS =================

exports.uploadStudent = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image required" });
    }

    const uploaded = await uploadImage(req.file, "students");

    const student = await Student.create({
      name: req.body.name,
      stream: req.body.stream,
      rank: req.body.rank,
      image: uploaded.url,
      cloudinary_id: uploaded.id,
      media_type: uploaded.type,
    });

    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStudents = async (req, res) => {
  const data = await Student.find().sort({ createdAt: -1 });
  res.json(data);
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: "Not found" });

    let image = student.image;
    let cloudinary_id = student.cloudinary_id;
    let media_type = student.media_type;

    if (req.file) {
      if (student.cloudinary_id) {
        await cloudinary.uploader.destroy(student.cloudinary_id, {
          resource_type: student.media_type === "video" ? "video" : "image",
        });
      }

      const uploaded = await uploadImage(req.file, "students");

      image = uploaded.url;
      cloudinary_id = uploaded.id;
      media_type = uploaded.type;
    }

    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        stream: req.body.stream,
        rank: req.body.rank,
        image,
        cloudinary_id,
        media_type,
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: "Not found" });

    if (student.cloudinary_id) {
      await cloudinary.uploader.destroy(student.cloudinary_id, {
        resource_type: student.media_type === "video" ? "video" : "image",
      });
    }

    await Student.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
