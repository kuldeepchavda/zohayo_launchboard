const mongoose = require("mongoose");
const { stringify } = require("uuid");
const Schema = mongoose.Schema;

const userProjectSchema = new Schema({
  userId: {
    type: String,
  },
  projectId: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  name: {
    type: String,
  },
  stageOfProject: {
    type: String,
  },
  upVotes: {
    type: Number,
  },
  notes: {
    type: String,
  },
  basedOn: {
    type: [String],
  },

  createdOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("project-launcboard", userProjectSchema);
