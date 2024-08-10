const passport = require("passport");
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authentication.ctrl");
const User = require("../models/Users");
const getJWT = require("../utils/getJWT");
const Profile = require("../models/Profile");
const { v4: uuid } = require("uuid");
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
  const user = await User.findOne({ email: email });
  // console.log(user);
  if (user) {
    console.log("got if");

    const token = getJWT(req.user.userId, email);
    // console.log(req.user)
    res
      // .status(200)
      .cookie("jwt", token)
      .cookie("userId", user.userId)
      // .send({ msg: "logged in", token, user });
    res.redirect("http://localhost:5173/");
  } else  {
    console.log("got else")
    const userId = uuid();
    const user = await User.create({ email, userId });
    const profile = await Profile.create({ email, userId });
    const token = getJWT(userId, email);
    res
      .status(200)
      .cookie("jwt", token)
      .cookie("userId", userId)
      // .json({ msg: "Signed up", token, user, profile });
      res.redirect("http://localhost:5173/");
    }
});
router.route("/google/failure", (req, res) => {
  res.send("Got errror");
});

router.get("/signin_with_twitter", (req, res) => {
  res.send('<a href="/auth/twitter">Sign in with Twitter</a>');
});

router.get("/twitter", passport.authenticate("twitter"));

router.get(
  "/twitter/callback",
  passport.authenticate("twitter",{
    successRedirect:"/auth/twitter/success",
    failureRedirect:"/auth/twitter/failure"
  })
);
router.get("/twitter/success",(async (req,res)=>{
// res.json(JSON.parse(req.user._raw))
res.cookie("msg","working fine")
res.redirect("http://localhost:5173/");

console.log(req)
}))

router.get("/signin_with_linkedin", (req, res) => {
  res.send('<a href="/auth/linkedin">Sign in with linkedin</a>');
});
router.get(
  "/linkedin",
  passport.authenticate("linkedin"),
);
router.get(
  "/linkedin/callback",
  passport.authenticate("linkedin", {
    successRedirect: "/auth/linkedin/success",
    failureRedirect: "/auth/linkedin/failure",
  })
);


router.get("/linkedin/success", async (req, res) => {
  res.json(req);
  console.log(req.user);
});
module.exports = router;
  // passport.authenticate("google", {
  //   successRedirect: "/auth/got_from_google",
  //   failureRedirect: "/auth/google/failure",
  // });