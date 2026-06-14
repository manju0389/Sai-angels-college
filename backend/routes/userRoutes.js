const express = require("express");
const router = express.Router();

const { upload } = require("../middleware/upload");
const { uploadUserImage } = require("../controllers/userController");

router.post("/upload", upload.single("image"), uploadUserImage);

module.exports = router;