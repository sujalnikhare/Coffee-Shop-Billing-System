
const mongoose = require('mongoose');

const CoffeeItemSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    image: String,
});

module.exports = mongoose.model("CoffeeItem", CoffeeItemSchema);
