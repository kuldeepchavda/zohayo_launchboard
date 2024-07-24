const mongoose = require("mongoose");
const { stringify } = require("uuid");
const Schema = mongoose.Schema;

const CollaboratorSchema = new Schema({
  imageUrl:{type:String},
  userId: { type: String, },
  name: { type: String, },
  role: { type: String, },
  tenure: { type: String, },
  joiningDate: { type: String, },
  leavingDate: { type: String },
  workingCurrently: { type: String, },
  taskAssigned: { type: String, },
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
  title: { type: String },
  subHeading: {
    type: String,
  },
  category: {
    type: [String],
  },
  link: {
    type: String,
  },
  stageOfProject: {
    type: [String],
  },
  socials: {
    twitter: { type: String },
    instagram: { type: String },
    facebook: { type: String },
    discord: { type: String },
  },
  description: {
    type: String,
  },
  collaborators: [CollaboratorSchema],
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("project-launcboard", userProjectSchema);
