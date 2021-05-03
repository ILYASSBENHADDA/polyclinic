const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Doctor Schema
let doctorSchema = new Schema({
     first_name: {type: String, default: ""},
     last_name: {type: String, default: ""},
     specialty: {type: String,  default: ""},
     doctor_aid: {type: String,  default: ""},
     max_daily_cases: {type: Number,  default: 20},
     max_cases: {type: Number,  default: 0}
},
{
     versionKey: false
})


module.exports = mongoose.model('Doctor', doctorSchema)