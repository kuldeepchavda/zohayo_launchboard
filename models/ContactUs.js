const mongoose = require("mongoose")
 

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "The name must be atleast three characters long "],
  },
  email: {
    type: String,
    trim: true,
  },
  subject: {
    type: String,
    minLength: [5, "Length of subject should be atleast 5 characters"],
  },
  message: {
    type: String,
    minLength: [5, "Length of message should be atleast 10 characters"],
  },
  timestamp:{
    type:Date,
    default:Date.now()  
  }
});

module.exports = mongoose.model("launchBoard-contact",ContactSchema)