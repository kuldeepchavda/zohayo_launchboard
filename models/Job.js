const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jobSchema = new Schema({
  userId: {
    type: String,
  },
  jobId: {
    type: String,
  },
  title: {
    type: String,
  },
  subheading: {
    type: String,
  },
  projectLink: {
    type: String,
  },
  jobType: {
    type: String,
  },
  submissionDate: {
    type: String,
  },
  compensationType: {
    type: [String],
  },
  compensationDetails: {
    type: String,
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
  imageUrl: {
    type: String,
  },
  descriptionHeading: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  category: { type: [String] },
});

module.exports = mongoose.model("Job-lauchpad", jobSchema);
