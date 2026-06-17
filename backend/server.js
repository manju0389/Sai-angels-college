require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

const videoRoutes = require("./routes/videoRoutes");
const authRoutes = require("./routes/auth");
const galleryRoutes = require("./routes/galleryRoutes");
const achievementsRoutes = require("./routes/achievementsRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const homeRoutes = require("./routes/homeRoutes");
const { verifyToken } = require("./middleware/authMiddleware");

const app = express();

// ================= DATABASE =================
connectDB();

// ================= CORS =================
app.use(
cors({
origin: [
"http://localhost:5173",
"https://sai-angels-college-ysdr.onrender.com",
"https://sai-angels-college.onrender.com"
],
credentials: true,
methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
allowedHeaders: ["Content-Type", "Authorization"],
})
);


// ================= MIDDLEWARE =================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= STATIC FILES =================
app.use(
"/uploads",
express.static(path.join(__dirname, "uploads"))
);

// ================= ROUTES =================
app.use("/api/videos", videoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/achievements", achievementsRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api", homeRoutes);

// ================= PROTECTED ROUTE =================
app.get("/api/protected", verifyToken, (req, res) => {
res.json({ message: "You are authorized!", user: req.user });
});

// ================= ERROR HANDLER =================
app.use((err, req, res, next) => {
console.error("🔥 Server Error:", err.stack);
res.status(500).json({
message: "Internal Server Error",
});
});

// ================= START SERVER =================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log(`🚀 Server running on port ${PORT}`);
});
