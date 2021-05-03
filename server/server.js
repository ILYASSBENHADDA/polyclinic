require('dotenv').config({ path: './.env' })
require('./config/db.js')

const express = require('express')
const app = express()
const cookieParser = require("cookie-parser")
const cors = require('cors')
const port = process.env.PORT || 4000
const { checkUser } = require("./middlewares/auth")

// Middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
const corsOptions = {
     origin: 'http://localhost:3001', 
     credentials: true, //access-control-allow-credentials:true
     optionSuccessStatus: 200
}
app.use(cors(corsOptions))


// define routers
app.use('/api', require('./routes/pages'))
app.use('*', checkUser)




app.listen(port, () => {
     console.log(`Server is running in port ${port}...`)
})