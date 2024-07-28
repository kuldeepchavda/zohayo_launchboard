const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema({
  participants: {
    type: [String],
  },
  conversationId: {
    type: String,
  },
  createdAt: {
    type: String,
    default: Date.now,
  },
  updatedAt: {
    type: String,
    default: Date.now,
  },
});
module.exports = mongoose.model("conversations-testings", conversationSchema);
