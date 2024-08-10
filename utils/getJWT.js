const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
// app.use(cookieParser());
const dotenv = require("dotenv")
dotenv.config();
const getJWT = (userId, email) => {
  return jwt.sign({ userId,email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const getJWTData = (req,res)=>{
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imt1bGRlZXAyMjMxcWtAZ21haWwuY29tIiwiaWF0IjoxNzIzMzEyMzY3LCJleHAiOjE3MjMzMTU5Njd9.m-HIB7WKAJSbePw95kyA-DS5hVU5vZPHNUA_6J6CwT0";
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imt1bGRlZXAyMjMxcWtAZ21haWwuY29tIiwiaWF0IjoxNzIyNjMwMjY3LCJleHAiOjE3MjI2MzM4Njd9.Cen1GHEfsqAI6Iva6_FdyOpOc5ymUygaSb7aitOUnew";
console.log(jwt.verify(token,process.env.JWT_SECRET))
  }

  // getJWTData();
module.exports = getJWT;