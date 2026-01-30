const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  from: {
    type: String,
    require: true,
  },
  to: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    maxLentgh: 50,
  },
  created_at: {
    type: Date,
    require: true,
  },
});

const chat = mongoose.model("chat", chatSchema);

module.exports = chat;