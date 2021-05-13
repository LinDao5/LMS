const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packageSchema = new Schema({
  packageName: String,
  packageDescription: String,
  packageFileSize: String,
  packageFileUrl: String,
  thumbnailFileUrl: String,
});

module.exports = mongoose.model("packages", packageSchema);
