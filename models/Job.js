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
  company: {
    type: String,
  },
  // subheading: {
  //   type: String,
  // },
  jobType: {
    type: String,
  },
  compensationType: {
    type: String,
  },
  compensationDetails: {
    type: String,
  },
  socialLinks: {
    twitter: { type: String },
    github: { type: String },
    facebook: { type: String },
    linkedin: { type: String },
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  requirements: { type: [String] },
});

module.exports = mongoose.model("Job-lauchpad", jobSchema);
