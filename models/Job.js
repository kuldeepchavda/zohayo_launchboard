const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileSchema = mongoose.Schema({
  fileId: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
});

const jobSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },

  jobId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  jobType: {
    type: String,
    enum: ["Full-Time", "Part-Time", "Contract", "Temporary", "Internship"],
    required: true,
  },
  compensationType: {
    type: String,
    enum: ["Hourly", "Salary", "Commission"],
    required: true,
  },
  compensationDetails: {
    type: String,
    required: true,
  },
  socialLinks: {
    twitter: { type: String, trim: true },
    github: { type: String, trim: true },
    discord: { type: String, trim: true },
    linkedin: { type: String, trim: true },
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    trim: true,
  },

  fileUrls: [fileSchema],
  imageUrl: {
    type: String,
    trim: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  requirements: {
    type: [String],
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: "At least one requirement is required",
    },
  },
});

module.exports = mongoose.model("JobLaunchpad", jobSchema);
