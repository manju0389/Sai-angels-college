const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { Readable } = require("stream");

// ================= MULTER =================
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ================= CLOUDINARY UPLOAD =================
const uploadToCloudinary = (buffer, folder = "gallery") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder, // dynamic folder
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