const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    idea:String,
    supervisor_id: String,
});

module.exports = mongoose.model("ideas", userSchema);
