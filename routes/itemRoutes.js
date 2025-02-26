const express = require("express");
const { getItems, addItem, updateQuantity } = require("../controllers/itemController");

const router = express.Router();

router.get("/items", getItems);
router.post("/items", addItem);
router.put("/items/:id", updateQuantity);

module.exports = router;
