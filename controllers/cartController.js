const Cart = require("../models/Cart");
const { fetchFakeProducts } = require("../utils/fetchProducts");

exports.addToCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;
    const userId = req.user;

    const products = await fetchFakeProducts();
    const product = products.find((p) => p.id === productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [], total: 0 });
    }

    const existing = cart.items.find((i) => i.productId === productId);

    if (existing) {
      existing.qty += qty;
    } else {
      cart.items.push({
        productId,
        title: product.title,
        price: product.price,
        image: product.image,
        qty,
      });
    }

    cart.total = cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);
    await cart.save();

    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user });
  if (!cart) return res.json({ items: [], total: 0 });
  res.json(cart);
};

exports.removeItem = async (req, res) => {
  const { id } = req.params;
  const cart = await Cart.findOne({ userId: req.user });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter((i) => i.productId !== parseInt(id));
  cart.total = cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  await cart.save();
  res.json(cart);
};
