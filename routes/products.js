//for registration

const express = require('express');
const { route } = require('.');
const router = express.Router();

//Product model
const Product = require('../models/Product');

router.post('/addProduct', (req, res) => {
    const { name, imageURL, price, description, category } = req.body
    Product.findOne({ name: name }).then(prod => {
        //if product exists
        if(prod) {
res.send('Product already in DB');
        } else {
            const newProduct = new Product({
                name,
                imageURL,
                price,
                description,
                category
            })
            newProduct.save().then(prod => {
                res.status(201).json(prod)
            }).catch(err => res.status(400).json({ message: err.message }))
        }
    })

})

    module.exports = router


