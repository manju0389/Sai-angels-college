const fs = require("fs");
const path = require("path");

const DB_FILE = path.join(__dirname, "../videos.json");

const readVideos = () => {
  if (!fs.existsSync(DB_FILE)) return [];
  return JSON.parse(fs.readFileSync(DB_FILE));
};

const saveVideos = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// GET
exports.getVideos = (req, res) => {
  res.json(readVideos());
};

// ADD
exports.addVideo = (req, res) => {
  const { title, link, date } = req.body;

  const match = link.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (!match) return res.status(400).json({ message: "Invalid link" });

  const newVideo = {
    _id: Date.now().toString(),
    title,
    videoId: match[1],
    date,
  };

  const videos = readVideos();
  videos.push(newVideo);
  saveVideos(videos);

  res.json(newVideo);
};

// DELETE
exports.deleteVideo = (req, res) => {
  let videos = readVideos();

  videos = videos.filter((v) => v._id !== req.params.id);

  saveVideos(videos);

  res.json({ message: "Deleted" });
};

// UPDATE TITLE ⭐ IMPORTANT
exports.updateVideoTitle = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const videos = readVideos();

  const index = videos.findIndex((v) => v._id === id);

  if (index === -1)
    return res.status(404).json({ message: "Video not found" });

  videos[index].title = title;

  saveVideos(videos);

  res.json({ message: "Updated", video: videos[index] });
};
