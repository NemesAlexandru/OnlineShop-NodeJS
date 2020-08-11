const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
var path = require('path')


//Welcome page
router.get('/', (req, res) => res.render('welcome'));

//Dashboard
// router.get('/dashboard', ensureAuthenticated, (req, res) => 
// res.render('dashboard', {
//     name: req.user.name
// }));

//Products page
router.get('/products', ensureAuthenticated, (req, res) => 
res.sendFile(path.join(__dirname, '../public', 'products.html')));

module.exports = router;