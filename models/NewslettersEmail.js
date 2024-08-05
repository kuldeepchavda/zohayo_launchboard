const mongoose = require("mongoose");

// Define the email schema
const emailSchema = new mongoose.Schema({
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
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Create the Email model
const Email = mongoose.model("Email", emailSchema);
module.exports = Email;
