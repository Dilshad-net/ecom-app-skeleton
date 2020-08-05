const session = require('express-session')

const TWO_HOURS = 1000 * 60 * 60 * 2

const {
    NODE_ENV = 'development',

    sessionName = 'sid',
    sessionSecret = 'somesecrethere',
    sessionLife = TWO_HOURS
} = process.env

const IN_PROD = NODE_ENV === 'production'

const session = ({
    name: sessionName,
    resave: false,
    saveUninitialized: false,
    secret: sessionSecret,
    cookie: {
        maxAge: sessionLife,
        sameSite: true,
        secure: IN_PROD
    }
})


module.exports = session