
const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  console.log("Runtime environment check:", {
    nodeEnv: process.env.NODE_ENV,
    mongoUriExists: Boolean(mongoUri),
    mongoUriLength: mongoUri ? mongoUri.length : 0,
  });

  if (!mongoUri) {
    console.error(
      "MONGODB_URI is missing. Check Render Environment settings."
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
