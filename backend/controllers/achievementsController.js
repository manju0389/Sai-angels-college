// controllers/achievementsController.js
const fs = require("fs");
const path = require("path");
const { uploadToCloudinary } = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");

// Path to JSON data
const DATA_FILE = path.join(__dirname, "../data/achievements.json");

// Ensure data folder exists
if (!fs.existsSync(path.dirname(DATA_FILE))) fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });

// ------------------------------
// Helper: Read achievements JSON
// ------------------------------
const readData = () => {
  if (!fs.existsSync(DATA_FILE)) return [];
  const content = fs.readFileSync(DATA_FILE, "utf-8");
  return content ? JSON.parse(content) : [];
};

// ------------------------------
// Helper: Write achievements JSON
// ------------------------------
const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// ------------------------------
// Upload achievements with auto-resize
// ------------------------------
exports.uploadAchievements = async (req, res) => {
  try {
    const { year } = req.body;
    if (!year) return res.status(400).json({ message: "Year is required" });
    if (!req.files || req.files.length === 0)
      return res.status(400).json({ message: "No files uploaded" });

    const MAX_SIZE = 5 * 1024 * 1024; // 5 MB limit only here
    const MAX_DIMENSION = 1024; // Cloudinary resize
    const data = readData();
    const uploaded = [];
    const skipped = [];

    for (let file of req.files) {
      if (file.size > MAX_SIZE) {
        skipped.push(file.originalname);
        continue; // skip this file
      }

      const result = await uploadToCloudinary(file.buffer, `achievements/${year}`, file.mimetype, true, {
        transformation: { width: MAX_DIMENSION, height: MAX_DIMENSION, crop: "limit" },
      });

      const item = {
        id: Date.now() + Math.random(),
        url: result.secure_url,
        year,
        public_id: result.public_id,
        type: "image",
      };

      data.push(item);
      uploaded.push(item);
    }

    writeData(data);

    let message = uploaded.length ? `Uploaded ${uploaded.length} file(s).` : "No files were uploaded.";

    if (skipped.length) {
      return res.status(400).json({
        message: `${message} Skipped file(s) >5 MB: ${skipped.join(", ")}`,
        uploaded,
        skipped,
      });
    }

    res.status(201).json({ message, uploaded });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// ------------------------------
// Get achievements grouped by year
// ------------------------------
exports.getAchievements = (req, res) => {
  const data = readData();

  // Group by year
  const grouped = data.reduce((acc, item) => {
    acc[item.year] = acc[item.year] || [];
    acc[item.year].push(item);
    return acc;
  }, {});

  // Sort years descending (latest first)
  const sortedGrouped = {};
  Object.keys(grouped)
    .sort((a, b) => parseInt(b, 10) - parseInt(a, 10))
    .forEach((yr) => {
      sortedGrouped[yr] = grouped[yr];
    });

  res.json(sortedGrouped);
};

// ------------------------------
// Delete achievements by year
// ------------------------------
exports.deleteAchievementsByYear = async (req, res) => {
  try {
    const { year } = req.params;
    let data = readData();

    const toDelete = data.filter((i) => i.year === year);

    for (let item of toDelete) {
      if (item.public_id) {
        await cloudinary.uploader.destroy(item.public_id, { resource_type: "image" });
      }
    }

    data = data.filter((i) => i.year !== year);
    writeData(data);

    res.json({ message: `Deleted achievements for year ${year}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// ------------------------------
// Update year for a single achievement
// ------------------------------
exports.updateAchievementYear = (req, res) => {
  try {
    const { id } = req.params;
    const { year } = req.body;
    if (!year) return res.status(400).json({ message: "Year is required" });

    const data = readData();
    const index = data.findIndex((item) => item.id == id); // loose equality handles number/string
    if (index === -1) return res.status(404).json({ message: "Achievement not found" });

    data[index].year = year;
    writeData(data);

    res.json({ message: "Year updated successfully", item: data[index] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};