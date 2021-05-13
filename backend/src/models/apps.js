const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appSchema = new Schema({
  appVersion: String,
  appDescription: String,
  appFileSize: String,
  appFileUrl: String,
  updatedAt: String,
});

module.exports = mongoose.model("apps", appSchema);
