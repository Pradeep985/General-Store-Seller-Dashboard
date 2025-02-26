const db = require("../config/db");

const Item = {
    getAll: (callback) => {
        db.query("SELECT * FROM items", callback);
    },
    create: (item, callback) => {
        db.query(
            "INSERT INTO items (itemName, description, price, quantity) VALUES (?, ?, ?, ?)",
            [item.itemName, item.description, item.price, item.quantity],
            callback
        );
    },
    updateQuantity: (id, quantity, callback) => {
        db.query(
            "UPDATE items SET quantity = ? WHERE id = ?",
            [quantity, id],
            callback
        );
    }
};

module.exports = Item;
