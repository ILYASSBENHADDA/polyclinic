const Patient = require('../models/patient')
const Request = require('../models/request')
const Doctor = require('../models/doctor')
const Wroom = require('../models/waitingRoom')
const ToDay = new Date().toLocaleDateString()



/*
* Add waiting room
*/
exports.addWr = (req, res) => {
     Wroom.findOne({wr_date: ToDay}).then(wroom => {
          
          // If there is not waiting room toDay
          if(!wroom) {
               // Delete all cases in doctor 
               Doctor.updateMany({}, {max_cases: 0}).exec()

               // Create waiting room
               new Wroom({
                    wr_date: ToDay,
               }).save((err) => {
                    if (err) throw err
               })
               return res.status(200).send('NEW WROOM')
          }

          // Otherwise
          return res.send('KAYAN' + wroom)
     })
}


/*
* Add patient
*/
exports.addPatient = async (req, res) => {
     const {first_name, last_name, cin, birth_date, specialty} = req.body

     // Max Cases Number
     const maxCases = await Doctor.findOne({specialty: specialty}).select('max_cases')
     const maxDailyCases = await Doctor.findOne({specialty: specialty}).select('max_daily_cases')
     console.log(maxDailyCases.max_daily_cases)
     // Number of Requist
     const count = await Request.find({id_doctor: maxCases._id}).countDocuments()

     // If cases reach the max (20)
     if (maxCases.max_cases === maxDailyCases.max_daily_cases ) {
          return res.json({message: 'Doctor FULL!'})
     }

     // Increment case number of doctor
     Doctor.findOneAndUpdate({specialty: specialty}, {$inc: { max_cases: 1}}).exec()

     // Add patient
     const pInfo = new Patient({
          first_name: first_name,
          last_name: last_name,
          cin: cin,
          birth_date: birth_date
     })

     pInfo.save()
     .then(async data => {

          // Get id of doctor
          const id_doctor = await Doctor.findOne({specialty: specialty}).select('_id')
          // Get id of waiting room AND increment total_num_patient
          const id_waiting_room = await Wroom.findOneAndUpdate({wr_date: ToDay}, {$inc: { total_num_patient: 1}}).select('_id')

          // Create requist
          const rInfo = new Request({
               id_patient: data._id,
               id_doctor: id_doctor,
               id_waiting_room: id_waiting_room,
               order_num: count + 1
          })
          rInfo.save()

          return res.json({message: 'Patient Added'})
     })
     .catch( err => { console.log(err) } )
}


/*
* Add doctors
*/
exports.addDoctor = (req, res) => {
     const {first_name, last_name, specialty, doctor_aid, max_daily_cases} = req.body

     const dInfo = new Doctor({
          first_name: first_name,
          last_name: last_name,
          specialty: specialty,
          doctor_aid: doctor_aid,
          max_daily_cases: max_daily_cases
     })

     dInfo.save()
     .then(() => {
          return res.json({message: 'Doctor Infos Added'})
     })
}


/*
* Get doctor spiciality
*/
exports.getDoctorSpc = (req, res) => {
     Doctor.find({}).select('specialty').then(data => {
          return res.json(data)
     })
}


/*
* Get All requists
*/
exports.getReq = (req, res) => {
     Request.find({status: false}).populate('id_patient id_doctor', '-_id')
     .then(data => {
          return res.json(data)
     })
}


/*
* Update requists status
*/
exports.updateStatus = (req, res) => {
     const { id } = req.body
     
     Request.findByIdAndUpdate(id, {status: true})
     .exec((err, data) => {
          if(err) throw err
          res.status(200).json({message: 'Data Updated!'})
     })
}