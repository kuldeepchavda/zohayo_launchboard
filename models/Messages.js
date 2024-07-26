const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
  senderId: {
    type: String,
  },
  conversationId: {
    type: String,
  },
  receiverId: {
    type: String,
  },
  message: {
    type: String,
  },
  createdAt: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message-testings1", messageSchema);
