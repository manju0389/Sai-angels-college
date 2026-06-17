const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { Readable } = require("stream");

// ================= MULTER =================
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ================= CLOUDINARY UPLOAD =================
/**
 * Uploads a buffer to Cloudinary with automatic type detection
 * and optional folder structure.
 *
 * @param {Buffer} buffer - File buffer
 * @param {string} folder - Target folder in Cloudinary
 * @param {string} mimetype - File mimetype
 * @param {boolean} useSubfolder - Whether to add /images or /videos subfolder
 * @returns {Promise<object>} - Cloudinary upload result
 */
const uploadToCloudinary = (buffer, folder = "gallery", mimetype = "", useSubfolder = true) => {
  return new Promise((resolve, reject) => {
    let resource_type = "image";
    let finalFolder = folder;

    if (useSubfolder) {
      if (mimetype.startsWith("video")) {
        resource_type = "video";
        finalFolder = `${folder}/videos`;
      } else {
        finalFolder = `${folder}/images`;
      }
    } else {
      // Keep exactly as provided
      resource_type = mimetype.startsWith("video") ? "video" : "image";
      finalFolder = folder;
    }

    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type,
        folder: finalFolder,
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
