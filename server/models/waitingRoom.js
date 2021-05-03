const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Waiting Room Schema
let waitingRoomSchema = new Schema({
     wr_date: { type: Date },
     total_num_patient: { type: Number, default: 0 },
     total_num_abandon: { type: Number, default: 0 },
},
{
     versionKey: false
})


module.exports = mongoose.model('WaitingRoom', waitingRoomSchema)