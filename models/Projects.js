const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CollaboratorSchema = new Schema({
  imageUrl: { type: String, trim: true },
  email: { type: String, trim: true, lowercase: true },
  userId: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  role: { type: String, trim: true },
  tenure: { type: String, trim: true },
  joiningDate: { type: Date },
  leavingDate: { type: Date },
  workingCurrently: { type: Boolean, default: false },
  taskAssigned: { type: String, trim: true },
});

const userProjectSchema = new Schema({
  userId: {
    type: String,
    required: true,
    trim: true,
  },
  projectId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    trim: true,
  },
  title: { type: String, required: true, trim: true },
  subHeading: {
    type: String,
    trim: true,
  },
  category: {
    type: [String],
  },
  link: {
    type: String,
    trim: true,
  },
  stageOfProject: {
    type: [String],
  },
  socials: {
    twitter: { type: String, trim: true },
    github: { type: String, trim: true },
    discord: { type: String, trim: true },
    linkedin: { type: String, trim: true },
  },
  description: {
    type: String,
    trim: true,
  },
  collaborators: [CollaboratorSchema],
  createdOn: {
    type: Date,
    default: Date.now,
  },
  filesUrl: { type: String, trim: true },
});

module.exports = mongoose.model("ProjectLaunchboard", userProjectSchema);
