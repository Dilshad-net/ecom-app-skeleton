const express = require('express')
const router = new express.Router()
const Product = require('../models/product')

router.post('/products/post', async (req, res) => {
    const product = new Product(req.body)
    try {
        await product.save()
        res.status(201).send(product)
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/user/product/order', async (req, res) => {
    //should Pass to a CheckOut Model
    res.render('thankyou', {
        message: 'Thats an Awesome Order, We will proceed'
    })
})

router.get('/*', (req, res) => {
    res.render('404', {
        error: 'Sorry No Such Routes Found!!!'
    })
})

module.exports = router