const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const User = require("../models/Users");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const dotenv = require("dotenv");
dotenv.config();
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

module.exports = (passport) => {
  passport.use(
    "signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        // use 'email' here
        try {
          const user = await User.findOne({ email }); // use 'email' here
          if (user) {
            return done(null, false, { message: "Email already taken" });
          }
          const newUser = new User({
            email,
            username: req.body.username,
            password,
          });
          await newUser.save();
          return done(null, newUser);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });
          if (!user) {
            return done(null, false, { message: "User not found" });
          }
          const isMatch = await user.comparePassword(password);
          if (!isMatch) {
            return done(null, false, { message: "Incorrect password" });
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.use(
    new JwtStrategy(opts, async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.id);
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (err) {
        return done(err, false);
      }
    })
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: "1818946955277721600-dgE1bGniwLwzT1eMjr5muX8FET7oTQ",
        clientSecret: "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",
        callbackURL:
          "https://zohayo-launchboard.vercel.app/auth/google/callback",
        passReqToCallback: true,
      },
      function (request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
      }
    )
  );

  passport.use(
    new TwitterStrategy(
      {
        consumerKey: "WUNwcFhMU2cyblE5ckNydC16U3U6MTpjaQ",
        consumerSecret: "HK16_iPFHIIoScfRHTIlNhIaUM_88swxwpIxc2l9IKqeYD7wG7",
        callbackURL: "http://localhost:8080/auth/twitter/callback",
      },
      function (token, tokenSecret, profile, cb) {
        User.findOrCreate({ twitterId: profile.id }, function (err, user) {
          return cb(err, user);
        });
      }
    )
  );
};
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
