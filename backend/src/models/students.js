const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentsSchema = new Schema({
    user_id : String,
    email : String,
});

module.exports = mongoose.model("students",  studentsSchema );
