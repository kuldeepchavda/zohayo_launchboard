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
    type: [String],
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
});

module.exports = mongoose.model("Job-lauchpad", jobSchema);
