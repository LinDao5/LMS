const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stuSchema = new Schema({
    studentId : String,
    projectId : String,
});

module.exports = mongoose.model("stuprojects", stuSchema);
