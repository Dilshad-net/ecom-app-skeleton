const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }
        // console.log(req.user = user)
        req.token = token
        req.user = user
        
        next()
    }catch (error) {
        //redirect to Login (/users/login)
        //res.status(400).send( {error: 'Please Autherize'} )
        res.status(400).redirect('/login')
    }
}

module.exports = auth