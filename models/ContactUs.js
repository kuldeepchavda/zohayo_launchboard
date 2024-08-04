const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: [3, "The name must be at least three characters long"],
      trim: true, // Trim whitespace
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      minLength: [5, "Length of subject should be at least 5 characters"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      minLength: [10, "Length of message should be at least 10 characters"],
    },
  },
  { timestamps: true }
); // Automatically manage createdAt and updatedAt

module.exports = mongoose.model("LaunchBoardContact", ContactSchema);
