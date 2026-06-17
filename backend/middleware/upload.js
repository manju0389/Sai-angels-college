const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { Readable } = require("stream");

// ================= MULTER =================
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

// ================= CLOUDINARY UPLOAD =================
/**
 * Upload buffer to Cloudinary (image/video auto-detect safe)
 */
const uploadToCloudinary = (
  buffer,
  folder = "gallery",
  mimetype,
  useSubfolder = true
) => {
  return new Promise((resolve, reject) => {
    try {
      let resource_type = "image";
      let finalFolder = folder;

      // SAFE CHECK (prevents crash)
      const type = mimetype || "";

      if (useSubfolder) {
        if (type.startsWith("video")) {
          resource_type = "video";
          finalFolder = `${folder}/videos`;
        } else {
          finalFolder = `${folder}/images`;
        }
      } else {
        resource_type = type.startsWith("video") ? "video" : "image";
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
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  upload,
  uploadToCloudinary,
};
