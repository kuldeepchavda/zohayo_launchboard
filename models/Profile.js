const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    name: {
      type: String,
    },
    bio: {
      type: String,
    },
    socials: {
      type: [String],
    },
    projectLink: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
