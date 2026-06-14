const fs = require("fs-extra");
const path = require("path");
const bcrypt = require("bcryptjs");
const readline = require("readline");

const filePath = path.join(__dirname, "data", "users.json");

console.log("Editing:", filePath);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = (q) => new Promise(res => rl.question(q, res));

async function main() {
  const username = await ask("Username: ");
  const newPassword = await ask("New Password: ");

  const data = await fs.readFile(filePath, "utf8");
  const users = JSON.parse(data);

 const user = users.find(u => u.username === username);

if (!user) {
  console.log("❌ User not found");
  rl.close();
  return;
}

// ✅ ADD HERE (before changing password)
console.log("Before:", user.password);

// Hash new password
user.password = await bcrypt.hash(newPassword, 10);

// ✅ ADD HERE (after changing password)
console.log("After:", user.password);

  await fs.writeFile(filePath, JSON.stringify(users, null, 2));

  console.log("✅ Password updated");

  rl.close();
}

main();