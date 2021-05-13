const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  senderName: String,
  amount: String,
  paymentMethod: String,
  createdAt: Date,
});

module.exports = mongoose.model("payments", paymentSchema);
