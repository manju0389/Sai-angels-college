const bcrypt = require("bcryptjs");

bcrypt.hash("1234567890", 10).then(hash => {
  console.log(hash);
});