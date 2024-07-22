const mongoose = require("mongoose");

// Define the email schema
const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return v.includes("@") && v.includes(".");
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  timestamp:{
    type:Date,
    default:Date.now  
  }
});

// Create the Email model
const Email = mongoose.model("Email", emailSchema);

module.exports = Email;
