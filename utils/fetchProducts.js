const axios = require("axios");

exports.fetchFakeProducts = async () => {
  try {
    const { data } = await axios.get(
      "https://api.allorigins.win/raw?url=https://fakestoreapi.com/products?limit=100"
    );

    return data.map((p) => ({
      id: p.id,
      title: p.title,
      price: p.price,
      image: p.image,
      category: p.category,
      description: p.description,
    }));
  } catch (err) {
    console.error("Failed to fetch products:", err.message);
    throw new Error("API fetch failed");
  }
};
