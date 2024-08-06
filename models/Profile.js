const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    firstName: {
      type: String,
      // required: true,
      trim: true,
    },
    middleName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      // required: true,
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
      id: { type: Number, required: true },
      name: { type: String, required: true },
    },
    state: {
      id: { type: Number, required: true },
      name: { type: String, required: true },
    },
    city: {
      id: { type: Number, required: true },
      name: { type: String, required: true },
    },
    language: {
      name: { type: String, required: true },
      code: { type: String, required: true, uppercase: true },
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
