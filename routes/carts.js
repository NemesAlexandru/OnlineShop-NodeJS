const express = require('express');
const { route } = require('.');
const router = express.Router();

//Cart model
const Cart = require('../models/Cart');


router.post("/addUpdateCart", async (req, res) => {
    const { _id, quantity, name, price } = req.body;
  
    const userId = req.user._id;

    //TODO: the logged in user id
    // const userId = req.user.userId;
    // const userId = passController.getUserId;

    try {
      let cart = await Cart.findOne({ userId });
  
      if (cart) {
        //cart exists for user
        let itemIndex = cart.products.findIndex(p => p._id == _id);
  
        if (itemIndex > -1) {
          //product exists in the cart, update the quantity
          let productItem = cart.products[itemIndex];
          productItem.quantity += 1;
          cart.products[itemIndex] = productItem;
        } else {
          //product does not exists in cart, add new item
          cart.products.push({ _id, quantity, name, price });
        }
        cart = await cart.save();
        return res.status(201).send(cart);
      } else {
        //no cart for user, create new cart
        const newCart = await Cart.create({
          userId,
          products: [{ _id, quantity, name, price }]
        });
  
        return res.status(201).send(newCart);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  });

  module.exports = router;