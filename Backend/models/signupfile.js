const mongoose = require('mongoose');

const signupSchema = mongoose.Schema({
    name: String,
    mobile: Number,
    email: String,
    pass: String
});
module.exports = mongoose.model('Signupdata', signupSchema);

