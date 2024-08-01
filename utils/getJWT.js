const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
dotenv.config();
const getJWT = (id, email) => {
  return jwt.sign({ id,email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};
module.exports = getJWT