const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  senderName: String,
  senderEmail: String,
  message: String,
  createdAt: String,
});

module.exports = mongoose.model("messages", messageSchema);
