const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      productId: Number,
      title: String,
      price: Number,
      qty: Number,
      image: String,
    },
  ],
  total: Number,
});

module.exports = mongoose.model("Cart", cartSchema);
