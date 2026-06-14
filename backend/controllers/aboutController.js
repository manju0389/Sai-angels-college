const fs = require("fs");
const path = require("path");
const { uploadToCloudinary } = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");

const DB_FILE = path.join(__dirname, "../data/about.json");

// ------------------- Helpers -------------------
const readData = () => {
  try {
    if (!fs.existsSync(DB_FILE)) return [];
    const file = fs.readFileSync(DB_FILE, "utf-8");
    return file ? JSON.parse(file) : [];
  } catch {
    return [];
  }
};

const writeData = (data) => {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// ------------------- CREATE -------------------
exports.createAbout = async (req, res) => {
  try {
    const { name, designation, message } = req.body;
    if (!req.file) return res.status(400).json({ error: "Image required" });

    const result = await uploadToCloudinary(req.file.buffer, "faculty", req.file.mimetype, false);

    const newItem = {
      id: Date.now(),
      name,
      designation,
      message: typeof message === "string" ? JSON.parse(message || "[]") : message || [],
      image: result.secure_url,
      public_id: result.public_id,
    };

    const data = readData();
    data.push(newItem);
    writeData(data);

    res.json({ message: "Added", data: newItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// ------------------- GET -------------------
exports.getAbout = (req, res) => {
  res.json(readData());
};

// ------------------- UPDATE -------------------
exports.updateAbout = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, designation, message } = req.body;

    let data = readData();
    const index = data.findIndex((i) => i.id === id);
    if (index === -1) return res.status(404).json({ error: "Not found" });

    if (name) data[index].name = name;
    if (designation) data[index].designation = designation;
    if (message) {
      data[index].message = typeof message === "string" ? JSON.parse(message || "[]") : message;
    }

    // If new image uploaded → replace on Cloudinary
    if (req.file) {
      // Delete old image if exists
      if (data[index].public_id) {
        await cloudinary.uploader.destroy(data[index].public_id, { resource_type: "image" });
      }

      const result = await uploadToCloudinary(req.file.buffer, "faculty", req.file.mimetype, false);
      data[index].image = result.secure_url;
      data[index].public_id = result.public_id;
    }

    writeData(data);
    res.json({ message: "Updated", data: data[index] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// ------------------- DELETE -------------------
exports.deleteAbout = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    let data = readData();
    const index = data.findIndex((i) => i.id === id);

    if (index === -1) return res.status(404).json({ error: "Not found" });

    // Delete image from Cloudinary
    if (data[index].public_id) {
      await cloudinary.uploader.destroy(data[index].public_id, { resource_type: "image" });
    }

    // Remove from JSON
    data.splice(index, 1);
    writeData(data);

    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};