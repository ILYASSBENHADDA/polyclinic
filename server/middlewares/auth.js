const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.isLoggedIn =  (req, res, next) => {
    const token = req.cookies.user
    console.log(token)
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) throw err
            
            else {
                req.user = await Owner.findById(decodedToken.id).select('-password')
                // if (decodedToken.role === 'owner') {
                //     res.json({ role: 'Owner', isAuthenticated: true })
                // }
                next()
            }
        })
    }
    else {
        res.status(400).json('you\'re not logged in')
    }

}


// check current user
exports.checkUser = (req, res, next) => {
    const token = req.cookies.user
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
               res.status(200).clearCookie('user')
            } 
            else {
               res.status(200).json({ isAuthenticated: true })
            }
        })
    } 
    else {
        res.status(200).json({ isAuthenticated: false})
    }
}