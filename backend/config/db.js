const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  console.log("MongoDB diagnostic:", {
    variableExists: Boolean(uri),
    variableLength: uri?.length ?? 0,
    matchingKeys: Object.keys(process.env).filter(
      (key) => key.toLowerCase().includes("mongo")
    ),
  });

  if (!uri) {
    console.error("MongoDB URI unavailable to Node.js.");
    return; // Keep the server alive for diagnosis
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

module.exports = connectDB;
