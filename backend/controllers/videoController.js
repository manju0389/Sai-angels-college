const Video = require("../models/Video");

// ================= GET =================
exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= ADD =================
exports.addVideo = async (req, res) => {
  try {
    const { title, link, date } = req.body;

    const match = link.match(
      /(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );

    if (!match) {
      return res.status(400).json({ message: "Invalid link" });
    }

    const video = await Video.create({
      title,
      videoId: match[1],
      date,
    });

    res.json(video);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= DELETE =================
exports.deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findById(id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    await Video.findByIdAndDelete(id);

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= UPDATE TITLE =================
exports.updateVideoTitle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const video = await Video.findById(id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    video.title = title;
    await video.save();

    res.json({ message: "Updated", video });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
