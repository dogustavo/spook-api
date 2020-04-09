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
        required: true,
        select: false,
    },
    data_nascimento: {
        type: Date,
        required: true
    },
    avatar: String,
    books: {
        bookImage: {
            type: String,
            required: true,
        },
        nameBook: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,  
        },
        status: {
            type: String,
            required: true,
        },
        autor: {
            type: String,
            required: true,
        },
        editora: {
            type: String,
            required: true,
        },
    }

}, {
    timestamps: true,
});

module.exports = model('User', UserSchema);