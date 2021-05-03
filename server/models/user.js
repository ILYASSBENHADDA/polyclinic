const mongoose = require('mongoose')
const Schema = mongoose.Schema

// User Schema
let usertSchema = new Schema({
     username: { type: String, default: "" },
     password: { type: String, default: "" }
},
{ 
     versionKey: false
})


module.exports = mongoose.model('User', usertSchema)