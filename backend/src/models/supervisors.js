const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const supervisorSchema = new Schema({
    user_id : String,
    email : String,
});

module.exports = mongoose.model("supervisors", supervisorSchema);
