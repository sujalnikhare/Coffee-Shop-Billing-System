const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: String,
    phone: String,
    superCoins: {
        type: Number,
        default: 0
    },
    orderDetails: [
        {
            name: String,
            price: Number,
            quantity: Number
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('customer', customerSchema);