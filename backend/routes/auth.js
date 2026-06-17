const express = require("express");
const router = express.Router();
const fs = require("fs-extra");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const filePath = path.join(__dirname, "..", "data", "users.json");

// helper
const readUsers = async () => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data || "[]");
  } catch (err) {
    console.log("READ ERROR:", err.message);
    return [];
  }
};

// ================= REGISTER =================
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const users = await readUsers();

  const exists = users.find(u => u.username === username);
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);

  users.push({
    id: Date.now(),
    username,
    password: hashed
  });

  await fs.writeFile(filePath, JSON.stringify(users, null, 2));

  res.json({ message: "User created" });
});

// ================= LOGIN (PASTE HERE) =================
router.post("/login", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { username, password } = req.body;

    console.log("USERNAME:", username);
    console.log("PASSWORD:", password);

    const users = await readUsers();
    console.log("USERS:", users);

    const user = users.find(u => u.username === username);

    if (!user) {
      console.log("USER NOT FOUND");
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("PASSWORD MATCH:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("LOGIN SUCCESS");

    return res.json({ token, user });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;