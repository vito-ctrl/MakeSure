const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: Number,
        unique: true,
        require: true
    },
    password:{
        type: String,
        required: true
    },
    
});

const user = mongoose.model('sure', authSchema);
module.exports = user