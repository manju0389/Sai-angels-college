// middleware/upload.js
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { Readable } = require("stream");

// ================= MULTER =================
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ================= CLOUDINARY UPLOAD =================
/**
 * Uploads a buffer to Cloudinary with automatic type detection
 * and folder organization.
 *
 * @param {Buffer} buffer - File buffer
 * @param {string} baseFolder - Base folder in Cloudinary (default: "gallery")
 * @param {string} mimetype - Optional file mimetype for type detection
 * @returns {Promise<object>} - Cloudinary upload result
 */
const uploadToCloudinary = (buffer, baseFolder = "gallery", mimetype = "") => {
  return new Promise((resolve, reject) => {
    // Detect resource type
    let resource_type = "image"; // default
    let folder = `${baseFolder}/images`;

    if (mimetype.startsWith("video")) {
      resource_type = "video";
      folder = `${baseFolder}/videos`;
    }

    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type,
        folder,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    const readable = new Readable();
    readable.push(buffer);
    readable.push(null);
    readable.pipe(stream);
  });
};

module.exports = { upload, uploadToCloudinary };