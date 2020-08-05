const products = require('../models/product')
const Product = require('../models/product')

const prodF = async (req, res, next) => {
    const search = 'Watch'
    const prod = await Product.find({category: search})

    if (!prod) {
        throw new Error
    }
    return prod
}

module.exports = prodF