const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Patient Schema
let patientSchema = new Schema({
     first_name: {type: String, default: ""},
     last_name: {type: String, default: ""},
     cin: {type: String,  default: ""},
     birth_date: {type: String,  default: ""}
},
{ 
     versionKey: false
})


module.exports = mongoose.model('Patient', patientSchema)