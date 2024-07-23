const mongoose = require("mongoose");
const { stringify } = require("uuid");
const Schema = mongoose.Schema;

const collaborators = new mongoose.Schema({
  imageUrl: {
    type: String,
  },
  contibutionIn: [String],
  name: { type: String },
  role: { type: String },
});

const userProjectSchema = new Schema({
  userId: {
    type: String,
  },
  projectId: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  type: {
    type: String,
  },
  subHeading: {
    type: String,
  },
  title: { type: String },
  description: {
    type: String,
  },
  stageOfProject: {
    type: String,
  },
  upVotes: {
    type: Number,
  },
  category: {
    type: [String],
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  link: {
    type: String,
  },
  socials: [String],
  peoples:[collaborators]
});

module.exports = mongoose.model("project-launcboard", userProjectSchema);
