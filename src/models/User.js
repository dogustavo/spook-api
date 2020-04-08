const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,  
    },
    password: {
        type: String,
        required: true
    },
    data_nascimento: {
        type: Date,
        required: true
    },
    avatar: String,

}, {
    timestamps: true,
})

module.exports = model('User', UserSchema);