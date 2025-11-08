const Cart = require("../models/Cart");

exports.checkout = async (req, res) => {
  try {
    const { cartItems } = req.body;
    const userId = req.user;
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
    const receipt = {
      total,
      timestamp: new Date().toISOString(),
    };

    const cart = await Cart.findOne({ userId });
    if (cart) {
      cart.items = [];
      cart.total = 0;
      await cart.save();
    }

    res.json({ message: "Checkout successful", receipt });
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ message: "Checkout failed", error: err.message });
  }
};
