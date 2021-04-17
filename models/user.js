const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    score: Number,
    quizTook: {
        type: Map,
        default: {'': ''} 
    }
});

module.exports = mongoose.model('user', userSchema);