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
        res.json({ message: "Deleted subscriber" })
    }catch (err) {
        res.status(500).json({ message: err.message });
        };
};