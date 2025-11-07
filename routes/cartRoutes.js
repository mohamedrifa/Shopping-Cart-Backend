const express = require("express");
const { addToCart, getCart, removeItem } = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect, addToCart);
router.get("/", protect, getCart);
router.delete("/:id", protect, removeItem);

module.exports = router;
