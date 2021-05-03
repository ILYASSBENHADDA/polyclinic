const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Request Schema
let requestSchema = new Schema({
     id_patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
     id_doctor: { type: Schema.Types.ObjectId, ref: 'Doctor' },
     id_waiting_room: { type: Schema.Types.ObjectId, ref: 'WaitingRoom' },
     order_num: { type: Number, default: 0 },
     status: { type: Boolean, default: false }
},
{
     versionKey: false
})


module.exports = mongoose.model('Request', requestSchema)