const { uploadToCloudinary } = require("../middleware/upload");

exports.uploadUserImage = async (req, res) => {
  try {
    const result = await uploadToCloudinary(req.file.buffer);

    res.json({
      message: "Uploaded successfully",
      image: result.secure_url,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

