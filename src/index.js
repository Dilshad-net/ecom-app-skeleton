const path = require('path')
const express = require('express')
const { dirname } = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
require('./db/mongoose')
const Product = require('./models/product')
const hbs = require('hbs')
//const User = require('./models/user')
const userRouter = require('./routes/user')
const producerRouter = require('./routes/producer')

const app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(bodyParser.text({ type: 'text/html' }))
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(producerRouter)

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials') 

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.listen(port, () => {
    console.log('server is up on', port)
})