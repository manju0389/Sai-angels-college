const express = require("express");
const fs = require("fs-extra");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
const filePath = path.join(__dirname, "..", "data", "users.json");

// Helper
const readUsers = async () => {
  const data = await fs.readFile(filePath, "utf8");
  return JSON.parse(data);
};
const writeUsers = async (users) => {
  await fs.writeFile(filePath, JSON.stringify(users, null, 2));
};

// Register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const users = await readUsers();
  if (users.find(u => u.username === username))
    return res.status(400).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const id = users.length ? users[users.length - 1].id + 1 : 1;

  users.push({ id, username, password: hashed });
  await writeUsers(users);

  res.json({ message: "User created" });
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const users = await readUsers();
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ token, user: { id: user.id, username: user.username } });
});

module.exports = router;