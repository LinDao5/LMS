const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    supervisor_id : {type : String},
    // supervisor_id : Schema.Types.ObjectId,
    // studentId: Schema.Types.ObjectId,
    studentId: String,
    title: String,
    idea : String,
    assessment: String,
    isPrevious:Number,
    register_date: Date,

});

module.exports = mongoose.model("projects", projectSchema );
