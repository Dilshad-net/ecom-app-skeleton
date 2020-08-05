const http = require('http')
const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const Payment = require('../models/payment')
const Product = require('../models/product')
const Order = require('../models/order')

router.get('', (req, res) => {
    res.render('index')
})

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post('/signup', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        
        //res.status(201).send({user})
        res.status(201).render('payment')
    } catch (e) {
        res.status(400).send({ error: 'Validation failed'})
    }
})

router.post('/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        //res.header({"set-cookie": token}).status(200).send({ user: user.getPublicProfile(), token }) 
        res.header('Authorization', token).status(200).send('<a href="/login/me" target="_self">My Account</a> <a href="/me/payment" target="_self">Payment</a>')
        //res.header({"set-cookie": token})
        // res.redirect(200, '/login/me')
    } catch (error) {
        res.status(400).send({ error: 'Sorry Please Check your details!' })
    }
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/login/me', auth, async (req, res) => {
    res.render('me', {
        me: req.user
        //user: user.getPublicProfile(), token
    })
    
})

router.get('/me/payment', auth, async (req, res) => {
    const payment = await Payment.find({owner: req.user._id})
    try {
        await res.render('payment', {
            payment: payment
        })
    } catch (error) {
        await res.render('payment')
    }
})

router.post('/me/payment', auth, async (req, res) => {
    const payment = new Payment({ ...req.body, owner: req.user._id })
    try{
        await payment.save()
        res.status(201).send({ payment })
    } catch(error) {
        res.status(400).send({ error: 'Some unprocceedble Error!' })
    }
})

router.get('/products', async (req, res) => {
    try {
        const search = req.query.category
        if(!search) {
            return res.send({ error: 'No products defined' })
        }
        const product = await Product.find({ category: search }, (err, docs) => {
            var productChunks = []
            var chunkSize = docs.length
            for (let i = 0; i < docs.length; i += chunkSize ) {
                productChunks.push(docs.splice(i, i + chunkSize))    
            }
            res.render('products', { product: productChunks })
        })
        
        if (!product) {
            throw new Error({ error: 'Sorry no such Products' })
        }

        //res.send({ product })
    } catch (error) {
        res.status(404).send({ error: 'Sorry No such Products!'})
    }
})

//filter
router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById({ _id: req.params.id })

        if (!product) {
            throw new Error({ error: 'Sorry No such Product!'})
        }
        const relatedProd = product.category

        const other = await Product.find({ category: relatedProd}, (err, docs) => {
            var productChunks = []
            var chunkSize = docs.length

            for (let i = 0; i < docs.length; i += chunkSize) {
                productChunks.push(docs.splice(i, i + chunkSize))
            }
            res.render('product', {
                product: product,
                other: productChunks
                
            })
        })
    } catch (error) {
        res.status(404).send({ error: 'Sorry some Error!' })
    }
})

router.get('/products/:id/buy', auth, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        const payment = await Payment.findOne({ owner: req.user._id })

        if (!product) {
            throw new Error({ error: 'Sorry could not proceed!' })
        }
        if (payment) {
            return res.render('buy', { 
                product: product, 
                payment: payment 
            })
            //return res.status(200).send({ product: product, payment: payment })
        }
        //redirect to Payment
        //res.send({ error: 'Payment details not set' })
        res.render('payment')
    } catch (error) {
        res.status(404).send({ error: 'Sorry cannot proceed!' })
    }
})

router.post('/products/:id/order', auth, async (req, res) => {
    //const product = await Product.findById(req.params.id)
    const order = new Order({ ...req.body, ordered: req.user._id, productid: req.params.id })
    try {
        await order.save()
        //res.status(201).send(order)
        res.render('checkout', {
            order: order
        })
    } catch (error) {
        res.status(404).send({ error: 'Sorry Error in Details!' })
        //console.log(e)
    }
})

router.post('/products/:id/order/checkout', auth, async(req, res) => {
     //should Pass to a CheckOut Model
     res.render('thankyou', {
        message: 'Thats an Awesome Order, We will proceed'
    })
})

router.post('/me/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.token.filter((token) => {
            return token.token !== req.token
        })
        await user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/me/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/about', (req, res) => {
    res.render('about', {
        name: 'Dilshad Thajudeen',
        profession: 'Junior Web developer / designer',
        linkedin : 'https://www.linkedin.com/in/dilshad-thajudeen-21ba06190/',
        github: 'https://github.com/Dilshad-net',
        mail: 'dilshadthajudeen@gmail.com'
    })
})

router.get('*', (req, res) => {
    res.render('404', {
        error: 'No such route Found'
    })
})

router.get('/*', (req, res) => {
    res.render('404', {
        error: 'Sorry Please check your URL!'
    })
})

module.exports = router