const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Define the userExperienceSchema
const userExperienceSchema = new Schema({
  userId: {
    type: String,
    required: [true, "User ID is required"],
    trim: true,
    minlength: [1, "User ID must be at least 1 character long"],
  },
  experienceId: {
    type: String,
    required: [true, "Experience ID is required"],
    trim: true,
    // unique: true,
    minlength: [1, "Experience ID must be at least 1 character long"],
  },
  imageUrl: {
    type: String,
    trim: true,
    validate: {
      validator: function (v) {
        // Optionally, you can add URL validation here
        return !v || /^https?:\/\/.+/.test(v); // Basic URL validation
      },
      message: (props) => `${props.value} is not a valid URL`,
    },
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [3, "Name must be at least 3 characters long"],
  },
  bio: {
    type: String,
    trim: true,
    minlength: [10, "Bio must be at least 10 characters long"],
  },
  link: {
    type: String,
    trim: true,
    validate: {
      validator: function (v) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: (props) => `${props.value} is not a valid URL`,
    },
  },
  skills: {
    type: [String],
    validate: {
      validator: (v) =>
        Array.isArray(v) && v.every((skill) => typeof skill === "string"),
      message: "Skills must be an array of strings",
    },
  },
  jobType: {
    type: String,
    enum: {
      values: ["Full-Time", "Part-Time", "Grant", "Bounty"],
      message:
        "Job type must be one of the following: Full-Time, Part-Time, Grant, Bounty",
    },
    trim: true,
  },
  fromDate: {
    type: Date,
    required: [true, "From Date is required"],
  },
  toDate: {
    type: Date,
    validate: {
      validator: function (v) {
        return !this.fromDate || v >= this.fromDate;
      },
      message: "To Date must be greater than or equal to From Date",
    },
  },
  note: {
    type: String,
    trim: true,
    minlength: [5, "Note must be at least 5 characters long"],
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

// Add indexes if needed for performance
userExperienceSchema.index({ userId: 1 });
userExperienceSchema.index({ experienceId: 1 });

module.exports = mongoose.model("Experience", userExperienceSchema);
