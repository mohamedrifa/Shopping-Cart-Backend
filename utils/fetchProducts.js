const axios = require("axios");

exports.fetchFakeProducts = async () => {
  const { data } = await axios.get("https://fakestoreapi.com/products?limit=10");
  return data.map((p) => ({
    id: p.id,
    title: p.title,
    price: p.price,
    image: p.image,
  }));
};
