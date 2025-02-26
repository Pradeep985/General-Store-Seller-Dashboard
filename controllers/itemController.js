const Item = require("../models/itemModel");

exports.getItems = (req, res) => {
    Item.getAll((error, results) => {
        res.json(results);
    });
};

exports.addItem = (req, res) => {
    const { itemName, description, price, quantity } = req.body;

    const newItem = { itemName, description, price, quantity };

    Item.create(newItem, (error, result) => {
        res.status(201).json({ id: result.insertId, ...newItem });
    });
};

exports.updateQuantity = (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    Item.updateQuantity(id, quantity, (error, result) => {
        res.json({ id, quantity });
    });
};
