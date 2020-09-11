//for registration

const express = require('express');
const { route } = require('.');
const { ensureAuthenticated } = require('../config/auth');
const productController = require('../controllers/product');
const router = express.Router();

//Product model
const Product = require('../models/Product');

router.get('/addProduct', ensureAuthenticated, (req, res) => res.render('addProduct'));

router.post('/addProduct', ensureAuthenticated, (req, res) => {
    const { name, imageURL, price, description, category } = req.body
    let errors = [];
    //check required fields
if(!name || !imageURL || !price || !description || !category){
    errors.push({ msg: 'Please fill in all fields' });
}

if(errors.length > 0){
    res.render('addProduct', {
    errors,
    name,
    imageURL,
    price,
    description,
    category
    });
    } else {
        Product.findOne({ name: name }).then(prod => {
        
            //if product exists
            if(prod) {
                errors.push({ msg: 'Product already in DB' })
                res.render('addProduct', {
                    errors,
                    name,
                    imageURL,
                    price,
                    description,
                    category
                })
            } else {
                const newProduct = new Product({
                    name,
                    imageURL,
                    price,
                    description,
                    category
                })
                newProduct.save().then(prod => {
                    // req.flash('success_msg', 'Product was added');
                    res.redirect('/products');
                }).catch(err => res.status(400).json({ message: err.message }))
            }
        })
    }
    

})

//Route to display all products in product controller
router.get('/items', productController.getAllProducts);

//Route to display filtered categories
router.get('/categories/:category', productController.getFilteredCat);


    module.exports = router


