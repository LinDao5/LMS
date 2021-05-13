const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestsSchema = new Schema({
    studentId : String,
    supervisorId : String,
    email:String,
    message:String,
    isStudentActive : Number,
    isSupervisorActive: Number,
    isAccepted: Number
});

module.exports = mongoose.model("requests", requestsSchema);
