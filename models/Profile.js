const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    firstName: {
      type: String,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    country: {
      id: Number,
      name: String,
    },
    state: {
      id: Number,
      name: String,
    },
    city: {
      id: Number,
      name: String,
    },
    language: {
      name: String,
      code:String
    },
    bio: {
      type: String,
    },
    socialLinks: {
      twitter: { type: String },
      github: { type: String },
      discord: { type: String },
      linkedin: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile-launchboard", profileSchema);
