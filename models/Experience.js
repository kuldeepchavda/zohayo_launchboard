const mongoose = require("mongoose");
const { stringify } = require("uuid");
const Schema = mongoose.Schema;

const userExperienceSchema = new Schema({
  userId: {
    type: String,
  },
  experienceId: {
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
  link: {
    type: String,
  },
  skills: {
    type: [String],
  },
  jobType: {
    type: String,
    // enum: ["Full-Time", "Part-Time", "Grant", "Bounty"],
  },
  fromDate: {
    type: String,
  },
  toDate: {
    type: String,
  },
  note: {
    type: String,
  },

  createdOn: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("UserProfile", userExperienceSchema);
