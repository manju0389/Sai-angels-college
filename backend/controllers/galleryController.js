const fs = require("fs");
const path = require("path");
const { uploadToCloudinary } = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");

const DB_FILE = path.join(__dirname, "../data/gallery.json");

// -------------------- Read / Write JSON --------------------
const readData = () => {
  if (!fs.existsSync(DB_FILE)) return [];
  const file = fs.readFileSync(DB_FILE, "utf-8");
  return file ? JSON.parse(file) : [];
};

const writeData = (data) => {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// -------------------- UPLOAD --------------------
exports.uploadGallery = async (req, res) => {
  try {
    const { caption } = req.body;
    const files = req.files;

    if (!files?.length) return res.status(400).json({ error: "No files uploaded" });

    const uploaded = [];

    for (const file of files) {
      // Detects type automatically and stores in subfolder (images/videos)
      const result = await uploadToCloudinary(file.buffer, "gallery", file.mimetype);

      uploaded.push({
        id: result.public_id,   // Needed for deletion
        url: result.secure_url,
        caption,
        type: result.resource_type, // 'image' or 'video'
      });
    }

    const existing = readData();
    writeData([...existing, ...uploaded]);

    res.json({ message: "Uploaded successfully", data: uploaded });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// -------------------- GET --------------------
exports.getGallery = (req, res) => {
  res.json(readData());
};

// -------------------- UPDATE CAPTION --------------------
exports.updateCaption = (req, res) => {
  try {
    const oldCaption = decodeURIComponent(req.params.caption);
    const { caption: newCaption } = req.body;

    if (!newCaption || !newCaption.trim())
      return res.status(400).json({ error: "New caption required" });

    const data = readData();

    const updated = data.map((item) =>
      item.caption === oldCaption ? { ...item, caption: newCaption } : item
    );

    writeData(updated);
    res.json({ message: "Caption updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// -------------------- DELETE --------------------
exports.deleteByCaption = async (req, res) => {
  try {
    const caption = decodeURIComponent(req.params.caption);
    const data = readData();

    // Delete from Cloudinary first
    const toDelete = data.filter((img) => img.caption === caption);
    for (const img of toDelete) {
      if (img.id) {
        // Cloudinary resource_type must be 'image' or 'video'
        const type = img.type === "video" ? "video" : "image";
        await cloudinary.uploader.destroy(img.id, { resource_type: type });
      }
    }

    // Remove from JSON
    const filtered = data.filter((img) => img.caption !== caption);
    writeData(filtered);

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};