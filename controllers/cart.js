const Cart = require('../models/Cart');

exports.getCart = async (req, res) => {
    const userId = req.user._id;
    try{
        const cart = await Cart.findOne({userId: userId});
        res.json(cart);
        } catch (err) {
        res.status(500).json({ message: err.message });
        };
};

exports.deleteCart = async (req, res) => {
    const userId = req.user._id
    try{
        await Cart.deleteOne({userId: userId});
        res.json({ message: "Deleted cart" })
    }catch (err) {
        res.status(500).json({ message: err.message });
        };
};

exports.deleteCartItem = async (req, res) => {
    try{
      const userId = req.user._id;
      const itemID = req.params.id;
      const cart = await Cart.findOne({userId: userId});
      
      let itemIndex = cart.products.findIndex(p => p._id == itemID);
      let productItem = cart.products[itemIndex];
      productItem.quantity -= 1;
      cart.products[itemIndex] = productItem;

      if(productItem.quantity == 0) {
          await cart.products.pull(itemID);
          cart.save();
          return res.status(201).send('Deleted cart item');
      }
      cart.save();
      return res.status(201).send('Decreased quantity');
    } catch (err) {
        res.status(500).json({ message: err.message });
        };
};