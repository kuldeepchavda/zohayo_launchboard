const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    firstName: {
      type: String,
<<<<<<< HEAD
      // required: true,
=======
>>>>>>> bcdfd46163b4be4e7d7edad48c23f0c2b27d544b
      trim: true,
    },
    middleName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
<<<<<<< HEAD
      // required: true,
=======
>>>>>>> bcdfd46163b4be4e7d7edad48c23f0c2b27d544b
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    country: {
      id: { type: Number },
      name: { type: String },
    },
    state: {
      id: { type: Number },
      name: { type: String },
    },
    city: {
      id: { type: Number },
      name: { type: String },
    },
    language: {
      name: { type: String },
      code: { type: String },
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    socialLinks: {
      twitter: { type: String, trim: true },
      github: { type: String, trim: true },
      discord: { type: String, trim: true },
      linkedin: { type: String, trim: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
