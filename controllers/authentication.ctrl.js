const jwt = require("jsonwebtoken");
const passport = require("passport");
const getJWT = require("../utils/getJWT")
const {v4:uuid} = require("uuid")
exports.signup = (req, res, next) => {
  passport.authenticate("signup", (err, user, info) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ message: "An error occurred", err });
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }
    return res
      .status(200)
      .json({ message: "Signup successful", userId: user });
  })(req, res, next);
};

exports.login = (req, res, next) => {
  passport.authenticate("login", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "An error occurred", err });
    }
    if (!user) {
      return res.status(400).json({ message: info });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        return res.status(500).json({ message: "An error occurred", err });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      // const token = getJWT(user._id,user.email)
      return res.status(200).json({ message: "Login successful", token });
    });
  })(req, res, next);
};

// exports.loginWithGoogle =(req,res)=>{
//   passport.authenticate('google', { scope: [ 'email', 'profile' ] })
// }