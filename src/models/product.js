const mongoose = require('mongoose')
const validator = require('validator')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    rating: {
        type: String,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    discount : {
        type: Number,
        trim: true,
        default: 0
    }
})

//for later user, in refered By Producer
productSchema.virtual('anything', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'ordered'
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product