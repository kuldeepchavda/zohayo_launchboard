const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
dotenv.config();
const getJWT = (userId, email) => {
  return jwt.sign({ userId,email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const getJWTData = (req,res)=>{
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imt1bGRlZXAyMjMxcWtAZ21haWwuY29tIiwiaWF0IjoxNzIyNjMwMjY3LCJleHAiOjE3MjI2MzM4Njd9.Cen1GHEfsqAI6Iva6_FdyOpOc5ymUygaSb7aitOUnew";
console.log(jwt.verify(token,process.env.JWT_SECRET))
  }

  // getJWTData();
module.exports = getJWT