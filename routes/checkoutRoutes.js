const express = require("express");
const { checkout } = require("../controllers/checkoutController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect, checkout);

module.exports = router;
