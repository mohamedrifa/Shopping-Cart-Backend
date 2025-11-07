const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  image: String,
});

module.exports = mongoose.model("Product", productSchema);
