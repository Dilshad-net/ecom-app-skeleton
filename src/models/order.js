const mongoose = require('mongoose')
const validator = require('validator')

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    points: {
        type: Number,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        trim: true,
        validate(value){
            if(value == 0){
                throw new Error(' Sorry Quantity is not valid! ')
            }
        }
    },
    amount: {
        type: Number,
        required: true,
        trim: true,
        validate(value){
            if(value == 0){
                throw new Error('Ammount cannot be zero!')
            }
        }
    },
    productid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    ordered: {
        type: mongoose.Schema.Types.String,
        required: true,
        ref: 'User'
    }
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order