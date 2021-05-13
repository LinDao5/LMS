const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    name: String,
    email: String,
    phone_number: String,
    department: String,
    password: String,
    token: String,
    role: Number,
    register_date: Date,
    login_date: Date,
});

module.exports = mongoose.model("users", userSchema);
