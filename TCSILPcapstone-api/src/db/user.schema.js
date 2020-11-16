const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    pw: {
        type: String, select: false //won't return the password
    },
    role: {
        type: String
    },
    wishlist: {
        type: Array
    },
    cart: {
        type: Array
    }
});

module.exports = mongoose.model("Users", userSchema);