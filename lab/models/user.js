const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: String,
    age: Number
});

module.exports = mongoose.model('User', userSchema);