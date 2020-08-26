const express = require('express');
const { route } = require('.');
const router = express.Router();

//Cart model
const Cart = require('../models/Cart');


router.post("/addUpdateCart", async (req, res) => {
    const { productId, quantity, name, price } = req.body;
  
    // const userId = "5de7ffa74fff640a0491bc4f";  
    //TODO: the logged in user id
    const userId = req.user.userId;
  
    try {
      let cart = await Cart.findOne({ userId });
  
      if (cart) {
        //cart exists for user
        let itemIndex = cart.products.findIndex(p => p.productId == productId);
  
        if (itemIndex > -1) {
          //product exists in the cart, update the quantity
          let productItem = cart.products[itemIndex];
          productItem.quantity = quantity;
          cart.products[itemIndex] = productItem;
        } else {
          //product does not exists in cart, add new item
          cart.products.push({ productId, quantity, name, price });
        }
        cart = await cart.save();
        return res.status(201).send(cart);
      } else {
        //no cart for user, create new cart
        const newCart = await Cart.create({
          userId,
          products: [{ productId, quantity, name, price }]
        });
  
        return res.status(201).send(newCart);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  });

  module.exports = router;