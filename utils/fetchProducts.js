const axios = require("axios");
const fakeData = require("./fakedatas.json");

exports.fetchFakeProducts = async () => {
  try {
    const { data } = await axios.get("https://fakestoreapi.com/products?limit=100");
    return data.map((p) => ({
      id: p.id,
      title: p.title,
      price: p.price,
      image: p.image,
      category: p.category,
      description: p.description,
    }));
  } catch (err) {
    console.warn("Using fallback product list due to error:", err.message);
    return fakeData;
  }
};
