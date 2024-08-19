const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender:{
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)