const mongoose = require('mongoose')
const validator = require('validator')

const paymentSchema = new mongoose.Schema({
    nationality : {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    zipcode: {
        type: Number,
        trim: true
    },
    dateofbirth: {
        type: Date,
        trim: true
    },
    tel: {
        type: Number,
        trim: true
    },
    creditcard: {
        type: String,
        required: true,
        trim: true
    },
    cardno: {
        type: Number,
        required: true,
        trim: true
    },
    expdate: {
        type: Date,
        required: true,
        trim: true
    },
    csc: {
        type: Number,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Payment = mongoose.model('Payment', paymentSchema)

module.exports = Payment