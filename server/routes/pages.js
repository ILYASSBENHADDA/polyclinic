const express = require('express')
const router = express.Router()
const { addPatient, addDoctor , addWr, getDoctorSpc, getReq, updateStatus} = require('../controllers/crud')
const { register, login, logout } = require('../controllers/auth')


// Home
router.get('/', (req, res) => {
     res.send('home')
})


router.post('/add-patient', addPatient)
router.post('/add-doctor', addDoctor)
router.get('/add-wr', addWr)

router.get('/doctor-spc', getDoctorSpc)
router.get('/requists', getReq)

router.post('/register', register)
router.post('/login', login)

router.get('/logout', logout)

router.post('/update-status', updateStatus)



module.exports = router