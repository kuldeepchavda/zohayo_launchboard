const passport = require("passport");
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authentication.ctrl");
const User = require("../models/Users");
const getJWT = require("../utils/getJWT")
require("../config/passportConfig")(passport);
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/signin_with_google", (req, res) => {
  res.send('<a href="/auth/google">Sign in with google</a>');
});
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/got_from_google",
    failureRedirect: "/auth/google/failure",
  })
);
router.get("/got_from_google", async (req, res) => {
    const email = req.user.emails[0].value;
    const user = await User.findOne({email:email})
    console.log(user)
    if (user){
        const token = getJWT(req.user.id,email)
        res.send({msg:"logged in",token})
    }else{
    const user = await User.create({email})
     const token = getJWT(req.user.id, email);
     res.send({ msg: "Signed up", token });
    }
  
});
router.route("/google/failure", (req, res) => {
  res.send("Got errror");
});
module.exports = router;
