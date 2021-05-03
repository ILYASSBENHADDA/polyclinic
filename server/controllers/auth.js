const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


// Create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
     return jwt.sign({ id }, process.env.JWT_SECRET, {
          expiresIn: maxAge
     })
}


/*
* Register
*/ 
exports.register = (req, res) => {
     const {username, password} = req.body
     const hashedPassword = bcrypt.hashSync(password, 8)

     User.findOne({username: username}).then(user => {

          // check if a owner found with this email
          if (user) {
              return res.json({message: 'This username has already account!'})
          }
  
          // otherwise store client info in the Database
          new User({
               username: username,
               password: hashedPassword
          }).save((err, userData) => {
               if (err) throw err
               return res.status(200).json(userData)
          })
     })
     .catch((err) => { console.log(err) })
}


/*
* Login
*/ 
exports.login = (req, res) => {
     const {username, password} = req.body

     User.findOne({username: username}).then(user => {

          // if no user found
          if (!user) {
               return res.json({message: "Username or password is incorrect!"})
          }

          // check password validity
          if (!bcrypt.compareSync(password, user.password)) {
               return res.json({message: "Username or password is incorrect!"})
          }

          // Setup Token in Cookie
          const token = createToken(user._id)
          return res.status(200).cookie('user', token, {
               httpOnly: true,
               maxAge: maxAge * 1000
          }).json({message:'You\'re LoggedIn'})
     })
     .catch(err => { console.log(err) })
 
}

/*
* Logout
*/ 
exports.logout = (req, res) => {
    res.cookie('user', '', { maxAge: 1 })
    res.redirect('/')
}