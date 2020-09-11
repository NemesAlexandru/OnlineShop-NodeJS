const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
    try{
        const products = await Product.find()
        res.json(products)
        } catch (err) {
        res.status(500).json({ message: err.message })
        }
};

exports.getFilteredCat = async (req, res) => {
    try{
        let cat = req.params.category;
        if(cat == 'All'){
            const products = await Product.find();
            res.json(products);
        }
        const products = await Product.find({ category: cat });
        res.json(products);
        } catch (err) {
        res.status(500).json({ message: err.message });
        }
};