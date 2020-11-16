const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String
    },
    image: {
        type: String
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    }
});

module.exports = mongoose.model("Cart", productSchema);