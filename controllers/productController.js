const { fetchFakeProducts } = require("../utils/fetchProducts");

exports.getProducts = async (req, res) => {
  try {
    const products = await fetchFakeProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};
